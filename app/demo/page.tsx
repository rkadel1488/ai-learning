import { StatCard } from '../(student)/dashboard/_components/StatCard'
import { TopicProgressTable } from '../(student)/dashboard/_components/TopicProgressTable'
import { RecentActivity } from '../(student)/dashboard/_components/RecentActivity'
import { AchievementsSection } from '../(student)/dashboard/_components/AchievementsSection'

const mockTopics = [
  { id: '1', order_index: 1, title: 'Logic & Boolean Algebra', icon: '⚡', tier: 'foundation', status: 'complete' as const, progressPct: 100, questionsAnswered: 50, totalQuestions: 50, scorePct: 84, certEarned: true },
  { id: '2', order_index: 2, title: 'Algorithmic Thinking', icon: '🔁', tier: 'foundation', status: 'in-progress' as const, progressPct: 52, questionsAnswered: 26, totalQuestions: 50, scorePct: 78, certEarned: false },
  { id: '3', order_index: 3, title: 'Data Structures', icon: '🗂️', tier: 'foundation', status: 'available' as const, progressPct: 0, questionsAnswered: 0, totalQuestions: 50, scorePct: null, certEarned: false },
  { id: '4', order_index: 4, title: 'Machine Learning Basics', icon: '🧠', tier: 'foundation', status: 'locked' as const, progressPct: 0, questionsAnswered: 0, totalQuestions: 50, scorePct: null, certEarned: false },
  { id: '5', order_index: 5, title: 'Neural Networks', icon: '🕸️', tier: 'intermediate', status: 'locked' as const, progressPct: 0, questionsAnswered: 0, totalQuestions: 50, scorePct: null, certEarned: false },
  { id: '6', order_index: 6, title: 'Natural Language Processing', icon: '💬', tier: 'intermediate', status: 'locked' as const, progressPct: 0, questionsAnswered: 0, totalQuestions: 50, scorePct: null, certEarned: false },
  { id: '7', order_index: 7, title: 'Computer Vision', icon: '👁️', tier: 'intermediate', status: 'locked' as const, progressPct: 0, questionsAnswered: 0, totalQuestions: 50, scorePct: null, certEarned: false },
  { id: '8', order_index: 8, title: 'Data Ethics & Privacy', icon: '🔒', tier: 'intermediate', status: 'locked' as const, progressPct: 0, questionsAnswered: 0, totalQuestions: 50, scorePct: null, certEarned: false },
  { id: '9', order_index: 9, title: 'Robotics & Automation', icon: '🤖', tier: 'advanced', status: 'locked' as const, progressPct: 0, questionsAnswered: 0, totalQuestions: 50, scorePct: null, certEarned: false },
  { id: '10', order_index: 10, title: 'Generative AI', icon: '✨', tier: 'advanced', status: 'locked' as const, progressPct: 0, questionsAnswered: 0, totalQuestions: 50, scorePct: null, certEarned: false },
]

const now = new Date()
const ago = (mins: number) => new Date(now.getTime() - mins * 60000).toISOString()

const mockActivity = [
  { id: '1', is_correct: true,  time_taken_ms: 3200, answered_at: ago(2),  questions: { type: 'mcq',          prompt: 'ARIA needs to sort her recycling bins. What step comes first?',          topics: { title: 'Algorithmic Thinking',    icon: '🔁' } } },
  { id: '2', is_correct: false, time_taken_ms: 8100, answered_at: ago(5),  questions: { type: 'mcq',          prompt: 'Which algorithm would ARIA use to find the shortest path home?',          topics: { title: 'Algorithmic Thinking',    icon: '🔁' } } },
  { id: '3', is_correct: true,  time_taken_ms: 2400, answered_at: ago(8),  questions: { type: 'story_choice', prompt: 'ARIA sees two doors. What should she check first?',                      topics: { title: 'Algorithmic Thinking',    icon: '🔁' } } },
  { id: '4', is_correct: true,  time_taken_ms: 1800, answered_at: ago(60), questions: { type: 'mcq',          prompt: 'If A is TRUE and B is FALSE, what does A AND B equal?',                  topics: { title: 'Logic & Boolean Algebra', icon: '⚡' } } },
  { id: '5', is_correct: true,  time_taken_ms: 4000, answered_at: ago(65), questions: { type: 'mcq',          prompt: "ARIA's gate opens only when both switches are ON. Which gate is this?", topics: { title: 'Logic & Boolean Algebra', icon: '⚡' } } },
  { id: '6', is_correct: false, time_taken_ms: 6500, answered_at: ago(120),questions: { type: 'story_choice', prompt: 'ARIA flips the NOT switch. TRUE becomes...?',                            topics: { title: 'Logic & Boolean Algebra', icon: '⚡' } } },
]

const mockAchievements = [
  { id: '1', type: 'topic_cert' as const, topic_id: '1', earned_at: '2026-05-20T10:00:00Z', topics: { title: 'Logic & Boolean Algebra', icon: '⚡' } },
  { id: '2', type: 'badge' as const,      topic_id: '1', earned_at: '2026-05-18T14:00:00Z', topics: { title: 'Logic & Boolean Algebra', icon: '⚡' } },
]

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800 px-6 py-3 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <span className="font-bold text-white">AI Learning</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white font-medium">Dashboard</span>
          <span className="text-sm text-slate-400">Learning Path</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Alex · Story Track · Ages 6–10</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard icon="✅" label="Questions Answered" value={76} />
          <StatCard icon="🎯" label="Accuracy" value="84%" />
          <StatCard icon="📚" label="Topics Completed" value="1 / 10" />
          <StatCard icon="🔥" label="Best Streak" value="3d" />
        </div>

        <TopicProgressTable topics={mockTopics} />

        <div className="grid gap-6 md:grid-cols-2">
          <RecentActivity activity={mockActivity} />
          <AchievementsSection achievements={mockAchievements} />
        </div>
      </main>
    </div>
  )
}
