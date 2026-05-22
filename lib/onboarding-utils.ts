import { getTrackFromAge } from '@/lib/auth/helpers'
import type { Track } from '@/lib/supabase/types'

// Pure helpers (exported for testing)
export function buildChildInsert(params: { parentId: string; name: string; age: number }) {
  return {
    parent_id: params.parentId,
    name: params.name,
    age: params.age,
    track: getTrackFromAge(params.age) as Track,
  }
}

export function buildClassInsert(params: { teacherId: string; name: string; ageGroup: '6-10' | '11-14' | '15-18' }) {
  return {
    teacher_id: params.teacherId,
    name: params.name,
    age_group: params.ageGroup,
    join_code: generateJoinCode(),
  }
}

export function generateJoinCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}
