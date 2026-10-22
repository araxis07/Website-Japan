import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { destinationNotes } from '@/data/journeys'
import { destinations, reviewedAt } from '@/data/travel'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { siteUrl } from '@/utils/site'
import { generateBreadcrumbSchema } from '@/utils/schema'
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
            },
          },
          openGraph: {
            title: place[lang].name,
            description: place[lang].description,
            url: `${siteUrl}/${lang}/destinations/${slug}`,
            locale: lang === 'ja' ? 'ja_JP' : 'en_US',
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
      <nav className="breadcrumbs" aria-label={lang === 'ja' ? 'パンくずリスト' : 'Breadcrumb'}>
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
        </div>
      </section>
      <section className="day-plan" aria-labelledby="day-plan-title">
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
            {dict.detail.reviewed} <time dateTime={reviewedAt}>{reviewedAt}</time>
          </p>
        </aside>
      </div>
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
