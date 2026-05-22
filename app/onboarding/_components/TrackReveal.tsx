'use client'
import { Button } from '@/components/ui/Button'
import type { Track } from '@/lib/supabase/types'

const TRACK_CONFIG: Record<Track, { emoji: string; title: string; description: string; color: string }> = {
  story: {
    emoji: '📖',
    title: 'Story Adventure',
    description: 'Learn AI with ARIA, your AI companion! Solve fun challenges through interactive stories.',
    color: 'from-violet-600 to-purple-800',
  },
  levels: {
    emoji: '🎮',
    title: 'Game Levels',
    description: 'Level up your AI knowledge! Answer questions, earn XP, and unlock new challenges.',
    color: 'from-blue-600 to-cyan-800',
  },
  sandbox: {
    emoji: '🔬',
    title: 'Creative Sandbox',
    description: 'Build real AI projects, chat with Claude AI, and create things that actually work.',
    color: 'from-emerald-600 to-teal-800',
  },
}

type Props = {
  track: Track
  childName: string
  onContinue: () => void
}

export function TrackReveal({ track, childName, onContinue }: Props) {
  const config = TRACK_CONFIG[track]

  return (
    <div className="text-center space-y-6">
      <div>
        <p className="text-slate-400 text-sm mb-2">Great news, {childName}!</p>
        <h2 className="text-2xl font-bold text-white">Your learning track is ready</h2>
      </div>

      <div className={`bg-gradient-to-br ${config.color} rounded-2xl p-8 space-y-4`}>
        <div className="text-6xl">{config.emoji}</div>
        <h3 className="text-2xl font-bold text-white">{config.title}</h3>
        <p className="text-white/80 text-sm leading-relaxed">{config.description}</p>
      </div>

      <Button onClick={onContinue} className="w-full">
        Start learning →
      </Button>
    </div>
  )
}
