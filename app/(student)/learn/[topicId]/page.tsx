import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { QuestionShell } from './_components/QuestionShell'
import { PaywallGate } from './_components/PaywallGate'
import { LearningClient } from './_components/LearningClient'
import type { Track } from '@/lib/supabase/types'

type Props = { params: Promise<{ topicId: string }> }

export default async function LearnPage({ params }: Props) {
  const { topicId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Get child
  const { data: child } = await supabase
    .from('children')
    .select('id, name, track')
    .eq('parent_id', user.id)
    .order('created_at', { ascending: true })
    .limit(1)
    .single()

  if (!child) redirect('/onboarding')

  // Get topic
  const { data: topic } = await supabase
    .from('topics')
    .select('id, title, icon, order_index')
    .eq('id', topicId)
    .single()

  if (!topic) notFound()

  // Get child's progress for this topic
  const { data: progress } = await supabase
    .from('progress')
    .select('questions_answered, questions_correct, last_question_index, score_pct, completed_at')
    .eq('child_id', child.id)
    .eq('topic_id', topicId)
    .single()

  // Topic already complete — go back to topics
  if (progress?.completed_at) redirect('/topics')

  const nextIndex = (progress?.last_question_index ?? 0) + 1
  const scorePct = Math.round(Number(progress?.score_pct ?? 0))

  // Get the next question for this track
  const { data: question } = await supabase
    .from('questions')
    .select('id, order_index, prompt, options, correct_answer, explanation, is_free')
    .eq('topic_id', topicId)
    .eq('track', child.track as Track)
    .eq('order_index', nextIndex)
    .single()

  // Count total questions for this track + topic
  const { count: totalQuestions } = await supabase
    .from('questions')
    .select('id', { count: 'exact', head: true })
    .eq('topic_id', topicId)
    .eq('track', child.track as Track)

  // No question found (all done or topic not seeded)
  if (!question) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-4xl">🎉</div>
        <h2 className="text-xl font-bold text-white">You&apos;ve finished all questions!</h2>
        <a href="/topics" className="text-violet-400 underline text-sm block">Back to topics</a>
      </div>
    )
  }

  // Check paywall — Plan 4 will wire this to a real DB lookup
  const hasPurchase = false
  if (!question.is_free && !hasPurchase) {
    return (
      <div className="space-y-4 max-w-lg mx-auto">
        <div>
          <a href="/topics" className="text-slate-500 text-xs hover:text-slate-300">← Back to topics</a>
          <h1 className="text-lg font-bold text-white mt-1">{topic.icon} {topic.title}</h1>
        </div>
        <PaywallGate questionsAnswered={progress?.questions_answered ?? 0} />
      </div>
    )
  }

  const options = Array.isArray(question.options)
    ? (question.options as string[])
    : (JSON.parse(question.options as unknown as string) as string[])

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div>
        <a href="/topics" className="text-slate-500 text-xs hover:text-slate-300">← Back to topics</a>
        <h1 className="text-lg font-bold text-white mt-1">{topic.icon} {topic.title}</h1>
      </div>

      <QuestionShell
        track={child.track as Track}
        topicTitle={topic.title}
        questionNumber={question.order_index}
        totalQuestions={totalQuestions ?? 55}
        scorePct={scorePct}
      >
        <LearningClient
          childId={child.id}
          topicId={topicId}
          questionId={question.id}
          questionOrderIndex={question.order_index}
          track={child.track as Track}
          prompt={question.prompt}
          options={options}
          correctAnswer={question.correct_answer}
          explanation={question.explanation}
          questionNumber={question.order_index}
          scorePct={scorePct}
        />
      </QuestionShell>
    </div>
  )
}
