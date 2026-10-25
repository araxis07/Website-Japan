import type { Locale } from '@/i18n/config'
type Arrival = { code: string; source: string; steps: Record<Locale, string[]> }
export const arrivalGuides: Arrival[] = [
  {
    code: 'HND · Haneda',
    source: 'https://tokyo-haneda.com/en/access/index.html',
    steps: {
      en: [
        'Confirm Terminal 1, 2 or 3 after collecting bags.',
        'Compare Keikyu toward Shinagawa with Tokyo Monorail toward Hamamatsucho for your hotel address.',
        'Check the final transfer, station exit and last service on the airport route search before buying.',
      ],
      ja: [
        '荷物を受け取ったら第1・2・3ターミナルを確認。',
        '宿の住所に合わせ、品川方面の京急と浜松町方面の東京モノレールを比較。',
        '空港の経路検索で最後の乗り換え・駅出口・最終便を確認して購入。',
      ],
      th: [
        'รับกระเป๋าแล้วตรวจว่าอยู่ Terminal 1, 2 หรือ 3',
        'เทียบ Keikyu ไปทาง Shinagawa กับ Tokyo Monorail ไป Hamamatsucho ตามที่อยู่โรงแรม',
        'เช็กจุดต่อรถสุดท้าย ทางออกสถานี และรถเที่ยวสุดท้ายในระบบสนามบินก่อนซื้อ',
      ],
    },
  },
  {
    code: 'NRT · Narita',
    source: 'https://www.narita-airport.jp/en/access/',
    steps: {
      en: [
        'Confirm your terminal and follow signs to its rail connection; check the terminal-transfer guide when arriving at Terminal 3.',
        'Compare JR Narita Express, Keisei services and airport buses for your actual hotel area.',
        'Check seat booking, the complete fare and hotel check-in deadline; do not assume every Keisei train is Skyliner.',
      ],
      ja: [
        'ターミナルを確認して鉄道への案内に従います。第3ターミナルは移動案内も確認。',
        '宿の地域に合わせJR成田エクスプレス・京成・空港バスを比較。',
        '指定席・合計運賃・宿の受付締切を確認。京成の全列車がスカイライナーではありません。',
      ],
      th: [
        'ตรวจอาคารแล้วตามป้ายไปจุดต่อรถไฟ หากลง Terminal 3 ให้อ่านวิธีเชื่อมอาคารด้วย',
        'เทียบ JR Narita Express บริการ Keisei และรถบัสตามย่านโรงแรมจริง',
        'ตรวจการจองที่นั่ง ค่าโดยสารรวม และเวลาเช็กอินสุดท้าย รถไฟ Keisei ไม่ได้เป็น Skyliner ทุกขบวน',
      ],
    },
  },
  {
    code: 'KIX · Kansai',
    source: 'https://www.kansai-airport.or.jp/en/access/from-airport/train',
    steps: {
      en: [
        'Use the airport guide to reach Kansai-airport Station; Terminal 2 needs a terminal transfer.',
        'Compare Nankai for Namba with JR routes for Tennoji, Osaka or Kyoto.',
        'Choose the train type, check any limited-express supplement, and save the hotel’s final walking route.',
      ],
      ja: [
        '空港案内で関西空港駅へ。第2ターミナルからはターミナル間移動が必要。',
        '難波方面の南海と、天王寺・大阪・京都方面のJRを比較。',
        '列車種別と特急料金を確認し、駅から宿までの徒歩経路も保存。',
      ],
      th: [
        'ดูทางไปสถานี Kansai-airport หากอยู่ Terminal 2 ต้องย้ายอาคารก่อน',
        'เทียบ Nankai ไป Namba กับ JR ไป Tennoji, Osaka หรือ Kyoto',
        'เลือกชนิดขบวน ตรวจค่าด่วนพิเศษ และเก็บเส้นทางเดินช่วงสุดท้ายถึงโรงแรม',
      ],
    },
  },
  {
    code: 'CTS · New Chitose',
    source: 'https://www.hokkaido-airports.com/en/new-chitose/access/',
    steps: {
      en: [
        'Follow rail signs toward the domestic-terminal basement; allow time to walk from international arrivals.',
        'Compare the JR service toward Sapporo with the bus route closest to your hotel.',
        'Check the day’s departure information and leave extra time if snow disrupts connections.',
      ],
      ja: [
        '鉄道の案内に従い国内線ターミナル地下へ。国際線からの移動時間を確保。',
        '札幌方面のJRと宿に近いバス路線を比較。',
        '当日の運行情報を確認し、雪で接続が乱れる場合に余裕を。',
      ],
      th: [
        'ตามป้ายรถไฟไปชั้นใต้ดินอาคารในประเทศ เผื่อเวลาเดินจากขาเข้าระหว่างประเทศ',
        'เทียบ JR ไปซัปโปโรกับรถบัสสายที่ใกล้โรงแรม',
        'ตรวจข้อมูลเดินรถของวันนั้นและเผื่อเวลาเมื่อหิมะกระทบการต่อรถ',
      ],
    },
  },
  {
    code: 'OKA · Naha',
    source: 'https://www.naha-airport.co.jp/en/access/',
    steps: {
      en: [
        'Follow airport signs to the monorail connection.',
        'Choose a Yui Rail stop near your Naha hotel, or compare a bus/taxi for places outside the rail corridor.',
        'Save the last walking leg; the monorail does not cover all of Okinawa or its other islands.',
      ],
      ja: [
        '空港の案内でモノレールの接続へ。',
        '那覇の宿に近いゆいレール駅を選び、沿線外はバス・タクシーと比較。',
        '駅からの徒歩経路も保存。沖縄全域や離島をモノレールで移動できるわけではありません。',
      ],
      th: [
        'ตามป้ายสนามบินไปจุดต่อโมโนเรล',
        'เลือกสถานี Yui Rail ใกล้โรงแรมในนาฮะ หรือเทียบรถบัส/แท็กซี่หากอยู่นอกแนวรถไฟ',
        'เก็บเส้นทางเดินช่วงสุดท้าย โมโนเรลไม่ได้ครอบคลุมทั้งโอกินาว่าหรือเกาะอื่น',
      ],
    },
  },
]
export const trainExample: Record<Locale, string[]> = {
  en: [
    'Example: a local JR journey uses a basic fare. A limited express normally also needs an express ticket; some products combine both on one ticket.',
    'For a reserved seat, match date, train, carriage and seat. An IC balance alone is not proof that the express seat is booked.',
    'When switching from JR to a private railway or subway, check the operator and transfer gates; a pass or ticket may not cover the next leg.',
  ],
  ja: [
    '例：JRの普通列車には運賃が必要。特急では通常さらに特急券が必要で、両方を1枚にまとめた商品もあります。',
    '指定席は日付・列車・号車・座席を照合。IC残高があるだけでは特急の座席予約にはなりません。',
    'JRから私鉄・地下鉄に乗り換えるときは会社と乗換改札を確認。パスや切符が次の区間を含まない場合があります。',
  ],
  th: [
    'ตัวอย่าง: รถ JR ท้องถิ่นใช้ค่าโดยสารพื้นฐาน ส่วนรถด่วนพิเศษโดยทั่วไปต้องมีตั๋วด่วนเพิ่ม บางผลิตภัณฑ์รวมทั้งสองไว้ในใบเดียว',
    'ที่นั่งจองต้องตรงกับวัน ขบวน ตู้ และเลขที่นั่ง การมีเงินในบัตร IC ไม่ได้แปลว่าจองที่นั่งรถด่วนแล้ว',
    'เมื่อต่อจาก JR ไปบริษัทรถไฟอื่นหรือรถใต้ดิน ให้ดูผู้ให้บริการและประตูเปลี่ยนสาย พาสหรือตั๋วเดิมอาจไม่ครอบคลุมช่วงต่อไป',
  ],
}

export const arrivalChecks = [
  {
    source: 'https://tokyo-haneda.com/en/access/bus/index.html',
    en: {
      title: 'Arriving late',
      text: 'Plan from the time you leave arrivals, including immigration and baggage. Check the last connection all the way to your hotel, not only the first train. Haneda lists late-night bus options, but their routes and operating days vary. If no connection works, arrange an airport-area night or a taxi quote and notify your hotel of late check-in.',
    },
    ja: {
      title: '夜遅い到着',
      text: '入国審査と荷物受取を含め、到着ロビーを出る時刻から計画。最初の列車だけでなく宿までの最終接続を確認。羽田の深夜バスは路線・運行日が異なります。接続できない場合は空港周辺の宿泊やタクシー料金を確認し、宿へ到着の遅れを連絡しましょう。',
    },
    th: {
      title: 'เมื่อมาถึงดึก',
      text: 'วางแผนจากเวลาที่ออกจากโถงขาเข้า โดยเผื่อตรวจคนเข้าเมืองและรับกระเป๋า ตรวจรถต่อจนถึงโรงแรม ไม่ใช่เฉพาะรถเที่ยวแรก ฮาเนดะมีข้อมูลรถบัสดึก แต่เส้นทางและวันให้บริการต่างกัน หากต่อรถไม่ได้ ให้เตรียมที่พักใกล้สนามบินหรือสอบถามราคาแท็กซี่ และแจ้งโรงแรมเรื่องเช็กอินช้า',
    },
  },
  {
    source: 'https://www.narita-airport.jp/en/service/delivery/',
    en: {
      title: 'Large bags and forwarding',
      text: 'Narita lists baggage delivery, storage and lockers by terminal. Before forwarding, confirm counter hours, delivery date, size limits and whether your accommodation accepts bags. Keep first-night essentials with you; do not assume same-day delivery. For trains, check the chosen service’s luggage rules and lift exits.',
    },
    ja: {
      title: '大きな荷物と配送',
      text: '成田の公式案内はターミナル別に宅配・一時預かり・ロッカーを掲載。配送前に受付時間、到着日、サイズ制限、宿の受取可否を確認。当日配送を前提にせず、初日の必需品は手元に。列車の荷物規則と駅のエレベーター出口も確認。',
    },
    th: {
      title: 'กระเป๋าใหญ่และการส่งสัมภาระ',
      text: 'นาริตะแสดงจุดส่ง ฝาก และล็อกเกอร์แยกตามอาคาร ก่อนส่งต้องตรวจเวลาเคาน์เตอร์ วันที่ถึง ขนาดที่รับ และโรงแรมรับฝากได้หรือไม่ เก็บของจำเป็นคืนแรกติดตัว อย่าคิดว่าจะส่งถึงวันเดียวกันเสมอ หากขึ้นรถไฟให้ตรวจข้อกำหนดกระเป๋าของขบวนและทางออกที่มีลิฟต์',
    },
  },
  {
    source:
      'https://tokyo-haneda.com/en/service/facilities/baby_nurseries.html',
    en: {
      title: 'Children and step-free transfers',
      text: 'Haneda’s nursery map distinguishes public areas from areas after security, and lists feeding and changing facilities. Locate a room in your arrival area before leaving. Allow an extra break before the train, find lift routes, and confirm child tickets, stroller space and any assistance directly with your chosen operator.',
    },
    ja: {
      title: '子ども連れ・段差を避ける乗り換え',
      text: '羽田のベビールーム案内は一般エリアと保安検査後を区別し、授乳・おむつ替え設備を掲載。到着側で使える部屋を確認してから移動。乗車前の休憩とエレベーター経路を確保し、子ども用切符・ベビーカーの扱い・介助は利用する会社に確認。',
    },
    th: {
      title: 'เด็กเล็กและการต่อรถที่ไม่ต้องขึ้นบันได',
      text: 'แผนผังห้องเด็กของฮาเนดะแยกพื้นที่สาธารณะกับหลังตรวจความปลอดภัย และระบุจุดให้นมกับเปลี่ยนผ้าอ้อม เลือกห้องที่เข้าใช้ได้จากฝั่งขาเข้าก่อนออกไปต่อรถ เผื่อพัก หาทางใช้ลิฟต์ และตรวจตั๋วเด็ก พื้นที่รถเข็นเด็ก และความช่วยเหลือกับบริษัทที่ใช้จริง',
    },
  },
] satisfies ({ source: string } & Record<
  Locale,
  { title: string; text: string }
>)[]

export const workedTrainRoute: Record<Locale, string[]> = {
  en: [
    'Worked route: Narita Airport → Tokyo Station on JR Narita Express. At Terminal 1 use Narita Airport Station; at Terminals 2/3 follow the connection to Airport Terminal 2 Station.',
    'Select your travel date, departure and Tokyo as the destination. Confirm the base fare plus limited-express charge and your reserved train/car/seat; do not substitute an IC tap for the express ticket. Passes and bundles have their own eligibility and collection rules.',
    'Board the named train and get off at Tokyo. For an onward subway journey, follow that operator’s transfer signs and confirm the separate fare. Match the final station exit to your hotel; this example ends at Tokyo Station.',
    'Check service notices before buying: JR East has announced changes to some Narita Express services on November 6–8, 2026. No live fare or departure is guaranteed here.',
  ],
  ja: [
    '具体例：成田空港→東京駅をJR成田エクスプレスで移動。第1ターミナルは成田空港駅、第2・3ターミナルは空港第2ビル駅への案内を確認。',
    '乗車日・発車時刻・目的地「東京」を選択。運賃と特急料金、指定列車・号車・席番を確認。ICのタッチだけで特急券の代わりにはなりません。パス・セット券は利用条件と受取方法を別途確認。',
    '指定の列車に乗り東京駅で下車。地下鉄へ乗り継ぐ場合は運行会社の案内と別途運賃を確認。宿に近い出口まで調べましょう。この例の終点は東京駅です。',
    '購入前に運行情報を確認。JR東日本は2026年11月6〜8日の一部列車の変更を案内しています。ここにリアルタイムの運賃・時刻の保証はありません。',
  ],
  th: [
    'ตัวอย่างเส้นทาง: สนามบินนาริตะ → สถานี Tokyo ด้วย JR Narita Express อาคาร 1 ใช้ Narita Airport Station ส่วนอาคาร 2/3 ตามป้ายเชื่อมไป Airport Terminal 2 Station',
    'เลือกวัน เวลาออก และปลายทาง Tokyo ตรวจค่าโดยสารพื้นฐานรวมค่าด่วนพิเศษ พร้อมขบวน ตู้ และที่นั่งที่จอง การแตะบัตร IC ไม่ใช้แทนตั๋วด่วน พาสหรือตั๋วชุดมีเงื่อนไขผู้ใช้และวิธีรับตั๋วแยกต่างหาก',
    'ขึ้นขบวนที่ระบุแล้วลง Tokyo หากต่อรถใต้ดิน ให้ตามป้ายของบริษัทนั้นและตรวจค่าโดยสารช่วงต่อ หาเส้นทางไปทางออกใกล้โรงแรม ตัวอย่างนี้สิ้นสุดที่สถานี Tokyo',
    'ตรวจประกาศก่อนซื้อ: JR East แจ้งเปลี่ยนแปลงบริการ Narita Express บางขบวนวันที่ 6–8 พ.ย. 2026 หน้านี้ไม่ได้รับรองราคาหรือเวลาออกแบบเรียลไทม์',
  ],
}
