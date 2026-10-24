import { searchAliases } from '@/data/regional-planning'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { prefectures } from '@/data/prefectures'
import { prefecturePlaces } from '@/data/prefecture-places'
import { placeCategory } from '@/data/visit-details'
import { regions } from '@/data/travel'
import { pageMetadata } from '@/utils/site'
import PrefectureExplorer from '@/components/PrefectureExplorer'

type Props = { params: Promise<{ lang: string }> }
export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  return pageMetadata(
    lang,
    '/explore',
    dict.explorer.title,
    dict.explorer.subtitle,
  )
}
export default async function Explore({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  return (
    <main id="main-content" className="container explorer-page">
      <nav className="breadcrumbs" aria-label={dict.guide.breadcrumb}>
        <Link href={`/${lang}`}>{dict.detail.home}</Link>
        <span aria-hidden="true">/</span>
        <span>{dict.navigation.explore}</span>
      </nav>
      <div className="page-intro">
        <p className="section-japanese" lang="ja" aria-hidden="true">
          日本を歩こう
        </p>
        <h1>{dict.explorer.title}</h1>
        <p>{dict.explorer.subtitle}</p>
      </div>
      <p className="beginner-note">
        {dict.explorer.visit}{' '}
        <Link href={`/${lang}/first-visit`}>{dict.explorer.visitLink} ↗</Link>
      </p>
      <PrefectureExplorer
        lang={lang}
        copy={dict.explorer}
        mapCopy={dict.streetMap}
        tools={dict.tools}
        regions={regions.map((r) => ({ id: r.id, name: r[lang][0] }))}
        entries={prefectures.map((p) => ({
          slug: p.slug,
          names: p.names,
          region: p.region,
          base: p.base[lang],
          categories: p.places.map((id) =>
            placeCategory(prefecturePlaces.find((place) => place.id === id)!),
          ),
          keywords:
            (searchAliases[p.slug] || '') +
            ' ' +
            p.places
              .map((id) =>
                Object.values(
                  prefecturePlaces.find((place) => place.id === id)!.names,
                ).join(' '),
              )
              .join(' '),
          summary: p.summary[lang],
          coordinates: prefecturePlaces.find(
            (place) => place.id === p.places[0],
          )!.coordinates,
        }))}
      />
    </main>
  )
}
