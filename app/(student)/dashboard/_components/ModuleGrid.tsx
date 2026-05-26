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

const tierConfig: Record<string, { bar: string; badge: string; border: string; glow: string; topGlow: string }> = {
  foundation: {
    bar: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    border: 'hover:border-emerald-800',
    glow: 'hover:shadow-emerald-500/8',
    topGlow: 'from-emerald-500/8',
  },
  intermediate: {
    bar: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    badge: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
    border: 'hover:border-blue-800',
    glow: 'hover:shadow-blue-500/8',
    topGlow: 'from-blue-500/8',
  },
  advanced: {
    bar: 'bg-gradient-to-r from-violet-500 to-purple-400',
    badge: 'bg-violet-500/15 text-violet-400 border-violet-500/25',
    border: 'hover:border-violet-800',
    glow: 'hover:shadow-violet-500/8',
    topGlow: 'from-violet-500/8',
  },
}
const fallbackCfg = tierConfig.foundation

export function ModuleGrid({ topics }: { topics: TopicRow[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-black text-white tracking-tight">Learning Modules</h2>
        <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-500 font-medium">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" />Foundation</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" />Intermediate</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-500" />Advanced</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map(topic => <ModuleCard key={topic.id} topic={topic} />)}
      </div>
    </div>
  )
}

function ModuleCard({ topic }: { topic: TopicRow }) {
  const cfg = tierConfig[topic.tier] ?? fallbackCfg
  const isLocked = topic.status === 'locked'
  const isComplete = topic.status === 'complete'
  const isInProgress = topic.status === 'in-progress'

  const card = (
    <div className={`relative bg-slate-900 border rounded-2xl p-5 transition-all duration-200 h-full overflow-hidden ${
      isLocked
        ? 'border-slate-800/50 opacity-40 select-none'
        : `border-slate-800 ${cfg.border} ${cfg.glow} hover:shadow-xl hover:bg-slate-900/90 cursor-pointer group`
    }`}>
      {/* Top gradient wash */}
      {!isLocked && (
        <div className={`absolute top-0 left-0 right-0 h-20 bg-gradient-to-b ${cfg.topGlow} to-transparent pointer-events-none`} />
      )}

      <div className="relative flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="text-4xl leading-none drop-shadow-sm">{topic.icon}</div>
          <div className="flex items-center gap-1.5">
            {topic.certEarned && (
              <span title="Certificate earned" className="text-base">🏆</span>
            )}
            {isLocked && <span className="text-slate-600 text-base">🔒</span>}
            {isComplete && (
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[10px] text-emerald-400 font-black">✓</span>
            )}
            {isInProgress && (
              <span className="relative flex h-2 w-2 mt-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
              </span>
            )}
          </div>
        </div>

        <h3 className="font-bold text-white text-sm leading-snug mb-2">{topic.title}</h3>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize self-start border ${cfg.badge}`}>
          {topic.tier}
        </span>

        {/* Progress */}
        <div className="mt-auto pt-4 space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">{topic.questionsAnswered}/{topic.totalQuestions}</span>
            {topic.scorePct !== null && (
              <span className="text-slate-300 font-bold">{topic.scorePct}%</span>
            )}
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${isComplete ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : cfg.bar}`}
              style={{ width: `${topic.progressPct}%` }}
            />
          </div>
          <p className={`text-xs font-semibold transition-colors ${
            isInProgress ? 'text-violet-400 group-hover:text-violet-300' :
            isComplete ? 'text-emerald-400' :
            isLocked ? 'text-slate-600' :
            'text-slate-500 group-hover:text-slate-300'
          }`}>
            {isInProgress ? '▶ Continue' : isComplete ? '✓ Complete' : isLocked ? '🔒 Locked' : '→ Start'}
          </p>
        </div>
      </div>
    </div>
  )

  if (isLocked) return <div className="h-full">{card}</div>
  return <Link href={`/learn/${topic.id}`} className="h-full block">{card}</Link>
}
