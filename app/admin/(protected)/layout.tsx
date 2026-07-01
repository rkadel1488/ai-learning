import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { isAdminEmail } from '@/lib/admin'
import { ADMIN_UNLOCK_COOKIE, isValidCookieValue } from '@/lib/admin-unlock'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  if (!isAdminEmail(user.email)) redirect('/dashboard')

  const cookieStore = await cookies()
  const sessionValue = cookieStore.get(ADMIN_UNLOCK_COOKIE)?.value ?? ''
  if (!isValidCookieValue(sessionValue)) redirect('/admin/unlock')

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800 px-6 py-3 flex items-center gap-3">
        <span className="text-xl">🛠️</span>
        <span className="font-bold text-white">AI Learning — Admin</span>
      </nav>
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
