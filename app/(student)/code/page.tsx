import Link from 'next/link'
import { CODING_LANGUAGES, ACCENT_CLASSES } from '@/lib/coding/languages'
import { getLessons } from '@/lib/coding/lessons'

export default function CodeHubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Coding Practice</h1>
        <p className="text-slate-400 text-sm mt-1">Pick a language, learn a concept, then write and run real code right in your browser.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CODING_LANGUAGES.map(lang => {
          const accent = ACCENT_CLASSES[lang.accent]
          const lessonCount = getLessons(lang.slug).length
          return (
            <Link key={lang.slug} href={`/code/${lang.slug}`} className="block">
              <div className={`bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 transition cursor-pointer ${accent.border}`}>
                <div className="flex items-center gap-3">
                  <span className={`text-2xl w-10 h-10 flex items-center justify-center rounded-lg ${accent.bg}`}>{lang.icon}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-white leading-tight">{lang.name}</h3>
                    <p className="text-xs text-slate-500">{lang.tagline}</p>
                  </div>
                </div>
                <div className={`text-xs font-medium ${accent.text}`}>{lessonCount} lessons</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
