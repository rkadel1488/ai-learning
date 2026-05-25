const accents = {
  violet: 'from-violet-500/10 to-blue-500/10 border-violet-500/20',
  amber: 'from-amber-500/10 to-orange-500/10 border-amber-500/20',
  emerald: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20',
  blue: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20',
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
  accent?: keyof typeof accents
}) {
  return (
    <div className={`bg-gradient-to-br ${accents[accent]} border rounded-2xl p-5`}>
      <div className="text-3xl mb-3">{icon}</div>
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="text-sm text-slate-400 mt-1">{label}</div>
    </div>
  )
}
