export const i18n = {
  defaultLocale: 'ja',
  locales: ['ja', 'en', 'th', 'ko', 'zh-CN', 'vi', 'fr', 'es'],
} as const

export type Locale = (typeof i18n)['locales'][number]

export function isLocale(value: string): value is Locale {
  return i18n.locales.some((locale) => locale === value)
}

export const localeNames: Record<Locale, string> = { ja: '日本語', en: 'English', th: 'ไทย', ko: '한국어', 'zh-CN': '简体中文', vi: 'Tiếng Việt', fr: 'Français', es: 'Español' }
export const ogLocales: Record<Locale, string> = { ja: 'ja_JP', en: 'en_US', th: 'th_TH', ko: 'ko_KR', 'zh-CN': 'zh_CN', vi: 'vi_VN', fr: 'fr_FR', es: 'es_ES' }
