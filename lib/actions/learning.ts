'use server'

import { createClient } from '@/lib/supabase/server'
import { calcScorePct } from '@/lib/learning/progress'
import { redirect } from 'next/navigation'

export async function recordAnswer(params: {
  childId: string
  topicId: string
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

  // Insert answer log
  await supabase.from('answer_log').insert({
    child_id: params.childId,
    question_id: params.questionId,
    answer_given: params.answerGiven,
    is_correct: isCorrect,
    time_taken_ms: params.timeTakenMs,
  })

  // Get existing progress
  const { data: existing } = await supabase
    .from('progress')
    .select('id, questions_answered, questions_correct')
    .eq('child_id', params.childId)
    .eq('topic_id', params.topicId)
    .single()

  const newAnswered = (existing?.questions_answered ?? 0) + 1
  const newCorrect = (existing?.questions_correct ?? 0) + (isCorrect ? 1 : 0)
  const newScorePct = calcScorePct(newCorrect, newAnswered)

  // Get total question count for completion check
  const { count: totalQuestions } = await supabase
    .from('questions')
    .select('id', { count: 'exact', head: true })
    .eq('topic_id', params.topicId)

  const isTopicComplete = newAnswered >= (totalQuestions ?? 999)
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
