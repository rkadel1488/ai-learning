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

const tierGradients: Record<string, string> = {
  foundation: 'from-emerald-500/20 to-teal-500/20',
  intermediate: 'from-blue-500/20 to-cyan-500/20',
  advanced: 'from-violet-500/20 to-purple-500/20',
}

const tierBadge: Record<string, string> = {
  foundation: 'bg-emerald-400/10 text-emerald-400',
  intermediate: 'bg-blue-400/10 text-blue-400',
  advanced: 'bg-violet-400/10 text-violet-400',
}

export function ModuleGrid({ topics }: { topics: TopicRow[] }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Learning Modules</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map(topic => (
          <ModuleCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  )
}

function ModuleCard({ topic }: { topic: TopicRow }) {
  const gradient = tierGradients[topic.tier] ?? 'from-slate-500/20 to-slate-600/20'
  const badge = tierBadge[topic.tier] ?? 'bg-slate-400/10 text-slate-400'
  const isLocked = topic.status === 'locked'
  const isComplete = topic.status === 'complete'
  const isInProgress = topic.status === 'in-progress'

  const card = (
    <div className={`relative bg-slate-900 border rounded-2xl p-5 transition-all duration-200 h-full ${
      isLocked
        ? 'border-slate-800 opacity-50'
        : 'border-slate-700 hover:border-slate-600 hover:bg-slate-800/50 cursor-pointer'
    }`}>
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-30 pointer-events-none`} />
      <div className="relative flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{topic.icon}</div>
          <div className="flex items-center gap-1.5">
            {topic.certEarned && <span title="Certificate earned">🏆</span>}
            {isLocked ? (
              <span className="text-slate-500 text-xl">🔒</span>
            ) : isComplete ? (
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-bold">✓</span>
            ) : null}
          </div>
        </div>

        <h3 className="font-semibold text-white mb-2">{topic.title}</h3>
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full capitalize self-start ${badge}`}>
          {topic.tier}
        </span>

        <div className="mt-auto pt-4">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span>{topic.questionsAnswered} / {topic.totalQuestions} questions</span>
            {topic.scorePct !== null && <span className="font-medium">{topic.scorePct}%</span>}
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isComplete ? 'bg-emerald-500' : 'bg-violet-500'
              }`}
              style={{ width: `${topic.progressPct}%` }}
            />
          </div>
          {isInProgress && (
            <div className="mt-2.5 text-xs font-medium text-violet-400">▶ Continue</div>
          )}
          {topic.status === 'available' && (
            <div className="mt-2.5 text-xs font-medium text-slate-400">→ Start Topic</div>
          )}
        </div>
      </div>
    </div>
  )

  if (isLocked) return <div className="h-full">{card}</div>
  return <Link href={`/learn/${topic.id}`} className="h-full block">{card}</Link>
}
