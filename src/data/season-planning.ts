import type { Locale } from '@/i18n/config'
// Broad climate planning, not annual bloom dates or an operational forecast.
export const seasonPlanning: Record<string, Record<Locale, string>> = {
  hokkaido: {
    en: 'Northern spring arrives later. Snow changes walking and rail plans; check local conditions.',
    ja: '北の春は遅め。雪は徒歩や鉄道の計画に影響するため現地情報を確認。',
    th: 'ฤดูใบไม้ผลิทางเหนือมาช้ากว่า หิมะกระทบการเดินและรถไฟ ตรวจสภาพพื้นที่จริง',
  },
  tohoku: {
    en: 'Separate coastal and mountain conditions. Snow can linger on higher routes.',
    ja: '海沿いと山の状況は別に確認。高所では雪が残る場合も。',
    th: 'ตรวจอากาศชายฝั่งกับภูเขาแยกกัน เส้นทางสูงอาจยังมีหิมะ',
  },
  kanto: {
    en: 'Summer city walks need heat breaks; mountain day trips need a separate forecast.',
    ja: '夏の街歩きは暑さを避けて休憩。山への日帰りは別の予報を。',
    th: 'เดินในเมืองฤดูร้อนควรพักหลบร้อน ทริปภูเขาต้องดูพยากรณ์แยก',
  },
  chubu: {
    en: 'Altitude matters more than the city calendar. Confirm seasonal mountain-route openings.',
    ja: '街の季節より標高に注意。山の経路の開通時期を確認。',
    th: 'ระดับความสูงสำคัญกว่าฤดูกาลในเมือง ตรวจช่วงเปิดเส้นทางภูเขา',
  },
  kansai: {
    en: 'Warm-season temple walks need shade and water. Flower and foliage timing changes each year.',
    ja: '暖かい季節の寺社散策は日陰と水分を。花や紅葉の時期は年ごとに変化。',
    th: 'เดินวัดช่วงอุ่นควรมีร่มเงาและน้ำ ช่วงดอกไม้กับใบไม้เปลี่ยนทุกปี',
  },
  chugoku: {
    en: 'Check the coast you visit; island ferry plans also depend on wind and sea conditions.',
    ja: '訪れる海岸の情報を確認。島への船は風や海況にも左右されます。',
    th: 'ดูอากาศชายฝั่งที่จะไป เรือไปเกาะขึ้นกับลมและสภาพทะเลด้วย',
  },
  shikoku: {
    en: 'Rain affects valley walks and coastal outings. Keep a flexible indoor day.',
    ja: '雨は渓谷散策や海辺の予定に影響。屋内の代案を用意。',
    th: 'ฝนกระทบการเดินหุบเขาและเที่ยวชายฝั่ง เตรียมวันในร่มที่สลับได้',
  },
  kyushu: {
    en: 'Check rain, heat and current volcanic access before outdoor trips.',
    ja: '屋外へは雨・暑さ・最新の火山立入情報を確認。',
    th: 'ตรวจฝน ความร้อน และการเข้าถึงเขตภูเขาไฟก่อนเที่ยวกลางแจ้ง',
  },
  okinawa: {
    en: 'Subtropical conditions differ from mainland Japan. Check typhoon and marine notices before island connections.',
    ja: '本州とは異なる亜熱帯の気候。島への移動前に台風・海況を確認。',
    th: 'อากาศกึ่งร้อนชื้นต่างจากญี่ปุ่นแผ่นดินหลัก ตรวจพายุและประกาศทะเลก่อนต่อเกาะ',
  },
}
