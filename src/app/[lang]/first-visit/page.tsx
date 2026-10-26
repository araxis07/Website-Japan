import EmergencyCard from '@/components/EmergencyCard'
import TravelNotices from '@/components/TravelNotices'
import ReadinessChecklist from '@/components/ReadinessChecklist'
import {
  arrivalGuides,
  arrivalChecks,
  moreTrainRoutes,
  travelerProfiles,
  trainExample,
  workedTrainRoute,
  workedTrainRouteReview,
} from '@/data/arrival-guides'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { firstVisitSteps } from '@/data/first-visit'
import { pageMetadata } from '@/utils/site'

type Props = { params: Promise<{ lang: string }> }
export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  return pageMetadata(
    lang,
    '/first-visit',
    dict.beginner.title,
    dict.beginner.subtitle,
  )
}
export default async function FirstVisit({ params }: Props) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  return (
    <main id="main-content" className="container first-visit-page">
      <nav className="breadcrumbs" aria-label={dict.guide.breadcrumb}>
        <Link href={`/${lang}`}>{dict.detail.home}</Link>
        <span aria-hidden="true">/</span>
        <span>{dict.beginner.nav}</span>
      </nav>
      <div className="page-intro">
        <p className="section-japanese" lang="ja" aria-hidden="true">
          はじめての日本
        </p>
        <h1>{dict.beginner.title}</h1>
        <p>{dict.beginner.subtitle}</p>
      </div>
      <ReadinessChecklist />
      <TravelNotices />
      <details className="visit-details traveler-profiles">
        <summary>{dict.tools.practicalProfile}</summary>
        {travelerProfiles.map((profile) => (
          <section key={profile.id}>
            <h2>{profile[lang].title}</h2>
            <p>{profile[lang].text}</p>
          </section>
        ))}
      </details>
      <nav className="first-visit-toc" aria-label={dict.guide.toc}>
        {firstVisitSteps.map((step, index) => (
          <a key={step.id} href={`#${step.id}`}>
            {index + 1}. {step.copy[lang].title}
          </a>
        ))}
      </nav>
      <div className="first-visit-steps">
        {firstVisitSteps.map((step, index) => (
          <section
            className="first-step depth-surface"
            id={step.id}
            key={step.id}
            aria-labelledby={`${step.id}-title`}
          >
            <span className="step-number" aria-hidden="true">
              {index + 1}
            </span>
            <div>
              <h2 id={`${step.id}-title`}>{step.copy[lang].title}</h2>
              <ul>
                {step.copy[lang].items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="text-link" href={step.source}>
                {dict.beginner.source} ↗
              </a>
              {step.id === 'airport' && (
                <section className="arrival-guides">
                  <h3>{dict.tools.airportGuide}</h3>
                  {arrivalGuides.map((airport) => (
                    <details key={airport.code}>
                      <summary>{airport.code}</summary>
                      <ol>
                        {airport.steps[lang].map((text) => (
                          <li key={text}>{text}</li>
                        ))}
                      </ol>
                      <a href={airport.source}>{dict.tools.official} ↗</a>
                      <p className="source-note">
                        {dict.tools.reviewed}:{' '}
                        <time dateTime={airport.reviewedAt}>
                          {airport.reviewedAt}
                        </time>
                      </p>
                    </details>
                  ))}
                  {arrivalChecks.map((check) => (
                    <details key={check.source}>
                      <summary>{check[lang].title}</summary>
                      <p>{check[lang].text}</p>
                      <a href={check.source}>{dict.tools.official} ↗</a>
                      <p className="source-note">
                        {dict.tools.reviewed}:{' '}
                        <time dateTime={check.reviewedAt}>
                          {check.reviewedAt}
                        </time>
                      </p>
                    </details>
                  ))}
                </section>
              )}
              {step.id === 'transport' && (
                <section>
                  <h3>{dict.tools.trainExample}</h3>
                  <ol>
                    {trainExample[lang].map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ol>
                  <details className="visit-details">
                    <summary>{dict.tools.workedRoute}</summary>
                    <ol>
                      {workedTrainRoute[lang].map((text) => (
                        <li key={text}>{text}</li>
                      ))}
                    </ol>
                    <a href={workedTrainRouteReview.source}>
                      JR East · Narita Express ↗
                    </a>
                    <p className="source-note">
                      {dict.tools.reviewed}:{' '}
                      <time dateTime={workedTrainRouteReview.reviewedAt}>
                        {workedTrainRouteReview.reviewedAt}
                      </time>
                    </p>
                  </details>
                  {moreTrainRoutes.map((route) => (
                    <details className="visit-details" key={route.code}>
                      <summary>{route.code}</summary>
                      <ol>
                        {route.steps[lang].map((text) => (
                          <li key={text}>{text}</li>
                        ))}
                      </ol>
                      <p className="source-note">
                        <a href={route.source}>{dict.tools.official} ↗</a> ·{' '}
                        {dict.tools.reviewed}:{' '}
                        <time dateTime={route.reviewedAt}>
                          {route.reviewedAt}
                        </time>
                      </p>
                    </details>
                  ))}
                  <a href="https://www.jreast.co.jp/en/multi/ticket/guide.html">
                    JR East ↗
                  </a>
                </section>
              )}
              {step.id === 'help' && <EmergencyCard />}
              {step.id === 'documents' && (
                <p>
                  <a
                    className="text-link"
                    href="https://www.mofa.go.jp/j_info/visit/visa/index.html"
                  >
                    {dict.beginner.visa} ↗
                  </a>
                </p>
              )}
            </div>
          </section>
        ))}
      </div>
      <p className="source-note">{dict.beginner.note}</p>
      <Link className="button" href={`/${lang}/explore`}>
        {dict.beginner.continue} ↗
      </Link>
    </main>
  )
}
