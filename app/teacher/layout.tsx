export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800 px-6 py-3 flex items-center gap-3">
        <span className="text-xl">🏫</span>
        <span className="font-bold text-white">AI Learning — Teacher</span>
      </nav>
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
