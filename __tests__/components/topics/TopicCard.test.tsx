import { render, screen } from '@testing-library/react'
import { TopicCard } from '@/components/topics/TopicCard'
import { describe, it, expect } from 'vitest'

const base = {
  id: 'topic-1',
  orderIndex: 1,
  title: 'Logic & Boolean Algebra',
  icon: '⚡',
  tier: 'foundation' as const,
  status: 'available' as const,
  progressPct: 0,
  questionsAnswered: 0,
  totalQuestions: 55,
  href: '/learn/topic-1',
}

describe('TopicCard', () => {
  it('renders topic title and icon', () => {
    render(<TopicCard {...base} />)
    expect(screen.getByText('Logic & Boolean Algebra')).toBeInTheDocument()
    expect(screen.getByText('⚡')).toBeInTheDocument()
  })

  it('shows a lock icon when status is locked', () => {
    render(<TopicCard {...base} status="locked" />)
    expect(screen.getByText('🔒')).toBeInTheDocument()
  })

  it('shows checkmark when status is complete', () => {
    render(<TopicCard {...base} status="complete" progressPct={100} questionsAnswered={55} />)
    expect(screen.getByText('✅')).toBeInTheDocument()
  })

  it('shows progress percentage when in-progress', () => {
    render(<TopicCard {...base} status="in-progress" progressPct={40} questionsAnswered={22} />)
    expect(screen.getByText(/40%/)).toBeInTheDocument()
  })

  it('shows tier label', () => {
    render(<TopicCard {...base} />)
    expect(screen.getByText(/foundation/i)).toBeInTheDocument()
  })
})
