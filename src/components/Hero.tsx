import type { Dictionary } from '@/i18n/dictionaries'
import Icon from './Icon'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import JapanDiorama from './JapanDiorama'

export default function Hero({
  dict,
  lang,
}: {
  dict: Dictionary
  lang: Locale
}) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span />
            {dict.hero.eyebrow}
          </p>
          <h1 id="hero-title">{dict.hero.title}</h1>
          <p className="hero-description">{dict.hero.subtitle}</p>
          <div className="hero-actions">
            <Link href={`/${lang}/first-visit`} className="button">
              {dict.beginner.step1}
              <Icon name="arrow" />
            </Link>
            <Link href={`/${lang}/explore`} className="hero-secondary">
              {dict.navigation.explore}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="hero-note">
            <span className="hero-seal" lang="ja" aria-hidden="true">
              旅
            </span>
            <p>{dict.hero.caption}</p>
          </div>
        </div>
        <div>
          <JapanDiorama copy={dict.scene} />
          <p className="source-note">{dict.tools.sceneNote}</p>
        </div>
      </div>
      <div className="hero-bottom container">
        <span>{dict.hero.location}</span>
        <span lang="ja" aria-hidden="true">
          見つける・感じる・旅する
        </span>
        <a href="#destinations" className="scroll-cue">
          {dict.hero.scroll}
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}
