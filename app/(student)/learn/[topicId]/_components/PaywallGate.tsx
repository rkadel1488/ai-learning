import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function PaywallGate() {
  return (
    <div className="text-center space-y-6 py-8">
      <div className="text-5xl">🔓</div>
      <div>
        <h2 className="text-2xl font-bold text-white">Unlock Full Access</h2>
        <p className="text-slate-400 text-sm mt-2">
          Topics 1–3 are completely free. Unlock topics 4–10 with a one-time payment.
        </p>
      </div>
      <div className="bg-slate-900 border border-violet-700 rounded-xl p-6 space-y-3">
        <div className="text-lg font-bold text-white">Full Access</div>
        <ul className="text-sm text-slate-300 space-y-1 text-left">
          <li>✅ All 7 advanced topics unlocked</li>
          <li>✅ 35 unique questions per topic per track</li>
          <li>✅ Topic completion certificates</li>
          <li>✅ AI Genius Certificate</li>
          <li>✅ Pay once, keep forever</li>
        </ul>
        <Link href="/upgrade">
          <Button className="w-full mt-2">Unlock Topics 4–10 →</Button>
        </Link>
      </div>
      <p className="text-slate-500 text-xs">One-time payment · No subscription · Yours forever</p>
    </div>
  )
}
