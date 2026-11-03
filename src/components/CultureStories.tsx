import Image from 'next/image'
import Link from 'next/link'
import prefecturePhotos from '@/data/prefecture-photos.json'
import { detailPhotos } from '@/data/photos'
import type { Locale } from '@/i18n/config'

type StoryCopy = {
  location: string
  title: string
  text: string
  link: string
}

type CultureCopy = {
  title: string
  intro: string
  stories: [StoryCopy, StoryCopy, StoryCopy]
}

const copy: Record<Locale, CultureCopy> = {
  en: {
    title: 'Culture, seen up close',
    intro:
      'Temple grounds, craft districts and market streets. Explore different places and the everyday details that give each its character.',
    stories: [
      {
        location: 'Nara',
        title: 'A thoughtful temple visit',
        text: 'Explore Nara’s temples and shrines. Follow photography and shoe-removal signs, and leave room for other visitors.',
        link: 'Explore Nara',
      },
      {
        location: 'Kanazawa · Ishikawa',
        title: 'Gardens, craft and old streets',
        text: 'Walk through Kenrokuen and the streets of Higashi Chaya. Make time for Kanazawa’s gardens, craft and preserved neighborhoods.',
        link: 'Explore Kanazawa',
      },
      {
        location: 'Naha · Okinawa',
        title: 'Meet Okinawa through Naha',
        text: 'Explore Ryukyu culture at the prefectural museum, then spend time in Naha’s market streets and local food scene.',
        link: 'Explore Okinawa',
      },
    ],
  },
  ja: {
    title: '土地の文化に、もう一歩近く',
    intro:
      '寺社の境内、工芸の街、市場の通り。それぞれの土地を歩き、その場所らしさをつくる日々の風景に目を向けてみませんか。',
    stories: [
      {
        location: '奈良',
        title: '心を配る、寺社めぐり',
        text: '奈良の寺院や神社を訪ねる旅。撮影や靴を脱ぐ場所の表示を確認し、ほかの参拝者にも配慮しましょう。',
        link: '奈良を知る',
      },
      {
        location: '金沢・石川',
        title: '庭園、工芸、古い街並み',
        text: '兼六園やひがし茶屋街を歩き、金沢の庭園や工芸、受け継がれてきた街並みをゆっくり訪ねてみましょう。',
        link: '金沢を知る',
      },
      {
        location: '那覇・沖縄',
        title: '那覇から出会う沖縄',
        text: '県立博物館で琉球文化に触れたら、那覇の市場の通りへ。街歩きと地元の食を楽しむ時間も旅の一部に。',
        link: '沖縄を知る',
      },
    ],
  },
  th: {
    title: 'มองวัฒนธรรมให้ใกล้ขึ้น',
    intro:
      'จากลานวัดและศาลเจ้า สู่ย่านงานฝีมือและถนนตลาด เดินสำรวจแต่ละพื้นที่ผ่านรายละเอียดในชีวิตประจำวันซึ่งทำให้แต่ละแห่งมีเสน่ห์ต่างกัน',
    stories: [
      {
        location: 'นารา',
        title: 'เยือนวัดและศาลเจ้าอย่างใส่ใจ',
        text: 'สำรวจวัดและศาลเจ้าในนารา อ่านป้ายเรื่องการถ่ายภาพและจุดที่ต้องถอดรองเท้า พร้อมเว้นพื้นที่ให้ผู้มาเยือนคนอื่น',
        link: 'สำรวจนารา',
      },
      {
        location: 'คานาซาวะ · อิชิคาวะ',
        title: 'สวน งานฝีมือ และย่านเก่า',
        text: 'เดินชมสวนเค็นโรคุเอ็นและย่านฮิกาชิชายะ เผื่อเวลาให้สวน งานฝีมือ และย่านเก่าที่ได้รับการอนุรักษ์ของคานาซาวะ',
        link: 'สำรวจคานาซาวะ',
      },
      {
        location: 'นาฮะ · โอกินาวะ',
        title: 'รู้จักโอกินาวะผ่านเมืองนาฮะ',
        text: 'เรียนรู้วัฒนธรรมริวกิวที่พิพิธภัณฑ์ประจำจังหวัด แล้วใช้เวลาเดินถนนตลาดและลองอาหารท้องถิ่นในนาฮะ',
        link: 'สำรวจโอกินาวะ',
      },
    ],
  },
}

const stories = [
  { id: 'nara', href: '/prefectures/nara#places', photo: prefecturePhotos.nara },
  {
    id: 'kanazawa',
    href: '/prefectures/ishikawa#places',
    photo: prefecturePhotos.ishikawa,
  },
  { id: 'okinawa', href: '/destinations/okinawa#places', photo: detailPhotos.okinawa },
] as const

export default function CultureStories({ lang }: { lang: Locale }) {
  const labels = copy[lang]

  return (
    <section
      id="culture"
      className="culture-stories section container"
      aria-labelledby="culture-title"
    >
      <div className="section-heading">
        <div>
          <h2 id="culture-title">{labels.title}</h2>
          <p>{labels.intro}</p>
        </div>
        <span className="culture-vertical" aria-hidden="true" lang="ja">
          <span>暮</span>
          <span>ら</span>
          <span>し</span>
          <span>と</span>
          <span>文</span>
          <span>化</span>
        </span>
      </div>
      <div className="culture-grid">
        {stories.map((story, index) => {
          const item = labels.stories[index]
          const titleId = `culture-${story.id}-title`
          const linkId = `culture-${story.id}-link`

          return (
            <Link
              key={story.id}
              href={`/${lang}${story.href}`}
              className="culture-story"
              aria-labelledby={`${titleId} ${linkId}`}
            >
              <div className="culture-photo">
                <Image
                  src={story.photo.src}
                  alt={story.photo.alt[lang]}
                  fill
                  sizes={
                    index === 0
                      ? '(max-width: 950px) 100vw, 45vw'
                      : '(max-width: 750px) 100vw, (max-width: 950px) 50vw, 28vw'
                  }
                />
              </div>
              <div className="culture-copy">
                <p className="culture-number">
                  {String(index + 1).padStart(2, '0')} · {item.location}
                </p>
                <h3 id={titleId}>{item.title}</h3>
                <p>{item.text}</p>
                <span id={linkId} className="text-link culture-link">
                  {item.link} <span aria-hidden="true">↗</span>
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
