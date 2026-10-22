import Image from 'next/image'
import { regions } from '@/data/travel'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import Icon from './Icon'

export default function RegionsList({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <section id="regions" className="regions-section" aria-labelledby="regions-title">
      <div className="container regions-layout">
        <div className="regions-intro">
          <p className="section-japanese" lang="ja" aria-hidden="true">
            北から、南へ。
          </p>
          <h2 id="regions-title">{dict.regions.title}</h2>
          <p>{dict.regions.subtitle}</p>
          <div className="region-photo">
            <Image
              src="/images/okinawa.jpg"
              alt={
                lang === 'ja'
                  ? '緑の木々と青い海に囲まれた沖縄の海岸'
                  : lang === 'th'
                    ? 'ชายฝั่งโอกินาว่าที่มีป่าเขียวและทะเลใส'
                    : 'Okinawa coastline with green forest and turquoise water'
              }
              fill
              sizes="(max-width: 800px) 100vw, 40vw"
            />
            <div>
              <span lang="ja">日本列島</span>
              <span>{dict.regions.caption}</span>
            </div>
          </div>
        </div>
        <div className="region-directory">
          <h3 className="directory-heading">{dict.regions.heading}</h3>
          <div className="region-list">
            {regions.map((region) => (
              <a
                id={`region-${region.id}`}
                className="region-row"
                key={region.id}
                href={`https://www.japan.travel/en/destinations/${region.path}`}
              >
                <span className="region-dot" />
                <span>
                  <strong>{region[lang][0]}</strong>
                  <small>{region[lang][1]}</small>
                </span>
                <span className="sr-only">{dict.regions.link}</span>
                <Icon name="external" />
              </a>
            ))}
          </div>
          <p className="source-note">
            {dict.regions.note}{' '}
            <a href="https://www.japan.travel/en/destinations/tokai/">
              {dict.regions.tokai}
              <Icon name="external" />
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
