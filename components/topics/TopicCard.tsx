import Link from 'next/link'
import type { TopicStatus } from '@/lib/learning/progress'
import type { Tier } from '@/lib/supabase/types'

const STATUS_ICON: Record<TopicStatus, string> = {
  locked: '🔒',
  available: '▶️',
  'in-progress': '📖',
  complete: '✅',
}

const TIER_COLOURS: Record<Tier, string> = {
  foundation: 'text-emerald-400',
  intermediate: 'text-blue-400',
  advanced: 'text-violet-400',
}

type Props = {
  id: string
  orderIndex: number
  title: string
  icon: string
  tier: Tier
  status: TopicStatus
  progressPct: number
  questionsAnswered: number
  totalQuestions: number
  isPaid?: boolean
  href: string
}

export function TopicCard({ id: _id, orderIndex, title, icon, tier, status, progressPct, questionsAnswered, totalQuestions, isPaid, href }: Props) {
  const isLocked = status === 'locked'

  const card = (
    <div className={`bg-slate-900 border rounded-xl p-4 space-y-3 transition ${
      isLocked ? 'border-slate-800 opacity-60 cursor-not-allowed' : 'border-slate-700 hover:border-violet-500 cursor-pointer'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">#{orderIndex}</span>
              <span className={`text-xs font-medium capitalize ${TIER_COLOURS[tier]}`}>{tier}</span>
              {isPaid && (
                <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded px-1.5 py-0.5">
                  PRO
                </span>
              )}
            </div>
            <h3 className="text-sm font-semibold text-white leading-tight">{title}</h3>
          </div>
        </div>
        <span className="text-xl">{STATUS_ICON[status]}</span>
      </div>

      {status !== 'locked' && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-500">
            <span>{questionsAnswered} / {totalQuestions} questions</span>
            {status !== 'available' && <span>{progressPct}%</span>}
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${status === 'complete' ? 'bg-emerald-500' : 'bg-violet-500'}`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )

  if (isLocked) return card
  return <Link href={href} className="block">{card}</Link>
}
