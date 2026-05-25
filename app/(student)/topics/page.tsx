import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { TopicCard } from '@/components/topics/TopicCard'
import { isTopicUnlocked, getTopicStatus } from '@/lib/learning/progress'

export default async function TopicsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: child } = await supabase
    .from('children')
    .select('id, name, track')
    .eq('parent_id', user.id)
    .order('created_at', { ascending: true })
    .limit(1)
    .single()

  if (!child) redirect('/onboarding')

  // All three queries run in parallel
  const [topicsRes, progressRes, qCountRes] = await Promise.all([
    supabase
      .from('topics')
      .select('id, order_index, title, icon, tier')
      .order('order_index', { ascending: true }),
    supabase
      .from('progress')
      .select('topic_id, questions_answered, questions_correct, completed_at')
      .eq('child_id', child.id),
    supabase
      .from('questions')
      .select('topic_id')
      .eq('track', child.track),
  ])

  const topics = topicsRes.data ?? []
  const progressMap = new Map((progressRes.data ?? []).map(p => [p.topic_id, p]))
  const qCountMap = new Map<string, number>()
  ;(qCountRes.data ?? []).forEach(q => {
    qCountMap.set(q.topic_id, (qCountMap.get(q.topic_id) ?? 0) + 1)
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Learning Path</h1>
        <p className="text-slate-400 text-sm mt-1">Hi {child.name}! Complete topics in order to unlock the next one.</p>
      </div>

      <div className="grid gap-3">
        {topics.map((topic, index) => {
          const prev = index > 0 ? topics[index - 1] : null
          const prevProgress = prev ? progressMap.get(prev.id) : null
          const topicProgress = progressMap.get(topic.id)
          const totalQuestions = qCountMap.get(topic.id) ?? 0
          const questionsAnswered = topicProgress?.questions_answered ?? 0
          const progressPct = totalQuestions > 0
            ? Math.round((questionsAnswered / totalQuestions) * 100)
            : 0
          const unlocked = isTopicUnlocked(topic.order_index, prevProgress?.completed_at ?? null)
          const status = getTopicStatus({
            isUnlocked: unlocked,
            completedAt: topicProgress?.completed_at ?? null,
            questionsAnswered,
            totalQuestions,
          })

          return (
            <TopicCard
              key={topic.id}
              id={topic.id}
              orderIndex={topic.order_index}
              title={topic.title}
              icon={topic.icon}
              tier={topic.tier as 'foundation' | 'intermediate' | 'advanced'}
              status={status}
              progressPct={progressPct}
              questionsAnswered={questionsAnswered}
              totalQuestions={totalQuestions}
              href={`/learn/${topic.id}`}
            />
          )
        })}
      </div>
    </div>
  )
}
