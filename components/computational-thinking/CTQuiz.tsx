'use client'
import { useState } from 'react'
import type { CTQuestion } from '@/lib/computational-thinking/types'

type Props = {
  questions: CTQuestion[]
  accent: { border: string; text: string; bg: string }
}

export function CTQuiz({ questions, accent }: Props) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[index]

  function selectOption(optionIndex: number) {
    if (selected !== null) return
    setSelected(optionIndex)
    if (optionIndex === question.correctIndex) setScore(s => s + 1)
  }

  function next() {
    if (index + 1 >= questions.length) {
      setFinished(true)
      return
    }
    setIndex(i => i + 1)
    setSelected(null)
  }

  function restart() {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  if (questions.length === 0) {
    return <p className="text-sm text-slate-400">No questions available yet.</p>
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center space-y-4">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Quiz complete</p>
        <p className="text-3xl font-bold text-white">{score} / {questions.length}</p>
        <p className={`text-sm font-medium ${accent.text}`}>{pct}% correct</p>
        <button
          onClick={restart}
          className={`text-sm font-medium px-4 py-2 rounded-lg border border-slate-800 ${accent.border} text-slate-200`}
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Question {index + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
        <p className="text-sm font-semibold text-white leading-relaxed">{question.question}</p>

        <div className="grid gap-2">
          {question.options.map((option, i) => {
            const isSelected = selected === i
            const isCorrect = i === question.correctIndex
            let stateClasses = 'border-slate-800 hover:border-slate-700'
            if (selected !== null) {
              if (isCorrect) stateClasses = 'border-emerald-500 bg-emerald-500/10'
              else if (isSelected) stateClasses = 'border-red-500 bg-red-500/10'
            }
            return (
              <button
                key={i}
                onClick={() => selectOption(i)}
                disabled={selected !== null}
                className={`text-left text-sm px-3 py-2.5 rounded-lg border transition ${stateClasses} ${selected === null ? 'text-slate-200' : isCorrect ? 'text-emerald-300' : isSelected ? 'text-red-300' : 'text-slate-500'}`}
              >
                {option}
              </button>
            )
          })}
        </div>

        {selected !== null && (
          <div className="text-xs text-slate-400 bg-slate-950 border border-slate-800 rounded-lg p-3">
            {question.explanation}
          </div>
        )}
      </div>

      {selected !== null && (
        <button
          onClick={next}
          className={`text-sm font-medium px-4 py-2 rounded-lg border border-slate-800 ${accent.border} text-slate-200`}
        >
          {index + 1 >= questions.length ? 'See results' : 'Next question →'}
        </button>
      )}
    </div>
  )
}
