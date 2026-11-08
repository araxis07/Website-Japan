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
    "ko": {
      "suits": "사찰 산책, 정원과 전통 공예를 즐기기 좋습니다. 하루에 한 구역을 선택하세요.",
      "stay": "교토역 주변은 기차로 도착하거나 다른 도시로 이동할 때 편리합니다. 시조·가라스마는 중심부의 거점으로 좋습니다. 히가시야마는 이른 아침 산책에 좋지만, 짐을 들고 역에서 걸어갈 거리를 확인하세요.",
      "arrival": "간사이공항에서는 교토행 JR 하루카와 공항버스를 비교하세요. 터미널 간 이동 시간을 고려하고, 늦게 도착한다면 막차를 확인하세요.",
      "rain": "교토국립박물관을 방문한 뒤 근처 카페에서 쉬어 보세요. 전시 일정과 휴관일을 확인하세요. 시간을 정해 실내 활동을 하고 싶다면 차 체험을 예약하세요.",
      "prepare": "돌길을 걷기 편한 신발을 준비하세요. 인기 체험은 미리 예약하고, 사유지 골목을 막지 않으며 촬영 안내를 따라 주세요."
    },
    "zh-CN": {
      "suits": "适合寺院漫步、庭园和传统工艺体验。建议每天选择一个片区。",
      "stay": "京都站周边适合乘火车抵达或前往下一座城市。四条乌丸是方便的市中心据点。东山适合清晨散步，但请确认带行李从车站步行的距离。",
      "arrival": "从关西机场前往京都，可比较JR Haruka列车和机场巴士。预留航站楼之间的换乘时间；若抵达较晚，请确认末班车。",
      "rain": "参观京都国立博物馆后，到附近咖啡馆休息。出发前确认展期和休馆日。若想安排有固定时间的室内活动，可预约茶道体验。",
      "prepare": "穿适合石板路的鞋。热门体验请提前预约；不要堵住私人巷道，并遵守拍照标识。"
    },
    "vi": {
      "suits": "Phù hợp để dạo quanh chùa, ngắm vườn và tìm hiểu nghề thủ công truyền thống. Nên chọn một khu vực mỗi ngày.",
      "stay": "Khu ga Kyoto thuận tiện khi đến bằng tàu hoặc đi tiếp sang thành phố khác. Shijo–Karasuma là điểm lưu trú trung tâm hữu ích. Higashiyama hợp để đi dạo sớm, nhưng hãy kiểm tra quãng đường đi bộ từ ga khi mang hành lý.",
      "arrival": "Từ sân bay Kansai, so sánh tàu JR Haruka đến Kyoto với xe buýt sân bay. Dành thời gian chuyển nhà ga hành khách và kiểm tra chuyến cuối nếu đến muộn.",
      "rain": "Tham quan Bảo tàng Quốc gia Kyoto rồi nghỉ tại quán cà phê gần đó. Kiểm tra lịch triển lãm và ngày đóng cửa trước khi đi. Đặt trước trải nghiệm trà nếu muốn có hoạt động trong nhà vào giờ cố định.",
      "prepare": "Mang giày phù hợp với đường lát đá. Đặt sớm các trải nghiệm được ưa chuộng; không chắn lối ngõ riêng và tuân thủ biển hướng dẫn chụp ảnh."
    },
    "fr": {
      "suits": "Promenades dans les temples, jardins et artisanat traditionnel. Choisissez un quartier par jour.",
      "stay": "Le quartier de la gare de Kyoto est pratique pour arriver en train et poursuivre le voyage. Shijo–Karasuma constitue une base centrale. Higashiyama convient aux promenades matinales, mais vérifiez la marche depuis votre gare avec les bagages.",
      "arrival": "Depuis l’aéroport du Kansai, comparez le JR Haruka vers Kyoto avec les bus d’aéroport. Prévoyez les transferts entre terminaux et vérifiez le dernier départ si vous arrivez tard.",
      "rain": "Visitez le Musée national de Kyoto, puis un café voisin. Vérifiez les dates des expositions et les jours de fermeture. Réservez une expérience autour du thé si vous souhaitez une activité en intérieur à heure fixe.",
      "prepare": "Portez des chaussures adaptées aux chemins de pierre. Réservez les expériences populaires à l’avance, laissez les ruelles privées dégagées et respectez les consignes photographiques."
    },
    "es": {
      "suits": "Paseos por templos, jardines y artesanía tradicional. Elige un barrio por día.",
      "stay": "La zona de la estación de Kioto resulta práctica para llegar en tren y continuar el viaje. Shijo–Karasuma es una buena base céntrica. Higashiyama invita a pasear temprano, pero comprueba la caminata desde la estación con equipaje.",
      "arrival": "Desde el aeropuerto de Kansai, compara el JR Haruka a Kioto con los autobuses del aeropuerto. Deja margen para cambiar de terminal y consulta la última salida si llegas tarde.",
      "rain": "Visita el Museo Nacional de Kioto y después una cafetería cercana. Consulta las fechas de las exposiciones y los cierres antes de ir. Reserva una experiencia de té si quieres una actividad de interior con horario fijo.",
      "prepare": "Lleva calzado adecuado para caminos de piedra. Reserva las experiencias populares con antelación; no bloquees callejones privados y respeta las indicaciones sobre fotografía."
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
    "ko": {
      "suits": "동네 산책, 박물관, 쇼핑과 교통이 편리한 첫 여행에 좋습니다.",
      "stay": "우에노는 박물관과 도쿄 동부를 둘러보기 좋습니다. 신주쿠는 철도 연결이 많지만 역이 큽니다. 도쿄역 주변은 신칸센으로 다음 도시로 이동할 때 편리합니다. 예약 전 실제로 이용할 역 출구를 확인하세요.",
      "arrival": "하네다는 게이큐와 도쿄 모노레일, 나리타는 JR과 게이세이로 연결됩니다. 숙소 지역에 맞는 교통편을 선택하고, 터미널과 예약 여부, 심야 대안을 확인하세요.",
      "rain": "우에노의 도쿄국립박물관을 둘러보세요. 전시 일정을 확인하고 점심과 카페도 같은 지역으로 정하면 비를 맞으며 도시를 가로지르는 이동을 줄일 수 있습니다.",
      "prepare": "호텔 주소를 일본어로 저장하세요. 역 출구를 확인하고 환승 시간을 넉넉히 잡으세요. 시간 지정 입장 시설은 해당 시설을 통해 직접 예약하세요."
    },
    "zh-CN": {
      "suits": "适合街区漫步、博物馆、购物，以及希望交通便利的首次旅行。",
      "stay": "上野适合游览博物馆和东京东部。新宿铁路线路多，但车站较大；东京站周边适合继续乘新干线出行。预订前请确认实际要使用的车站出口。",
      "arrival": "羽田可乘京急和东京单轨电车；成田可选择JR或京成。根据住宿区域选择线路，并确认航站楼、预约要求和深夜替代交通。",
      "rain": "探索上野的东京国立博物馆。确认展览日历后，将午餐和咖啡馆也安排在同一区域，减少雨中跨城奔波。",
      "prepare": "保存酒店的日文地址。确认车站出口并预留换乘时间。有指定入场时间的景点请直接向场馆预约。"
    },
    "vi": {
      "suits": "Phù hợp để đi dạo các khu phố, tham quan bảo tàng, mua sắm và có chuyến đi đầu tiên với giao thông thuận tiện.",
      "stay": "Ueno thuận tiện cho bảo tàng và phía đông Tokyo. Shinjuku có nhiều tuyến tàu nhưng nhà ga lớn; ga Tokyo phù hợp để đi tiếp bằng shinkansen. Kiểm tra lối ra thực tế của ga trước khi đặt phòng.",
      "arrival": "Haneda có Keikyu và Tokyo Monorail. Narita có JR và Keisei. Chọn tuyến phù hợp với khu lưu trú, đồng thời kiểm tra nhà ga hành khách, yêu cầu đặt chỗ và phương án đi lại đêm muộn.",
      "rain": "Khám phá Bảo tàng Quốc gia Tokyo ở Ueno. Kiểm tra lịch triển lãm rồi bố trí bữa trưa và quán cà phê trong cùng khu vực để tránh đi xuyên thành phố khi trời mưa.",
      "prepare": "Lưu địa chỉ khách sạn bằng tiếng Nhật. Kiểm tra lối ra ga và dành thời gian chuyển tàu. Đặt trực tiếp với địa điểm đối với vé vào cửa theo giờ."
    },
    "fr": {
      "suits": "Promenades de quartier, musées, shopping et premier séjour bien desservi par les transports.",
      "stay": "Ueno convient aux musées et à l’est de Tokyo. Shinjuku offre de nombreuses correspondances, mais ses gares sont grandes. La gare de Tokyo est pratique pour poursuivre en shinkansen. Repérez la sortie exacte avant de réserver.",
      "arrival": "Haneda est desservi par Keikyu et le Tokyo Monorail. Narita propose les réseaux JR et Keisei. Choisissez selon le quartier de votre hébergement et vérifiez le terminal, les réservations et les solutions tard le soir.",
      "rain": "Explorez le Musée national de Tokyo à Ueno. Consultez le calendrier des expositions, puis prévoyez déjeuner et cafés dans le même quartier pour éviter de traverser la ville sous la pluie.",
      "prepare": "Enregistrez l’adresse de votre hôtel en japonais. Vérifiez les sorties des gares et prévoyez du temps pour les correspondances. Réservez les visites à créneau horaire directement auprès du lieu."
    },
    "es": {
      "suits": "Paseos por barrios, museos, compras y una primera visita con buenas conexiones de transporte.",
      "stay": "Ueno resulta práctico para los museos y el este de Tokio. Shinjuku tiene muchas conexiones, pero sus estaciones son grandes; la estación de Tokio facilita continuar en shinkansen. Comprueba la salida concreta antes de reservar.",
      "arrival": "Haneda conecta con Keikyu y Tokyo Monorail. Narita ofrece opciones de JR y Keisei. Elige según la zona de tu alojamiento y consulta la terminal, las reservas y las alternativas nocturnas.",
      "rain": "Explora el Museo Nacional de Tokio en Ueno. Consulta el calendario de exposiciones y organiza el almuerzo y las cafeterías en la misma zona para no cruzar la ciudad bajo la lluvia.",
      "prepare": "Guarda la dirección del hotel en japonés. Revisa las salidas de las estaciones y deja tiempo para los transbordos. Reserva las atracciones con hora de entrada directamente con el recinto."
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
    "ko": {
      "suits": "호숫가 풍경과 여유로운 하룻밤 여행에 좋습니다. 이 가이드는 가와구치코 주변 관광을 다루며, 정상 등반 안내가 아닙니다.",
      "stay": "차가 없다면 가와구치코역 근처가 편리합니다. 호숫가 숙소는 경치가 좋지만 버스나 호텔 픽업이 필요할 수 있으니 예약 전 막차를 확인하세요.",
      "arrival": "도쿄의 공항에서 먼저 시내로 이동한 뒤, 확인한 가와구치코행 열차나 고속버스로 갈아타세요. 착륙 직후 촉박한 연결편을 예약하기보다 환승 여유를 두세요.",
      "rain": "야마나시현립 후지산 세계유산센터에서 산의 문화적 이야기를 알아보세요. 개관 일정과 교통편을 확인하세요. 흐린 날에는 산이 전혀 보이지 않을 수도 있습니다.",
      "prepare": "겹쳐 입을 옷을 준비하고 돌아오는 버스 시간을 확인하세요. 혼잡한 교통편은 예약하세요. 등산은 최신 공식 등산로 규칙과 날씨를 바탕으로 별도 계획을 세우세요."
    },
    "zh-CN": {
      "suits": "适合欣赏湖畔风光并悠闲住上一晚。本指南介绍河口湖周边观光，不提供登顶指引。",
      "stay": "没有汽车时，河口湖站附近较方便。湖畔住宿风景优美，但可能需要巴士或酒店接送；预订前请确认末班车。",
      "arrival": "从东京的机场先前往市区，再换乘已确认的河口湖方向列车或高速巴士。预留换乘时间，不要预订落地后衔接过紧的班次。",
      "rain": "到山梨县立富士山世界遗产中心了解这座山的文化故事。确认开放日历和交通；阴天可能完全看不到山。",
      "prepare": "准备可分层穿搭的衣物，确认返程巴士时间。热门班次请提前预约。若要登山，请根据最新官方登山道规定和天气另行制定计划。"
    },
    "vi": {
      "suits": "Phù hợp để ngắm cảnh ven hồ và nghỉ qua đêm thong thả. Hướng dẫn này giới thiệu tham quan quanh Kawaguchiko, không hướng dẫn leo lên đỉnh núi.",
      "stay": "Gần ga Kawaguchiko thuận tiện nếu không có ô tô. Nơi ở ven hồ có cảnh đẹp nhưng có thể cần xe buýt hoặc xe đón của khách sạn; xác nhận chuyến cuối trước khi đặt.",
      "arrival": "Từ sân bay ở Tokyo, vào thành phố trước rồi nối chuyến tàu hoặc xe buýt đường dài đến Kawaguchiko đã được xác nhận. Dành thời gian dự phòng thay vì đặt chuyến nối quá sát giờ hạ cánh.",
      "rain": "Tham quan Trung tâm Di sản Thế giới Fujisan tỉnh Yamanashi để tìm hiểu câu chuyện văn hóa của núi. Kiểm tra lịch mở cửa và phương tiện đi lại; ngày nhiều mây có thể không nhìn thấy núi.",
      "prepare": "Mang quần áo mặc nhiều lớp và kiểm tra giờ xe buýt về. Đặt trước các chuyến đông khách. Nếu leo núi, lập kế hoạch riêng dựa trên quy định đường leo chính thức và thời tiết hiện tại."
    },
    "fr": {
      "suits": "Paysages au bord du lac et nuitée à un rythme tranquille. Ce guide concerne les visites autour de Kawaguchiko, pas l’ascension du sommet.",
      "stay": "Les environs de la gare de Kawaguchiko sont pratiques sans voiture. Les hébergements au bord du lac offrent de beaux paysages, mais peuvent nécessiter un bus ou une navette de l’hôtel ; vérifiez le dernier service avant de réserver.",
      "arrival": "Depuis un aéroport de Tokyo, rejoignez d’abord la ville, puis le train ou le car pour Kawaguchiko dont vous avez confirmé le trajet. Prévoyez une marge de correspondance plutôt qu’un départ trop proche de l’atterrissage.",
      "rain": "Visitez le Centre du patrimoine mondial Fujisan de la préfecture de Yamanashi pour découvrir l’histoire culturelle de la montagne. Vérifiez le calendrier d’ouverture et les transports ; par temps couvert, la montagne peut être entièrement invisible.",
      "prepare": "Prévoyez plusieurs couches de vêtements et vérifiez les horaires de retour des bus. Réservez les services fréquentés. Pour une ascension, préparez un programme distinct selon les règles officielles des sentiers et la météo actuelles."
    },
    "es": {
      "suits": "Paisajes junto al lago y una noche a un ritmo tranquilo. Esta guía cubre las visitas alrededor de Kawaguchiko, no la ascensión a la cima.",
      "stay": "Cerca de la estación de Kawaguchiko es práctico si no tienes coche. Los alojamientos junto al lago ofrecen vistas, pero pueden necesitar autobús o recogida del hotel; confirma el último servicio antes de reservar.",
      "arrival": "Desde un aeropuerto de Tokio, ve primero a la ciudad y conecta con el tren o autobús de larga distancia a Kawaguchiko que hayas confirmado. Deja margen para el transbordo en lugar de reservar una conexión ajustada tras aterrizar.",
      "rain": "Visita el Centro del Patrimonio Mundial Fujisan de la Prefectura de Yamanashi para conocer la historia cultural de la montaña. Consulta el calendario de apertura y el transporte; un día nublado puede dejarla completamente oculta.",
      "prepare": "Lleva ropa por capas y consulta los horarios de vuelta del autobús. Reserva los servicios más concurridos. Para escalar, prepara un plan aparte basado en las normas oficiales actuales de los senderos y en el tiempo."
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
    "ko": {
      "suits": "음식, 저녁 산책과 간사이 여행의 도시 거점으로 좋습니다.",
      "stay": "난바는 먹거리 골목과 난카이 공항열차 이용에 편리합니다. 우메다는 JR 연결과 쇼핑에 좋습니다. 신오사카는 이른 신칸센 출발에 편리하지만 오사카역과는 다른 역입니다.",
      "arrival": "간사이공항에서 난카이 열차는 난바로, JR은 오사카의 다른 주요 거점으로 연결됩니다. 호텔까지의 경로를 비교하고 터미널에서 역까지 이동 방법을 확인하세요.",
      "rain": "성 근처의 오사카역사박물관이나 지붕 있는 상점가를 방문해 보세요. 전시 일정을 확인하고, 비 예보 때문에 멀리 떨어진 장소를 무리하게 넣지 마세요.",
      "prepare": "호텔에서 이용할 정확한 역과 출구를 저장하세요. 음식은 가게가 지정한 구역에서 먹고, 출국일에는 공항 이동 시간을 확보하세요."
    },
    "zh-CN": {
      "suits": "适合美食、夜间散步，以及作为关西旅行的城市据点。",
      "stay": "难波方便前往美食街和乘坐南海机场列车。梅田适合JR换乘和购物。新大阪适合赶早班新干线；请注意它与大阪站不是同一座车站。",
      "arrival": "从关西机场乘南海列车可到难波，JR则连接大阪其他主要枢纽。比较前往酒店的路线，并确认从航站楼到车站的换乘方式。",
      "rain": "可去大阪城附近的大阪历史博物馆，或有顶棚的商店街。确认展期，不要仅因下雨预报就塞入相距很远的景点。",
      "prepare": "保存酒店对应的准确车站和出口。在摊位指定区域用餐，并在离境当天留出前往机场的时间。"
    },
    "vi": {
      "suits": "Phù hợp để thưởng thức ẩm thực, đi dạo buổi tối và làm điểm lưu trú cho chuyến đi Kansai.",
      "stay": "Namba thuận tiện cho phố ẩm thực và tàu sân bay Nankai. Umeda phù hợp cho nối tuyến JR và mua sắm. Shin-Osaka tiện cho chuyến shinkansen sớm; đây là ga khác với ga Osaka.",
      "arrival": "Từ sân bay Kansai, tàu Nankai đến Namba còn JR đến các đầu mối khác của Osaka. So sánh đường đến khách sạn và kiểm tra cách đi từ nhà ga hành khách đến ga tàu.",
      "rain": "Thử Bảo tàng Lịch sử Osaka gần lâu đài hoặc các phố mua sắm có mái che. Xác nhận lịch triển lãm và đừng vì dự báo mưa mà thêm quá nhiều điểm xa nhau.",
      "prepare": "Lưu chính xác ga và lối ra gần khách sạn. Ăn trong khu vực do quầy hàng chỉ định và dành thời gian ra sân bay vào ngày về."
    },
    "fr": {
      "suits": "Gastronomie, promenades en soirée et base urbaine pour un voyage dans le Kansai.",
      "stay": "Namba est pratique pour les rues gourmandes et les trains d’aéroport Nankai. Umeda convient aux correspondances JR et au shopping. Shin-Osaka est utile pour un shinkansen matinal ; il s’agit d’une gare différente de celle d’Osaka.",
      "arrival": "Depuis l’aéroport du Kansai, les trains Nankai desservent Namba tandis que JR rejoint d’autres pôles d’Osaka. Comparez le trajet jusqu’à votre hôtel et vérifiez le transfert du terminal à la gare.",
      "rain": "Essayez le Musée d’histoire d’Osaka, près du château, ou les galeries commerçantes couvertes. Confirmez les dates des expositions et ne surchargez pas votre programme de visites éloignées sous prétexte de pluie.",
      "prepare": "Enregistrez la gare et la sortie exactes de votre hôtel. Mangez dans l’espace désigné par le stand et gardez du temps pour le transfert à l’aéroport le jour du départ."
    },
    "es": {
      "suits": "Gastronomía, paseos al atardecer y una base urbana para recorrer Kansai.",
      "stay": "Namba resulta práctico para las calles gastronómicas y los trenes de aeropuerto Nankai. Umeda facilita las conexiones JR y las compras. Shin-Osaka sirve para salidas tempranas de shinkansen; es una estación distinta de Osaka.",
      "arrival": "Desde el aeropuerto de Kansai, los trenes Nankai llegan a Namba y los servicios JR a otros centros de conexión de Osaka. Compara el recorrido hasta tu hotel y comprueba el traslado de la terminal a la estación.",
      "rain": "Prueba el Museo de Historia de Osaka, cerca del castillo, o las galerías comerciales cubiertas. Confirma las fechas de las exposiciones y no llenes el día de paradas lejanas solo porque se anuncie lluvia.",
      "prepare": "Guarda la estación y la salida exactas de tu hotel. Come en la zona designada por el puesto y deja margen para el traslado al aeropuerto el día de salida."
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
    "ko": {
      "suits": "삿포로를 거점으로 지역 음식과 계절 나들이를 즐기기 좋습니다. 홋카이도의 먼 지역은 별도의 이동일이 필요합니다.",
      "stay": "삿포로역은 기차 도착과 오타루 여행에 편리합니다. 오도리는 시내 산책의 중심지이고, 스스키노는 저녁 식사에 좋습니다. 겨울에는 얼어붙은 보행로와 계단 없는 접근 경로를 확인하세요.",
      "arrival": "JR 공항열차가 신치토세와 삿포로를 연결합니다. 지정석과 자유석을 비교하고 국제선 터미널에서 역까지 걷는 시간을 고려하세요.",
      "rain": "홋카이도대학교 종합박물관이나 삿포로맥주박물관 등 삿포로의 박물관을 선택하세요. 개관일을 확인하고 교통편을 확인하지 않은 채 먼 교외 명소로 대체하지 마세요.",
      "prepare": "계절에 맞는 신발을 신으세요. 항공편 전에는 날씨에 따른 여유를 두고, 도시를 떠나기 전에 교외 버스의 돌아오는 편을 확인하세요."
    },
    "zh-CN": {
      "suits": "适合以札幌为据点，品尝当地美食并安排季节性出游。北海道较远的地区需另留交通日。",
      "stay": "札幌站适合乘火车抵达和前往小樽。大通位于市中心，方便散步；薄野适合晚间用餐。冬季请确认结冰路段和无台阶通道。",
      "arrival": "JR机场列车连接新千岁机场和札幌。比较指定席与自由席，并预留从国际航站楼步行到车站的时间。",
      "rain": "可选择札幌市内博物馆，如北海道大学综合博物馆或札幌啤酒博物馆。确认开放日；未查好交通前，不要换成远处的乡村景点。",
      "prepare": "穿适合季节的鞋。搭飞机前预留应对天气的时间，并在离开市区前确认郊区巴士的返程班次。"
    },
    "vi": {
      "suits": "Lấy Sapporo làm điểm lưu trú, thưởng thức món địa phương và đi chơi theo mùa. Những vùng xa ở Hokkaido cần dành riêng ngày di chuyển.",
      "stay": "Ga Sapporo thuận tiện khi đến bằng tàu và đi Otaru. Odori ở trung tâm, phù hợp đi dạo; Susukino thích hợp ăn tối. Vào mùa đông, kiểm tra đường đi có băng và lối đi không bậc thang.",
      "arrival": "Tàu sân bay JR nối New Chitose với Sapporo. So sánh ghế đặt trước và ghế không đặt trước, đồng thời dành thời gian đi bộ từ nhà ga quốc tế đến ga tàu.",
      "rain": "Chọn một bảo tàng ở Sapporo như Bảo tàng Đại học Hokkaido hoặc Bảo tàng Bia Sapporo. Xác minh ngày mở cửa; đừng thay bằng điểm vùng quê xa khi chưa kiểm tra phương tiện đi lại.",
      "prepare": "Mang giày phù hợp với mùa. Dành thời gian dự phòng thời tiết trước chuyến bay và kiểm tra chuyến xe buýt về từ vùng ngoại ô trước khi rời thành phố."
    },
    "fr": {
      "suits": "Une base à Sapporo, des spécialités locales et des sorties de saison. Les régions éloignées de Hokkaido nécessitent des journées de transport distinctes.",
      "stay": "La gare de Sapporo est pratique pour arriver en train et visiter Otaru. Odori est central pour les promenades ; Susukino convient aux dîners. En hiver, vérifiez les chemins verglacés et les accès sans marches.",
      "arrival": "Les trains d’aéroport JR relient New Chitose à Sapporo. Comparez les places réservées et sans réservation, et prévoyez le temps de marche entre le terminal international et la gare.",
      "rain": "Choisissez un musée à Sapporo, comme le musée de l’université de Hokkaido ou le musée de la bière de Sapporo. Vérifiez les jours d’ouverture ; ne remplacez pas ce choix par un site rural éloigné sans consulter les transports.",
      "prepare": "Portez des chaussures adaptées à la saison. Prévoyez une marge météo avant les vols et vérifiez les bus de retour des zones rurales avant de quitter la ville."
    },
    "es": {
      "suits": "Una base en Sapporo, gastronomía regional y excursiones de temporada. Las zonas lejanas de Hokkaido necesitan días de traslado aparte.",
      "stay": "La estación de Sapporo facilita las llegadas en tren y los viajes a Otaru. Odori es céntrico para pasear; Susukino ofrece cenas. En invierno, comprueba las rutas heladas y los accesos sin escalones.",
      "arrival": "Los trenes de aeropuerto JR conectan New Chitose con Sapporo. Compara las opciones con y sin reserva y deja tiempo para caminar desde la terminal internacional a la estación.",
      "rain": "Elige un museo de Sapporo, como el Museo de la Universidad de Hokkaido o el Museo de la Cerveza de Sapporo. Verifica los días de apertura; no lo sustituyas por una atracción rural lejana sin consultar el transporte.",
      "prepare": "Lleva calzado adecuado para la estación. Deja margen por el tiempo antes de los vuelos y confirma los autobuses de regreso desde las zonas rurales antes de salir de la ciudad."
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
    "ko": {
      "suits": "류큐 문화, 지역 음식과 나하를 거점으로 한 여행에 좋습니다. 해변 리조트와 다른 섬은 추가 교통 계획이 필요합니다.",
      "stay": "차 없이 시내에 머문다면 나하의 유이레일역 근처가 편리합니다. 국제거리와 주변 골목에는 식당이 많습니다. 해안 리조트는 별도 공항 이동편이 필요할 수 있습니다.",
      "arrival": "유이레일은 나하공항과 시내를 연결합니다. 노선 밖 지역은 버스나 숙소 송영을 비교하세요. 다른 섬은 별도의 항공편이나 여객선 계획이 필요합니다.",
      "rain": "일반적인 비라면 오키나와현립박물관·미술관이나 지붕 있는 시장 골목을 둘러보세요. 태풍 때는 실내 나들이를 찾기보다 현지 지시에 따라 관광을 중단하세요.",
      "prepare": "햇빛 차단용품과 물을 준비하세요. 바다 상태, 여객선 공지와 숙소 취소 규정을 확인하세요. 폭풍 시기에는 항공 일정에 여유를 두세요."
    },
    "zh-CN": {
      "suits": "适合体验琉球文化、当地美食并以那霸为据点。海滨度假村和其他岛屿需额外规划交通。",
      "stay": "不自驾的市区住宿可选择那霸的Yui Rail车站附近。国际通及周边街道餐饮选择较多；海边度假村可能需要另行安排机场接送。",
      "arrival": "Yui Rail连接那霸机场和市区。前往线路以外的地区，可比较巴士和住宿接送。其他岛屿需单独安排航班或渡轮。",
      "rain": "普通雨天可参观冲绳县立博物馆·美术馆，或逛有顶棚的市场巷道。台风期间请遵从当地指示并暂停观光，而不是另找室内活动外出。",
      "prepare": "准备防晒用品和饮用水。确认海况、渡轮公告及住宿取消规定。在风暴季为航班安排保留灵活空间。"
    },
    "vi": {
      "suits": "Phù hợp để tìm hiểu văn hóa Ryukyu, thưởng thức món địa phương và lưu trú tại Naha. Khu nghỉ dưỡng bãi biển và các đảo khác cần lên kế hoạch giao thông thêm.",
      "stay": "Gần ga Yui Rail ở Naha phù hợp để ở trong thành phố mà không cần ô tô. Kokusai-dori và các phố lân cận có nhiều lựa chọn ăn uống; khu nghỉ dưỡng ven biển có thể cần chuyến đưa đón sân bay riêng.",
      "arrival": "Yui Rail nối sân bay Naha với thành phố. Với nơi ngoài tuyến, so sánh xe buýt hoặc xe đưa đón của chỗ ở. Các đảo khác cần kế hoạch chuyến bay hoặc phà riêng.",
      "rain": "Khi mưa bình thường, tham quan Bảo tàng và Bảo tàng Mỹ thuật tỉnh Okinawa hoặc các lối chợ có mái che. Khi có bão, tuân thủ hướng dẫn địa phương và tạm ngừng tham quan thay vì tìm hoạt động trong nhà để ra ngoài.",
      "prepare": "Mang đồ chống nắng và nước uống. Kiểm tra tình trạng biển, thông báo phà và điều kiện hủy chỗ ở. Giữ lịch bay linh hoạt trong mùa bão."
    },
    "fr": {
      "suits": "Culture des Ryukyu, cuisine locale et séjour basé à Naha. Les stations balnéaires et les autres îles demandent une planification supplémentaire des transports.",
      "stay": "Près d’une station du Yui Rail à Naha, un séjour urbain sans voiture est pratique. Kokusai-dori et les rues voisines offrent des restaurants ; un complexe côtier peut nécessiter un transfert d’aéroport séparé.",
      "arrival": "Le Yui Rail relie l’aéroport de Naha à la ville. Pour les zones hors de la ligne, comparez bus et transferts de l’hébergement. Les autres îles nécessitent leur propre programme de vol ou de ferry.",
      "rain": "Par pluie ordinaire, visitez le Musée préfectoral et Musée d’art d’Okinawa ou les allées couvertes du marché. En cas de typhon, suivez les consignes locales et interrompez les visites plutôt que de chercher une sortie en intérieur.",
      "prepare": "Emportez une protection solaire et de l’eau. Consultez l’état de la mer, les avis des ferries et les conditions d’annulation de l’hébergement. Gardez de la souplesse pour les vols pendant la saison des tempêtes."
    },
    "es": {
      "suits": "Cultura de Ryukyu, gastronomía local y una base en Naha. Los complejos de playa y otras islas necesitan planificación adicional de transporte.",
      "stay": "Cerca de una estación de Yui Rail en Naha es práctico para una estancia urbana sin coche. Kokusai-dori y las calles cercanas ofrecen restaurantes; un complejo costero puede requerir un traslado de aeropuerto aparte.",
      "arrival": "Yui Rail conecta el aeropuerto de Naha con la ciudad. Para zonas fuera de la línea, compara autobuses o traslados del alojamiento. Otras islas necesitan su propio plan de vuelos o ferris.",
      "rain": "Con lluvia normal, visita el Museo y Museo de Arte de la Prefectura de Okinawa o los pasillos cubiertos del mercado. Durante un tifón, sigue las instrucciones locales y suspende las visitas en lugar de buscar una salida de interior.",
      "prepare": "Lleva protección solar y agua. Consulta el estado del mar, los avisos de ferris y las condiciones de cancelación del alojamiento. Mantén flexibilidad con los vuelos en temporada de tormentas."
    },
  },
}
