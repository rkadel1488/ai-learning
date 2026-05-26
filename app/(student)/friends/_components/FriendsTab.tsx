'use client'
import { useState, useTransition } from 'react'
import { sendChallenge } from '@/lib/actions/friends'
import type { DiscoverChild, EnrichedChallenge } from './FriendsHub'

type Props = {
  friends: DiscoverChild[]
  challenges: EnrichedChallenge[]
  topics: { id: string; title: string; icon: string }[]
  myChildId: string
  myTrophies: number
}

export function FriendsTab({ friends, challenges, topics, myChildId, myTrophies }: Props) {
  const [pending, startTransition] = useTransition()
  const [challenging, setChallenging] = useState<string | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<Record<string, string>>({})
  const [sent, setSent] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)

  if (friends.length === 0) {
    return (
      <div className="text-center py-16 space-y-3">
        <div className="text-4xl">👥</div>
        <p className="text-white font-semibold">No friends yet</p>
        <p className="text-slate-400 text-sm">Go to Discover to add players as friends!</p>
      </div>
    )
  }

  function hasActiveChallenge(friendId: string, topicId: string) {
    return challenges.some(c =>
      ['pending', 'active'].includes(c.status) &&
      c.topic_id === topicId &&
      ((c.challenger_id === myChildId && c.challenged_id === friendId) ||
       (c.challenged_id === myChildId && c.challenger_id === friendId))
    )
  }

  function handleChallenge(friendId: string) {
    const topicId = selectedTopic[friendId]
    if (!topicId) return
    if (hasActiveChallenge(friendId, topicId)) {
      setError('A challenge on this topic is already active')
      return
    }
    setError(null)
    startTransition(async () => {
      const result = await sendChallenge(friendId, topicId)
      if (result.error) setError(result.error)
      else {
        setSent(s => new Set([...s, `${friendId}-${topicId}`]))
        setChallenging(null)
      }
    })
  }

  return (
    <div className="space-y-3">
      {error && (
        <div className="bg-red-900/20 border border-red-700/30 rounded-xl px-4 py-3 text-sm text-red-300">{error}</div>
      )}
      {myTrophies < 10 && (
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3 text-sm text-amber-300">
          ⚠️ You need at least 10 trophies to send a challenge.
        </div>
      )}
      {friends.map(friend => (
        <div key={friend.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-blue-600 flex items-center justify-center text-sm font-bold shrink-0">
              {friend.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold">{friend.name}</p>
              <p className="text-amber-400 text-xs font-medium">🏆 {friend.trophies} trophies</p>
            </div>
            {challenging !== friend.id && (
              <button
                onClick={() => { setChallenging(friend.id); setError(null) }}
                disabled={myTrophies < 10}
                className="bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 text-xs font-bold px-3 py-2 rounded-lg transition-colors"
              >
                ⚔️ Challenge
              </button>
            )}
          </div>

          {challenging === friend.id && (
            <div className="border-t border-slate-800 pt-3 space-y-3">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Choose a topic to challenge on</p>
              <select
                value={selectedTopic[friend.id] ?? ''}
                onChange={e => setSelectedTopic(s => ({ ...s, [friend.id]: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-violet-500"
              >
                <option value="">Select topic...</option>
                {topics.map(t => {
                  const alreadyChallenged = hasActiveChallenge(friend.id, t.id)
                  const wasSent = sent.has(`${friend.id}-${t.id}`)
                  return (
                    <option key={t.id} value={t.id} disabled={alreadyChallenged || wasSent}>
                      {t.icon} {t.title}{alreadyChallenged ? ' (active)' : ''}
                    </option>
                  )
                })}
              </select>
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-3 py-2 text-xs text-amber-200">
                🏆 Bet: <strong>10 trophies</strong> · 3-day window · Higher quiz score wins
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleChallenge(friend.id)}
                  disabled={!selectedTopic[friend.id] || pending}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 font-bold text-sm py-2.5 rounded-xl transition-colors"
                >
                  {pending ? 'Sending...' : 'Send Challenge ⚔️'}
                </button>
                <button
                  onClick={() => { setChallenging(null); setError(null) }}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
