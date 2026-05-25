'use client'
import { useState } from 'react'
import { TOPIC_LESSONS } from './ConceptVisuals'

type Props = {
  topicTitle: string
  topicIcon: string
}

export function ConceptHint({ topicTitle, topicIcon }: Props) {
  const [open, setOpen] = useState(false)
  const lesson = TOPIC_LESSONS[topicTitle]
  if (!lesson) return null

  return (
    <div className="rounded-xl border border-slate-700 overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-900 hover:bg-slate-800 transition-colors text-left"
      >
        <span className="flex items-center gap-2 text-sm text-slate-400">
          <span>💡</span>
          <span>Review concept: <span className="text-slate-300 font-medium">{topicTitle}</span></span>
        </span>
        <span className="text-slate-500 text-sm">{open ? '▲ hide' : '▼ show'}</span>
      </button>
      {open && (
        <div className="bg-slate-900/50 px-4 pb-4 space-y-3">
          <div className="pt-3">
            <lesson.Visual />
          </div>
          <div className="space-y-2">
            {lesson.concepts.map(c => (
              <div key={c.term} className="bg-slate-800/60 rounded-lg px-3 py-2">
                <span className="text-violet-300 font-semibold text-sm">{c.term}: </span>
                <span className="text-slate-300 text-sm">{c.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
