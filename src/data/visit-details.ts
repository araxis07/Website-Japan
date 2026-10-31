import accessRecords from './visit-access.json'
import type { Locale } from '@/i18n/config'
import { canonicalPlaceId, type Place } from './places'
type Text = Record<Locale, string>
export const visitFields = [
  'access',
  'entrance',
  'hours',
  'admission',
  'booking',
  'accessibility',
] as const
export type VisitField = (typeof visitFields)[number]
export type VisitSource = {
  source: string
  reviewedAt: string
  // Inclusive Japan calendar date; this does not describe continuous opening.
  validThrough?: string
}
export type Visit = {
  source: string
  infoSource?: string
  reviewedAt: string
  access?: Text
  hours?: Text
  admission?: Text
  accessibility?: Text
  entrance?: Text
  booking?: Text
  fieldSources?: Partial<Record<VisitField, VisitSource>>
  minutes?: number
  notApplicable?: Partial<
    Record<VisitField, VisitSource & { reason: Text }>
  >
}
export const visitDetails: Record<string, Visit> = {
  ...accessRecords,
  gion: {
    ...accessRecords.gion,
    accessibility: {
      en: 'Keihan Gion-Shijo Station’s map shows an elevator at Exit 7. Check street routes and individual Gion buildings separately; this does not verify access across the district.',
      ja: '京阪祇園四条駅の構内図では7番出口にエレベーターが示されています。公道の経路や各建物の利用条件は別途確認してください。祇園全域の移動を確認した情報ではありません。',
      th: 'แผนผังสถานี Keihan Gion-Shijo ระบุลิฟต์ที่ทางออก 7 ตรวจเส้นทางถนนและอาคารแต่ละแห่งในกิออนแยกต่างหาก ข้อมูลนี้ไม่ได้ยืนยันการเข้าถึงทั่วทั้งย่าน',
    },
    fieldSources: {
      ...accessRecords.gion.fieldSources,
      accessibility: {
        source:
          'https://www.keihan.co.jp/traffic/station/assets/pdf/info/station-162.pdf',
        reviewedAt: '2026-10-30',
      },
    },
    notApplicable: {
      hours: {
        reason: {
          en: 'Gion is a district, not a single ticketed venue. Each business, temple and private lane has its own access, hours and reservation rules.',
          ja: '祇園は地域名で、単一の有料施設ではありません。店舗・寺院・私道ごとに利用条件・営業時間・予約規則を確認。',
          th: 'กิออนเป็นย่าน ไม่ใช่สถานที่ซื้อตั๋วแห่งเดียว ตรวจเงื่อนไขเข้า เวลา และการจองของร้าน วัด และซอยส่วนบุคคลแต่ละแห่ง',
        },
        source: 'https://www.japan.travel/en/spot/84/',
        reviewedAt: '2026-10-26',
      },
      admission: {
        reason: {
          en: 'Gion is a district, not a single ticketed venue. Each business, temple and private lane has its own access, hours and reservation rules.',
          ja: '祇園は地域名で、単一の有料施設ではありません。店舗・寺院・私道ごとに利用条件・営業時間・予約規則を確認。',
          th: 'กิออนเป็นย่าน ไม่ใช่สถานที่ซื้อตั๋วแห่งเดียว ตรวจเงื่อนไขเข้า เวลา และการจองของร้าน วัด และซอยส่วนบุคคลแต่ละแห่ง',
        },
        source: 'https://www.japan.travel/en/spot/84/',
        reviewedAt: '2026-10-26',
      },
      booking: {
        reason: {
          en: 'Gion is a district, not a single ticketed venue. Each business, temple and private lane has its own access, hours and reservation rules.',
          ja: '祇園は地域名で、単一の有料施設ではありません。店舗・寺院・私道ごとに利用条件・営業時間・予約規則を確認。',
          th: 'กิออนเป็นย่าน ไม่ใช่สถานที่ซื้อตั๋วแห่งเดียว ตรวจเงื่อนไขเข้า เวลา และการจองของร้าน วัด และซอยส่วนบุคคลแต่ละแห่ง',
        },
        source: 'https://www.japan.travel/en/spot/84/',
        reviewedAt: '2026-10-26',
      },
    },
  },
  sensoji: {
    source: 'https://www.senso-ji.jp/access/',
    reviewedAt: '2026-10-25',
    minutes: 90,
    access: {
      en: 'About five minutes from Asakusa stations; the Toei Asakusa Line guide specifies exit A4.',
      ja: '浅草駅から徒歩約5分。都営浅草線はA4出口の案内。',
      th: 'เดินประมาณ 5 นาทีจากสถานี Asakusa สาย Toei Asakusa ระบุทางออก A4',
    },
    entrance: {
      en: 'Kaminarimon is the main gate; the approach continues from there to the main hall.',
      ja: '雷門は総門で、そこから本堂まで参道が続きます。',
      th: 'Kaminarimon เป็นประตูหลัก และมีทางเดินไปจนถึงวิหารหลัก',
    },
    accessibility: {
      en: 'A lift is on the left when facing the main hall. Multipurpose toilets are to the right of Hozomon and behind the main hall. Check the route from the station separately.',
      ja: '本堂に向かって左側にエレベーターがあります。多目的トイレは宝蔵門の右側と本堂裏にあります。駅からの経路は別途確認してください。',
      th: 'มีลิฟต์ทางซ้ายเมื่อหันหน้าเข้าวิหารหลัก ห้องน้ำอเนกประสงค์อยู่ด้านขวาของประตู Hozomon และด้านหลังวิหารหลัก โปรดตรวจเส้นทางจากสถานีแยกต่างหาก',
    },
    fieldSources: {
      entrance: {
        source: 'https://www.senso-ji.jp/faq/',
        reviewedAt: '2026-10-30',
      },
      accessibility: {
        source: 'https://www.senso-ji.jp/faq/',
        reviewedAt: '2026-10-30',
      },
    },
    hours: {
      en: 'Main hall: 06:00–17:00; opens 06:30 October–March. Other halls may differ.',
      ja: '本堂6:00〜17:00。10〜3月は6:30開堂。他のお堂は別途確認。',
      th: 'วิหารหลัก 06:00–17:00 น. ต.ค.–มี.ค. เปิด 06:30 น. อาคารอื่นอาจต่างกัน',
    },
  },
  'pref:kyoto:fushimi-inari-taisha': {
    source: 'https://inari.jp/en/access/',
    reviewedAt: '2026-10-25',
    minutes: 90,
    access: {
      en: 'Beside JR Inari Station, or a five-minute walk east from Keihan Fushimi-inari.',
      ja: 'JR稲荷駅すぐ。京阪伏見稲荷駅から東へ徒歩約5分。',
      th: 'ติดสถานี JR Inari หรือเดินไปทางตะวันออกประมาณ 5 นาทีจาก Keihan Fushimi-inari',
    },
    entrance: {
      en: 'Use the Romon (main gate) on the official map as a landmark for the lower shrine grounds. The path beyond Senbon Torii continues towards Inariyama; station directions do not take you to the summit.',
      ja: 'ふもとの境内へ向かう際は、公式境内図の楼門を目印にしてください。千本鳥居の先には稲荷山へ続く山道があります。駅からの案内は山頂までの案内ではありません。',
      th: 'ใช้ประตู Romon (ประตูหลัก) บนแผนที่ทางการเป็นจุดสังเกตสำหรับบริเวณศาลเจ้าด้านล่าง ทางเลย Senbon Torii จะต่อไปยังภูเขา Inariyama เส้นทางจากสถานีไม่ได้พาไปถึงยอดเขา',
    },
    fieldSources: {
      entrance: {
        source: 'https://inari.jp/en/map/',
        reviewedAt: '2026-10-30',
      },
    },
  },
  'beer-museum': {
    source: 'https://www.sapporobeer.jp/english/brewery/s_museum/',
    reviewedAt: '2026-10-25',
    access: {
      en: 'About ten minutes on foot from exit 4 of Higashi-Kuyakusho-Mae on the Toho subway. This is the Sapporo museum, not the brewery in Eniwa.',
      ja: '地下鉄東豊線東区役所前駅4番出口から徒歩約10分。恵庭の工場とは別施設です。',
      th: 'เดินประมาณ 10 นาทีจากทางออก 4 ของ Higashi-Kuyakusho-Mae สาย Toho ที่นี่คือพิพิธภัณฑ์ในซัปโปโร ไม่ใช่โรงงานใน Eniwa',
    },
    minutes: 60,
    hours: {
      en: 'Self-guided exhibition: 11:00–18:00, last entry 17:30. Check the current operating calendar.',
      ja: '自由見学11:00〜18:00、最終入館17:30。営業カレンダーも確認。',
      th: 'ชมนิทรรศการด้วยตนเอง 11:00–18:00 น. เข้าสุดท้าย 17:30 น. ตรวจปฏิทินเปิดบริการด้วย',
    },
    admission: {
      en: 'Current self-guided adult ticket: ¥1,000. Older free-tour leaflets are outdated. Tastings cost extra.',
      ja: '現在の自由見学は大人1,000円。旧「無料見学」の資料とは異なります。試飲は別料金。',
      th: 'ราคาชมเองปัจจุบัน ผู้ใหญ่ 1,000 เยน ใบปลิวเก่าที่บอกเข้าฟรีล้าสมัยแล้ว ชิมเครื่องดื่มคิดเพิ่ม',
    },
    booking: {
      en: 'Self-guided visits do not require a reservation; premium tours use separate booking.',
      ja: '自由見学は予約不要。プレミアムツアーは別途予約。',
      th: 'ชมเองไม่ต้องจอง ส่วนทัวร์พรีเมียมมีระบบจองแยก',
    },
    fieldSources: {
      access: {
        source: 'https://www.sapporobeer.jp/english/brewery/s_museum/',
        reviewedAt: '2026-10-25',
      },
    },
  },
  'pref:hyogo:himeji-castle': {
    source: 'https://www.himejicastle.jp/en/',
    reviewedAt: '2026-10-25',
    minutes: 150,
    access: {
      en: 'Walk about 20 minutes from JR or Sanyo Himeji. Buses leave the station north exit for Otemon-mae.',
      ja: 'JR・山陽姫路駅から徒歩約20分。駅北口から大手門前へバスもあります。',
      th: 'เดินประมาณ 20 นาทีจาก JR หรือ Sanyo Himeji มีรถบัสจากทางออกเหนือไป Otemon-mae',
    },
    hours: {
      en: '09:00–17:00, entry until 16:00. Scheduled closure December 29–30; check weather-related route changes.',
      ja: '9:00〜17:00、入城16:00まで。12月29・30日休城予定。天候による経路変更を確認。',
      th: '09:00–17:00 น. เข้าถึง 16:00 น. กำหนดปิด 29–30 ธ.ค. ตรวจการเปลี่ยนเส้นทางจากสภาพอากาศ',
    },
    admission: {
      en: 'Visitors aged 18+: ¥2,500; castle + Kokoen ¥2,600. Under 18 free, including through the first March 31 after turning 18. Himeji residents have separate rates.',
      ja: '18歳以上2,500円、好古園共通券2,600円。18歳未満（18歳到達後最初の3月31日までを含む）は無料。姫路市民は別料金。',
      th: 'ผู้มาเยือนอายุ 18 ปีขึ้นไป 2,500 เยน รวมสวน Kokoen 2,600 เยน อายุต่ำกว่า 18 ปีฟรี รวมถึงวันที่ 31 มี.ค. ครั้งแรกหลังอายุครบ 18 ปี ชาวเมืองฮิเมจิใช้อัตราแยก',
    },
    accessibility: {
      en: 'Steep stairs and slopes; no lifts in the keep. Wheelchairs cannot enter the keep buildings.',
      ja: '急な階段・坂があり、天守にエレベーターはありません。天守などの建物内は車いす不可。',
      th: 'มีบันไดและทางลาดชัน หอปราสาทไม่มีลิฟต์และรถเข็นเข้าอาคารหอปราสาทไม่ได้',
    },
    fieldSources: {
      admission: {
        source: 'https://www.himejicastle.jp/en/',
        reviewedAt: '2026-10-27',
      },
    },
  },
  'pref:nara:todaiji-temple': {
    source: 'https://www.todaiji.or.jp/en/information/haikan/',
    reviewedAt: '2026-10-25',
    minutes: 120,
    hours: {
      en: 'Great Buddha Hall: April–October 07:30–17:30; November–March 08:00–17:00. Other halls differ.',
      ja: '大仏殿は4〜10月7:30〜17:30、11〜3月8:00〜17:00。他のお堂は別時間。',
      th: 'วิหารพระใหญ่ เม.ย.–ต.ค. 07:30–17:30 น. พ.ย.–มี.ค. 08:00–17:00 น. อาคารอื่นเวลาต่างกัน',
    },
    admission: {
      en: 'Great Buddha Hall adult admission: ¥800; joint museum ticket ¥1,200.',
      ja: '大仏殿の大人拝観料800円。ミュージアムとの共通券1,200円。',
      th: 'วิหารพระใหญ่ ผู้ใหญ่ 800 เยน ตั๋วรวมพิพิธภัณฑ์ 1,200 เยน',
    },
    access: {
      en: 'About 20 minutes on foot from Kintetsu Nara. The temple also publishes bus stop guidance.',
      ja: '近鉄奈良駅から徒歩約20分。公式サイトにバス停の案内もあります。',
      th: 'เดินประมาณ 20 นาทีจาก Kintetsu Nara เว็บไซต์วัดมีข้อมูลป้ายรถบัสด้วย',
    },
    fieldSources: {
      access: {
        source: 'https://www.todaiji.or.jp/en/access/',
        reviewedAt: '2026-10-25',
      },
    },
  },
  'pref:aomori:nebuta-museum-wa-rasse': {
    source: 'https://www.nebuta.jp/warasse/foreign/english.html',
    reviewedAt: '2026-10-25',
    minutes: 90,
    access: {
      en: 'About one minute on foot from Aomori Station.',
      ja: '青森駅から徒歩約1分。',
      th: 'เดินประมาณ 1 นาทีจากสถานี Aomori',
    },
    hours: {
      en: 'May–August 09:00–19:00; September–April 09:00–18:00. Closed August 9–10 and December 31–January 1.',
      ja: '5〜8月9:00〜19:00、9〜4月9:00〜18:00。8月9・10日、12月31日・1月1日休館。',
      th: 'พ.ค.–ส.ค. 09:00–19:00 น. ก.ย.–เม.ย. 09:00–18:00 น. ปิด 9–10 ส.ค. และ 31 ธ.ค.–1 ม.ค.',
    },
    admission: {
      en: 'Adult admission: ¥620 at review.',
      ja: '確認時の大人入館料620円。',
      th: 'ราคาที่ตรวจ ผู้ใหญ่ 620 เยน',
    },
    booking: {
      en: 'Buy admission at the ticket machine on the day; the museum does not offer advance tickets.',
      ja: '前売券はなく、当日券売機で購入。',
      th: 'ซื้อตั๋วจากเครื่องในวันเข้าชม ไม่มีตั๋วล่วงหน้า',
    },
  },
  'pref:ishikawa:kenrokuen': {
    source: 'https://shiro-niwa.pref.ishikawa.lg.jp/kenrokuen-garden/info.html',
    reviewedAt: '2026-10-25',
    access: {
      en: 'From Kanazawa Station, use the Kenrokuen-shita bus stop for Katsurazaka Gate, or Hirosaka for Mayumizaka Gate. Choose your entrance before boarding.',
      ja: '金沢駅から桂坂口へは兼六園下、真弓坂口へは広坂でバスを下車。利用する門を決めて乗車。',
      th: 'จากสถานี Kanazawa ลงบัส Kenrokuen-shita เพื่อเข้าประตู Katsurazaka หรือ Hirosaka เพื่อเข้าประตู Mayumizaka เลือกประตูก่อนขึ้นรถ',
    },
    minutes: 90,
    hours: {
      en: 'March 1–October 15: 07:00–18:00; October 16–February: 08:00–17:00. Last entry 30 minutes before closing.',
      ja: '3月1日〜10月15日7:00〜18:00、10月16日〜2月末8:00〜17:00。入園は閉園30分前まで。',
      th: '1 มี.ค.–15 ต.ค. 07:00–18:00 น. 16 ต.ค.–สิ้น ก.พ. 08:00–17:00 น. เข้าสุดท้ายก่อนปิด 30 นาที',
    },
    admission: {
      en: 'Ages 18+: ¥320; ages 6–17: ¥100. Visitors aged 65+ can request free entry with proof of age; bring a passport.',
      ja: '18歳以上320円、6〜17歳100円。65歳以上は年齢確認で無料。旅行者はパスポートを持参。',
      th: 'อายุ 18 ปีขึ้นไป 320 เยน อายุ 6–17 ปี 100 เยน อายุ 65 ปีขึ้นไปขอเข้าฟรีโดยแสดงหลักฐานอายุ เช่น พาสปอร์ต',
    },
    accessibility: {
      en: 'Wheelchairs are available at listed gates. The garden has slopes and gravel; use the official recommended accessible route.',
      ja: '各料金所に貸出車いすあり。坂道・砂利道があるため公式の推奨コースを確認。',
      th: 'มีรถเข็นให้ยืมตามประตูที่ระบุ สวนมีทางลาดและกรวด ตรวจเส้นทางที่เว็บไซต์แนะนำ',
    },
    fieldSources: {
      access: {
        source: 'https://shiro-niwa.pref.ishikawa.lg.jp/access.html',
        reviewedAt: '2026-10-25',
      },
      admission: {
        source:
          'https://shiro-niwa.pref.ishikawa.lg.jp/kenrokuen-garden/e/info.html',
        reviewedAt: '2026-10-27',
      },
      entrance: {
        source:
          'https://shiro-niwa.pref.ishikawa.lg.jp/kenrokuen-garden/e/info.html',
        reviewedAt: '2026-10-27',
      },
    },
    entrance: {
      en: 'Early free entry uses Renchi-mon and Zuishinzaka only. Leave 15 minutes before paid opening hours; daytime gate choices differ.',
      ja: '早朝無料入園は蓮池門・随身坂口のみ。有料開園の15分前までに退園。日中の入口とは異なります。',
      th: 'เข้าฟรีช่วงเช้ามืดได้เฉพาะ Renchi-mon และ Zuishinzaka ต้องออกก่อนเวลาเปิดเก็บค่าเข้า 15 นาที ประตูช่วงกลางวันต่างกัน',
    },
  },
  'pref:nagano:matsumoto-castle': {
    source: 'https://www.matsumoto-castle.jp/eng/info',
    reviewedAt: '2026-10-25',
    access: {
      en: 'Walk about 20 minutes from JR Matsumoto Station. Use the south-side Kuromon entrance; the red bridge is not an entrance.',
      ja: 'JR松本駅から徒歩約20分。南側の黒門から入場。赤い橋は入口ではありません。',
      th: 'เดินประมาณ 20 นาทีจาก JR Matsumoto เข้าประตู Kuromon ด้านใต้ สะพานแดงไม่ใช่ทางเข้า',
    },
    minutes: 90,
    hours: {
      en: 'Usually 08:30–17:00, last entry 16:30. Closed December 29–31; holiday extensions vary.',
      ja: '通常8:30〜17:00、最終入場16:30。12月29〜31日休場。延長日は別途確認。',
      th: 'ปกติ 08:30–17:00 น. เข้าสุดท้าย 16:30 น. ปิด 29–31 ธ.ค. วันขยายเวลาต้องตรวจเพิ่ม',
    },
    admission: {
      en: 'Adults: timed e-ticket ¥1,200 / paper ticket ¥1,300. Ages 6–15: ¥400; ages 5 and under free.',
      ja: '大人：日時指定電子券1,200円／紙券1,300円。6〜15歳400円、5歳以下無料。',
      th: 'ผู้ใหญ่: ตั๋วออนไลน์ระบุเวลา 1,200 เยน / ตั๋วกระดาษ 1,300 เยน อายุ 6–15 ปี 400 เยน อายุไม่เกิน 5 ปีฟรี',
    },
    booking: {
      en: 'Choose a time for online tickets. Read the no-cancellation terms before payment.',
      ja: '電子券は日時を指定。購入前に取消不可の条件を確認。',
      th: 'ตั๋วออนไลน์ต้องเลือกเวลา อ่านเงื่อนไขยกเลิกไม่ได้ก่อนจ่าย',
    },
    entrance: {
      en: 'Use Kuromon Gate on the south side. The red bridge is not an entrance.',
      ja: '入口は南側の黒門。赤い橋からは入れません。',
      th: 'เข้าทางประตู Kuromon ด้านใต้ สะพานแดงไม่ใช่ทางเข้า',
    },
    fieldSources: {
      access: {
        source: 'https://www.matsumoto-castle.jp/access',
        reviewedAt: '2026-10-25',
      },
      entrance: {
        source: 'https://www.matsumoto-castle.jp/eng/faq',
        reviewedAt: '2026-10-25',
      },
      admission: {
        source: 'https://www.matsumoto-castle.jp/eng/info',
        reviewedAt: '2026-10-27',
      },
      accessibility: {
        source: 'https://www.matsumoto-castle.jp/eng/faq',
        reviewedAt: '2026-10-27',
      },
    },
    accessibility: {
      en: 'No wheelchair entry or lift in the keep. Borrow wheelchairs at Kuromon; limited stock, no reservations. Accessible toilets: one inside the paid grounds, two in the park; none in the keep.',
      ja: '天守は車いす入場不可・エレベーターなし。黒門の貸出車いすは台数限定・予約不可。多目的トイレは有料区域1か所、公園2か所。天守内にはありません。',
      th: 'รถเข็นเข้าหอปราสาทไม่ได้และไม่มีลิฟต์ ยืมรถเข็นที่ Kuromon มีจำกัดและจองไม่ได้ ห้องน้ำผู้พิการ: ในเขตเสียค่าเข้า 1 แห่ง ในสวน 2 แห่ง ไม่มีในหอปราสาท',
    },
  },
  'pref:fukui:fukui-prefectural-dinosaur-museum': {
    source: 'https://www.dinosaur.pref.fukui.jp/en/info.html',
    reviewedAt: '2026-10-25',
    minutes: 180,
    access: {
      en: 'From Fukui, take Echizen Railway to Katsuyama, then a community bus or taxi. Check the last return connection.',
      ja: '福井からえちぜん鉄道で勝山へ。そこからコミュニティバスかタクシー。帰りの接続も確認。',
      th: 'จาก Fukui นั่ง Echizen Railway ไป Katsuyama แล้วต่อรถบัสชุมชนหรือแท็กซี่ ตรวจรถต่อเที่ยวกลับด้วย',
    },
    hours: {
      en: 'Usually 09:00–17:00, last entry 16:30. Closed second/fourth Wednesdays outside summer holidays and over New Year.',
      ja: '通常9:00〜17:00、入館16:30まで。夏休み以外の第2・4水曜と年末年始は休館。',
      th: 'ปกติ 09:00–17:00 น. เข้าถึง 16:30 น. ปิดพุธที่ 2 และ 4 นอกช่วงปิดเทอมฤดูร้อน และช่วงปีใหม่',
    },
    admission: {
      en: 'Regular adult admission ¥1,000. Special exhibitions and the Field Station may cost extra.',
      ja: '一般大人1,000円。特別展・野外恐竜博物館は別料金の場合あり。',
      th: 'ตั๋วปกติผู้ใหญ่ 1,000 เยน นิทรรศการพิเศษและ Field Station อาจคิดเพิ่ม',
    },
  },
  'pref:nagasaki:dejima': {
    source: 'https://nagasakidejima.jp/about/',
    reviewedAt: '2026-10-25',
    access: {
      en: 'From Nagasaki Station, take a tram toward Sofukuji and get off at Dejima. Check the operator’s entrance map and each gate’s closing time.',
      ja: '長崎駅前から崇福寺行きの路面電車で出島へ。公式の入口案内と各入口の終了時刻を確認。',
      th: 'จากสถานี Nagasaki นั่งรถรางไปทาง Sofukuji ลง Dejima ตรวจแผนที่ทางเข้าและเวลาปิดแต่ละประตูจากเว็บไซต์สถานที่',
    },
    minutes: 120,
    hours: {
      en: '08:00–21:00; last entry 20:40. Open year-round, with possible maintenance closures inside.',
      ja: '8:00〜21:00、最終入場20:40。年中無休ですが施設の整備休止あり。',
      th: '08:00–21:00 น. เข้าสุดท้าย 20:40 น. เปิดตลอดปี แต่บางส่วนอาจปิดซ่อม',
    },
    admission: {
      en: 'Adult ¥1,100; school-age visitors ¥550. Re-entry is not permitted.',
      ja: '大人1,100円、小中高生550円。再入場不可。',
      th: 'ผู้ใหญ่ 1,100 เยน นักเรียน 550 เยน ออกแล้วกลับเข้าใหม่ไม่ได้',
    },
    entrance: {
      en: 'Omotemon bridge entry until 20:40; the Suimon entrance closes at 18:00.',
      ja: '表門橋は最終入場20:40、水門は18:00まで。',
      th: 'ทางสะพาน Omotemon เข้าสุดท้าย 20:40 น. ทาง Suimon ปิด 18:00 น.',
    },
    fieldSources: {
      access: {
        source: 'https://nagasakidejima.jp/about/',
        reviewedAt: '2026-10-25',
      },
    },
  },
  'pref:aichi:nagoya-castle': {
    source: 'https://db.nagoya-info.jp/en/spot/detail/1/',
    reviewedAt: '2026-10-25',
    minutes: 120,
    access: {
      en: 'About five minutes from Nagoyajo Station, Meijo Line, exit 7.',
      ja: '名城線名古屋城駅7番出口から徒歩約5分。',
      th: 'เดินประมาณ 5 นาทีจากสถานี Nagoyajo สาย Meijo ทางออก 7',
    },
    hours: {
      en: 'Usually 09:00–16:30; entry until 16:00. Closed December 29–January 1. The main keep is closed to visitors.',
      ja: '通常9:00〜16:30、入場16:00まで。12月29日〜1月1日休園。天守閣は入場不可。',
      th: 'ปกติ 09:00–16:30 น. เข้าถึง 16:00 น. ปิด 29 ธ.ค.–1 ม.ค. หอปราสาทหลักปิดไม่ให้เข้าชม',
    },
    admission: {
      en: 'Adult admission ¥1,000 from October 1, 2026. Check event exceptions.',
      ja: '2026年10月1日以降、大人1,000円。行事の例外は確認。',
      th: 'ตั้งแต่ 1 ต.ค. 2026 ผู้ใหญ่ 1,000 เยน ตรวจข้อยกเว้นช่วงกิจกรรม',
    },
  },
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
    accessibility: {
      en: 'Accessible toilets on every floor and loan wheelchairs. Strollers may be restricted when galleries are crowded; a nursing room is on the first floor.',
      ja: '各階に多目的トイレ、車いす貸出あり。混雑時はベビーカー利用制限あり。授乳室は1階。',
      th: 'มีห้องน้ำรถเข็นทุกชั้นและรถเข็นให้ยืม ช่วงคนแน่นอาจจำกัดรถเข็นเด็ก มีห้องให้นมชั้นหนึ่ง',
    },
    booking: {
      en: 'For group visits, the museum asks visitors to submit a group application by mail or fax. Check the separate arrangements for special exhibitions.',
      ja: '団体見学は申込書を郵送またはFAXで提出するよう博物館が案内しています。特別展の取扱いは別途確認してください。',
      th: 'พิพิธภัณฑ์ขอให้ผู้เข้าชมเป็นกลุ่มส่งแบบฟอร์มทางไปรษณีย์หรือแฟกซ์ โปรดตรวจเงื่อนไขนิทรรศการพิเศษแยกต่างหาก',
    },
    fieldSources: {
      booking: {
        source: 'https://www.osakamushis.jp/eng/about/faq.html',
        reviewedAt: '2026-10-30',
      },
      accessibility: {
        source: 'https://www.osakamushis.jp/eng/about/faq.html',
        reviewedAt: '2026-10-26',
      },
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
      en: 'Use the intercom before using the wheelchair lift. Loan wheelchairs/strollers at first-floor reception; accessible toilets on floors 1 and 2.',
      ja: '車いす用リフトはインターホンで連絡。1階受付で車いす・ベビーカー貸出。多目的トイレは1・2階。',
      th: 'ใช้อินเตอร์คอมก่อนใช้ลิฟต์รถเข็น ยืมรถเข็นหรือรถเข็นเด็กที่เคาน์เตอร์ชั้นหนึ่ง มีห้องน้ำรถเข็นชั้น 1 และ 2',
    },
    booking: {
      en: 'Advance reservation is not required for a regular visit.',
      ja: '通常の見学は事前予約不要。',
      th: 'การเข้าชมปกติไม่ต้องจองล่วงหน้า',
    },
    fieldSources: {
      booking: {
        source: 'https://www.museum.hokudai.ac.jp/english/visit/',
        reviewedAt: '2026-10-26',
      },
      accessibility: {
        source: 'https://www.museum.hokudai.ac.jp/english/visit/',
        reviewedAt: '2026-10-26',
      },
    },
  },
  'fuji-center': {
    source: 'https://www.fujisan-whc.jp/en/guide/index.html',
    reviewedAt: '2026-10-24',
    access: {
      en: 'From Kawaguchiko Station, the operator lists a sightseeing bus to Prefectural Fuji Visitor Center Entrance (about five minutes). Confirm the current stop name and departures with Fujikyu Bus.',
      ja: '河口湖駅から周遊バスで県立富士ビジターセンター入口へ約5分の案内。現在の停留所名と発車時刻は富士急バスで確認。',
      th: 'จากสถานี Kawaguchiko เว็บไซต์ศูนย์ระบุบัสเที่ยวชมไป Prefectural Fuji Visitor Center Entrance ประมาณ 5 นาที ตรวจชื่อป้ายและเวลาเดินรถล่าสุดกับ Fujikyu Bus',
    },
    minutes: 90,
    hours: {
      en: 'Usually 09:00–17:00; July–August 08:30–18:00 and December–February 09:00–16:30. Last admission is 30 minutes before closing; check closure notices.',
      ja: '通常9:00〜17:00。7〜8月は8:30〜18:00、12〜2月は9:00〜16:30。入館は閉館30分前まで。休館案内も確認。',
      th: 'ปกติ 09:00–17:00 น. ก.ค.–ส.ค. 08:30–18:00 น. และ ธ.ค.–ก.พ. 09:00–16:30 น. เข้าชมได้ก่อนปิด 30 นาที โปรดตรวจประกาศวันปิดด้วย',
    },
    fieldSources: {
      access: {
        source: 'https://www.fujisan-whc.jp/en/access/index.html',
        reviewedAt: '2026-10-25',
      },
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
    admission: {
      en: 'No group discount. The temple lists free entry for a disability-handbook holder and one companion on presenting the original. Confirm accepted documents and the regular admission price with the temple.',
      ja: '団体割引はありません。障がい者手帳・療育手帳の原本提示で本人と付添1名は無料。通常の拝観料と手帳の適用条件は寺院に確認してください。',
      th: 'ไม่มีส่วนลดหมู่คณะ วัดระบุว่ายกเว้นค่าเข้าให้ผู้แสดงสมุดประจำตัวผู้พิการฉบับจริงและผู้ติดตาม 1 คน สอบถามวัดเรื่องเอกสารที่รับและค่าเข้าปกติ',
    },
    booking: {
      en: 'No reservation is needed for the 2026 special night viewings. For ordinary visits and other events, confirm the current requirements with the temple.',
      ja: '2026年の夜間特別拝観は予約不要です。通常拝観やその他の行事の条件は寺院に確認してください。',
      th: 'การเข้าชมกลางคืนพิเศษปี 2026 ไม่ต้องจอง สำหรับการเข้าชมปกติและกิจกรรมอื่น โปรดตรวจเงื่อนไขปัจจุบันกับวัด',
    },
    accessibility: {
      en: 'Follow the temple’s wheelchair route; accessible toilets are provided. Wheelchairs cannot be borrowed at the temple.',
      ja: '寺院の車いす用経路図に従ってください。多目的トイレあり。車いすの貸出はありません。',
      th: 'ใช้แผนที่เส้นทางรถเข็นของวัด มีห้องน้ำรองรับรถเข็น แต่ไม่มีรถเข็นให้ยืม',
    },
    entrance: {
      en: 'For a step-free approach, consult the route via the emergency entrance at the top of Chawan-zaka. The Main Hall route map is available at Todoroki-mon.',
      ja: '段差を避ける場合は茶わん坂上の緊急車両用入口を通る経路を確認。本堂入口の轟門で経路図を入手。',
      th: 'หากต้องการเลี่ยงบันได ตรวจเส้นทางผ่านทางเข้ารถฉุกเฉินด้านบน Chawan-zaka รับแผนที่ทางสู่วิหารหลักที่ Todoroki-mon',
    },
    fieldSources: {
      admission: {
        source: 'https://www.kiyomizudera.or.jp/faq/',
        reviewedAt: '2026-10-30',
      },
      booking: {
        source: 'https://www.kiyomizudera.or.jp/event/yakan.php',
        reviewedAt: '2026-10-30',
        validThrough: '2026-11-30',
      },
      entrance: {
        source: 'https://www.kiyomizudera.or.jp/en/faq/',
        reviewedAt: '2026-10-26',
      },
      accessibility: {
        source: 'https://www.kiyomizudera.or.jp/en/faq/',
        reviewedAt: '2026-10-26',
      },
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
      en: '09:30–17:00; extended evenings on the official calendar. Last entry 30 minutes before closing. Mondays normally closed; holiday exceptions apply.',
      ja: '9:30〜17:00。延長開館は公式カレンダーを確認。入館は閉館30分前まで。原則月曜休館、祝日は例外あり。',
      th: '09:30–17:00 น. วันเปิดค่ำให้ดูปฏิทินทางการ เข้าก่อนปิด 30 นาที ปกติปิดจันทร์โดยมีข้อยกเว้นวันหยุด',
    },
    admission: {
      en: 'Collection: adults ¥1,000, university students ¥500. Special exhibitions are priced separately; check ID and concession rules.',
      ja: '総合文化展：一般1,000円、大学生500円。特別展は別料金。学生証・減免条件を確認。',
      th: 'นิทรรศการประจำ: ผู้ใหญ่ 1,000 เยน นักศึกษามหาวิทยาลัย 500 เยน นิทรรศการพิเศษต่างราคา ตรวจหลักฐานและเงื่อนไขส่วนลด',
    },
    booking: {
      en: 'Collection tickets are available online, valid for two months during opening hours. Check special-exhibition ticket conditions separately.',
      ja: '総合文化展のオンライン券は購入から2か月間、開館時間内に有効。特別展の条件は別途確認。',
      th: 'ตั๋วนิทรรศการประจำซื้อออนไลน์ได้ ใช้ภายในสองเดือนในเวลาเปิด ตรวจเงื่อนไขนิทรรศการพิเศษแยกต่างหาก',
    },
    entrance: {
      en: 'Use the Main Gate; consult the museum’s entrance access map.',
      ja: '正門を利用。公式の入口周辺バリアフリー図を確認。',
      th: 'ใช้ประตูหลัก Main Gate และตรวจแผนที่ทางเข้าของพิพิธภัณฑ์',
    },
    accessibility: {
      en: 'Accessible toilets in exhibition buildings except Hyokeikan. Some entrances have steep ramps; ask staff for assistance. Wheelchair loans are available.',
      ja: '表慶館以外の展示館に多目的トイレ。一部入口は急勾配のため職員に相談。車いす貸出あり。',
      th: 'อาคารจัดแสดงมีห้องน้ำรถเข็นยกเว้น Hyokeikan บางทางเข้ามีทางลาดชัน ขอความช่วยเหลือเจ้าหน้าที่ได้ มีรถเข็นให้ยืม',
    },
    fieldSources: {
      hours: {
        source:
          'https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en',
        reviewedAt: '2026-10-26',
      },
      admission: {
        source:
          'https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en',
        reviewedAt: '2026-10-26',
      },
      booking: {
        source:
          'https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en',
        reviewedAt: '2026-10-26',
      },
      entrance: {
        source: 'https://www.tnm.jp/modules/r_free_page/index.php?id=128',
        reviewedAt: '2026-10-26',
      },
      accessibility: {
        source: 'https://www.tnm.jp/modules/r_free_page/index.php?id=128',
        reviewedAt: '2026-10-26',
      },
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
      en: 'Collection days: 09:30–17:00, Fridays until 20:00; last entry 30 minutes earlier. Special-exhibition and garden-only dates differ; check the calendar.',
      ja: '名品ギャラリー開館日は9:30〜17:00、金曜20:00まで。入館は30分前まで。特別展・庭園のみの日は別途確認。',
      th: 'วันที่เปิดนิทรรศการประจำ 09:30–17:00 น. ศุกร์ถึง 20:00 น. เข้าก่อนปิด 30 นาที นิทรรศการพิเศษและวันเปิดเฉพาะสวนต่างกัน',
    },
    admission: {
      en: 'Collection days: adults ¥700 / university ¥350; garden-only ¥300 / ¥150. Special exhibitions differ. Check the date and student-ID rules.',
      ja: '名品ギャラリー：一般700円・大学生350円。庭園のみ300円・150円。特別展は別料金。日程と学生証条件を確認。',
      th: 'นิทรรศการประจำผู้ใหญ่ 700/นักศึกษามหาวิทยาลัย 350 เยน เฉพาะสวน 300/150 เยน นิทรรศการพิเศษต่างราคา ตรวจวันและบัตรนักศึกษา',
    },
    booking: {
      en: 'The Tale of Genji special exhibition (October 6–November 29, 2026) does not require advance ticket reservations. Check the museum’s requirements for other exhibitions.',
      ja: '特別展「源氏物語 王朝のかがやき」（2026年10月6日〜11月29日）はチケットの事前予約不要。その他の展覧会の条件は博物館に確認してください。',
      th: 'นิทรรศการพิเศษ The Tale of Genji (6 ต.ค.–29 พ.ย. 2026) ไม่ต้องจองตั๋วล่วงหน้า ตรวจเงื่อนไขของนิทรรศการอื่นกับพิพิธภัณฑ์',
    },
    entrance: {
      en: 'Enter at the South Gate, which has a wheelchair ramp.',
      ja: '車いす用スロープのある南門から入館。',
      th: 'เข้าที่ South Gate ซึ่งมีทางลาดรถเข็น',
    },
    accessibility: {
      en: 'Accessible toilets on every floor, in the garden and South Gate area. Limited loan wheelchairs; ask staff. Strollers may be restricted in crowded galleries.',
      ja: '各階・庭園・南門に多目的トイレ。貸出車いすは台数制限あり、職員に相談。混雑時は展示室のベビーカー利用制限あり。',
      th: 'มีห้องน้ำรถเข็นทุกชั้น ในสวนและบริเวณประตูใต้ รถเข็นให้ยืมมีจำนวนจำกัด ติดต่อเจ้าหน้าที่ ช่วงคนแน่นอาจจำกัดรถเข็นเด็กในห้องจัดแสดง',
    },
    fieldSources: {
      booking: {
        source: 'https://www.kyohaku.go.jp/eng/',
        reviewedAt: '2026-10-30',
        validThrough: '2026-11-29',
      },
      hours: {
        source: 'https://www.kyohaku.go.jp/eng/visit/info/',
        reviewedAt: '2026-10-26',
      },
      admission: {
        source: 'https://www.kyohaku.go.jp/eng/visit/info/',
        reviewedAt: '2026-10-26',
      },
      entrance: {
        source: 'https://www.kyohaku.go.jp/eng/visit/accessibility/',
        reviewedAt: '2026-10-26',
      },
      accessibility: {
        source: 'https://www.kyohaku.go.jp/eng/visit/accessibility/',
        reviewedAt: '2026-10-26',
      },
    },
  },
  'pref:kumamoto:suizenji-jojuen': {
    source:
      'https://www.japan.travel/en/japans-local-treasures/suizenji-jojuen-garden-2020/',
    reviewedAt: '2026-10-25',
    access: {
      en: 'About four minutes on foot from Suizenji Park tram stop, or ten minutes from JR Shin-Suizenji Station.',
      ja: '市電水前寺公園停留場から徒歩約4分、JR新水前寺駅から約10分。',
      th: 'เดินประมาณ 4 นาทีจากป้ายรถราง Suizenji Park หรือประมาณ 10 นาทีจาก JR Shin-Suizenji',
    },
    fieldSources: {
      hours: {
        source: 'https://www.suizenji.or.jp/en/guide/',
        reviewedAt: '2026-10-27',
      },
      admission: {
        source: 'https://www.suizenji.or.jp/en/guide/',
        reviewedAt: '2026-10-27',
      },
      booking: {
        source: 'https://www.suizenji.or.jp/en/guide/',
        reviewedAt: '2026-10-27',
      },
      entrance: {
        source: 'https://www.suizenji.or.jp/en/guide/',
        reviewedAt: '2026-10-27',
      },
      accessibility: {
        source: 'https://www.suizenji.or.jp/en/guide/',
        reviewedAt: '2026-10-27',
      },
    },
    hours: {
      en: 'Daily 08:30–17:00; last entry 16:30. Event hours can differ.',
      ja: '毎日8:30〜17:00、最終入園16:30。催事時は変更あり。',
      th: 'ทุกวัน 08:30–17:00 น. เข้าสุดท้าย 16:30 น. ช่วงงานกิจกรรมอาจเปลี่ยนเวลา',
    },
    admission: {
      en: 'Ages 16+: ¥500; ages 6–15: ¥200. Check separate group and certificate-holder rules.',
      ja: '16歳以上500円、6〜15歳200円。団体・手帳割引は別途条件を確認。',
      th: 'อายุ 16 ปีขึ้นไป 500 เยน อายุ 6–15 ปี 200 เยน ส่วนลดหมู่คณะและผู้ถือบัตรมีเงื่อนไขแยก',
    },
    booking: {
      en: 'Japanese/English guided tours require advance contact and an extra fee.',
      ja: '日本語・英語ガイドは事前連絡が必要で別料金。',
      th: 'ทัวร์มีไกด์ภาษาญี่ปุ่นหรืออังกฤษต้องติดต่อล่วงหน้าและมีค่าใช้จ่ายเพิ่ม',
    },
    entrance: {
      en: 'Use Main or North Gate. East, South and Soseki gates are closed at review.',
      ja: '正門・北門を利用。確認時点で東門・南門・漱石門は閉鎖中。',
      th: 'ใช้ประตูหลักหรือประตูเหนือ ประตูตะวันออก ใต้ และ Soseki ปิดอยู่ ณ วันที่ตรวจสอบ',
    },
    accessibility: {
      en: 'Four loan wheelchairs at the Main Gate ticket office. Ostomate facilities at east toilets; nursing room in the exhibition hall. This does not confirm every path is step-free.',
      ja: '正門券売所に貸出車いす4台。東トイレにオストメイト設備、展示館に授乳室。全経路の段差解消を保証する情報ではありません。',
      th: 'ยืมรถเข็นได้ 4 คันที่เคาน์เตอร์ประตูหลัก ห้องน้ำตะวันออกมีอุปกรณ์รองรับถุงทวารเทียม ห้องให้นมอยู่ในอาคารนิทรรศการ ไม่ได้ยืนยันว่าทุกทางไร้บันได',
    },
  },
  'pref:tochigi:nikko-toshogu': {
    source: 'https://www.japan.travel/en/spot/1482/',
    reviewedAt: '2026-10-25',
    access: {
      en: 'From JR or Tobu Nikko, take the World Heritage sightseeing bus (about 15 minutes). Walking from the station takes about 45 minutes.',
      ja: 'JR・東武日光駅から世界遺産めぐりバス約15分。駅から徒歩では約45分。',
      th: 'จาก JR หรือ Tobu Nikko ใช้บัสชมมรดกโลกประมาณ 15 นาที หากเดินจากสถานีใช้ประมาณ 45 นาที',
    },
    fieldSources: {
      booking: {
        source: 'https://www.visitnikko.jp/en/spots/nikko-toshogu-shrine/',
        reviewedAt: '2026-10-27',
      },
    },
    booking: {
      en: 'The city guide’s linked online vouchers must be exchanged at Tobu-Nikko Station Tourist Center, not the shrine entrance. Check your selected product’s exchange instructions.',
      ja: '市観光案内のオンライン引換券は東武日光駅ツーリストセンターで交換。神社入口では交換不可。購入商品の引換条件を確認。',
      th: 'เวาเชอร์ออนไลน์ที่คู่มือท่องเที่ยวเมืองลิงก์ไว้ต้องแลกที่ Tobu-Nikko Station Tourist Center ไม่ใช่ทางเข้าศาลเจ้า ตรวจเงื่อนไขของตั๋วที่เลือก',
    },
  },
  'pref:fukuoka:dazaifu-tenmangu': {
    source: 'https://www.japan.travel/en/spot/798/',
    reviewedAt: '2026-10-25',
    access: {
      en: 'From Nishitetsu Fukuoka (Tenjin), change at Futsukaichi for Dazaifu. The shrine is about five minutes on foot from Dazaifu Station.',
      ja: '西鉄福岡（天神）から二日市で乗り換え太宰府へ。太宰府駅から徒歩約5分。',
      th: 'จาก Nishitetsu Fukuoka (Tenjin) เปลี่ยนที่ Futsukaichi ไป Dazaifu แล้วเดินจากสถานีประมาณ 5 นาที',
    },
    fieldSources: {
      hours: {
        source: 'https://www.dazaifutenmangu.or.jp/',
        reviewedAt: '2026-10-27',
      },
      admission: {
        source: 'https://www.dazaifutenmangu.or.jp/en/plan/faq/',
        reviewedAt: '2026-10-27',
      },
    },
    hours: {
      en: 'Opens 06:00 from the spring equinox, 06:30 from the autumn equinox. Closes 19:00 Apr–May/Sep–Nov, 19:30 Jun–Aug, 18:30 Dec–Mar. Check temporary changes.',
      ja: '春分の日から6:00、秋分の日から6:30開門。閉門は4〜5月・9〜11月19:00、6〜8月19:30、12〜3月18:30。臨時変更も確認。',
      th: 'เปิด 06:00 น. ตั้งแต่วันวสันตวิษุวัต และ 06:30 น. ตั้งแต่วันศารทวิษุวัต ปิด 19:00 น. เม.ย.–พ.ค./ก.ย.–พ.ย., 19:30 น. มิ.ย.–ส.ค., 18:30 น. ธ.ค.–มี.ค. ตรวจการเปลี่ยนเวลาชั่วคราวด้วย',
    },
    admission: {
      en: 'Ordinary worship and shrine grounds are free. On-site museums and nearby attractions charge separately.',
      ja: '通常参拝・境内は無料。境内の博物館や周辺施設は別途有料。',
      th: 'สักการะตามปกติและเดินในบริเวณศาลเจ้าฟรี พิพิธภัณฑ์ในพื้นที่และสถานที่ใกล้เคียงคิดค่าเข้าแยก',
    },
  },
  'pref:hiroshima:itsukushima-shrine': {
    source:
      'https://www.japan.travel/en/world-heritage/itsukushima-shinto-shrine/',
    reviewedAt: '2026-10-25',
    access: {
      en: 'From Hiroshima take JR to Miyajimaguchi (about 30 minutes), a ferry to Miyajima (about 10 minutes), then walk about 10 minutes to the shrine.',
      ja: '広島からJRで宮島口へ約30分、フェリーで宮島へ約10分、神社まで徒歩約10分。',
      th: 'จาก Hiroshima ใช้ JR ถึง Miyajimaguchi ราว 30 นาที ต่อเรือไป Miyajima ราว 10 นาที แล้วเดินถึงศาลเจ้าอีกประมาณ 10 นาที',
    },
    fieldSources: {
      hours: {
        source: 'https://itsukushimajinja.jp/en/admission.html',
        reviewedAt: '2026-10-27',
      },
      admission: {
        source: 'https://itsukushimajinja.jp/en/admission.html',
        reviewedAt: '2026-10-27',
      },
    },
    hours: {
      en: 'Normally opens 06:30. Closes 18:00 Mar 1–Oct 14, 17:30 Oct 15–Nov and Jan 4–Feb, 17:00 Dec. Jan 1–3 use special hours.',
      ja: '通常6:30開門。閉門は3/1〜10/14が18:00、10/15〜11月・1/4〜2月が17:30、12月17:00。1/1〜3は特別時間。',
      th: 'ปกติเปิด 06:30 น. ปิด 18:00 น. วันที่ 1 มี.ค.–14 ต.ค., 17:30 น. วันที่ 15 ต.ค.–พ.ย. และ 4 ม.ค.–ก.พ., 17:00 น. ใน ธ.ค. วันที่ 1–3 ม.ค. ใช้เวลาพิเศษ',
    },
    admission: {
      en: 'Shrine: adults ¥300; high school ¥200; elementary/junior high ¥100. Treasure Hall and combined tickets differ.',
      ja: '神社：大人300円、高校生200円、小中学生100円。宝物館・共通券は別料金。',
      th: 'ศาลเจ้า: ผู้ใหญ่ 300 เยน มัธยมปลาย 200 เยน ประถมและมัธยมต้น 100 เยน หอสมบัติและตั๋วรวมมีราคาแยก',
    },
  },
}
export function visitFor(place: Place) {
  return visitDetails[canonicalPlaceId(place.id)]
}
export const placeCategory = (place: Place) => place.category

export function visitSource(
  visit: Visit,
  field: keyof NonNullable<Visit['fieldSources']>,
): VisitSource {
  return (
    visit.notApplicable?.[field] ||
    visit.fieldSources?.[field] || {
      source:
        (field === 'hours' || field === 'admission') && visit.infoSource
          ? visit.infoSource
          : visit.source,
      reviewedAt: visit.reviewedAt,
    }
  )
}

export const reviewDays: Record<VisitField, number> = {
  access: 180,
  entrance: 180,
  hours: 30,
  admission: 30,
  booking: 30,
  accessibility: 90,
}

export function fieldReview(
  visit: Visit | undefined,
  field: VisitField,
  today: string,
) {
  if (!visit || (!visit[field] && !visit.notApplicable?.[field]))
    return { status: 'unverified' as const }
  const source = visitSource(visit, field)
  const nextReviewBy = new Date(
    Date.parse(source.reviewedAt) + reviewDays[field] * 86400000,
  )
    .toISOString()
    .slice(0, 10)
  return {
    status:
      source.validThrough && today > source.validThrough
        ? ('expired' as const)
        : today > nextReviewBy
          ? ('overdue' as const)
          : visit.notApplicable?.[field]
            ? ('notApplicable' as const)
            : ('reviewed' as const),
    source: source.source,
    reviewedAt: source.reviewedAt,
    nextReviewBy,
    validThrough: source.validThrough,
  }
}
