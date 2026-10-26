import type { Locale } from '@/i18n/config'
export const travelNotices = [
  {
    id: 'nex-2026-11',
    from: '2026-11-06',
    through: '2026-11-08',
    reviewedAt: '2026-10-26',
    source: 'https://www.jreast.co.jp/en/yokosuka-tunnel-koji/',
    text: {
      en: 'Some Narita Express services are suspended during these dates. Check the affected trains before booking.',
      ja: 'この期間は成田エクスプレスの一部列車が運休。予約前に対象列車を確認。',
      th: 'Narita Express บางขบวนงดเดินรถในช่วงนี้ ตรวจขบวนที่ได้รับผลกระทบก่อนจอง',
    },
  },
  {
    id: 'kyoto-genji-2026',
    from: '2026-10-06',
    through: '2026-11-29',
    reviewedAt: '2026-10-26',
    source: 'https://www.kyohaku.go.jp/eng/visit/info/',
    text: {
      en: 'Kyoto National Museum’s Tale of Genji special exhibition uses its own hours and tickets. Collection-exhibition prices do not apply.',
      ja: '京都国立博物館の特別展「源氏物語」は専用の開館時間・料金。名品ギャラリーの料金は適用されません。',
      th: 'นิทรรศการพิเศษ Tale of Genji ที่ Kyoto National Museum ใช้เวลาและตั๋วเฉพาะ ไม่ใช้ราคานิทรรศการประจำ',
    },
  },
] satisfies {
  id: string
  from: string
  through: string
  reviewedAt: string
  source: string
  text: Record<Locale, string>
}[]
export const currentNotices = (today: string) =>
  travelNotices.filter((notice) => today && today <= notice.through)
