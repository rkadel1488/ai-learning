'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/topics', label: 'Learning Path' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800 px-6 py-3 flex items-center gap-6">
        <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
          <span className="text-xl">🤖</span>
          <span className="font-bold text-white">AI Learning</span>
        </Link>
        <div className="flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                  active
                    ? 'bg-slate-800 text-white font-medium'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
