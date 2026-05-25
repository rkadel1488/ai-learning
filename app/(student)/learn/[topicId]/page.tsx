import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Track } from '@/lib/supabase/types'
import { TopicHub } from './_components/TopicHub'

type Props = { params: Promise<{ topicId: string }> }

export default async function TopicHubPage({ params }: Props) {
  const { topicId } = await params
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

  const [topicRes, progressRes, countRes] = await Promise.all([
    supabase.from('topics').select('id, title, icon, tier, order_index').eq('id', topicId).single(),
    supabase
      .from('progress')
      .select('questions_answered, questions_correct, score_pct, completed_at, streak_days')
      .eq('child_id', child.id)
      .eq('topic_id', topicId)
      .single(),
    supabase
      .from('questions')
      .select('id', { count: 'exact', head: true })
      .eq('topic_id', topicId)
      .eq('track', child.track as Track),
  ])

  if (!topicRes.data) notFound()

  const topic = topicRes.data
  const progress = progressRes.data
  const totalQuestions = countRes.count ?? 0

  return (
    <TopicHub
      topicId={topicId}
      topicTitle={topic.title}
      topicIcon={topic.icon}
      topicTier={topic.tier}
      topicOrderIndex={topic.order_index}
      questionsAnswered={progress?.questions_answered ?? 0}
      questionsCorrect={progress?.questions_correct ?? 0}
      scorePct={Math.round(Number(progress?.score_pct ?? 0))}
      completedAt={progress?.completed_at ?? null}
      totalQuestions={totalQuestions}
    />
  )
}
