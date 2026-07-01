'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { isValidCredentials, ADMIN_UNLOCK_COOKIE, hashCredentials } from '@/lib/admin-unlock'

export async function unlockAdmin(formData: FormData) {
  const id = (formData.get('id') as string ?? '').trim()
  const password = (formData.get('password') as string ?? '').trim()

  if (!isValidCredentials(id, password)) {
    redirect('/admin/unlock?error=1')
  }

  const cookieStore = await cookies()
  cookieStore.set(ADMIN_UNLOCK_COOKIE, hashCredentials(id, password), {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/admin',
    maxAge: 60 * 60 * 8, // 8 hours
  })

  redirect('/admin')
}
