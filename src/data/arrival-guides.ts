import type { Locale } from '@/i18n/config'
type Arrival = {
  reviewedAt: string
  code: string
  source: string
  steps: Record<Locale, string[]>
}
export const arrivalGuides: Arrival[] = [
  {
    code: 'HND · Haneda',
    reviewedAt: '2026-10-25',
    source: 'https://tokyo-haneda.com/en/access/index.html',
    steps: {
      en: [
        'Confirm Terminal 1, 2 or 3 after collecting bags.',
        'Compare Keikyu toward Shinagawa with Tokyo Monorail toward Hamamatsucho for your hotel address.',
        'Check the final transfer, station exit and last service on the airport route search before buying.',
      ],
"ko": [
  "수하물을 찾은 뒤 터미널 1·2·3 중 어디인지 확인하세요.",
  "호텔 주소에 맞춰 시나가와행 게이큐와 하마마쓰초행 도쿄 모노레일을 비교하세요.",
  "구매 전에 공항 경로 검색에서 마지막 환승, 역 출구와 막차를 확인하세요."
],
"zh-CN": [
  "取行李后确认位于第 1、2 或 3 航站楼。",
  "按酒店地址比较前往品川的京急和前往滨松町的东京单轨电车。",
  "购票前在机场路线查询中核对最后一次换乘、车站出口和末班车。"
],
"vi": [
  "Sau khi nhận hành lý, xác nhận nhà ga 1, 2 hay 3.",
  "Theo địa chỉ khách sạn, so sánh Keikyu hướng Shinagawa với Tokyo Monorail hướng Hamamatsucho.",
  "Trước khi mua, dùng công cụ tìm tuyến của sân bay để kiểm tra lần đổi cuối, lối ra ga và chuyến cuối."
],
"fr": [
  "Après les bagages, confirmez le terminal 1, 2 ou 3.",
  "Selon l’adresse de l’hôtel, comparez Keikyu vers Shinagawa et Tokyo Monorail vers Hamamatsucho.",
  "Avant l’achat, vérifiez dernière correspondance, sortie et dernier service dans le moteur d’itinéraire de l’aéroport."
],
"es": [
  "Tras recoger el equipaje, confirma si estás en la terminal 1, 2 o 3.",
  "Según la dirección del hotel, compara Keikyu hacia Shinagawa y Tokyo Monorail hacia Hamamatsucho.",
  "Antes de comprar, comprueba el último transbordo, la salida de la estación y el último servicio en el buscador de rutas del aeropuerto."
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
    reviewedAt: '2026-10-25',
    source: 'https://www.narita-airport.jp/en/access/',
    steps: {
      en: [
        'Confirm your terminal and follow signs to its rail connection; check the terminal-transfer guide when arriving at Terminal 3.',
        'Compare JR Narita Express, Keisei services and airport buses for your actual hotel area.',
        'Check seat booking, the complete fare and hotel check-in deadline; do not assume every Keisei train is Skyliner.',
      ],
"ko": [
  "터미널을 확인하고 철도 연결 표지를 따르세요. 터미널 3 도착 시 터미널 이동 안내를 확인하세요.",
  "호텔이 실제로 있는 지역에 맞춰 JR 나리타 익스프레스, 게이세이 노선과 공항버스를 비교하세요.",
  "좌석 예약, 전체 요금과 호텔 체크인 마감 시간을 확인하세요. 모든 게이세이 열차가 스카이라이너는 아닙니다."
],
"zh-CN": [
  "确认航站楼并按标识前往铁路连接处；抵达第 3 航站楼时，请查看航站楼间交通指南。",
  "按酒店实际所在区域比较 JR 成田特快、京成各线及机场巴士。",
  "核对订座、总票价及酒店最晚入住时间；并非每班京成列车都是 Skyliner。"
],
"vi": [
  "Xác nhận nhà ga và theo biển đến đường sắt; nếu đến nhà ga 3, xem hướng dẫn di chuyển giữa các nhà ga.",
  "So sánh JR Narita Express, các dịch vụ Keisei và xe buýt sân bay theo khu vực khách sạn thực tế.",
  "Kiểm tra đặt chỗ, tổng giá vé và hạn chót nhận phòng; không phải tàu Keisei nào cũng là Skyliner."
],
"fr": [
  "Confirmez le terminal et suivez les panneaux ferroviaires ; au terminal 3, consultez le guide des transferts entre terminaux.",
  "Comparez JR Narita Express, services Keisei et bus d’aéroport selon le quartier exact de l’hôtel.",
  "Vérifiez réservation, prix total et heure limite d’arrivée à l’hôtel ; tous les trains Keisei ne sont pas des Skyliner."
],
"es": [
  "Confirma la terminal y sigue las señales hacia el tren; si llegas a la terminal 3, consulta la guía de traslados entre terminales.",
  "Compara JR Narita Express, los servicios Keisei y los autobuses del aeropuerto para la zona real del hotel.",
  "Comprueba la reserva de asiento, el precio completo y la hora límite de entrada al hotel; no todos los trenes Keisei son Skyliner."
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
    reviewedAt: '2026-10-25',
    source: 'https://www.kansai-airport.or.jp/en/access/from-airport/train',
    steps: {
      en: [
        'Use the airport guide to reach Kansai-airport Station; Terminal 2 needs a terminal transfer.',
        'Compare Nankai for Namba with JR routes for Tennoji, Osaka or Kyoto.',
        'Choose the train type, check any limited-express supplement, and save the hotel’s final walking route.',
      ],
"ko": [
  "공항 안내에 따라 간사이공항역으로 가세요. 터미널 2에서는 터미널 간 이동이 필요합니다.",
  "난바행 난카이와 덴노지·오사카·교토행 JR 노선을 비교하세요.",
  "열차 종류와 특급 추가 요금을 확인하고 호텔까지 마지막 도보 경로를 저장하세요."
],
"zh-CN": [
  "按机场指南前往关西机场站；第 2 航站楼需要先转乘航站楼间交通。",
  "比较前往难波的南海电铁与前往天王寺、大阪或京都的 JR 路线。",
  "选择列车类型，核对特急附加费，并保存最后一段步行到酒店的路线。"
],
"vi": [
  "Theo hướng dẫn sân bay đến ga Kansai-airport; từ nhà ga 2 cần di chuyển sang nhà ga khác.",
  "So sánh Nankai đi Namba với các tuyến JR đi Tennoji, Osaka hoặc Kyoto.",
  "Chọn loại tàu, kiểm tra phụ phí tốc hành và lưu đoạn đi bộ cuối đến khách sạn."
],
"fr": [
  "Suivez le guide de l’aéroport vers la gare Kansai-airport ; le terminal 2 nécessite un transfert entre terminaux.",
  "Comparez Nankai vers Namba et les lignes JR vers Tennoji, Osaka ou Kyoto.",
  "Choisissez le type de train, vérifiez le supplément express éventuel et enregistrez le dernier trajet à pied vers l’hôtel."
],
"es": [
  "Sigue la guía del aeropuerto para llegar a la estación Kansai-airport; desde la terminal 2 hay que trasladarse entre terminales.",
  "Compara Nankai hacia Namba con las rutas JR hacia Tennoji, Osaka o Kioto.",
  "Elige el tipo de tren, comprueba los suplementos de expreso y guarda el último tramo a pie hasta el hotel."
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
    reviewedAt: '2026-10-25',
    source: 'https://www.hokkaido-airports.com/en/new-chitose/access/',
    steps: {
      en: [
        'Follow rail signs toward the domestic-terminal basement; allow time to walk from international arrivals.',
        'Compare the JR service toward Sapporo with the bus route closest to your hotel.',
        'Check the day’s departure information and leave extra time if snow disrupts connections.',
      ],
"ko": [
  "철도 표지를 따라 국내선 터미널 지하로 가세요. 국제선 도착장에서 걸어가는 시간을 고려하세요.",
  "삿포로행 JR과 호텔에 가장 가까이 가는 버스 노선을 비교하세요.",
  "당일 출발 정보를 확인하고 눈으로 환승이 지연될 경우 여유 시간을 더 두세요."
],
"zh-CN": [
  "按铁路标识前往国内线航站楼地下层；请预留从国际到达区步行的时间。",
  "比较前往札幌的 JR 和最靠近酒店的巴士线路。",
  "查看当天发车信息；如降雪影响换乘，请多留时间。"
],
"vi": [
  "Theo biển đường sắt xuống tầng hầm nhà ga nội địa; dành thời gian đi bộ từ khu đến quốc tế.",
  "So sánh tàu JR hướng Sapporo với tuyến xe buýt đến gần khách sạn nhất.",
  "Kiểm tra thông tin khởi hành trong ngày và dành thêm thời gian nếu tuyết ảnh hưởng việc nối chuyến."
],
"fr": [
  "Suivez les panneaux ferroviaires vers le sous-sol du terminal intérieur ; prévoyez la marche depuis les arrivées internationales.",
  "Comparez le train JR vers Sapporo et le bus le plus proche de l’hôtel.",
  "Vérifiez les départs du jour et prévoyez une marge si la neige perturbe les correspondances."
],
"es": [
  "Sigue las señales del tren hacia el sótano de la terminal nacional; deja tiempo para caminar desde las llegadas internacionales.",
  "Compara el servicio JR hacia Sapporo con la ruta de autobús más cercana al hotel.",
  "Consulta las salidas del día y deja más margen si la nieve afecta a las conexiones."
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
    reviewedAt: '2026-10-25',
    source: 'https://www.naha-airport.co.jp/en/access/',
    steps: {
      en: [
        'Follow airport signs to the monorail connection.',
        'Choose a Yui Rail stop near your Naha hotel, or compare a bus/taxi for places outside the rail corridor.',
        'Save the last walking leg; the monorail does not cover all of Okinawa or its other islands.',
      ],
"ko": [
  "공항 표지를 따라 모노레일 연결 통로로 가세요.",
  "나하 호텔 근처 유이레일 역을 고르거나 철도 구간 밖의 장소는 버스·택시와 비교하세요.",
  "마지막 도보 구간을 저장하세요. 모노레일은 오키나와 전역이나 다른 섬을 연결하지 않습니다."
],
"zh-CN": [
  "按机场标识前往单轨电车连接处。",
  "选择靠近那霸酒店的 Yui Rail 车站；若目的地不在沿线，请比较巴士或出租车。",
  "保存最后一段步行路线；单轨电车并不覆盖冲绳全境或其他岛屿。"
],
"vi": [
  "Theo biển sân bay đến điểm nối tàu một ray.",
  "Chọn ga Yui Rail gần khách sạn ở Naha, hoặc so sánh xe buýt/taxi nếu ngoài hành lang đường sắt.",
  "Lưu đoạn đi bộ cuối; tàu một ray không phủ toàn bộ Okinawa hay các đảo khác."
],
"fr": [
  "Suivez les panneaux vers le monorail.",
  "Choisissez un arrêt Yui Rail près de l’hôtel à Naha, ou comparez bus et taxi hors du corridor ferroviaire.",
  "Enregistrez le dernier trajet à pied ; le monorail ne dessert pas tout Okinawa ni les autres îles."
],
"es": [
  "Sigue las señales del aeropuerto hacia el monorraíl.",
  "Elige una parada de Yui Rail cerca del hotel en Naha o compara autobús y taxi para lugares fuera de la línea.",
  "Guarda el último tramo a pie; el monorraíl no cubre todo Okinawa ni sus otras islas."
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
"ko": [
  "예: JR 일반 열차는 기본 운임을 냅니다. 특급은 보통 특급권도 필요하며, 일부 상품은 두 요금을 한 장에 포함합니다.",
  "지정석은 날짜, 열차, 차량과 좌석을 맞춰 확인하세요. IC 카드 잔액만으로 특급 좌석 예약이 증명되지는 않습니다.",
  "JR에서 사철이나 지하철로 갈아탈 때는 운영사와 환승 개찰구를 확인하세요. 패스나 승차권이 다음 구간을 포함하지 않을 수 있습니다."
],
"zh-CN": [
  "例如，乘坐 JR 普通列车需支付基本车费；特急通常还需特急券，有些产品将两者合并在一张票中。",
  "指定席请核对日期、列车、车厢和座位；IC 卡余额本身不能证明已预订特急座位。",
  "从 JR 换乘私铁或地铁时，请确认运营方及换乘闸机；通票或车票可能不包含下一段。"
],
"vi": [
  "Ví dụ: tàu JR địa phương dùng vé cơ bản. Tàu tốc hành thường cần thêm vé tốc hành; một số sản phẩm gộp cả hai trên một vé.",
  "Với chỗ đặt trước, kiểm tra ngày, tàu, toa và ghế. Số dư IC không chứng minh đã đặt ghế tốc hành.",
  "Khi đổi từ JR sang đường sắt tư nhân hoặc tàu điện ngầm, kiểm tra hãng và cổng đổi tuyến; thẻ hoặc vé có thể không bao gồm chặng tiếp theo."
],
"fr": [
  "Exemple : un trajet local JR utilise un tarif de base. Un express nécessite généralement aussi un billet express ; certains produits regroupent les deux.",
  "Pour une place réservée, vérifiez date, train, voiture et siège. Le solde IC seul ne prouve pas la réservation du siège express.",
  "En passant de JR à un réseau privé ou au métro, vérifiez opérateur et portillons de correspondance ; le pass ou billet peut exclure la suite."
],
"es": [
  "Ejemplo: un trayecto local de JR usa una tarifa básica. Un expreso suele necesitar además un billete de suplemento; algunos productos combinan ambos en un solo billete.",
  "Para un asiento reservado, verifica fecha, tren, vagón y asiento. Tener saldo en la tarjeta IC no demuestra que el asiento del expreso esté reservado.",
  "Al cambiar de JR a una compañía privada o al metro, comprueba el operador y las puertas de transbordo; tu pase o billete puede no cubrir el siguiente tramo."
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
    reviewedAt: '2026-10-25',
    source: 'https://tokyo-haneda.com/en/access/bus/index.html',
    en: {
      title: 'Arriving late',
      text: 'Plan from the time you leave arrivals, including immigration and baggage. Check the last connection all the way to your hotel, not only the first train. Haneda lists late-night bus options, but their routes and operating days vary. If no connection works, arrange an airport-area night or a taxi quote and notify your hotel of late check-in.',
    },
"ko": {
  "title": "늦은 시간 도착",
  "text": "입국 심사와 수하물 수취를 포함해 도착장을 나오는 시점부터 계획하세요. 첫 기차뿐 아니라 호텔까지 모든 막차 연결을 확인하세요. 하네다 심야버스는 노선과 운행일이 다릅니다. 연결편이 없으면 공항 근처 숙박이나 택시 견적을 준비하고 호텔에 늦은 체크인을 알리세요."
},
"zh-CN": {
  "title": "深夜抵达",
  "text": "请从走出到达区的时间开始规划，计入入境及取行李时间。核对直到酒店的末班衔接，不只是首班车。羽田虽列有深夜巴士，但线路和运营日各异。如无合适交通，请安排机场周边住宿或询问出租车报价，并告知酒店会晚到。"
},
"vi": {
  "title": "Đến muộn",
  "text": "Tính từ lúc rời khu đến, gồm cả nhập cảnh và hành lý. Kiểm tra chuyến cuối đến tận khách sạn, không chỉ tàu đầu tiên. Haneda có thông tin xe buýt đêm nhưng tuyến và ngày chạy khác nhau. Nếu không nối chuyến được, đặt đêm gần sân bay hoặc hỏi giá taxi và báo khách sạn nhận phòng muộn."
},
"fr": {
  "title": "Arrivée tardive",
  "text": "Planifiez depuis la sortie des arrivées, immigration et bagages compris. Vérifiez la dernière liaison jusqu’à l’hôtel, pas seulement le premier train. Haneda propose des bus nocturnes dont lignes et jours varient. Sans liaison adaptée, prévoyez une nuit près de l’aéroport ou un devis taxi et prévenez l’hôtel de votre retard."
},
"es": {
  "title": "Llegadas tardías",
  "text": "Calcula desde que salgas de llegadas, incluyendo inmigración y equipaje. Comprueba la última conexión hasta el hotel, no solo el primer tren. Haneda indica autobuses nocturnos, pero sus rutas y días varían. Si no hay conexión útil, organiza una noche junto al aeropuerto o pide presupuesto de taxi y avisa al hotel de la llegada tardía."
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
    reviewedAt: '2026-10-25',
    source: 'https://www.narita-airport.jp/en/service/delivery/',
    en: {
      title: 'Large bags and forwarding',
      text: 'Narita lists baggage delivery, storage and lockers by terminal. Before forwarding, confirm counter hours, delivery date, size limits and whether your accommodation accepts bags. Keep first-night essentials with you; do not assume same-day delivery. For trains, check the chosen service’s luggage rules and lift exits.',
    },
"ko": {
  "title": "큰 짐과 배송",
  "text": "나리타는 터미널별 배송·보관·사물함을 안내합니다. 배송 전 창구 시간, 도착일, 크기 제한과 숙소 수령 가능 여부를 확인하세요. 첫날 필수품은 직접 챙기고 당일 배송을 가정하지 마세요. 이용 열차의 짐 규정과 엘리베이터 출구도 확인하세요."
},
"zh-CN": {
  "title": "大件行李与配送",
  "text": "成田机场按航站楼列出行李配送、寄存及储物柜。寄送前请确认柜台时间、送达日期、尺寸限制及住宿方是否收件。第一晚必需品请随身带，不要假定能当日送达；乘车还需核对行李规定和电梯出口。"
},
"vi": {
  "title": "Hành lý lớn và gửi chuyển",
  "text": "Narita liệt kê dịch vụ giao, gửi hành lý và tủ theo nhà ga. Trước khi gửi, xác nhận giờ quầy, ngày giao, giới hạn kích thước và chỗ ở có nhận đồ không. Giữ đồ thiết yếu đêm đầu bên mình, không mặc định giao trong ngày. Kiểm tra quy định hành lý của tàu và lối ra có thang máy."
},
"fr": {
  "title": "Bagages volumineux et expédition",
  "text": "Narita répertorie livraison, consignes et casiers par terminal. Confirmez horaires du comptoir, date de livraison, dimensions et réception par l’hébergement. Gardez le nécessaire de la première nuit ; ne supposez pas une livraison le jour même. Vérifiez aussi règles de bagages du train et sorties avec ascenseur."
},
"es": {
  "title": "Maletas grandes y envío de equipaje",
  "text": "Narita enumera envíos, consignas y taquillas por terminal. Antes de enviar, confirma horarios, fecha de entrega, tamaños y si el alojamiento recibe equipaje. Lleva contigo lo necesario para la primera noche; no des por hecha la entrega en el día. Consulta las normas de equipaje del tren y las salidas con ascensor."
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
    reviewedAt: '2026-10-25',
    source:
      'https://tokyo-haneda.com/en/service/facilities/baby_nurseries.html',
    en: {
      title: 'Children and step-free transfers',
      text: 'Haneda’s nursery map distinguishes public areas from areas after security, and lists feeding and changing facilities. Locate a room in your arrival area before leaving. Allow an extra break before the train, find lift routes, and confirm child tickets, stroller space and any assistance directly with your chosen operator.',
    },
"ko": {
  "title": "어린이와 계단 없는 환승",
  "text": "하네다 수유실 지도는 일반 구역과 보안 검색 후 구역을 구분하고 수유·기저귀 교환 시설을 표시합니다. 출발 전에 도착 구역의 방을 찾으세요. 기차 전 휴식 시간을 더 두고 엘리베이터 경로, 어린이 요금, 유모차 공간과 필요한 지원을 운영사에 확인하세요."
},
"zh-CN": {
  "title": "儿童与无台阶换乘",
  "text": "羽田育婴室地图区分公共区和安检后区域，并标出哺乳及换尿布设施。离开前先确认到达区域内的房间。乘车前多留休息时间，查好电梯路线，并直接向运营方核实儿童票、婴儿车空间和所需协助。"
},
"vi": {
  "title": "Trẻ em và đổi tuyến không bậc thang",
  "text": "Bản đồ phòng chăm sóc trẻ của Haneda phân biệt khu công cộng và sau an ninh, kèm chỗ cho bú và thay tã. Tìm phòng trong khu đến trước khi rời đi. Nghỉ thêm trước khi lên tàu, tìm đường có thang máy và hỏi hãng về vé trẻ em, chỗ xe đẩy, hỗ trợ cần thiết."
},
"fr": {
  "title": "Enfants et correspondances sans marches",
  "text": "La carte des nurseries de Haneda distingue espaces publics et zones après contrôle, avec équipements d’allaitement et de change. Repérez une salle dans votre zone d’arrivée. Prévoyez une pause avant le train, cherchez les ascenseurs et confirmez billets enfants, place pour poussette et assistance auprès de l’opérateur."
},
"es": {
  "title": "Niños y transbordos sin escalones",
  "text": "El mapa de salas infantiles de Haneda distingue zonas públicas y posteriores al control, e indica áreas de lactancia y cambio. Localiza una sala en tu zona de llegada. Añade un descanso antes del tren, busca ascensores y confirma con el operador los billetes infantiles, el espacio para cochecitos y la asistencia."
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
] satisfies ({ source: string; reviewedAt: string } & Record<
  Locale,
  { title: string; text: string }
>)[]

export const workedTrainRouteReview = {
  source: 'https://www.jreast.co.jp/en/multi/nex/',
  reviewedAt: '2026-10-25',
}
export const workedTrainRoute: Record<Locale, string[]> = {
  en: [
    'Worked route: Narita Airport → Tokyo Station on JR Narita Express. At Terminal 1 use Narita Airport Station; at Terminals 2/3 follow the connection to Airport Terminal 2 Station.',
    'Select your travel date, departure and Tokyo as the destination. Confirm the base fare plus limited-express charge and your reserved train/car/seat; do not substitute an IC tap for the express ticket. Passes and bundles have their own eligibility and collection rules.',
    'Board the named train and get off at Tokyo. For an onward subway journey, follow that operator’s transfer signs and confirm the separate fare. Match the final station exit to your hotel; this example ends at Tokyo Station.',
  ],
"ko": [
  "경로 예시: JR 나리타 익스프레스로 나리타공항에서 도쿄역까지. 터미널 1은 나리타공항역, 터미널 2·3은 공항 제2빌딩역 연결 통로를 이용하세요.",
  "여행일, 출발지와 도착지 도쿄를 선택하세요. 기본 운임과 특급 요금, 예약 열차·차량·좌석을 확인하고 IC 카드 태그로 특급권을 대신하지 마세요. 패스·묶음 상품은 자격과 수령 조건이 별도로 있습니다.",
  "예약한 열차를 타고 도쿄역에서 내리세요. 지하철로 계속 이동하면 해당 운영사의 환승 표지와 별도 요금을 확인하세요. 호텔에 맞는 마지막 역 출구도 확인하세요. 이 예시는 도쿄역까지만 안내합니다."
],
"zh-CN": [
  "路线示例：乘 JR 成田特快从成田机场到东京站。第 1 航站楼使用成田机场站；第 2、3 航站楼请按标识前往机场第 2 航站楼站。",
  "选择出行日期、出发站和目的地东京。确认基本车费、特急费及已订列车、车厢和座位；刷 IC 卡不能代替特急券。通票和套票各有资格及领取规定。",
  "乘坐指定列车，在东京站下车。继续乘地铁时按该运营方换乘标识前行，并确认另计车费。核对酒店对应的最终车站出口；本示例到东京站为止。"
],
"vi": [
  "Ví dụ: đi JR Narita Express từ sân bay Narita đến ga Tokyo. Nhà ga 1 dùng ga Narita Airport; nhà ga 2/3 theo lối đến ga Airport Terminal 2.",
  "Chọn ngày, ga đi và Tokyo làm điểm đến. Xác nhận vé cơ bản cộng phí tốc hành và tàu/toa/ghế đã đặt; quẹt IC không thay vé tốc hành. Thẻ và gói vé có điều kiện sử dụng, nhận vé riêng.",
  "Lên đúng tàu và xuống ga Tokyo. Nếu đi tiếp bằng tàu điện ngầm, theo biển đổi tuyến của hãng đó và kiểm tra giá vé riêng. Chọn lối ra cuối phù hợp với khách sạn; ví dụ này kết thúc tại ga Tokyo."
],
"fr": [
  "Exemple : aéroport de Narita → gare de Tokyo en JR Narita Express. Au terminal 1, utilisez Narita Airport Station ; aux terminaux 2/3, suivez la liaison vers Airport Terminal 2 Station.",
  "Sélectionnez date, départ et Tokyo comme destination. Vérifiez tarif de base, supplément express et train/voiture/siège réservés ; un passage IC ne remplace pas le billet express. Les pass et offres groupées ont leurs propres conditions et modalités de retrait.",
  "Montez dans le train indiqué et descendez à Tokyo. Pour continuer en métro, suivez les panneaux de l’opérateur et vérifiez le tarif séparé. Faites correspondre la sortie finale à l’hôtel ; cet exemple s’arrête à la gare de Tokyo."
],
"es": [
  "Ejemplo: aeropuerto de Narita → estación de Tokio en JR Narita Express. En la terminal 1 usa Narita Airport Station; desde las terminales 2/3 sigue la conexión a Airport Terminal 2 Station.",
  "Elige fecha, origen y Tokio como destino. Confirma la tarifa básica, el suplemento de expreso y el tren/vagón/asiento reservado; un toque con la IC no sustituye al billete de expreso. Los pases y paquetes tienen requisitos y normas de recogida propios.",
  "Sube al tren indicado y baja en Tokio. Si continúas en metro, sigue las señales del operador y confirma la tarifa aparte. Comprueba la salida final para tu hotel; este ejemplo termina en la estación de Tokio."
],
  ja: [
    '具体例：成田空港→東京駅をJR成田エクスプレスで移動。第1ターミナルは成田空港駅、第2・3ターミナルは空港第2ビル駅への案内を確認。',
    '乗車日・発車時刻・目的地「東京」を選択。運賃と特急料金、指定列車・号車・席番を確認。ICのタッチだけで特急券の代わりにはなりません。パス・セット券は利用条件と受取方法を別途確認。',
    '指定の列車に乗り東京駅で下車。地下鉄へ乗り継ぐ場合は運行会社の案内と別途運賃を確認。宿に近い出口まで調べましょう。この例の終点は東京駅です。',
  ],
  th: [
    'ตัวอย่างเส้นทาง: สนามบินนาริตะ → สถานี Tokyo ด้วย JR Narita Express อาคาร 1 ใช้ Narita Airport Station ส่วนอาคาร 2/3 ตามป้ายเชื่อมไป Airport Terminal 2 Station',
    'เลือกวัน เวลาออก และปลายทาง Tokyo ตรวจค่าโดยสารพื้นฐานรวมค่าด่วนพิเศษ พร้อมขบวน ตู้ และที่นั่งที่จอง การแตะบัตร IC ไม่ใช้แทนตั๋วด่วน พาสหรือตั๋วชุดมีเงื่อนไขผู้ใช้และวิธีรับตั๋วแยกต่างหาก',
    'ขึ้นขบวนที่ระบุแล้วลง Tokyo หากต่อรถใต้ดิน ให้ตามป้ายของบริษัทนั้นและตรวจค่าโดยสารช่วงต่อ หาเส้นทางไปทางออกใกล้โรงแรม ตัวอย่างนี้สิ้นสุดที่สถานี Tokyo',
  ],
}

// Worked examples end at the named station; hotel transfers must be checked separately.
export const moreTrainRoutes: Arrival[] = [
  {
    code: 'CTS → Sapporo',
    reviewedAt: '2026-10-26',
    source: 'https://www.jrhokkaido.co.jp/global/english/travel/airport.html',
    steps: {
      en: [
        'At New Chitose Airport, follow JR signs and choose an Airport train stopping at Sapporo.',
        'Non-reserved seats use a basic ticket or supported IC card. Car 4 is reserved: buy the additional reserved-seat ticket before boarding it.',
        'Leave at Sapporo; check the exit and onward hotel route. A full non-reserved car does not guarantee a seat.',
      ],
"ko": [
  "신치토세공항에서 JR 표지를 따라 삿포로에 정차하는 에어포트 열차를 선택하세요.",
  "자유석은 기본 승차권이나 지원되는 IC 카드로 이용합니다. 4호차는 지정석이므로 탑승 전 추가 지정석권을 구매하세요.",
  "삿포로에서 내려 출구와 호텔까지 경로를 확인하세요. 자유석 차량이 만원이면 좌석이 보장되지 않습니다."
],
"zh-CN": [
  "在新千岁机场按 JR 标识前行，选择停靠札幌的 Airport 列车。",
  "自由席使用普通车票或受支持的 IC 卡。4 号车厢为指定席，进入前需另购指定席券。",
  "在札幌下车，确认出口及后续酒店路线。自由席车厢满员时不保证有座位。"
],
"vi": [
  "Tại sân bay New Chitose, theo biển JR và chọn tàu Airport dừng ở Sapporo.",
  "Ghế không đặt trước dùng vé cơ bản hoặc thẻ IC được hỗ trợ. Toa 4 là chỗ đặt trước: mua thêm vé ghế trước khi lên toa này.",
  "Xuống ở Sapporo; kiểm tra lối ra và đường đến khách sạn. Toa không đặt trước đông khách không bảo đảm có ghế."
],
"fr": [
  "À New Chitose, suivez les panneaux JR et choisissez un train Airport desservant Sapporo.",
  "Les places non réservées utilisent un billet de base ou une carte IC acceptée. La voiture 4 est réservée : achetez le supplément de réservation avant d’y monter.",
  "Descendez à Sapporo, vérifiez la sortie et le chemin vers l’hôtel. Un wagon sans réservation complet ne garantit pas de siège."
],
"es": [
  "En New Chitose, sigue las señales JR y elige un tren Airport que pare en Sapporo.",
  "Los asientos no reservados usan billete básico o tarjeta IC admitida. El vagón 4 es reservado: compra el billete adicional de reserva antes de subir a él.",
  "Baja en Sapporo; comprueba la salida y la ruta al hotel. Si el vagón no reservado está lleno, no se garantiza asiento."
],
      ja: [
        '新千歳空港でJRの案内に従い、札幌に停車するエアポートを選択。',
        '自由席は乗車券または対応ICカードで利用。4号車は指定席なので、乗車前に追加の指定席券を購入。',
        '札幌で下車し、宿に近い出口と経路を確認。自由席の着席は保証されません。',
      ],
      th: [
        'ที่สนามบิน New Chitose ตามป้าย JR เลือกขบวน Airport ที่จอด Sapporo',
        'ที่นั่งไม่จองใช้ตั๋วพื้นฐานหรือบัตร IC ที่รองรับ ตู้ 4 เป็นที่นั่งจอง ต้องซื้อตั๋วที่นั่งเพิ่มก่อนขึ้น',
        'ลง Sapporo แล้วตรวจทางออกและเส้นทางไปโรงแรม ที่นั่งไม่จองอาจเต็มและไม่ได้รับประกันว่าจะได้นั่ง',
      ],
    },
  },
  {
    code: 'KIX → Nankai Namba',
    reviewedAt: '2026-10-26',
    source: 'https://www.nankai.co.jp/en_railway/rapit',
    steps: {
      en: [
        'At Kansai-airport Station choose Nankai for this example, and Namba as your destination.',
        'For Rapi:t, check the selected departure and reserved seat plus the complete ticket price. Follow the purchase or exchange instructions for your chosen ticket.',
        'Get off at Nankai Namba. Check your hotel’s walking route or separate onward fare; JR Namba and Osaka-Namba are different stations.',
      ],
"ko": [
  "이 예시는 간사이공항역에서 난카이를 선택하고 목적지를 난바로 설정합니다.",
  "라피트는 선택한 출발 시간, 지정석과 전체 요금을 확인하세요. 이용하는 승차권의 구매·교환 안내를 따르세요.",
  "난카이 난바역에서 내리세요. 호텔까지 도보 경로나 별도 후속 요금을 확인하세요. JR 난바역과 오사카난바역은 다른 역입니다."
],
"zh-CN": [
  "本例在关西机场站选择南海电铁，目的地设为难波。",
  "乘坐 Rapi:t 时，请核对所选班次、指定席和总票价，并按所用车票的购买或兑换说明操作。",
  "在南海难波下车，核对到酒店的步行路线或后续另计车费；JR 难波和大阪难波是不同车站。"
],
"vi": [
  "Trong ví dụ này, chọn Nankai tại ga Kansai-airport và Namba làm điểm đến.",
  "Với Rapi:t, kiểm tra chuyến đi, chỗ đặt trước và tổng giá vé. Làm theo hướng dẫn mua hoặc đổi của loại vé đã chọn.",
  "Xuống tại Nankai Namba. Kiểm tra đường đi bộ đến khách sạn hoặc vé chặng tiếp; JR Namba và Osaka-Namba là các ga khác."
],
"fr": [
  "Pour cet exemple, choisissez Nankai à Kansai-airport et Namba comme destination.",
  "Pour Rapi:t, vérifiez le départ, la place réservée et le prix total. Suivez les consignes d’achat ou d’échange du billet choisi.",
  "Descendez à Nankai Namba. Vérifiez la marche vers l’hôtel ou le tarif du trajet suivant ; JR Namba et Osaka-Namba sont d’autres gares."
],
"es": [
  "Para este ejemplo, elige Nankai en Kansai-airport y Namba como destino.",
  "Para Rapi:t, revisa la salida elegida, el asiento reservado y el precio total. Sigue las instrucciones de compra o canje de tu billete.",
  "Baja en Nankai Namba. Comprueba la ruta a pie al hotel o la tarifa del siguiente tramo; JR Namba y Osaka-Namba son estaciones distintas."
],
      ja: [
        'この例では関西空港駅から南海を選び、目的地をなんばに設定。',
        'ラピートは乗車便・指定席・合計料金を確認。購入した券の購入・引換手順に従ってください。',
        '南海なんば駅で下車。宿への徒歩経路や乗り継ぎ運賃を確認。JR難波駅・大阪難波駅とは別の駅です。',
      ],
      th: [
        'ตัวอย่างนี้เลือก Nankai ที่สถานี Kansai-airport โดยมีปลายทาง Namba',
        'หากใช้ Rapi:t ตรวจขบวน ที่นั่งจอง และราคาตั๋วรวม ทำตามวิธีซื้อหรือแลกของตั๋วที่เลือก',
        'ลง Nankai Namba แล้วตรวจทางเดินไปโรงแรมหรือค่าโดยสารต่อ JR Namba และ Osaka-Namba เป็นคนละสถานี',
      ],
    },
  },
]

export const travelerProfiles = [
  {
    id: 'vegetarian',
    source: 'https://www.japan.travel/en/guide/vegetarian-guide/',
    reviewedAt: '2026-10-27',
    en: {
      title: 'Vegetarian or vegan meals',
      text: 'Ask about fish stock (dashi), bonito flakes and sauces, even in vegetable dishes. Carry a Japanese dietary card and contact restaurants before booking a set menu. Save suitable restaurants as personal stops in your trip.',
    },
"ko": {
  "title": "채식·비건 식사",
  "text": "채소 요리도 다시, 가쓰오부시와 소스를 확인하세요. 일본어 식이 안내 카드를 휴대하고 코스 예약 전 식당에 문의하세요. 적합한 식당은 여행의 개인 장소로 저장하세요."
},
"zh-CN": {
  "title": "素食与纯素餐饮",
  "text": "即使是蔬菜料理，也请询问高汤、柴鱼片和酱汁成分。携带日文饮食需求卡，预订套餐前先联系餐厅，并将合适餐厅保存为行程中的个人地点。"
},
"vi": {
  "title": "Bữa ăn chay hoặc thuần chay",
  "text": "Hỏi về nước dùng cá dashi, cá ngừ bào và nước sốt ngay cả trong món rau. Mang thẻ ăn uống tiếng Nhật và hỏi nhà hàng trước khi đặt thực đơn cố định. Lưu nơi phù hợp thành điểm riêng trong chuyến đi."
},
"fr": {
  "title": "Repas végétariens ou véganes",
  "text": "Demandez si les plats, même végétaux, contiennent dashi de poisson, bonite séchée ou sauces. Emportez une carte alimentaire en japonais et contactez le restaurant avant de réserver un menu. Enregistrez les adresses adaptées comme arrêts personnels."
},
"es": {
  "title": "Comidas vegetarianas o veganas",
  "text": "Pregunta por el caldo de pescado dashi, los copos de bonito y las salsas, incluso en platos de verduras. Lleva una tarjeta alimentaria en japonés y consulta antes de reservar un menú. Guarda los restaurantes adecuados como paradas personales."
},
    ja: {
      title: 'ベジタリアン・ヴィーガンの食事',
      text: '野菜料理でも、魚のだし・かつお節・たれを確認。日本語の食事条件カードを用意し、コース予約前に店へ相談。候補の店は旅程に自分の場所として保存できます。',
    },
    th: {
      title: 'อาหารมังสวิรัติหรือวีแกน',
      text: 'ถามเรื่องน้ำซุปปลา (ดาชิ) ปลาแห้ง และซอส แม้เป็นจานผัก เตรียมบัตรข้อจำกัดอาหารภาษาญี่ปุ่นและติดต่อร้านก่อนจองคอร์ส บันทึกร้านที่เหมาะเป็นสถานที่ส่วนตัวในทริปได้',
    },
  },
  {
    id: 'halal',
    source: 'https://www.japan.travel/en/plan/muslim-travelers/',
    reviewedAt: '2026-10-27',
    en: {
      title: 'Halal meals and prayer stops',
      text: 'Check the restaurant’s certification and preparation practices directly. “Halal-friendly” may include shared kitchens; seasonings can contain sake or mirin. Find prayer facilities along your route before the travel day.',
    },
"ko": {
  "title": "할랄 식사와 기도 장소",
  "text": "식당의 인증과 조리 방식을 직접 확인하세요. 할랄 친화 시설도 주방을 공유할 수 있고 양념에 사케나 미림이 들어갈 수 있습니다. 여행 전에 경로상의 기도 시설을 찾으세요."
},
"zh-CN": {
  "title": "清真餐饮与祈祷地点",
  "text": "请直接核实餐厅认证和烹饪方式。“清真友好”可能使用共用厨房，调味料也可能含清酒或味醂。出行前先寻找沿途祈祷设施。"
},
"vi": {
  "title": "Bữa ăn halal và nơi cầu nguyện",
  "text": "Kiểm tra trực tiếp chứng nhận và cách chế biến của nhà hàng. “Thân thiện với halal” có thể dùng bếp chung; gia vị có thể chứa sake hoặc mirin. Tìm nơi cầu nguyện trên tuyến trước ngày đi."
},
"fr": {
  "title": "Repas halal et lieux de prière",
  "text": "Vérifiez directement certification et préparation du restaurant. « Adapté au halal » peut impliquer une cuisine partagée ; les assaisonnements peuvent contenir saké ou mirin. Repérez les lieux de prière avant le jour du trajet."
},
"es": {
  "title": "Comidas halal y lugares de oración",
  "text": "Comprueba directamente la certificación y la preparación del restaurante. «Adaptado a halal» puede incluir cocinas compartidas; los condimentos pueden contener sake o mirin. Localiza espacios de oración en la ruta antes del viaje."
},
    ja: {
      title: 'ハラールの食事と礼拝場所',
      text: '認証と調理方法は店に直接確認。「ハラール対応」でも共用厨房の場合があり、調味料に酒やみりんが含まれることも。移動前に経路上の礼拝場所を確認。',
    },
    th: {
      title: 'อาหารฮาลาลและจุดละหมาด',
      text: 'ตรวจการรับรองและวิธีเตรียมอาหารกับร้านโดยตรง คำว่า “รองรับฮาลาล” อาจหมายถึงใช้ครัวร่วมกัน เครื่องปรุงอาจมีสาเกหรือมิริน ค้นหาห้องละหมาดตามเส้นทางก่อนวันเดินทาง',
    },
  },

  {
    id: 'family',
    en: {
      title: 'Children or a slower pace',
      text: 'Start with one main visit per half-day. Keep a meal and toilet break, check stroller rules, and leave an easy return to your base.',
    },
"ko": {
  "title": "어린이와 함께 또는 느긋한 일정",
  "text": "반나절에 주요 방문지 하나로 시작하세요. 식사·화장실 휴식을 넣고 유모차 규정을 확인하며 숙소로 쉽게 돌아갈 수 있도록 하세요."
},
"zh-CN": {
  "title": "携儿童出行或放慢节奏",
  "text": "每半天先安排一个主要景点。预留吃饭和洗手间休息，核对婴儿车规定，并保留方便返回住宿地的路线。"
},
"vi": {
  "title": "Đi cùng trẻ hoặc nhịp độ chậm hơn",
  "text": "Bắt đầu với một điểm chính mỗi nửa ngày. Dành giờ ăn, nghỉ vệ sinh, kiểm tra quy định xe đẩy và giữ đường về chỗ ở thuận tiện."
},
"fr": {
  "title": "Avec des enfants ou à un rythme plus doux",
  "text": "Commencez par une visite principale par demi-journée. Prévoyez repas et toilettes, vérifiez les règles des poussettes et gardez un retour simple à votre base."
},
"es": {
  "title": "Con niños o a un ritmo más tranquilo",
  "text": "Empieza con una visita principal por media jornada. Deja pausas para comer y usar el baño, comprueba las normas de cochecitos y facilita el regreso al alojamiento."
},
    ja: {
      title: '子ども連れ・ゆったり旅',
      text: '半日に主な訪問先を1か所から。食事・トイレ休憩を確保し、ベビーカーの規則と宿へ戻る経路を確認。',
    },
    th: {
      title: 'มีเด็กหรืออยากเที่ยวแบบไม่เร่ง',
      text: 'เริ่มจากจุดหลักหนึ่งแห่งต่อครึ่งวัน เผื่อมื้ออาหารและห้องน้ำ ตรวจข้อกำหนดรถเข็นเด็ก และเตรียมเส้นทางกลับที่พักง่าย ๆ',
    },
  },
  {
    id: 'access',
    en: {
      title: 'Step-free travel',
      text: 'Check each station exit and venue entrance separately. A wheelchair-accessibility note is not a guarantee for the entire journey; contact the operator about the assistance you need.',
    },
"ko": {
  "title": "계단 없는 여행",
  "text": "각 역 출구와 시설 입구를 따로 확인하세요. 휠체어 접근성 안내가 전체 여정의 접근성을 보장하지는 않습니다. 필요한 도움을 운영사에 문의하세요."
},
"zh-CN": {
  "title": "无台阶出行",
  "text": "请分别核对每个车站出口和场所入口。轮椅无障碍说明不保证整段旅程均可通行；请向运营方询问所需协助。"
},
"vi": {
  "title": "Di chuyển không bậc thang",
  "text": "Kiểm tra riêng từng lối ra ga và lối vào địa điểm. Ghi chú tiếp cận xe lăn không bảo đảm cả hành trình; hỏi đơn vị vận hành về hỗ trợ bạn cần."
},
"fr": {
  "title": "Voyager sans marches",
  "text": "Vérifiez séparément chaque sortie de gare et entrée de lieu. Une note d’accessibilité en fauteuil ne garantit pas tout le trajet ; contactez l’opérateur pour l’assistance nécessaire."
},
"es": {
  "title": "Viajar sin escalones",
  "text": "Comprueba por separado cada salida de estación y entrada del lugar. Una nota de accesibilidad en silla de ruedas no garantiza todo el trayecto; consulta al operador sobre la asistencia necesaria."
},
    ja: {
      title: '段差を避ける旅',
      text: '駅出口と施設入口を別々に確認。車いす対応の記載だけでは全行程の利用を保証できません。必要な介助は事業者に相談。',
    },
    th: {
      title: 'การเดินทางที่เลี่ยงบันได',
      text: 'ตรวจทางออกสถานีและทางเข้าสถานที่แยกกัน ข้อมูลรองรับรถเข็นไม่ได้รับประกันทั้งเส้นทาง ติดต่อผู้ให้บริการเรื่องความช่วยเหลือที่ต้องการ',
    },
  },
  {
    id: 'budget',
    en: {
      title: 'A limited budget',
      text: 'Group visits around one base before comparing passes with individual fares. Enter all budget categories, including a reserve; a blank category is not a zero cost.',
    },
"ko": {
  "title": "빠듯한 예산",
  "text": "한 거점을 중심으로 방문지를 묶은 뒤 패스와 개별 요금을 비교하세요. 예비비를 포함한 모든 예산 항목을 입력하세요. 빈 항목은 비용 0원이 아닙니다."
},
"zh-CN": {
  "title": "预算有限时",
  "text": "先按同一住宿地安排周边景点，再比较通票和单次车费。填写全部预算项目，包括备用金；空白项目不代表零成本。"
},
"vi": {
  "title": "Ngân sách hạn chế",
  "text": "Nhóm điểm quanh một nơi lưu trú rồi so sánh thẻ đi lại với vé lẻ. Nhập đủ các mục ngân sách, kể cả dự phòng; mục trống không phải chi phí bằng không."
},
"fr": {
  "title": "Un budget limité",
  "text": "Regroupez les visites autour d’une base avant de comparer pass et billets. Renseignez toutes les catégories, réserve comprise ; une case vide n’est pas un coût nul."
},
"es": {
  "title": "Presupuesto ajustado",
  "text": "Agrupa visitas alrededor de una base antes de comparar pases y billetes sueltos. Introduce todas las categorías del presupuesto, incluida una reserva; una casilla vacía no equivale a coste cero."
},
    ja: {
      title: '予算を抑える旅',
      text: '拠点ごとに訪問先をまとめてから、パスと個別運賃を比較。予備費を含め各予算欄を入力。空欄は費用ゼロではありません。',
    },
    th: {
      title: 'งบประมาณจำกัด',
      text: 'จัดสถานที่รอบฐานพักเดียวก่อนเทียบพาสกับค่าโดยสารแยก ใส่งบทุกหมวดรวมเงินสำรอง ช่องว่างไม่ได้หมายถึงไม่เสียเงิน',
    },
  },
] satisfies ({ id: string; source?: string; reviewedAt?: string } & Record<
  Locale,
  { title: string; text: string }
>)[]
