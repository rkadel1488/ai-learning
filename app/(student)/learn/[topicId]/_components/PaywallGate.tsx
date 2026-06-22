import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function PaywallGate() {
  return (
    <div className="text-center space-y-6 py-8">
      <div className="text-5xl">🔓</div>
      <div>
        <h2 className="text-2xl font-bold text-white">You&apos;ve used your free questions!</h2>
        <p className="text-slate-400 text-sm mt-2">
          The first 20 questions of every topic are free. Unlock all 55 questions per topic with a one-time payment.
        </p>
      </div>
      <div className="bg-slate-900 border border-violet-700 rounded-xl p-6 space-y-3">
        <div className="text-lg font-bold text-white">Full Access</div>
        <ul className="text-sm text-slate-300 space-y-1 text-left">
          <li>✅ All 10 topics fully unlocked</li>
          <li>✅ 55 unique questions per topic per track</li>
          <li>✅ Topic completion certificates</li>
          <li>✅ AI Genius Certificate</li>
          <li>✅ Pay once, keep forever</li>
        </ul>
        <Link href="/upgrade">
          <Button className="w-full mt-2">Unlock Full Access →</Button>
        </Link>
      </div>
      <p className="text-slate-500 text-xs">One-time payment · No subscription · Yours forever</p>
    </div>
  )
}
