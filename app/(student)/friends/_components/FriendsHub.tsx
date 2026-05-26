'use client'
import { useState } from 'react'
import { DiscoverTab } from './DiscoverTab'
import { FriendsTab } from './FriendsTab'
import { ChallengesTab } from './ChallengesTab'
import { WinnerBoard } from './WinnerBoard'

export type DiscoverChild = {
  id: string
  name: string
  trophies: number
  friendStatus: 'none' | 'pending_sent' | 'pending_received' | 'accepted'
  friendshipId: string | null
}

export type EnrichedChallenge = {
  id: string
  challenger_id: string
  challenged_id: string
  topic_id: string
  status: string
  trophy_bet: number
  winner_id: string | null
  deadline: string | null
  created_at: string
  completed_at: string | null
  isChallenger: boolean
  opponentId: string
  opponentName: string
  topicTitle: string
  topicIcon: string
  myScore: number | null
  theirScore: number | null
  iWon: boolean
  isDraw: boolean
}

type Props = {
  myChild: { id: string; name: string; trophies: number }
  discoverList: DiscoverChild[]
  friends: DiscoverChild[]
  challenges: EnrichedChallenge[]
  topics: { id: string; title: string; icon: string }[]
  leaderboard: { id: string; name: string; trophies: number; rank: number; isMe: boolean }[]
  pendingCount: number
}

type Tab = 'discover' | 'friends' | 'challenges' | 'board'

export function FriendsHub({ myChild, discoverList, friends, challenges, topics, leaderboard, pendingCount }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('discover')

  const tabs: { id: Tab; label: string; icon: string; badge?: number }[] = [
    { id: 'discover', label: 'Discover', icon: '🔍' },
    { id: 'friends', label: 'Friends', icon: '👥', badge: undefined },
    { id: 'challenges', label: 'Challenges', icon: '⚔️', badge: pendingCount || undefined },
    { id: 'board', label: 'Trophy Board', icon: '🏆' },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Friends & Challenges</h1>
          <p className="text-slate-400 text-sm mt-0.5">Compete with friends and climb the trophy board</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5">
          <span className="text-2xl">🏆</span>
          <div>
            <p className="text-amber-400 font-bold text-xl leading-none">{myChild.trophies}</p>
            <p className="text-slate-500 text-xs">Your trophies</p>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
              activeTab === tab.id
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
            {tab.badge && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'discover' && <DiscoverTab discoverList={discoverList} myChildId={myChild.id} />}
      {activeTab === 'friends' && <FriendsTab friends={friends} challenges={challenges} topics={topics} myChildId={myChild.id} myTrophies={myChild.trophies} />}
      {activeTab === 'challenges' && <ChallengesTab challenges={challenges} myChildId={myChild.id} />}
      {activeTab === 'board' && <WinnerBoard leaderboard={leaderboard} myChildId={myChild.id} />}
    </div>
  )
}
