import Link from 'next/link'

type Props = {
  purchase: { purchased_at: string } | null
}

export function SubscriptionCard({ purchase }: Props) {
  if (!purchase) {
    return <UpgradeBanner />
  }

  const purchasedAt = new Date(purchase.purchased_at)
  const validUntil = new Date(purchasedAt.getTime() + 365 * 24 * 60 * 60 * 1000)
  const now = new Date()
  const isActive = now < validUntil
  const daysRemaining = Math.max(0, Math.ceil((validUntil.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
  const usedDays = 365 - daysRemaining
  const usedPct = Math.min(100, Math.round((usedDays / 365) * 100))

  const fmt = (d: Date) => d.toLocaleDateString('en-NP', { day: 'numeric', month: 'short', year: 'numeric' })

  if (!isActive) {
    return (
      <div className="bg-slate-900 border border-amber-700/40 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-xl shrink-0">⏰</div>
            <div>
              <p className="text-white font-semibold">Subscription Expired</p>
              <p className="text-slate-400 text-xs mt-0.5">Expired on {fmt(validUntil)}</p>
            </div>
          </div>
          <Link
            href="/upgrade"
            className="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm px-4 py-2 rounded-xl transition-colors"
          >
            Renew →
          </Link>
        </div>
        <p className="text-slate-400 text-xs">Renew for another year (Rs 1,000) to unlock all content again.</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-900 border border-emerald-700/30 rounded-2xl p-5 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-xl shrink-0">✅</div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-white font-semibold">Active Subscription</p>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">ACTIVE</span>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">Full access to all topics, lessons & games</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-white font-bold text-lg">{daysRemaining}</p>
          <p className="text-slate-500 text-xs">days left</p>
        </div>
      </div>

      {/* Year progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-slate-500">
          <span>Started {fmt(purchasedAt)}</span>
          <span>Expires {fmt(validUntil)}</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${daysRemaining < 30 ? 'bg-amber-500' : 'bg-emerald-500'}`}
            style={{ width: `${usedPct}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 text-right">{usedDays} of 365 days used</p>
      </div>

      {daysRemaining < 30 && (
        <div className="flex items-center justify-between bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-2.5">
          <p className="text-amber-300 text-xs font-medium">Expiring soon — renew to keep your access</p>
          <Link href="/upgrade" className="text-amber-400 text-xs font-bold hover:text-amber-300 transition-colors shrink-0 ml-3">
            Renew →
          </Link>
        </div>
      )}
    </div>
  )
}

function UpgradeBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-violet-500/25 p-5 sm:p-6" style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #0f0a1a 60%, #0a1020 100%)' }}>
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="flex-1 space-y-4">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-violet-500/15 border border-violet-500/25 text-violet-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2">
              🚀 Unlock Full Access
            </span>
            <p className="text-white font-black text-xl leading-snug">1 year of AI learning<br/>
              <span className="bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">for just Rs 1,000</span>
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-400">
            {['500+ quiz questions', 'Interactive games', 'Topic certificates', 'AI Genius certificate', 'All 10 topics', 'Progress tracking'].map(f => (
              <li key={f} className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center gap-3 shrink-0">
          <div className="text-center">
            <p className="text-white font-black text-3xl">Rs 1,000</p>
            <p className="text-slate-500 text-xs font-medium">per year · via eSewa</p>
          </div>
          <Link
            href="/upgrade"
            className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-black px-7 py-3 rounded-xl transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 text-sm whitespace-nowrap"
          >
            Subscribe Now →
          </Link>
        </div>
      </div>
    </div>
  )
}
