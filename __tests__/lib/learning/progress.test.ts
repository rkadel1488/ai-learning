import { describe, it, expect } from 'vitest'
import { calcScorePct, isTopicUnlocked, getTopicStatus } from '@/lib/learning/progress'

describe('calcScorePct', () => {
  it('returns 0 when no questions answered', () => {
    expect(calcScorePct(0, 0)).toBe(0)
  })
  it('returns 100 when all correct', () => {
    expect(calcScorePct(10, 10)).toBe(100)
  })
  it('returns 50 when half correct', () => {
    expect(calcScorePct(5, 10)).toBe(50)
  })
  it('rounds to 2 decimal places', () => {
    expect(calcScorePct(1, 3)).toBe(33.33)
  })
})

describe('isTopicUnlocked', () => {
  it('topic 1 is always unlocked', () => {
    expect(isTopicUnlocked(1, null)).toBe(true)
  })
  it('topic 2 is unlocked when topic 1 is completed', () => {
    expect(isTopicUnlocked(2, '2024-01-01T00:00:00Z')).toBe(true)
  })
  it('topic 2 is locked when topic 1 is not completed', () => {
    expect(isTopicUnlocked(2, null)).toBe(false)
  })
  it('topic 3 is locked when topic 2 is not completed', () => {
    expect(isTopicUnlocked(3, null)).toBe(false)
  })
})

describe('getTopicStatus', () => {
  it('returns locked when not unlocked', () => {
    expect(getTopicStatus({ isUnlocked: false, completedAt: null, questionsAnswered: 0, totalQuestions: 55 }))
      .toBe('locked')
  })
  it('returns complete when completedAt is set', () => {
    expect(getTopicStatus({ isUnlocked: true, completedAt: '2024-01-01', questionsAnswered: 55, totalQuestions: 55 }))
      .toBe('complete')
  })
  it('returns in-progress when started but not done', () => {
    expect(getTopicStatus({ isUnlocked: true, completedAt: null, questionsAnswered: 10, totalQuestions: 55 }))
      .toBe('in-progress')
  })
  it('returns available when unlocked but not started', () => {
    expect(getTopicStatus({ isUnlocked: true, completedAt: null, questionsAnswered: 0, totalQuestions: 55 }))
      .toBe('available')
  })
})
