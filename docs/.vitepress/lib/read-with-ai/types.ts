import { AI_MODES } from './options.mjs'
export { AI_MODES, resolveAIOptions } from './options.mjs'
export type AIMode = typeof AI_MODES[number]

export interface AIOptions {
  mode?: AIMode
  projectFirst?: boolean
  verify?: boolean
}

export interface ReadingChapter {
  book: string
  bookId: string
  chapter: number
  slug: string
  title: string
  canonicalUrl: string
  content: string
  ai?: AIOptions
}
