import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DestinationMap from '@/components/DestinationMap'
import StartHere from '@/components/StartHere'
import Hero from '@/components/Hero'
import FeaturedDestinations from '@/components/FeaturedDestinations'
import RegionsList from '@/components/RegionsList'
import SeasonalHighlights from '@/components/SeasonalHighlights'
import Experiences from '@/components/Experiences'
import Journeys from '@/components/Journeys'
import TravelPlanning from '@/components/TravelPlanning'
import { getDictionary } from '@/i18n/dictionaries'
import { isLocale, ogLocales } from '@/i18n/config'
import { siteUrl } from '@/utils/site'
import {
  generateTravelGuideSchema,
  generateTouristDestinationSchema,
  generateBreadcrumbSchema,
} from '@/utils/schema'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  if (!siteUrl) return {}
  const dict = await getDictionary(lang)
  return {
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        ja: `${siteUrl}/ja`,
        en: `${siteUrl}/en`,
        th: `${siteUrl}/th`,
        'x-default': `${siteUrl}/ja`,
      },
    },
    openGraph: {
      title: dict.brand,
      description: dict.footer.description,
      url: `${siteUrl}/${lang}`,
      locale: ogLocales[lang],
      type: 'website',
      images: [{ url: '/images/fuji.jpg', alt: dict.hero.location }],
    },
  }
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const schema = [
    generateTravelGuideSchema(lang),
    generateTouristDestinationSchema(lang),
    generateBreadcrumbSchema(lang),
  ].filter(Boolean)
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
      <Hero dict={dict} lang={lang} />
      <StartHere lang={lang} copy={dict.beginner} />
      <div className="container intro-strip">
        <div className="intro-copy">
          <h2>{dict.intro.title}</h2>
          <p>{dict.intro.text}</p>
        </div>
        <div className="intro-stats">
          <div>
            <strong>9</strong>
            <span>{dict.intro.regions}</span>
          </div>
          <div>
            <strong>47</strong>
            <span>{dict.intro.prefectures}</span>
          </div>
          <div>
            <strong>4</strong>
            <span>{dict.intro.seasons}</span>
          </div>
        </div>
      </div>
      <FeaturedDestinations dict={dict} lang={lang} />
      <DestinationMap
        copy={dict.map}
        mapCopy={dict.streetMap}
        exploreLabel={dict.navigation.explore}
        lang={lang}
      />
      <Experiences dict={dict} lang={lang} />
      <RegionsList dict={dict} lang={lang} />
      <SeasonalHighlights dict={dict} lang={lang} />
      <Journeys dict={dict} lang={lang} />
      <TravelPlanning dict={dict} />
    </main>
  )
}
