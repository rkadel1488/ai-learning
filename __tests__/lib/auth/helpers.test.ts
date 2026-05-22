import { describe, it, expect } from 'vitest'
import { getTrackFromAge, getAgeGroupFromAge } from '@/lib/auth/helpers'

describe('getTrackFromAge', () => {
  it('returns story for age 6', () => {
    expect(getTrackFromAge(6)).toBe('story')
  })
  it('returns story for age 10', () => {
    expect(getTrackFromAge(10)).toBe('story')
  })
  it('returns levels for age 11', () => {
    expect(getTrackFromAge(11)).toBe('levels')
  })
  it('returns levels for age 14', () => {
    expect(getTrackFromAge(14)).toBe('levels')
  })
  it('returns sandbox for age 15', () => {
    expect(getTrackFromAge(15)).toBe('sandbox')
  })
  it('returns sandbox for age 18', () => {
    expect(getTrackFromAge(18)).toBe('sandbox')
  })
})

describe('getAgeGroupFromAge', () => {
  it('returns 6-10 for age 8', () => {
    expect(getAgeGroupFromAge(8)).toBe('6-10')
  })
  it('returns 11-14 for age 12', () => {
    expect(getAgeGroupFromAge(12)).toBe('11-14')
  })
  it('returns 15-18 for age 16', () => {
    expect(getAgeGroupFromAge(16)).toBe('15-18')
  })
})
