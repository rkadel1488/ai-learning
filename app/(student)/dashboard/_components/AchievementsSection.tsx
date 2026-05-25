const achievementConfig = {
  badge: { icon: '🏅', label: 'Badge' },
  topic_cert: { icon: '📜', label: 'Topic Certificate' },
  genius_cert: { icon: '🧠', label: 'Genius Certificate' },
}

type Achievement = {
  id: string
  type: 'badge' | 'topic_cert' | 'genius_cert'
  topic_id: string | null
  earned_at: string
  topics: { title: string; icon: string } | null
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800">
        <h2 className="font-semibold text-white">Achievements</h2>
        <p className="text-xs text-slate-400 mt-0.5">{achievements.length} earned</p>
      </div>

      {achievements.length === 0 ? (
        <div className="px-5 py-8 text-center">
          <div className="text-3xl mb-2">🎖️</div>
          <p className="text-sm text-slate-400">Complete topics to earn achievements!</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-800">
          {achievements.map(a => {
            const config = achievementConfig[a.type]
            return (
              <div key={a.id} className="px-5 py-3 flex items-center gap-3">
                <div className="text-2xl w-8 text-center shrink-0">{config.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white">{config.label}</div>
                  {a.topics && (
                    <div className="text-xs text-slate-400 mt-0.5">
                      {a.topics.icon} {a.topics.title}
                    </div>
                  )}
                </div>
                <div className="text-xs text-slate-500 shrink-0">{formatDate(a.earned_at)}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
