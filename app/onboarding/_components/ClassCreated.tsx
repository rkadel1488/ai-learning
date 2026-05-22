'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

type Props = {
  joinCode: string
  className: string
}

export function ClassCreated({ joinCode, className }: Props) {
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  async function handleCopy() {
    await navigator.clipboard.writeText(joinCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="text-center space-y-6">
      <div>
        <div className="text-4xl mb-3">🏫</div>
        <h2 className="text-2xl font-bold text-white">Class created!</h2>
        <p className="text-slate-400 text-sm mt-1">{className} is ready for students</p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-3">
        <p className="text-slate-400 text-sm">Share this join code with your students</p>
        <div className="text-5xl font-bold text-white tracking-[0.3em]">{joinCode}</div>
        <button
          onClick={handleCopy}
          className="text-sm text-violet-400 hover:text-violet-300 transition"
        >
          {copied ? '✓ Copied!' : 'Copy code'}
        </button>
      </div>

      <p className="text-slate-500 text-xs">
        Students enter this code when they sign up to join your class automatically.
      </p>

      <Button onClick={() => router.push('/teacher/dashboard')} className="w-full">
        Go to dashboard →
      </Button>
    </div>
  )
}
