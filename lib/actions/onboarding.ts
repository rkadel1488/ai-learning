'use server'

import { createClient } from '@/lib/supabase/server'
import { getTrackFromAge } from '@/lib/auth/helpers'
import type { Track } from '@/lib/supabase/types'
import { redirect } from 'next/navigation'

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

// Server actions (call Supabase)
export async function createChild(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const name = formData.get('name') as string
  const age = parseInt(formData.get('age') as string, 10)

  if (!name || isNaN(age) || age < 6 || age > 18) {
    return { error: 'Please enter a valid name and age (6–18).' }
  }

  const insert = buildChildInsert({ parentId: user.id, name, age })
  const { data, error } = await supabase.from('children').insert(insert).select('id, track').single()

  if (error) return { error: 'Failed to create profile. Please try again.' }
  return { childId: data.id, track: data.track as Track }
}

export async function createClass(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const name = formData.get('name') as string
  const ageGroup = formData.get('ageGroup') as '6-10' | '11-14' | '15-18'

  if (!name || !ageGroup) {
    return { error: 'Please enter a class name and age group.' }
  }

  const insert = buildClassInsert({ teacherId: user.id, name, ageGroup })
  const { data, error } = await supabase.from('classes').insert(insert).select('id, join_code').single()

  if (error) return { error: 'Failed to create class. Please try again.' }
  return { classId: data.id, joinCode: data.join_code as string }
}
