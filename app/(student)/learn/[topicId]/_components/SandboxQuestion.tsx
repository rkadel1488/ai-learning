'use client'
import { useState } from 'react'
import { AnswerResult } from './AnswerResult'

type Props = {
  prompt: string
  options: string[]
  correctAnswer: string
  explanation: string
  onAnswer: (isCorrect: boolean) => void
  onNext: () => void
}

export function SandboxQuestion({ prompt, options, correctAnswer, explanation, onAnswer, onNext }: Props) {
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
      <div className="bg-slate-950 border border-slate-700 rounded-xl p-4 font-mono">
        <div className="text-xs text-emerald-400 mb-2">// Challenge</div>
        <p className="text-slate-200 text-sm leading-relaxed">{prompt}</p>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className="text-left rounded-lg px-4 py-3 bg-slate-800 border border-slate-700 hover:border-emerald-500 text-sm text-slate-300 font-mono transition"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
