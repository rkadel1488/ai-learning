'use client'
import { useState } from 'react'
import Link from 'next/link'
import { LearnTab } from './LearnTab'
import { PlayTab } from './PlayTab'

type Tab = 'learn' | 'play' | 'quiz'

const tierColors: Record<string, string> = {
  foundation: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  intermediate: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  advanced: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
}

type Props = {
  topicId: string
  topicTitle: string
  topicIcon: string
  topicTier: string
  topicOrderIndex: number
  questionsAnswered: number
  questionsCorrect: number
  scorePct: number
  completedAt: string | null
  totalQuestions: number
}

export function TopicHub({
  topicId, topicTitle, topicIcon, topicTier,
  questionsAnswered, questionsCorrect, scorePct, completedAt, totalQuestions,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('learn')

  const progressPct = totalQuestions > 0 ? Math.round((questionsAnswered / totalQuestions) * 100) : 0
  const isComplete = !!completedAt
  const isStarted = questionsAnswered > 0
  const tierColor = tierColors[topicTier] ?? 'text-slate-400 bg-slate-400/10 border-slate-400/20'

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'learn', label: 'Learn', icon: '📖' },
    { id: 'play', label: 'Play', icon: '🎮' },
    { id: 'quiz', label: 'Quiz', icon: '📝' },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back link */}
      <Link href="/topics" className="text-slate-500 text-xs hover:text-slate-300 inline-block">
        ← Back to topics
      </Link>

      {/* Topic header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{topicIcon}</div>
            <div>
              <h1 className="text-xl font-bold text-white">{topicTitle}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border capitalize ${tierColor}`}>
                  {topicTier}
                </span>
                {isComplete && (
                  <span className="text-[11px] text-emerald-400 font-medium">✓ Complete</span>
                )}
                {!isComplete && isStarted && (
                  <span className="text-[11px] text-amber-400 font-medium">▶ In progress</span>
                )}
              </div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-2xl font-bold text-white">{progressPct}%</div>
            <div className="text-xs text-slate-400">{questionsAnswered}/{totalQuestions} done</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${isComplete ? 'bg-emerald-500' : 'bg-violet-500'}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
              activeTab === tab.id
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'learn' && (
        <LearnTab
          topicTitle={topicTitle}
          topicIcon={topicIcon}
          onGoToQuiz={() => setActiveTab('quiz')}
        />
      )}

      {activeTab === 'play' && (
        <PlayTab topicTitle={topicTitle} topicIcon={topicIcon} />
      )}

      {activeTab === 'quiz' && (
        <QuizTab
          topicId={topicId}
          topicTitle={topicTitle}
          questionsAnswered={questionsAnswered}
          questionsCorrect={questionsCorrect}
          scorePct={scorePct}
          totalQuestions={totalQuestions}
          isComplete={isComplete}
          isStarted={isStarted}
        />
      )}
    </div>
  )
}

function QuizTab({
  topicId, topicTitle, questionsAnswered, questionsCorrect, scorePct,
  totalQuestions, isComplete, isStarted,
}: {
  topicId: string
  topicTitle: string
  questionsAnswered: number
  questionsCorrect: number
  scorePct: number
  totalQuestions: number
  isComplete: boolean
  isStarted: boolean
}) {
  const accuracy = questionsAnswered > 0
    ? Math.round((questionsCorrect / questionsAnswered) * 100)
    : 0

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">{questionsAnswered}</div>
          <div className="text-xs text-slate-400 mt-1">Answered</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{accuracy}%</div>
          <div className="text-xs text-slate-400 mt-1">Accuracy</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-violet-400">{scorePct}%</div>
          <div className="text-xs text-slate-400 mt-1">Score</div>
        </div>
      </div>

      {/* Progress detail */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Progress</span>
          <span className="text-white font-medium">{questionsAnswered} / {totalQuestions} questions</span>
        </div>
        <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${isComplete ? 'bg-emerald-500' : 'bg-violet-500'}`}
            style={{ width: `${totalQuestions > 0 ? Math.round((questionsAnswered / totalQuestions) * 100) : 0}%` }}
          />
        </div>
        {isComplete && (
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
            <span>✓</span>
            <span>Topic complete! {scorePct >= 80 ? '🏆 Certificate earned!' : ''}</span>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-violet-900/20 border border-violet-800/30 rounded-xl p-4 text-sm text-slate-300">
        <p className="font-medium text-violet-300 mb-1">💡 Quiz tips for {topicTitle}</p>
        <ul className="space-y-1 text-slate-400 text-xs list-disc list-inside">
          <li>Review the Learn tab first to understand key concepts</li>
          <li>Use the Play tab to practice before attempting the quiz</li>
          <li>Score 80% or higher to earn your certificate</li>
        </ul>
      </div>

      {/* CTA */}
      {!isComplete ? (
        <Link
          href={`/learn/${topicId}/quiz`}
          className="flex items-center justify-center gap-2 w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-4 rounded-xl transition-colors text-lg"
        >
          {isStarted ? '▶ Continue Quiz' : '▶ Start Quiz'}
        </Link>
      ) : (
        <div className="space-y-3">
          <div className="w-full bg-emerald-600/20 border border-emerald-600/30 text-emerald-300 font-semibold py-4 rounded-xl text-center">
            ✓ Quiz Complete!
          </div>
          <Link
            href="/topics"
            className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Go to next topic →
          </Link>
        </div>
      )}
    </div>
  )
}
