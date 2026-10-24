import { regionalPlanning } from '@/data/regional-planning'
import commonsPhotos from '@/data/prefecture-photos.json'
import Image from 'next/image'
import { guides } from '@/data/guides'
import { spots, canonicalPlaceId, distanceKm } from '@/data/places'
import ApplyPlan from '@/components/ApplyPlan'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prefectures } from '@/data/prefectures'
import { prefecturePlaces } from '@/data/prefecture-places'
import { destinations, regions } from '@/data/travel'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { pageMetadata, siteUrl } from '@/utils/site'
import PlacesMap from '@/components/PlacesMap'

type Props = { params: Promise<{ lang: string; slug: string }> }
export const dynamicParams = false
export const generateStaticParams = () =>
  prefectures.map((p) => ({ slug: p.slug }))
export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params
  const p = prefectures.find((p) => p.slug === slug)
  if (!isLocale(lang) || !p) notFound()
  const metadata = pageMetadata(
    lang,
    `/prefectures/${slug}`,
    p.names[lang],
    p.summary[lang],
  )
  if (!siteUrl) return metadata
  const photo = destinations.find(
    (d) => d.slug === slug || (slug === 'yamanashi' && d.slug === 'mount-fuji'),
  )
  const commons = commonsPhotos[slug as keyof typeof commonsPhotos]
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      title: p.names[lang],
      description: p.summary[lang],
      images: [
        {
          url: commons?.src || photo?.image || '/images/miniature.png',
          alt: commons?.alt[lang] || photo?.[lang].imageAlt || p.names[lang],
        },
      ],
    },
  }
}
export default async function PrefecturePage({ params }: Props) {
  const { lang, slug } = await params
  const p = prefectures.find((p) => p.slug === slug)
  if (!isLocale(lang) || !p) notFound()
  const dict = await getDictionary(lang)
  const detailed = destinations.find(
    (d) => d.slug === slug || (slug === 'yamanashi' && d.slug === 'mount-fuji'),
  )
  const photo = commonsPhotos[slug as keyof typeof commonsPhotos]
  const initial = p.places.map(
    (id) => prefecturePlaces.find((place) => place.id === id)!,
  )
  const points = [
    ...initial,
    ...spots.filter(
      (spot) =>
        spot.destination === detailed?.slug &&
        !initial.some((point) => canonicalPlaceId(point.id) === spot.id),
    ),
  ]
  const practical = detailed ? guides[detailed.slug][lang] : null
  const nearby = prefectures
    .filter((other) => other.slug !== slug)
    .map((other) => ({
      other,
      km: distanceKm(
        points[0].coordinates,
        prefecturePlaces.find((spot) => spot.id === other.places[0])!
          .coordinates,
      ),
    }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 3)
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
        <figure>
          <div className="prefecture-photo">
            <Image
              src={photo?.src || detailed!.image}
              alt={photo?.alt[lang] || detailed![lang].imageAlt}
              fill
              loading="eager"
              sizes="(max-width:700px) 100vw, 50vw"
            />
          </div>
          <figcaption className="source-note">
            {photo?.alt[lang] || detailed![lang].imageAlt} ·{' '}
            <Link href={`/${lang}/credits${photo ? `#photo-${slug}` : ''}`}>
              {photo
                ? `${photo.artist} · ${photo.license}`
                : dict.footer.credits}
            </Link>
          </figcaption>
        </figure>
      </section>
      <nav className="guide-toc" aria-label={dict.guide.toc}>
        <a href="#arrival">{dict.explorer.arrival}</a>
        <a href="#places">{dict.explorer.places}</a>
        <a href="#nearby">{dict.tools.nearby}</a>
        <Link href={`/${lang}/first-visit#help`}>{dict.tools.emergency}</Link>
      </nav>
      <div id="arrival" className="prefecture-arrival depth-surface">
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
      {practical && (
        <div className="prefecture-practical">
          {(['stay', 'rain', 'prepare'] as const).map((key) => (
            <article key={key}>
              <h2>{key === 'stay' ? dict.tools.lodging : dict.tools[key]}</h2>
              <p>{practical[key]}</p>
            </article>
          ))}
        </div>
      )}
      <div className="prefecture-practical">
        <article>
          <h2>{dict.tools.regionalPlan}</h2>
          <p>{regionalPlanning[p.region][lang]}</p>
          <a
            className="text-link"
            href="https://www.japan.travel/en/plan/weather/"
          >
            {dict.tools.weather} ↗
          </a>
        </article>
        <article>
          <h2>{dict.tools.beforeBooking}</h2>
          <p>{dict.tools.bookingChecks}</p>
          <Link className="text-link" href={`/${lang}/first-visit`}>
            {dict.explorer.visitLink} ↗
          </Link>
        </article>
      </div>
      <ApplyPlan
        days={points.length}
        entries={points.map((point, index) => ({
          id: point.id,
          day: index + 1,
        }))}
      />
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
      <section id="nearby" className="nearby-prefectures">
        <h2>{dict.tools.nearby}</h2>
        <p className="source-note">{dict.tools.straight}</p>
        {nearby.map(({ other, km }) => (
          <Link key={other.slug} href={`/${lang}/prefectures/${other.slug}`}>
            {other.names[lang]} · {Math.round(km)} km ↗
          </Link>
        ))}
      </section>
      <div className="prefecture-next">
        <p>{dict.explorer.saveHelp}</p>
        <Link className="button" href={`/${lang}/my-trip`}>
          {dict.trip.plan} ↗
        </Link>
        {detailed && (
          <Link
            className="text-link"
            href={`/${lang}/destinations/${detailed.slug}`}
          >
            {dict.explorer.more} ↗
          </Link>
        )}
        <Link className="text-link" href={`/${lang}/first-visit`}>
          {dict.explorer.visitLink} ↗
        </Link>
      </div>
      <p className="source-note">
        {dict.explorer.reviewed}{' '}
        <time dateTime={p.reviewedAt}>{p.reviewedAt}</time>.{' '}
        {dict.streetMap.credit}
      </p>
    </main>
  )
}
