import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getOrCreatePaymentRequest } from '@/lib/actions/payment'
import { PaymentFlow } from './_components/PaymentFlow'

export default async function UpgradePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Redirect if already purchased
  const { data: purchase } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', user.id)
    .limit(1)
    .single()

  if (purchase) redirect('/topics?unlocked=1')

  const result = await getOrCreatePaymentRequest()

  if (result.error || !result.data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Something went wrong. Please refresh and try again.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 py-12">
      <PaymentFlow
        referenceCode={result.data.reference_code}
        status={result.data.status}
        amount={result.data.amount}
      />
    </div>
  )
}
