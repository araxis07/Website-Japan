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
"ko": "이 기간 일부 나리타 익스프레스가 운휴합니다. 예약 전 대상 열차를 확인하세요.",
"zh-CN": "这些日期部分成田特快停运，预订前请查受影响车次。",
"vi": "Một số chuyến Narita Express ngừng chạy trong các ngày này. Kiểm tra tàu bị ảnh hưởng trước khi đặt.",
"fr": "Certains Narita Express sont supprimés à ces dates. Vérifiez les trains concernés avant réservation.",
"es": "Algunos Narita Express no circulan en estas fechas. Comprueba los trenes afectados antes de reservar.",
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
"ko": "교토국립박물관 겐지 이야기 특별전은 별도 시간·티켓을 적용합니다. 소장품 전시 요금은 적용되지 않습니다.",
"zh-CN": "京都国立博物馆《源氏物语》特展采用专门开放时间和门票，不适用馆藏展价格。",
"vi": "Triển lãm đặc biệt Truyện Genji của Bảo tàng Quốc gia Kyoto có giờ và vé riêng. Giá triển lãm sưu tập không áp dụng.",
"fr": "L’exposition spéciale du Dit du Genji au Musée national de Kyoto a ses propres horaires et billets. Les tarifs des collections ne s’appliquent pas.",
"es": "La exposición especial de La historia de Genji del Museo Nacional de Kioto tiene horarios y entradas propios. No se aplican los precios de la colección.",
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
