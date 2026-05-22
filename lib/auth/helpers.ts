import type { Track } from '@/lib/supabase/types'

export function getTrackFromAge(age: number): Track {
  if (age <= 10) return 'story'
  if (age <= 14) return 'levels'
  return 'sandbox'
}

export function getAgeGroupFromAge(age: number): '6-10' | '11-14' | '15-18' {
  if (age <= 10) return '6-10'
  if (age <= 14) return '11-14'
  return '15-18'
}
