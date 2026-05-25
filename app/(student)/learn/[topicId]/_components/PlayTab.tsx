'use client'
import { useState, useCallback } from 'react'
import { TOPIC_LESSONS } from './ConceptVisuals'
import { LESSON_CONTENT } from './LessonContent'

type Game = 'menu' | 'flashcards' | 'matching' | 'truefalse'

type Props = { topicTitle: string; topicIcon: string }

export function PlayTab({ topicTitle, topicIcon }: Props) {
  const [game, setGame] = useState<Game>('menu')
  const visualLesson = TOPIC_LESSONS[topicTitle]
  const lessonContent = LESSON_CONTENT[topicTitle]

  if (!visualLesson && !lessonContent) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-3">{topicIcon}</div>
        <p className="text-slate-400">Games coming soon for {topicTitle}.</p>
      </div>
    )
  }

  const concepts = visualLesson?.concepts ?? []
  const tfQuestions = lessonContent?.trueOrFalse ?? []

  if (game === 'flashcards') return <FlashcardGame concepts={concepts} onBack={() => setGame('menu')} />
  if (game === 'matching') return <MatchingGame concepts={concepts} onBack={() => setGame('menu')} />
  if (game === 'truefalse') return <TrueFalseBlitz questions={tfQuestions} onBack={() => setGame('menu')} />

  const games = [
    {
      id: 'flashcards' as Game,
      emoji: '🃏',
      title: 'Flashcards',
      desc: `Flip through ${concepts.length} concept cards — see the term, then reveal the definition and a real-world example.`,
      meta: `${concepts.length} cards · ~2 min`,
      border: 'hover:border-violet-500',
      bg: 'bg-violet-600/20 border-violet-500/30',
      active: concepts.length > 0,
    },
    {
      id: 'matching' as Game,
      emoji: '🎯',
      title: 'Match It',
      desc: `Connect each term to its correct definition. Beat it without any wrong answers for a perfect score!`,
      meta: `${concepts.length} pairs · ~3 min`,
      border: 'hover:border-emerald-500',
      bg: 'bg-emerald-600/20 border-emerald-500/30',
      active: concepts.length > 0,
    },
    {
      id: 'truefalse' as Game,
      emoji: '⚡',
      title: 'True or False Blitz',
      desc: `${tfQuestions.length} rapid-fire statements — decide true or false as fast as you can. Each one comes with an explanation.`,
      meta: `${tfQuestions.length} questions · ~4 min`,
      border: 'hover:border-amber-500',
      bg: 'bg-amber-600/20 border-amber-500/30',
      active: tfQuestions.length > 0,
    },
  ]

  return (
    <div className="space-y-4">
      <p className="text-slate-400 text-sm">Choose a game to practise <span className="text-white font-medium">{topicTitle}</span> without the pressure of the quiz.</p>

      {games.filter(g => g.active).map(g => (
        <button
          key={g.id}
          onClick={() => setGame(g.id)}
          className={`w-full bg-slate-900 border border-slate-700 ${g.border} rounded-2xl p-5 text-left transition-all group`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl ${g.bg} border flex items-center justify-center text-3xl shrink-0`}>
              {g.emoji}
            </div>
            <div>
              <h3 className="font-bold text-white text-base group-hover:text-violet-300 transition-colors">{g.title}</h3>
              <p className="text-slate-400 text-sm mt-0.5">{g.desc}</p>
              <p className="text-xs text-slate-500 mt-2">{g.meta}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

// ── Flashcard game ────────────────────────────────────────────────────────────

type Concept = { term: string; desc: string; example: string }

function FlashcardGame({ concepts, onBack }: { concepts: Concept[]; onBack: () => void }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [seen, setSeen] = useState<number[]>([])

  const current = concepts[index]
  const allSeen = seen.length >= concepts.length

  function handleFlip() {
    if (!flipped) setSeen(prev => prev.includes(index) ? prev : [...prev, index])
    setFlipped(v => !v)
  }

  function goNext() { setFlipped(false); setIndex(i => (i + 1) % concepts.length) }
  function goPrev() { setFlipped(false); setIndex(i => (i - 1 + concepts.length) % concepts.length) }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">← Games</button>
        <span className="text-slate-400 text-sm">{index + 1} / {concepts.length}</span>
        {allSeen && <span className="text-emerald-400 text-xs font-medium">All seen ✓</span>}
      </div>

      <div className="flex gap-1.5 justify-center">
        {concepts.map((_, i) => (
          <button key={i} onClick={() => { setIndex(i); setFlipped(false) }}
            className={`h-2 rounded-full transition-all ${i === index ? 'bg-violet-500 w-6' : seen.includes(i) ? 'bg-violet-500/40 w-2' : 'bg-slate-700 w-2'}`}
          />
        ))}
      </div>

      <div onClick={handleFlip} className="cursor-pointer select-none" style={{ perspective: '1200px' }}>
        <div style={{ position: 'relative', transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 0.45s ease', minHeight: '240px' }}>
          {/* Front */}
          <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 border border-violet-500/40 rounded-2xl flex flex-col items-center justify-center p-8 text-center">
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Term</p>
            <h2 className="text-3xl font-bold text-white">{current.term}</h2>
            <p className="text-slate-500 text-sm mt-6">Tap to reveal →</p>
          </div>
          {/* Back */}
          <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            className="absolute inset-0 bg-gradient-to-br from-violet-900/40 to-slate-900 border border-violet-500/60 rounded-2xl flex flex-col justify-center p-6">
            <p className="text-xs text-violet-400 uppercase tracking-widest mb-3">Definition</p>
            <p className="text-white text-base leading-relaxed font-medium mb-4">{current.desc}</p>
            <div className="bg-slate-800/60 rounded-xl p-3">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Example</p>
              <p className="text-slate-300 text-sm italic">{current.example}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={goPrev} className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium py-3 rounded-xl transition-colors">← Prev</button>
        <button onClick={handleFlip} className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-medium py-3 rounded-xl transition-colors">{flipped ? '↩ Reset' : '↻ Flip'}</button>
        <button onClick={goNext} className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium py-3 rounded-xl transition-colors">Next →</button>
      </div>

      {allSeen && (
        <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-xl p-4 text-center">
          <p className="text-emerald-300 font-semibold">🎉 You&apos;ve reviewed all cards!</p>
          <p className="text-slate-400 text-sm mt-1">Try Match It or True/False Blitz next.</p>
        </div>
      )}
    </div>
  )
}

// ── Matching game ─────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function MatchingGame({ concepts, onBack }: { concepts: Concept[]; onBack: () => void }) {
  const [terms] = useState(() => shuffle(concepts.map(c => c.term)))
  const [defs] = useState(() => shuffle(concepts.map(c => ({ key: c.term, text: c.desc }))))
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrong, setWrong] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [done, setDone] = useState(false)

  const handleTermClick = useCallback((term: string) => {
    if (matched.has(term) || done) return
    setSelectedTerm(t => t === term ? null : term)
  }, [matched, done])

  const handleDefClick = useCallback((defKey: string) => {
    if (!selectedTerm || matched.has(defKey) || done) return
    setAttempts(a => a + 1)
    if (selectedTerm === defKey) {
      const next = new Set([...matched, defKey])
      setMatched(next)
      setSelectedTerm(null)
      if (next.size === concepts.length) setDone(true)
    } else {
      setWrong(selectedTerm)
      setTimeout(() => { setWrong(null); setSelectedTerm(null) }, 600)
    }
  }, [selectedTerm, matched, done, concepts.length])

  function restart() { setSelectedTerm(null); setMatched(new Set()); setWrong(null); setAttempts(0); setDone(false) }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">← Games</button>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-400">{matched.size}/{concepts.length} matched</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">{attempts} tries</span>
        </div>
      </div>

      {done ? (
        <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-2xl p-6 text-center space-y-3">
          <div className="text-4xl">🎉</div>
          <h3 className="text-xl font-bold text-emerald-300">All matched!</h3>
          <p className="text-slate-400">{attempts === concepts.length ? '🏆 Perfect — no wrong attempts!' : `Matched all ${concepts.length} pairs in ${attempts} attempts.`}</p>
          <button onClick={restart} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors">Play again</button>
        </div>
      ) : (
        <>
          <p className="text-slate-400 text-sm text-center">Tap a term → then tap its matching definition</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <p className="text-xs text-slate-500 uppercase tracking-wide font-medium text-center">Terms</p>
              {terms.map(term => {
                const isMatched = matched.has(term)
                const isSelected = selectedTerm === term
                const isWrong = wrong === term
                return (
                  <button key={term} onClick={() => handleTermClick(term)} disabled={isMatched}
                    className={`w-full px-3 py-3 rounded-xl border text-sm font-semibold text-center transition-all duration-150 ${
                      isMatched ? 'bg-emerald-900/30 border-emerald-600/40 text-emerald-400 cursor-default'
                        : isWrong ? 'bg-red-900/30 border-red-500/60 text-red-400 scale-95'
                        : isSelected ? 'bg-violet-600/30 border-violet-500 text-violet-200 shadow-lg shadow-violet-900/20'
                        : 'bg-slate-900 border-slate-700 text-white hover:border-violet-500'
                    }`}>
                    {isMatched ? '✓ ' : ''}{term}
                  </button>
                )
              })}
            </div>
            <div className="space-y-2">
              <p className="text-xs text-slate-500 uppercase tracking-wide font-medium text-center">Definitions</p>
              {defs.map(def => {
                const isMatched = matched.has(def.key)
                return (
                  <button key={def.key} onClick={() => handleDefClick(def.key)} disabled={isMatched || !selectedTerm}
                    className={`w-full px-3 py-3 rounded-xl border text-xs text-left transition-all duration-150 leading-snug ${
                      isMatched ? 'bg-emerald-900/30 border-emerald-600/40 text-emerald-400 cursor-default'
                        : !selectedTerm ? 'bg-slate-900 border-slate-700 text-slate-400 cursor-default'
                        : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-emerald-500 hover:bg-emerald-900/10 cursor-pointer'
                    }`}>
                    {def.text}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ── True / False Blitz ────────────────────────────────────────────────────────

type TFQuestion = { statement: string; answer: boolean; explanation: string }

function TrueFalseBlitz({ questions, onBack }: { questions: TFQuestion[]; onBack: () => void }) {
  const [index, setIndex] = useState(0)
  const [chosen, setChosen] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [history, setHistory] = useState<boolean[]>([])

  const current = questions[index]
  const isCorrect = chosen === current?.answer

  function handleAnswer(choice: boolean) {
    if (chosen !== null) return
    setChosen(choice)
    if (choice === current.answer) setScore(s => s + 1)
  }

  function handleNext() {
    setHistory(h => [...h, chosen === current.answer])
    if (index + 1 >= questions.length) {
      setFinished(true)
    } else {
      setIndex(i => i + 1)
      setChosen(null)
    }
  }

  function restart() { setIndex(0); setChosen(null); setScore(0); setFinished(false); setHistory([]) }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">← Games</button>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
          <div className="text-5xl">{pct === 100 ? '🏆' : pct >= 60 ? '🎉' : '📖'}</div>
          <h3 className="text-2xl font-bold text-white">{score}/{questions.length} correct</h3>
          <div className="text-4xl font-bold text-violet-400">{pct}%</div>
          <p className="text-slate-400 text-sm">
            {pct === 100 ? 'Perfect! You nailed every statement.' : pct >= 60 ? 'Great effort! Review the ones you missed.' : 'Keep practising — revisit the Learn tab for a refresher.'}
          </p>
          <div className="flex justify-center gap-1.5 flex-wrap">
            {history.map((correct, i) => (
              <span key={i} className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${correct ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                {correct ? '✓' : '✗'}
              </span>
            ))}
          </div>
          <button onClick={restart} className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors w-full">
            Play again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">← Games</button>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-sm">{index + 1}/{questions.length}</span>
          <span className="text-emerald-400 text-sm font-medium">{score} ✓</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-violet-500 rounded-full transition-all duration-300" style={{ width: `${(index / questions.length) * 100}%` }} />
      </div>

      {/* Statement card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[120px] flex flex-col justify-center">
        <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Statement {index + 1}</p>
        <p className="text-white text-base font-medium leading-relaxed">{current.statement}</p>
      </div>

      {/* True / False buttons */}
      <div className="grid grid-cols-2 gap-3">
        {([true, false] as const).map(val => {
          const picked = chosen === val
          const showResult = chosen !== null
          const correct = val === current.answer
          return (
            <button key={String(val)} onClick={() => handleAnswer(val)} disabled={chosen !== null}
              className={`py-4 rounded-xl text-lg font-bold border transition-all duration-150 ${
                showResult && correct ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                  : showResult && picked && !correct ? 'bg-red-600/30 border-red-500 text-red-300'
                  : chosen === null ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700 hover:border-slate-500'
                  : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}>
              {val ? '✓ True' : '✗ False'}
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {chosen !== null && (
        <div className={`rounded-xl px-4 py-3 text-sm ${isCorrect ? 'bg-emerald-900/20 border border-emerald-700/30 text-emerald-200' : 'bg-red-900/20 border border-red-700/30 text-red-200'}`}>
          <span className="font-semibold">{isCorrect ? '✓ Correct! ' : '✗ Not quite. '}</span>
          {current.explanation}
        </div>
      )}

      {chosen !== null && (
        <button onClick={handleNext} className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl transition-colors">
          {index + 1 >= questions.length ? 'See Results →' : 'Next →'}
        </button>
      )}
    </div>
  )
}
