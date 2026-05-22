'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { recordAnswer } from '@/lib/actions/learning'
import { StoryQuestion } from './StoryQuestion'
import { LevelsQuestion } from './LevelsQuestion'
import { SandboxQuestion } from './SandboxQuestion'
import type { Track } from '@/lib/supabase/types'

type Props = {
  childId: string
  topicId: string
  questionId: string
  questionOrderIndex: number
  track: Track
  prompt: string
  options: string[]
  correctAnswer: string
  explanation: string
  questionNumber: number
  scorePct: number
}

export function LearningClient({
  childId, topicId, questionId, questionOrderIndex,
  track, prompt, options, correctAnswer, explanation,
  questionNumber, scorePct,
}: Props) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [startTime] = useState(() => Date.now())

  async function handleAnswer(isCorrect: boolean) {
    const timeTakenMs = Date.now() - startTime
    await recordAnswer({
      childId,
      topicId,
      questionId,
      questionOrderIndex,
      answerGiven: isCorrect ? correctAnswer : '__wrong__',
      correctAnswer,
      timeTakenMs,
    })
    startTransition(() => router.refresh())
  }

  const sharedProps = { prompt, options, correctAnswer, explanation, onAnswer: handleAnswer }

  if (track === 'story') return <StoryQuestion {...sharedProps} />
  if (track === 'levels') return <LevelsQuestion {...sharedProps} questionNumber={questionNumber} scorePct={scorePct} />
  return <SandboxQuestion {...sharedProps} />
}
