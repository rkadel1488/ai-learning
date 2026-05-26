type Entry = { id: string; name: string; trophies: number; rank: number; isMe: boolean }

type Props = {
  leaderboard: Entry[]
  myChildId: string
}

const rankStyle = ['bg-amber-400 text-slate-900', 'bg-slate-300 text-slate-900', 'bg-amber-700 text-white']
const rankEmoji = ['🥇', '🥈', '🥉']

export function WinnerBoard({ leaderboard }: Props) {
  const sorted = [...leaderboard].sort((a, b) => a.rank - b.rank)

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-amber-900/20 to-slate-900 border border-amber-700/30 rounded-2xl p-5 space-y-1">
        <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest">Global Trophy Board</p>
        <p className="text-white font-bold text-lg">Who has the most trophies?</p>
        <p className="text-slate-400 text-xs">Earn trophies by winning challenges. Top players earn eternal glory 🏆</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[40px_1fr_80px] px-4 py-2.5 border-b border-slate-800">
          <span className="text-slate-500 text-xs font-semibold">#</span>
          <span className="text-slate-500 text-xs font-semibold">Player</span>
          <span className="text-slate-500 text-xs font-semibold text-right">Trophies</span>
        </div>

        {sorted.map((entry, i) => (
          <div
            key={entry.id}
            className={`grid grid-cols-[40px_1fr_80px] items-center px-4 py-3.5 border-b border-slate-800/50 last:border-0 transition-colors ${
              entry.isMe ? 'bg-violet-900/20' : 'hover:bg-slate-800/30'
            }`}
          >
            {/* Rank */}
            <div className="flex items-center">
              {entry.rank <= 3 ? (
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${rankStyle[entry.rank - 1]}`}>
                  {rankEmoji[entry.rank - 1]}
                </span>
              ) : (
                <span className="text-slate-500 text-sm font-semibold w-7 text-center">{entry.rank}</span>
              )}
            </div>

            {/* Name */}
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                entry.isMe ? 'bg-violet-600' : 'bg-slate-700'
              }`}>
                {entry.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className={`text-sm font-semibold truncate ${entry.isMe ? 'text-violet-300' : 'text-white'}`}>
                  {entry.name}
                  {entry.isMe && <span className="text-violet-400 text-xs ml-1">(you)</span>}
                </p>
              </div>
            </div>

            {/* Trophies */}
            <div className="text-right">
              <span className={`text-sm font-bold ${entry.rank === 1 ? 'text-amber-400' : entry.isMe ? 'text-violet-300' : 'text-white'}`}>
                🏆 {entry.trophies}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-slate-600 text-xs">Challenge friends to win trophies and climb the board</p>
    </div>
  )
}
