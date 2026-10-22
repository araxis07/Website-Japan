import type { Locale } from '@/i18n/config'
import { destinations } from './travel'

export type Place = {
  id: string
  destination: string
  coordinates: [number, number]
  names: Record<Locale, string>
}
export const spots: Place[] = [
  {
    id: 'kiyomizu',
    destination: 'kyoto',
    coordinates: [34.9949, 135.785],
    names: { en: 'Kiyomizu-dera', ja: '清水寺', th: 'วัดคิโยมิซุเดระ' },
  },
  {
    id: 'gion',
    destination: 'kyoto',
    coordinates: [35.003, 135.775],
    names: { en: 'Gion', ja: '祇園', th: 'กิออน' },
  },
  {
    id: 'kyoto-museum',
    destination: 'kyoto',
    coordinates: [34.99, 135.773],
    names: {
      en: 'Kyoto National Museum',
      ja: '京都国立博物館',
      th: 'พิพิธภัณฑสถานแห่งชาติเกียวโต',
    },
  },
  {
    id: 'sensoji',
    destination: 'tokyo',
    coordinates: [35.7148, 139.7967],
    names: { en: 'Sensoji', ja: '浅草寺', th: 'วัดเซ็นโซจิ' },
  },
  {
    id: 'sumida',
    destination: 'tokyo',
    coordinates: [35.714, 139.802],
    names: { en: 'Sumida Park', ja: '隅田公園', th: 'สวนสุมิดะ' },
  },
  {
    id: 'tokyo-museum',
    destination: 'tokyo',
    coordinates: [35.7188, 139.7765],
    names: {
      en: 'Tokyo National Museum',
      ja: '東京国立博物館',
      th: 'พิพิธภัณฑสถานแห่งชาติโตเกียว',
    },
  },
  {
    id: 'oishi',
    destination: 'mount-fuji',
    coordinates: [35.5238, 138.7468],
    names: { en: 'Oishi Park', ja: '大石公園', th: 'สวนโออิชิ' },
  },
  {
    id: 'kawaguchiko',
    destination: 'mount-fuji',
    coordinates: [35.498, 138.7688],
    names: { en: 'Kawaguchiko Station', ja: '河口湖駅', th: 'สถานีคาวากุจิโกะ' },
  },
  {
    id: 'fuji-center',
    destination: 'mount-fuji',
    coordinates: [35.4846, 138.7732],
    names: {
      en: 'Yamanashi Fujisan World Heritage Center',
      ja: '山梨県立富士山世界遺産センター',
      th: 'ศูนย์มรดกโลกฟูจิ จังหวัดยามานาชิ',
    },
  },
  {
    id: 'osaka-castle',
    destination: 'osaka',
    coordinates: [34.6873, 135.5262],
    names: { en: 'Osaka Castle Park', ja: '大阪城公園', th: 'สวนปราสาทโอซาก้า' },
  },
  {
    id: 'osaka-museum',
    destination: 'osaka',
    coordinates: [34.6825, 135.5208],
    names: {
      en: 'Osaka Museum of History',
      ja: '大阪歴史博物館',
      th: 'พิพิธภัณฑ์ประวัติศาสตร์โอซาก้า',
    },
  },
  {
    id: 'dotonbori',
    destination: 'osaka',
    coordinates: [34.6687, 135.5013],
    names: { en: 'Dotonbori', ja: '道頓堀', th: 'โดทงโบริ' },
  },
  {
    id: 'odori',
    destination: 'hokkaido',
    coordinates: [43.0598, 141.3478],
    names: { en: 'Odori Park, Sapporo', ja: '札幌・大通公園', th: 'สวนโอโดริ ซัปโปโร' },
  },
  {
    id: 'hokkaido-museum',
    destination: 'hokkaido',
    coordinates: [43.0753, 141.3407],
    names: {
      en: 'Hokkaido University Museum',
      ja: '北海道大学総合博物館',
      th: 'พิพิธภัณฑ์มหาวิทยาลัยฮอกไกโด',
    },
  },
  {
    id: 'beer-museum',
    destination: 'hokkaido',
    coordinates: [43.0715, 141.3686],
    names: {
      en: 'Sapporo Beer Museum',
      ja: 'サッポロビール博物館',
      th: 'พิพิธภัณฑ์เบียร์ซัปโปโร',
    },
  },
  {
    id: 'makishi',
    destination: 'okinawa',
    coordinates: [26.2148, 127.6887],
    names: { en: 'Makishi Public Market', ja: '第一牧志公設市場', th: 'ตลาดมาคิชิ' },
  },
  {
    id: 'tsuboya',
    destination: 'okinawa',
    coordinates: [26.213, 127.6917],
    names: {
      en: 'Tsuboya pottery street',
      ja: '壺屋やちむん通り',
      th: 'ถนนเครื่องปั้นดินเผาสึโบยะ',
    },
  },
  {
    id: 'okinawa-museum',
    destination: 'okinawa',
    coordinates: [26.2273, 127.693],
    names: {
      en: 'Okinawa Prefectural Museum & Art Museum',
      ja: '沖縄県立博物館・美術館',
      th: 'พิพิธภัณฑ์และหอศิลป์จังหวัดโอกินาว่า',
    },
  },
]
const bases: Record<string, [number, number]> = {
  kyoto: [35.0116, 135.7681],
  tokyo: [35.6762, 139.6503],
  'mount-fuji': [35.497, 138.755],
  osaka: [34.6937, 135.5023],
  hokkaido: [43.0618, 141.3545],
  okinawa: [26.2124, 127.6809],
}
export const places: Place[] = [
  ...destinations.map((d) => ({
    id: `destination:${d.slug}`,
    destination: d.slug,
    coordinates: bases[d.slug],
    names: { en: d.en.name, ja: d.ja.name, th: d.th.name },
  })),
  ...spots,
]
export function mapUrl(place: Place, directions = false) {
  const target = `${place.coordinates[0]},${place.coordinates[1]}`
  return directions
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(target)}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.names.en} ${place.names.ja}`)}`
}
