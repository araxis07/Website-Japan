import type { Locale } from '@/i18n/config'

export const reviewedAt = '2026-10-22'
export const categories = ['all', 'culture', 'city', 'nature', 'coast'] as const
export type Category = (typeof categories)[number]

type DestinationCopy = {
  name: string
  region: string
  tagline: string
  description: string
  duration: string
  bestTime: string
  highlights: string[]
  gettingThere: string
  tip: string
  imageAlt: string
}

type Destination = {
  slug: string
  image: string
  japanese: string
  category: Exclude<Category, 'all'>
  source: string
} & Record<Locale, DestinationCopy>

export const destinations: Destination[] = [
  {
    slug: 'kyoto',
    image: '/images/kyoto.jpg',
    japanese: '京都',
    category: 'culture',
    source: 'https://www.japan.travel/en/destinations/kansai/kyoto/',
    en: {
      name: 'Kyoto',
      region: 'Kansai',
      tagline: 'Take the quieter path.',
      description:
        'Temple gardens, wooden townhouses and small tea shops reward an unhurried visit. Explore one neighborhood at a time, leaving space between the famous sights.',
      duration: '3–4 days',
      bestTime: 'Spring & autumn',
      highlights: [
        'Walk through Higashiyama and its temple lanes.',
        'Explore the torii-lined paths of Fushimi Inari.',
        'Make time for the gardens and riverside paths of Arashiyama.',
      ],
      gettingThere:
        'Kyoto Station is on the Tokaido Shinkansen. Use local trains and subways to reach different districts; walk the last stretch where practical.',
      tip: 'Keep residential lanes clear and respect photography restrictions, especially in Gion. Visit popular places early.',
      imageAlt: 'Yasaka Pagoda and traditional wooden houses in Kyoto at dusk',
    },
    ja: {
      name: '京都',
      region: '関西',
      tagline: '路地の先で、京都に出会う。',
      description:
        '寺院の庭、木造の町家、小さな茶店。名所を急いで巡るより、一つの街をゆっくり歩く旅がおすすめです。',
      duration: '3〜4日',
      bestTime: '春・秋',
      highlights: [
        '東山の寺院と路地を歩く。',
        '伏見稲荷大社の鳥居が続く参道へ。',
        '嵐山の庭園や川沿いでひと休み。',
      ],
      gettingThere:
        '東海道新幹線で京都駅へ。各エリアへの移動は鉄道や地下鉄を組み合わせ、駅からは徒歩で街を楽しめます。',
      tip: '祇園などの住宅地では通行を妨げず、撮影禁止の表示を守りましょう。人気の場所は朝の訪問もおすすめです。',
      imageAlt: '夕暮れの京都、八坂の塔と木造の町並み',
    },
    th: {
      name: 'เกียวโต',
      region: 'คันไซ',
      tagline: 'พบเกียวโต ในทางเดินที่เงียบลง',
      description:
        'สวนวัด บ้านไม้ และร้านชาเล็ก ๆ ชวนให้เดินช้าลง เลือกเที่ยวทีละย่าน แล้วเผื่อเวลาระหว่างสถานที่ยอดนิยม',
      duration: '3–4 วัน',
      bestTime: 'ใบไม้ผลิและใบไม้ร่วง',
      highlights: [
        'เดินชมย่านฮิกาชิยามะและตรอกใกล้วัด',
        'ชมทางเดินโทริอิที่ศาลเจ้าฟูชิมิอินาริ',
        'พักในสวนและริมแม่น้ำที่อาราชิยามะ',
      ],
      gettingThere:
        'เดินทางด้วยโทไคโดชินคันเซ็นถึงสถานีเกียวโต ใช้รถไฟท้องถิ่นและรถไฟใต้ดินเชื่อมย่านต่าง ๆ แล้วเดินต่อในช่วงที่เหมาะสม',
      tip: 'ไม่กีดขวางทางในย่านที่อยู่อาศัย และเคารพป้ายห้ามถ่ายภาพ โดยเฉพาะกิออน ลองไปสถานที่ยอดนิยมตั้งแต่เช้า',
      imageAlt: 'เจดีย์ยาซากะและบ้านไม้ในเกียวโตยามเย็น',
    },
  },
  {
    slug: 'tokyo',
    image: '/images/tokyo.jpg',
    japanese: '東京',
    category: 'city',
    source: 'https://www.japan.travel/en/destinations/kanto/tokyo/',
    en: {
      name: 'Tokyo',
      region: 'Kanto',
      tagline: 'A city of many small worlds.',
      description:
        'Move from the temple streets of Asakusa to the energy of Shibuya, then pause in a neighborhood café. Tokyo is most rewarding when you explore district by district.',
      duration: '4–5 days',
      bestTime: 'All year',
      highlights: [
        'Explore Sensoji and the streets of Asakusa.',
        'Find a quiet moment in Meiji Jingu’s wooded grounds.',
        'See Shibuya’s crossing and browse its neighborhood shops.',
      ],
      gettingThere:
        'Haneda and Narita airports have rail connections into the city. JR, subway and private railway lines serve different areas; check the operator for your route.',
      tip: 'Group each day’s stops by neighborhood. Distances between stations and exits can be longer than they look on a map.',
      imageAlt: 'A lively Tokyo shopping street illuminated by colorful signs at night',
    },
    ja: {
      name: '東京',
      region: '関東',
      tagline: 'いくつもの街が、一つの東京に。',
      description:
        '浅草の寺町から渋谷の活気へ。そして路地のカフェでひと息。エリアごとの個性を味わうと、東京の旅はもっと豊かになります。',
      duration: '4〜5日',
      bestTime: '通年',
      highlights: [
        '浅草寺と浅草の街を散策。',
        '明治神宮の緑に包まれた参道へ。',
        '渋谷のスクランブル交差点とショップを巡る。',
      ],
      gettingThere:
        '羽田・成田の両空港から鉄道で都心へ。JR、地下鉄、私鉄を目的地に合わせて利用し、路線の運行会社も確認しましょう。',
      tip: '一日の行き先は近いエリアでまとめると便利です。駅構内や出口までの移動時間にも余裕を持ちましょう。',
      imageAlt: '色鮮やかな看板に照らされた夜の東京の商店街',
    },
    th: {
      name: 'โตเกียว',
      region: 'คันโต',
      tagline: 'โลกเล็กหลายใบ ในเมืองเดียว',
      description:
        'จากถนนวัดในอาซากุสะสู่ความคึกคักของชิบูย่า แล้วพักในคาเฟ่ย่านใกล้เคียง ค่อย ๆ รู้จักโตเกียวทีละพื้นที่',
      duration: '4–5 วัน',
      bestTime: 'ตลอดปี',
      highlights: [
        'เที่ยววัดเซ็นโซจิและย่านอาซากุสะ',
        'เดินท่ามกลางต้นไม้ในศาลเจ้าเมจิ',
        'ชมแยกชิบูย่าและร้านค้าใกล้เคียง',
      ],
      gettingThere:
        'สนามบินฮาเนดะและนาริตะมีรถไฟเข้าสู่เมือง JR รถไฟใต้ดิน และรถไฟเอกชนให้บริการต่างพื้นที่กัน ควรตรวจสอบผู้ให้บริการของเส้นทางที่ใช้',
      tip: 'จัดสถานที่ในวันเดียวกันให้อยู่ย่านใกล้กัน ระยะทางในสถานีและทางออกอาจยาวกว่าที่เห็นบนแผนที่',
      imageAlt: 'ถนนร้านค้าในโตเกียวสว่างด้วยป้ายสีสันยามค่ำ',
    },
  },
  {
    slug: 'mount-fuji',
    image: '/images/fuji.jpg',
    japanese: '富士山',
    category: 'nature',
    source: 'https://www.japan.travel/en/fuji-guide/',
    en: {
      name: 'Mount Fuji',
      region: 'Chubu',
      tagline: 'Leave room for a mountain morning.',
      description:
        'Lakeside walks and changing light offer many ways to enjoy Japan’s iconic mountain. A stay around the Fuji Five Lakes gives you more than one chance at a clear view.',
      duration: '1–2 days',
      bestTime: 'Clear days, all year',
      highlights: [
        'Stroll along Lake Kawaguchi.',
        'Enjoy Fuji views from the surrounding lake district.',
        'Discover local museums and cafés when clouds roll in.',
      ],
      gettingThere:
        'Trains and highway buses connect the Tokyo area with Kawaguchiko. Check schedules and reserve busy services ahead of time.',
      tip: 'A sightseeing trip is different from a summit climb. Climbing is seasonal; check the official trail rules, reservations and weather before planning an ascent.',
      imageAlt: 'Snow-capped Mount Fuji framed by pink cherry blossoms',
    },
    ja: {
      name: '富士山',
      region: '中部',
      tagline: '山を眺める、朝のひととき。',
      description:
        '湖畔の散歩や移り変わる光の中で、日本を代表する山を楽しむ旅。富士五湖周辺に一泊すれば、晴れた景色に出会う機会も増えます。',
      duration: '1〜2日',
      bestTime: '通年の晴天日',
      highlights: [
        '河口湖の湖畔をゆっくり歩く。',
        '富士五湖周辺の展望スポットを巡る。',
        '曇りの日は美術館やカフェを楽しむ。',
      ],
      gettingThere:
        '東京方面から河口湖へは鉄道や高速バスでアクセスできます。運行時刻を調べ、混雑する便は事前予約を。',
      tip: '観光と登山は別の計画が必要です。登山には開山期間があり、公式の登山規制、予約、天候を必ず確認しましょう。',
      imageAlt: '桜に囲まれた雪化粧の富士山',
    },
    th: {
      name: 'ภูเขาไฟฟูจิ',
      region: 'ชูบุ',
      tagline: 'เผื่อเช้าวันหนึ่ง ไว้ให้ภูเขา',
      description:
        'เดินริมทะเลสาบและชมแสงที่เปลี่ยนไปบนภูเขาสัญลักษณ์ของญี่ปุ่น การพักใกล้ทะเลสาบทั้งห้าช่วยเพิ่มโอกาสเห็นฟูจิในวันที่ฟ้าเปิด',
      duration: '1–2 วัน',
      bestTime: 'วันที่ฟ้าเปิดตลอดปี',
      highlights: [
        'เดินเล่นริมทะเลสาบคาวากุจิ',
        'ชมฟูจิจากบริเวณทะเลสาบทั้งห้า',
        'แวะพิพิธภัณฑ์และคาเฟ่ในวันที่เมฆมาก',
      ],
      gettingThere:
        'จากโตเกียวไปคาวากุจิโกะได้ด้วยรถไฟหรือรถบัสทางไกล ตรวจสอบเวลาเดินรถและจองเที่ยวที่คนใช้มากล่วงหน้า',
      tip: 'การชมวิวและการปีนถึงยอดเป็นคนละแผน การปีนมีฤดูกาลเปิด ควรตรวจสอบกฎเส้นทาง การจอง และอากาศจากแหล่งทางการ',
      imageAlt: 'ภูเขาไฟฟูจิยอดหิมะท่ามกลางดอกซากุระสีชมพู',
    },
  },
  {
    slug: 'osaka',
    image: '/images/osaka.jpg',
    japanese: '大阪',
    category: 'city',
    source: 'https://www.japan.travel/en/destinations/kansai/osaka/',
    en: {
      name: 'Osaka',
      region: 'Kansai',
      tagline: 'Follow your appetite.',
      description:
        'Canal-side lights, lively shopping streets and a proud food culture make Osaka an easy city to enjoy. Balance a busy evening in Namba with a slower morning in the castle park.',
      duration: '2–3 days',
      bestTime: 'All year',
      highlights: [
        'Walk the Dotonbori canal in Namba.',
        'Try takoyaki and Osaka-style okonomiyaki.',
        'Explore Osaka Castle Park.',
      ],
      gettingThere:
        'Shinkansen services arrive at Shin-Osaka. JR and Nankai railways connect Kansai International Airport with the city.',
      tip: 'Choose accommodation near the railway line you will use most. Osaka and Shin-Osaka are different stations.',
      imageAlt: 'Dotonbori canal in Osaka lined with colorful shop signs',
    },
    ja: {
      name: '大阪',
      region: '関西',
      tagline: 'おいしいものを、道しるべに。',
      description:
        '川沿いの光、にぎやかな商店街、豊かな食文化。なんばの夜を楽しんだ翌朝は、大阪城公園でゆっくり過ごすのもおすすめです。',
      duration: '2〜3日',
      bestTime: '通年',
      highlights: [
        '道頓堀の川沿いを散策。',
        'たこ焼きや大阪のお好み焼きを味わう。',
        '大阪城公園の緑を楽しむ。',
      ],
      gettingThere:
        '新幹線は新大阪駅に到着します。関西国際空港から市内へはJRや南海電鉄を利用できます。',
      tip: 'よく使う路線に近い宿を選ぶと便利です。大阪駅と新大阪駅は別の駅なので、移動時に確認しましょう。',
      imageAlt: '色鮮やかな看板が並ぶ大阪の道頓堀',
    },
    th: {
      name: 'โอซาก้า',
      region: 'คันไซ',
      tagline: 'ให้อาหารอร่อย พาออกเดินทาง',
      description:
        'แสงริมคลอง ถนนร้านค้าที่มีชีวิตชีวา และอาหารหลากหลาย เพลิดเพลินยามค่ำในนัมบะ แล้วพักผ่อนในสวนปราสาทโอซาก้าตอนเช้า',
      duration: '2–3 วัน',
      bestTime: 'ตลอดปี',
      highlights: [
        'เดินริมคลองโดทงโบริ',
        'ชิมทาโกยากิและโอโคโนมิยากิสไตล์โอซาก้า',
        'พักในพื้นที่สีเขียวของสวนปราสาทโอซาก้า',
      ],
      gettingThere:
        'ชินคันเซ็นจอดที่ชินโอซาก้า จากสนามบินคันไซเข้าเมืองได้ด้วย JR หรือรถไฟนันไค',
      tip: 'เลือกที่พักใกล้สายรถไฟที่ใช้บ่อย สถานีโอซาก้ากับชินโอซาก้าเป็นคนละสถานี',
      imageAlt: 'ป้ายสีสันเรียงรายริมคลองโดทงโบริในโอซาก้า',
    },
  },
  {
    slug: 'hokkaido',
    image: '/images/hokkaido.jpg',
    japanese: '北海道',
    category: 'nature',
    source: 'https://www.japan.travel/en/destinations/hokkaido/hokkaido/',
    en: {
      name: 'Hokkaido',
      region: 'Northern Japan',
      tagline: 'A little more room to breathe.',
      description:
        'Wide landscapes, winter snow and summer flower fields give Japan’s northern island its own rhythm. Choose a small area to explore well instead of trying to see the whole island.',
      duration: '4–7 days',
      bestTime: 'Summer & winter',
      highlights: [
        'Explore Sapporo’s food and parks.',
        'Walk beside the historic Otaru Canal.',
        'Choose a seasonal nature trip to Furano or a ski resort.',
      ],
      gettingThere:
        'New Chitose Airport is a useful gateway to Sapporo. Regional rail and bus connections vary; plan travel between rural areas in advance.',
      tip: 'Allow extra travel time in winter. Snow can disrupt services, and rural distances are substantial.',
      imageAlt: 'Snow-covered countryside and a mountain in Hokkaido',
    },
    ja: {
      name: '北海道',
      region: '日本の北へ',
      tagline: '深呼吸したくなる、大きな景色。',
      description:
        '冬の雪景色、夏の花畑、広がる大地。北海道の旅は、島全体を急いで巡るより、エリアを絞ってゆっくり楽しむのがおすすめです。',
      duration: '4〜7日',
      bestTime: '夏・冬',
      highlights: [
        '札幌の食と公園を楽しむ。',
        '歴史ある小樽運河を散策。',
        '季節に合わせて富良野の自然やスキー場へ。',
      ],
      gettingThere:
        '札幌への玄関口は新千歳空港。地方の鉄道やバスは便数が限られる区間もあるため、事前に移動計画を立てましょう。',
      tip: '冬は積雪による交通への影響を考え、移動に余裕を。地方間の距離が長いことにも注意が必要です。',
      imageAlt: '北海道の雪に覆われた田園風景と山',
    },
    th: {
      name: 'ฮอกไกโด',
      region: 'ญี่ปุ่นตอนเหนือ',
      tagline: 'พื้นที่กว้าง ให้ได้หายใจช้าลง',
      description:
        'ทิวทัศน์เปิดกว้าง หิมะฤดูหนาว และทุ่งดอกไม้ฤดูร้อน ทำให้เกาะทางเหนือมีจังหวะของตัวเอง เลือกสำรวจบางพื้นที่อย่างเต็มที่',
      duration: '4–7 วัน',
      bestTime: 'ฤดูร้อนและฤดูหนาว',
      highlights: [
        'ชิมอาหารและชมสวนในซัปโปโร',
        'เดินริมคลองโอตารุ',
        'เลือกเที่ยวธรรมชาติที่ฟุราโนะหรือสกีรีสอร์ตตามฤดูกาล',
      ],
      gettingThere:
        'สนามบินนิวชิโตเสะเป็นทางเข้าซัปโปโรที่สะดวก รถไฟและรถบัสในชนบทมีความถี่ต่างกัน ควรวางแผนการเดินทางล่วงหน้า',
      tip: 'เผื่อเวลาเดินทางในฤดูหนาว หิมะอาจกระทบการเดินรถ และพื้นที่ชนบทอยู่ห่างกันมาก',
      imageAlt: 'ชนบทและภูเขาของฮอกไกโดปกคลุมด้วยหิมะ',
    },
  },
  {
    slug: 'okinawa',
    image: '/images/okinawa.jpg',
    japanese: '沖縄',
    category: 'coast',
    source: 'https://www.japan.travel/en/destinations/okinawa/okinawa/',
    en: {
      name: 'Okinawa',
      region: 'Southern islands',
      tagline: 'Set your watch to island time.',
      description:
        'Discover a different side of Japan through Ryukyu heritage, island food and clear coastal waters. Choose one island as a base and leave time to simply watch the sea.',
      duration: '3–5 days',
      bestTime: 'Spring to autumn',
      highlights: [
        'Explore Naha and its local food.',
        'Spend a quiet afternoon beside the sea.',
        'Learn about the islands’ Ryukyu culture.',
      ],
      gettingThere:
        'Fly into Naha for the main island. Other islands have separate airports and ferry connections; check the route before booking accommodation.',
      tip: 'Typhoons can affect flights and ferries. Follow local sea conditions and never stand on or touch coral.',
      imageAlt: 'Clear turquoise water along the coast of Okinawa',
    },
    ja: {
      name: '沖縄',
      region: '南の島々',
      tagline: '島の時間に、身をゆだねる。',
      description:
        '琉球の文化、島の料理、透き通る海。拠点となる島を一つ選び、何もしないで海を眺める時間も旅の予定に入れてみましょう。',
      duration: '3〜5日',
      bestTime: '春〜秋',
      highlights: [
        '那覇の街と地元の料理を楽しむ。',
        '海辺で穏やかな午後を過ごす。',
        '島々に伝わる琉球文化に触れる。',
      ],
      gettingThere:
        '沖縄本島へは那覇空港を利用。離島はそれぞれ空港や船の航路が異なるため、宿の予約前にアクセスを確認しましょう。',
      tip: '台風で航空便や船が欠航することがあります。海の状況を確認し、サンゴには触れたり乗ったりしないようにしましょう。',
      imageAlt: '沖縄の海岸に広がる透明な青い海',
    },
    th: {
      name: 'โอกินาว่า',
      region: 'หมู่เกาะทางใต้',
      tagline: 'ใช้เวลา ในจังหวะของเกาะ',
      description:
        'รู้จักญี่ปุ่นอีกมุมผ่านวัฒนธรรมริวกิว อาหารท้องถิ่น และน้ำทะเลใส เลือกเกาะหนึ่งเป็นฐาน แล้วเผื่อเวลานั่งมองทะเล',
      duration: '3–5 วัน',
      bestTime: 'ใบไม้ผลิถึงใบไม้ร่วง',
      highlights: [
        'เที่ยวเมืองนาฮะและชิมอาหารท้องถิ่น',
        'พักผ่อนริมทะเลยามบ่าย',
        'เรียนรู้วัฒนธรรมริวกิวของหมู่เกาะ',
      ],
      gettingThere:
        'บินลงนาฮะสำหรับเกาะหลัก เกาะอื่นมีสนามบินและเรือเชื่อมต่างกัน ควรตรวจสอบเส้นทางก่อนจองที่พัก',
      tip: 'พายุไต้ฝุ่นอาจกระทบเที่ยวบินและเรือ ตรวจสอบสภาพทะเล และไม่ยืนหรือสัมผัสปะการัง',
      imageAlt: 'น้ำทะเลสีฟ้าใสริมชายฝั่งโอกินาว่า',
    },
  },
]

export const regions = [
  {
    id: 'hokkaido',
    en: ['Hokkaido', 'Open landscapes, snow & fresh seafood'],
    ja: ['北海道', '大きな景色、雪、海の幸'],
    th: ['ฮอกไกโด', 'ทิวทัศน์กว้าง หิมะ และอาหารทะเล'],
    path: 'hokkaido/',
  },
  {
    id: 'tohoku',
    en: ['Tohoku', 'Hot springs, mountain trails & local traditions'],
    ja: ['東北', '温泉、山歩き、受け継がれる文化'],
    th: ['โทโฮคุ', 'ออนเซ็น เส้นทางภูเขา และวัฒนธรรมท้องถิ่น'],
    path: 'tohoku/',
  },
  {
    id: 'kanto',
    en: ['Kanto', 'Tokyo, coastal towns & mountain escapes'],
    ja: ['関東', '東京、海辺の街、山への小旅行'],
    th: ['คันโต', 'โตเกียว เมืองริมทะเล และทริปภูเขา'],
    path: 'kanto/',
  },
  {
    id: 'chubu',
    en: ['Chubu', 'Mount Fuji, the Alps & historic towns'],
    ja: ['中部', '富士山、日本アルプス、歴史ある街'],
    th: ['ชูบุ', 'ฟูจิ เจแปนแอลป์ และเมืองประวัติศาสตร์'],
    path: 'hokuriku-shinetsu/',
  },
  {
    id: 'kansai',
    en: ['Kansai', 'Kyoto, Osaka & the ancient capital of Nara'],
    ja: ['関西', '京都、大阪、古都奈良を巡る'],
    th: ['คันไซ', 'เกียวโต โอซาก้า และเมืองหลวงเก่านารา'],
    path: 'kansai/',
  },
  {
    id: 'chugoku',
    en: ['Chugoku', 'Hiroshima, island views & garden towns'],
    ja: ['中国', '広島、瀬戸内の島々、庭園の街'],
    th: ['ชูโกกุ', 'ฮิโรชิมะ เกาะ และเมืองสวนสวย'],
    path: 'chugoku/',
  },
  {
    id: 'shikoku',
    en: ['Shikoku', 'Pilgrimage paths, rivers & coastal cycling'],
    ja: ['四国', 'お遍路、清流、海辺のサイクリング'],
    th: ['ชิโกกุ', 'เส้นทางแสวงบุญ แม่น้ำ และจักรยานริมทะเล'],
    path: 'shikoku/',
  },
  {
    id: 'kyushu',
    en: ['Kyushu', 'Volcanoes, onsen & welcoming food cities'],
    ja: ['九州', '火山、温泉、食を楽しむ街'],
    th: ['คิวชู', 'ภูเขาไฟ ออนเซ็น และเมืองอาหารอร่อย'],
    path: 'kyushu/',
  },
  {
    id: 'okinawa',
    en: ['Okinawa', 'Subtropical islands & Ryukyu heritage'],
    ja: ['沖縄', '亜熱帯の島々と琉球の文化'],
    th: ['โอกินาว่า', 'เกาะกึ่งเขตร้อนและมรดกริวกิว'],
    path: 'okinawa/',
  },
]

export const seasons = [
  {
    id: 'spring',
    kanji: '春',
    image: '/images/fuji.jpg',
    en: {
      name: 'Spring',
      months: 'March – May',
      title: 'A country coming into bloom.',
      description:
        'Follow the blossoms north, from city parks to lakeside paths. Bloom timing varies by region and year; leave room in your plans.',
      note: 'Pack layers for cool mornings.',
      alt: 'Cherry blossoms framing Mount Fuji',
      destination: 'Mount Fuji',
    },
    ja: {
      name: '春',
      months: '3月〜5月',
      title: '花の便りと、旅に出る。',
      description:
        '街の公園から湖畔の道へ、北へと移る桜の季節。開花時期は地域や年によって変わるため、余裕のある計画を。',
      note: '朝晩の冷え込みに重ね着を。',
      alt: '桜の花に囲まれた富士山',
      destination: '富士山',
    },
    th: {
      name: 'ใบไม้ผลิ',
      months: 'มีนาคม – พฤษภาคม',
      title: 'ออกเดินทางไปพร้อมดอกไม้',
      description:
        'ตามดอกไม้จากสวนในเมืองสู่ริมทะเลสาบ ช่วงบานแตกต่างตามพื้นที่และปี ควรเผื่อความยืดหยุ่นให้แผน',
      note: 'เตรียมเสื้อหลายชั้นสำหรับเช้าที่เย็น',
      alt: 'ดอกซากุระล้อมกรอบภูเขาไฟฟูจิ',
      destination: 'ภูเขาไฟฟูจิ',
    },
    slug: 'mount-fuji',
  },
  {
    id: 'summer',
    kanji: '夏',
    image: '/images/okinawa.jpg',
    en: {
      name: 'Summer',
      months: 'June – August',
      title: 'Long days. Island escapes.',
      description:
        'Coastal days and evening festivals bring summer to life. Expect heat, humidity and rainy periods; check typhoon forecasts before island travel.',
      note: 'Plan breaks, shade and drinking water.',
      alt: 'The turquoise sea of Okinawa',
      destination: 'Okinawa',
    },
    ja: {
      name: '夏',
      months: '6月〜8月',
      title: '長い一日を、海辺で。',
      description:
        '海で過ごす時間や夜の祭りが夏の楽しみ。蒸し暑さや梅雨に備え、島への旅は台風情報も確認しましょう。',
      note: '日陰での休憩と水分補給を。',
      alt: '沖縄の青く澄んだ海',
      destination: '沖縄',
    },
    th: {
      name: 'ร้อน',
      months: 'มิถุนายน – สิงหาคม',
      title: 'วันที่ยาวขึ้น กับทริปริมทะเล',
      description:
        'ชายฝั่งและเทศกาลยามเย็นเพิ่มสีสันให้ฤดูร้อน เตรียมรับความร้อน ความชื้น และฝน ตรวจสอบพยากรณ์พายุก่อนเที่ยวเกาะ',
      note: 'เผื่อพักในร่มและดื่มน้ำ',
      alt: 'ทะเลสีฟ้าใสของโอกินาว่า',
      destination: 'โอกินาว่า',
    },
    slug: 'okinawa',
  },
  {
    id: 'autumn',
    kanji: '秋',
    image: '/images/kyoto.jpg',
    en: {
      name: 'Autumn',
      months: 'September – November',
      title: 'Take the scenic way around.',
      description:
        'Cooler walks and autumn colors invite a slower pace. Foliage starts in northern and high-altitude areas, reaching some southern cities into December.',
      note: 'Check local foliage reports before you go.',
      alt: 'A traditional street and pagoda in Kyoto',
      destination: 'Kyoto',
    },
    ja: {
      name: '秋',
      months: '9月〜11月',
      title: '少し遠回りしたくなる季節。',
      description:
        '涼しい風と色づく木々を楽しむ、ゆっくりした旅。紅葉は北や標高の高い場所から始まり、南の街では12月まで続くことも。',
      note: '出発前に現地の紅葉情報を確認。',
      alt: '京都の伝統的な街並みと五重塔',
      destination: '京都',
    },
    th: {
      name: 'ใบไม้ร่วง',
      months: 'กันยายน – พฤศจิกายน',
      title: 'ฤดูกาลที่อยากเดินอ้อมอีกนิด',
      description:
        'อากาศเย็นลงและใบไม้เปลี่ยนสีชวนให้เดินช้า ๆ สีสันเริ่มจากทางเหนือและพื้นที่สูง บางเมืองทางใต้ชมได้ถึงธันวาคม',
      note: 'ตรวจสอบรายงานใบไม้เปลี่ยนสีก่อนเดินทาง',
      alt: 'ถนนดั้งเดิมและเจดีย์ในเกียวโต',
      destination: 'เกียวโต',
    },
    slug: 'kyoto',
  },
  {
    id: 'winter',
    kanji: '冬',
    image: '/images/hokkaido.jpg',
    en: {
      name: 'Winter',
      months: 'December – February',
      title: 'Find warmth in the quiet.',
      description:
        'Snow country, hot springs and warming bowls of noodles make a winter journey memorable. Conditions differ greatly between northern Japan and the southern islands.',
      note: 'Allow extra time for snowy journeys.',
      alt: 'Snowy countryside in Hokkaido',
      destination: 'Hokkaido',
    },
    ja: {
      name: '冬',
      months: '12月〜2月',
      title: '静けさの中に、ぬくもりを。',
      description:
        '雪国の景色、温泉、温かい麺料理。冬ならではの旅を楽しめます。北日本と南の島々では、天候が大きく異なります。',
      note: '雪の季節は移動時間に余裕を。',
      alt: '北海道の雪景色',
      destination: '北海道',
    },
    th: {
      name: 'หนาว',
      months: 'ธันวาคม – กุมภาพันธ์',
      title: 'พบความอุ่น ท่ามกลางความสงบ',
      description:
        'หิมะ ออนเซ็น และบะหมี่ร้อน ๆ เติมความทรงจำให้ทริปฤดูหนาว อากาศทางเหนือแตกต่างจากเกาะทางใต้อย่างมาก',
      note: 'เผื่อเวลาเดินทางในวันที่มีหิมะ',
      alt: 'ชนบทฮอกไกโดในฤดูหิมะ',
      destination: 'ฮอกไกโด',
    },
    slug: 'hokkaido',
  },
]
