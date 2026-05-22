export function calcScorePct(correct: number, answered: number): number {
  if (answered === 0) return 0
  return Math.round((correct / answered) * 10000) / 100
}

export function isTopicUnlocked(topicOrderIndex: number, previousTopicCompletedAt: string | null): boolean {
  if (topicOrderIndex === 1) return true
  return previousTopicCompletedAt !== null
}

type TopicStatusInput = {
  isUnlocked: boolean
  completedAt: string | null
  questionsAnswered: number
  totalQuestions: number
}

export type TopicStatus = 'locked' | 'available' | 'in-progress' | 'complete'

export function getTopicStatus({ isUnlocked, completedAt, questionsAnswered }: TopicStatusInput): TopicStatus {
  if (!isUnlocked) return 'locked'
  if (completedAt !== null) return 'complete'
  if (questionsAnswered > 0) return 'in-progress'
  return 'available'
}
