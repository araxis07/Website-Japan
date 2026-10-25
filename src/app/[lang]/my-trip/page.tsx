import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import TripPlanner from '@/components/TripPlanner'

type Props = { params: Promise<{ lang: string }> }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  return { title: dict.trip.title, robots: { index: false, follow: true } }
}
export default async function MyTrip({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  return (
    <main id="main-content" className="container planner-page">
      <div className="planner-heading">
        <span className="section-japanese" lang="ja" aria-hidden="true">
          旅のしおり
        </span>
        <h1>{dict.trip.title}</h1>
        <p>{dict.trip.subtitle}</p>
      </div>
      <p className="trip-local-note">{dict.trip.local}</p>
      <noscript>
        <p>{dict.trip.nojs}</p>
      </noscript>
      <TripPlanner mapCopy={dict.streetMap} />
    </main>
  )
}
