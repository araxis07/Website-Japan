import { MetadataRoute } from 'next'
import { i18n } from '@/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://japantravel-guide.com'
  
  // All routes that should be included in the sitemap
  const routes = [
    '',
    'about',
    'regions',
    'destinations',
    'seasonal-guide',
    'travel-tips'
  ]
  
  const staticPages = routes.map(route => {
    // For all locales
    return i18n.locales.map(locale => ({
      url: `${baseUrl}/${locale}${route ? `/${route}` : ''}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  }).flat()
  
  // Adding region pages
  const regions = [
    'hokkaido',
    'tohoku',
    'kanto',
    'chubu',
    'kansai',
    'chugoku',
    'shikoku',
    'kyushu',
    'okinawa'
  ]
  
  const regionPages = regions.map(region => {
    return i18n.locales.map(locale => ({
      url: `${baseUrl}/${locale}/regions/${region}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  }).flat()
  
  return [...staticPages, ...regionPages]
}
