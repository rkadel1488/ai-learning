'use client'

import { useState } from 'react'
import type { CodingLanguage } from '@/lib/coding/languages'
import { CodeEditor } from '@/components/code/CodeEditor'
import { RunPanel } from '@/components/code/RunPanel'

type Props = {
  language: CodingLanguage
  starterCode: string
}

export function LessonWorkspace({ language, starterCode }: Props) {
  const [code, setCode] = useState(starterCode)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500">Your code</p>
        <button
          onClick={() => setCode(starterCode)}
          className="text-xs text-slate-500 hover:text-slate-300"
        >
          Reset to starter code
        </button>
      </div>
      <div className="grid lg:grid-cols-2 gap-3" style={{ minHeight: '420px' }}>
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden" style={{ height: '420px' }}>
          <CodeEditor cmLang={language.cmLang} value={code} onChange={setCode} />
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden" style={{ height: '420px' }}>
          <RunPanel language={language} code={code} />
        </div>
      </div>
    </div>
  )
}
