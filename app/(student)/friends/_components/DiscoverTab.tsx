'use client'
import { useState, useTransition } from 'react'
import { sendFriendRequest, respondFriendRequest } from '@/lib/actions/friends'
import type { DiscoverChild } from './FriendsHub'

type Props = {
  discoverList: DiscoverChild[]
  myChildId: string
}

export function DiscoverTab({ discoverList }: Props) {
  const [pending, startTransition] = useTransition()
  const [actionId, setActionId] = useState<string | null>(null)
  const [localStatus, setLocalStatus] = useState<Record<string, DiscoverChild['friendStatus']>>({})

  function getStatus(child: DiscoverChild): DiscoverChild['friendStatus'] {
    return localStatus[child.id] ?? child.friendStatus
  }

  function handleAdd(childId: string) {
    setActionId(childId)
    setLocalStatus(s => ({ ...s, [childId]: 'pending_sent' }))
    startTransition(async () => {
      await sendFriendRequest(childId)
      setActionId(null)
    })
  }

  function handleRespond(friendshipId: string, childId: string, accept: boolean) {
    setActionId(childId)
    setLocalStatus(s => ({ ...s, [childId]: accept ? 'accepted' : 'none' }))
    startTransition(async () => {
      await respondFriendRequest(friendshipId, accept)
      setActionId(null)
    })
  }

  if (discoverList.length === 0) {
    return (
      <div className="text-center py-16 space-y-3">
        <div className="text-4xl">🌐</div>
        <p className="text-slate-400">No other players yet. Invite friends to join!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-slate-500 text-xs px-1">{discoverList.length} players found</p>
      {discoverList.map(child => {
        const status = getStatus(child)
        const isLoading = pending && actionId === child.id
        return (
          <div key={child.id} className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-sm font-bold shrink-0">
              {child.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold truncate">{child.name}</p>
              <p className="text-amber-400 text-xs font-medium">🏆 {child.trophies} trophies</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {status === 'none' && (
                <button
                  onClick={() => handleAdd(child.id)}
                  disabled={isLoading}
                  className="bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                >
                  {isLoading ? '...' : '+ Add Friend'}
                </button>
              )}
              {status === 'pending_sent' && (
                <span className="text-slate-400 text-xs font-medium bg-slate-800 px-3 py-2 rounded-lg">Pending...</span>
              )}
              {status === 'pending_received' && (
                <>
                  <button
                    onClick={() => handleRespond(child.friendshipId!, child.id, true)}
                    disabled={isLoading}
                    className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRespond(child.friendshipId!, child.id, false)}
                    disabled={isLoading}
                    className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-slate-300 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    Decline
                  </button>
                </>
              )}
              {status === 'accepted' && (
                <span className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                  <span>✓</span> Friends
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
