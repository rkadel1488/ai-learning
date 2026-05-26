'use server'

import { createClient } from '@/lib/supabase/server'
import type { Track } from '@/lib/supabase/types'
import { redirect } from 'next/navigation'
import { buildChildInsert, buildClassInsert } from '@/lib/onboarding-utils'

// Server actions (call Supabase)
export async function createChild(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const name = formData.get('name') as string
  const age = parseInt(formData.get('age') as string, 10)

  if (!name || isNaN(age) || age < 6 || age > 20) {
    return { error: 'Please enter a valid name and age (6–20).' }
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
  const ageGroup = formData.get('ageGroup') as '6-10' | '11-15' | '16-20'

  if (!name || !ageGroup) {
    return { error: 'Please enter a class name and age group.' }
  }

  const insert = buildClassInsert({ teacherId: user.id, name, ageGroup })
  const { data, error } = await supabase.from('classes').insert(insert).select('id, join_code').single()

  if (error) return { error: 'Failed to create class. Please try again.' }
  return { classId: data.id, joinCode: data.join_code as string }
}
