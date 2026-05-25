'use client'
import { useState, useCallback } from 'react'
import { TOPIC_LESSONS } from './ConceptVisuals'

type Game = 'menu' | 'flashcards' | 'matching'

type Props = { topicTitle: string; topicIcon: string }

export function PlayTab({ topicTitle, topicIcon }: Props) {
  const [game, setGame] = useState<Game>('menu')
  const lesson = TOPIC_LESSONS[topicTitle]

  if (!lesson) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-3">{topicIcon}</div>
        <p className="text-slate-400">Games coming soon for {topicTitle}.</p>
      </div>
    )
  }

  if (game === 'flashcards') {
    return <FlashcardGame concepts={lesson.concepts} onBack={() => setGame('menu')} />
  }
  if (game === 'matching') {
    return <MatchingGame concepts={lesson.concepts} onBack={() => setGame('menu')} />
  }

  return (
    <div className="space-y-4">
      <p className="text-slate-400 text-sm">Choose a game to practise {topicTitle} concepts</p>

      <button
        onClick={() => setGame('flashcards')}
        className="w-full bg-slate-900 border border-slate-700 hover:border-violet-500 rounded-2xl p-5 text-left transition-all group"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-3xl shrink-0">
            🃏
          </div>
          <div>
            <h3 className="font-bold text-white text-base group-hover:text-violet-300 transition-colors">Flashcards</h3>
            <p className="text-slate-400 text-sm mt-0.5">Flip through {lesson.concepts.length} concept cards. See term, then reveal the definition and example.</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-slate-500">{lesson.concepts.length} cards</span>
              <span className="text-slate-700">·</span>
              <span className="text-xs text-slate-500">~2 min</span>
            </div>
          </div>
        </div>
      </button>

      <button
        onClick={() => setGame('matching')}
        className="w-full bg-slate-900 border border-slate-700 hover:border-emerald-500 rounded-2xl p-5 text-left transition-all group"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-3xl shrink-0">
            🎯
          </div>
          <div>
            <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">Match It</h3>
            <p className="text-slate-400 text-sm mt-0.5">Match each term to its correct definition. See how fast you can connect all {lesson.concepts.length} pairs!</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-slate-500">{lesson.concepts.length} pairs</span>
              <span className="text-slate-700">·</span>
              <span className="text-xs text-slate-500">~3 min</span>
            </div>
          </div>
        </div>
      </button>
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

  function goNext() {
    setFlipped(false)
    setIndex(i => (i + 1) % concepts.length)
  }

  function goPrev() {
    setFlipped(false)
    setIndex(i => (i - 1 + concepts.length) % concepts.length)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">← Games</button>
        <span className="text-slate-400 text-sm">{index + 1} / {concepts.length}</span>
        {allSeen && <span className="text-emerald-400 text-xs font-medium">All seen ✓</span>}
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 justify-center">
        {concepts.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIndex(i); setFlipped(false) }}
            className={`w-2 h-2 rounded-full transition-all ${
              i === index ? 'bg-violet-500 w-5' : seen.includes(i) ? 'bg-violet-500/40' : 'bg-slate-700'
            }`}
          />
        ))}
      </div>

      {/* Flashcard */}
      <div
        onClick={handleFlip}
        className="cursor-pointer select-none"
        style={{ perspective: '1000px' }}
      >
        <div
          style={{
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.4s ease',
            minHeight: '220px',
          }}
        >
          {/* Front */}
          <div
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 border border-violet-500/40 rounded-2xl flex flex-col items-center justify-center p-6 text-center"
          >
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Term</p>
            <h2 className="text-3xl font-bold text-white mb-3">{current.term}</h2>
            <p className="text-slate-500 text-sm mt-4">Tap to reveal definition</p>
          </div>

          {/* Back */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
            className="absolute inset-0 bg-gradient-to-br from-violet-900/40 to-slate-900 border border-violet-500/60 rounded-2xl flex flex-col justify-center p-6"
          >
            <p className="text-xs text-violet-400 uppercase tracking-widest mb-3">Definition</p>
            <p className="text-white text-base leading-relaxed font-medium mb-4">{current.desc}</p>
            <div className="bg-slate-800/60 rounded-xl p-3">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Example</p>
              <p className="text-slate-300 text-sm italic">{current.example}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={goPrev}
          className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium py-3 rounded-xl transition-colors"
        >
          ← Prev
        </button>
        <button
          onClick={handleFlip}
          className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-medium py-3 rounded-xl transition-colors"
        >
          {flipped ? '↩ Reset' : '↻ Flip'}
        </button>
        <button
          onClick={goNext}
          className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium py-3 rounded-xl transition-colors"
        >
          Next →
        </button>
      </div>

      {allSeen && (
        <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-xl p-4 text-center">
          <p className="text-emerald-300 font-semibold">🎉 You&apos;ve reviewed all cards!</p>
          <p className="text-slate-400 text-sm mt-1">Try the Match It game or head to the Quiz.</p>
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
      setTimeout(() => {
        setWrong(null)
        setSelectedTerm(null)
      }, 600)
    }
  }, [selectedTerm, matched, done, concepts.length])

  function restart() {
    setSelectedTerm(null)
    setMatched(new Set())
    setWrong(null)
    setAttempts(0)
    setDone(false)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
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
          <p className="text-slate-400">
            You matched all {concepts.length} pairs in {attempts} attempt{attempts !== 1 ? 's' : ''}.
            {attempts === concepts.length && ' Perfect score!'}
          </p>
          <button
            onClick={restart}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors"
          >
            Play again
          </button>
        </div>
      ) : (
        <>
          <p className="text-slate-400 text-sm text-center">Select a term, then select its matching definition</p>

          <div className="grid grid-cols-2 gap-3">
            {/* Terms */}
            <div className="space-y-2">
              <p className="text-xs text-slate-500 uppercase tracking-wide font-medium text-center">Terms</p>
              {terms.map(term => {
                const isMatched = matched.has(term)
                const isSelected = selectedTerm === term
                const isWrong = wrong === term
                return (
                  <button
                    key={term}
                    onClick={() => handleTermClick(term)}
                    disabled={isMatched}
                    className={`w-full px-3 py-3 rounded-xl border text-sm font-semibold text-center transition-all duration-150 ${
                      isMatched
                        ? 'bg-emerald-900/30 border-emerald-600/40 text-emerald-400 cursor-default'
                        : isWrong
                        ? 'bg-red-900/30 border-red-500/60 text-red-400 scale-95'
                        : isSelected
                        ? 'bg-violet-600/30 border-violet-500 text-violet-200 shadow-lg shadow-violet-900/20'
                        : 'bg-slate-900 border-slate-700 text-white hover:border-violet-500 hover:text-violet-200'
                    }`}
                  >
                    {isMatched ? '✓ ' : ''}{term}
                  </button>
                )
              })}
            </div>

            {/* Definitions */}
            <div className="space-y-2">
              <p className="text-xs text-slate-500 uppercase tracking-wide font-medium text-center">Definitions</p>
              {defs.map(def => {
                const isMatched = matched.has(def.key)
                return (
                  <button
                    key={def.key}
                    onClick={() => handleDefClick(def.key)}
                    disabled={isMatched || !selectedTerm}
                    className={`w-full px-3 py-3 rounded-xl border text-xs text-left transition-all duration-150 leading-snug ${
                      isMatched
                        ? 'bg-emerald-900/30 border-emerald-600/40 text-emerald-400 cursor-default'
                        : !selectedTerm
                        ? 'bg-slate-900 border-slate-700 text-slate-400 cursor-default'
                        : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-emerald-500 hover:bg-emerald-900/10 cursor-pointer'
                    }`}
                  >
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
