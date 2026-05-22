import type { Track } from '@/lib/supabase/types'

const TRACK_LABELS: Record<Track, string> = {
  story: '📖 Story Mode',
  levels: '🎮 Game Levels',
  sandbox: '🔬 Sandbox',
}

type Props = {
  track: Track
  topicTitle: string
  questionNumber: number
  totalQuestions: number
  scorePct: number
  children: React.ReactNode
}

export function QuestionShell({ track, topicTitle, questionNumber, totalQuestions, scorePct, children }: Props) {
  const progressPct = Math.round((questionNumber / totalQuestions) * 100)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-500 font-medium">{topicTitle}</div>
          <div className="text-xs text-violet-400 font-semibold mt-0.5">{TRACK_LABELS[track]}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">Q{questionNumber} of {totalQuestions}</div>
          <div className="text-xs text-emerald-400 mt-0.5">Score: {scorePct}%</div>
        </div>
      </div>

      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-violet-500 rounded-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {children}
    </div>
  )
}
