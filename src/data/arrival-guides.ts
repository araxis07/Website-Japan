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
