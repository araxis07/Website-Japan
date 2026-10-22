import type { Locale } from './config'

export type Dictionary = typeof import('./dictionaries/en.json')
export const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  th: () => import('./dictionaries/th.json').then((module) => module.default),
  ja: () => import('./dictionaries/ja.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
}
export const getDictionary = (locale: Locale) => dictionaries[locale]()
