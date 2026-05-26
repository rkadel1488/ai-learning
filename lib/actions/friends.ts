'use server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

async function getMyChild() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { supabase, child: null, error: 'Not authenticated' as const }
  const { data: child } = await supabase
    .from('children')
    .select('id, trophies')
    .eq('parent_id', user.id)
    .limit(1)
    .single()
  return { supabase, child: child ?? null, error: child ? null : ('No child' as const) }
}

export async function sendFriendRequest(addresseeChildId: string) {
  const { supabase, child, error } = await getMyChild()
  if (error || !child) return { error }

  // Check both directions
  const { data: existing } = await supabase
    .from('friendships')
    .select('id')
    .or(
      `and(requester_id.eq.${child.id},addressee_id.eq.${addresseeChildId}),and(requester_id.eq.${addresseeChildId},addressee_id.eq.${child.id})`
    )
    .limit(1)
    .maybeSingle()

  if (existing) return { error: 'Friend request already exists' }

  const { error: err } = await supabase
    .from('friendships')
    .insert({ requester_id: child.id, addressee_id: addresseeChildId })

  if (err) return { error: err.message }
  revalidatePath('/friends')
  return { data: true }
}

export async function respondFriendRequest(friendshipId: string, accept: boolean) {
  const { supabase, child, error } = await getMyChild()
  if (error || !child) return { error }

  const { error: err } = await supabase
    .from('friendships')
    .update({ status: accept ? 'accepted' : 'rejected' })
    .eq('id', friendshipId)
    .eq('addressee_id', child.id)
    .eq('status', 'pending')

  if (err) return { error: err.message }
  revalidatePath('/friends')
  return { data: true }
}

export async function sendChallenge(challengedChildId: string, topicId: string) {
  const { supabase, child, error } = await getMyChild()
  if (error || !child) return { error }
  if (child.trophies < 10) return { error: 'You need at least 10 trophies to challenge' }

  const { data: friendship } = await supabase
    .from('friendships')
    .select('id')
    .eq('status', 'accepted')
    .or(
      `and(requester_id.eq.${child.id},addressee_id.eq.${challengedChildId}),and(requester_id.eq.${challengedChildId},addressee_id.eq.${child.id})`
    )
    .limit(1)
    .maybeSingle()

  if (!friendship) return { error: 'You can only challenge friends' }

  const { data: existing } = await supabase
    .from('challenges')
    .select('id')
    .in('status', ['pending', 'active'])
    .eq('topic_id', topicId)
    .or(
      `and(challenger_id.eq.${child.id},challenged_id.eq.${challengedChildId}),and(challenger_id.eq.${challengedChildId},challenged_id.eq.${child.id})`
    )
    .limit(1)
    .maybeSingle()

  if (existing) return { error: 'A challenge on this topic is already active' }

  const { error: err } = await supabase
    .from('challenges')
    .insert({ challenger_id: child.id, challenged_id: challengedChildId, topic_id: topicId })

  if (err) return { error: err.message }
  revalidatePath('/friends')
  return { data: true }
}

export async function respondChallenge(challengeId: string, accept: boolean) {
  const { supabase, child, error } = await getMyChild()
  if (error || !child) return { error }

  if (!accept) {
    await supabase
      .from('challenges')
      .update({ status: 'declined' })
      .eq('id', challengeId)
      .eq('challenged_id', child.id)
      .eq('status', 'pending')
    revalidatePath('/friends')
    return { data: true }
  }

  const { data: challenge } = await supabase
    .from('challenges')
    .select('id, challenger_id, trophy_bet')
    .eq('id', challengeId)
    .eq('challenged_id', child.id)
    .eq('status', 'pending')
    .single()

  if (!challenge) return { error: 'Challenge not found' }
  if (child.trophies < challenge.trophy_bet) return { error: 'Not enough trophies to accept' }

  const { data: challenger } = await supabase
    .from('children')
    .select('trophies')
    .eq('id', challenge.challenger_id)
    .single()

  if ((challenger?.trophies ?? 0) < challenge.trophy_bet) {
    return { error: 'Challenger no longer has enough trophies' }
  }

  const deadline = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
  await supabase
    .from('challenges')
    .update({ status: 'active', deadline })
    .eq('id', challengeId)

  revalidatePath('/friends')
  return { data: true }
}

export async function resolveChallenge(challengeId: string) {
  const { supabase, error } = await getMyChild()
  if (error) return { error }

  const { data: challenge } = await supabase
    .from('challenges')
    .select('id, challenger_id, challenged_id, topic_id, trophy_bet, deadline')
    .eq('id', challengeId)
    .eq('status', 'active')
    .single()

  if (!challenge) return { error: 'Challenge not active' }
  if (challenge.deadline && new Date(challenge.deadline) > new Date()) {
    return { error: 'Deadline not reached' }
  }

  const [{ data: cProg }, { data: dProg }] = await Promise.all([
    supabase.from('progress').select('score_pct, questions_answered').eq('child_id', challenge.challenger_id).eq('topic_id', challenge.topic_id).maybeSingle(),
    supabase.from('progress').select('score_pct, questions_answered').eq('child_id', challenge.challenged_id).eq('topic_id', challenge.topic_id).maybeSingle(),
  ])

  const cPlayed = (cProg?.questions_answered ?? 0) > 0
  const dPlayed = (dProg?.questions_answered ?? 0) > 0
  const cPct = Number(cProg?.score_pct ?? 0)
  const dPct = Number(dProg?.score_pct ?? 0)

  let winnerId: string | null = null
  let loserId: string | null = null

  if (cPlayed && dPlayed) {
    if (cPct > dPct) { winnerId = challenge.challenger_id; loserId = challenge.challenged_id }
    else if (dPct > cPct) { winnerId = challenge.challenged_id; loserId = challenge.challenger_id }
  } else if (cPlayed) {
    winnerId = challenge.challenger_id; loserId = challenge.challenged_id
  } else if (dPlayed) {
    winnerId = challenge.challenged_id; loserId = challenge.challenger_id
  }

  if (winnerId && loserId) {
    const [{ data: winnerRow }, { data: loserRow }] = await Promise.all([
      supabase.from('children').select('trophies').eq('id', winnerId).single(),
      supabase.from('children').select('trophies').eq('id', loserId).single(),
    ])
    await Promise.all([
      supabase.from('children').update({ trophies: (winnerRow?.trophies ?? 0) + challenge.trophy_bet }).eq('id', winnerId),
      supabase.from('children').update({ trophies: Math.max(0, (loserRow?.trophies ?? 0) - challenge.trophy_bet) }).eq('id', loserId),
    ])
  }

  await supabase
    .from('challenges')
    .update({ status: 'completed', winner_id: winnerId, challenger_score: cPct, challenged_score: dPct, completed_at: new Date().toISOString() })
    .eq('id', challengeId)

  revalidatePath('/friends')
  return { data: { winnerId } }
}
