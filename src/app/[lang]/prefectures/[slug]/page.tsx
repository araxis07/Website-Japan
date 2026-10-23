import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prefectures } from '@/data/prefectures'
import { prefecturePlaces } from '@/data/prefecture-places'
import { destinations, regions } from '@/data/travel'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { pageMetadata } from '@/utils/site'
import PlacesMap from '@/components/PlacesMap'

type Props = { params: Promise<{ lang: string; slug: string }> }
export const dynamicParams = false
export const generateStaticParams = () => prefectures.map((p) => ({ slug: p.slug }))
export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params
  const p = prefectures.find((p) => p.slug === slug)
  if (!isLocale(lang) || !p) notFound()
  return pageMetadata(lang, `/prefectures/${slug}`, p.names[lang], p.summary[lang])
}
export default async function PrefecturePage({ params }: Props) {
  const { lang, slug } = await params
  const p = prefectures.find((p) => p.slug === slug)
  if (!isLocale(lang) || !p) notFound()
  const dict = await getDictionary(lang)
  const detailed = destinations.find(
    (d) => d.slug === slug || (slug === 'yamanashi' && d.slug === 'mount-fuji'),
  )
  const points = p.places.map((id) => prefecturePlaces.find((place) => place.id === id)!)
  return (
    <main id="main-content" className="container prefecture-page">
      <nav className="breadcrumbs" aria-label={dict.guide.breadcrumb}>
        <Link href={`/${lang}/explore`}>{dict.explorer.back}</Link>
        <span aria-hidden="true">/</span>
        <span>{p.names[lang]}</span>
      </nav>
      <section className="prefecture-hero">
        <div>
          <p className="section-japanese">
            {regions.find((r) => r.id === p.region)?.[lang][0]}
          </p>
          <h1>{p.names[lang]}</h1>
          <p>{p.summary[lang]}</p>
          <a className="button" href="#places">
            {dict.explorer.places} ↓
          </a>
        </div>
        <div className="prefecture-art" aria-hidden="true">
          <span className="prefecture-moon" />
          <span className="prefecture-kanji" lang="ja">
            {p.names.ja}
          </span>
          <span className="prefecture-lantern">旅</span>
        </div>
      </section>
      <div className="prefecture-arrival depth-surface">
        <div>
          <h2>{dict.explorer.base}</h2>
          <p>{p.base[lang]}</p>
        </div>
        <div>
          <h2>{dict.explorer.arrival}</h2>
          <p>{p.access[lang]}</p>
          <a href={p.source} className="text-link">
            {dict.explorer.source} ↗
          </a>
          {slug === 'nagasaki' && (
            <a
              className="text-link"
              href="https://www.jrkyushu.co.jp/english/train/shinkansen_kamome.html"
            >
              JR Kyushu · Kamome ↗
            </a>
          )}
        </div>
      </div>
      <section
        id="places"
        className="guide-places"
        aria-labelledby="prefecture-places-title"
      >
        <h2 id="prefecture-places-title">{dict.explorer.places}</h2>
        <p className="prefecture-plan-note">{dict.explorer.planNote}</p>
        <PlacesMap points={points} lang={lang} mapCopy={dict.streetMap} />
        <p className="source-note">{dict.explorer.mapNote}</p>
      </section>
      <div className="prefecture-next">
        <p>{dict.explorer.saveHelp}</p>
        <Link className="button" href={`/${lang}/my-trip`}>
          {dict.trip.plan} ↗
        </Link>
        {detailed && (
          <Link className="text-link" href={`/${lang}/destinations/${detailed.slug}`}>
            {dict.explorer.more} ↗
          </Link>
        )}
        <Link className="text-link" href={`/${lang}/first-visit`}>
          {dict.explorer.visitLink} ↗
        </Link>
      </div>
      <p className="source-note">
        {dict.explorer.reviewed} <time dateTime={p.reviewedAt}>{p.reviewedAt}</time>.{' '}
        {dict.streetMap.credit}
      </p>
    </main>
  )
}
