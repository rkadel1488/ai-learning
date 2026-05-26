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
  const [trophies, setTrophies] = useState<number | null>(null)

  useEffect(() => {
    const supabase = createClient()
    async function load() {
      const [{ data: userData }, { data: { user } }] = await Promise.all([
        supabase.from('users').select('name').single(),
        supabase.auth.getUser(),
      ])
      if (userData?.name) setInitials(userData.name.charAt(0).toUpperCase())
      if (!user) return
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: child } = await (supabase.from('children') as any)
        .select('id, trophies').eq('parent_id', user.id).limit(1).single()
      if (!child?.id) return
      if (child.trophies !== undefined) setTrophies(child.trophies)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: progressData } = await (supabase.from('progress') as any)
        .select('questions_correct').eq('child_id', child.id)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (progressData) setXp(progressData.reduce((s: number, r: any) => s + (r.questions_correct ?? 0) * 10, 0))
    }
    load()
  }, [])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const navLinks = [
    { href: '/dashboard', label: 'Home', icon: '🏠' },
    { href: '/topics', label: 'Learn', icon: '📚' },
    { href: '/friends', label: 'Friends', icon: '👥' },
  ]

  return (
    <div className="min-h-screen text-white" style={{ background: '#060a12' }}>
      {/* Subtle top gradient glow */}
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent z-50 pointer-events-none" />

      <nav className="border-b border-slate-800/50 px-4 sm:px-6 py-0 flex items-center gap-4 sticky top-0 z-40 backdrop-blur-xl bg-slate-950/90 h-14">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-xs font-black shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow">
            AI
          </div>
          <span className="font-black text-white tracking-tight hidden sm:block">
            AI<span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">Learn</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-0.5 flex-1">
          {navLinks.map(({ href, label, icon }) => {
            const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all duration-150 font-medium ${
                  active
                    ? 'text-white bg-violet-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span className="text-base leading-none">{icon}</span>
                <span className="hidden sm:inline">{label}</span>
                {active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-violet-400 rounded-full" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Right side pills */}
        <div className="flex items-center gap-2">
          {xp > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full">
              <span className="text-amber-400 text-xs">⚡</span>
              <span className="text-amber-300 text-xs font-bold">{xp.toLocaleString()}</span>
            </div>
          )}
          {trophies !== null && (
            <Link
              href="/friends"
              className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/15 hover:border-amber-500/40 px-3 py-1.5 rounded-full transition-all"
            >
              <span className="text-amber-400 text-xs">🏆</span>
              <span className="text-amber-300 text-xs font-bold">{trophies}</span>
            </Link>
          )}

          <div className="w-px h-5 bg-slate-700 mx-0.5" />

          {initials && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-xs font-black shadow-md shadow-violet-500/20">
              {initials}
            </div>
          )}
          <button
            onClick={handleLogout}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors font-medium"
          >
            Out
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
