import { unlockAdmin } from './actions'

export default async function AdminUnlockPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-4xl">🔒</span>
          <h1 className="text-xl font-bold text-white mt-3">Admin Access</h1>
          <p className="text-slate-500 text-sm mt-1">Enter your credentials to continue</p>
        </div>

        <form action={unlockAdmin} className="space-y-4">
          <div>
            <label htmlFor="id" className="block text-xs font-medium text-slate-400 mb-1.5">
              ID
            </label>
            <input
              id="id"
              name="id"
              type="text"
              required
              autoComplete="username"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-slate-400 mb-1.5">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-500"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs">Incorrect ID or password.</p>
          )}

          <button
            type="submit"
            className="w-full bg-white text-slate-950 font-semibold text-sm py-2.5 rounded-lg hover:bg-slate-200 transition"
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  )
}
