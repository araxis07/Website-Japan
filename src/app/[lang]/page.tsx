import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DestinationMap from '@/components/DestinationMap'
import StartHere from '@/components/StartHere'
import Hero from '@/components/Hero'
import CultureStories from '@/components/CultureStories'
import JapanDiorama from '@/components/JapanDiorama'
import FeaturedDestinations from '@/components/FeaturedDestinations'
import RegionsList from '@/components/RegionsList'
import SeasonalHighlights from '@/components/SeasonalHighlights'
import Experiences from '@/components/Experiences'
import Journeys from '@/components/Journeys'
import { journeys } from '@/data/journeys'
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
      <CultureStories lang={lang} />
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
      <section
        id="miniature"
        className="scene-chapter section"
        aria-labelledby="miniature-title"
      >
        <div className="container scene-chapter-inner">
          <div className="scene-chapter-copy">
            <p className="section-japanese" lang="ja" aria-hidden="true">
              四季の旅
            </p>
            <h2 id="miniature-title">{dict.identity.sceneTitle}</h2>
            <p>{dict.identity.sceneDescription}</p>
            <div className="scene-chapter-seasons" aria-hidden="true" lang="ja">
              <span>春</span>
              <span>夏</span>
              <span>秋</span>
              <span>冬</span>
            </div>
            <p className="source-note">{dict.tools.sceneNote}</p>
          </div>
          <JapanDiorama copy={dict.scene} />
        </div>
      </section>
      <FeaturedDestinations labels={dict.destinations} lang={lang} />
      <Journeys
        copy={dict.journeys}
        lang={lang}
        journeys={journeys.map((journey) => ({
          days: journey.days,
          image: journey.image,
          ...journey[lang],
          stops: journey.stops.map((stop, index) => ({
            slug: stop.slug,
            days: stop.days,
            startDay:
              1 +
              journey.stops
                .slice(0, index)
                .reduce((total, previous) => total + previous.days, 0),
            ...stop[lang],
          })),
        }))}
      />
      <DestinationMap
        copy={dict.map}
        mapCopy={dict.streetMap}
        exploreLabel={dict.navigation.explore}
        lang={lang}
      />
      <details className="home-more">
        <summary>{dict.tools.homeMore}</summary>
        <Experiences dict={dict} lang={lang} />
        <RegionsList dict={dict} lang={lang} />
        <SeasonalHighlights
          copy={dict.seasons}
          typicalSeason={dict.tools.typicalSeason}
          lang={lang}
        />
        <TravelPlanning dict={dict} />
      </details>
    </main>
  )
}
