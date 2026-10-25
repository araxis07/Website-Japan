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
  entrance?: Text
  booking?: Text
  fieldSources?: Partial<
    Record<
      | 'access'
      | 'hours'
      | 'admission'
      | 'accessibility'
      | 'entrance'
      | 'booking',
      { source: string; reviewedAt: string }
    >
  >
  minutes: number
}
export const visitDetails: Record<string, Visit> = {
  sensoji: {
    source: 'https://www.senso-ji.jp/access/',
    reviewedAt: '2026-10-25',
    minutes: 90,
    access: {
      en: 'About five minutes from Asakusa stations; the Toei Asakusa Line guide specifies exit A4.',
      ja: '浅草駅から徒歩約5分。都営浅草線はA4出口の案内。',
      th: 'เดินประมาณ 5 นาทีจากสถานี Asakusa สาย Toei Asakusa ระบุทางออก A4',
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
  },
  'beer-museum': {
    source: 'https://www.sapporobeer.jp/english/brewery/s_museum/',
    reviewedAt: '2026-10-25',
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
      en: 'Adult visitor admission: ¥2,500; resident and age-based exceptions apply.',
      ja: '一般大人2,500円。市民・年齢による区分あり。',
      th: 'ผู้ใหญ่ทั่วไป 2,500 เยน มีเงื่อนไขแยกตามอายุและผู้มีถิ่นพำนัก',
    },
    accessibility: {
      en: 'Steep stairs and slopes; no lifts in the keep. Wheelchairs cannot enter the keep buildings.',
      ja: '急な階段・坂があり、天守にエレベーターはありません。天守などの建物内は車いす不可。',
      th: 'มีบันไดและทางลาดชัน หอปราสาทไม่มีลิฟต์และรถเข็นเข้าอาคารหอปราสาทไม่ได้',
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
    minutes: 90,
    hours: {
      en: 'March 1–October 15: 07:00–18:00; October 16–February: 08:00–17:00. Last entry 30 minutes before closing.',
      ja: '3月1日〜10月15日7:00〜18:00、10月16日〜2月末8:00〜17:00。入園は閉園30分前まで。',
      th: '1 มี.ค.–15 ต.ค. 07:00–18:00 น. 16 ต.ค.–สิ้น ก.พ. 08:00–17:00 น. เข้าสุดท้ายก่อนปิด 30 นาที',
    },
    admission: {
      en: 'Adult admission: ¥320; check age exemptions and announced free-entry days.',
      ja: '大人320円。年齢による免除や無料開園日は公式案内を確認。',
      th: 'ผู้ใหญ่ 320 เยน ตรวจข้อยกเว้นอายุและวันที่ประกาศให้เข้าฟรี',
    },
    accessibility: {
      en: 'Wheelchairs are available at listed gates. The garden has slopes and gravel; use the official recommended accessible route.',
      ja: '各料金所に貸出車いすあり。坂道・砂利道があるため公式の推奨コースを確認。',
      th: 'มีรถเข็นให้ยืมตามประตูที่ระบุ สวนมีทางลาดและกรวด ตรวจเส้นทางที่เว็บไซต์แนะนำ',
    },
  },
  'pref:nagano:matsumoto-castle': {
    source: 'https://www.matsumoto-castle.jp/eng/info',
    reviewedAt: '2026-10-25',
    minutes: 90,
    hours: {
      en: 'Usually 08:30–17:00, last entry 16:30. Closed December 29–31; holiday extensions vary.',
      ja: '通常8:30〜17:00、最終入場16:30。12月29〜31日休場。延長日は別途確認。',
      th: 'ปกติ 08:30–17:00 น. เข้าสุดท้าย 16:30 น. ปิด 29–31 ธ.ค. วันขยายเวลาต้องตรวจเพิ่ม',
    },
    admission: {
      en: 'Adult timed e-ticket ¥1,200; on-site paper ticket ¥1,300.',
      ja: '大人の日時指定電子券1,200円、当日紙券1,300円。',
      th: 'ผู้ใหญ่ ตั๋วอิเล็กทรอนิกส์ระบุเวลา 1,200 เยน ตั๋วกระดาษหน้างาน 1,300 เยน',
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
      entrance: {
        source: 'https://www.matsumoto-castle.jp/eng/faq',
        reviewedAt: '2026-10-25',
      },
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
export const placeCategory = (place: Place) => place.category

export function visitSource(
  visit: Visit,
  field: keyof NonNullable<Visit['fieldSources']>,
) {
  return (
    visit.fieldSources?.[field] || {
      source:
        (field === 'hours' || field === 'admission') && visit.infoSource
          ? visit.infoSource
          : visit.source,
      reviewedAt: visit.reviewedAt,
    }
  )
}
