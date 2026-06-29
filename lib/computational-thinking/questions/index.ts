import type { CTQuestion } from '../types'
import { decomposition } from './decomposition'
import { patternRecognition } from './pattern-recognition'
import { abstraction } from './abstraction'
import { algorithms } from './algorithms'
import { logicalReasoning } from './logical-reasoning'
import { dataRepresentation } from './data-representation'
import { debugging } from './debugging'
import { sequencingAndControlFlow } from './sequencing-and-control-flow'

const QUESTIONS_BY_CATEGORY: Record<string, CTQuestion[]> = {
  decomposition,
  'pattern-recognition': patternRecognition,
  abstraction,
  algorithms,
  'logical-reasoning': logicalReasoning,
  'data-representation': dataRepresentation,
  debugging,
  'sequencing-and-control-flow': sequencingAndControlFlow,
}

export function getQuestions(categorySlug: string): CTQuestion[] {
  return QUESTIONS_BY_CATEGORY[categorySlug] ?? []
}

export function getAllQuestions(): CTQuestion[] {
  return Object.values(QUESTIONS_BY_CATEGORY).flat()
}
