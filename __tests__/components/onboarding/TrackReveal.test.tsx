import { render, screen } from '@testing-library/react'
import { TrackReveal } from '@/app/onboarding/_components/TrackReveal'
import { describe, it, expect } from 'vitest'

describe('TrackReveal', () => {
  it('shows Story Adventure content for story track', () => {
    render(<TrackReveal track="story" childName="Alice" onContinue={() => {}} />)
    expect(screen.getByText(/Story Adventure/i)).toBeInTheDocument()
    expect(screen.getByText(/Alice/i)).toBeInTheDocument()
  })

  it('shows Game Levels content for levels track', () => {
    render(<TrackReveal track="levels" childName="Bob" onContinue={() => {}} />)
    expect(screen.getByText(/Game Levels/i)).toBeInTheDocument()
  })

  it('shows Creative Sandbox content for sandbox track', () => {
    render(<TrackReveal track="sandbox" childName="Sara" onContinue={() => {}} />)
    expect(screen.getByText(/Creative Sandbox/i)).toBeInTheDocument()
  })

  it('renders a continue button', () => {
    render(<TrackReveal track="story" childName="Alice" onContinue={() => {}} />)
    expect(screen.getByRole('button', { name: /start learning/i })).toBeInTheDocument()
  })
})
