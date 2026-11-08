import type { Locale } from './config'

export type Dictionary = typeof import('./dictionaries/en.json')
export const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  'ko': () => import('./dictionaries/ko.json').then((module) => module.default),
  'zh-CN': () => import('./dictionaries/zh-CN.json').then((module) => module.default),
  'vi': () => import('./dictionaries/vi.json').then((module) => module.default),
  'fr': () => import('./dictionaries/fr.json').then((module) => module.default),
  'es': () => import('./dictionaries/es.json').then((module) => module.default),
  th: () => import('./dictionaries/th.json').then((module) => module.default),
  ja: () => import('./dictionaries/ja.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
}
export const getDictionary = (locale: Locale) => dictionaries[locale]()
