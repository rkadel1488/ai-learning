export type Runner = 'web' | 'pyodide' | 'piston'

export type CodingLanguage = {
  slug: string
  name: string
  icon: string
  accent: string // tailwind colour name, e.g. 'orange'
  tagline: string
  cmLang: 'html' | 'css' | 'javascript' | 'python' | 'java' | 'cpp' | 'sql'
  runner: Runner
  pistonLanguage?: string
  pistonVersion?: string
}

export type CodingLesson = {
  slug: string
  title: string
  summary: string
  explanation: string[]
  example: string
  starterCode: string
}

export const CODING_LANGUAGES: CodingLanguage[] = [
  { slug: 'html', name: 'HTML', icon: '🌐', accent: 'orange', tagline: 'Structure the web', cmLang: 'html', runner: 'web' },
  { slug: 'css', name: 'CSS', icon: '🎨', accent: 'blue', tagline: 'Style the web', cmLang: 'css', runner: 'web' },
  { slug: 'javascript', name: 'JavaScript', icon: '⚡', accent: 'yellow', tagline: 'Make the web interactive', cmLang: 'javascript', runner: 'web' },
  { slug: 'python', name: 'Python', icon: '🐍', accent: 'emerald', tagline: 'Friendly, powerful, everywhere', cmLang: 'python', runner: 'pyodide' },
  { slug: 'java', name: 'Java', icon: '☕', accent: 'red', tagline: 'Write once, run anywhere', cmLang: 'java', runner: 'piston', pistonLanguage: 'java', pistonVersion: '15.0.2' },
  { slug: 'c', name: 'C', icon: '🔧', accent: 'slate', tagline: 'The language behind languages', cmLang: 'cpp', runner: 'piston', pistonLanguage: 'c', pistonVersion: '10.2.0' },
  { slug: 'cpp', name: 'C++', icon: '➕', accent: 'indigo', tagline: 'Power and control', cmLang: 'cpp', runner: 'piston', pistonLanguage: 'c++', pistonVersion: '10.2.0' },
  { slug: 'csharp', name: 'C#', icon: '🎯', accent: 'violet', tagline: "Microsoft's flagship language", cmLang: 'java', runner: 'piston', pistonLanguage: 'csharp', pistonVersion: '6.12.0' },
  { slug: 'sql', name: 'SQL', icon: '🗄️', accent: 'cyan', tagline: 'Talk to databases', cmLang: 'sql', runner: 'piston', pistonLanguage: 'sqlite3', pistonVersion: '3.36.0' },
  { slug: 'php', name: 'PHP', icon: '🐘', accent: 'fuchsia', tagline: 'Power half the web', cmLang: 'javascript', runner: 'piston', pistonLanguage: 'php', pistonVersion: '8.2.3' },
]

export function getLanguage(slug: string): CodingLanguage | undefined {
  return CODING_LANGUAGES.find(l => l.slug === slug)
}

export const ACCENT_CLASSES: Record<string, { border: string; text: string; bg: string }> = {
  orange: { border: 'hover:border-orange-500', text: 'text-orange-400', bg: 'bg-orange-500/10' },
  blue: { border: 'hover:border-blue-500', text: 'text-blue-400', bg: 'bg-blue-500/10' },
  yellow: { border: 'hover:border-yellow-500', text: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  emerald: { border: 'hover:border-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  red: { border: 'hover:border-red-500', text: 'text-red-400', bg: 'bg-red-500/10' },
  slate: { border: 'hover:border-slate-400', text: 'text-slate-300', bg: 'bg-slate-500/10' },
  indigo: { border: 'hover:border-indigo-500', text: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  violet: { border: 'hover:border-violet-500', text: 'text-violet-400', bg: 'bg-violet-500/10' },
  cyan: { border: 'hover:border-cyan-500', text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  fuchsia: { border: 'hover:border-fuchsia-500', text: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10' },
}
