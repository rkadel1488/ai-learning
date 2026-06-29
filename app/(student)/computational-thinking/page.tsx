import Link from 'next/link'
import { CT_CATEGORIES, CT_ACCENT_CLASSES } from '@/lib/computational-thinking/categories'
import { getQuestions } from '@/lib/computational-thinking/questions'

export default function ComputationalThinkingHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Computational Thinking</h1>
        <p className="text-slate-400 text-sm mt-1">Train the problem-solving skills behind every great programmer — no code required.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CT_CATEGORIES.map(category => {
          const accent = CT_ACCENT_CLASSES[category.accent]
          const questionCount = getQuestions(category.slug).length
          return (
            <Link key={category.slug} href={`/computational-thinking/${category.slug}`} className="block">
              <div className={`bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 transition cursor-pointer ${accent.border}`}>
                <div className="flex items-center gap-3">
                  <span className={`text-2xl w-10 h-10 flex items-center justify-center rounded-lg ${accent.bg}`}>{category.icon}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-white leading-tight">{category.name}</h3>
                    <p className="text-xs text-slate-500">{category.tagline}</p>
                  </div>
                </div>
                <div className={`text-xs font-medium ${accent.text}`}>{questionCount} questions</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
