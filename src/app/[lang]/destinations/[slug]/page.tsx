import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { destinationNotes } from '@/data/journeys'
import { destinations } from '@/data/travel'
import { isLocale, ogLocales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { siteUrl } from '@/utils/site'
import { generateBreadcrumbSchema } from '@/utils/schema'
import { guides } from '@/data/guides'
import { spots } from '@/data/places'
import { detailPhotos } from '@/data/photos'
import SavePlace from '@/components/SavePlace'
import PlacesMap from '@/components/PlacesMap'
import PhotoGallery from '@/components/PhotoGallery'
import Icon from '@/components/Icon'

type Props = { params: Promise<{ lang: string; slug: string }> }
export const dynamicParams = false
export function generateStaticParams() {
  return destinations.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const place = destinations.find((item) => item.slug === slug)
  if (!place) notFound()
  return {
    title: place[lang].name,
    description: place[lang].description,
    ...(siteUrl
      ? {
          alternates: {
            canonical: `${siteUrl}/${lang}/destinations/${slug}`,
            languages: {
              ja: `${siteUrl}/ja/destinations/${slug}`,
              en: `${siteUrl}/en/destinations/${slug}`,
              th: `${siteUrl}/th/destinations/${slug}`,
            },
          },
          openGraph: {
            title: place[lang].name,
            description: place[lang].description,
            url: `${siteUrl}/${lang}/destinations/${slug}`,
            locale: ogLocales[lang],
            type: 'article',
            images: [{ url: place.image, alt: place[lang].imageAlt }],
          },
        }
      : {}),
  }
}

export default async function DestinationPage({ params }: Props) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const place = destinations.find((item) => item.slug === slug)
  if (!place) notFound()
  const copy = place[lang]
  const notes = destinationNotes[slug][lang]
  const guide = guides[slug]
  const practical = guide[lang]
  const dict = await getDictionary(lang)
  const schema = generateBreadcrumbSchema(lang, { name: copy.name, slug })
  return (
    <main id="main-content" className="container">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
          }}
        />
      )}
      <nav className="breadcrumbs" aria-label={dict.guide.breadcrumb}>
        <Link href={`/${lang}`}>{dict.detail.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/${lang}#destinations`}>{dict.detail.back}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{copy.name}</span>
      </nav>
      <section className="detail-hero">
        <div className="detail-photo">
          <Image
            src={place.image}
            alt={copy.imageAlt}
            fill
            loading="eager"
            sizes="(max-width: 700px) 100vw, 50vw"
          />
        </div>
        <div className="detail-copy">
          <p className="section-japanese">{copy.region}</p>
          <h1>{copy.name}</h1>
          <h2>{copy.tagline}</h2>
          <p>{copy.description}</p>
          <dl className="detail-facts">
            <div>
              <dt>{dict.detail.duration}</dt>
              <dd>{copy.duration}</dd>
            </div>
            <div>
              <dt>{dict.detail.bestTime}</dt>
              <dd>{copy.bestTime}</dd>
            </div>
          </dl>
          <SavePlace id={`destination:${slug}`} name={copy.name} />
          <Link className="text-link detail-trip-link" href={`/${lang}/my-trip`}>
            {dict.trip.plan} ↗
          </Link>
        </div>
      </section>
      <nav className="guide-toc" aria-label={dict.guide.toc}>
        <span>{dict.guide.toc}</span>
        <a href="#practical">{dict.guide.overview}</a>
        <a href="#day-plan">{dict.detailExtra.day}</a>
        <a href="#places">{dict.guide.spots}</a>
        <a href="#gallery">{dict.guide.gallery}</a>
        <a href="#sources">{dict.guide.sources}</a>
      </nav>
      <section
        className="practical-guide"
        id="practical"
        aria-labelledby="practical-title"
      >
        <div className="section-heading">
          <div>
            <h2 id="practical-title">{dict.guide.overview}</h2>
            <p>{practical.suits}</p>
          </div>
        </div>
        <div className="practical-grid">
          {(['stay', 'arrival', 'rain', 'prepare'] as const).map((key) => (
            <article key={key}>
              <h3>{dict.guide[key]}</h3>
              <p>{practical[key]}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="day-plan" className="day-plan" aria-labelledby="day-plan-title">
        <div className="section-heading">
          <div>
            <p className="section-japanese" lang="ja" aria-hidden="true">
              一日のしおり
            </p>
            <h2 id="day-plan-title">{dict.detailExtra.day}</h2>
            <p>{dict.detailExtra.dayNote}</p>
          </div>
        </div>
        <ol className="day-timeline">
          {notes.day.map((text, index) => (
            <li key={text}>
              <span className="day-time">
                {
                  [
                    dict.detailExtra.morning,
                    dict.detailExtra.afternoon,
                    dict.detailExtra.evening,
                  ][index]
                }
              </span>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>
      <div className="detail-body">
        <div>
          <h2>{dict.detail.highlights}</h2>
          <ul className="highlight-list">
            {copy.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>{dict.detailExtra.food}</h2>
          <p>{notes.food}</p>
          <h2>{dict.detail.gettingThere}</h2>
          <p>{copy.gettingThere}</p>
        </div>
        <aside className="detail-aside">
          <h2>{dict.detail.tip}</h2>
          <p>{copy.tip}</p>
          <h3>{dict.detailExtra.nearby}</h3>
          <p>{notes.extra}</p>
          <p className="source-note">{dict.detail.suggestion}</p>
          <a href={place.source} className="text-link">
            {dict.detail.source}
            <Icon name="external" />
          </a>
          <p className="source-note">
            {dict.detail.reviewed}{' '}
            <time dateTime={guide.reviewedAt}>{guide.reviewedAt}</time>
          </p>
        </aside>
      </div>
      <section className="guide-places" id="places" aria-labelledby="places-title">
        <h2 id="places-title">{dict.guide.spots}</h2>
        <PlacesMap
          points={spots.filter((spot) => spot.destination === slug)}
          mapCopy={dict.streetMap}
          lang={lang}
        />
      </section>
      <section id="gallery" className="guide-gallery" aria-labelledby="gallery-title">
        <h2 id="gallery-title">{dict.guide.gallery}</h2>
        <PhotoGallery
          copy={dict.guide}
          photos={[
            {
              src: place.image,
              alt: {
                en: place.en.imageAlt,
                ja: place.ja.imageAlt,
                th: place.th.imageAlt,
              },
            },
            detailPhotos[slug],
          ]}
          lang={lang}
        />
      </section>
      <section className="guide-sources" id="sources" aria-labelledby="sources-title">
        <h2 id="sources-title">{dict.guide.sources}</h2>
        <p>{dict.guide.note}</p>
        <p>
          {dict.detail.reviewed}{' '}
          <time dateTime={guide.reviewedAt}>{guide.reviewedAt}</time>
        </p>
        <ul>
          {guide.sources.map((url) => (
            <li key={url}>
              <a href={url}>{new URL(url).hostname.replace('www.', '')} ↗</a>
            </li>
          ))}
        </ul>
      </section>
      <section className="related">
        <h2>{dict.detail.more}</h2>
        <div className="related-links">
          {destinations
            .filter((item) => item.slug !== slug)
            .slice(0, 3)
            .map((item) => (
              <Link href={`/${lang}/destinations/${item.slug}`} key={item.slug}>
                <div className="related-photo">
                  <Image
                    src={item.image}
                    alt={item[lang].imageAlt}
                    fill
                    sizes="(max-width: 650px) 100vw, 30vw"
                  />
                </div>
                <span>
                  {item[lang].name}
                  <Icon name="arrow" />
                </span>
              </Link>
            ))}
        </div>
      </section>
    </main>
  )
}
