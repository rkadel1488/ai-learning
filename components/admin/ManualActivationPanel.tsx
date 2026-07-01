'use client'
import { useState } from 'react'
import { manuallyActivateUser, manuallyActivateByEmail } from '@/lib/actions/admin-activation'
import type { PendingActivationUser } from '@/lib/actions/admin-activation'

type RowState = 'idle' | 'loading' | 'done' | 'error'

const STATUS_BADGE: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20',
  uploaded: 'bg-blue-500/10 text-blue-300 border border-blue-500/20',
  rejected: 'bg-red-500/10 text-red-300 border border-red-500/20',
}

export function ManualActivationPanel({ initialUsers }: { initialUsers: PendingActivationUser[] }) {
  const [rowState, setRowState] = useState<Record<string, RowState>>({})
  const [rowError, setRowError] = useState<Record<string, string>>({})
  const [emailInput, setEmailInput] = useState('')
  const [emailState, setEmailState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [emailMsg, setEmailMsg] = useState('')

  async function activate(userId: string, paymentRequestId: string | null) {
    setRowState(s => ({ ...s, [userId]: 'loading' }))
    const result = await manuallyActivateUser(userId, paymentRequestId)
    if (result.error) {
      setRowState(s => ({ ...s, [userId]: 'error' }))
      setRowError(e => ({ ...e, [userId]: result.error! }))
    } else {
      setRowState(s => ({ ...s, [userId]: 'done' }))
    }
  }

  async function activateByEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!emailInput.trim()) return
    setEmailState('loading')
    setEmailMsg('')
    const result = await manuallyActivateByEmail(emailInput)
    if (result.error) {
      setEmailState('error')
      setEmailMsg(result.error)
    } else {
      setEmailState('done')
      setEmailMsg(`Access granted to ${emailInput.trim()}`)
      setEmailInput('')
    }
  }

  return (
    <div className="space-y-4">
      {/* Pending payment requests table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-white">Manual Activation</h2>
            <p className="text-xs text-slate-500 mt-0.5">Users with pending or failed payment screenshot uploads</p>
          </div>
          {initialUsers.length > 0 && (
            <span className="text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-full">
              {initialUsers.length} pending
            </span>
          )}
        </div>

        {initialUsers.length === 0 ? (
          <p className="px-5 py-8 text-center text-slate-500 text-sm">No pending activations.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 text-xs uppercase tracking-wide border-b border-slate-800">
                  <th className="px-5 py-3 font-medium">User</th>
                  <th className="px-5 py-3 font-medium">Reference Code</th>
                  <th className="px-5 py-3 font-medium">Screenshot Status</th>
                  <th className="px-5 py-3 font-medium">Requested</th>
                  <th className="px-5 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {initialUsers.map(u => {
                  const state = rowState[u.userId] ?? 'idle'
                  return (
                    <tr
                      key={u.userId}
                      className={`transition-colors ${state === 'done' ? 'bg-emerald-500/5' : 'hover:bg-slate-800/40'}`}
                    >
                      <td className="px-5 py-3">
                        <div className="font-medium text-white">{u.name ?? '—'}</div>
                        <div className="text-xs text-slate-500">{u.email}</div>
                      </td>
                      <td className="px-5 py-3 font-mono text-slate-300 text-xs">{u.referenceCode ?? '—'}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_BADGE[u.status] ?? ''}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-400 text-xs">
                        {new Date(u.requestedAt).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-3">
                        {state === 'done' ? (
                          <span className="text-emerald-400 text-xs font-semibold">✅ Activated</span>
                        ) : state === 'error' ? (
                          <div className="space-y-1">
                            <button
                              onClick={() => activate(u.userId, u.paymentRequestId)}
                              className="text-xs font-semibold px-3 py-1 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30 transition"
                            >
                              Error — retry
                            </button>
                            {rowError[u.userId] && (
                              <div className="text-xs text-red-400/80 max-w-[200px] break-words">
                                {rowError[u.userId]}
                              </div>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() => activate(u.userId, u.paymentRequestId)}
                            disabled={state === 'loading'}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition"
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
        )}
      </div>

      {/* Activate by email (fallback for users with no payment request at all) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-1">Activate by email</h3>
        <p className="text-xs text-slate-500 mb-4">
          For users who paid through other means and have no payment request on record.
        </p>
        <form onSubmit={activateByEmail} className="flex items-center gap-3">
          <input
            type="email"
            value={emailInput}
            onChange={e => { setEmailInput(e.target.value); setEmailState('idle'); setEmailMsg('') }}
            placeholder="user@example.com"
            required
            className="flex-1 min-w-0 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={emailState === 'loading' || !emailInput.trim()}
            className="shrink-0 text-sm font-semibold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition"
          >
            {emailState === 'loading' ? 'Activating…' : 'Activate'}
          </button>
        </form>
        {emailMsg && (
          <p className={`text-xs mt-2 ${emailState === 'done' ? 'text-emerald-400' : 'text-red-400'}`}>
            {emailState === 'done' ? '✅ ' : '⚠️ '}{emailMsg}
          </p>
        )}
      </div>
    </div>
  )
}
