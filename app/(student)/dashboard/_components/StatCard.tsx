const themes = {
  violet: { border: 'border-violet-500/25 hover:border-violet-400/50', icon: 'bg-violet-500/20', glow: 'hover:shadow-violet-500/10' },
  amber:  { border: 'border-amber-500/25 hover:border-amber-400/50',   icon: 'bg-amber-500/20',  glow: 'hover:shadow-amber-500/10'  },
  emerald:{ border: 'border-emerald-500/25 hover:border-emerald-400/50',icon: 'bg-emerald-500/20',glow: 'hover:shadow-emerald-500/10'},
  blue:   { border: 'border-blue-500/25 hover:border-blue-400/50',     icon: 'bg-blue-500/20',   glow: 'hover:shadow-blue-500/10'   },
}

export function StatCard({
  icon,
  label,
  value,
  accent = 'violet',
}: {
  icon: string
  label: string
  value: string | number
  accent?: keyof typeof themes
}) {
  const t = themes[accent]
  return (
    <div className={`relative bg-slate-900/80 border ${t.border} rounded-2xl p-5 transition-all duration-200 shadow-lg ${t.glow} hover:shadow-xl group overflow-hidden`}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/[0.025] to-transparent pointer-events-none" />
      <div className={`w-10 h-10 rounded-xl ${t.icon} flex items-center justify-center text-xl mb-4 shrink-0`}>
        {icon}
      </div>
      <div className="text-3xl font-black text-white tabular-nums leading-none">{value}</div>
      <div className="text-xs text-slate-500 mt-2 font-medium">{label}</div>
    </div>
  )
}
