'use server'

import { createClient } from '@/lib/supabase/server'
import { calcScorePct } from '@/lib/learning/progress'
import { redirect } from 'next/navigation'
import type { Track } from '@/lib/supabase/types'

export async function recordAnswer(params: {
  childId: string
  topicId: string
  track: Track
  questionId: string
  questionOrderIndex: number
  answerGiven: string
  correctAnswer: string
  timeTakenMs: number
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const isCorrect = params.answerGiven === params.correctAnswer

  // Insert answer log + fetch progress + count questions all in parallel
  const [, progressResult, countResult] = await Promise.all([
    supabase.from('answer_log').insert({
      child_id: params.childId,
      question_id: params.questionId,
      answer_given: params.answerGiven,
      is_correct: isCorrect,
      time_taken_ms: params.timeTakenMs,
    }),
    supabase
      .from('progress')
      .select('id, questions_answered, questions_correct')
      .eq('child_id', params.childId)
      .eq('topic_id', params.topicId)
      .single(),
    supabase
      .from('questions')
      .select('id', { count: 'exact', head: true })
      .eq('topic_id', params.topicId)
      .eq('track', params.track),
  ])

  const existing = progressResult.data
  const newAnswered = (existing?.questions_answered ?? 0) + 1
  const newCorrect = (existing?.questions_correct ?? 0) + (isCorrect ? 1 : 0)
  const newScorePct = calcScorePct(newCorrect, newAnswered)
  const isTopicComplete = newAnswered >= (countResult.count ?? 999)
  const certEarned = isTopicComplete && newScorePct >= 80

  const updates = {
    questions_answered: newAnswered,
    questions_correct: newCorrect,
    last_question_index: params.questionOrderIndex,
    score_pct: newScorePct,
    updated_at: new Date().toISOString(),
    ...(isTopicComplete ? { completed_at: new Date().toISOString() } : {}),
    ...(certEarned ? { cert_earned_at: new Date().toISOString() } : {}),
  }

  if (existing) {
    await supabase.from('progress').update(updates).eq('id', existing.id)
  } else {
    await supabase.from('progress').insert({
      child_id: params.childId,
      topic_id: params.topicId,
      ...updates,
    })
  }

  return { isCorrect, newScorePct, isTopicComplete, certEarned }
}

export async function getNextQuestion(params: {
  topicId: string
  track: Track
  orderIndex: number
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: question } = await supabase
    .from('questions')
    .select('id, order_index, prompt, options, correct_answer, explanation, is_free')
    .eq('topic_id', params.topicId)
    .eq('track', params.track)
    .eq('order_index', params.orderIndex)
    .single()

  if (!question) return { status: 'complete' as const }

  if (!question.is_free) {
    const { data: purchase } = await supabase
      .from('purchases')
      .select('purchased_at')
      .eq('user_id', user.id)
      .order('purchased_at', { ascending: false })
      .limit(1)
      .single()
    const hasPurchase = !!purchase && (
      Date.now() - new Date(purchase.purchased_at).getTime() < 365 * 24 * 60 * 60 * 1000
    )
    if (!hasPurchase) return { status: 'paywall' as const }
  }

  const options = Array.isArray(question.options)
    ? (question.options as string[])
    : (JSON.parse(question.options as unknown as string) as string[])

  return {
    status: 'question' as const,
    question: {
      id: question.id,
      orderIndex: question.order_index,
      prompt: question.prompt,
      options,
      correctAnswer: question.correct_answer,
      explanation: question.explanation,
    },
  }
}
