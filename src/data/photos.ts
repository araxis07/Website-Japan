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
      "ko": "도자기 그릇에 담긴 말차. 특정 장소가 아닌 차 체험을 나타낸 이미지",
      "zh-CN": "陶碗中的抹茶——茶体验的示意图，并非特定场所",
      "vi": "Matcha trong bát gốm — ảnh minh họa trải nghiệm trà, không phải địa điểm cụ thể",
      "fr": "Du matcha dans un bol en céramique — une illustration de l’expérience du thé, sans lieu particulier",
      "es": "Matcha en un cuenco de cerámica: una ilustración de la experiencia del té, no de un local concreto",
    },
  },
  tokyo: {
    src: '/images/sensoji.jpg',
    alt: {
      en: 'Sensoji temple buildings in Asakusa, Tokyo',
      ja: '東京・浅草の浅草寺',
      th: 'อาคารวัดเซ็นโซจิในอาซากุสะ โตเกียว',
      "ko": "도쿄 아사쿠사의 센소지 건물들",
      "zh-CN": "东京浅草的浅草寺建筑",
      "vi": "Các tòa nhà chùa Sensoji ở Asakusa, Tokyo",
      "fr": "Les bâtiments du temple Sensoji à Asakusa, Tokyo",
      "es": "Los edificios del templo Sensoji en Asakusa, Tokio",
    },
  },
  'mount-fuji': {
    src: '/images/kawaguchi.jpg',
    alt: {
      en: 'Mount Fuji across Lake Kawaguchi',
      ja: '河口湖越しに望む富士山',
      th: 'ภูเขาไฟฟูจิเหนือทะเลสาบคาวากุจิ',
      "ko": "가와구치호 너머로 보이는 후지산",
      "zh-CN": "隔河口湖眺望富士山",
      "vi": "Núi Phú Sĩ phía bên kia hồ Kawaguchi",
      "fr": "Le mont Fuji au-delà du lac Kawaguchi",
      "es": "El monte Fuji al otro lado del lago Kawaguchi",
    },
  },
  osaka: {
    src: '/images/food.jpg',
    alt: {
      en: 'A lantern above a takoyaki stall in Dotonbori, Osaka',
      ja: '大阪・道頓堀のたこ焼き店の提灯',
      th: 'โคมไฟเหนือร้านทาโกยากิในโดทงโบริ โอซาก้า',
      "ko": "오사카 도톤보리의 다코야키 가게 위에 걸린 등불",
      "zh-CN": "大阪道顿堀章鱼烧摊上方的灯笼",
      "vi": "Đèn lồng phía trên quầy takoyaki ở Dotonbori, Osaka",
      "fr": "Une lanterne au-dessus d’un stand de takoyaki à Dotonbori, Osaka",
      "es": "Un farol sobre un puesto de takoyaki en Dotonbori, Osaka",
    },
  },
  hokkaido: {
    src: '/images/otaru.jpg',
    alt: {
      en: 'A boat on Otaru Canal, Hokkaido',
      ja: '北海道・小樽運河の船',
      th: 'เรือบนคลองโอตารุ ฮอกไกโด',
      "ko": "홋카이도 오타루 운하의 배",
      "zh-CN": "北海道小樽运河上的船",
      "vi": "Thuyền trên kênh Otaru, Hokkaido",
      "fr": "Un bateau sur le canal d’Otaru, Hokkaido",
      "es": "Un barco en el canal de Otaru, Hokkaido",
    },
  },
  okinawa: {
    src: '/images/naha.jpg',
    alt: {
      en: 'A covered shopping lane near Kokusai-dori in Naha',
      ja: '那覇・国際通り周辺の屋根付き商店街',
      th: 'ถนนร้านค้ามีหลังคาใกล้โคคุไซโดริ นาฮะ',
      "ko": "나하 국제거리 인근의 지붕 있는 상점가",
      "zh-CN": "那霸国际通附近的有顶购物街",
      "vi": "Phố mua sắm có mái che gần Kokusai-dori ở Naha",
      "fr": "Une rue commerçante couverte près de Kokusai-dori à Naha",
      "es": "Una calle comercial cubierta cerca de Kokusai-dori, en Naha",
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
