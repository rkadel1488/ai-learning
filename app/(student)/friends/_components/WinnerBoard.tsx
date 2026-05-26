type Entry = { id: string; name: string; trophies: number; rank: number; isMe: boolean }

type Props = {
  leaderboard: Entry[]
  myChildId: string
}

export function WinnerBoard({ leaderboard }: Props) {
  const sorted = [...leaderboard].sort((a, b) => a.rank - b.rank)
  const top3 = sorted.filter(e => e.rank <= 3)
  const rest = sorted.filter(e => e.rank > 3)
  const maxTrophies = sorted[0]?.trophies ?? 1

  // Reorder podium: 2nd, 1st, 3rd
  const podiumOrder = [
    top3.find(e => e.rank === 2),
    top3.find(e => e.rank === 1),
    top3.find(e => e.rank === 3),
  ].filter(Boolean) as Entry[]

  const podiumHeight = { 1: 'h-24', 2: 'h-16', 3: 'h-12' }
  const podiumColors = {
    1: { bg: 'bg-amber-400', text: 'text-slate-900', ring: 'ring-amber-400/50', avatar: 'bg-amber-400', label: 'text-amber-400' },
    2: { bg: 'bg-slate-300', text: 'text-slate-900', ring: 'ring-slate-300/50', avatar: 'bg-slate-300', label: 'text-slate-300' },
    3: { bg: 'bg-amber-700', text: 'text-white',     ring: 'ring-amber-700/50', avatar: 'bg-amber-700',  label: 'text-amber-600' },
  }
  const medals = { 1: '🥇', 2: '🥈', 3: '🥉' }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-900/25 to-slate-900 border border-amber-700/30 rounded-2xl p-5">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">🏆 Global Trophy Board</p>
        <p className="text-white font-black text-xl">Who reigns supreme?</p>
        <p className="text-slate-400 text-xs mt-1">Win challenges to climb the ranks and earn eternal glory</p>
      </div>

      {/* Podium — top 3 */}
      {podiumOrder.length >= 2 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-end justify-center gap-3">
            {podiumOrder.map(entry => {
              const c = podiumColors[entry.rank as 1 | 2 | 3]
              const h = podiumHeight[entry.rank as 1 | 2 | 3]
              return (
                <div key={entry.id} className="flex flex-col items-center gap-2 flex-1">
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full ${c.avatar} ring-2 ${c.ring} flex items-center justify-center text-lg font-black ${c.text} shadow-lg`}>
                    {entry.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-center">
                    <p className={`text-xs font-bold truncate max-w-[80px] ${entry.isMe ? 'text-violet-300' : 'text-white'}`}>
                      {entry.name}{entry.isMe ? ' (you)' : ''}
                    </p>
                    <p className={`text-xs font-bold ${c.label}`}>🏆 {entry.trophies}</p>
                  </div>
                  {/* Podium block */}
                  <div className={`w-full ${h} ${c.bg} rounded-t-xl flex items-start justify-center pt-2 shadow-lg`}>
                    <span className="text-xl">{medals[entry.rank as 1|2|3]}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Full leaderboard */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[44px_1fr_1fr_72px] px-4 py-2.5 border-b border-slate-800/80">
          <span className="text-slate-600 text-[11px] font-bold uppercase">#</span>
          <span className="text-slate-600 text-[11px] font-bold uppercase">Player</span>
          <span className="text-slate-600 text-[11px] font-bold uppercase">Progress</span>
          <span className="text-slate-600 text-[11px] font-bold uppercase text-right">🏆</span>
        </div>

        {sorted.map(entry => {
          const barPct = maxTrophies > 0 ? Math.round((entry.trophies / maxTrophies) * 100) : 0
          return (
            <div
              key={entry.id}
              className={`grid grid-cols-[44px_1fr_1fr_72px] items-center px-4 py-3 border-b border-slate-800/40 last:border-0 transition-colors ${
                entry.isMe ? 'bg-violet-500/8' : 'hover:bg-slate-800/30'
              }`}
            >
              {/* Rank */}
              <div className="flex items-center">
                {entry.rank === 1 ? <span className="text-lg">🥇</span>
                : entry.rank === 2 ? <span className="text-lg">🥈</span>
                : entry.rank === 3 ? <span className="text-lg">🥉</span>
                : <span className="text-slate-500 text-sm font-bold w-5 text-center">{entry.rank}</span>}
              </div>

              {/* Name + avatar */}
              <div className="flex items-center gap-2 min-w-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                  entry.isMe ? 'bg-violet-600 text-white' :
                  entry.rank === 1 ? 'bg-amber-400 text-slate-900' :
                  'bg-slate-700 text-slate-300'
                }`}>
                  {entry.name.charAt(0).toUpperCase()}
                </div>
                <p className={`text-sm font-semibold truncate ${entry.isMe ? 'text-violet-300' : 'text-white'}`}>
                  {entry.name}
                  {entry.isMe && <span className="text-violet-500 text-[10px] ml-1 font-normal">(you)</span>}
                </p>
              </div>

              {/* Trophy bar */}
              <div className="pr-3">
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      entry.rank === 1 ? 'bg-amber-400' :
                      entry.isMe ? 'bg-violet-500' : 'bg-slate-600'
                    }`}
                    style={{ width: `${barPct}%` }}
                  />
                </div>
              </div>

              {/* Count */}
              <div className="text-right">
                <span className={`text-sm font-black tabular-nums ${
                  entry.rank === 1 ? 'text-amber-400' :
                  entry.isMe ? 'text-violet-300' : 'text-slate-300'
                }`}>
                  {entry.trophies}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-center text-slate-600 text-xs">Compete in challenges to earn trophies and rise to #1</p>
    </div>
  )
}
