import type { Metadata } from 'next'
import { i18n, ogLocales, type Locale } from '@/i18n/config'

// Leave unset locally: do not publish canonical URLs for an unverified domain.
export const siteUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_BASE_URL).origin
  : undefined

export function pageMetadata(
  lang: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    ...(siteUrl
      ? {
          alternates: {
            canonical: `${siteUrl}/${lang}${path}`,
            languages: Object.fromEntries(
              i18n.locales.map((locale) => [
                locale,
                `${siteUrl}/${locale}${path}`,
              ]),
            ),
          },
          openGraph: {
            title,
            description,
            url: `${siteUrl}/${lang}${path}`,
            locale: ogLocales[lang],
            type: 'website',
            images: [
              {
                url: `${siteUrl}/images/fuji.jpg`,
                alt: 'Mount Fuji / 富士山 / ภูเขาไฟฟูจิ',
              },
            ],
          },
        }
      : {}),
  }
}
