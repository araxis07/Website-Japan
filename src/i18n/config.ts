export const i18n = {
  defaultLocale: 'ja',
  locales: ['ja', 'en'],
} as const

export type Locale = (typeof i18n)['locales'][number]

export function isLocale(value: string): value is Locale {
  return i18n.locales.some((locale) => locale === value)
}
