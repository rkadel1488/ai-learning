import type { CodingLesson } from '../languages'
import { html } from './html'
import { css } from './css'
import { javascript } from './javascript'
import { python } from './python'
import { java } from './java'
import { c } from './c'
import { cpp } from './cpp'
import { csharp } from './csharp'
import { sql } from './sql'
import { php } from './php'
import { react } from './react'
import { typescript } from './typescript'

const LESSONS_BY_LANGUAGE: Record<string, CodingLesson[]> = {
  html,
  css,
  javascript,
  python,
  java,
  c,
  cpp,
  csharp,
  sql,
  php,
  react,
  typescript,
}

export function getLessons(languageSlug: string): CodingLesson[] {
  return LESSONS_BY_LANGUAGE[languageSlug] ?? []
}

export function getLesson(languageSlug: string, lessonSlug: string): CodingLesson | undefined {
  return getLessons(languageSlug).find(l => l.slug === lessonSlug)
}
