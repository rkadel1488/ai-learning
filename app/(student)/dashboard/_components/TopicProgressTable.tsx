import Link from 'next/link'

type TopicRow = {
  id: string
  title: string
  icon: string
  tier: string
  status: 'locked' | 'available' | 'in-progress' | 'complete'
  progressPct: number
  questionsAnswered: number
  totalQuestions: number
  scorePct: number | null
  certEarned: boolean
}

const tierColors: Record<string, string> = {
  foundation: 'text-emerald-400 bg-emerald-400/10',
  intermediate: 'text-blue-400 bg-blue-400/10',
  advanced: 'text-violet-400 bg-violet-400/10',
}

const statusConfig: Record<string, { icon: string; label: string; color: string }> = {
  locked: { icon: '🔒', label: 'Locked', color: 'text-slate-500' },
  available: { icon: '▶️', label: 'Available', color: 'text-slate-300' },
  'in-progress': { icon: '📖', label: 'In Progress', color: 'text-amber-400' },
  complete: { icon: '✅', label: 'Complete', color: 'text-emerald-400' },
}

export function TopicProgressTable({ topics }: { topics: TopicRow[] }) {
  const activeCount = topics.filter(t => t.status === 'in-progress' || t.status === 'complete').length

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className="font-semibold text-white">Topic Progress</h2>
        <span className="text-xs text-slate-400">{activeCount} of {topics.length} started</span>
      </div>
      <div className="divide-y divide-slate-800">
        {topics.map(topic => (
          <TopicProgressRow key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  )
}

function TopicProgressRow({ topic }: { topic: TopicRow }) {
  const status = statusConfig[topic.status]
  const tierColor = tierColors[topic.tier] ?? 'text-slate-400 bg-slate-400/10'
  const isLocked = topic.status === 'locked'

  const inner = (
    <div className={`px-5 py-3 flex items-center gap-4 ${isLocked ? 'opacity-40' : 'hover:bg-slate-800/50'} transition-colors`}>
      <span className="text-xl w-8 text-center shrink-0">{topic.icon}</span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-sm font-medium text-white truncate">{topic.title}</span>
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded capitalize ${tierColor}`}>
            {topic.tier}
          </span>
          {topic.certEarned && (
            <span className="text-xs" title="Certificate earned">🏆</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${topic.progressPct}%` }}
            />
          </div>
          <span className="text-xs text-slate-500 shrink-0 tabular-nums">
            {topic.questionsAnswered}/{topic.totalQuestions}
          </span>
        </div>
      </div>

      <div className="text-right shrink-0 w-20">
        <div className={`text-xs font-medium ${status.color}`}>{status.icon} {status.label}</div>
        {topic.scorePct !== null && (
          <div className="text-xs text-slate-400 mt-0.5">{topic.scorePct}% score</div>
        )}
      </div>
    </div>
  )

  if (isLocked) return <div>{inner}</div>
  return <Link href={`/learn/${topic.id}`}>{inner}</Link>
}
