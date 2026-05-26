'use client'
import { useState, useTransition } from 'react'
import { respondChallenge } from '@/lib/actions/friends'
import type { EnrichedChallenge } from './FriendsHub'

type Props = {
  challenges: EnrichedChallenge[]
  myChildId: string
}

function timeLeft(deadline: string | null): string {
  if (!deadline) return ''
  const ms = new Date(deadline).getTime() - Date.now()
  if (ms <= 0) return 'Expired'
  const h = Math.floor(ms / 3600000)
  const d = Math.floor(h / 24)
  if (d > 0) return `${d}d ${h % 24}h left`
  return `${h}h left`
}

function ScoreBadge({ score, won }: { score: number | null; won: boolean | null }) {
  if (score === null) return <span className="text-slate-500 text-sm">—</span>
  return (
    <span className={`text-sm font-bold ${won === true ? 'text-emerald-400' : won === false ? 'text-red-400' : 'text-slate-300'}`}>
      {score.toFixed(0)}%
    </span>
  )
}

export function ChallengesTab({ challenges, myChildId }: Props) {
  const [pending, startTransition] = useTransition()
  const [actionId, setActionId] = useState<string | null>(null)

  const incoming = challenges.filter(c => c.status === 'pending' && !c.isChallenger)
  const outgoing = challenges.filter(c => c.status === 'pending' && c.isChallenger)
  const active = challenges.filter(c => c.status === 'active')
  const completed = challenges.filter(c => c.status === 'completed' || c.status === 'declined')

  function handleRespond(id: string, accept: boolean) {
    setActionId(id)
    startTransition(async () => {
      await respondChallenge(id, accept)
      setActionId(null)
    })
  }

  if (challenges.length === 0) {
    return (
      <div className="text-center py-16 space-y-3">
        <div className="text-4xl">⚔️</div>
        <p className="text-white font-semibold">No challenges yet</p>
        <p className="text-slate-400 text-sm">Add friends and challenge them to compete for trophies!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Incoming challenges */}
      {incoming.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-xs font-semibold text-red-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            Incoming Challenges ({incoming.length})
          </h3>
          {incoming.map(c => (
            <div key={c.id} className="bg-slate-900 border border-red-700/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">{c.topicIcon}</span>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{c.opponentName} challenges you!</p>
                  <p className="text-slate-400 text-xs">Topic: {c.topicTitle} · Bet: 🏆 {c.trophy_bet}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRespond(c.id, true)}
                  disabled={pending && actionId === c.id}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-sm py-2.5 rounded-xl transition-colors"
                >
                  Accept ⚔️
                </button>
                <button
                  onClick={() => handleRespond(c.id, false)}
                  disabled={pending && actionId === c.id}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-slate-300 font-semibold text-sm py-2.5 rounded-xl transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Outgoing pending */}
      {outgoing.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Waiting for Response</h3>
          {outgoing.map(c => (
            <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 flex items-center gap-3">
              <span className="text-xl">{c.topicIcon}</span>
              <div className="flex-1">
                <p className="text-white text-sm font-semibold">{c.topicTitle}</p>
                <p className="text-slate-400 text-xs">vs {c.opponentName} · 🏆 {c.trophy_bet} bet</p>
              </div>
              <span className="text-slate-500 text-xs bg-slate-800 px-2 py-1 rounded-lg">Pending</span>
            </div>
          ))}
        </section>
      )}

      {/* Active challenges */}
      {active.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Active Challenges</h3>
          {active.map(c => (
            <div key={c.id} className="bg-slate-900 border border-amber-700/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">{c.topicIcon}</span>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{c.topicTitle}</p>
                  <p className="text-slate-400 text-xs">vs {c.opponentName} · 🏆 {c.trophy_bet} bet</p>
                </div>
                <span className="text-amber-400 text-xs font-medium">{timeLeft(c.deadline)}</span>
              </div>
              <div className="flex items-center justify-between bg-slate-800 rounded-xl px-4 py-3">
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-1">You</p>
                  <ScoreBadge score={c.myScore} won={null} />
                </div>
                <div className="text-slate-600 font-bold">VS</div>
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-1">{c.opponentName}</p>
                  <ScoreBadge score={c.theirScore} won={null} />
                </div>
              </div>
              <p className="text-slate-500 text-xs text-center">Complete the quiz on this topic to set your score!</p>
            </div>
          ))}
        </section>
      )}

      {/* Completed / declined */}
      {completed.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">History</h3>
          {completed.map(c => {
            const won = c.status === 'completed' && c.iWon
            const draw = c.isDraw
            const declined = c.status === 'declined'
            return (
              <div key={c.id} className={`bg-slate-900 border rounded-xl px-4 py-3.5 flex items-center gap-3 ${
                won ? 'border-emerald-700/30' : declined ? 'border-slate-800' : draw ? 'border-slate-700' : 'border-red-700/20'
              }`}>
                <span className="text-xl">{c.topicIcon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{c.topicTitle}</p>
                  <p className="text-slate-400 text-xs">vs {c.opponentName}</p>
                </div>
                <div className="text-right shrink-0">
                  {declined ? (
                    <span className="text-slate-500 text-xs">Declined</span>
                  ) : draw ? (
                    <span className="text-slate-400 text-xs font-medium">Draw 🤝</span>
                  ) : won ? (
                    <div>
                      <p className="text-emerald-400 text-xs font-bold">Won! 🏆 +{c.trophy_bet}</p>
                      <p className="text-slate-500 text-[10px]">{c.myScore?.toFixed(0)}% vs {c.theirScore?.toFixed(0)}%</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-red-400 text-xs font-bold">Lost 💔 -{c.trophy_bet}</p>
                      <p className="text-slate-500 text-[10px]">{c.myScore?.toFixed(0)}% vs {c.theirScore?.toFixed(0)}%</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </section>
      )}
    </div>
  )
}
