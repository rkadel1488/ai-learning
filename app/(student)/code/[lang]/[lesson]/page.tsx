import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLanguage, ACCENT_CLASSES } from '@/lib/coding/languages'
import { getLesson, getLessons } from '@/lib/coding/lessons'
import { LessonWorkspace } from '@/components/code/LessonWorkspace'

export default async function LessonPage({ params }: { params: Promise<{ lang: string; lesson: string }> }) {
  const { lang: langSlug, lesson: lessonSlug } = await params
  const language = getLanguage(langSlug)
  if (!language) notFound()

  const lessons = getLessons(langSlug)
  const lesson = getLesson(langSlug, lessonSlug)
  if (!lesson) notFound()

  const accent = ACCENT_CLASSES[language.accent]
  const index = lessons.findIndex(l => l.slug === lessonSlug)
  const prev = index > 0 ? lessons[index - 1] : null
  const next = index < lessons.length - 1 ? lessons[index + 1] : null

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/code/${langSlug}`} className="text-xs text-slate-500 hover:text-slate-300">&larr; {language.name} lessons</Link>
        <div className="flex items-center gap-2 mt-2">
          <span className={`text-xs font-medium ${accent.text}`}>#{index + 1}</span>
          <h1 className="text-2xl font-bold text-white">{lesson.title}</h1>
        </div>
        <p className="text-slate-400 text-sm mt-1">{lesson.summary}</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
        {lesson.explanation.map((para, i) => (
          <p key={i} className="text-sm text-slate-300 leading-relaxed">{para}</p>
        ))}
        <div>
          <p className="text-xs font-medium text-slate-500 mb-1.5">Example</p>
          <pre className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre">{lesson.example}</pre>
        </div>
      </div>

      <LessonWorkspace language={language} starterCode={lesson.starterCode} />

      <div className="flex items-center justify-between pt-2">
        {prev ? (
          <Link href={`/code/${langSlug}/${prev.slug}`} className="text-xs text-slate-400 hover:text-white">&larr; {prev.title}</Link>
        ) : <span />}
        {next ? (
          <Link href={`/code/${langSlug}/${next.slug}`} className="text-xs text-slate-400 hover:text-white">{next.title} &rarr;</Link>
        ) : <span />}
      </div>
    </div>
  )
}
