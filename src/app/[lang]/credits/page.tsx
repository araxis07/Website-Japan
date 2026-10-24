import commonsPhotos from '@/data/prefecture-photos.json'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { siteUrl } from '@/utils/site'
import { i18n, isLocale } from '@/i18n/config'
import { newPhotoCredits } from '@/data/photos'
import { getDictionary } from '@/i18n/dictionaries'

const credits = [
  [
    'Mount Fuji',
    'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65',
  ],
  ['Kyoto', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e'],
  ['Tokyo', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf'],
  ['Osaka', 'https://images.unsplash.com/photo-1590253230532-a67f6bc61c9e'],
  ['Hokkaido — 安 崔士', 'https://unsplash.com/photos/4JPED8p3Qas'],
  ['Okinawa — Ryo Yoshitake', 'https://unsplash.com/photos/Fim4XEASDZc'],
]
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  return {
    title: dict.footer.credits,
    ...(siteUrl
      ? {
          alternates: {
            canonical: `${siteUrl}/${lang}/credits`,
            languages: Object.fromEntries(
              i18n.locales.map((locale) => [
                locale,
                `${siteUrl}/${locale}/credits`,
              ]),
            ),
          },
        }
      : {}),
  }
}
export default async function Credits({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  return (
    <main className="container credits-page" id="main-content">
      <h1>{dict.footer.credits}</h1>
      <p>
        {dict.creditsExtra.photos}{' '}
        <a className="text-link" href="https://unsplash.com/license">
          Unsplash License
        </a>
      </p>
      <p>{dict.creditsExtra.art}</p>
      <p>
        {dict.creditsExtra.map}{' '}
        <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
      </p>
      <p>{dict.tools.commonsCredit}</p>
      {Object.entries(commonsPhotos).map(([slug, photo]) => (
        <div className="credit-row" id={`photo-${slug}`} key={slug}>
          <span>
            {photo.alt[lang]} — {photo.artist}
          </span>
          <a href={photo.source}>{dict.creditsExtra.source}</a>
          {photo.licenseUrl ? (
            <a href={photo.licenseUrl}>{photo.license}</a>
          ) : (
            <span>{photo.license}</span>
          )}
        </div>
      ))}
      {[...credits, ...newPhotoCredits].map(([name, url]) => (
        <div className="credit-row" key={name}>
          <span>{name}</span>
          <a href={url}>{dict.creditsExtra.source}</a>
        </div>
      ))}
    </main>
  )
}
