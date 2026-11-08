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
    "ko": {
      "name": "교토",
      "region": "간사이",
      "tagline": "조금 더 고요한 길로.",
      "description": "사찰 정원과 목조 가옥, 작은 찻집을 천천히 둘러보세요. 하루에 한 동네씩, 유명 명소 사이에도 여유를 두고 여행해 보세요.",
      "duration": "3~4일",
      "bestTime": "봄과 가을",
      "highlights": [
        "히가시야마와 사찰 골목을 걸어보세요.",
        "도리이가 늘어선 후시미 이나리의 길을 둘러보세요.",
        "아라시야마의 정원과 강변 산책로에도 시간을 내보세요."
      ],
      "gettingThere": "교토역은 도카이도 신칸센 정차역입니다. 지역 열차와 지하철로 각 지역에 이동한 뒤, 가능하면 마지막 구간은 걸어보세요.",
      "tip": "특히 기온에서는 주택가 골목을 막지 말고 촬영 제한을 지켜주세요. 인기 명소는 이른 시간에 방문하세요.",
      "imageAlt": "해 질 무렵 교토의 야사카탑과 전통 목조 가옥"
    },
    "zh-CN": {
      "name": "京都",
      "region": "关西",
      "tagline": "走一条更宁静的路。",
      "description": "寺院庭园、木造町屋和小茶馆值得慢慢欣赏。一次探索一个街区，在知名景点之间留些空闲。",
      "duration": "3至4天",
      "bestTime": "春季和秋季",
      "highlights": [
        "漫步东山及寺院小巷。",
        "探索伏见稻荷鸟居相连的步道。",
        "留些时间游览岚山庭园和河畔步道。"
      ],
      "gettingThere": "京都站位于东海道新干线上。可乘当地列车和地铁前往各区，最后一段路在方便时步行。",
      "tip": "请勿堵塞住宅小巷，并遵守拍摄限制，尤其是在祇园。热门景点宜早点前往。",
      "imageAlt": "暮色中的京都八坂塔与传统木屋"
    },
    "vi": {
      "name": "Kyoto",
      "region": "Kansai",
      "tagline": "Chọn một lối đi yên tĩnh hơn.",
      "description": "Vườn chùa, nhà gỗ truyền thống và quán trà nhỏ rất đáng để khám phá thong thả. Mỗi lần hãy đi một khu phố và dành thời gian nghỉ giữa các điểm nổi tiếng.",
      "duration": "3–4 ngày",
      "bestTime": "Mùa xuân và mùa thu",
      "highlights": [
        "Dạo bước ở Higashiyama và những con ngõ quanh chùa.",
        "Khám phá lối đi với những cổng torii nối tiếp ở Fushimi Inari.",
        "Dành thời gian cho các khu vườn và đường ven sông ở Arashiyama."
      ],
      "gettingThere": "Ga Kyoto nằm trên tuyến Tokaido Shinkansen. Đi tàu địa phương và tàu điện ngầm đến các khu vực, rồi đi bộ đoạn cuối nếu thuận tiện.",
      "tip": "Không chắn lối trong khu dân cư và tuân thủ quy định chụp ảnh, nhất là ở Gion. Hãy đến các điểm nổi tiếng từ sớm.",
      "imageAlt": "Tháp Yasaka và nhà gỗ truyền thống ở Kyoto lúc chạng vạng"
    },
    "fr": {
      "name": "Kyoto",
      "region": "Kansai",
      "tagline": "Prenez un chemin plus paisible.",
      "description": "Jardins de temples, maisons en bois et petits salons de thé se découvrent sans hâte. Explorez un quartier à la fois et gardez du temps entre les sites célèbres.",
      "duration": "3 à 4 jours",
      "bestTime": "Printemps et automne",
      "highlights": [
        "Parcourez Higashiyama et ses ruelles bordées de temples.",
        "Explorez les sentiers bordés de torii de Fushimi Inari.",
        "Prenez le temps de découvrir les jardins et les berges d’Arashiyama."
      ],
      "gettingThere": "La gare de Kyoto est desservie par le Tokaido Shinkansen. Prenez les trains locaux et le métro entre les quartiers, puis marchez sur le dernier tronçon si possible.",
      "tip": "Ne bloquez pas les ruelles résidentielles et respectez les restrictions photo, surtout à Gion. Visitez tôt les sites très fréquentés.",
      "imageAlt": "La pagode Yasaka et des maisons traditionnelles en bois à Kyoto au crépuscule"
    },
    "es": {
      "name": "Kioto",
      "region": "Kansai",
      "tagline": "Elige un camino más tranquilo.",
      "description": "Disfruta sin prisas de jardines de templos, casas de madera y pequeñas teterías. Explora un barrio cada vez y deja tiempo entre los lugares más conocidos.",
      "duration": "3–4 días",
      "bestTime": "Primavera y otoño",
      "highlights": [
        "Pasea por Higashiyama y sus callejuelas de templos.",
        "Explora los senderos de Fushimi Inari bordeados de torii.",
        "Reserva tiempo para los jardines y paseos junto al río de Arashiyama."
      ],
      "gettingThere": "La estación de Kioto está en la línea Tokaido Shinkansen. Usa trenes locales y metro para llegar a cada zona y, cuando sea práctico, recorre a pie el último tramo.",
      "tip": "Deja libres las callejuelas residenciales y respeta las restricciones fotográficas, sobre todo en Gion. Visita temprano los lugares populares.",
      "imageAlt": "La pagoda Yasaka y casas tradicionales de madera de Kioto al anochecer"
    },
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
    "ko": {
      "name": "도쿄",
      "region": "간토",
      "tagline": "작은 세계가 모인 도시.",
      "description": "아사쿠사의 사찰 거리에서 활기찬 시부야로 이동한 뒤 동네 카페에서 쉬어보세요. 도쿄는 지역별로 천천히 둘러볼수록 매력이 드러납니다.",
      "duration": "4~5일",
      "bestTime": "연중",
      "highlights": [
        "센소지와 아사쿠사 거리를 둘러보세요.",
        "메이지 신궁의 숲에서 고요한 시간을 보내세요.",
        "시부야 교차로를 구경하고 주변 상점을 둘러보세요."
      ],
      "gettingThere": "하네다와 나리타 공항은 도심과 철도로 연결됩니다. JR, 지하철, 사철이 각기 다른 지역을 운행하므로 노선 운영사를 확인하세요.",
      "tip": "하루 방문지는 가까운 동네끼리 묶으세요. 역과 출구 사이 거리는 지도에서 보이는 것보다 길 수 있습니다.",
      "imageAlt": "밤에 화려한 간판으로 빛나는 도쿄의 번화한 상점가"
    },
    "zh-CN": {
      "name": "东京",
      "region": "关东",
      "tagline": "一座汇聚许多小天地的城市。",
      "description": "从浅草寺院街道走到活力十足的涩谷，再到街区咖啡馆歇一歇。按街区逐一探索，更能体会东京的魅力。",
      "duration": "4至5天",
      "bestTime": "全年",
      "highlights": [
        "游览浅草寺及浅草街道。",
        "在明治神宫的林地中享受片刻宁静。",
        "看看涩谷十字路口，逛逛周边店铺。"
      ],
      "gettingThere": "羽田和成田机场均有铁路通往市区。JR、地铁和私营铁路服务不同地区，请确认所走路线的运营方。",
      "tip": "把每天的景点按街区安排在一起。车站和出口之间的距离可能比地图上看起来更远。",
      "imageAlt": "夜晚被彩色招牌照亮的东京热闹商店街"
    },
    "vi": {
      "name": "Tokyo",
      "region": "Kanto",
      "tagline": "Một thành phố với nhiều thế giới nhỏ.",
      "description": "Từ phố chùa Asakusa đến Shibuya sôi động, rồi nghỉ chân ở quán cà phê trong khu phố. Khám phá từng khu giúp bạn cảm nhận Tokyo rõ hơn.",
      "duration": "4–5 ngày",
      "bestTime": "Quanh năm",
      "highlights": [
        "Khám phá chùa Sensoji và phố Asakusa.",
        "Tìm chút bình yên trong khu rừng của Meiji Jingu.",
        "Ngắm giao lộ Shibuya và ghé các cửa hàng quanh đó."
      ],
      "gettingThere": "Haneda và Narita đều có tàu vào thành phố. JR, tàu điện ngầm và đường sắt tư nhân phục vụ các khu khác nhau; hãy kiểm tra đơn vị vận hành tuyến của bạn.",
      "tip": "Sắp xếp các điểm mỗi ngày theo khu phố. Khoảng cách giữa ga và lối ra có thể dài hơn bạn thấy trên bản đồ.",
      "imageAlt": "Phố mua sắm Tokyo nhộn nhịp với biển hiệu rực sáng về đêm"
    },
    "fr": {
      "name": "Tokyo",
      "region": "Kanto",
      "tagline": "Une ville aux mille petits univers.",
      "description": "Passez des rues de temples d’Asakusa à l’énergie de Shibuya, puis faites une pause dans un café de quartier. Tokyo se savoure quartier par quartier.",
      "duration": "4 à 5 jours",
      "bestTime": "Toute l’année",
      "highlights": [
        "Découvrez Sensoji et les rues d’Asakusa.",
        "Profitez d’un moment paisible dans les bois de Meiji Jingu.",
        "Découvrez le carrefour de Shibuya et les boutiques du quartier."
      ],
      "gettingThere": "Haneda et Narita sont reliés à la ville par le train. JR, métro et compagnies privées desservent des zones différentes : vérifiez l’opérateur de votre trajet.",
      "tip": "Regroupez les visites de la journée par quartier. Les distances entre les gares et leurs sorties peuvent dépasser ce que suggère la carte.",
      "imageAlt": "Une rue commerçante animée de Tokyo illuminée d’enseignes colorées la nuit"
    },
    "es": {
      "name": "Tokio",
      "region": "Kanto",
      "tagline": "Una ciudad de muchos pequeños mundos.",
      "description": "Pasa de las calles de templos de Asakusa a la energía de Shibuya y descansa en un café del barrio. Tokio se disfruta mejor explorando cada zona con calma.",
      "duration": "4–5 días",
      "bestTime": "Todo el año",
      "highlights": [
        "Explora Sensoji y las calles de Asakusa.",
        "Disfruta de un momento de calma en el recinto arbolado de Meiji Jingu.",
        "Visita el cruce de Shibuya y las tiendas del barrio."
      ],
      "gettingThere": "Haneda y Narita tienen conexiones ferroviarias con la ciudad. JR, metro y líneas privadas cubren distintas zonas; comprueba el operador de tu ruta.",
      "tip": "Agrupa las paradas de cada día por barrio. Las distancias entre estaciones y salidas pueden ser mayores de lo que parecen en el mapa.",
      "imageAlt": "Una animada calle comercial de Tokio iluminada por letreros de colores de noche"
    },
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
    "ko": {
      "name": "후지산",
      "region": "주부",
      "tagline": "산을 만나는 아침에 여유를 두세요.",
      "description": "호숫가 산책과 시시각각 변하는 빛 속에서 일본의 상징인 후지산을 즐겨보세요. 후지 5호 주변에서 숙박하면 맑은 전망을 볼 기회가 늘어납니다.",
      "duration": "1~2일",
      "bestTime": "맑은 날, 연중",
      "highlights": [
        "가와구치호 호숫가를 산책하세요.",
        "주변 호수 지역에서 후지산 전망을 즐겨보세요.",
        "구름이 끼면 지역 박물관과 카페를 찾아보세요."
      ],
      "gettingThere": "도쿄 지역과 가와구치코는 열차와 고속버스로 연결됩니다. 시간표를 확인하고 붐비는 편은 미리 예약하세요.",
      "tip": "관광과 정상 등반은 다른 여행입니다. 등반은 계절에 따라 제한되므로 계획 전에 공식 등산로 규정, 예약, 날씨를 확인하세요.",
      "imageAlt": "분홍 벚꽃 사이로 보이는 눈 덮인 후지산"
    },
    "zh-CN": {
      "name": "富士山",
      "region": "中部",
      "tagline": "为山间的清晨留些时间。",
      "description": "沿湖散步，欣赏光线变化下的日本名山。在富士五湖一带住上一晚，可多一次看到清晰山景的机会。",
      "duration": "1至2天",
      "bestTime": "全年晴朗的日子",
      "highlights": [
        "沿河口湖散步。",
        "从周边湖区欣赏富士山。",
        "云层遮山时，可逛当地博物馆和咖啡馆。"
      ],
      "gettingThere": "东京地区与河口湖之间有列车和高速巴士。请确认时刻表，热门班次提前预订。",
      "tip": "观光与登顶不同。登山有季节限制，计划登顶前请核实官方步道规则、预约要求和天气。",
      "imageAlt": "粉色樱花映衬下的富士山雪顶"
    },
    "vi": {
      "name": "Núi Phú Sĩ",
      "region": "Chubu",
      "tagline": "Dành thời gian cho một buổi sáng bên núi.",
      "description": "Đi bộ ven hồ và ngắm ánh sáng thay đổi là những cách thưởng thức ngọn núi biểu tượng của Nhật Bản. Nghỉ quanh Ngũ Hồ Phú Sĩ giúp bạn có thêm cơ hội ngắm núi khi trời quang.",
      "duration": "1–2 ngày",
      "bestTime": "Ngày trời quang, quanh năm",
      "highlights": [
        "Dạo bên hồ Kawaguchi.",
        "Ngắm Phú Sĩ từ vùng hồ xung quanh.",
        "Ghé bảo tàng và quán cà phê địa phương khi mây kéo đến."
      ],
      "gettingThere": "Có tàu và xe buýt cao tốc nối vùng Tokyo với Kawaguchiko. Kiểm tra lịch chạy và đặt trước các chuyến đông khách.",
      "tip": "Tham quan khác với leo lên đỉnh. Mùa leo núi có giới hạn; hãy kiểm tra quy định đường mòn, đặt chỗ và thời tiết trên nguồn chính thức trước khi lên kế hoạch.",
      "imageAlt": "Đỉnh Phú Sĩ phủ tuyết giữa hoa anh đào hồng"
    },
    "fr": {
      "name": "Mont Fuji",
      "region": "Chubu",
      "tagline": "Gardez du temps pour un matin face à la montagne.",
      "description": "Promenades au bord des lacs et lumières changeantes offrent plusieurs façons d’admirer ce sommet emblématique. Dormir près des cinq lacs du Fuji multiplie les chances de le voir dégagé.",
      "duration": "1 à 2 jours",
      "bestTime": "Par temps dégagé, toute l’année",
      "highlights": [
        "Promenez-vous au bord du lac Kawaguchi.",
        "Admirez le Fuji depuis les lacs voisins.",
        "Quand les nuages arrivent, découvrez les musées et cafés locaux."
      ],
      "gettingThere": "Trains et autocars relient la région de Tokyo à Kawaguchiko. Vérifiez les horaires et réservez les services fréquentés à l’avance.",
      "tip": "La visite touristique diffère de l’ascension. Celle-ci est saisonnière : consultez les règles officielles des sentiers, les réservations et la météo avant de la prévoir.",
      "imageAlt": "Le mont Fuji enneigé encadré de cerisiers roses en fleurs"
    },
    "es": {
      "name": "Monte Fuji",
      "region": "Chubu",
      "tagline": "Reserva tiempo para una mañana junto a la montaña.",
      "description": "Los paseos junto a los lagos y la luz cambiante permiten disfrutar de la montaña más emblemática de Japón. Alojarte cerca de los Cinco Lagos del Fuji te da más oportunidades de verla despejada.",
      "duration": "1–2 días",
      "bestTime": "Días despejados, todo el año",
      "highlights": [
        "Pasea junto al lago Kawaguchi.",
        "Disfruta de las vistas del Fuji desde los lagos de los alrededores.",
        "Cuando lleguen las nubes, descubre los museos y cafés locales."
      ],
      "gettingThere": "Trenes y autobuses de larga distancia conectan Tokio con Kawaguchiko. Consulta los horarios y reserva con antelación los servicios más demandados.",
      "tip": "Una visita turística es distinta de una ascensión a la cima. La escalada es estacional; consulta las normas oficiales de los senderos, las reservas y el tiempo antes de planearla.",
      "imageAlt": "El monte Fuji nevado enmarcado por flores de cerezo rosas"
    },
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
    "ko": {
      "name": "오사카",
      "region": "간사이",
      "tagline": "맛있는 길을 따라가세요.",
      "description": "운하의 불빛, 활기찬 상점가와 풍성한 음식 문화가 오사카의 매력입니다. 난바의 북적이는 저녁 다음에는 성 공원에서 여유로운 아침을 보내세요.",
      "duration": "2~3일",
      "bestTime": "연중",
      "highlights": [
        "난바의 도톤보리 운하를 따라 걸어보세요.",
        "다코야키와 오사카식 오코노미야키를 맛보세요.",
        "오사카성 공원을 둘러보세요."
      ],
      "gettingThere": "신칸센은 신오사카역에 도착합니다. 간사이 국제공항과 시내는 JR과 난카이 철도로 연결됩니다.",
      "tip": "가장 자주 이용할 철도 노선 근처에 숙소를 잡으세요. 오사카역과 신오사카역은 서로 다른 역입니다.",
      "imageAlt": "화려한 간판이 늘어선 오사카 도톤보리 운하"
    },
    "zh-CN": {
      "name": "大阪",
      "region": "关西",
      "tagline": "跟着胃口去旅行。",
      "description": "运河灯光、热闹商店街和引以为豪的美食文化，让大阪轻松好逛。在难波度过热闹夜晚后，可到城堡公园享受悠闲早晨。",
      "duration": "2至3天",
      "bestTime": "全年",
      "highlights": [
        "漫步难波的道顿堀运河。",
        "尝尝章鱼烧和大阪风味御好烧。",
        "游览大阪城公园。"
      ],
      "gettingThere": "新干线停靠新大阪站。JR和南海铁路连接关西国际机场与市区。",
      "tip": "选择靠近常用铁路线的住宿。大阪站和新大阪站是不同车站。",
      "imageAlt": "大阪道顿堀运河两旁的彩色招牌"
    },
    "vi": {
      "name": "Osaka",
      "region": "Kansai",
      "tagline": "Theo chân vị giác.",
      "description": "Ánh đèn ven kênh, phố mua sắm nhộn nhịp và văn hóa ẩm thực phong phú khiến Osaka dễ mến. Sau tối sôi động ở Namba, hãy dành buổi sáng thong thả trong công viên lâu đài.",
      "duration": "2–3 ngày",
      "bestTime": "Quanh năm",
      "highlights": [
        "Dạo bên kênh Dotonbori ở Namba.",
        "Thử takoyaki và okonomiyaki kiểu Osaka.",
        "Khám phá công viên lâu đài Osaka."
      ],
      "gettingThere": "Shinkansen đến ga Shin-Osaka. JR và Nankai nối sân bay quốc tế Kansai với thành phố.",
      "tip": "Chọn chỗ ở gần tuyến tàu bạn dùng nhiều nhất. Osaka và Shin-Osaka là hai ga khác nhau.",
      "imageAlt": "Kênh Dotonbori ở Osaka với biển hiệu rực rỡ hai bên"
    },
    "fr": {
      "name": "Osaka",
      "region": "Kansai",
      "tagline": "Laissez-vous guider par vos envies gourmandes.",
      "description": "Lumières des canaux, rues commerçantes animées et cuisine réputée rendent Osaka agréable à découvrir. Après une soirée animée à Namba, ralentissez le matin au parc du château.",
      "duration": "2 à 3 jours",
      "bestTime": "Toute l’année",
      "highlights": [
        "Longez le canal Dotonbori à Namba.",
        "Goûtez les takoyaki et l’okonomiyaki à la mode d’Osaka.",
        "Explorez le parc du château d’Osaka."
      ],
      "gettingThere": "Le shinkansen arrive à Shin-Osaka. JR et Nankai relient l’aéroport international du Kansai à la ville.",
      "tip": "Choisissez un hébergement près de la ligne que vous utiliserez le plus. Osaka et Shin-Osaka sont deux gares différentes.",
      "imageAlt": "Le canal Dotonbori à Osaka bordé d’enseignes colorées"
    },
    "es": {
      "name": "Osaka",
      "region": "Kansai",
      "tagline": "Déjate guiar por el apetito.",
      "description": "Las luces del canal, las calles comerciales y su orgullosa cultura gastronómica hacen que Osaka sea fácil de disfrutar. Combina una noche animada en Namba con una mañana tranquila en el parque del castillo.",
      "duration": "2–3 días",
      "bestTime": "Todo el año",
      "highlights": [
        "Pasea junto al canal Dotonbori en Namba.",
        "Prueba takoyaki y okonomiyaki al estilo de Osaka.",
        "Explora el parque del castillo de Osaka."
      ],
      "gettingThere": "Los servicios shinkansen llegan a Shin-Osaka. JR y Nankai conectan el aeropuerto internacional de Kansai con la ciudad.",
      "tip": "Elige alojamiento cerca de la línea que más utilizarás. Osaka y Shin-Osaka son estaciones distintas.",
      "imageAlt": "El canal Dotonbori de Osaka rodeado de letreros de colores"
    },
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
    "ko": {
      "name": "홋카이도",
      "region": "일본 북부",
      "tagline": "조금 더 여유롭게 숨 쉬는 곳.",
      "description": "드넓은 풍경과 겨울 눈, 여름 꽃밭이 있는 일본 북쪽 섬은 저마다의 리듬을 지닙니다. 섬 전체를 보려 하기보다 한 지역을 충분히 둘러보세요.",
      "duration": "4~7일",
      "bestTime": "여름과 겨울",
      "highlights": [
        "삿포로의 음식과 공원을 즐겨보세요.",
        "역사 깊은 오타루 운하를 따라 걸어보세요.",
        "계절에 맞춰 후라노 자연 여행이나 스키장을 선택해 보세요."
      ],
      "gettingThere": "신치토세 공항은 삿포로 여행의 편리한 관문입니다. 지역마다 철도와 버스 연결이 다르므로 농촌 지역 간 이동은 미리 계획하세요.",
      "tip": "겨울에는 이동 시간을 넉넉하게 잡으세요. 눈으로 운행이 중단될 수 있고 농촌 지역 간 거리가 상당합니다.",
      "imageAlt": "홋카이도의 눈 덮인 들판과 산"
    },
    "zh-CN": {
      "name": "北海道",
      "region": "日本北部",
      "tagline": "让呼吸多一点空间。",
      "description": "辽阔风景、冬日白雪和夏季花田，赋予日本北方岛屿独特的节奏。选择一小片区域细细探索，无需赶着看完整座岛。",
      "duration": "4至7天",
      "bestTime": "夏季和冬季",
      "highlights": [
        "探索札幌美食和公园。",
        "沿历史悠久的小樽运河漫步。",
        "按季节选择富良野自然之旅或滑雪场。"
      ],
      "gettingThere": "新千岁机场是前往札幌的便利门户。各地铁路和巴士衔接不同，乡间跨区交通请提前安排。",
      "tip": "冬季请多留交通时间。降雪可能影响班次，乡间距离也很远。",
      "imageAlt": "北海道白雪覆盖的乡野与山峰"
    },
    "vi": {
      "name": "Hokkaido",
      "region": "Miền Bắc Nhật Bản",
      "tagline": "Thêm chút không gian để thư thái.",
      "description": "Phong cảnh rộng lớn, tuyết mùa đông và cánh đồng hoa mùa hè tạo nhịp sống riêng cho đảo phía bắc Nhật Bản. Hãy khám phá kỹ một vùng nhỏ thay vì cố đi hết đảo.",
      "duration": "4–7 ngày",
      "bestTime": "Mùa hè và mùa đông",
      "highlights": [
        "Khám phá ẩm thực và công viên Sapporo.",
        "Dạo bên kênh Otaru lịch sử.",
        "Chọn chuyến đi thiên nhiên theo mùa ở Furano hoặc khu trượt tuyết."
      ],
      "gettingThere": "Sân bay New Chitose là cửa ngõ thuận tiện đến Sapporo. Kết nối tàu và xe buýt khác nhau giữa các vùng; hãy lên kế hoạch trước khi đi giữa các vùng nông thôn.",
      "tip": "Dành thêm thời gian di chuyển vào mùa đông. Tuyết có thể làm gián đoạn dịch vụ, còn khoảng cách ở nông thôn khá xa.",
      "imageAlt": "Vùng quê và ngọn núi phủ tuyết ở Hokkaido"
    },
    "fr": {
      "name": "Hokkaido",
      "region": "Nord du Japon",
      "tagline": "Un peu plus d’espace pour respirer.",
      "description": "Grands paysages, neige hivernale et champs de fleurs estivaux donnent son rythme à l’île du nord. Explorez un petit secteur en profondeur plutôt que de vouloir tout voir.",
      "duration": "4 à 7 jours",
      "bestTime": "Été et hiver",
      "highlights": [
        "Découvrez la cuisine et les parcs de Sapporo.",
        "Promenez-vous au bord du canal historique d’Otaru.",
        "Selon la saison, choisissez Furano pour la nature ou une station de ski."
      ],
      "gettingThere": "L’aéroport de New Chitose est une porte d’entrée pratique pour Sapporo. Les liaisons régionales varient : préparez les trajets entre secteurs ruraux à l’avance.",
      "tip": "Prévoyez plus de temps en hiver. La neige peut perturber les services et les distances rurales sont importantes.",
      "imageAlt": "Une campagne enneigée et une montagne à Hokkaido"
    },
    "es": {
      "name": "Hokkaido",
      "region": "Norte de Japón",
      "tagline": "Un poco más de espacio para respirar.",
      "description": "Los grandes paisajes, la nieve invernal y los campos de flores estivales dan un ritmo propio a la isla del norte. Elige una zona pequeña para conocerla bien en lugar de intentar ver toda la isla.",
      "duration": "4–7 días",
      "bestTime": "Verano e invierno",
      "highlights": [
        "Descubre la gastronomía y los parques de Sapporo.",
        "Pasea junto al histórico canal de Otaru.",
        "Según la estación, elige una excursión por la naturaleza de Furano o una estación de esquí."
      ],
      "gettingThere": "El aeropuerto de New Chitose es una entrada práctica a Sapporo. Las conexiones regionales varían; planifica de antemano los desplazamientos entre zonas rurales.",
      "tip": "Calcula más tiempo en invierno. La nieve puede interrumpir los servicios y las distancias rurales son considerables.",
      "imageAlt": "Campos y una montaña cubiertos de nieve en Hokkaido"
    },
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
    "ko": {
      "name": "오키나와",
      "region": "남쪽 섬들",
      "tagline": "섬의 시간에 맞춰보세요.",
      "description": "류큐 유산과 섬 음식, 맑은 바다에서 일본의 또 다른 모습을 만나보세요. 한 섬을 거점으로 정하고 그저 바다를 바라보는 시간도 남겨두세요.",
      "duration": "3~5일",
      "bestTime": "봄부터 가을까지",
      "highlights": [
        "나하와 현지 음식을 즐겨보세요.",
        "바닷가에서 고요한 오후를 보내세요.",
        "섬들의 류큐 문화를 알아보세요."
      ],
      "gettingThere": "본섬은 나하 공항으로 들어갑니다. 다른 섬은 각각 공항과 페리 연결이 다르므로 숙소 예약 전에 경로를 확인하세요.",
      "tip": "태풍은 항공편과 페리에 영향을 줄 수 있습니다. 현지 바다 상황을 따르고 산호 위에 서거나 산호를 만지지 마세요.",
      "imageAlt": "오키나와 해안의 맑은 청록빛 바다"
    },
    "zh-CN": {
      "name": "冲绳",
      "region": "南方群岛",
      "tagline": "把时间调成海岛节奏。",
      "description": "通过琉球文化遗产、岛屿美食和清澈海水，发现日本的另一面。选择一座岛作为基地，留些时间静静看海。",
      "duration": "3至5天",
      "bestTime": "春季至秋季",
      "highlights": [
        "探索那霸及当地美食。",
        "在海边度过宁静的午后。",
        "了解岛上的琉球文化。"
      ],
      "gettingThere": "前往本岛可飞抵那霸。其他岛屿有各自的机场和渡轮线路，预订住宿前请核实路线。",
      "tip": "台风可能影响航班和渡轮。请留意当地海况，切勿踩踏或触碰珊瑚。",
      "imageAlt": "冲绳海岸清澈的碧蓝海水"
    },
    "vi": {
      "name": "Okinawa",
      "region": "Các đảo phía nam",
      "tagline": "Sống chậm theo nhịp đảo.",
      "description": "Khám phá một Nhật Bản khác qua di sản Ryukyu, món ăn đảo và làn nước trong. Chọn một đảo làm điểm lưu trú và dành thời gian chỉ để ngắm biển.",
      "duration": "3–5 ngày",
      "bestTime": "Từ xuân đến thu",
      "highlights": [
        "Khám phá Naha và ẩm thực địa phương.",
        "Tận hưởng buổi chiều yên tĩnh bên biển.",
        "Tìm hiểu văn hóa Ryukyu của các đảo."
      ],
      "gettingThere": "Bay đến Naha để thăm đảo chính. Các đảo khác có sân bay và tuyến phà riêng; kiểm tra lộ trình trước khi đặt chỗ ở.",
      "tip": "Bão có thể ảnh hưởng chuyến bay và phà. Theo dõi tình hình biển tại chỗ; tuyệt đối không đứng lên hoặc chạm vào san hô.",
      "imageAlt": "Làn nước xanh ngọc trong vắt ven biển Okinawa"
    },
    "fr": {
      "name": "Okinawa",
      "region": "Îles du sud",
      "tagline": "Mettez-vous à l’heure des îles.",
      "description": "Découvrez un autre Japon à travers l’héritage des Ryukyu, la cuisine insulaire et les eaux claires. Installez-vous sur une île et gardez du temps pour regarder la mer.",
      "duration": "3 à 5 jours",
      "bestTime": "Du printemps à l’automne",
      "highlights": [
        "Découvrez Naha et sa cuisine locale.",
        "Passez un après-midi paisible au bord de la mer.",
        "Découvrez la culture des Ryukyu."
      ],
      "gettingThere": "Pour l’île principale, arrivez à Naha. Les autres îles ont leurs propres aéroports et ferries : vérifiez le trajet avant de réserver l’hébergement.",
      "tip": "Les typhons peuvent perturber vols et ferries. Suivez les conditions maritimes locales et ne marchez jamais sur les coraux, sans les toucher.",
      "imageAlt": "Des eaux turquoise limpides sur la côte d’Okinawa"
    },
    "es": {
      "name": "Okinawa",
      "region": "Islas del sur",
      "tagline": "Adapta tu reloj al ritmo de las islas.",
      "description": "Descubre otra faceta de Japón a través del patrimonio de Ryukyu, la cocina isleña y sus aguas claras. Elige una isla como base y reserva tiempo para contemplar el mar.",
      "duration": "3–5 días",
      "bestTime": "De primavera a otoño",
      "highlights": [
        "Explora Naha y su gastronomía local.",
        "Pasa una tarde tranquila junto al mar.",
        "Conoce la cultura de Ryukyu de las islas."
      ],
      "gettingThere": "Para la isla principal, vuela a Naha. Las otras islas tienen aeropuertos y conexiones de ferry propios; comprueba la ruta antes de reservar alojamiento.",
      "tip": "Los tifones pueden afectar a vuelos y ferris. Sigue las condiciones locales del mar y nunca pises ni toques el coral.",
      "imageAlt": "Aguas turquesas transparentes en la costa de Okinawa"
    },
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
    "ko": [
      "홋카이도",
      "드넓은 풍경, 눈과 신선한 해산물"
    ],
    "zh-CN": [
      "北海道",
      "辽阔风景、白雪与鲜美海产"
    ],
    "vi": [
      "Hokkaido",
      "Cảnh rộng, tuyết và hải sản tươi"
    ],
    "fr": [
      "Hokkaido",
      "Grands paysages, neige et fruits de mer frais"
    ],
    "es": [
      "Hokkaido",
      "Grandes paisajes, nieve y marisco fresco"
    ],
    en: ['Hokkaido', 'Open landscapes, snow & fresh seafood'],
    ja: ['北海道', '大きな景色、雪、海の幸'],
    th: ['ฮอกไกโด', 'ทิวทัศน์กว้าง หิมะ และอาหารทะเล'],
    path: 'hokkaido/',
  },
  {
    id: 'tohoku',
    "ko": [
      "도호쿠",
      "온천, 산길과 지역 전통"
    ],
    "zh-CN": [
      "东北",
      "温泉、山间步道与地方传统"
    ],
    "vi": [
      "Tohoku",
      "Suối nóng, đường núi và truyền thống địa phương"
    ],
    "fr": [
      "Tohoku",
      "Sources chaudes, sentiers de montagne et traditions locales"
    ],
    "es": [
      "Tohoku",
      "Aguas termales, senderos de montaña y tradiciones locales"
    ],
    en: ['Tohoku', 'Hot springs, mountain trails & local traditions'],
    ja: ['東北', '温泉、山歩き、受け継がれる文化'],
    th: ['โทโฮคุ', 'ออนเซ็น เส้นทางภูเขา และวัฒนธรรมท้องถิ่น'],
    path: 'tohoku/',
  },
  {
    id: 'kanto',
    "ko": [
      "간토",
      "도쿄, 해안 도시와 산속 휴식"
    ],
    "zh-CN": [
      "关东",
      "东京、海滨小城与山间休憩"
    ],
    "vi": [
      "Kanto",
      "Tokyo, thị trấn ven biển và miền núi"
    ],
    "fr": [
      "Kanto",
      "Tokyo, villes côtières et escapades en montagne"
    ],
    "es": [
      "Kanto",
      "Tokio, pueblos costeros y escapadas a la montaña"
    ],
    en: ['Kanto', 'Tokyo, coastal towns & mountain escapes'],
    ja: ['関東', '東京、海辺の街、山への小旅行'],
    th: ['คันโต', 'โตเกียว เมืองริมทะเล และทริปภูเขา'],
    path: 'kanto/',
  },
  {
    id: 'chubu',
    "ko": [
      "주부",
      "후지산, 일본 알프스와 역사 도시"
    ],
    "zh-CN": [
      "中部",
      "富士山、日本阿尔卑斯与历史城镇"
    ],
    "vi": [
      "Chubu",
      "Phú Sĩ, dãy Alps Nhật Bản và phố cổ"
    ],
    "fr": [
      "Chubu",
      "Mont Fuji, Alpes japonaises et villes historiques"
    ],
    "es": [
      "Chubu",
      "Monte Fuji, Alpes japoneses y ciudades históricas"
    ],
    en: ['Chubu', 'Mount Fuji, the Alps & historic towns'],
    ja: ['中部', '富士山、日本アルプス、歴史ある街'],
    th: ['ชูบุ', 'ฟูจิ เจแปนแอลป์ และเมืองประวัติศาสตร์'],
    path: 'hokuriku-shinetsu/',
  },
  {
    id: 'kansai',
    "ko": [
      "간사이",
      "교토, 오사카와 고도 나라"
    ],
    "zh-CN": [
      "关西",
      "京都、大阪与古都奈良"
    ],
    "vi": [
      "Kansai",
      "Kyoto, Osaka và cố đô Nara"
    ],
    "fr": [
      "Kansai",
      "Kyoto, Osaka et l’ancienne capitale Nara"
    ],
    "es": [
      "Kansai",
      "Kioto, Osaka y la antigua capital de Nara"
    ],
    en: ['Kansai', 'Kyoto, Osaka & the ancient capital of Nara'],
    ja: ['関西', '京都、大阪、古都奈良を巡る'],
    th: ['คันไซ', 'เกียวโต โอซาก้า และเมืองหลวงเก่านารา'],
    path: 'kansai/',
  },
  {
    id: 'chugoku',
    "ko": [
      "주고쿠",
      "히로시마, 섬 풍경과 정원 도시"
    ],
    "zh-CN": [
      "中国地区",
      "广岛、岛屿风景与庭园城镇"
    ],
    "vi": [
      "Chugoku",
      "Hiroshima, cảnh đảo và thành phố vườn"
    ],
    "fr": [
      "Chugoku",
      "Hiroshima, paysages insulaires et villes de jardins"
    ],
    "es": [
      "Chugoku",
      "Hiroshima, vistas de islas y ciudades con jardines"
    ],
    en: ['Chugoku', 'Hiroshima, island views & garden towns'],
    ja: ['中国', '広島、瀬戸内の島々、庭園の街'],
    th: ['ชูโกกุ', 'ฮิโรชิมะ เกาะ และเมืองสวนสวย'],
    path: 'chugoku/',
  },
  {
    id: 'shikoku',
    "ko": [
      "시코쿠",
      "순례길, 강과 해안 자전거 여행"
    ],
    "zh-CN": [
      "四国",
      "巡礼步道、河流与海岸骑行"
    ],
    "vi": [
      "Shikoku",
      "Đường hành hương, sông và đạp xe ven biển"
    ],
    "fr": [
      "Shikoku",
      "Chemins de pèlerinage, rivières et vélo côtier"
    ],
    "es": [
      "Shikoku",
      "Rutas de peregrinación, ríos y ciclismo costero"
    ],
    en: ['Shikoku', 'Pilgrimage paths, rivers & coastal cycling'],
    ja: ['四国', 'お遍路、清流、海辺のサイクリング'],
    th: ['ชิโกกุ', 'เส้นทางแสวงบุญ แม่น้ำ และจักรยานริมทะเล'],
    path: 'shikoku/',
  },
  {
    id: 'kyushu',
    "ko": [
      "규슈",
      "화산, 온천과 따뜻한 음식 도시"
    ],
    "zh-CN": [
      "九州",
      "火山、温泉与热情的美食城市"
    ],
    "vi": [
      "Kyushu",
      "Núi lửa, suối nóng và thành phố ẩm thực thân thiện"
    ],
    "fr": [
      "Kyushu",
      "Volcans, onsen et villes gourmandes accueillantes"
    ],
    "es": [
      "Kyushu",
      "Volcanes, onsen y acogedoras ciudades gastronómicas"
    ],
    en: ['Kyushu', 'Volcanoes, onsen & welcoming food cities'],
    ja: ['九州', '火山、温泉、食を楽しむ街'],
    th: ['คิวชู', 'ภูเขาไฟ ออนเซ็น และเมืองอาหารอร่อย'],
    path: 'kyushu/',
  },
  {
    id: 'okinawa',
    "ko": [
      "오키나와",
      "아열대 섬과 류큐 유산"
    ],
    "zh-CN": [
      "冲绳",
      "亚热带岛屿与琉球遗产"
    ],
    "vi": [
      "Okinawa",
      "Đảo cận nhiệt và di sản Ryukyu"
    ],
    "fr": [
      "Okinawa",
      "Îles subtropicales et héritage des Ryukyu"
    ],
    "es": [
      "Okinawa",
      "Islas subtropicales y patrimonio de Ryukyu"
    ],
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
    "ko": {
      "name": "봄",
      "months": "3월~5월",
      "title": "꽃으로 물드는 나라.",
      "description": "도시 공원에서 호숫가 길까지, 꽃을 따라 북쪽으로 여행해 보세요. 개화 시기는 지역과 해마다 다르므로 일정에 여유를 두세요.",
      "note": "선선한 아침에 대비해 겹쳐 입을 옷을 챙기세요.",
      "alt": "벚꽃 사이로 보이는 후지산",
      "destination": "후지산"
    },
    "zh-CN": {
      "name": "春季",
      "months": "3月至5月",
      "title": "繁花渐开的国度。",
      "description": "从城市公园到湖畔步道，随花期一路向北。开花时间因地区和年份而异，请保留行程弹性。",
      "note": "准备可叠穿的衣物，应对清凉早晨。",
      "alt": "樱花映衬的富士山",
      "destination": "富士山"
    },
    "vi": {
      "name": "Mùa xuân",
      "months": "Tháng 3 – tháng 5",
      "title": "Đất nước vào mùa hoa.",
      "description": "Theo mùa hoa về phía bắc, từ công viên thành phố đến đường ven hồ. Thời điểm hoa nở thay đổi theo vùng và năm; hãy giữ lịch trình linh hoạt.",
      "note": "Mang đồ mặc nhiều lớp cho sáng se lạnh.",
      "alt": "Hoa anh đào bên núi Phú Sĩ",
      "destination": "Núi Phú Sĩ"
    },
    "fr": {
      "name": "Printemps",
      "months": "Mars à mai",
      "title": "Un pays qui s’éveille en fleurs.",
      "description": "Suivez les fleurs vers le nord, des parcs urbains aux chemins des lacs. La floraison varie selon la région et l’année : gardez de la souplesse.",
      "note": "Prévoyez plusieurs couches pour les matins frais.",
      "alt": "Le mont Fuji encadré de cerisiers en fleurs",
      "destination": "Mont Fuji"
    },
    "es": {
      "name": "Primavera",
      "months": "Marzo – mayo",
      "title": "Un país que florece.",
      "description": "Sigue las flores hacia el norte, desde parques urbanos hasta senderos junto a lagos. La floración varía según la región y el año; deja margen en tus planes.",
      "note": "Lleva ropa por capas para las mañanas frescas.",
      "alt": "El monte Fuji enmarcado por cerezos en flor",
      "destination": "Monte Fuji"
    },
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
    "ko": {
      "name": "여름",
      "months": "6월~8월",
      "title": "긴 낮, 섬으로의 여행.",
      "description": "해변의 낮과 저녁 축제가 여름에 활기를 더합니다. 더위와 습기, 비 오는 시기에 대비하고 섬 여행 전에 태풍 예보를 확인하세요.",
      "note": "휴식과 그늘, 마실 물을 준비하세요.",
      "alt": "오키나와의 청록빛 바다",
      "destination": "오키나와"
    },
    "zh-CN": {
      "name": "夏季",
      "months": "6月至8月",
      "title": "悠长白昼，海岛之旅。",
      "description": "海滨白昼与夜间祭典让夏日充满活力。需应对炎热、潮湿和雨期，前往岛屿前请查看台风预报。",
      "note": "安排休息、遮阴和饮用水。",
      "alt": "冲绳的碧蓝海水",
      "destination": "冲绳"
    },
    "vi": {
      "name": "Mùa hè",
      "months": "Tháng 6 – tháng 8",
      "title": "Ngày dài, chuyến đi đảo.",
      "description": "Ngày bên biển và lễ hội buổi tối làm mùa hè thêm sống động. Chuẩn bị cho nóng ẩm và mưa; xem dự báo bão trước khi đi đảo.",
      "note": "Lên kế hoạch nghỉ, tìm bóng râm và uống nước.",
      "alt": "Biển xanh ngọc Okinawa",
      "destination": "Okinawa"
    },
    "fr": {
      "name": "Été",
      "months": "Juin à août",
      "title": "Longues journées, escapades insulaires.",
      "description": "Journées au bord de l’eau et fêtes du soir animent l’été. Attendez-vous à la chaleur, à l’humidité et à la pluie ; consultez les prévisions de typhons avant de partir sur les îles.",
      "note": "Prévoyez des pauses, de l’ombre et de l’eau potable.",
      "alt": "La mer turquoise d’Okinawa",
      "destination": "Okinawa"
    },
    "es": {
      "name": "Verano",
      "months": "Junio – agosto",
      "title": "Días largos y escapadas a las islas.",
      "description": "Los días de costa y los festivales nocturnos animan el verano. Cuenta con calor, humedad y periodos de lluvia; consulta la previsión de tifones antes de viajar a las islas.",
      "note": "Planifica descansos, sombra y agua potable.",
      "alt": "El mar turquesa de Okinawa",
      "destination": "Okinawa"
    },
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
    "ko": {
      "name": "가을",
      "months": "9월~11월",
      "title": "풍경 좋은 길로 돌아가세요.",
      "description": "선선한 산책과 단풍을 여유롭게 즐겨보세요. 단풍은 북쪽과 고지대에서 시작해 남부 일부 도시에서는 12월까지 이어집니다.",
      "note": "출발 전에 현지 단풍 소식을 확인하세요.",
      "alt": "교토의 전통 거리와 탑",
      "destination": "교토"
    },
    "zh-CN": {
      "name": "秋季",
      "months": "9月至11月",
      "title": "绕行一段风景更好的路。",
      "description": "凉爽天气和秋色适合放慢脚步。红叶从北方与高海拔地区开始，部分南方城市可持续到12月。",
      "note": "出发前查看当地红叶信息。",
      "alt": "京都的传统街道与佛塔",
      "destination": "京都"
    },
    "vi": {
      "name": "Mùa thu",
      "months": "Tháng 9 – tháng 11",
      "title": "Chọn đường vòng ngắm cảnh.",
      "description": "Trời mát và sắc thu mời gọi bước chân chậm rãi. Lá đổi màu từ vùng bắc và vùng cao, có nơi ở thành phố phía nam kéo dài đến tháng 12.",
      "note": "Xem thông tin lá thu địa phương trước khi đi.",
      "alt": "Phố truyền thống và tháp ở Kyoto",
      "destination": "Kyoto"
    },
    "fr": {
      "name": "Automne",
      "months": "Septembre à novembre",
      "title": "Choisissez le chemin des beaux paysages.",
      "description": "La fraîcheur et les couleurs d’automne invitent à ralentir. Les feuillages commencent au nord et en altitude, puis atteignent certaines villes du sud jusqu’en décembre.",
      "note": "Consultez les bulletins locaux sur les feuillages avant de partir.",
      "alt": "Une rue traditionnelle et une pagode à Kyoto",
      "destination": "Kyoto"
    },
    "es": {
      "name": "Otoño",
      "months": "Septiembre – noviembre",
      "title": "Elige la ruta con mejores vistas.",
      "description": "El aire fresco y los colores otoñales invitan a caminar despacio. El cambio de hojas empieza al norte y en altura y llega a algunas ciudades del sur hasta diciembre.",
      "note": "Consulta los informes locales del follaje antes de ir.",
      "alt": "Una calle tradicional y una pagoda en Kioto",
      "destination": "Kioto"
    },
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
    "ko": {
      "name": "겨울",
      "months": "12월~2월",
      "title": "고요 속에서 온기를 찾아보세요.",
      "description": "눈의 고장, 온천과 따뜻한 면 요리가 겨울 여행의 추억을 만듭니다. 일본 북부와 남쪽 섬의 날씨는 크게 다릅니다.",
      "note": "눈길 이동에는 시간을 더 잡으세요.",
      "alt": "홋카이도의 눈 덮인 들판",
      "destination": "홋카이도"
    },
    "zh-CN": {
      "name": "冬季",
      "months": "12月至2月",
      "title": "在宁静中寻找温暖。",
      "description": "雪国、温泉和热腾腾的面食让冬日之旅难忘。日本北部与南方岛屿的情况差异很大。",
      "note": "雪天出行请多留时间。",
      "alt": "北海道的雪乡",
      "destination": "北海道"
    },
    "vi": {
      "name": "Mùa đông",
      "months": "Tháng 12 – tháng 2",
      "title": "Tìm hơi ấm trong yên bình.",
      "description": "Vùng tuyết, suối nóng và bát mì ấm làm chuyến đi mùa đông đáng nhớ. Điều kiện ở miền bắc Nhật Bản và các đảo phía nam rất khác nhau.",
      "note": "Dành thêm thời gian khi di chuyển trên tuyết.",
      "alt": "Vùng quê phủ tuyết ở Hokkaido",
      "destination": "Hokkaido"
    },
    "fr": {
      "name": "Hiver",
      "months": "Décembre à février",
      "title": "Trouvez la chaleur dans le calme.",
      "description": "Pays de neige, sources chaudes et bols de nouilles fumants rendent l’hiver mémorable. Les conditions diffèrent fortement entre le nord du Japon et les îles du sud.",
      "note": "Prévoyez plus de temps pour les trajets enneigés.",
      "alt": "La campagne enneigée d’Hokkaido",
      "destination": "Hokkaido"
    },
    "es": {
      "name": "Invierno",
      "months": "Diciembre – febrero",
      "title": "Encuentra calidez en la tranquilidad.",
      "description": "Las regiones nevadas, las aguas termales y los platos de fideos calientes hacen memorable el invierno. Las condiciones varían mucho entre el norte de Japón y las islas del sur.",
      "note": "Calcula más tiempo para los viajes con nieve.",
      "alt": "Campos nevados de Hokkaido",
      "destination": "Hokkaido"
    },
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
