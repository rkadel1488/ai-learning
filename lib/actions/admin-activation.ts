'use server'
import { revalidatePath } from 'next/cache'
import { createAdminClient, createAuthAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { isAdminEmail } from '@/lib/admin'

export type PendingActivationUser = {
  userId: string
  email: string
  name: string | null
  paymentRequestId: string | null
  referenceCode: string | null
  status: string
  requestedAt: string
}

async function assertAdmin() {
  const authClient = await createClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user || !isAdminEmail(user.email)) throw new Error('Unauthorized')
}

export async function getPendingActivationUsers(): Promise<PendingActivationUser[]> {
  const supabase = await createAdminClient()

  const { data: requests } = await supabase
    .from('payment_requests')
    .select('id, user_id, reference_code, status, created_at')
    .in('status', ['pending', 'uploaded', 'rejected'])
    .order('created_at', { ascending: false })

  if (!requests?.length) return []

  const userIds = [...new Set(requests.map(r => r.user_id))]

  const [{ data: users }, { data: purchases }] = await Promise.all([
    supabase.from('users').select('id, email, name').in('id', userIds),
    supabase
      .from('purchases')
      .select('user_id, purchased_at')
      .in('user_id', userIds)
      .gte('purchased_at', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()),
  ])

  const activeUserIds = new Set((purchases ?? []).map(p => p.user_id))
  const userMap = new Map((users ?? []).map(u => [u.id, u]))

  const seen = new Set<string>()
  const result: PendingActivationUser[] = []

  for (const req of requests) {
    if (seen.has(req.user_id) || activeUserIds.has(req.user_id)) continue
    seen.add(req.user_id)
    const u = userMap.get(req.user_id)
    result.push({
      userId: req.user_id,
      email: u?.email ?? '—',
      name: u?.name ?? null,
      paymentRequestId: req.id,
      referenceCode: req.reference_code,
      status: req.status,
      requestedAt: req.created_at,
    })
  }

  return result
}

export async function manuallyActivateUser(
  userId: string,
  paymentRequestId: string | null,
): Promise<{ success?: true; error?: string }> {
  try {
    await assertAdmin()
  } catch {
    return { error: 'Unauthorized' }
  }

  const supabase = await createAdminClient()

  // Ensure a public.users row exists (purchases FK requires it).
  // Users who signed up but never completed onboarding won't have one.
  const { data: existingUser, error: lookupError } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .maybeSingle()

  if (lookupError) return { error: `User lookup failed: ${lookupError.message}` }

  if (!existingUser) {
    const authAdmin = createAuthAdminClient()
    const { data: authData, error: authError } = await authAdmin.auth.admin.getUserById(userId)
    if (authError) return { error: `Auth lookup failed: ${authError.message}` }
    if (!authData?.user) return { error: `No auth account found for ID ${userId}` }

    const { error: upsertError } = await supabase.from('users').upsert(
      { id: userId, email: authData.user.email ?? '', role: 'parent' },
      { onConflict: 'id', ignoreDuplicates: true },
    )
    if (upsertError) return { error: `Failed to create user record: ${upsertError.message}` }
  }

  // Check for an existing active purchase to avoid duplicate inserts
  const { data: existingPurchase } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', userId)
    .gte('purchased_at', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString())
    .maybeSingle()

  if (!existingPurchase) {
    const { error: purchaseError } = await supabase.from('purchases').insert({
      user_id: userId,
      amount: 1000,
      currency: 'NPR',
      type: 'esewa',
    })
    if (purchaseError) return { error: `Failed to create purchase: ${purchaseError.message}` }
  }

  if (paymentRequestId) {
    await supabase
      .from('payment_requests')
      .update({ status: 'approved', reviewed_at: new Date().toISOString() })
      .eq('id', paymentRequestId)
  }

  revalidatePath('/admin')
  return { success: true }
}

export async function manuallyActivateByEmail(
  email: string,
): Promise<{ success?: true; error?: string }> {
  try {
    await assertAdmin()
  } catch {
    return { error: 'Unauthorized' }
  }

  const supabase = await createAdminClient()

  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('email', email.trim().toLowerCase())
    .single()

  if (!user) return { error: `No account found for "${email}"` }

  const { error: purchaseError } = await supabase.from('purchases').insert({
    user_id: user.id,
    amount: 1000,
    currency: 'NPR',
    type: 'esewa',
  })

  if (purchaseError) return { error: purchaseError.message }

  // Approve any pending payment request for this user
  await supabase
    .from('payment_requests')
    .update({ status: 'approved', reviewed_at: new Date().toISOString() })
    .eq('user_id', user.id)
    .in('status', ['pending', 'uploaded', 'rejected'])

  revalidatePath('/admin')
  return { success: true }
}
