export const i18n = {
  defaultLocale: 'ja',
  locales: ['ja', 'en', 'th'],
} as const

export type Locale = (typeof i18n)['locales'][number]

export function isLocale(value: string): value is Locale {
  return i18n.locales.some((locale) => locale === value)
}

export const localeNames: Record<Locale, string> = { ja: '日本語', en: 'English', th: 'ไทย' }
export const ogLocales: Record<Locale, string> = { ja: 'ja_JP', en: 'en_US', th: 'th_TH' }
