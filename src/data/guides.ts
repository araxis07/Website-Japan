import type { Locale } from '@/i18n/config'

type Guide = { reviewedAt: string; sources: string[] } & Record<
  Locale,
  { suits: string; stay: string; arrival: string; rain: string; prepare: string }
>
export const guides: Record<string, Guide> = {
  kyoto: {
    reviewedAt: '2026-10-23',
    sources: [
      'https://kyoto.travel/en/getting-to',
      'https://kyoto.travel/en/see-and-do/',
      'https://www.kyohaku.go.jp/eng/',
    ],
    en: {
      suits: 'Temple walks, gardens and traditional crafts. Choose one district per day.',
      stay: 'Kyoto Station suits rail arrivals and onward trips. Shijo–Karasuma is a useful central base. Higashiyama suits early walks, but check the walk from your station with luggage.',
      arrival:
        'From Kansai Airport, compare the JR Haruka service to Kyoto with airport buses. Allow for terminal transfers and check the final departure for a late arrival.',
      rain: 'Visit Kyoto National Museum, then a nearby café. Check exhibition dates and closures before going. Reserve a tea experience if you want a fixed indoor activity.',
      prepare:
        'Wear shoes for stone paths. Book popular experiences ahead; leave private lanes clear and follow photography signs.',
    },
    ja: {
      suits: '寺院、庭園、伝統工芸を楽しむ旅に。一日に一つのエリアを選ぶと快適です。',
      stay: '鉄道での到着や次の街への移動には京都駅周辺。四条烏丸は中心部の拠点に。東山は朝の散策に向きますが、荷物を持って歩く距離を確認しましょう。',
      arrival:
        '関西空港から京都へはJRはるかや空港バスを比較。ターミナル間の移動を見込み、夜着なら最終便も確認してください。',
      rain: '京都国立博物館と近くのカフェへ。展示日程や休館日を確認し、屋内の予定を決めたい場合は茶道体験の予約も。',
      prepare:
        '石畳を歩ける靴を用意。人気の体験は事前予約し、私道をふさがず、撮影の表示を守りましょう。',
    },
    th: {
      suits: 'เหมาะกับคนชอบวัด สวน และงานฝีมือ เลือกเที่ยวหนึ่งย่านต่อวัน',
      stay: 'ใกล้สถานีเกียวโตสะดวกสำหรับรถไฟเข้าออกเมือง ชิโจ–คาราสุมะเหมาะเป็นฐานกลางเมือง ส่วนฮิกาชิยามะเหมาะกับเดินเช้า แต่ควรเช็กระยะเดินจากสถานีพร้อมกระเป๋า',
      arrival:
        'จากสนามบินคันไซ เปรียบเทียบ JR Haruka ไปเกียวโตกับรถบัสสนามบิน เผื่อเวลาเปลี่ยนอาคารและตรวจสอบเที่ยวสุดท้ายหากมาถึงดึก',
      rain: 'เลือกพิพิธภัณฑสถานแห่งชาติเกียวโตแล้วพักคาเฟ่ใกล้กัน ตรวจสอบนิทรรศการและวันปิด หากอยากมีกิจกรรมในร่มที่แน่นอนให้จองประสบการณ์ชงชา',
      prepare:
        'ใส่รองเท้าที่เดินบนพื้นหินได้สะดวก จองกิจกรรมยอดนิยมล่วงหน้า ไม่กีดขวางตรอกส่วนบุคคล และปฏิบัติตามป้ายอนุญาตหรือห้ามถ่ายภาพ',
    },
  },
  tokyo: {
    reviewedAt: '2026-10-23',
    sources: [
      'https://www.japan.travel/en/plan/airport-access/haneda-airport/',
      'https://www.tnm.jp/?lang=en',
      'https://www.japan.travel/en/plan/airport-access/narita-airport/',
    ],
    en: {
      suits:
        'Neighborhood walks, museums, shopping and a first visit with good transport links.',
      stay: 'Ueno suits museums and eastern Tokyo. Shinjuku offers many rail connections but large stations; Tokyo Station suits onward shinkansen journeys. Choose an actual station exit before booking.',
      arrival:
        'Haneda has Keikyu and Tokyo Monorail connections. Narita has JR and Keisei options. Pick a service for your accommodation area, and check terminal, reservations and late-night alternatives.',
      rain: 'Explore Tokyo National Museum in Ueno. Check the exhibition calendar, then keep lunch and cafés in the same area rather than crossing the city in the rain.',
      prepare:
        'Save your hotel address in Japanese. Check station exits and allow time for transfers. Reserve timed-entry attractions directly with the venue.',
    },
    ja: {
      suits: '街歩き、美術館、買い物、鉄道を使う初めての旅に。',
      stay: '上野は博物館や東京の東側に便利。新宿は路線が多い一方で駅が大きく、東京駅周辺は新幹線移動に便利です。予約前に使う出口まで確認を。',
      arrival:
        '羽田は京急や東京モノレール、成田はJRや京成が主な選択肢。宿のエリアに合わせ、ターミナル、予約、深夜の移動手段を確認してください。',
      rain: '上野の東京国立博物館へ。展示日程を調べ、昼食やカフェも近くにまとめると雨の日の移動を減らせます。',
      prepare:
        '宿の住所を日本語でも保存。駅の出口や乗り換え時間を確認し、日時指定の施設は公式サイトで予約を。',
    },
    th: {
      suits: 'เหมาะกับการเดินย่านต่าง ๆ พิพิธภัณฑ์ ช้อปปิ้ง และเที่ยวญี่ปุ่นครั้งแรก',
      stay: 'อุเอโนะสะดวกกับพิพิธภัณฑ์และโตเกียวฝั่งตะวันออก ชินจูกุมีรถไฟหลายสายแต่สถานีใหญ่ ส่วนใกล้สถานีโตเกียวเหมาะกับต่อชินคันเซ็น ตรวจสอบทางออกสถานีก่อนจอง',
      arrival:
        'ฮาเนดะเชื่อมด้วย Keikyu และ Tokyo Monorail นาริตะมี JR กับ Keisei เลือกตามย่านที่พัก ตรวจสอบอาคาร การจอง และทางเลือกเมื่อมาถึงดึก',
      rain: 'ไปพิพิธภัณฑสถานแห่งชาติโตเกียวในอุเอโนะ ตรวจสอบปฏิทินนิทรรศการ แล้วจัดอาหารและคาเฟ่ไว้ใกล้กันเพื่อลดการข้ามเมืองกลางฝน',
      prepare:
        'เก็บที่อยู่โรงแรมเป็นภาษาญี่ปุ่น ตรวจสอบทางออกและเผื่อเวลาเปลี่ยนรถ จองสถานที่ที่ต้องระบุเวลาผ่านเว็บไซต์ทางการ',
    },
  },
  'mount-fuji': {
    reviewedAt: '2026-10-23',
    sources: [
      'https://www.fujisan-whc.jp/en/access/index.html',
      'https://www.japan.travel/en/fuji-guide/',
      'https://bus.fujikyu.co.jp/',
    ],
    en: {
      suits:
        'Lakeside scenery and a slower overnight stay. This guide covers sightseeing around Kawaguchiko, not a summit climb.',
      stay: 'Near Kawaguchiko Station is useful without a car. Lakeside accommodation offers scenery but may need a bus or hotel pickup; confirm the last service before booking.',
      arrival:
        'From a Tokyo airport, first connect to the city and your confirmed onward train or highway bus to Kawaguchiko. Allow a transfer buffer rather than booking a tight connection after landing.',
      rain: 'Visit the Yamanashi Prefectural Fujisan World Heritage Center for the mountain’s cultural story. Check the opening calendar and transport; a cloudy day may offer no mountain view.',
      prepare:
        'Pack layers and check bus return times. Reserve busy services. For climbing, use a separate plan based on current official trail rules and weather.',
    },
    ja: {
      suits:
        '湖畔の景色と、ゆっくりした一泊旅に。このガイドは河口湖周辺の観光が対象で、登頂の案内ではありません。',
      stay: '車なしなら河口湖駅周辺が便利。湖畔の宿は景色を楽しめますが、バスや送迎が必要なことも。予約前に最終便を確認しましょう。',
      arrival:
        '東京の空港から市内へ移動し、予約・確認した河口湖行きの鉄道や高速バスへ。到着直後に余裕のない乗り継ぎを組まないように。',
      rain: '山梨県立富士山世界遺産センターで山の文化を学ぶ一日に。開館日や交通を確認し、曇りの日は山が見えない可能性も見込んで。',
      prepare:
        '重ね着と帰りのバス時刻を準備。混雑便は予約を。登山は最新の公式ルールと天候を確認した別の計画にしてください。',
    },
    th: {
      suits:
        'เหมาะกับชมวิวทะเลสาบและพักค้างคืน คู่มือนี้เน้นเที่ยวรอบคาวากุจิโกะ ไม่ใช่ปีนยอดฟูจิ',
      stay: 'ใกล้สถานีคาวากุจิโกะสะดวกสำหรับคนไม่มีรถ ที่พักริมทะเลสาบมีวิวแต่บางแห่งต้องต่อรถบัสหรือรถรับส่ง ควรตรวจสอบเที่ยวสุดท้ายก่อนจอง',
      arrival:
        'จากสนามบินโตเกียวเข้าเมืองก่อน แล้วต่อรถไฟหรือรถบัสไปคาวากุจิโกะที่ตรวจสอบไว้ เผื่อเวลาเปลี่ยนรถ ไม่จองกระชั้นหลังเครื่องลง',
      rain: 'ไปศูนย์มรดกโลกฟูจิของจังหวัดยามานาชิเพื่อเรียนรู้วัฒนธรรมของภูเขา ตรวจสอบวันเปิดและการเดินทาง วันที่มีเมฆอาจมองไม่เห็นภูเขาเลย',
      prepare:
        'เตรียมเสื้อหลายชั้นและเวลารถกลับ จองเที่ยวที่คนใช้มาก หากจะปีนเขาต้องวางแผนแยกตามกฎทางการและอากาศล่าสุด',
    },
  },
  osaka: {
    reviewedAt: '2026-10-23',
    sources: [
      'https://www.nankai.co.jp/en_railway/traffic/kix.html',
      'https://www.osakamushis.jp/eng/',
    ],
    en: {
      suits: 'Food, evening walks and a city base for a Kansai trip.',
      stay: 'Namba suits food streets and Nankai airport trains. Umeda suits JR connections and shopping. Shin-Osaka is practical for early shinkansen departures; it is a different station from Osaka.',
      arrival:
        'From Kansai Airport, Nankai trains serve Namba while JR services reach other Osaka hubs. Compare the route to your hotel, and check the terminal-to-station transfer.',
      rain: 'Try Osaka Museum of History near the castle, or covered shopping arcades. Confirm exhibition dates and avoid treating a rainy forecast as a reason to pack in distant stops.',
      prepare:
        'Save the exact hotel station and exit. Eat at the stall’s designated area and leave room for the airport transfer on departure day.',
    },
    ja: {
      suits: '食べ歩き、夜の散策、関西旅行の拠点に。',
      stay: 'なんばは飲食街や南海の空港列車に便利。梅田はJRと買い物に。新大阪は早い新幹線に便利ですが、大阪駅とは別の駅です。',
      arrival:
        '関西空港からは南海でなんば方面、JRで大阪の各拠点へ。宿までの経路とターミナルから駅への移動を確認しましょう。',
      rain: '大阪城近くの大阪歴史博物館や屋根付き商店街へ。展示日程を確認し、遠い場所を詰め込みすぎない予定に。',
      prepare:
        '宿の最寄り駅と出口を保存。飲食は店の指定場所で楽しみ、帰国日は空港移動の時間を確保しましょう。',
    },
    th: {
      suits: 'เหมาะกับชิมอาหาร เดินเมืองยามค่ำ และใช้เป็นฐานเที่ยวคันไซ',
      stay: 'นัมบะเหมาะกับย่านอาหารและรถไฟสนามบินนันไค อุเมดะสะดวกกับ JR และช้อปปิ้ง ชินโอซาก้าเหมาะกับชินคันเซ็นเช้า แต่เป็นคนละสถานีกับโอซาก้า',
      arrival:
        'จากสนามบินคันไซ นันไคไปนัมบะ ส่วน JR ไปจุดเชื่อมต่ออื่นของเมือง เปรียบเทียบเส้นทางถึงโรงแรมและการเดินจากอาคารสนามบินไปสถานี',
      rain: 'เลือกพิพิธภัณฑ์ประวัติศาสตร์โอซาก้าใกล้ปราสาท หรือถนนร้านค้าที่มีหลังคา ตรวจสอบวันจัดแสดง และไม่เพิ่มสถานที่ไกลมากเพียงเพราะฝนตก',
      prepare:
        'บันทึกชื่อสถานีและทางออกของที่พัก กินอาหารในพื้นที่ที่ร้านกำหนด และเผื่อเวลาไปสนามบินในวันกลับ',
    },
  },
  hokkaido: {
    reviewedAt: '2026-10-23',
    sources: [
      'https://www.jrhokkaido.co.jp/global/english/travel/airport.html',
      'https://www.visit-hokkaido.jp/en/theme/ame/',
      'https://www.sapporo.travel/en/',
    ],
    en: {
      suits:
        'A Sapporo base, regional food and seasonal outings. Distant Hokkaido areas need separate travel days.',
      stay: 'Sapporo Station suits rail arrivals and Otaru trips. Odori is central for city walks; Susukino suits evening dining. Check icy walking routes and step-free access in winter.',
      arrival:
        'JR airport trains link New Chitose with Sapporo. Compare the reserved and non-reserved options and allow walking time from the international terminal to the station.',
      rain: 'Choose a Sapporo museum, such as the Hokkaido University Museum or Sapporo Beer Museum. Verify opening days; do not substitute a distant rural attraction without checking transport.',
      prepare:
        'Wear footwear suited to the season. Allow weather buffers before flights and confirm rural bus return trips before leaving the city.',
    },
    ja: {
      suits:
        '札幌を拠点に、地域の食と季節の小旅行を楽しむ旅に。遠いエリアへの移動は別の日を確保しましょう。',
      stay: '札幌駅は空港や小樽への鉄道移動に便利。大通は街歩き、すすきのは夕食の選択肢が豊富です。冬は凍結路や段差のない経路も確認を。',
      arrival:
        '新千歳空港と札幌はJRの空港列車で結ばれています。指定席・自由席を比較し、国際線ターミナルから駅への徒歩時間も見込みましょう。',
      rain: '北海道大学総合博物館やサッポロビール博物館など、市内の施設へ。開館日を確認し、遠方の代案は交通を調べてから。',
      prepare:
        '季節に合う靴を用意。航空移動の前は天候への余裕を確保し、郊外へ出る前に帰りのバスも確認しましょう。',
    },
    th: {
      suits:
        'ใช้ซัปโปโรเป็นฐาน ชิมอาหาร และเพิ่มทริปตามฤดูกาล พื้นที่ไกลในฮอกไกโดต้องมีวันเดินทางแยก',
      stay: 'สถานีซัปโปโรสะดวกสำหรับรถไฟสนามบินและไปโอตารุ โอโดริเหมาะกับเดินเมือง ส่วนซูซูกิโนะมีร้านอาหารยามค่ำ ตรวจสอบทางเดินที่อาจมีน้ำแข็งและเส้นทางที่ไม่มีบันไดในฤดูหนาว',
      arrival:
        'รถไฟสนามบิน JR เชื่อมนิวชิโตเสะกับซัปโปโร เปรียบเทียบที่นั่งจองกับไม่จอง และเผื่อเวลาเดินจากอาคารระหว่างประเทศไปสถานี',
      rain: 'เลือกพิพิธภัณฑ์ในซัปโปโร เช่น พิพิธภัณฑ์มหาวิทยาลัยฮอกไกโดหรือพิพิธภัณฑ์เบียร์ซัปโปโร ตรวจสอบวันเปิด ไม่เปลี่ยนไปที่ไกลโดยยังไม่เช็กการเดินทาง',
      prepare:
        'รองเท้าควรเหมาะกับฤดู เผื่อวันก่อนบินสำหรับสภาพอากาศ และตรวจสอบรถบัสกลับก่อนออกนอกเมือง',
    },
  },
  okinawa: {
    reviewedAt: '2026-10-23',
    sources: [
      'https://visitokinawajapan.com/plan-your-trip/getting-around-okinawa/',
      'https://visitokinawajapan.com/plan-your-trip/useful-information/typhoon-precautions-okinawa/',
      'https://okimu.jp/en/',
    ],
    en: {
      suits:
        'Ryukyu culture, local food and a Naha base. Beach resorts and other islands need additional transport planning.',
      stay: 'Near a Yui Rail station in Naha works well for a car-free city stay. Kokusai-dori and nearby streets offer dining; a coastal resort may require a separate airport transfer.',
      arrival:
        'Yui Rail connects Naha Airport with the city. For areas beyond the line, compare buses or accommodation transfers. Other islands require their own flight or ferry plan.',
      rain: 'Visit Okinawa Prefectural Museum & Art Museum or explore covered market lanes in ordinary rain. During a typhoon, follow local instructions and suspend sightseeing rather than seeking an indoor outing.',
      prepare:
        'Bring sun protection and water. Check marine conditions, ferry notices and accommodation cancellation rules. Keep flexibility around flights in storm season.',
    },
    ja: {
      suits: '琉球文化、島の食、那覇を拠点にした旅に。リゾートや離島は別途交通計画を。',
      stay: '車なしの街滞在なら那覇のゆいレール駅近くが便利。国際通り周辺は飲食店が多く、海辺のリゾートは別の空港送迎が必要なことも。',
      arrival:
        '那覇空港と市内はゆいレールで移動できます。路線外はバスや宿の送迎を比較。離島への航空便や船は別の計画にしてください。',
      rain: '通常の雨なら沖縄県立博物館・美術館や屋根のある市場の通りへ。台風時は屋内観光を探すのではなく、現地の指示に従って観光を控えましょう。',
      prepare:
        '日よけと飲み水を準備。海況、船の運航、宿のキャンセル条件を確認し、荒天期の航空移動には余裕を。',
    },
    th: {
      suits:
        'เหมาะกับวัฒนธรรมริวกิว อาหารท้องถิ่น และพักในนาฮะ รีสอร์ตชายหาดหรือเกาะอื่นต้องวางแผนเดินทางเพิ่ม',
      stay: 'ใกล้สถานี Yui Rail ในนาฮะสะดวกเมื่อไม่มีรถ โคคุไซโดริและถนนใกล้กันมีร้านอาหาร ส่วนรีสอร์ตชายฝั่งอาจต้องใช้รถรับส่งจากสนามบินแยก',
      arrival:
        'Yui Rail เชื่อมสนามบินนาฮะกับเมือง พื้นที่นอกแนวรถไฟควรเปรียบเทียบรถบัสหรือรถรับส่งของที่พัก เกาะอื่นต้องวางแผนเที่ยวบินหรือเรือเฉพาะ',
      rain: 'ฝนทั่วไปเลือกพิพิธภัณฑ์และหอศิลป์จังหวัดโอกินาว่า หรือทางเดินตลาดมีหลังคา แต่ระหว่างไต้ฝุ่นควรงดเที่ยวและทำตามประกาศท้องถิ่น ไม่ออกหากิจกรรมในร่ม',
      prepare:
        'เตรียมกันแดดและน้ำดื่ม ตรวจสภาพทะเล ประกาศเรือ และกฎยกเลิกที่พัก เผื่อความยืดหยุ่นให้เที่ยวบินในฤดูพายุ',
    },
  },
}
