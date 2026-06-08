'use client'

import { useEffect, useRef, useState } from 'react'
import type { CodingLanguage } from '@/lib/coding/languages'
import { buildSrcDoc, type WebCmLang } from '@/lib/coding/runners/web'
import { runPython } from '@/lib/coding/runners/pyodide'
import { runPiston } from '@/lib/coding/runners/piston'

type ConsoleMessage = { level: string; text: string }

const LEVEL_COLOURS: Record<string, string> = {
  log: 'text-slate-300',
  info: 'text-blue-300',
  warn: 'text-amber-300',
  error: 'text-red-400',
}

type Props = {
  language: CodingLanguage
  code: string
}

export function RunPanel({ language, code }: Props) {
  const [isRunning, setIsRunning] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const [srcDoc, setSrcDoc] = useState<string | null>(null)
  const [consoleLines, setConsoleLines] = useState<ConsoleMessage[]>([])
  const [textOutput, setTextOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (language.runner !== 'web') return
    function handleMessage(event: MessageEvent) {
      const data = event.data
      if (data && data.source === 'code-playground') {
        setConsoleLines(prev => [...prev, { level: data.level, text: data.text }])
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [language.runner])

  async function handleRun() {
    setIsRunning(true)
    setHasRun(true)
    setError(null)
    setConsoleLines([])
    setTextOutput('')

    if (language.runner === 'web') {
      setSrcDoc(buildSrcDoc(language.cmLang as WebCmLang, code))
      setIsRunning(false)
      return
    }

    if (language.runner === 'pyodide') {
      const result = await runPython(code)
      setTextOutput(result.output)
      if (result.error) setError(result.error)
      setIsRunning(false)
      return
    }

    if (language.runner === 'piston' && language.pistonLanguage && language.pistonVersion) {
      const result = await runPiston(language.pistonLanguage, language.pistonVersion, code)
      setTextOutput(result.output)
      if (result.error) setError(result.error)
      setIsRunning(false)
      return
    }

    setIsRunning(false)
  }

  const showPreview = language.runner === 'web' && (language.cmLang === 'html' || language.cmLang === 'css' || language.cmLang === 'jsx' || language.cmLang === 'tsx')
  const showConsole = language.runner === 'web'
  const showTextOutput = language.runner === 'pyodide' || language.runner === 'piston'

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800">
        <span className="text-xs font-medium text-slate-400">Output</span>
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition"
        >
          {isRunning ? 'Running…' : '▶ Run'}
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {!hasRun && (
          <div className="h-full flex items-center justify-center text-sm text-slate-600 p-6 text-center">
            Press Run to see your output here.
          </div>
        )}

        {hasRun && showPreview && srcDoc && (
          <iframe
            ref={iframeRef}
            srcDoc={srcDoc}
            sandbox="allow-scripts"
            className="w-full bg-white"
            style={{ height: showConsole ? '60%' : '100%', minHeight: '180px' }}
            title="Preview"
          />
        )}

        {hasRun && showConsole && (
          <div className="p-3 font-mono text-xs space-y-1 border-t border-slate-800">
            {consoleLines.length === 0 && (
              <p className="text-slate-600">No console output.</p>
            )}
            {consoleLines.map((line, i) => (
              <div key={i} className={LEVEL_COLOURS[line.level] ?? 'text-slate-300'}>
                <span className="text-slate-600 mr-1">&gt;</span>{line.text}
              </div>
            ))}
          </div>
        )}

        {hasRun && showTextOutput && (
          <pre className="p-3 font-mono text-xs whitespace-pre-wrap text-slate-300">
            {textOutput || (!error && 'No output.')}
          </pre>
        )}

        {hasRun && error && (
          <div className="p-3 font-mono text-xs whitespace-pre-wrap text-red-400 border-t border-slate-800">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
