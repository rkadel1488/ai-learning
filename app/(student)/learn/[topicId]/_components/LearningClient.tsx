'use client'
import { useRef, useState } from 'react'
import { recordAnswer, getNextQuestion } from '@/lib/actions/learning'
import { StoryQuestion } from './StoryQuestion'
import { LevelsQuestion } from './LevelsQuestion'
import { SandboxQuestion } from './SandboxQuestion'
import { ConceptHint } from './ConceptHint'
import { QuestionShell } from './QuestionShell'
import { PaywallGate } from './PaywallGate'
import type { Track } from '@/lib/supabase/types'

type Question = {
  id: string
  orderIndex: number
  prompt: string
  options: string[]
  correctAnswer: string
  explanation: string
}

type Props = {
  childId: string
  topicId: string
  topicTitle: string
  topicIcon: string
  track: Track
  totalQuestions: number
  initialQuestion: Question
  initialScorePct: number
  initialQuestionsAnswered: number
}

type View =
  | { status: 'question'; question: Question; scorePct: number }
  | { status: 'paywall'; questionsAnswered: number }
  | { status: 'complete' }

export function LearningClient({
  childId, topicId, topicTitle, topicIcon, track, totalQuestions,
  initialQuestion, initialScorePct, initialQuestionsAnswered,
}: Props) {
  const [view, setView] = useState<View>({ status: 'question', question: initialQuestion, scorePct: initialScorePct })
  const [questionsAnswered, setQuestionsAnswered] = useState(initialQuestionsAnswered)
  const [startTime, setStartTime] = useState(() => Date.now())
  const pendingRef = useRef<Promise<{
    newScorePct: number
    nextResult: Awaited<ReturnType<typeof getNextQuestion>>
  }> | null>(null)

  function handleAnswer(question: Question, isCorrect: boolean) {
    const timeTakenMs = Date.now() - startTime
    pendingRef.current = Promise.all([
      recordAnswer({
        childId,
        topicId,
        track,
        questionId: question.id,
        questionOrderIndex: question.orderIndex,
        answerGiven: isCorrect ? question.correctAnswer : '__wrong__',
        correctAnswer: question.correctAnswer,
        timeTakenMs,
      }),
      getNextQuestion({ topicId, track, orderIndex: question.orderIndex + 1 }),
    ]).then(([recordResult, nextResult]) => ({ newScorePct: recordResult.newScorePct, nextResult }))

    setQuestionsAnswered(q => q + 1)
  }

  async function handleNext() {
    const pending = pendingRef.current
    if (!pending) return
    const { newScorePct, nextResult } = await pending
    pendingRef.current = null
    setStartTime(Date.now())

    if (nextResult.status === 'question') {
      setView({ status: 'question', question: nextResult.question, scorePct: newScorePct })
    } else if (nextResult.status === 'paywall') {
      setView({ status: 'paywall', questionsAnswered })
    } else {
      setView({ status: 'complete' })
    }
  }

  if (view.status === 'paywall') {
    return <PaywallGate questionsAnswered={view.questionsAnswered} />
  }

  if (view.status === 'complete') {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-4xl">🎉</div>
        <h2 className="text-xl font-bold text-white">You&apos;ve finished all questions!</h2>
        <a href="/topics" className="text-violet-400 underline text-sm block">Back to topics</a>
      </div>
    )
  }

  const { question, scorePct } = view
  const sharedProps = {
    prompt: question.prompt,
    options: question.options,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    onAnswer: (isCorrect: boolean) => handleAnswer(question, isCorrect),
    onNext: handleNext,
  }

  return (
    <QuestionShell
      track={track}
      topicTitle={topicTitle}
      questionNumber={question.orderIndex}
      totalQuestions={totalQuestions}
      scorePct={scorePct}
    >
      <div className="space-y-3">
        <ConceptHint topicTitle={topicTitle} topicIcon={topicIcon} />

        {track === 'story' && <StoryQuestion key={question.id} {...sharedProps} />}
        {track === 'levels' && (
          <LevelsQuestion key={question.id} {...sharedProps} questionNumber={question.orderIndex} scorePct={scorePct} />
        )}
        {track === 'sandbox' && <SandboxQuestion key={question.id} {...sharedProps} />}
      </div>
    </QuestionShell>
  )
}
