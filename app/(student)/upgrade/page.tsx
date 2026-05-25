import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getOrCreatePaymentRequest } from '@/lib/actions/payment'
import { PaymentFlow } from './_components/PaymentFlow'

export default async function UpgradePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Redirect if subscription is still active (purchased within 365 days)
  const { data: purchase } = await supabase
    .from('purchases')
    .select('purchased_at')
    .eq('user_id', user.id)
    .order('purchased_at', { ascending: false })
    .limit(1)
    .single()

  const isActive = !!purchase && (
    Date.now() - new Date(purchase.purchased_at).getTime() < 365 * 24 * 60 * 60 * 1000
  )
  if (isActive) redirect('/dashboard')

  const result = await getOrCreatePaymentRequest()

  if (result.error || !result.data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Something went wrong. Please refresh and try again.
      </div>
    )
  }

  const isRenewal = !!purchase && !isActive

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 py-12">
      <PaymentFlow
        referenceCode={result.data.reference_code}
        status={result.data.status}
        amount={result.data.amount}
        isRenewal={isRenewal}
      />
    </div>
  )
}
