import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

const credits = [
  ['Mount Fuji', 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65'],
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
  return { title: dict.footer.credits }
}
export default async function Credits({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  return (
    <main className="container credits-page" id="main-content">
      <h1>{dict.footer.credits}</h1>
      <p>
        {lang === 'ja'
          ? '写真はUnsplashから。撮影者の皆さまに感謝します。'
          : 'Photography sourced from Unsplash. With thanks to the photographers who share these views of Japan.'}{' '}
        <a className="text-link" href="https://unsplash.com/license">
          Unsplash License
        </a>
      </p>
      <p>
        {lang === 'ja'
          ? 'ホームの3Dミニチュアは、このサイトのためにThree.jsで制作したオリジナルのイラスト表現です。地理や建物を正確に再現したものではありません。'
          : 'The interactive miniature is original procedural artwork made for this website with Three.js. It is an imaginative scene, not a geographically accurate reconstruction.'}
      </p>
      {credits.map(([name, url]) => (
        <div className="credit-row" key={name}>
          <span>{name}</span>
          <a href={url}>{lang === 'ja' ? '写真の出典' : 'View photo source'}</a>
        </div>
      ))}
    </main>
  )
}
