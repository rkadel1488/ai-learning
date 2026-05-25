'use client'
import { useState } from 'react'
import { TOPIC_LESSONS } from './ConceptVisuals'

type Props = {
  topicTitle: string
  topicIcon: string
  onGoToQuiz: () => void
}

export function LearnTab({ topicTitle, topicIcon, onGoToQuiz }: Props) {
  const [openConcepts, setOpenConcepts] = useState<number[]>([0])
  const lesson = TOPIC_LESSONS[topicTitle]

  function toggleConcept(i: number) {
    setOpenConcepts(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    )
  }

  if (!lesson) {
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

  const { tagline, Visual, concepts } = lesson

  return (
    <div className="space-y-5">
      {/* Topic intro */}
      <div className="text-center">
        <p className="text-slate-300 text-base">{tagline}</p>
      </div>

      {/* Visual diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-4 pt-4 pb-2">
          <p className="text-xs text-violet-400 uppercase tracking-wide font-semibold">Concept Diagram</p>
        </div>
        <div className="px-4 pb-4">
          <Visual />
        </div>
      </div>

      {/* Key concepts */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Key Concepts</h3>
        {concepts.map((c, i) => {
          const open = openConcepts.includes(i)
          return (
            <div
              key={c.term}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                open ? 'bg-violet-900/20 border-violet-700/40' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <button
                onClick={() => toggleConcept(i)}
                className="w-full px-4 py-3 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    open ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>{i + 1}</span>
                  <span className={`font-semibold text-sm ${open ? 'text-violet-200' : 'text-white'}`}>{c.term}</span>
                </div>
                <span className="text-slate-500 text-sm">{open ? '▲' : '▼'}</span>
              </button>
              {open && (
                <div className="px-4 pb-4 space-y-2">
                  <p className="text-sm text-slate-200 leading-relaxed">{c.desc}</p>
                  <div className="bg-slate-800/60 rounded-lg px-3 py-2 mt-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Example</p>
                    <p className="text-sm text-slate-300 italic">{c.example}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <div className="flex gap-3">
        <button
          onClick={onGoToQuiz}
          className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3.5 rounded-xl transition-colors"
        >
          Ready to Quiz? →
        </button>
      </div>
    </div>
  )
}
