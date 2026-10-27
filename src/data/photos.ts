import type { Locale } from '@/i18n/config'
export type Photo = {
  taken?: string
  src: string
  alt: Record<Locale, string>
  source?: string
  artist?: string
  license?: string
  licenseUrl?: string
}
export const detailPhotos: Record<string, Photo> = {
  kyoto: {
    src: '/images/tea.jpg',
    alt: {
      en: 'Matcha in a ceramic bowl — an illustration of the tea experience, not a particular venue',
      ja: '陶器の碗に入った抹茶。特定の施設ではなく、お茶の体験のイメージです',
      th: 'มัทฉะในถ้วยเซรามิก ภาพประกอบประสบการณ์ชา ไม่ใช่ร้านใดโดยเฉพาะ',
    },
  },
  tokyo: {
    src: '/images/sensoji.jpg',
    alt: {
      en: 'Sensoji temple buildings in Asakusa, Tokyo',
      ja: '東京・浅草の浅草寺',
      th: 'อาคารวัดเซ็นโซจิในอาซากุสะ โตเกียว',
    },
  },
  'mount-fuji': {
    src: '/images/kawaguchi.jpg',
    alt: {
      en: 'Mount Fuji across Lake Kawaguchi',
      ja: '河口湖越しに望む富士山',
      th: 'ภูเขาไฟฟูจิเหนือทะเลสาบคาวากุจิ',
    },
  },
  osaka: {
    src: '/images/food.jpg',
    alt: {
      en: 'A lantern above a takoyaki stall in Dotonbori, Osaka',
      ja: '大阪・道頓堀のたこ焼き店の提灯',
      th: 'โคมไฟเหนือร้านทาโกยากิในโดทงโบริ โอซาก้า',
    },
  },
  hokkaido: {
    src: '/images/otaru.jpg',
    alt: {
      en: 'A boat on Otaru Canal, Hokkaido',
      ja: '北海道・小樽運河の船',
      th: 'เรือบนคลองโอตารุ ฮอกไกโด',
    },
  },
  okinawa: {
    src: '/images/naha.jpg',
    alt: {
      en: 'A covered shopping lane near Kokusai-dori in Naha',
      ja: '那覇・国際通り周辺の屋根付き商店街',
      th: 'ถนนร้านค้ามีหลังคาใกล้โคคุไซโดริ นาฮะ',
    },
  },
}
export const newPhotoCredits = [
  ['Matcha — Zed Can', 'https://unsplash.com/photos/vXivoEBxWIY'],
  ['Dotonbori — Stefan Szankowski', 'https://unsplash.com/photos/TPBo7esmAWM'],
  [
    'Hot spring water — Nichika Sakurai',
    'https://unsplash.com/photos/vu9NE6SvDzI',
  ],
  ['Sensoji — Charles Postiaux', 'https://unsplash.com/photos/4gVxWoFlCPw'],
  ['Lake Kawaguchi — Aditya Anjagi', 'https://unsplash.com/photos/wafSlbysWB4'],
  ['Otaru Canal — Stephen Fang', 'https://unsplash.com/photos/F3quid2lfZc'],
  ['Naha — Monineath Horn', 'https://unsplash.com/photos/YWZwIKXTITY'],
]
