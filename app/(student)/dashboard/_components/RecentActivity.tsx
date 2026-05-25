function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

function formatMs(ms: number | null): string {
  if (!ms) return ''
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

type ActivityItem = {
  id: string
  is_correct: boolean
  time_taken_ms: number | null
  answered_at: string
  questions: {
    type: string
    prompt: string
    topics: {
      title: string
      icon: string
    } | null
  } | null
}

export function RecentActivity({ activity }: { activity: ActivityItem[] }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800">
        <h2 className="font-semibold text-white">Recent Activity</h2>
        <p className="text-xs text-slate-400 mt-0.5">Last {activity.length} answers</p>
      </div>

      {activity.length === 0 ? (
        <div className="px-5 py-8 text-center">
          <div className="text-3xl mb-2">📝</div>
          <p className="text-sm text-slate-400">No activity yet. Start learning!</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-800">
          {activity.map(item => (
            <div key={item.id} className="px-5 py-3 flex items-start gap-3">
              <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                item.is_correct ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {item.is_correct ? '✓' : '✗'}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-sm">{item.questions?.topics?.icon}</span>
                  <span className="text-xs font-medium text-slate-300 truncate">
                    {item.questions?.topics?.title ?? 'Unknown topic'}
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wide shrink-0">
                    {item.questions?.type}
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate">{item.questions?.prompt}</p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs text-slate-500">{timeAgo(item.answered_at)}</div>
                {item.time_taken_ms && (
                  <div className="text-[10px] text-slate-600 mt-0.5">{formatMs(item.time_taken_ms)}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
