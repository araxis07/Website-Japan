import type { Locale } from '@/i18n/config'

type Localized<T> = Record<Locale, T>
export const experiences = [
  {
    kanji: '茶',
    image: '/images/tea.jpg',
    source: 'https://www.japan.travel/en/guide/tea-ceremony/',
    en: {
      title: 'A moment for tea',
      text: 'Slow down with a bowl of matcha. A guided tea experience opens a small window into Japanese hospitality; check the language and booking requirements.',
    },
"ko": {
  "title": "차 한 잔의 여유",
  "text": "말차 한 잔과 함께 속도를 늦춰 보세요. 안내가 있는 다도 체험은 일본의 환대를 엿볼 기회입니다. 진행 언어와 예약 요건을 확인하세요."
},
"zh-CN": {
  "title": "一盏茶的时光",
  "text": "用一碗抹茶放慢脚步。有讲解的茶体验让您了解日本待客文化；请确认语言和预约要求。"
},
"vi": {
  "title": "Khoảnh khắc bên tách trà",
  "text": "Chậm lại với một bát matcha. Trải nghiệm trà có hướng dẫn giúp bạn hiểu thêm lòng hiếu khách Nhật Bản; kiểm tra ngôn ngữ và yêu cầu đặt chỗ."
},
"fr": {
  "title": "Un moment autour du thé",
  "text": "Ralentissez autour d’un bol de matcha. Une expérience guidée du thé révèle l’hospitalité japonaise ; vérifiez la langue et les conditions de réservation."
},
"es": {
  "title": "Un momento para el té",
  "text": "Baja el ritmo con un cuenco de matcha. Una experiencia de té guiada permite conocer la hospitalidad japonesa; comprueba el idioma y los requisitos de reserva."
},
    ja: {
      title: '一服のお茶と、静かな時間',
      text: '抹茶を味わいながら、もてなしの心に触れるひととき。茶道体験は、対応言語や予約の要否を事前に確認しましょう。',
    },
    th: {
      title: 'พักสักครู่ กับชาหนึ่งถ้วย',
      text: 'ค่อย ๆ ดื่มมัทฉะและเรียนรู้การต้อนรับแบบญี่ปุ่นผ่านประสบการณ์ชงชา ตรวจสอบภาษาที่ให้บริการและการจอง',
    },
  },
  {
    kanji: '食',
    image: '/images/food.jpg',
    source: 'https://www.japan.travel/en/destinations/kansai/osaka/',
    en: {
      title: 'Let your appetite lead',
      text: 'Takoyaki in Osaka, noodles in a neighborhood shop, a seasonal sweet with tea. Choose a few local tastes and enjoy them where the shop asks you to eat.',
    },
"ko": {
  "title": "입맛을 따라 떠나기",
  "text": "오사카 다코야키, 동네 가게의 면 요리, 차와 함께하는 계절 과자. 현지 음식을 몇 가지 골라 가게가 안내하는 장소에서 즐기세요."
},
"zh-CN": {
  "title": "跟着味蕾出发",
  "text": "大阪章鱼烧、街坊面馆、配茶的时令甜点。挑选几种当地味道，并在店家指定的地方享用。"
},
"vi": {
  "title": "Để vị giác dẫn lối",
  "text": "Takoyaki ở Osaka, mì tại quán nhỏ, bánh theo mùa cùng trà. Chọn vài hương vị địa phương và ăn tại nơi cửa hàng hướng dẫn."
},
"fr": {
  "title": "Laissez parler votre gourmandise",
  "text": "Takoyaki à Osaka, nouilles dans une petite échoppe, douceur de saison avec du thé : choisissez quelques saveurs locales et dégustez-les là où le commerçant vous l’indique."
},
"es": {
  "title": "Déjate guiar por el apetito",
  "text": "Takoyaki en Osaka, fideos en un local de barrio o un dulce de temporada con té. Prueba algunos sabores locales y come donde indique el establecimiento."
},
    ja: {
      title: 'おいしいものを、道しるべに',
      text: '大阪のたこ焼き、街の麺料理、季節の和菓子。地域ならではの味を少しずつ。飲食は店が案内する場所で楽しみましょう。',
    },
    th: {
      title: 'ให้ความหิวช่วยเลือกทาง',
      text: 'ทาโกยากิในโอซาก้า ร้านบะหมี่ในย่าน หรือขนมตามฤดู เลือกชิมรสท้องถิ่นและรับประทานในพื้นที่ที่ร้านกำหนด',
    },
  },
  {
    kanji: '湯',
    image: '/images/onsen.jpg',
    source: 'https://faq.japan-travel.jnto.go.jp/en/guide/how-to-best-enjoy-onsen/',
    en: {
      title: 'The art of doing less',
      text: 'Make a bath part of the journey. Wash before entering an onsen, keep towels out of the water, and ask each facility about tattoos and private bathing.',
    },
"ko": {
  "title": "덜 하는 여행의 미학",
  "text": "온천욕도 여정에 넣어 보세요. 입욕 전에 몸을 씻고 수건을 물에 넣지 마세요. 문신과 전세탕 이용은 시설별로 문의하세요."
},
"zh-CN": {
  "title": "少即是多的旅行",
  "text": "让泡汤成为旅途的一部分。入池前先洗净身体，毛巾不要入水，并向各设施确认纹身和私人浴池规定。"
},
"vi": {
  "title": "Nghệ thuật sống chậm",
  "text": "Dành một phần chuyến đi cho việc tắm. Tắm sạch trước khi vào onsen, không nhúng khăn vào nước và hỏi từng cơ sở về hình xăm, phòng tắm riêng."
},
"fr": {
  "title": "L’art d’en faire moins",
  "text": "Intégrez le bain au voyage. Lavez-vous avant l’onsen, gardez les serviettes hors de l’eau et renseignez-vous sur les tatouages et bains privés auprès de chaque établissement."
},
"es": {
  "title": "El arte de hacer menos",
  "text": "Incluye un baño en el viaje. Lávate antes de entrar al onsen, deja las toallas fuera del agua y consulta en cada centro las normas sobre tatuajes y baños privados."
},
    ja: {
      title: '何もしない、温泉の時間',
      text: '旅の途中に、湯につかるひとときを。入浴前に体を洗い、タオルは湯船の外へ。タトゥーや貸切風呂の利用条件は施設ごとに確認を。',
    },
    th: {
      title: 'ศิลปะของการพัก ในออนเซ็น',
      text: 'เพิ่มเวลาแช่น้ำในทริป ล้างตัวก่อนลงบ่อ เก็บผ้าขนหนูไว้นอกน้ำ และสอบถามเรื่องรอยสักกับบ่อส่วนตัวเป็นรายแห่ง',
    },
  },
  {
    kanji: '街',
    image: '/images/tokyo.jpg',
    source: 'https://www.japan.travel/en/destinations/kanto/tokyo/',
    en: {
      title: 'One neighborhood at a time',
      text: 'Trade a cross-city checklist for a morning on foot. Browse small shops, pause in a café and notice the change from a busy avenue to a quiet side street.',
    },
"ko": {
  "title": "한 번에 한 동네씩",
  "text": "도시를 가로지르는 체크리스트 대신 아침 도보 여행을 해 보세요. 작은 가게를 둘러보고 카페에서 쉬며 큰길에서 조용한 골목으로 바뀌는 풍경을 느껴 보세요."
},
"zh-CN": {
  "title": "一次细逛一个街区",
  "text": "用一个步行的早晨代替横穿全城的打卡表。逛小店、在咖啡馆歇脚，感受繁忙大街与安静小巷之间的变化。"
},
"vi": {
  "title": "Mỗi lần một khu phố",
  "text": "Thay danh sách chạy khắp thành phố bằng một buổi sáng đi bộ. Ghé cửa hàng nhỏ, nghỉ ở quán cà phê và cảm nhận từ đại lộ nhộn nhịp sang ngõ yên tĩnh."
},
"fr": {
  "title": "Un quartier à la fois",
  "text": "Remplacez la course à travers la ville par une matinée à pied. Parcourez les petites boutiques, faites une pause au café et observez le passage d’une avenue animée à une ruelle calme."
},
"es": {
  "title": "Un barrio cada vez",
  "text": "Cambia la lista de visitas por toda la ciudad por una mañana a pie. Explora pequeñas tiendas, descansa en un café y observa el contraste entre una avenida animada y una calle tranquila."
},
    ja: {
      title: '一つの街を、深く歩く',
      text: 'チェックリストを少し短くして、街を歩く朝に。小さな店をのぞき、カフェで休み、大通りと路地の表情の違いを楽しみましょう。',
    },
    th: {
      title: 'รู้จักเมือง ทีละย่าน',
      text: 'เผื่อเช้าวันหนึ่งให้การเดินเล่น แวะร้านเล็ก นั่งคาเฟ่ และสังเกตความต่างระหว่างถนนใหญ่กับตรอกเงียบ',
    },
  },
  {
    kanji: '山',
    image: '/images/fuji.jpg',
    source: 'https://www.japan.travel/en/fuji-guide/',
    en: {
      title: 'Find a different perspective',
      text: 'A lakeside path can be as rewarding as a summit. Choose an outing that fits the weather and your ability; mountain climbing needs a separate, carefully checked plan.',
    },
"ko": {
  "title": "다른 시선 발견하기",
  "text": "호숫길도 정상 못지않게 좋을 수 있습니다. 날씨와 체력에 맞는 코스를 고르세요. 등산은 별도로 꼼꼼하게 검토한 계획이 필요합니다."
},
"zh-CN": {
  "title": "换个角度看风景",
  "text": "湖畔小径也能像山顶一样令人满足。请选择适合天气与体力的行程；登山需要另外认真核实和准备。"
},
"vi": {
  "title": "Tìm một góc nhìn khác",
  "text": "Đường ven hồ cũng có thể thú vị như đỉnh núi. Chọn chuyến phù hợp thời tiết và thể lực; leo núi cần kế hoạch riêng được kiểm tra kỹ."
},
"fr": {
  "title": "Changer de perspective",
  "text": "Un sentier au bord d’un lac peut valoir un sommet. Choisissez une sortie adaptée au temps et à vos capacités ; l’ascension exige un projet distinct soigneusement vérifié."
},
"es": {
  "title": "Descubre otra perspectiva",
  "text": "Un paseo junto al lago puede ser tan gratificante como una cumbre. Elige según el tiempo y tu capacidad; subir montañas exige un plan aparte cuidadosamente comprobado."
},
    ja: {
      title: '少し違う角度から、山を見る',
      text: '頂上だけでなく、湖畔の道にも山の魅力があります。天候や体力に合う散策を。登山をする場合は、別途、入念な計画が必要です。',
    },
    th: {
      title: 'ชมภูเขา จากอีกมุมหนึ่ง',
      text: 'เส้นทางริมทะเลสาบก็น่าจดจำได้ เลือกกิจกรรมตามอากาศและกำลังของตัวเอง หากจะปีนเขาควรวางแผนเฉพาะอย่างรอบคอบ',
    },
  },
  {
    kanji: '海',
    image: '/images/okinawa.jpg',
    source: 'https://www.japan.travel/en/destinations/okinawa/okinawa/',
    en: {
      title: 'Move at the island’s pace',
      text: 'Listen to local stories, discover Ryukyu food and leave an afternoon by the sea. Respect marine life and follow local advice about water conditions.',
    },
"ko": {
  "title": "섬의 속도로 여행하기",
  "text": "현지 이야기를 듣고 류큐 음식을 맛보며 바닷가에서 오후를 보내 보세요. 해양 생물을 존중하고 바다 상태에 관한 현지 안내를 따르세요."
},
"zh-CN": {
  "title": "跟随岛屿的节奏",
  "text": "听当地故事、探索琉球美食，在海边留一个下午。尊重海洋生物，并遵从当地关于水域状况的建议。"
},
"vi": {
  "title": "Theo nhịp sống của đảo",
  "text": "Lắng nghe chuyện địa phương, khám phá món Ryukyu và dành buổi chiều bên biển. Tôn trọng sinh vật biển và theo hướng dẫn địa phương về điều kiện nước."
},
"fr": {
  "title": "Au rythme de l’île",
  "text": "Écoutez les récits locaux, découvrez la cuisine des Ryukyu et gardez un après-midi au bord de la mer. Respectez la vie marine et les conseils locaux sur l’état de l’eau."
},
"es": {
  "title": "Al ritmo de la isla",
  "text": "Escucha historias locales, descubre la cocina de Ryukyu y deja una tarde para el mar. Respeta la vida marina y sigue los consejos locales sobre el agua."
},
    ja: {
      title: '島のリズムで、過ごす',
      text: '島の話に耳を傾け、琉球の料理を味わい、海辺で午後を過ごす。海の生きものを大切にし、遊泳は現地の案内に従いましょう。',
    },
    th: {
      title: 'เดินตามจังหวะของเกาะ',
      text: 'ฟังเรื่องราวท้องถิ่น ชิมอาหารริวกิว และพักริมทะเล เคารพสัตว์ทะเลและปฏิบัติตามคำแนะนำเรื่องสภาพน้ำ',
    },
  },
]

type Stop = { slug: string; days: number } & Localized<{
  title: string
  text: string
}>
type Journey = { days: number; image: string; stops: Stop[] } & Localized<{
  title: string
  text: string
  transport: string
}>
export const journeys: Journey[] = [
  {
    days: 7,
    image: '/images/kyoto.jpg',
    en: {
      title: 'A first taste of Japan',
      text: 'City energy, temple mornings and an Osaka evening. Arrive in Tokyo and depart from the Kansai area to keep backtracking to a minimum.',
      transport:
        'Tokyo → Kyoto by shinkansen; Kyoto → Osaka by local or limited-express train.',
    },
"ko": {
  "title": "처음 만나는 일본",
  "text": "도시의 활기, 사찰의 아침과 오사카의 저녁. 도쿄로 입국하고 간사이에서 출국하면 되돌아가는 이동을 줄일 수 있습니다.",
  "transport": "도쿄 → 교토는 신칸센, 교토 → 오사카는 일반 또는 특급 열차."
},
"zh-CN": {
  "title": "初识日本",
  "text": "城市活力、寺院清晨与大阪夜色。从东京入境、关西离境，尽量减少折返。",
  "transport": "东京至京都乘新干线；京都至大阪乘普通或特急列车。"
},
"vi": {
  "title": "Lần đầu khám phá Nhật Bản",
  "text": "Nhịp đô thị, buổi sáng ở chùa và tối Osaka. Đến Tokyo, rời Nhật từ Kansai để giảm đi ngược đường.",
  "transport": "Tokyo → Kyoto bằng shinkansen; Kyoto → Osaka bằng tàu địa phương hoặc tốc hành."
},
"fr": {
  "title": "Première découverte du Japon",
  "text": "Énergie urbaine, matins au temple et soirée à Osaka. Arrivez à Tokyo et repartez du Kansai pour limiter les retours en arrière.",
  "transport": "Tokyo → Kyoto en shinkansen ; Kyoto → Osaka en train local ou express."
},
"es": {
  "title": "Un primer encuentro con Japón",
  "text": "Energía urbana, mañanas en templos y una noche en Osaka. Llega a Tokio y sal por Kansai para reducir los retrocesos.",
  "transport": "Tokio → Kioto en shinkansen; Kioto → Osaka en tren local o expreso."
},
    ja: {
      title: 'はじめての日本、街と古都へ',
      text: '都会の活気、寺院の朝、大阪の夜。東京に到着し、関西から出発する旅程なら、移動の重複を抑えられます。',
      transport: '東京から京都は新幹線、京都から大阪は在来線などで移動。',
    },
    th: {
      title: 'ญี่ปุ่นครั้งแรก เมืองใหญ่และเมืองเก่า',
      text: 'ความคึกคักในเมือง เช้าวันเที่ยววัด และค่ำคืนในโอซาก้า เข้าทางโตเกียวและกลับจากคันไซเพื่อลดการย้อนทาง',
      transport:
        'โตเกียว → เกียวโตด้วยชินคันเซ็น; เกียวโต → โอซาก้าด้วยรถไฟท้องถิ่นหรือด่วนพิเศษ',
    },
    stops: [
      {
        slug: 'tokyo',
        days: 3,
        en: {
          title: 'Tokyo',
          text: 'Use the first day to settle in. Pair Asakusa with nearby walks, and give Shibuya and Meiji Jingu a separate day.',
        },
"ko": {
  "title": "도쿄",
  "text": "첫날은 적응하는 시간으로 쓰세요. 아사쿠사와 주변 산책을 묶고 시부야와 메이지 신궁은 다른 날에 방문하세요."
},
"zh-CN": {
  "title": "东京",
  "text": "第一天先适应环境。浅草与附近散步一起安排，涩谷和明治神宫另留一天。"
},
"vi": {
  "title": "Tokyo",
  "text": "Dùng ngày đầu để ổn định. Kết hợp Asakusa với đi bộ gần đó; dành ngày riêng cho Shibuya và Meiji Jingu."
},
"fr": {
  "title": "Tokyo",
  "text": "Installez-vous le premier jour. Associez Asakusa aux promenades voisines et réservez une autre journée à Shibuya et Meiji Jingu."
},
"es": {
  "title": "Tokio",
  "text": "Dedica el primer día a instalarte. Combina Asakusa con paseos cercanos y reserva otro día para Shibuya y Meiji Jingu."
},
        ja: {
          title: '東京',
          text: '初日は体を休めながら街に慣れる時間に。浅草周辺と、渋谷・明治神宮は別の日にゆっくり巡りましょう。',
        },
        th: {
          title: 'โตเกียว',
          text: 'ใช้วันแรกพักและปรับตัว เที่ยวอาซากุสะกับพื้นที่ใกล้กัน แล้วแยกชิบูย่าและศาลเจ้าเมจิไว้อีกวัน',
        },
      },
      {
        slug: 'kyoto',
        days: 3,
        en: {
          title: 'Kyoto',
          text: 'Travel west, then choose one district per day: Higashiyama, Arashiyama or the Fushimi area.',
        },
"ko": {
  "title": "교토",
  "text": "서쪽으로 이동한 뒤 히가시야마, 아라시야마, 후시미 중 하루에 한 지역을 선택하세요."
},
"zh-CN": {
  "title": "京都",
  "text": "向西旅行后，每天选一个区域：东山、岚山或伏见。"
},
"vi": {
  "title": "Kyoto",
  "text": "Đi về phía tây rồi chọn một khu mỗi ngày: Higashiyama, Arashiyama hoặc Fushimi."
},
"fr": {
  "title": "Kyoto",
  "text": "Partez vers l’ouest, puis choisissez un quartier par jour : Higashiyama, Arashiyama ou Fushimi."
},
"es": {
  "title": "Kioto",
  "text": "Viaja al oeste y elige un distrito por día: Higashiyama, Arashiyama o Fushimi."
},
        ja: {
          title: '京都',
          text: '西へ移動したら、東山、嵐山、伏見など、一日一つのエリアを目安に散策。',
        },
        th: {
          title: 'เกียวโต',
          text: 'เดินทางไปตะวันตก แล้วเลือกหนึ่งย่านต่อวัน เช่น ฮิกาชิยามะ อาราชิยามะ หรือฟูชิมิ',
        },
      },
      {
        slug: 'osaka',
        days: 1,
        en: {
          title: 'Osaka',
          text: 'Leave time for the airport journey. If your departure allows, take a final neighborhood walk and enjoy a local meal.',
        },
"ko": {
  "title": "오사카",
  "text": "공항 이동 시간을 남겨 두세요. 출국 시간이 허락하면 마지막 동네 산책과 현지 식사를 즐기세요."
},
"zh-CN": {
  "title": "大阪",
  "text": "预留前往机场的时间。若离境时间允许，最后在街区散步并享用一餐当地美食。"
},
"vi": {
  "title": "Osaka",
  "text": "Dành đủ thời gian ra sân bay. Nếu giờ bay cho phép, đi bộ khu phố lần cuối và thưởng thức bữa ăn địa phương."
},
"fr": {
  "title": "Osaka",
  "text": "Gardez du temps pour l’aéroport. Si le départ le permet, profitez d’une dernière promenade et d’un repas local."
},
"es": {
  "title": "Osaka",
  "text": "Deja tiempo para llegar al aeropuerto. Si la salida lo permite, da un último paseo por el barrio y disfruta de una comida local."
},
        ja: {
          title: '大阪',
          text: '空港への移動時間を確保し、出発時刻に余裕があれば街歩きと地元の食事を楽しみましょう。',
        },
        th: {
          title: 'โอซาก้า',
          text: 'เผื่อเวลาไปสนามบิน หากเที่ยวบินออกช้าอาจเดินเล่นใกล้ที่พักและทานอาหารท้องถิ่นได้',
        },
      },
    ],
  },
  {
    days: 10,
    image: '/images/hokkaido.jpg',
    en: {
      title: 'City days, northern skies',
      text: 'Two bases, two different rhythms. Combine Tokyo with a focused Hokkaido stay instead of trying to cross the entire northern island.',
      transport:
        'Fly between Tokyo and New Chitose; use trains or confirmed local bus routes around Sapporo and Otaru.',
    },
"ko": {
  "title": "도시의 나날, 북쪽의 하늘",
  "text": "두 거점에서 서로 다른 리듬을 느껴 보세요. 북쪽 섬 전체를 가로지르기보다 도쿄와 홋카이도의 한 지역을 집중해서 여행하세요.",
  "transport": "도쿄와 신치토세 사이는 항공편을, 삿포로·오타루 주변에서는 열차나 확인된 버스 노선을 이용하세요."
},
"zh-CN": {
  "title": "都市时光，北国天空",
  "text": "两个住宿地，两种节奏。结合东京与北海道的集中游览，不要试图横穿整座北方大岛。",
  "transport": "东京与新千岁之间乘飞机；札幌、小樽周边乘铁路或已确认的当地巴士。"
},
"vi": {
  "title": "Ngày đô thị, trời phương bắc",
  "text": "Hai nơi lưu trú, hai nhịp sống. Kết hợp Tokyo với một khu tập trung ở Hokkaido thay vì đi khắp hòn đảo phía bắc.",
  "transport": "Bay giữa Tokyo và New Chitose; dùng tàu hoặc tuyến xe buýt địa phương đã xác nhận quanh Sapporo và Otaru."
},
"fr": {
  "title": "Villes et ciel du Nord",
  "text": "Deux bases, deux rythmes. Associez Tokyo à un séjour ciblé à Hokkaido plutôt que de vouloir traverser toute l’île.",
  "transport": "Prenez l’avion entre Tokyo et New Chitose, puis les trains ou bus locaux confirmés autour de Sapporo et Otaru."
},
"es": {
  "title": "Días urbanos, cielos del norte",
  "text": "Dos bases, dos ritmos. Combina Tokio con una estancia centrada en Hokkaido en lugar de intentar recorrer toda la isla.",
  "transport": "Vuela entre Tokio y New Chitose; usa trenes o rutas locales de autobús confirmadas por Sapporo y Otaru."
},
    ja: {
      title: '東京の街と、北の空',
      text: '二つの拠点で、違うリズムを味わう旅。東京のあとに北海道の一部をじっくり巡り、島全体を急いで移動しない計画です。',
      transport: '東京から新千歳へ航空便。札幌・小樽周辺は鉄道や事前に確認したバスを利用。',
    },
    th: {
      title: 'วันในเมือง และท้องฟ้าทางเหนือ',
      text: 'สองฐานพัก สองบรรยากาศ เที่ยวโตเกียวต่อด้วยบางพื้นที่ในฮอกไกโด โดยไม่เร่งข้ามทั้งเกาะ',
      transport:
        'บินโตเกียว → นิวชิโตเสะ แล้วใช้รถไฟหรือเส้นทางรถบัสที่ตรวจสอบแล้วรอบซัปโปโรและโอตารุ',
    },
    stops: [
      {
        slug: 'tokyo',
        days: 4,
        en: {
          title: 'Tokyo',
          text: 'Choose a few neighborhoods, a museum for a rainy day and an evening without fixed plans.',
        },
"ko": {
  "title": "도쿄",
  "text": "동네 몇 곳과 비 오는 날의 박물관을 고르고, 저녁 한 번은 정해진 일정 없이 남겨 두세요."
},
"zh-CN": {
  "title": "东京",
  "text": "挑选几个街区和雨天可去的博物馆，并留一个不排固定计划的夜晚。"
},
"vi": {
  "title": "Tokyo",
  "text": "Chọn vài khu phố, bảo tàng cho ngày mưa và một buổi tối không lịch cố định."
},
"fr": {
  "title": "Tokyo",
  "text": "Choisissez quelques quartiers, un musée en cas de pluie et une soirée sans programme fixe."
},
"es": {
  "title": "Tokio",
  "text": "Elige algunos barrios, un museo para la lluvia y una tarde-noche sin planes fijos."
},
        ja: {
          title: '東京',
          text: '気になる街をいくつか選び、雨の日に訪れる美術館と、予定を決めない夜も用意しておきましょう。',
        },
        th: {
          title: 'โตเกียว',
          text: 'เลือกไม่กี่ย่าน พิพิธภัณฑ์สำหรับวันฝนตก และค่ำคืนที่ไม่มีนัดหมาย',
        },
      },
      {
        slug: 'hokkaido',
        days: 6,
        en: {
          title: 'Sapporo & a seasonal escape',
          text: 'Allow a day for the flight. Explore Sapporo and Otaru, then add one seasonal outing with confirmed transport. Keep a weather buffer before departure.',
        },
"ko": {
  "title": "삿포로와 계절 나들이",
  "text": "비행에 하루를 배정하세요. 삿포로·오타루를 둘러보고 교통편을 확인한 계절 나들이를 하나 더하세요. 출발 전에는 날씨에 대비한 여유를 두세요."
},
"zh-CN": {
  "title": "札幌与时令郊游",
  "text": "为飞行留一天。游览札幌和小樽，再加一项交通已确认的季节活动。离开前保留天气缓冲时间。"
},
"vi": {
  "title": "Sapporo và chuyến đi theo mùa",
  "text": "Dành một ngày cho chuyến bay. Khám phá Sapporo, Otaru rồi thêm một chuyến theo mùa có giao thông xác nhận. Chừa thời gian dự phòng thời tiết trước khi rời đi."
},
"fr": {
  "title": "Sapporo et une escapade de saison",
  "text": "Prévoyez une journée pour le vol. Explorez Sapporo et Otaru, puis ajoutez une sortie saisonnière aux transports confirmés. Gardez une marge météo avant le départ."
},
"es": {
  "title": "Sapporo y una escapada de temporada",
  "text": "Reserva un día para el vuelo. Explora Sapporo y Otaru y añade una salida de temporada con transporte confirmado. Deja margen por el tiempo antes de partir."
},
        ja: {
          title: '札幌と、季節の小旅行',
          text: '航空移動に一日を見込み、札幌と小樽を散策。交通を確認して季節の小旅行を一つ追加し、帰路の前には天候への余裕を。',
        },
        th: {
          title: 'ซัปโปโรและทริปตามฤดูกาล',
          text: 'เผื่อวันบินหนึ่งวัน เที่ยวซัปโปโรกับโอตารุ แล้วเพิ่มทริปฤดูกาลหนึ่งแห่งที่ยืนยันการเดินทางแล้ว เผื่อวันก่อนกลับสำหรับอากาศ',
        },
      },
    ],
  },
  {
    days: 14,
    image: '/images/fuji.jpg',
    en: {
      title: 'The long way, thoughtfully',
      text: 'A classic east-to-west journey with time to slow down by Mount Fuji. Plan an arrival in Tokyo and departure from Kansai, or allow a separate return-travel day.',
      transport:
        'Tokyo → Kawaguchiko by train or bus; confirm onward connections toward the Tokaido Shinkansen for Kyoto. Continue to Osaka by rail.',
    },
"ko": {
  "title": "여유 있게 떠나는 긴 여정",
  "text": "후지산 근처에서 여유를 즐기는 동서 횡단 코스입니다. 도쿄 입국·간사이 출국으로 계획하거나 돌아가는 날을 따로 두세요.",
  "transport": "도쿄 → 가와구치코는 열차나 버스. 교토행 도카이도 신칸센으로 이어지는 연결편을 확인하고 오사카까지 철도로 이동하세요."
},
"zh-CN": {
  "title": "从容规划的长旅程",
  "text": "经典的东西向路线，在富士山附近放慢脚步。可安排东京入境、关西离境，或另留一天返程。",
  "transport": "东京至河口湖可乘火车或巴士；核实衔接往京都的东海道新干线，再乘铁路前往大阪。"
},
"vi": {
  "title": "Hành trình dài, có tính toán",
  "text": "Hành trình đông sang tây cổ điển, có thời gian chậm lại bên núi Phú Sĩ. Đến Tokyo và rời Kansai, hoặc dành riêng ngày quay về.",
  "transport": "Tokyo → Kawaguchiko bằng tàu hoặc xe buýt; kiểm tra nối chuyến đến Tokaido Shinkansen đi Kyoto. Tiếp tục đến Osaka bằng đường sắt."
},
"fr": {
  "title": "Un long voyage bien pensé",
  "text": "Un itinéraire classique d’est en ouest avec une pause près du mont Fuji. Prévoyez Tokyo à l’arrivée et Kansai au départ, ou une journée distincte de retour.",
  "transport": "Tokyo → Kawaguchiko en train ou bus ; vérifiez la liaison vers le Tokaido Shinkansen pour Kyoto, puis poursuivez en train vers Osaka."
},
"es": {
  "title": "El camino largo, con calma",
  "text": "Un viaje clásico de este a oeste con calma junto al monte Fuji. Llega a Tokio y sal por Kansai, o añade un día aparte para el regreso.",
  "transport": "Tokio → Kawaguchiko en tren o autobús; confirma las conexiones al Tokaido Shinkansen hacia Kioto. Continúa a Osaka en tren."
},
    ja: {
      title: 'ゆっくりつなぐ、東から西へ',
      text: '定番の街に、富士山を眺める余白を加えた旅。東京着・関西発を基本に、往復便なら東京に戻る移動日も別途確保しましょう。',
      transport:
        '東京から河口湖は鉄道・バス。京都へは東海道新幹線方面への乗り継ぎを確認し、大阪へは鉄道で移動。',
    },
    th: {
      title: 'ค่อย ๆ เดินทาง จากตะวันออกสู่ตะวันตก',
      text: 'เส้นทางยอดนิยมพร้อมเวลาชมฟูจิ วางแผนเข้าโตเกียวออกคันไซ หรือเผื่อวันเดินทางกลับโตเกียวเพิ่มหากใช้เที่ยวบินไปกลับ',
      transport:
        'โตเกียว → คาวากุจิโกะด้วยรถไฟหรือรถบัส ตรวจสอบการต่อไปโทไคโดชินคันเซ็นเพื่อเข้าเกียวโต แล้วไปโอซาก้าด้วยรถไฟ',
    },
    stops: [
      {
        slug: 'tokyo',
        days: 5,
        en: {
          title: 'Tokyo',
          text: 'Settle in and explore one area at a time. Leave room for museums, neighborhood cafés and a flexible day.',
        },
"ko": {
  "title": "도쿄",
  "text": "적응한 뒤 한 지역씩 둘러보세요. 박물관, 동네 카페와 유동적인 하루를 위한 여유를 남기세요."
},
"zh-CN": {
  "title": "东京",
  "text": "先安顿好，再逐区探索。为博物馆、街区咖啡馆和灵活安排的一天留出空间。"
},
"vi": {
  "title": "Tokyo",
  "text": "Ổn định rồi khám phá từng khu. Chừa chỗ cho bảo tàng, quán cà phê khu phố và một ngày linh hoạt."
},
"fr": {
  "title": "Tokyo",
  "text": "Installez-vous, puis explorez une zone à la fois. Gardez une place pour musées, cafés de quartier et journée flexible."
},
"es": {
  "title": "Tokio",
  "text": "Instálate y explora una zona cada vez. Deja espacio para museos, cafés de barrio y un día flexible."
},
        ja: {
          title: '東京',
          text: '旅に慣れながら一つずつ街を散策。美術館やカフェ、予定を調整できる一日も入れましょう。',
        },
        th: {
          title: 'โตเกียว',
          text: 'พักปรับตัวแล้วสำรวจทีละพื้นที่ เผื่อวันให้พิพิธภัณฑ์ คาเฟ่ และปรับแผน',
        },
      },
      {
        slug: 'mount-fuji',
        days: 2,
        en: {
          title: 'Fuji Five Lakes',
          text: 'Stay overnight for more than one chance at a clear view. Pick a lakeside walk and a rainy-day alternative.',
        },
"ko": {
  "title": "후지 5호",
  "text": "맑은 풍경을 볼 기회를 늘리려면 하룻밤 머무르세요. 호숫가 산책과 비 오는 날의 대안을 준비하세요."
},
"zh-CN": {
  "title": "富士五湖",
  "text": "住一晚，增加看到晴朗山景的机会。选择一段湖畔散步和雨天备选活动。"
},
"vi": {
  "title": "Ngũ hồ Phú Sĩ",
  "text": "Ở qua đêm để có thêm cơ hội ngắm trời quang. Chọn đường ven hồ và phương án cho ngày mưa."
},
"fr": {
  "title": "Les cinq lacs du mont Fuji",
  "text": "Passez une nuit pour multiplier les chances de vue dégagée. Choisissez une promenade au lac et une alternative en cas de pluie."
},
"es": {
  "title": "Los cinco lagos del Fuji",
  "text": "Pasa la noche para tener más opciones de ver la montaña despejada. Elige un paseo junto al lago y una alternativa para la lluvia."
},
        ja: {
          title: '富士五湖',
          text: '一泊して、晴れた富士山に出会う機会を増やす旅に。湖畔の散歩と、雨の日の行き先を選びましょう。',
        },
        th: {
          title: 'ทะเลสาบทั้งห้ารอบฟูจิ',
          text: 'พักค้างคืนเพื่อเพิ่มโอกาสเห็นฟ้าเปิด เลือกทางเดินริมทะเลสาบและที่เที่ยวสำรองวันฝนตก',
        },
      },
      {
        slug: 'kyoto',
        days: 4,
        en: {
          title: 'Kyoto',
          text: 'Balance popular temples with garden visits and a tea experience. Keep each day geographically compact.',
        },
"ko": {
  "title": "교토",
  "text": "인기 사찰과 정원, 다도 체험을 균형 있게 배치하세요. 하루 이동 범위를 좁게 유지하세요."
},
"zh-CN": {
  "title": "京都",
  "text": "平衡热门寺院、庭园和茶体验，每天尽量在相近区域活动。"
},
"vi": {
  "title": "Kyoto",
  "text": "Cân bằng chùa nổi tiếng với vườn và trải nghiệm trà. Giữ các điểm mỗi ngày gần nhau."
},
"fr": {
  "title": "Kyoto",
  "text": "Équilibrez temples réputés, jardins et expérience du thé. Limitez les distances de chaque journée."
},
"es": {
  "title": "Kioto",
  "text": "Equilibra templos populares con jardines y una experiencia de té. Mantén próximas las visitas de cada día."
},
        ja: {
          title: '京都',
          text: '人気の寺院に、庭園やお茶の体験を組み合わせて。一日の移動範囲を小さくまとめると快適です。',
        },
        th: {
          title: 'เกียวโต',
          text: 'ผสมวัดยอดนิยม สวน และประสบการณ์ชงชา จัดสถานที่ในวันเดียวกันให้อยู่ใกล้กัน',
        },
      },
      {
        slug: 'osaka',
        days: 3,
        en: {
          title: 'Osaka',
          text: 'Enjoy the city’s food culture and castle park. Keep the final day light around your departure arrangements.',
        },
"ko": {
  "title": "오사카",
  "text": "도시의 음식 문화와 성 공원을 즐기세요. 출발 일정에 맞춰 마지막 날은 가볍게 계획하세요."
},
"zh-CN": {
  "title": "大阪",
  "text": "体验城市饮食文化与城堡公园。配合离境安排，让最后一天轻松一些。"
},
"vi": {
  "title": "Osaka",
  "text": "Thưởng thức văn hóa ẩm thực và công viên thành. Giữ ngày cuối nhẹ nhàng theo lịch khởi hành."
},
"fr": {
  "title": "Osaka",
  "text": "Profitez de la gastronomie et du parc du château. Allégez la dernière journée selon votre départ."
},
"es": {
  "title": "Osaka",
  "text": "Disfruta de la cultura gastronómica y del parque del castillo. Deja el último día ligero según tu salida."
},
        ja: {
          title: '大阪',
          text: '食文化と大阪城公園を楽しみ、最後の日は出発の手配に合わせて軽めの予定に。',
        },
        th: {
          title: 'โอซาก้า',
          text: 'ชิมอาหารและเที่ยวสวนปราสาท จัดวันสุดท้ายเบา ๆ ให้เหมาะกับเวลาออกเดินทาง',
        },
      },
    ],
  },
]

type Notes = { day: string[]; food: string; extra: string }
export const destinationNotes: Record<string, Localized<Notes>> = {
  kyoto: {
    en: {
      day: [
        'Begin in Higashiyama while the streets are quieter. Choose one temple or garden to enjoy without rushing.',
        'Pause for lunch, then try a reserved tea experience or browse small craft shops. Respect private lanes and photography signs.',
        'Walk beside the Kamo River and choose a neighborhood restaurant. Leave time to return to your accommodation.',
      ],
      food: 'Look for yudofu, Kyoto-style vegetables and seasonal wagashi. Ask about ingredients: broths and sauces can contain fish even in vegetable dishes.',
      extra:
        'Keep Arashiyama and Fushimi for another day rather than crossing the city repeatedly.',
    },
"ko": {
  "day": [
    "거리가 한적할 때 히가시야마에서 시작하세요. 서두르지 않고 즐길 사찰이나 정원 하나를 선택하세요.",
    "점심 후 예약한 다도 체험을 하거나 작은 공예점을 둘러보세요. 사유지 골목과 촬영 안내를 존중하세요.",
    "가모강을 따라 걷고 동네 식당을 선택하세요. 숙소로 돌아갈 시간도 남기세요."
  ],
  "food": "유도후, 교토 채소 요리와 계절 화과자를 찾아보세요. 채소 요리도 국물과 소스에 생선이 들어갈 수 있으니 재료를 확인하세요.",
  "extra": "도시를 반복해서 가로지르지 말고 아라시야마와 후시미는 다른 날에 방문하세요."
},
"zh-CN": {
  "day": [
    "趁街道较安静时从东山开始，选一座寺院或庭园慢慢欣赏。",
    "午餐后参加预约的茶体验，或逛小型工艺店。尊重私人巷道及摄影标识。",
    "沿鸭川散步，选一家街区餐厅，并预留返回住宿的时间。"
  ],
  "food": "可尝汤豆腐、京都蔬菜料理和时令和果子。请询问成分：即使蔬菜料理的汤汁或酱料也可能含鱼。",
  "extra": "岚山和伏见另排一天，避免反复横穿城市。"
},
"vi": {
  "day": [
    "Bắt đầu ở Higashiyama khi đường còn yên. Chọn một chùa hoặc vườn để thưởng ngoạn không vội.",
    "Nghỉ ăn trưa rồi thử trà đã đặt trước hoặc ghé cửa hàng thủ công. Tôn trọng ngõ riêng và biển chụp ảnh.",
    "Đi dọc sông Kamo, chọn quán trong khu phố và dành thời gian về chỗ ở."
  ],
  "food": "Tìm yudofu, rau kiểu Kyoto và wagashi theo mùa. Hỏi thành phần: nước dùng, sốt có thể có cá ngay cả trong món rau.",
  "extra": "Dành Arashiyama và Fushimi cho ngày khác để tránh băng qua thành phố nhiều lần."
},
"fr": {
  "day": [
    "Commencez à Higashiyama quand les rues sont calmes. Choisissez un temple ou jardin à savourer sans hâte.",
    "Après le déjeuner, profitez d’un thé réservé ou des boutiques d’artisanat. Respectez les passages privés et consignes photo.",
    "Marchez le long de la Kamo, choisissez un restaurant de quartier et gardez du temps pour rentrer."
  ],
  "food": "Goûtez yudofu, légumes de Kyoto et wagashi de saison. Vérifiez les ingrédients : bouillons et sauces peuvent contenir du poisson, même avec des légumes.",
  "extra": "Gardez Arashiyama et Fushimi pour un autre jour afin d’éviter de traverser la ville sans cesse."
},
"es": {
  "day": [
    "Empieza en Higashiyama cuando haya menos gente. Elige un templo o jardín para disfrutar sin prisas.",
    "Tras comer, disfruta de una experiencia de té reservada o de tiendas de artesanía. Respeta los pasos privados y las señales sobre fotos.",
    "Pasea junto al río Kamo y elige un restaurante de barrio. Deja tiempo para volver al alojamiento."
  ],
  "food": "Prueba yudofu, verduras de Kioto y wagashi de temporada. Pregunta por los ingredientes: caldos y salsas pueden contener pescado incluso en platos vegetales.",
  "extra": "Deja Arashiyama y Fushimi para otro día y evita cruzar la ciudad repetidamente."
},
    ja: {
      day: [
        '静かな時間帯に東山へ。寺院や庭園を一つ選び、急がずに楽しみましょう。',
        '昼食のあとは予約した茶道体験や工芸品の店へ。私道や撮影禁止の表示を守って散策を。',
        '鴨川沿いを歩き、近くの店で夕食を。宿に戻る時間にも余裕を残しましょう。',
      ],
      food: '湯豆腐、京野菜、季節の和菓子などに注目。野菜料理にも魚のだしが使われる場合があるため、食事制限があれば確認を。',
      extra: '嵐山や伏見は別の日にすると、市内を何度も横断せずに過ごせます。',
    },
    th: {
      day: [
        'เริ่มที่ฮิกาชิยามะช่วงคนยังน้อย เลือกวัดหรือสวนหนึ่งแห่งแล้วค่อย ๆ ชม',
        'หลังอาหารกลางวัน ไปประสบการณ์ชงชาที่จองไว้หรือร้านงานฝีมือ เคารพทางส่วนบุคคลและป้ายถ่ายภาพ',
        'เดินริมแม่น้ำคาโมะแล้วทานอาหารใกล้ ๆ เผื่อเวลากลับที่พัก',
      ],
      food: 'ลองยูโดฟุ ผักท้องถิ่นเกียวโต และวากาชิตามฤดู สอบถามส่วนผสม เพราะน้ำซุปหรือซอสในอาหารผักอาจมีปลา',
      extra: 'เก็บอาราชิยามะและฟูชิมิไว้อีกวัน เพื่อลดการเดินทางข้ามเมือง',
    },
  },
  tokyo: {
    en: {
      day: [
        'Start around Sensoji and the streets of Asakusa. Visit respectfully while worshippers go about their day.',
        'Walk toward the Sumida River, or choose a nearby museum if the weather turns. Allow time for lunch and a café stop.',
        'Stay in the eastern side of the city for dinner instead of adding another long train ride. Check the route back to your hotel.',
      ],
      food: 'Try soba, tempura or a small sushi restaurant. Menus, prices and reservation policies vary; ask about allergies before ordering.',
      extra:
        'Plan Shibuya, Harajuku and Meiji Jingu together on a separate day to reduce cross-city travel.',
    },
"ko": {
  "day": [
    "센소지와 아사쿠사 거리에서 시작하세요. 신자들이 예배하는 동안 예의를 지켜 방문하세요.",
    "스미다강 쪽으로 걷거나 날씨가 나빠지면 근처 박물관을 고르세요. 점심과 카페 휴식도 넣으세요.",
    "긴 기차 이동을 더하기보다 도시 동쪽에서 저녁을 드세요. 호텔로 돌아가는 경로를 확인하세요."
  ],
  "food": "소바, 덴푸라나 작은 초밥집을 찾아보세요. 메뉴·가격·예약 규정은 다르므로 주문 전 알레르기를 문의하세요.",
  "extra": "시부야, 하라주쿠와 메이지 신궁은 다른 하루에 묶어 도시 횡단 이동을 줄이세요."
},
"zh-CN": {
  "day": [
    "从浅草寺和浅草街道开始；有人参拜时请保持尊重。",
    "向隅田川散步；天气转差时选附近博物馆，并留出午餐和咖啡休息时间。",
    "晚餐留在城市东侧，不再加一段长途乘车，并核实返回酒店的路线。"
  ],
  "food": "可尝荞麦面、天妇罗或小寿司店。菜单、价格和预约政策各异；点餐前先说明过敏情况。",
  "extra": "涩谷、原宿与明治神宫另排同一天，减少跨城移动。"
},
"vi": {
  "day": [
    "Bắt đầu quanh Sensoji và phố Asakusa. Thăm viếng tôn trọng khi người dân hành lễ.",
    "Đi về sông Sumida hoặc chọn bảo tàng gần đó nếu trời xấu. Dành giờ ăn trưa và nghỉ cà phê.",
    "Ăn tối ở phía đông thành phố thay vì thêm chuyến tàu dài. Kiểm tra đường về khách sạn."
  ],
  "food": "Thử soba, tempura hoặc quán sushi nhỏ. Thực đơn, giá và đặt chỗ khác nhau; hỏi về dị ứng trước khi gọi.",
  "extra": "Xếp Shibuya, Harajuku và Meiji Jingu cùng một ngày riêng để giảm đi xuyên thành phố."
},
"fr": {
  "day": [
    "Commencez autour de Sensoji et d’Asakusa, en respectant les fidèles qui pratiquent leur culte.",
    "Marchez vers la Sumida, ou choisissez un musée proche si le temps change. Prévoyez déjeuner et pause café.",
    "Dînez dans l’est de la ville plutôt que d’ajouter un long trajet. Vérifiez le retour à l’hôtel."
  ],
  "food": "Essayez soba, tempura ou petit restaurant de sushi. Menus, prix et réservations varient ; signalez les allergies avant de commander.",
  "extra": "Regroupez Shibuya, Harajuku et Meiji Jingu sur une autre journée pour réduire les traversées de la ville."
},
"es": {
  "day": [
    "Empieza por Sensoji y las calles de Asakusa. Respeta a quienes estén realizando sus prácticas religiosas.",
    "Camina hacia el Sumida o visita un museo cercano si empeora el tiempo. Reserva tiempo para comer y tomar un café.",
    "Cena en el este de la ciudad en vez de añadir otro trayecto largo. Comprueba la vuelta al hotel."
  ],
  "food": "Prueba soba, tempura o una pequeña barra de sushi. Menús, precios y reservas varían; consulta las alergias antes de pedir.",
  "extra": "Agrupa Shibuya, Harajuku y Meiji Jingu en otro día para reducir los desplazamientos de punta a punta."
},
    ja: {
      day: [
        '浅草寺と周辺の街からスタート。参拝する人の妨げにならないよう、落ち着いて散策しましょう。',
        '隅田川のほうへ歩くか、天候に合わせて近くの文化施設へ。昼食やカフェで休む時間も大切に。',
        '夜も東側のエリアで食事を楽しめば、長い電車移動を減らせます。宿への帰り道を確認しましょう。',
      ],
      food: 'そば、天ぷら、小さな寿司店などを楽しんで。メニューや価格、予約条件は店ごとに異なります。アレルギーは注文前に確認を。',
      extra: '渋谷、原宿、明治神宮は別の日にまとめると、街を横断する移動を減らせます。',
    },
    th: {
      day: [
        'เริ่มที่อาซากุสะและวัดเซ็นโซจิ แล้วเดินชมย่านใกล้กัน',
        'พักทานอาหารและเดินริมแม่น้ำสุมิดะ หากฝนตกเลือกพิพิธภัณฑ์ที่เดินทางสะดวก',
        'ทานอาหารเย็นใกล้ที่พักและตรวจสอบรถไฟกลับ',
      ],
      food: 'ลองโซบะ ซูชิ หรือเทมปุระ ตรวจสอบส่วนผสมและรูปแบบการจองของแต่ละร้าน',
      extra: 'ชิบูย่าและศาลเจ้าเมจิเหมาะกับอีกวันหนึ่ง ไม่ต้องข้ามเมืองหลายครั้งในวันเดียว',
    },
  },
  'mount-fuji': {
    en: {
      day: [
        'Look at the weather first, then head to a lakeside viewpoint if visibility is good. A clear mountain view is never guaranteed.',
        'Walk a manageable section of Lake Kawaguchi. Stop for lunch and choose a local museum or café if clouds arrive.',
        'Return before your transport becomes infrequent. An overnight stay leaves another morning for mountain views.',
      ],
      food: 'Look for Yamanashi’s hoto: broad noodles cooked with vegetables in a warming broth. Recipes and dietary suitability differ by restaurant.',
      extra:
        'This is a sightseeing day, not a climbing itinerary. Summit trips require seasonal access checks, equipment and preparation.',
    },
"ko": {
  "day": [
    "먼저 날씨를 확인하고 시야가 좋으면 호숫가 전망대로 가세요. 맑은 산 전망은 보장되지 않습니다.",
    "체력에 맞는 가와구치호 구간을 걸으세요. 점심을 먹고 구름이 끼면 현지 박물관이나 카페를 고르세요.",
    "교통편이 뜸해지기 전에 돌아오세요. 숙박하면 다음 아침에도 산을 볼 기회가 있습니다."
  ],
  "food": "야마나시 호토는 넓은 면과 채소를 따뜻한 국물에 끓인 요리입니다. 조리법과 식이 적합성은 식당마다 다릅니다.",
  "extra": "이 일정은 관광용이며 등산 코스가 아닙니다. 정상 등반은 계절별 접근 확인, 장비와 준비가 필요합니다."
},
"zh-CN": {
  "day": [
    "先看天气，能见度好时再前往湖畔观景点。清晰的山景从不保证。",
    "沿河口湖选择力所能及的一段步行。午餐后若云层增多，可选当地博物馆或咖啡馆。",
    "交通班次减少前请返程。住一晚可多留一个清晨看山。"
  ],
  "food": "可尝山梨馎饦：宽面与蔬菜炖在暖汤中。做法及是否符合饮食要求因餐厅而异。",
  "extra": "这是观光日程，不是登山方案。登顶需要核实季节开放条件，并准备装备及相关事项。"
},
"vi": {
  "day": [
    "Xem thời tiết trước, rồi đến điểm ngắm ven hồ nếu tầm nhìn tốt. Không bao giờ bảo đảm thấy núi rõ.",
    "Đi đoạn vừa sức quanh hồ Kawaguchi. Nghỉ ăn trưa, chọn bảo tàng hoặc quán cà phê nếu mây kéo đến.",
    "Về trước khi phương tiện thưa chuyến. Ở qua đêm cho thêm buổi sáng ngắm núi."
  ],
  "food": "Thử hoto Yamanashi: mì bản rộng nấu cùng rau trong nước dùng ấm. Công thức và sự phù hợp chế độ ăn tùy quán.",
  "extra": "Đây là ngày tham quan, không phải lịch leo núi. Lên đỉnh cần kiểm tra mở cửa theo mùa, trang bị và chuẩn bị riêng."
},
"fr": {
  "day": [
    "Vérifiez la météo puis gagnez un point de vue au lac si la visibilité est bonne. Une vue dégagée n’est jamais garantie.",
    "Marchez sur une section adaptée du lac Kawaguchi. Déjeunez puis choisissez musée ou café si les nuages arrivent.",
    "Rentrez avant que les transports se raréfient. Une nuit sur place offre un autre matin pour voir la montagne."
  ],
  "food": "Découvrez le hoto de Yamanashi, de larges nouilles mijotées avec des légumes. Recettes et compatibilité alimentaire varient selon le restaurant.",
  "extra": "Cette journée est touristique, pas un programme d’ascension. Le sommet exige vérifications saisonnières, équipement et préparation."
},
"es": {
  "day": [
    "Mira primero el tiempo y ve a un mirador del lago si hay buena visibilidad. La vista despejada nunca está garantizada.",
    "Recorre un tramo asumible del lago Kawaguchi. Para a comer y elige un museo o café si llegan las nubes.",
    "Regresa antes de que disminuyan las frecuencias. Pasar la noche ofrece otra mañana para ver la montaña."
  ],
  "food": "Prueba hoto de Yamanashi: fideos anchos con verduras en caldo caliente. La receta y la adecuación dietética dependen del restaurante.",
  "extra": "Es un día de turismo, no de ascenso. Llegar a la cumbre exige comprobar el acceso estacional, llevar equipo y prepararse."
},
    ja: {
      day: [
        'まず天候を確認し、見通しがよければ湖畔の展望スポットへ。富士山が必ず見えるとは限りません。',
        '河口湖の湖畔を無理のない距離で散歩。昼食をはさみ、曇ってきたら美術館やカフェへ。',
        '交通の便が少なくなる前に戻りましょう。一泊すれば翌朝も山を眺める機会があります。',
      ],
      food: '山梨のほうとうは、幅広の麺と野菜を煮込んだ料理。材料や食事制限への対応は店により異なります。',
      extra:
        'このプランは観光用です。登頂には開山期間やルールの確認、装備、準備が別途必要です。',
    },
    th: {
      day: [
        'ชมฟูจิจากริมคาวากุจิหากอากาศเหมาะสม เตรียมเสื้อกันลม',
        'ทานอาหารแล้วเลือกพิพิธภัณฑ์หรือเดินเล่นในพื้นที่ใกล้กัน',
        'กลับที่พักก่อนรถเที่ยวสุดท้าย หากค้างคืนค่อยวางแผนชมวิวเช้าวันถัดไป',
      ],
      food: 'ลองโฮโต เส้นแบนในน้ำซุปผัก อาจมีส่วนผสมจากเนื้อหรือปลา ควรสอบถามร้าน',
      extra: 'ไม่ควรผูกแผนทั้งวันกับการเห็นยอดเขา เตรียมกิจกรรมในร่มไว้ด้วย',
    },
  },
  osaka: {
    en: {
      day: [
        'Begin with a walk through Osaka Castle Park. Check separate admission and opening information if you want to enter the castle museum.',
        'Head toward Namba for lunch and a browse through shopping streets. Choose a few food stops rather than a rushed checklist.',
        'See Dotonbori’s canal lights after dusk. Keep busy bridges clear and check the last useful train for your hotel.',
      ],
      food: 'Takoyaki and Osaka-style okonomiyaki are familiar starting points. Dashi, seafood and wheat are common ingredients; discuss allergies with the restaurant.',
      extra: 'Save another morning for a neighborhood away from the busiest canal streets.',
    },
"ko": {
  "day": [
    "오사카성 공원 산책으로 시작하세요. 성 박물관에 들어가려면 별도 입장료와 운영 정보를 확인하세요.",
    "난바로 가서 점심과 상점가 구경을 즐기세요. 서두르며 많은 곳을 다니기보다 음식점 몇 곳을 선택하세요.",
    "해가 진 뒤 도톤보리 운하 불빛을 보세요. 붐비는 다리를 막지 말고 호텔에 가는 마지막 유용한 열차를 확인하세요."
  ],
  "food": "다코야키와 오사카식 오코노미야키부터 시작해 보세요. 다시, 해산물과 밀이 흔히 들어가므로 알레르기는 식당에 문의하세요.",
  "extra": "가장 붐비는 운하 거리에서 벗어난 동네를 위해 다른 아침을 남겨 두세요."
},
"zh-CN": {
  "day": [
    "先漫步大阪城公园。想进入天守阁博物馆时，请另查门票和开放信息。",
    "前往难波午餐和逛商店街。挑几处美食停留，别赶打卡清单。",
    "入夜后欣赏道顿堀运河灯光。不要堵住繁忙桥梁，并确认能返回酒店的末班合适列车。"
  ],
  "food": "章鱼烧和大阪烧是入门选择。常见成分包括高汤、海鲜和小麦；过敏需求请向餐厅确认。",
  "extra": "另留一个早晨，探索热闹运河街道以外的街区。"
},
"vi": {
  "day": [
    "Bắt đầu với công viên thành Osaka. Nếu vào bảo tàng trong thành, kiểm tra vé và giờ mở cửa riêng.",
    "Đến Namba ăn trưa, dạo phố mua sắm. Chọn vài điểm ăn thay vì chạy theo danh sách.",
    "Ngắm đèn kênh Dotonbori sau hoàng hôn. Không chắn cầu đông người và kiểm tra chuyến tàu cuối phù hợp về khách sạn."
  ],
  "food": "Takoyaki và okonomiyaki kiểu Osaka là lựa chọn quen thuộc. Dashi, hải sản và lúa mì phổ biến; trao đổi với quán về dị ứng.",
  "extra": "Dành buổi sáng khác cho khu phố xa các đường kênh đông nhất."
},
"fr": {
  "day": [
    "Commencez au parc du château d’Osaka. Pour le musée du château, vérifiez séparément entrée et horaires.",
    "Rejoignez Namba pour déjeuner et flâner dans les rues commerçantes. Choisissez quelques haltes gourmandes sans courir.",
    "Admirez le canal de Dotonbori à la nuit tombée. Laissez les ponts fréquentés dégagés et vérifiez le dernier train utile vers l’hôtel."
  ],
  "food": "Commencez par takoyaki et okonomiyaki d’Osaka. Dashi, fruits de mer et blé sont fréquents ; discutez des allergies avec le restaurant.",
  "extra": "Gardez une autre matinée pour un quartier à l’écart des rues les plus animées du canal."
},
"es": {
  "day": [
    "Empieza paseando por el parque del castillo de Osaka. Para entrar al museo del castillo, consulta aparte entradas y horarios.",
    "Ve a Namba para comer y pasear por las calles comerciales. Elige unas pocas paradas gastronómicas sin prisas.",
    "Ve las luces del canal de Dotonbori al anochecer. No bloquees los puentes concurridos y comprueba el último tren útil para el hotel."
  ],
  "food": "Takoyaki y okonomiyaki de Osaka son un buen comienzo. Dashi, marisco y trigo son habituales; consulta las alergias con el restaurante.",
  "extra": "Reserva otra mañana para un barrio alejado de las calles más concurridas del canal."
},
    ja: {
      day: [
        '大阪城公園の散歩から一日を始めます。天守閣の博物館に入る場合は、別途入場情報と時間を確認。',
        '昼はなんば方面へ移動し、食事と商店街巡りを。店を詰め込みすぎず、気になる味を少しずつ。',
        '日が暮れたら道頓堀の明かりを楽しんで。橋の通行を妨げず、宿へ戻る列車の時間も確認しましょう。',
      ],
      food: 'たこ焼きや大阪のお好み焼きから味わってみましょう。だし、魚介、小麦が使われることが多いため、アレルギーは店に確認を。',
      extra: 'もう一日あれば、にぎやかな運河沿いを離れた街の散策もおすすめです。',
    },
    th: {
      day: [
        'เริ่มที่สวนปราสาทโอซาก้าและเผื่อเวลาเดินในพื้นที่',
        'พักทานอาหาร แล้วเลือกย่านร้านค้าหนึ่งแห่งโดยไม่เร่งรีบ',
        'ชมแสงริมคลองโดทงโบริและชิมอาหารตามจุดที่ร้านกำหนด',
      ],
      food: 'ทาโกยากิและโอโคโนมิยากิเป็นอาหารที่น่าลอง มักมีไข่ แป้ง และอาหารทะเล ควรตรวจสอบส่วนผสม',
      extra: 'ไม่ต้องรวมเกียวโตในวันเดียวกัน จัดเวลาที่โอซาก้าให้เต็มที่',
    },
  },
  hokkaido: {
    en: {
      day: [
        'Use Sapporo as the base for a city day. Begin with a park walk and check conditions before setting off in winter.',
        'Explore local food and shops at an easy pace. An indoor cultural stop makes a useful alternative in rain or heavy snow.',
        'Enjoy a warming dinner and prepare for the next day’s transport. Keep rural excursions separate from a city sightseeing day.',
      ],
      food: 'Sapporo-style miso ramen, seafood and dairy treats are common choices. Ask about ingredients and use local seasonal menus as a guide.',
      extra:
        'An Otaru day trip is a different outing; check trains and the weather rather than adding distant Furano to the same day.',
    },
"ko": {
  "day": [
    "삿포로를 거점으로 도시를 둘러보세요. 공원 산책부터 시작하고 겨울에는 출발 전 상태를 확인하세요.",
    "현지 음식과 가게를 여유롭게 둘러보세요. 비나 폭설에는 실내 문화 시설을 대안으로 활용하세요.",
    "따뜻한 저녁 식사 후 다음 날 교통편을 준비하세요. 시골 나들이와 도시 관광은 다른 날로 나누세요."
  ],
  "food": "삿포로식 미소 라멘, 해산물과 유제품 간식이 대표적입니다. 재료를 묻고 현지 계절 메뉴를 참고하세요.",
  "extra": "오타루 당일 여행은 별도 일정입니다. 먼 후라노를 같은 날 넣지 말고 열차와 날씨를 확인하세요."
},
"zh-CN": {
  "day": [
    "以札幌为基地安排城市游。先逛公园，冬季出发前请确认路况。",
    "从容探索当地美食和商店。下雨或大雪时，室内文化景点可作替代。",
    "享用暖心晚餐，并准备次日交通。乡间远足请与城市观光分开。"
  ],
  "food": "札幌味噌拉面、海鲜及乳制甜点是常见选择。请询问食材，并参考当地季节菜单。",
  "extra": "小樽一日游请单独安排；确认火车和天气，不要把遥远的富良野塞进同一天。"
},
"vi": {
  "day": [
    "Lấy Sapporo làm căn cứ cho ngày khám phá thành phố. Bắt đầu ở công viên, kiểm tra điều kiện trước khi đi vào mùa đông.",
    "Khám phá đồ ăn và cửa hàng thong thả. Điểm văn hóa trong nhà là phương án khi mưa hoặc tuyết lớn.",
    "Ăn tối ấm bụng, chuẩn bị phương tiện ngày sau. Tách chuyến ngoại ô khỏi ngày tham quan đô thị."
  ],
  "food": "Ramen miso Sapporo, hải sản và món sữa là lựa chọn phổ biến. Hỏi nguyên liệu và xem thực đơn địa phương theo mùa.",
  "extra": "Chuyến Otaru là ngày riêng; kiểm tra tàu và thời tiết, đừng thêm Furano xa xôi vào cùng ngày."
},
"fr": {
  "day": [
    "Prenez Sapporo comme base pour la ville. Commencez au parc et vérifiez les conditions avant de partir en hiver.",
    "Explorez tranquillement gastronomie et boutiques. Une visite culturelle intérieure offre une alternative sous pluie ou neige forte.",
    "Dînez au chaud et préparez les transports du lendemain. Séparez les excursions rurales de la visite urbaine."
  ],
  "food": "Ramen au miso de Sapporo, produits de la mer et douceurs laitières sont courants. Vérifiez les ingrédients et consultez les menus de saison.",
  "extra": "Otaru mérite une excursion distincte ; vérifiez trains et météo plutôt que d’ajouter la lointaine Furano le même jour."
},
"es": {
  "day": [
    "Usa Sapporo como base para un día urbano. Empieza en un parque y comprueba las condiciones antes de salir en invierno.",
    "Explora la comida y las tiendas locales con calma. Una visita cultural interior sirve de alternativa con lluvia o nieve intensa.",
    "Disfruta de una cena caliente y prepara el transporte del día siguiente. Separa las excursiones rurales del día urbano."
  ],
  "food": "El ramen de miso de Sapporo, el marisco y los dulces lácteos son habituales. Pregunta por ingredientes y consulta los menús locales de temporada.",
  "extra": "La excursión a Otaru es una salida aparte; comprueba trenes y tiempo en vez de añadir la lejana Furano ese mismo día."
},
    ja: {
      day: [
        '札幌を拠点に街を楽しむ一日。公園を歩く前に、冬は足元や天候を確認しましょう。',
        '地元の食や店をゆっくり巡ります。雨や大雪に備えて、屋内の文化施設も候補に。',
        '温かい夕食を楽しみ、翌日の交通を確認。郊外への小旅行と市内観光は別の日にすると安心です。',
      ],
      food: '札幌の味噌ラーメン、海の幸、乳製品を使ったお菓子など。材料を確認し、旬のメニューを参考に選びましょう。',
      extra:
        '小樽への日帰り旅は別の一日に。列車と天候を確認し、遠い富良野まで同じ日に詰め込まない計画を。',
    },
    th: {
      day: [
        'เริ่มเดินเล่นในใจกลางซัปโปโร เช่น สวนโอโดริ โดยเลือกเสื้อผ้าตามอากาศ',
        'เลือกพิพิธภัณฑ์ในเมืองหรือพักชิมอาหารท้องถิ่น',
        'ทานอาหารเย็นแล้วตรวจสอบอากาศและการเดินทางสำหรับวันถัดไป',
      ],
      food: 'ราเม็งมิโซะ อาหารทะเล และขนมจากนมเป็นจุดเริ่มต้นที่ดี ตรวจสอบส่วนผสมและเมนูตามฤดู',
      extra: 'จัดโอตารุไว้อีกวัน ตรวจสอบรถไฟและอากาศ ไม่ควรพ่วงฟุราโนะที่อยู่ไกลในวันเดียว',
    },
  },
  okinawa: {
    en: {
      day: [
        'Start with a gentle walk in Naha. Give yourself time to adjust to the climate and choose shaded routes when it is hot.',
        'Discover Ryukyu food and local crafts, with a break indoors during the hottest part of the day.',
        'Enjoy a nearby waterfront if conditions allow. Keep a distant beach or ferry excursion for a separately planned day.',
      ],
      food: 'Okinawa soba and goya champuru are good introductions. Pork, bonito broth and egg are common, so check ingredients if needed.',
      extra:
        'Naha is not a shortcut to every island. Flights and ferries need their own schedule, weather checks and overnight planning.',
    },
"ko": {
  "day": [
    "나하에서 가볍게 걸으며 시작하세요. 기후에 적응할 시간을 두고 더울 때는 그늘진 길을 선택하세요.",
    "류큐 음식과 공예를 알아보고 가장 더운 시간에는 실내에서 쉬세요.",
    "상황이 좋으면 가까운 바닷가를 즐기세요. 먼 해변이나 페리 여행은 별도로 계획한 날에 가세요."
  ],
  "food": "오키나와 소바와 고야참푸루를 맛보세요. 돼지고기, 가쓰오 국물과 달걀이 흔히 들어가므로 필요하면 재료를 확인하세요.",
  "extra": "나하에서 모든 섬으로 쉽게 갈 수 있는 것은 아닙니다. 항공편·페리는 시간표와 날씨를 확인하고 숙박을 별도로 계획해야 합니다."
},
"zh-CN": {
  "day": [
    "从那霸轻松散步开始。给自己时间适应气候，炎热时选择阴凉路线。",
    "探索琉球美食与当地工艺，最热的时段在室内休息。",
    "条件允许时去附近海滨。远处海滩或渡轮旅行请另择一天单独规划。"
  ],
  "food": "冲绳荞麦面和苦瓜炒什锦适合初尝。猪肉、柴鱼高汤和鸡蛋很常见，有需要时请核对食材。",
  "extra": "那霸并非通往每座岛的捷径。航班和渡轮需要单独核对时刻、天气并规划过夜。"
},
"vi": {
  "day": [
    "Bắt đầu bằng đi bộ nhẹ ở Naha. Dành thời gian thích nghi khí hậu, chọn đường có bóng râm khi nóng.",
    "Khám phá món Ryukyu, thủ công địa phương và nghỉ trong nhà lúc nóng nhất.",
    "Nếu điều kiện cho phép, tận hưởng bờ biển gần đó. Để bãi xa hoặc chuyến phà cho ngày riêng đã lên kế hoạch."
  ],
  "food": "Soba Okinawa và goya champuru là món mở đầu tốt. Thịt lợn, nước dùng cá ngừ và trứng phổ biến; hỏi nguyên liệu khi cần.",
  "extra": "Naha không phải lối tắt đến mọi đảo. Chuyến bay và phà cần lịch riêng, kiểm tra thời tiết và kế hoạch qua đêm."
},
"fr": {
  "day": [
    "Commencez par une promenade douce à Naha. Adaptez-vous au climat et choisissez l’ombre quand il fait chaud.",
    "Découvrez cuisine des Ryukyu et artisanat local, avec une pause intérieure aux heures les plus chaudes.",
    "Profitez d’un front de mer proche si les conditions le permettent. Gardez plage éloignée ou ferry pour une journée préparée séparément."
  ],
  "food": "Découvrez les soba d’Okinawa et le goya champuru. Porc, bouillon de bonite et œuf sont courants ; vérifiez les ingrédients si nécessaire.",
  "extra": "Naha n’est pas un raccourci vers toutes les îles. Vols et ferries exigent horaires, météo et nuitées planifiés séparément."
},
"es": {
  "day": [
    "Empieza con un paseo suave por Naha. Date tiempo para adaptarte al clima y elige sombra cuando haga calor.",
    "Descubre la cocina de Ryukyu y la artesanía local, descansando dentro en las horas de más calor.",
    "Disfruta de una costa cercana si las condiciones lo permiten. Deja una playa lejana o un ferry para un día planificado aparte."
  ],
  "food": "Prueba soba de Okinawa y goya champuru. Son habituales el cerdo, el caldo de bonito y el huevo; consulta los ingredientes si lo necesitas.",
  "extra": "Naha no es un atajo a todas las islas. Vuelos y ferris requieren horarios, comprobaciones meteorológicas y alojamiento propios."
},
    ja: {
      day: [
        '那覇の街をゆっくり歩く朝から。気候に慣れる時間を取り、暑い日は日陰を選びましょう。',
        '琉球の料理や工芸品に触れ、日差しの強い時間帯は屋内で休憩を。',
        '状況がよければ近くの水辺へ。遠いビーチや船での小旅行は、別の日に計画しましょう。',
      ],
      food: '沖縄そばやゴーヤーチャンプルーが旅の入口に。豚肉、かつおだし、卵などが使われることがあるため、必要に応じて材料を確認。',
      extra:
        '那覇からすべての島へ気軽に行けるわけではありません。航空便や船の時刻、天候、宿泊を別途検討しましょう。',
    },
    th: {
      day: [
        'เดินเล่นในนาฮะแบบสบาย ๆ ให้เวลาปรับตัวกับอากาศ และเลือกทางร่มเมื่อแดดแรง',
        'ชิมอาหารริวกิวและชมงานฝีมือ พักในอาคารช่วงร้อนที่สุด',
        'หากอากาศเหมาะสมไปริมน้ำใกล้เมือง ส่วนชายหาดไกลหรือเรือไปเกาะอื่นควรวางแผนแยกวัน',
      ],
      food: 'เริ่มจากโอกินาว่าโซบะและโกยะจัมปุรุ มักมีหมู น้ำซุปปลาโอ หรือไข่ ควรถามส่วนผสมเมื่อจำเป็น',
      extra: 'นาฮะไม่ได้อยู่ใกล้ทุกเกาะ เที่ยวบิน เรือ สภาพอากาศ และการค้างคืนต้องวางแผนเฉพาะ',
    },
  },
}
