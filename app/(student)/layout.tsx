'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [initials, setInitials] = useState('')
  const [xp, setXp] = useState(0)

  useEffect(() => {
    const supabase = createClient()
    supabase.from('users').select('name').single().then(({ data }) => {
      if (data?.name) setInitials(data.name.charAt(0).toUpperCase())
    })
    // XP = total correct answers across all progress rows
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(supabase.from('progress') as any).select('questions_correct').then(({ data }: any) => {
      if (data) setXp(data.reduce((s: number, r: any) => s + (r.questions_correct ?? 0) * 10, 0))
    })
  }, [])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const navLinks = [
    { href: '/dashboard', label: 'Home' },
    { href: '/topics', label: 'Learn' },
  ]

  return (
    <div className="min-h-screen text-white" style={{ background: '#080c14' }}>
      <nav className="border-b border-slate-800/60 px-6 py-3 flex items-center gap-6 sticky top-0 z-50 backdrop-blur-md bg-slate-950/80">
        <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-sm font-bold">AI</div>
          <span className="font-bold text-white">AI Learning</span>
        </Link>

        <div className="flex items-center gap-1 flex-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm px-4 py-2 rounded-lg transition-colors font-medium ${
                  active ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          {xp > 0 && (
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full">
              <span className="text-amber-400 text-xs">⚡</span>
              <span className="text-amber-400 text-xs font-semibold">{xp.toLocaleString()} XP</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Log out
          </button>
          {initials && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-sm font-bold">
              {initials}
            </div>
          )}
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
