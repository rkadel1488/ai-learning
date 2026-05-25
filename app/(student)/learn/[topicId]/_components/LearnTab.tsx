'use client'
import { useState } from 'react'
import { TOPIC_LESSONS } from './ConceptVisuals'
import { LESSON_CONTENT } from './LessonContent'

type Props = {
  topicTitle: string
  topicIcon: string
  onGoToQuiz: () => void
}

export function LearnTab({ topicTitle, topicIcon, onGoToQuiz }: Props) {
  const lesson = LESSON_CONTENT[topicTitle]
  const visual = TOPIC_LESSONS[topicTitle]
  const [checkAnswer, setCheckAnswer] = useState<string | null>(null)

  if (!lesson || !visual) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-5xl">{topicIcon}</div>
        <p className="text-slate-400">Lesson content coming soon for {topicTitle}.</p>
        <button onClick={onGoToQuiz} className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
          Go to Quiz →
        </button>
      </div>
    )
  }

  const { Visual } = visual
  const { hook, intro, sections, funFact, quickCheck } = lesson
  const isCorrect = checkAnswer === quickCheck.answer

  return (
    <div className="space-y-6">
      {/* Hook */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-900/40 to-slate-900 border border-violet-700/30 px-6 py-5">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />
        <p className="text-xs text-violet-400 uppercase tracking-widest font-semibold mb-2">Did you know?</p>
        <p className="text-white text-lg font-semibold leading-relaxed">{hook}</p>
      </div>

      {/* Intro */}
      <p className="text-slate-300 text-sm leading-relaxed">{intro}</p>

      {/* Concept diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-5 pt-4 pb-1 flex items-center gap-2">
          <span className="text-xs font-semibold text-violet-400 uppercase tracking-wide">Concept Diagram</span>
        </div>
        <div className="px-5 pb-5">
          <Visual />
        </div>
      </div>

      {/* Lesson sections */}
      {sections.map((section, i) => (
        <div key={i} className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-violet-600/20 border border-violet-600/30 flex items-center justify-center shrink-0">
              <span className="text-violet-400 text-xs font-bold">{i + 1}</span>
            </div>
            <h3 className="text-base font-bold text-white">{section.heading}</h3>
          </div>

          <div className="pl-10 space-y-3">
            {section.body.split('\n\n').map((para, j) => (
              <p key={j} className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{para}</p>
            ))}

            {section.callout && (
              <div className="flex gap-3 bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3">
                <span className="text-amber-400 text-base shrink-0 mt-0.5">💡</span>
                <p className="text-amber-200 text-sm leading-relaxed">{section.callout}</p>
              </div>
            )}
          </div>

          {i < sections.length - 1 && (
            <div className="pl-10">
              <div className="h-px bg-slate-800" />
            </div>
          )}
        </div>
      ))}

      {/* Fun fact */}
      <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-2xl px-5 py-4 space-y-1">
        <p className="text-xs text-amber-400 uppercase tracking-widest font-semibold">Fun Fact ⚡</p>
        <p className="text-slate-200 text-sm leading-relaxed">{funFact}</p>
      </div>

      {/* Quick check */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800">
          <p className="text-xs text-emerald-400 uppercase tracking-widest font-semibold mb-1">Quick Check ✓</p>
          <p className="text-white text-sm font-medium leading-relaxed">{quickCheck.question}</p>
        </div>
        <div className="px-5 py-4 space-y-2">
          {quickCheck.options.map(opt => {
            const selected = checkAnswer === opt
            const isRight = opt === quickCheck.answer
            const showResult = checkAnswer !== null
            return (
              <button
                key={opt}
                onClick={() => !checkAnswer && setCheckAnswer(opt)}
                disabled={!!checkAnswer}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                  showResult && isRight
                    ? 'bg-emerald-900/30 border-emerald-500/60 text-emerald-300'
                    : showResult && selected && !isRight
                    ? 'bg-red-900/30 border-red-500/60 text-red-300'
                    : selected
                    ? 'bg-violet-600/20 border-violet-500 text-white'
                    : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
                }`}
              >
                {showResult && isRight && '✓ '}
                {showResult && selected && !isRight && '✗ '}
                {opt}
              </button>
            )
          })}
          {checkAnswer && (
            <div className={`mt-2 rounded-xl px-4 py-3 text-sm ${isCorrect ? 'bg-emerald-900/20 border border-emerald-700/30 text-emerald-200' : 'bg-red-900/20 border border-red-700/30 text-red-200'}`}>
              <span className="font-semibold">{isCorrect ? '🎉 Correct! ' : '📖 Not quite. '}</span>
              {quickCheck.explanation}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onGoToQuiz}
        className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-4 rounded-xl transition-colors text-base"
      >
        Ready for the full quiz? →
      </button>
    </div>
  )
}
