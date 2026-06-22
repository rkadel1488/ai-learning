'use client'
import { useState } from 'react'
import { AnswerResult } from './AnswerResult'

type Props = {
  prompt: string
  options: string[]
  correctAnswer: string
  explanation: string
  questionNumber: number
  scorePct: number
  onAnswer: (isCorrect: boolean) => void
  onNext: () => void
}

export function LevelsQuestion({ prompt, options, correctAnswer, explanation, questionNumber, scorePct, onAnswer, onNext }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  function handleSelect(option: string) {
    if (submitted) return
    setSelected(option)
    setSubmitted(true)
    onAnswer(option === correctAnswer)
  }

  if (submitted && selected) {
    return (
      <AnswerResult
        isCorrect={selected === correctAnswer}
        explanation={explanation}
        onNext={onNext}
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs">
        <span className="text-yellow-400 font-bold">⚡ LEVEL {Math.floor(questionNumber / 10) + 1}</span>
        <span className="text-slate-400">{scorePct}% accuracy</span>
      </div>
      <div className="bg-slate-800 rounded-xl p-4">
        <p className="text-white text-sm font-medium leading-relaxed">{prompt}</p>
      </div>
      <div className="space-y-2">
        {options.map((option, i) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className="w-full text-left flex items-center gap-3 rounded-lg px-4 py-3 bg-slate-800 border border-slate-700 hover:border-blue-500 text-sm text-slate-300 transition"
          >
            <span className="text-slate-500 font-bold">{['A', 'B', 'C', 'D'][i]}.</span>
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
