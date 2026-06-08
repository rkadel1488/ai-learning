import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLanguage, ACCENT_CLASSES } from '@/lib/coding/languages'
import { getLessons } from '@/lib/coding/lessons'

export default async function LanguageLessonsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langSlug } = await params
  const language = getLanguage(langSlug)
  if (!language) notFound()

  const lessons = getLessons(langSlug)
  const accent = ACCENT_CLASSES[language.accent]

  return (
    <div className="space-y-6">
      <div>
        <Link href="/code" className="text-xs text-slate-500 hover:text-slate-300">&larr; All languages</Link>
        <div className="flex items-center gap-3 mt-2">
          <span className={`text-2xl w-10 h-10 flex items-center justify-center rounded-lg ${accent.bg}`}>{language.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-white">{language.name}</h1>
            <p className="text-slate-400 text-sm">{language.tagline}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        {lessons.map((lesson, index) => (
          <Link key={lesson.slug} href={`/code/${langSlug}/${lesson.slug}`} className="block">
            <div className={`bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between transition cursor-pointer ${accent.border}`}>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium ${accent.text}`}>#{index + 1}</span>
                <div>
                  <h3 className="text-sm font-semibold text-white leading-tight">{lesson.title}</h3>
                  <p className="text-xs text-slate-500">{lesson.summary}</p>
                </div>
              </div>
              <span className="text-slate-600">&rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
