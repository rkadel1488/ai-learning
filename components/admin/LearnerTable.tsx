'use client'
import { useState } from 'react'
import { manuallyActivateUser } from '@/lib/actions/admin-activation'

export type LearnerRow = {
  child: { id: string; name: string; age: number; track: string; trophies: number }
  owner: { id: string; name: string | null; email: string } | null
  parentId: string | null
  authEmail: string | null
  topicsCompleted: number
  accuracy: number | null
  friends: number
  hasAccess: boolean
  purchase: { type: string; purchased_at: string } | null
}

const trackLabel: Record<string, string> = {
  story: 'Story · 6–10',
  levels: 'Levels · 11–15',
  sandbox: 'Sandbox · 16–20',
}

type RowState = 'idle' | 'loading' | 'done' | 'error'

export function LearnerTable({ rows, totalTopics }: { rows: LearnerRow[]; totalTopics: number }) {
  const [rowState, setRowState] = useState<Record<string, RowState>>({})
  const [rowError, setRowError] = useState<Record<string, string>>({})

  async function activate(userId: string) {
    setRowState(s => ({ ...s, [userId]: 'loading' }))
    setRowError(e => { const n = { ...e }; delete n[userId]; return n })
    const result = await manuallyActivateUser(userId, null)
    if (result.error) {
      setRowState(s => ({ ...s, [userId]: 'error' }))
      setRowError(e => ({ ...e, [userId]: result.error! }))
    } else {
      setRowState(s => ({ ...s, [userId]: 'done' }))
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className="font-semibold text-white">Learner Progress &amp; Access</h2>
        <span className="text-xs text-slate-400">{rows.length} learner{rows.length === 1 ? '' : 's'}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 text-xs uppercase tracking-wide border-b border-slate-800">
              <th className="px-5 py-3 font-medium">Learner</th>
              <th className="px-5 py-3 font-medium">Parent / Account</th>
              <th className="px-5 py-3 font-medium">Track</th>
              <th className="px-5 py-3 font-medium">Topics Done</th>
              <th className="px-5 py-3 font-medium">Accuracy</th>
              <th className="px-5 py-3 font-medium">Trophies</th>
              <th className="px-5 py-3 font-medium">Friends</th>
              <th className="px-5 py-3 font-medium">Full Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rows.map(({ child, owner, parentId, authEmail, topicsCompleted, accuracy, friends, hasAccess, purchase }) => {
              // Use owner.id if available, fall back to parentId for auth-only users
              const activatableId = owner?.id ?? parentId
              const state = activatableId ? (rowState[activatableId] ?? 'idle') : 'idle'
              const activated = state === 'done' || hasAccess

              return (
                <tr key={child.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3">
                    <div className="font-medium text-white">{child.name}</div>
                    <div className="text-xs text-slate-500">Age {child.age}</div>
                  </td>
                  <td className="px-5 py-3">
                    {owner ? (
                      <>
                        <div className="text-slate-300">{owner.name ?? '—'}</div>
                        <div className="text-xs text-slate-500">{owner.email}</div>
                      </>
                    ) : authEmail ? (
                      <>
                        <div className="text-slate-500 text-xs italic">not onboarded</div>
                        <div className="text-xs text-slate-500">{authEmail}</div>
                      </>
                    ) : (
                      <div className="text-slate-600 text-xs">—</div>
                    )}
                  </td>
                  <td className="px-5 py-3 text-slate-300">{trackLabel[child.track] ?? child.track}</td>
                  <td className="px-5 py-3 text-slate-300 tabular-nums">{topicsCompleted} / {totalTopics}</td>
                  <td className="px-5 py-3 text-slate-300 tabular-nums">{accuracy !== null ? `${accuracy}%` : '—'}</td>
                  <td className="px-5 py-3 text-amber-300 tabular-nums">🏆 {child.trophies}</td>
                  <td className="px-5 py-3 text-slate-300 tabular-nums">{friends}</td>
                  <td className="px-5 py-3">
                    {activated ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-semibold bg-emerald-400/10 px-2 py-1 rounded-full">
                        ✅ {state === 'done' ? 'esewa' : (purchase?.type ?? 'active')}
                      </span>
                    ) : state === 'error' ? (
                      <div className="space-y-1">
                        <button
                          onClick={() => activatableId && activate(activatableId)}
                          className="text-xs font-semibold px-3 py-1 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30 transition"
                        >
                          Error — retry
                        </button>
                        {activatableId && rowError[activatableId] && (
                          <div className="text-xs text-red-400/80 max-w-[200px] break-words">
                            {rowError[activatableId]}
                          </div>
                        )}
                      </div>
                    ) : activatableId ? (
                      <button
                        onClick={() => activate(activatableId)}
                        disabled={state === 'loading'}
                        className="text-xs font-semibold px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition"
                      >
                        {state === 'loading' ? 'Activating…' : 'Activate'}
                      </button>
                    ) : (
                      <span className="text-slate-600 text-xs">—</span>
                    )}
                  </td>
                </tr>
              )
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-8 text-center text-slate-500">No learners registered yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
