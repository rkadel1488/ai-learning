import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { resolveChallenge } from '@/lib/actions/friends'
import { FriendsHub } from './_components/FriendsHub'
import type { FriendshipStatus } from '@/lib/supabase/types'

export default async function FriendsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: child } = await supabase
    .from('children')
    .select('id, name, trophies')
    .eq('parent_id', user.id)
    .limit(1)
    .single()

  if (!child) redirect('/onboarding')

  // Auto-resolve any expired challenges before fetching
  const { data: expired } = await supabase
    .from('challenges')
    .select('id')
    .eq('status', 'active')
    .lt('deadline', new Date().toISOString())
    .or(`challenger_id.eq.${child.id},challenged_id.eq.${child.id}`)

  if (expired?.length) {
    await Promise.all(expired.map(c => resolveChallenge(c.id)))
  }

  // Parallel fetches
  const [discoverRes, friendshipsRes, challengesRes, topicsRes, leaderboardRes] = await Promise.all([
    supabase
      .from('children')
      .select('id, name, trophies')
      .neq('id', child.id)
      .order('trophies', { ascending: false })
      .limit(50),
    supabase
      .from('friendships')
      .select('id, requester_id, addressee_id, status, created_at')
      .or(`requester_id.eq.${child.id},addressee_id.eq.${child.id}`),
    supabase
      .from('challenges')
      .select('id, challenger_id, challenged_id, topic_id, status, trophy_bet, challenger_score, challenged_score, winner_id, deadline, created_at, completed_at')
      .or(`challenger_id.eq.${child.id},challenged_id.eq.${child.id}`)
      .order('created_at', { ascending: false }),
    supabase
      .from('topics')
      .select('id, title, icon')
      .order('order_index', { ascending: true }),
    supabase
      .from('children')
      .select('id, name, trophies')
      .order('trophies', { ascending: false })
      .limit(20),
  ])

  const allChildren = discoverRes.data ?? []
  const friendships = friendshipsRes.data ?? []
  const rawChallenges = challengesRes.data ?? []
  const topics = topicsRes.data ?? []
  const leaderboard = leaderboardRes.data ?? []

  // Build friendship status map keyed by other child id
  const friendshipMap = new Map<string, { id: string; status: FriendshipStatus; iAmRequester: boolean }>()
  for (const f of friendships) {
    const otherId = f.requester_id === child.id ? f.addressee_id : f.requester_id
    friendshipMap.set(otherId, { id: f.id, status: f.status as FriendshipStatus, iAmRequester: f.requester_id === child.id })
  }

  // Enrich discover list with friendship status
  const discoverList = allChildren.map(c => {
    const fs = friendshipMap.get(c.id)
    const friendStatus: 'none' | 'pending_sent' | 'pending_received' | 'accepted' =
      !fs ? 'none'
      : fs.status === 'accepted' ? 'accepted'
      : fs.iAmRequester ? 'pending_sent'
      : 'pending_received'
    return { ...c, friendStatus, friendshipId: fs?.id ?? null }
  })

  // Friends list (accepted only)
  const friends = discoverList.filter(c => c.friendStatus === 'accepted')

  // Build child lookup for challenge enrichment
  const childMap = new Map<string, { name: string; trophies: number }>()
  childMap.set(child.id, { name: child.name, trophies: child.trophies })
  for (const c of allChildren) childMap.set(c.id, { name: c.name, trophies: c.trophies })

  const topicMap = new Map(topics.map(t => [t.id, t]))

  // Enrich challenges
  const challenges = rawChallenges.map(c => {
    const isChallenger = c.challenger_id === child.id
    const opponentId = isChallenger ? c.challenged_id : c.challenger_id
    const opponent = childMap.get(opponentId) ?? { name: 'Unknown', trophies: 0 }
    const topic = topicMap.get(c.topic_id) ?? { title: 'Unknown Topic', icon: '❓' }
    const myScore = isChallenger ? c.challenger_score : c.challenged_score
    const theirScore = isChallenger ? c.challenged_score : c.challenger_score
    const iWon = c.winner_id === child.id
    return {
      ...c,
      isChallenger,
      opponentId,
      opponentName: opponent.name,
      topicTitle: topic.title,
      topicIcon: topic.icon,
      myScore: myScore !== null ? Number(myScore) : null,
      theirScore: theirScore !== null ? Number(theirScore) : null,
      iWon,
      isDraw: c.status === 'completed' && c.winner_id === null,
    }
  })

  const pendingCount = challenges.filter(c => c.status === 'pending' && !c.isChallenger).length

  // Leaderboard with rank
  const leaderboardRanked = leaderboard.map((c, i) => ({
    ...c,
    rank: i + 1,
    isMe: c.id === child.id,
  }))
  // Ensure current child appears even if not in top 20
  const meInBoard = leaderboardRanked.find(c => c.id === child.id)
  if (!meInBoard) {
    const myRank = leaderboard.filter(c => c.trophies > child.trophies).length + 1
    leaderboardRanked.push({ ...child, rank: myRank, isMe: true })
  }

  return (
    <FriendsHub
      myChild={child}
      discoverList={discoverList}
      friends={friends}
      challenges={challenges}
      topics={topics}
      leaderboard={leaderboardRanked}
      pendingCount={pendingCount}
    />
  )
}
