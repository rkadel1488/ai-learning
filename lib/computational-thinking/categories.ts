import type { CTCategory } from './types'

export const CT_CATEGORIES: CTCategory[] = [
  { slug: 'decomposition', name: 'Decomposition', icon: '🧩', accent: 'orange', tagline: 'Break big problems into smaller ones' },
  { slug: 'pattern-recognition', name: 'Pattern Recognition', icon: '🔍', accent: 'blue', tagline: 'Spot similarities and trends' },
  { slug: 'abstraction', name: 'Abstraction', icon: '🎭', accent: 'violet', tagline: 'Focus on what matters, hide the rest' },
  { slug: 'algorithms', name: 'Algorithms', icon: '🧮', accent: 'emerald', tagline: 'Step-by-step instructions to solve problems' },
  { slug: 'logical-reasoning', name: 'Logical Reasoning', icon: '🧠', accent: 'red', tagline: 'Booleans, conditionals, and deduction' },
  { slug: 'data-representation', name: 'Data Representation', icon: '🗂️', accent: 'cyan', tagline: 'How information is stored and structured' },
  { slug: 'debugging', name: 'Debugging', icon: '🐞', accent: 'fuchsia', tagline: 'Find and fix errors in logic' },
  { slug: 'sequencing-and-control-flow', name: 'Sequencing & Control Flow', icon: '🔁', accent: 'indigo', tagline: 'Order, loops, and conditionals' },
]

export function getCategory(slug: string): CTCategory | undefined {
  return CT_CATEGORIES.find(c => c.slug === slug)
}

export const CT_ACCENT_CLASSES: Record<string, { border: string; text: string; bg: string }> = {
  orange: { border: 'hover:border-orange-500', text: 'text-orange-400', bg: 'bg-orange-500/10' },
  blue: { border: 'hover:border-blue-500', text: 'text-blue-400', bg: 'bg-blue-500/10' },
  violet: { border: 'hover:border-violet-500', text: 'text-violet-400', bg: 'bg-violet-500/10' },
  emerald: { border: 'hover:border-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  red: { border: 'hover:border-red-500', text: 'text-red-400', bg: 'bg-red-500/10' },
  cyan: { border: 'hover:border-cyan-500', text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  fuchsia: { border: 'hover:border-fuchsia-500', text: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10' },
  indigo: { border: 'hover:border-indigo-500', text: 'text-indigo-400', bg: 'bg-indigo-500/10' },
}
