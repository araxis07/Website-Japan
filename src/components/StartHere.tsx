import Link from 'next/link'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'

export default function StartHere({
  lang,
  copy,
}: {
  lang: Locale
  copy: Dictionary['beginner']
}) {
  return (
    <section className="start-here container" aria-labelledby="start-title">
      <h2 id="start-title">{copy.heading}</h2>
      <ol>
        {(['first-visit', 'explore', 'my-trip'] as const).map((path, index) => {
          const step = `step${index + 1}` as 'step1' | 'step2' | 'step3'
          return (
            <li key={path}>
              <Link href={`/${lang}/${path}`}>
                <span className="step-number" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h3>{copy[step]}</h3>
                  <p>{copy[`${step}Text`]}</p>
                </div>
                <span aria-hidden="true">↗</span>
              </Link>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
