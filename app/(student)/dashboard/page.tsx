import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isTopicUnlocked, getTopicStatus } from '@/lib/learning/progress'
import { StatCard } from './_components/StatCard'
import { TopicProgressTable } from './_components/TopicProgressTable'
import { RecentActivity } from './_components/RecentActivity'
import { AchievementsSection } from './_components/AchievementsSection'

const trackLabel: Record<string, string> = {
  story: 'Story Track · Ages 6–10',
  levels: 'Levels Track · Ages 11–14',
  sandbox: 'Sandbox Track · Ages 15–18',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: child } = await supabase
    .from('children')
    .select('id, name, age, track, created_at')
    .eq('parent_id', user.id)
    .order('created_at', { ascending: true })
    .limit(1)
    .single()

  if (!child) redirect('/onboarding')

  const [topicsRes, progressRes, qCountRes, activityRes, achievementsRes] = await Promise.all([
    supabase
      .from('topics')
      .select('id, order_index, title, icon, tier')
      .order('order_index', { ascending: true }),
    supabase
      .from('progress')
      .select('topic_id, questions_answered, questions_correct, score_pct, completed_at, cert_earned_at, streak_days')
      .eq('child_id', child.id),
    supabase
      .from('questions')
      .select('topic_id')
      .eq('track', child.track),
    supabase
      .from('answer_log')
      .select('id, is_correct, time_taken_ms, answered_at, questions(type, prompt, topics(title, icon))')
      .eq('child_id', child.id)
      .order('answered_at', { ascending: false })
      .limit(10),
    supabase
      .from('achievements')
      .select('id, type, topic_id, earned_at, topics(title, icon)')
      .eq('child_id', child.id)
      .order('earned_at', { ascending: false }),
  ])

  const topics = topicsRes.data ?? []
  const progressRows = progressRes.data ?? []
  const qCounts = qCountRes.data ?? []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activity = (activityRes.data ?? []) as any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const achievements = (achievementsRes.data ?? []) as any[]

  const progressMap = new Map(progressRows.map(p => [p.topic_id, p]))
  const qCountMap = new Map<string, number>()
  qCounts.forEach(q => {
    qCountMap.set(q.topic_id, (qCountMap.get(q.topic_id) ?? 0) + 1)
  })

  const totalAnswered = progressRows.reduce((sum, p) => sum + p.questions_answered, 0)
  const totalCorrect = progressRows.reduce((sum, p) => sum + p.questions_correct, 0)
  const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0
  const topicsCompleted = progressRows.filter(p => p.completed_at).length
  const maxStreak = progressRows.reduce((max, p) => Math.max(max, p.streak_days ?? 0), 0)

  const topicsWithProgress = topics.map((topic, index) => {
    const prev = index > 0 ? topics[index - 1] : null
    const prevProgress = prev ? progressMap.get(prev.id) : null
    const topicProgress = progressMap.get(topic.id)
    const totalQuestions = qCountMap.get(topic.id) ?? 0
    const questionsAnswered = topicProgress?.questions_answered ?? 0
    const progressPct = totalQuestions > 0 ? Math.round((questionsAnswered / totalQuestions) * 100) : 0
    const unlocked = isTopicUnlocked(topic.order_index, prevProgress?.completed_at ?? null)
    const status = getTopicStatus({
      isUnlocked: unlocked,
      completedAt: topicProgress?.completed_at ?? null,
      questionsAnswered,
      totalQuestions,
    })

    return {
      ...topic,
      status,
      progressPct,
      questionsAnswered,
      totalQuestions,
      scorePct: topicProgress?.score_pct ?? null,
      certEarned: !!topicProgress?.cert_earned_at,
    }
  })

  // Find the next topic to continue
  const nextTopic = topicsWithProgress.find(t => t.status === 'in-progress') ??
                    topicsWithProgress.find(t => t.status === 'available')

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">
            {child.name} · {trackLabel[child.track] ?? child.track}
          </p>
        </div>
        {nextTopic && (
          <Link
            href={`/learn/${nextTopic.id}`}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            {nextTopic.status === 'in-progress' ? '▶ Continue Learning' : '▶ Start Learning'}
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon="✅" label="Questions Answered" value={totalAnswered} />
        <StatCard icon="🎯" label="Accuracy" value={totalAnswered > 0 ? `${overallAccuracy}%` : '—'} />
        <StatCard icon="📚" label="Topics Completed" value={`${topicsCompleted} / ${topics.length}`} />
        <StatCard icon="🔥" label="Best Streak" value={maxStreak > 0 ? `${maxStreak}d` : '—'} />
      </div>

      <TopicProgressTable topics={topicsWithProgress} />

      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivity activity={activity} />
        <AchievementsSection achievements={achievements} />
      </div>
    </div>
  )
}
