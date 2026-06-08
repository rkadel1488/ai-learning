'use client'

import CodeMirror from '@uiw/react-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { sql } from '@codemirror/lang-sql'
import type { CodingLanguage } from '@/lib/coding/languages'

const EXTENSIONS = {
  html: html(),
  css: css(),
  javascript: javascript(),
  jsx: javascript({ jsx: true }),
  tsx: javascript({ jsx: true, typescript: true }),
  typescript: javascript({ typescript: true }),
  python: python(),
  java: java(),
  cpp: cpp(),
  sql: sql(),
}

type Props = {
  cmLang: CodingLanguage['cmLang']
  value: string
  onChange: (value: string) => void
}

export function CodeEditor({ cmLang, value, onChange }: Props) {
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      theme={oneDark}
      height="100%"
      extensions={[EXTENSIONS[cmLang]]}
      basicSetup={{ lineNumbers: true, foldGutter: false }}
      style={{ height: '100%', fontSize: '13px' }}
    />
  )
}
