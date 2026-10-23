import type { MetadataRoute } from 'next'
import { i18n } from '@/i18n/config'
import { destinations, reviewedAt } from '@/data/travel'
import { guides } from '@/data/guides'
import { prefectures } from '@/data/prefectures'
import { siteUrl } from '@/utils/site'

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return []
  return i18n.locales.flatMap((lang) =>
    [
      '',
      '/credits',
      '/explore',
      '/first-visit',
      ...destinations.map(({ slug }) => `/destinations/${slug}`),
      ...prefectures.map(({ slug }) => `/prefectures/${slug}`),
    ].map((path) => ({
      url: `${siteUrl}/${lang}${path}`,
      lastModified: path.startsWith('/destinations/')
        ? guides[path.split('/').pop()!].reviewedAt
        : path === '/explore' ||
            path === '/first-visit' ||
            path.startsWith('/prefectures/')
          ? '2026-10-23'
          : reviewedAt,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
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
