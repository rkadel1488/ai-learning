'use client'
import { useState } from 'react'
import { createClass } from '@/lib/actions/onboarding'
import { Button } from '@/components/ui/Button'
import { ClassCreated } from './ClassCreated'

type Step = 'form' | 'created'
type AgeGroup = '6-10' | '11-15' | '16-20'

const AGE_GROUPS: { value: AgeGroup; label: string }[] = [
  { value: '6-10',  label: '🧒 Ages 6–10 (Story Adventure)' },
  { value: '11-15', label: '🧑 Ages 11–15 (Game Levels)' },
  { value: '16-20', label: '🧑‍💻 Ages 16–20 (Creative Sandbox)' },
]

export function TeacherOnboarding() {
  const [step, setStep] = useState<Step>('form')
  const [className, setClassName] = useState('')
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('11-15')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [joinCode, setJoinCode] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.set('name', className)
    formData.set('ageGroup', ageGroup)

    const result = await createClass(formData)

    if ('error' in result) {
      setError(result.error ?? null)
      setLoading(false)
      return
    }

    setJoinCode(result.joinCode)
    setStep('created')
    setLoading(false)
  }

  if (step === 'created') {
    return <ClassCreated joinCode={joinCode} className={className} />
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Create your first class</h2>
        <p className="text-slate-400 text-sm mt-1">Students join with a 6-digit code — no email needed</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Class name</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
            placeholder="e.g. Year 8 Computing"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Student age group</label>
          <div className="space-y-2">
            {AGE_GROUPS.map((g) => (
              <label key={g.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="ageGroup"
                  value={g.value}
                  checked={ageGroup === g.value}
                  onChange={() => setAgeGroup(g.value)}
                  className="accent-violet-600"
                />
                <span className="text-sm text-slate-300">{g.label}</span>
              </label>
            ))}
          </div>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <Button type="submit" loading={loading} className="w-full">
          Create class →
        </Button>
      </form>
    </div>
  )
}
