import type { MetadataRoute } from 'next'
import { i18n } from '@/i18n/config'
import { destinations, reviewedAt } from '@/data/travel'
import { siteUrl } from '@/utils/site'

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return []
  return i18n.locales.flatMap((lang) =>
    ['', '/credits', ...destinations.map(({ slug }) => `/destinations/${slug}`)].map((path) => ({
      url: `${siteUrl}/${lang}${path}`,
      lastModified: reviewedAt,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
      alternates: { languages: { ja: `${siteUrl}/ja${path}`, en: `${siteUrl}/en${path}` } },
    })),
  )
}
