'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { GoogleButton } from './GoogleButton'
import type { UserRole } from '@/lib/supabase/types'

const OAUTH_ERROR_MESSAGES: Record<string, string> = {
  missing_code: 'Google sign-in was cancelled before completing. Please try again.',
  auth_failed: 'We could not finish signing you up with Google. Please try again, or use email and password below.',
}

export function SignUpForm({ oauthError, oauthReason }: { oauthError?: string; oauthReason?: string }) {
  const router = useRouter()
  const [role, setRole] = useState<UserRole>('parent')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(
    oauthError ? (OAUTH_ERROR_MESSAGES[oauthError] ?? 'Sign-in failed. Please try again.') : null
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role, name } },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: insertError } = await (supabase.from('users') as any).insert({ id: data.user.id, email, role, name })
      if (insertError) {
        setError(insertError.message)
        setLoading(false)
        return
      }
      router.push(role === 'teacher' ? '/teacher/dashboard' : '/dashboard')
    } else {
      // Email confirmation required — Supabase sent a verification email
      setError('Check your email and click the confirmation link to complete signup.')
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
      <GoogleButton label="Sign up with Google" />

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-700" />
        <span className="text-xs text-slate-500">or sign up with email</span>
        <div className="flex-1 h-px bg-slate-700" />
      </div>

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Role toggle */}
      <div className="flex rounded-lg overflow-hidden border border-slate-700">
        {(['parent', 'teacher'] as UserRole[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`flex-1 py-2 text-sm font-semibold capitalize transition ${
              role === r ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {r === 'parent' ? '🏠 Parent' : '🏫 Teacher'}
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Your name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
          placeholder="Jane Smith"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
          placeholder="jane@example.com"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
          placeholder="Min 8 characters"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm">
          {error}
          {oauthReason && <span className="block text-xs text-red-400/60 mt-0.5">({oauthReason})</span>}
        </p>
      )}

      <Button type="submit" loading={loading} className="w-full">
        Create account
      </Button>

      <p className="text-center text-slate-400 text-sm">
        Already have an account?{' '}
        <a href="/login" className="text-violet-400 hover:underline">Log in</a>
      </p>
    </form>
    </div>
  )
}
