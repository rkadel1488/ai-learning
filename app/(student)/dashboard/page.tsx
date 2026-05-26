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
    .select('id, name, age, track, trophies, created_at')
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
      <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 px-6 sm:px-10 py-10 sm:py-12" style={{ background: 'linear-gradient(135deg, #0f1629 0%, #0a0f1e 50%, #0d0a1a 100%)' }}>
        {/* Blobs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-40 w-40 h-40 bg-fuchsia-600/8 rounded-full blur-2xl pointer-events-none" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-violet-300 text-xs font-semibold">{trackLabel[child.track] ?? child.track}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-3 leading-tight">
              <span className="text-slate-300">Hi, </span>
              <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">{child.name}</span>
              <span className="ml-2">👋</span>
            </h1>
            <p className="text-slate-400 text-base mb-7 max-w-sm leading-relaxed">
              {nextTopic?.status === 'in-progress'
                ? `Pick up where you left off in ${nextTopic.title}`
                : nextTopic
                ? `Ready to dive into ${nextTopic.title}?`
                : "You've completed all topics! Outstanding work 🎉"}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {nextTopic && (
                <Link
                  href={`/learn/${nextTopic.id}`}
                  className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 hover:-translate-y-0.5"
                >
                  {nextTopic.status === 'in-progress' ? '▶ Continue' : '▶ Start Learning'}
                </Link>
              )}
              <Link
                href="/topics"
                className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white font-semibold px-5 py-3 rounded-xl border border-slate-700/80 hover:border-slate-600 transition-all"
              >
                All Topics
              </Link>
            </div>
          </div>

          <div className="shrink-0 flex flex-row md:flex-col gap-3">
            <div className="flex flex-col items-center text-center bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 min-w-[120px] backdrop-blur-sm">
              <div className="text-3xl font-black text-amber-300 tabular-nums">{totalXp.toLocaleString()}</div>
              <div className="text-[11px] text-slate-500 mt-1 font-medium">⚡ Total XP</div>
              <div className="mt-3 text-2xl font-black text-white tabular-nums">{topicsCompleted}<span className="text-slate-600 text-sm font-normal">/{topics.length}</span></div>
              <div className="text-[11px] text-slate-500 font-medium">Topics Done</div>
            </div>
            <Link
              href="/friends"
              className="flex flex-col items-center text-center bg-amber-500/8 border border-amber-500/25 hover:border-amber-400/50 hover:bg-amber-500/12 rounded-2xl p-4 min-w-[120px] backdrop-blur-sm transition-all group"
            >
              <div className="text-3xl font-black text-amber-300 tabular-nums">{child.trophies}</div>
              <div className="text-[11px] text-slate-500 mt-1 font-medium">🏆 Trophies</div>
              <div className="text-[11px] text-amber-500/70 group-hover:text-amber-400 mt-2 font-semibold transition-colors">Friends →</div>
            </Link>
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
