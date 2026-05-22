import { describe, it, expect } from 'vitest'
import { buildChildInsert, buildClassInsert, generateJoinCode } from '@/lib/onboarding-utils'

describe('buildChildInsert', () => {
  it('maps age 7 to story track', () => {
    const result = buildChildInsert({ parentId: 'p1', name: 'Alice', age: 7 })
    expect(result.track).toBe('story')
    expect(result.name).toBe('Alice')
    expect(result.parent_id).toBe('p1')
    expect(result.age).toBe(7)
  })

  it('maps age 12 to levels track', () => {
    const result = buildChildInsert({ parentId: 'p1', name: 'Bob', age: 12 })
    expect(result.track).toBe('levels')
  })

  it('maps age 16 to sandbox track', () => {
    const result = buildChildInsert({ parentId: 'p1', name: 'Sara', age: 16 })
    expect(result.track).toBe('sandbox')
  })
})

describe('buildClassInsert', () => {
  it('maps age group 6-10 correctly', () => {
    const result = buildClassInsert({ teacherId: 't1', name: 'Class A', ageGroup: '6-10' })
    expect(result.teacher_id).toBe('t1')
    expect(result.name).toBe('Class A')
    expect(result.age_group).toBe('6-10')
  })
})

describe('generateJoinCode', () => {
  it('returns a 6-character uppercase string', () => {
    const code = generateJoinCode()
    expect(code).toHaveLength(6)
    expect(code).toBe(code.toUpperCase())
  })

  it('contains only alphanumeric characters', () => {
    const code = generateJoinCode()
    expect(/^[A-Z0-9]{6}$/.test(code)).toBe(true)
  })
})
