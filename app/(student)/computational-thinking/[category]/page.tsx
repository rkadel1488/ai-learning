import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategory, CT_ACCENT_CLASSES } from '@/lib/computational-thinking/categories'
import { getQuestions } from '@/lib/computational-thinking/questions'
import { CTQuiz } from '@/components/computational-thinking/CTQuiz'

export default async function CTCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params
  const category = getCategory(categorySlug)
  if (!category) notFound()

  const questions = getQuestions(categorySlug)
  const accent = CT_ACCENT_CLASSES[category.accent]

  return (
    <div className="space-y-6">
      <div>
        <Link href="/computational-thinking" className="text-xs text-slate-500 hover:text-slate-300">&larr; All categories</Link>
        <div className="flex items-center gap-3 mt-2">
          <span className={`text-2xl w-10 h-10 flex items-center justify-center rounded-lg ${accent.bg}`}>{category.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-white">{category.name}</h1>
            <p className="text-slate-400 text-sm">{category.tagline}</p>
          </div>
        </div>
      </div>

      <CTQuiz questions={questions} accent={accent} />
    </div>
  )
}
