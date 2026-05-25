'use client'
import { useState } from 'react'
import { TOPIC_LESSONS } from './ConceptVisuals'

type Props = {
  topicTitle: string
  topicIcon: string
  onStart: () => void
}

export function LessonPanel({ topicTitle, topicIcon, onStart }: Props) {
  const lesson = TOPIC_LESSONS[topicTitle]
  const [revealed, setRevealed] = useState<number[]>([])

  function toggle(i: number) {
    setRevealed(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
  }

  const allRevealed = lesson ? revealed.length >= lesson.concepts.length : true

  if (!lesson) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="text-5xl">{topicIcon}</div>
        <h2 className="text-xl font-bold text-white">{topicTitle}</h2>
        <button onClick={onStart} className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
          Start Questions →
        </button>
      </div>
    )
  }

  const { tagline, Visual, concepts } = lesson

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center">
        <div className="text-4xl mb-2">{topicIcon}</div>
        <h2 className="text-xl font-bold text-white">{topicTitle}</h2>
        <p className="text-slate-400 text-sm mt-1">{tagline}</p>
      </div>

      {/* Visual diagram */}
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">
        <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-3">Concept Diagram</p>
        <Visual />
      </div>

      {/* Interactive key concepts */}
      <div className="space-y-2">
        <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">
          Tap each concept to reveal it <span className="text-violet-400">({revealed.length}/{concepts.length} done)</span>
        </p>
        {concepts.map((c, i) => {
          const open = revealed.includes(i)
          return (
            <button
              key={c.term}
              onClick={() => toggle(i)}
              className={`w-full text-left rounded-xl border transition-all duration-200 overflow-hidden ${
                open
                  ? 'bg-violet-900/30 border-violet-600/50'
                  : 'bg-slate-900 border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="px-4 py-3 flex items-center justify-between">
                <span className={`font-semibold text-sm ${open ? 'text-violet-300' : 'text-white'}`}>
                  {open ? '✓ ' : ''}{c.term}
                </span>
                <span className="text-slate-500 text-lg">{open ? '−' : '+'}</span>
              </div>
              {open && (
                <div className="px-4 pb-3 space-y-1.5">
                  <p className="text-sm text-slate-300">{c.desc}</p>
                  <div className="flex items-start gap-2 mt-2">
                    <span className="text-xs text-slate-500 shrink-0 mt-0.5">e.g.</span>
                    <p className="text-xs text-slate-400 italic">{c.example}</p>
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* CTA */}
      <button
        onClick={onStart}
        className={`w-full font-semibold py-3.5 rounded-xl transition-all duration-200 ${
          allRevealed
            ? 'bg-violet-600 hover:bg-violet-500 text-white'
            : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500'
        }`}
      >
        {allRevealed ? 'Start Practice Questions →' : 'Skip to Questions →'}
      </button>
    </div>
  )
}
