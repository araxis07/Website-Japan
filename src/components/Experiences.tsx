import Image from 'next/image'
import { experiences } from '@/data/journeys'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'
import Icon from './Icon'

export default function Experiences({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <section
      id="experiences"
      className="experiences-section section"
      aria-labelledby="experiences-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="section-japanese" lang="ja" aria-hidden="true">
              日本を感じる
            </p>
            <h2 id="experiences-title">{dict.experiences.title}</h2>
            <p>{dict.experiences.subtitle}</p>
          </div>
          <span className="section-stamp" aria-hidden="true">
            心
          </span>
        </div>
        <div className="experience-grid">
          {experiences.map((item) => (
            <a className="experience-card" key={item.kanji} href={item.source}>
              <div className="experience-photo">
                <Image src={item.image} alt="" fill sizes="(max-width: 650px) 90vw, 30vw" />
                <span lang="ja" aria-hidden="true">
                  {item.kanji}
                </span>
              </div>
              <div className="experience-copy">
                <h3>{item[lang].title}</h3>
                <p>{item[lang].text}</p>
                <span className="text-link">
                  {dict.experiences.link}
                  <Icon name="external" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
