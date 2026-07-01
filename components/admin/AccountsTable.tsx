'use client'
import { useState } from 'react'
import { manuallyActivateUser } from '@/lib/actions/admin-activation'

export type AccountRow = {
  id: string
  name: string | null
  email: string
  role: string
  created_at: string
  hasAccess: boolean
  purchase: { type: string; purchased_at: string } | null
}

type RowState = 'idle' | 'loading' | 'done' | 'error'

export function AccountsTable({ accounts }: { accounts: AccountRow[] }) {
  const [rowState, setRowState] = useState<Record<string, RowState>>({})

  async function activate(userId: string) {
    setRowState(s => ({ ...s, [userId]: 'loading' }))
    const result = await manuallyActivateUser(userId, null)
    setRowState(s => ({ ...s, [userId]: result.error ? 'error' : 'done' }))
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className="font-semibold text-white">All Accounts</h2>
        <span className="text-xs text-slate-400">{accounts.length} account{accounts.length === 1 ? '' : 's'}</span>
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
            {accounts.map(u => {
              const state = rowState[u.id] ?? 'idle'
              const activated = state === 'done' || u.hasAccess

              return (
                <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3 text-white font-medium">{u.name ?? '—'}</td>
                  <td className="px-5 py-3 text-slate-400">{u.email}</td>
                  <td className="px-5 py-3 text-slate-300 capitalize">{u.role}</td>
                  <td className="px-5 py-3 text-slate-400">{new Date(u.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    {activated ? (
                      <span className="text-emerald-400 text-xs font-semibold">
                        ✅ {state === 'done' ? 'esewa' : u.purchase?.type} · {state === 'done' ? 'today' : (u.purchase ? new Date(u.purchase.purchased_at).toLocaleDateString() : '')}
                      </span>
                    ) : state === 'error' ? (
                      <button
                        onClick={() => activate(u.id)}
                        className="text-xs font-semibold px-3 py-1 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30 transition"
                      >
                        Error — retry
                      </button>
                    ) : (
                      <button
                        onClick={() => activate(u.id)}
                        disabled={state === 'loading'}
                        className="text-xs font-semibold px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition"
                      >
                        {state === 'loading' ? 'Activating…' : 'Activate'}
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
