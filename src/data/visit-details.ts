import type { Locale } from '@/i18n/config'
import { canonicalPlaceId, type Place } from './places'
type Text = Record<Locale, string>
type Visit = {
  source: string
  infoSource?: string
  reviewedAt: string
  access?: Text
  hours?: Text
  admission?: Text
  accessibility?: Text
  minutes: number
}
export const visitDetails: Record<string, Visit> = {
  'osaka-museum': {
    source: 'https://www.osakamushis.jp/eng/',
    reviewedAt: '2026-10-24',
    minutes: 120,
    access: {
      en: 'Use Osaka Metro Tanimachi 4-chome, near exits 2 and 9. Check the station map for step-free access.',
      ja: '大阪メトロ谷町四丁目駅2・9号出口付近。段差のない経路は駅構内図で確認。',
      th: 'ใกล้ทางออก 2 และ 9 ของ Osaka Metro Tanimachi 4-chome ตรวจแผนผังสถานีหากต้องการเส้นทางไร้ขั้นบันได',
    },
    hours: {
      en: '09:30–17:00; last admission 16:30. Closed Tuesdays (Wednesday after a Tuesday holiday) and December 28–January 4.',
      ja: '9:30〜17:00、入館は16:30まで。火曜休館（祝日は翌日）、12月28日〜1月4日休館。',
      th: '09:30–17:00 น. เข้ารอบสุดท้าย 16:30 น. ปิดวันอังคาร (เลื่อนไปวันพุธหากอังคารเป็นวันหยุด) และ 28 ธ.ค.–4 ม.ค.',
    },
    admission: {
      en: 'Permanent exhibition: adults ¥600 at review. Check special-exhibition tickets separately.',
      ja: '確認時の常設展は大人600円。特別展の料金は別途確認。',
      th: 'ราคาที่ตรวจ: นิทรรศการถาวรผู้ใหญ่ 600 เยน โปรดตรวจตั๋วนิทรรศการพิเศษแยกต่างหาก',
    },
  },
  'hokkaido-museum': {
    source: 'https://www.museum.hokudai.ac.jp/english/visit/',
    reviewedAt: '2026-10-24',
    minutes: 90,
    access: {
      en: 'About 10 minutes on foot from JR Sapporo Station’s north exit, inside the university campus. Use public transport.',
      ja: 'JR札幌駅北口から大学構内へ徒歩約10分。公共交通機関を利用。',
      th: 'เดินประมาณ 10 นาทีจากทางออกทิศเหนือของ JR Sapporo เข้าไปในมหาวิทยาลัย ควรใช้ขนส่งสาธารณะ',
    },
    hours: {
      en: '10:00–17:00. Closed Mondays and December 28–January 4; holiday Mondays move the closure to the following weekday. Check event exceptions.',
      ja: '10:00〜17:00。月曜、12月28日〜1月4日休館。月曜祝日は翌平日が休館。行事による変更を確認。',
      th: '10:00–17:00 น. ปิดจันทร์และ 28 ธ.ค.–4 ม.ค. หากจันทร์เป็นวันหยุดจะเลื่อนปิดไปวันทำการถัดไป ตรวจข้อยกเว้นจากกิจกรรมด้วย',
    },
    admission: {
      en: 'Free admission at review.',
      ja: '確認時は入館無料。',
      th: 'ไม่เสียค่าเข้าชม ณ วันที่ตรวจสอบ',
    },
    accessibility: {
      en: 'The museum provides a wheelchair lift; use the intercom and ask reception for assistance.',
      ja: '車いす用リフトあり。インターホンで受付に利用を相談。',
      th: 'มีลิฟต์รถเข็น ใช้อินเตอร์คอมติดต่อเจ้าหน้าที่ก่อนใช้',
    },
  },
  'fuji-center': {
    source: 'https://www.fujisan-whc.jp/en/guide/index.html',
    reviewedAt: '2026-10-24',
    minutes: 90,
    hours: {
      en: 'Usually 09:00–17:00; July–August 08:30–18:00 and December–February 09:00–16:30. Last admission is 30 minutes before closing; check closure notices.',
      ja: '通常9:00〜17:00。7〜8月は8:30〜18:00、12〜2月は9:00〜16:30。入館は閉館30分前まで。休館案内も確認。',
      th: 'ปกติ 09:00–17:00 น. ก.ค.–ส.ค. 08:30–18:00 น. และ ธ.ค.–ก.พ. 09:00–16:30 น. เข้าชมได้ก่อนปิด 30 นาที โปรดตรวจประกาศวันปิดด้วย',
    },
  },
  kiyomizu: {
    source: 'https://www.kiyomizudera.or.jp/en/location/',
    reviewedAt: '2026-10-24',
    minutes: 120,
    access: {
      en: 'Allow about 25 minutes on foot from Keihan Kiyomizu-Gojo. Follow the temple’s entrance map; map apps can suggest inaccessible approaches.',
      ja: '京阪清水五条駅から徒歩約25分。地図アプリが通れない経路を示す場合があるため、寺院の入口案内を確認。',
      th: 'จากสถานีเคฮัง Kiyomizu-Gojo เดินประมาณ 25 นาที ตรวจแผนที่ทางเข้าของวัด เพราะแอปอาจแนะนำทางที่เข้าไม่ได้',
    },
    hours: {
      en: 'Opens at 06:00. Closing and special evening openings depend on the date.',
      ja: '開門は6時。閉門と夜間特別拝観は日付によって異なります。',
      th: 'เปิด 06:00 น. เวลาปิดและการเปิดกลางคืนพิเศษขึ้นกับวันที่',
    },
    accessibility: {
      en: 'Consult the temple’s wheelchair route map before choosing an approach.',
      ja: '車いす用の経路図を確認してから入口を選んでください。',
      th: 'ตรวจแผนที่เส้นทางรถเข็นของวัดก่อนเลือกทางเข้า',
    },
  },
  'tokyo-museum': {
    source: 'https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en',
    reviewedAt: '2026-10-24',
    minutes: 150,
    access: {
      en: 'About 10 minutes on foot from JR Ueno or Uguisudani. Enter through the Main Gate.',
      ja: 'JR上野駅・鶯谷駅から徒歩約10分。正門から入館。',
      th: 'เดินประมาณ 10 นาทีจาก JR Ueno หรือ Uguisudani เข้าทางประตูหลัก',
    },
    hours: {
      en: 'Usually 09:30–17:00; some evenings run later. Monday closures have holiday exceptions. Check the calendar.',
      ja: '通常9:30〜17:00。延長開館日あり。月曜休館は祝日の例外があるためカレンダーを確認。',
      th: 'ปกติ 09:30–17:00 น. บางวันเปิดเย็น ปิดวันจันทร์โดยมีข้อยกเว้นวันหยุด โปรดตรวจปฏิทิน',
    },
    admission: {
      en: 'Collection admission: adults ¥1,000 at review. Special exhibitions use separate pricing.',
      ja: '確認時の総合文化展は一般1,000円。特別展は別料金。',
      th: 'ราคาที่ตรวจ: นิทรรศการประจำผู้ใหญ่ 1,000 เยน นิทรรศการพิเศษคิดต่างหาก',
    },
  },
  'kyoto-museum': {
    source: 'https://www.kyohaku.go.jp/eng/visit/access/',
    infoSource: 'https://www.kyohaku.go.jp/eng/visit/info/',
    reviewedAt: '2026-10-24',
    minutes: 120,
    access: {
      en: 'Walk east along Shichijo Street for about seven minutes from Keihan Shichijo Station.',
      ja: '京阪七条駅から七条通を東へ徒歩約7分。',
      th: 'จากสถานีเคฮัง Shichijo เดินไปทางตะวันออกตามถนน Shichijo ประมาณ 7 นาที',
    },
    hours: {
      en: 'Consult the exhibition calendar: gallery openings and garden-only days differ.',
      ja: '展示カレンダーを確認。展示室の開館日と庭園のみの開館日は異なります。',
      th: 'ตรวจปฏิทินนิทรรศการ บางวันเปิดเฉพาะสวนและไม่ได้เปิดห้องจัดแสดง',
    },
    admission: {
      en: 'Prices vary by exhibition. Check Hours and Admission on the museum website.',
      ja: '展示により料金が異なります。公式の開館時間・観覧料を確認。',
      th: 'ราคาต่างกันตามนิทรรศการ โปรดตรวจหน้าเวลาเปิดและค่าเข้าบนเว็บไซต์พิพิธภัณฑ์',
    },
  },
}
export function visitFor(place: Place) {
  return visitDetails[canonicalPlaceId(place.id)]
}
export function placeCategory(
  place: Place,
): 'museum' | 'nature' | 'culture' | 'city' {
  const name = place.names.en.toLowerCase()
  if (/museum|aquarium|art center/.test(name)) return 'museum'
  if (
    /temple|shrine|castle|dera|sensoji|chusonji|todai|memorial|dazaifu|itsukushima/.test(
      name,
    )
  )
    return 'culture'
  if (
    /park|garden|lake|gorge|beach|coast|dune|mount|valley|waterfall/.test(name)
  )
    return 'nature'
  return 'city'
}
