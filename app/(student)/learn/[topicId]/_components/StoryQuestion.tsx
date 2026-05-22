'use client'
import { useState } from 'react'
import { AnswerResult } from './AnswerResult'

type Props = {
  prompt: string
  options: string[]
  correctAnswer: string
  explanation: string
  onAnswer: (isCorrect: boolean) => void
}

export function StoryQuestion({ prompt, options, correctAnswer, explanation, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() {
    if (!selected || submitted) return
    setSubmitted(true)
    onAnswer(selected === correctAnswer)
  }

  if (submitted && selected) {
    return (
      <AnswerResult
        isCorrect={selected === correctAnswer}
        explanation={explanation}
        onNext={() => { setSelected(null); setSubmitted(false) }}
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3 bg-violet-900/30 border border-violet-800 rounded-xl p-4">
        <span className="text-3xl flex-shrink-0">🤖</span>
        <div>
          <div className="text-xs font-bold text-violet-400 mb-1">ARIA says:</div>
          <p className="text-white text-sm leading-relaxed">{prompt}</p>
        </div>
      </div>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => !submitted && setSelected(option)}
            className={`w-full text-left rounded-lg px-4 py-3 text-sm font-medium transition ${
              selected === option
                ? 'bg-violet-600 text-white border border-violet-400'
                : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-violet-500'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={!selected}
        className="w-full bg-violet-600 text-white rounded-lg py-2.5 text-sm font-semibold disabled:opacity-40 hover:bg-violet-700 transition"
      >
        Check answer ✓
      </button>
    </div>
  )
}
