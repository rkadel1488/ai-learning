'use server'
import { createClient } from '@/lib/supabase/server'

function generateReferenceCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = 'AIL-'
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

export async function getOrCreatePaymentRequest() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Check for existing non-rejected request
  const { data: existing } = await supabase
    .from('payment_requests')
    .select('*')
    .eq('user_id', user.id)
    .in('status', ['pending', 'uploaded', 'approved'])
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (existing) return { data: existing }

  // Create new request with unique reference code
  let referenceCode = generateReferenceCode()
  let attempts = 0
  while (attempts < 5) {
    const { data, error } = await supabase
      .from('payment_requests')
      .insert({ user_id: user.id, reference_code: referenceCode })
      .select()
      .single()
    if (!error) return { data }
    // Collision on unique constraint — regenerate
    referenceCode = generateReferenceCode()
    attempts++
  }

  return { error: 'Failed to create payment request' }
}

export async function checkPurchaseStatus() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { hasPurchase: false }

  const { data } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', user.id)
    .limit(1)
    .single()

  return { hasPurchase: !!data }
}
