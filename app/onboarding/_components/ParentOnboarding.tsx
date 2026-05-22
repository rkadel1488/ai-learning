'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createChild } from '@/lib/actions/onboarding'
import { Button } from '@/components/ui/Button'
import { TrackReveal } from './TrackReveal'
import type { Track } from '@/lib/supabase/types'

type Step = 'form' | 'track-reveal'

export function ParentOnboarding() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('form')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [track, setTrack] = useState<Track | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.set('name', name)
    formData.set('age', age)

    const result = await createChild(formData)

    if ('error' in result) {
      setError(result.error ?? null)
      setLoading(false)
      return
    }

    setTrack(result.track as Track)
    setStep('track-reveal')
    setLoading(false)
  }

  if (step === 'track-reveal' && track) {
    return (
      <TrackReveal
        track={track}
        childName={name}
        onContinue={() => router.push('/dashboard')}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Add your child&apos;s profile</h2>
        <p className="text-slate-400 text-sm mt-1">We&apos;ll choose the perfect learning style for their age</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Child&apos;s name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
            placeholder="e.g. Alice"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            min={6}
            max={18}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
            placeholder="6 – 18"
          />
          <p className="text-xs text-slate-500 mt-1">Ages 6–10 get Story mode · 11–14 get Game Levels · 15–18 get Sandbox</p>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <Button type="submit" loading={loading} className="w-full">
          Create profile →
        </Button>
      </form>
    </div>
  )
}
