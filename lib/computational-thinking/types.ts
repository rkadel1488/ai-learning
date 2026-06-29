export type CTCategory = {
  slug: string
  name: string
  icon: string
  accent: string // tailwind colour name, e.g. 'orange'
  tagline: string
}

export type CTQuestion = {
  slug: string
  question: string
  options: string[] // exactly 4 choices
  correctIndex: number // index into options, 0-3
  explanation: string
}
