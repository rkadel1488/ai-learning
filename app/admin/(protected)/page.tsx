import { createAdminClient } from '@/lib/supabase/admin'
import { getPendingActivationUsers } from '@/lib/actions/admin-activation'
import { ManualActivationPanel } from '@/components/admin/ManualActivationPanel'
import { LearnerTable } from '@/components/admin/LearnerTable'

const PURCHASE_VALIDITY_MS = 365 * 24 * 60 * 60 * 1000

export default async function AdminDashboardPage() {
  const supabase = await createAdminClient()

  const [pendingActivations, [usersRes, childrenRes, progressRes, purchasesRes, friendshipsRes, topicsRes]] = await Promise.all([
    getPendingActivationUsers(),
    Promise.all([
    supabase.from('users').select('id, email, name, role, created_at').order('created_at', { ascending: false }),
    supabase.from('children').select('id, parent_id, name, age, track, trophies, created_at'),
    supabase.from('progress').select('child_id, topic_id, questions_answered, questions_correct, score_pct, completed_at'),
    supabase.from('purchases').select('user_id, type, purchased_at').order('purchased_at', { ascending: false }),
    supabase.from('friendships').select('requester_id, addressee_id, status').eq('status', 'accepted'),
      supabase.from('topics').select('id'),
    ]),
  ])

  const users = usersRes.data ?? []
  const children = childrenRes.data ?? []
  const progressRows = progressRes.data ?? []
  const purchases = purchasesRes.data ?? []
  const friendships = friendshipsRes.data ?? []
  const totalTopics = (topicsRes.data ?? []).length

  // Latest purchase per user, with 365-day validity window
  const now = Date.now()
  const latestPurchaseByUser = new Map<string, { type: string; purchased_at: string }>()
  for (const p of purchases) {
    if (!latestPurchaseByUser.has(p.user_id)) latestPurchaseByUser.set(p.user_id, p)
  }
  const hasActiveAccess = (userId: string) => {
    const p = latestPurchaseByUser.get(userId)
    return !!p && now - new Date(p.purchased_at).getTime() < PURCHASE_VALIDITY_MS
  }

  // Friend count per child (accepted friendships, counted from either side)
  const friendCountByChild = new Map<string, number>()
  for (const f of friendships) {
    friendCountByChild.set(f.requester_id, (friendCountByChild.get(f.requester_id) ?? 0) + 1)
    friendCountByChild.set(f.addressee_id, (friendCountByChild.get(f.addressee_id) ?? 0) + 1)
  }

  // Progress rollup per child
  const progressByChild = new Map<string, typeof progressRows>()
  for (const row of progressRows) {
    const list = progressByChild.get(row.child_id) ?? []
    list.push(row)
    progressByChild.set(row.child_id, list)
  }

  const childRows = children.map(child => {
    const owner = users.find(u => u.id === child.parent_id) ?? null
    const rows = progressByChild.get(child.id) ?? []
    const answered = rows.reduce((sum, r) => sum + r.questions_answered, 0)
    const correct = rows.reduce((sum, r) => sum + r.questions_correct, 0)
    const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : null
    const completed = rows.filter(r => r.completed_at).length
    return {
      child,
      owner,
      topicsCompleted: completed,
      accuracy,
      friends: friendCountByChild.get(child.id) ?? 0,
      hasAccess: owner ? hasActiveAccess(owner.id) : false,
      purchase: owner ? latestPurchaseByUser.get(owner.id) ?? null : null,
    }
  })

  const totalUsers = users.length
  const activeSubscribers = users.filter(u => hasActiveAccess(u.id)).length
  const totalFriendships = friendships.length / 2
  const totalRegisteredChildren = children.length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Overview of accounts, progress, purchases, and friend networks.</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <SummaryCard icon="👤" label="Total Accounts" value={totalUsers} accent="violet" />
        <SummaryCard icon="🧒" label="Registered Learners" value={totalRegisteredChildren} accent="blue" />
        <SummaryCard icon="💳" label="Active Subscriptions" value={activeSubscribers} accent="emerald" />
        <SummaryCard icon="🤝" label="Friend Connections" value={totalFriendships} accent="amber" />
      </div>

      <ManualActivationPanel initialUsers={pendingActivations} />

      <LearnerTable rows={childRows} totalTopics={totalTopics} />

      {/* All accounts table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-semibold text-white">All Accounts</h2>
          <span className="text-xs text-slate-400">{users.length} account{users.length === 1 ? '' : 's'}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 text-xs uppercase tracking-wide border-b border-slate-800">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Joined</th>
                <th className="px-5 py-3 font-medium">Full Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map(u => {
                const access = hasActiveAccess(u.id)
                const purchase = latestPurchaseByUser.get(u.id) ?? null
                return (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3 text-white font-medium">{u.name ?? '—'}</td>
                    <td className="px-5 py-3 text-slate-400">{u.email}</td>
                    <td className="px-5 py-3 text-slate-300 capitalize">{u.role}</td>
                    <td className="px-5 py-3 text-slate-400">{new Date(u.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-3">
                      {access ? (
                        <span className="text-emerald-400 text-xs font-semibold">
                          ✅ {purchase?.type} · {purchase ? new Date(purchase.purchased_at).toLocaleDateString() : ''}
                        </span>
                      ) : (
                        <span className="text-slate-500 text-xs">— none</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ icon, label, value, accent }: { icon: string; label: string; value: number; accent: 'violet' | 'blue' | 'emerald' | 'amber' }) {
  const accentClasses: Record<string, string> = {
    violet: 'border-violet-500/25 text-violet-300',
    blue: 'border-blue-500/25 text-blue-300',
    emerald: 'border-emerald-500/25 text-emerald-300',
    amber: 'border-amber-500/25 text-amber-300',
  }
  return (
    <div className={`bg-slate-900/80 border ${accentClasses[accent]} rounded-2xl p-5`}>
      <div className="text-xl mb-1">{icon}</div>
      <div className="text-3xl font-black text-white tabular-nums">{value.toLocaleString()}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
  )
}
