'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { recordAnswer } from '@/lib/actions/learning'
import { StoryQuestion } from './StoryQuestion'
import { LevelsQuestion } from './LevelsQuestion'
import { SandboxQuestion } from './SandboxQuestion'
import { LessonPanel } from './LessonPanel'
import { ConceptHint } from './ConceptHint'
import type { Track } from '@/lib/supabase/types'

type Props = {
  childId: string
  topicId: string
  topicTitle: string
  topicIcon: string
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
  childId, topicId, topicTitle, topicIcon, questionId, questionOrderIndex,
  track, prompt, options, correctAnswer, explanation,
  questionNumber, scorePct,
}: Props) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [startTime] = useState(() => Date.now())
  // Show full lesson panel for the very first question of each topic
  const [showLesson, setShowLesson] = useState(questionNumber === 1)

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

  if (showLesson) {
    return (
      <LessonPanel
        topicTitle={topicTitle}
        topicIcon={topicIcon}
        onStart={() => setShowLesson(false)}
      />
    )
  }

  const sharedProps = { prompt, options, correctAnswer, explanation, onAnswer: handleAnswer }

  return (
    <div className="space-y-3">
      {/* Collapsible concept review for Q2+ */}
      {questionNumber > 1 && (
        <ConceptHint topicTitle={topicTitle} topicIcon={topicIcon} />
      )}

      {track === 'story' && <StoryQuestion {...sharedProps} />}
      {track === 'levels' && <LevelsQuestion {...sharedProps} questionNumber={questionNumber} scorePct={scorePct} />}
      {track === 'sandbox' && <SandboxQuestion {...sharedProps} />}
    </div>
  )
}
