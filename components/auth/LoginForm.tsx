'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password })

    if (loginError) {
      setError('Invalid email or password')
      setLoading(false)
      return
    }

    if (data.user) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: profile } = await (supabase.from('users') as any).select('role').eq('id', data.user.id).single()
      router.push((profile as { role: string } | null)?.role === 'teacher' ? '/teacher/dashboard' : '/dashboard')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
      <div>
        <label className="block text-sm text-slate-400 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <Button type="submit" loading={loading} className="w-full">
        Log in
      </Button>

      <p className="text-center text-slate-400 text-sm">
        No account?{' '}
        <a href="/signup" className="text-violet-400 hover:underline">Sign up free</a>
      </p>
    </form>
  )
}
