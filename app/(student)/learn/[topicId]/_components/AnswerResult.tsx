'use client'
import { Button } from '@/components/ui/Button'

type Props = {
  isCorrect: boolean
  explanation: string
  onNext: () => void
}

export function AnswerResult({ isCorrect, explanation, onNext }: Props) {
  return (
    <div className={`rounded-xl p-4 space-y-3 ${isCorrect ? 'bg-emerald-900/40 border border-emerald-700' : 'bg-red-900/40 border border-red-700'}`}>
      <div className="flex items-center gap-2">
        <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
        <span className={`font-bold text-sm ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
          {isCorrect ? 'Correct!' : 'Not quite!'}
        </span>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed">{explanation}</p>
      <Button onClick={onNext} className="w-full">
        {isCorrect ? 'Next question →' : 'Try again →'}
      </Button>
    </div>
  )
}
