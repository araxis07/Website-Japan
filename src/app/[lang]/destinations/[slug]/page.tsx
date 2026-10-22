import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
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
  const dict = await getDictionary(lang)
  const schema = generateBreadcrumbSchema(lang, { name: copy.name, slug })
  return (
    <main id="main-content" className="container">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
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
            preload
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
      <div className="detail-body">
        <div>
          <h2>{dict.detail.highlights}</h2>
          <ul className="highlight-list">
            {copy.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>{dict.detail.gettingThere}</h2>
          <p>{copy.gettingThere}</p>
        </div>
        <aside className="detail-aside">
          <h2>{dict.detail.tip}</h2>
          <p>{copy.tip}</p>
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
            .map((item) => (
              <Link href={`/${lang}/destinations/${item.slug}`} key={item.slug}>
                {item[lang].name}
              </Link>
            ))}
        </div>
      </section>
    </main>
  )
}
