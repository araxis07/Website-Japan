import type { MetadataRoute } from 'next'
import { i18n } from '@/i18n/config'
import { destinations } from '@/data/travel'
import { prefectures } from '@/data/prefectures'
import { siteUrl } from '@/utils/site'

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return []
  return i18n.locales.flatMap((lang) =>
    [
      '',
      '/credits',
      '/about',
      '/explore',
      '/first-visit',
      ...destinations.map(({ slug }) => `/destinations/${slug}`),
      ...prefectures.map(({ slug }) => `/prefectures/${slug}`),
    ].map((path) => ({
      url: `${siteUrl}/${lang}${path}`,
      alternates: {
        languages: {
          ja: `${siteUrl}/ja${path}`,
          en: `${siteUrl}/en${path}`,
          th: `${siteUrl}/th${path}`,
        },
      },
    })),
  )
}
