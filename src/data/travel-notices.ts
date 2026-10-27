import type { Locale } from '@/i18n/config'
import { tripDate, tripPlace, type Trip } from '@/lib/trip'
export const travelNotices = [
  {
    id: 'nex-2026-11',
    areas: ['chiba', 'tokyo', 'kanagawa'],
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
    areas: ['kyoto'],
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
  areas: string[]
  from: string
  through: string
  reviewedAt: string
  source: string
  text: Record<Locale, string>
}[]
export const currentNotices = (today: string) =>
  travelNotices.filter((notice) => today && today <= notice.through)

export function tripNotices(trip: Trip, today: string) {
  const areas = trip.items
    .map((item) => {
      const place = tripPlace(item)
      return (
        place.prefecture ||
        (place.destination === 'mount-fuji' ? 'yamanashi' : place.destination)
      )
    })
    .filter(Boolean)
  return currentNotices(today).filter(
    (notice) =>
      (!areas.length || notice.areas.some((area) => areas.includes(area))) &&
      (!trip.startDate ||
        (trip.startDate <= notice.through &&
          tripDate(trip.startDate, trip.days) >= notice.from)),
  )
}
