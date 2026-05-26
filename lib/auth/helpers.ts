import type { Track } from '@/lib/supabase/types'

export function getTrackFromAge(age: number): Track {
  if (age <= 10) return 'story'
  if (age <= 15) return 'levels'
  return 'sandbox'
}

export function getAgeGroupFromAge(age: number): '6-10' | '11-15' | '16-20' {
  if (age <= 10) return '6-10'
  if (age <= 15) return '11-15'
  return '16-20'
}
