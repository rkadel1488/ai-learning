import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isTopicUnlocked, getTopicStatus } from '@/lib/learning/progress'
import { StatCard } from './_components/StatCard'
import { ModuleGrid } from './_components/ModuleGrid'
import { RecentActivity } from './_components/RecentActivity'
import { AchievementsSection } from './_components/AchievementsSection'
import { SubscriptionCard } from './_components/SubscriptionCard'

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

  const [topicsRes, progressRes, qCountRes, activityRes, achievementsRes, purchaseRes] = await Promise.all([
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
    supabase
      .from('purchases')
      .select('purchased_at')
      .eq('user_id', user.id)
      .order('purchased_at', { ascending: false })
      .limit(1)
      .single(),
  ])

  const topics = topicsRes.data ?? []
  const progressRows = progressRes.data ?? []
  const qCounts = qCountRes.data ?? []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activity = (activityRes.data ?? []) as any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const achievements = (achievementsRes.data ?? []) as any[]
  const purchase = purchaseRes.data ?? null

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

  const nextTopic = topicsWithProgress.find(t => t.status === 'in-progress') ??
                    topicsWithProgress.find(t => t.status === 'available')

  const totalXp = totalCorrect * 10

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 px-8 py-12">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-8 right-52 w-48 h-48 bg-pink-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-slate-400 text-sm mb-2">{trackLabel[child.track] ?? child.track}</p>
            <h1 className="text-4xl font-bold mb-3">
              <span className="text-white">Hi, </span>
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                {child.name}
              </span>
              <span className="text-white"> 👋</span>
            </h1>
            <p className="text-slate-300 text-lg mb-6 max-w-md">
              {nextTopic?.status === 'in-progress'
                ? `Continue your journey in ${nextTopic.title}`
                : nextTopic
                ? `Ready to start ${nextTopic.title}?`
                : "You've completed all topics! Amazing work."}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {nextTopic && (
                <Link
                  href={`/learn/${nextTopic.id}`}
                  className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  {nextTopic.status === 'in-progress' ? '▶ Continue Learning' : '▶ Start Learning'}
                </Link>
              )}
              <Link
                href="/topics"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl border border-slate-700 transition-colors"
              >
                View All Topics
              </Link>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center text-center bg-slate-800/60 border border-slate-700 rounded-2xl p-6 min-w-[140px] backdrop-blur-sm">
            <div className="text-4xl font-bold text-amber-400">{totalXp.toLocaleString()}</div>
            <div className="text-xs text-slate-400 mt-1">⚡ Total XP</div>
            <div className="mt-4 text-2xl font-bold text-white">{topicsCompleted}<span className="text-slate-500 text-base font-normal">/{topics.length}</span></div>
            <div className="text-xs text-slate-400">Topics Done</div>
          </div>
        </div>
      </div>

      {/* Subscription */}
      <SubscriptionCard purchase={purchase} />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon="✅" label="Questions Answered" value={totalAnswered} accent="violet" />
        <StatCard icon="🎯" label="Accuracy" value={totalAnswered > 0 ? `${overallAccuracy}%` : '—'} accent="blue" />
        <StatCard icon="📚" label="Topics Completed" value={`${topicsCompleted} / ${topics.length}`} accent="emerald" />
        <StatCard icon="🔥" label="Best Streak" value={maxStreak > 0 ? `${maxStreak}d` : '—'} accent="amber" />
      </div>

      {/* Module grid */}
      <ModuleGrid topics={topicsWithProgress} />

      {/* Activity & Achievements */}
      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivity activity={activity} />
        <AchievementsSection achievements={achievements} />
      </div>
    </div>
  )
}
