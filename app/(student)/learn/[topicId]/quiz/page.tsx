import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { QuestionShell } from '../_components/QuestionShell'
import { PaywallGate } from '../_components/PaywallGate'
import { LearningClient } from '../_components/LearningClient'
import type { Track } from '@/lib/supabase/types'

type Props = { params: Promise<{ topicId: string }> }

export default async function QuizPage({ params }: Props) {
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

  // Fetch topic, progress, total count, and purchase status all in parallel
  const [topicRes, progressRes, countRes, purchaseRes] = await Promise.all([
    supabase.from('topics').select('id, title, icon, order_index').eq('id', topicId).single(),
    supabase
      .from('progress')
      .select('questions_answered, questions_correct, last_question_index, score_pct, completed_at')
      .eq('child_id', child.id)
      .eq('topic_id', topicId)
      .single(),
    supabase
      .from('questions')
      .select('id', { count: 'exact', head: true })
      .eq('topic_id', topicId)
      .eq('track', child.track as Track),
    supabase
      .from('purchases')
      .select('purchased_at')
      .eq('user_id', user.id)
      .order('purchased_at', { ascending: false })
      .limit(1)
      .single(),
  ])

  if (!topicRes.data) notFound()
  const topic = topicRes.data
  const progress = progressRes.data
  const totalQuestions = countRes.count ?? 110

  // Subscription is valid if purchased within the last 365 days
  const purchase = purchaseRes.data
  const hasPurchase = !!purchase && (
    Date.now() - new Date(purchase.purchased_at).getTime() < 365 * 24 * 60 * 60 * 1000
  )

  if (progress?.completed_at) redirect('/topics')

  const nextIndex = (progress?.last_question_index ?? 0) + 1
  const scorePct = Math.round(Number(progress?.score_pct ?? 0))

  // Now fetch just the specific next question
  const { data: question } = await supabase
    .from('questions')
    .select('id, order_index, prompt, options, correct_answer, explanation, is_free')
    .eq('topic_id', topicId)
    .eq('track', child.track as Track)
    .eq('order_index', nextIndex)
    .single()

  if (!question) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-4xl">🎉</div>
        <h2 className="text-xl font-bold text-white">You&apos;ve finished all questions!</h2>
        <a href="/topics" className="text-violet-400 underline text-sm block">Back to topics</a>
      </div>
    )
  }

  if (!question.is_free && !hasPurchase) {
    return (
      <div className="space-y-4 max-w-lg mx-auto">
        <div>
          <a href={`/learn/${topicId}`} className="text-slate-500 text-xs hover:text-slate-300">← Back to topic</a>
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
        <a href={`/learn/${topicId}`} className="text-slate-500 text-xs hover:text-slate-300">← Back to topic</a>
        <h1 className="text-lg font-bold text-white mt-1">{topic.icon} {topic.title}</h1>
      </div>

      <QuestionShell
        track={child.track as Track}
        topicTitle={topic.title}
        questionNumber={question.order_index}
        totalQuestions={totalQuestions}
        scorePct={scorePct}
      >
        <LearningClient
          childId={child.id}
          topicId={topicId}
          topicTitle={topic.title}
          topicIcon={topic.icon}
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
