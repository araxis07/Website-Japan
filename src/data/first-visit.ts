import { firstVisitHelp } from './first-visit-help'
import type { Locale } from '@/i18n/config'

type Step = {
  id: string
  source: string
  copy: Record<Locale, { title: string; items: string[] }>
}
export const firstVisitSteps: Step[] = [
  {
    id: 'documents',
    source: 'https://www.digital.go.jp/en/policies/visit_japan_web',
    copy: {
      en: {
        title: 'Before you fly: documents and your first night',
        items: [
          'Check passport, entry and visa requirements with the Japanese embassy or consulate for your nationality. Do this before booking non-refundable travel.',
          'Use the Digital Agency link for Visit Japan Web arrival procedures. Keep your passport, accommodation address and any required documents accessible; completing the service does not itself grant entry.',
          'Book the first night near a workable transport route. Save the hotel name, Japanese address, check-in deadline and phone number offline.',
        ],
      },
"ko": {
  "title": "출발 전: 서류와 첫날 숙소",
  "items": [
    "환불 불가 여행 상품을 예약하기 전에 본인의 국적에 적용되는 여권·입국·비자 요건을 일본 대사관이나 영사관에 확인하세요.",
    "디지털청 링크에서 Visit Japan Web 입국 절차를 확인하세요. 여권, 숙소 주소와 필요한 서류를 꺼내기 쉽게 준비하세요. 서비스 등록만으로 입국이 허가되지는 않습니다.",
    "이용 가능한 교통편이 있는 곳에 첫날 숙소를 예약하세요. 호텔 이름, 일본어 주소, 체크인 마감 시간과 전화번호를 오프라인으로 저장하세요."
  ]
},
"zh-CN": {
  "title": "出发前：证件与第一晚住宿",
  "items": [
    "预订不可退款的行程前，请向日本驻外使领馆核实适用于您国籍的护照、入境和签证要求。",
    "请通过日本数字厅链接办理 Visit Japan Web 入境手续。随身备好护照、住宿地址及所需文件；完成登记本身并不代表获准入境。",
    "第一晚请预订交通方便的住宿，并离线保存酒店名称、日文地址、最晚入住时间和电话号码。"
  ]
},
"vi": {
  "title": "Trước chuyến bay: giấy tờ và đêm đầu tiên",
  "items": [
    "Trước khi đặt dịch vụ không hoàn tiền, hãy kiểm tra yêu cầu hộ chiếu, nhập cảnh và thị thực theo quốc tịch của bạn với đại sứ quán hoặc lãnh sự quán Nhật Bản.",
    "Dùng liên kết của Cơ quan Kỹ thuật số để làm thủ tục Visit Japan Web. Chuẩn bị sẵn hộ chiếu, địa chỉ chỗ ở và giấy tờ cần thiết; hoàn tất dịch vụ không đồng nghĩa với được phép nhập cảnh.",
    "Đặt đêm đầu gần tuyến giao thông thuận tiện. Lưu ngoại tuyến tên khách sạn, địa chỉ tiếng Nhật, hạn chót nhận phòng và số điện thoại."
  ]
},
"fr": {
  "title": "Avant le départ : documents et première nuit",
  "items": [
    "Avant de réserver un voyage non remboursable, vérifiez auprès de l’ambassade ou du consulat du Japon les exigences de passeport, d’entrée et de visa liées à votre nationalité.",
    "Utilisez le lien de l’Agence du numérique pour les formalités Visit Japan Web. Gardez passeport, adresse d’hébergement et documents requis à portée de main ; cette démarche ne constitue pas une autorisation d’entrée.",
    "Réservez la première nuit près d’un itinéraire de transport praticable. Enregistrez hors ligne le nom de l’hôtel, son adresse en japonais, l’heure limite d’arrivée et son téléphone."
  ]
},
"es": {
  "title": "Antes de volar: documentos y primera noche",
  "items": [
    "Antes de reservar servicios no reembolsables, consulta con la embajada o el consulado de Japón los requisitos de pasaporte, entrada y visado para tu nacionalidad.",
    "Usa el enlace de la Agencia Digital para los trámites de Visit Japan Web. Ten a mano el pasaporte, la dirección del alojamiento y los documentos necesarios; completar el servicio no concede por sí solo la entrada.",
    "Reserva la primera noche cerca de una ruta de transporte viable. Guarda sin conexión el nombre del hotel, la dirección en japonés, la hora límite de entrada y el teléfono."
  ]
},
      ja: {
        title: '出発前：書類と最初の宿',
        items: [
          '国籍に合う旅券・入国・ビザの条件を日本大使館や領事館で確認。返金できない予約の前に調べましょう。',
          '入国手続のVisit Japan Webはデジタル庁のリンクから。旅券、宿の住所、必要書類を取り出せる場所に。登録だけで入国が許可されるわけではありません。',
          '初日の宿は移動しやすい場所を選び、日本語の宿名・住所、チェックイン締切、電話番号をオフラインで保存。',
        ],
      },
      th: {
        title: 'ก่อนบิน: เอกสารและที่พักคืนแรก',
        items: [
          'ตรวจหนังสือเดินทาง เงื่อนไขเข้าประเทศ และวีซ่าตามสัญชาติจากสถานทูตหรือสถานกงสุลญี่ปุ่น ก่อนจองบริการที่คืนเงินไม่ได้',
          'เข้า Visit Japan Web ผ่านลิงก์ Digital Agency เพื่อเตรียมขั้นตอนขาเข้า เก็บพาสปอร์ต ที่อยู่ที่พัก และเอกสารที่ต้องใช้ไว้หยิบง่าย การกรอกระบบไม่ได้เป็นการอนุมัติเข้าประเทศ',
          'เลือกที่พักคืนแรกที่เดินทางถึงได้สะดวก บันทึกชื่อและที่อยู่ภาษาญี่ปุ่น เวลารับเช็กอินสุดท้าย และเบอร์โทรไว้แบบออฟไลน์',
        ],
      },
    },
  },
  {
    id: 'airport',
    source: 'https://www.japan.travel/en/plan/airport-access/',
    copy: {
      en: {
        title: 'At the airport: get to your hotel',
        items: [
          'Finish arrival procedures and collect your luggage before committing to a departure time. Confirm the airport and terminal printed on your ticket.',
          'Search the hotel’s actual address in Google Maps. Compare the route, changes and last service with the airport operator’s information. Allow extra time after a long flight.',
          'Check whether the ticket includes a reserved seat or an extra express fare. Keep the ticket or IC card until you leave the station at your destination.',
        ],
      },
"ko": {
  "title": "공항에서: 호텔까지 이동하기",
  "items": [
    "출발 시간을 정하기 전에 입국 절차와 수하물 수취를 마치세요. 항공권에 적힌 공항과 터미널을 확인하세요.",
    "Google Maps에서 호텔의 실제 주소를 검색하세요. 경로, 환승과 막차를 공항 운영사의 안내와 비교하고, 장거리 비행 후에는 여유 시간을 두세요.",
    "승차권에 지정석이나 특급 요금이 포함되는지 확인하세요. 목적지 역에서 나갈 때까지 승차권이나 IC 카드를 보관하세요."
  ]
},
"zh-CN": {
  "title": "抵达机场：前往酒店",
  "items": [
    "请先完成入境手续并取好行李，再决定出发时间。核对机票上的机场和航站楼。",
    "在 Google Maps 中搜索酒店的实际地址，并与机场运营方信息核对路线、换乘和末班车。长途飞行后请多留时间。",
    "确认车票是否包含指定席或另付的特急费用。在目的地出站前请保管好车票或 IC 卡。"
  ]
},
"vi": {
  "title": "Tại sân bay: đến khách sạn",
  "items": [
    "Hoàn tất thủ tục nhập cảnh và nhận hành lý trước khi chốt giờ khởi hành. Kiểm tra sân bay và nhà ga ghi trên vé.",
    "Tìm đúng địa chỉ khách sạn trên Google Maps. Đối chiếu tuyến đường, điểm đổi và chuyến cuối với thông tin của sân bay. Dành thêm thời gian sau chuyến bay dài.",
    "Kiểm tra vé có gồm chỗ đặt trước hay phụ phí tàu tốc hành không. Giữ vé hoặc thẻ IC cho đến khi ra khỏi ga đích."
  ]
},
"fr": {
  "title": "À l’aéroport : rejoindre votre hôtel",
  "items": [
    "Terminez les formalités d’arrivée et récupérez vos bagages avant de fixer une heure de départ. Vérifiez l’aéroport et le terminal indiqués sur votre billet.",
    "Cherchez l’adresse exacte de l’hôtel dans Google Maps. Comparez itinéraire, correspondances et dernier service avec les informations de l’aéroport. Prévoyez une marge après un long vol.",
    "Vérifiez si le billet comprend une place réservée ou un supplément express. Conservez billet ou carte IC jusqu’à la sortie de la gare d’arrivée."
  ]
},
"es": {
  "title": "En el aeropuerto: llegar al hotel",
  "items": [
    "Completa los trámites de llegada y recoge el equipaje antes de fijar una hora de salida. Comprueba el aeropuerto y la terminal que figuran en el billete.",
    "Busca la dirección real del hotel en Google Maps. Contrasta la ruta, los transbordos y el último servicio con la información del aeropuerto. Deja tiempo extra tras un vuelo largo.",
    "Comprueba si el billete incluye asiento reservado o un suplemento de tren expreso. Conserva el billete o la tarjeta IC hasta salir de la estación de destino."
  ]
},
      ja: {
        title: '空港から：まず宿へ',
        items: [
          '到着手続と荷物受け取りを済ませてから出発時刻を決めましょう。航空券の空港名とターミナルも確認。',
          'Google Mapsには宿の正確な住所を入力。経路、乗り換え、最終便を空港や交通機関の案内と照合し、長いフライトの後は余裕を。',
          '指定席や特急料金が含まれる切符か確認。目的地の改札を出るまで切符やICカードを保管してください。',
        ],
      },
      th: {
        title: 'ถึงสนามบิน: ไปโรงแรมก่อน',
        items: [
          'ผ่านขั้นตอนขาเข้าและรับกระเป๋าก่อนกำหนดเวลารถต่อ ตรวจชื่อสนามบินและอาคารบนตั๋วให้ตรง',
          'ค้นที่อยู่โรงแรมจริงใน Google Maps แล้วเทียบเส้นทาง จุดเปลี่ยนรถ และเที่ยวสุดท้ายกับข้อมูลสนามบินหรือผู้ให้บริการ เผื่อเวลาหลังเที่ยวบินยาว',
          'ตรวจว่าตั๋วรวมที่นั่งจองหรือค่ารถด่วนพิเศษแล้วหรือยัง เก็บตั๋วหรือบัตร IC จนผ่านประตูออกที่สถานีปลายทาง',
        ],
      },
    },
  },
  {
    id: 'transport',
    source: 'https://www.japan.travel/en/plan/getting-around/',
    copy: {
      en: {
        title: 'Your first train: read the whole route',
        items: [
          'Check the line name, direction, platform and exit—not only the station name. Different operators can have nearby stations with similar names.',
          'An IC card is useful on many local networks, but coverage varies and it is not a universal shinkansen ticket. Compare single tickets and passes for your actual route.',
          'Keep one main area per day. Use a named place’s directions button, select transit or walking, and confirm the entrance before leaving.',
        ],
      },
"ko": {
  "title": "첫 기차 여행: 전체 경로 확인하기",
  "items": [
    "역 이름뿐 아니라 노선명, 방향, 승강장과 출구를 확인하세요. 서로 다른 운영사의 비슷한 이름을 가진 역이 가까이 있을 수 있습니다.",
    "IC 카드는 여러 지역 교통망에서 편리하지만 사용 범위는 다르며 모든 신칸센에 쓸 수 있는 승차권은 아닙니다. 실제 경로에 맞춰 개별 승차권과 패스를 비교하세요.",
    "하루에 한 지역을 중심으로 계획하세요. 장소별 길찾기 버튼에서 대중교통이나 도보를 선택하고 출발 전에 입구를 확인하세요."
  ]
},
"zh-CN": {
  "title": "第一次乘车：看清全程路线",
  "items": [
    "不只看站名，还要核对线路、方向、站台和出口。不同运营方可能在附近设有名称相似的车站。",
    "IC 卡适用于许多市内交通，但覆盖范围不一，也不是通用的新干线车票。请按实际行程比较单程票和交通通票。",
    "每天以一个主要区域为主。使用具体地点的导航按钮，选择公共交通或步行，并在出发前确认入口。"
  ]
},
"vi": {
  "title": "Chuyến tàu đầu tiên: đọc toàn bộ lộ trình",
  "items": [
    "Kiểm tra tên tuyến, hướng đi, sân ga và lối ra, không chỉ tên ga. Các hãng khác nhau có thể có ga gần nhau với tên tương tự.",
    "Thẻ IC hữu ích trên nhiều mạng lưới địa phương nhưng phạm vi sử dụng khác nhau và không phải vé shinkansen dùng chung. So sánh vé lẻ và thẻ đi lại theo lộ trình thực tế.",
    "Mỗi ngày nên tập trung vào một khu vực chính. Dùng nút chỉ đường của địa điểm cụ thể, chọn phương tiện công cộng hoặc đi bộ và xác nhận lối vào trước khi đi."
  ]
},
"fr": {
  "title": "Premier trajet en train : lire tout l’itinéraire",
  "items": [
    "Vérifiez ligne, direction, quai et sortie, pas seulement le nom de la gare. Des opérateurs différents peuvent avoir des gares voisines aux noms proches.",
    "La carte IC est pratique sur de nombreux réseaux locaux, mais sa couverture varie et elle ne remplace pas tous les billets de shinkansen. Comparez billets et pass pour votre trajet réel.",
    "Prévoyez une zone principale par jour. Utilisez le bouton d’itinéraire d’un lieu précis, choisissez transports ou marche et vérifiez l’entrée avant de partir."
  ]
},
"es": {
  "title": "Tu primer tren: revisa toda la ruta",
  "items": [
    "Comprueba la línea, el sentido, el andén y la salida, además del nombre de la estación. Distintos operadores pueden tener estaciones cercanas con nombres parecidos.",
    "La tarjeta IC sirve en muchas redes locales, pero su cobertura varía y no es un billete universal de shinkansen. Compara billetes sueltos y pases para tu ruta real.",
    "Organiza un área principal por día. Usa el botón de indicaciones de un lugar concreto, selecciona transporte público o a pie y confirma la entrada antes de salir."
  ]
},
      ja: {
        title: '最初の電車：経路全体を確認',
        items: [
          '駅名だけでなく路線、行き先、ホーム、出口を確認。同じような名前でも別会社の駅の場合があります。',
          'ICカードは多くの地域交通で便利ですが、対応範囲は異なり、全国共通の新幹線切符ではありません。実際の経路で普通の切符とパスを比較。',
          '一日に主なエリアを一つ。場所の経路ボタンから公共交通や徒歩を選び、出発前に入口まで確認しましょう。',
        ],
      },
      th: {
        title: 'รถไฟเที่ยวแรก: อ่านเส้นทางให้ครบ',
        items: [
          'ดูชื่อสาย ทิศทาง ชานชาลา และทางออก ไม่ใช่แค่ชื่อสถานี สถานีชื่อคล้ายกันของคนละบริษัทอาจอยู่คนละจุด',
          'บัตร IC สะดวกกับขนส่งท้องถิ่นหลายแห่ง แต่พื้นที่ใช้งานต่างกันและไม่ใช่ตั๋วชินคันเซ็นที่ใช้ได้ทุกขบวน เปรียบเทียบตั๋วรายเที่ยวกับพาสตามเส้นทางจริง',
          'เลือกพื้นที่หลักหนึ่งแห่งต่อวัน กดดูเส้นทางของสถานที่ เลือกขนส่งสาธารณะหรือเดิน และเช็กทางเข้าก่อนออกจากที่พัก',
        ],
      },
    },
  },
  {
    id: 'essentials',
    source: 'https://www.japan.travel/en/plan/',
    copy: {
      en: {
        title: 'Internet, money and a small day bag',
        items: [
          'Arrange roaming, a compatible SIM/eSIM or pocket Wi-Fi before relying on mobile maps. Download important addresses and booking details for offline use.',
          'Carry some cash alongside a payment card. Check overseas card settings and your provider’s fees; acceptance varies by shop and area.',
          'Carry a charger, water, weather-appropriate layers and a small bag for rubbish. Leave bulky luggage at your accommodation or use a confirmed storage option.',
        ],
      },
"ko": {
  "title": "인터넷, 돈과 가벼운 외출 가방",
  "items": [
    "모바일 지도에 의존하기 전에 로밍, 호환되는 SIM/eSIM 또는 휴대용 Wi-Fi를 준비하세요. 중요한 주소와 예약 정보를 오프라인으로 내려받으세요.",
    "결제 카드와 함께 현금도 조금 준비하세요. 해외 사용 설정과 카드사 수수료를 확인하세요. 카드 사용 가능 여부는 가게와 지역마다 다릅니다.",
    "충전기, 물, 날씨에 맞는 겉옷과 작은 쓰레기 봉투를 챙기세요. 큰 짐은 숙소에 두거나 이용 가능 여부를 확인한 보관소에 맡기세요."
  ]
},
"zh-CN": {
  "title": "网络、钱款与随身小包",
  "items": [
    "使用手机地图前，请安排漫游、兼容的 SIM/eSIM 或随身 Wi-Fi，并下载重要地址和预订信息以便离线使用。",
    "除银行卡外也请携带一些现金。确认境外用卡设置和发卡机构费用；不同商店及地区的受理情况不同。",
    "随身带充电器、水、适合天气的衣物和小垃圾袋。大件行李请留在住宿处，或使用已确认可用的寄存服务。"
  ]
},
"vi": {
  "title": "Internet, tiền và túi nhỏ dùng trong ngày",
  "items": [
    "Chuẩn bị chuyển vùng, SIM/eSIM tương thích hoặc Wi-Fi bỏ túi trước khi phụ thuộc vào bản đồ di động. Tải địa chỉ và thông tin đặt chỗ quan trọng để dùng ngoại tuyến.",
    "Mang theo ít tiền mặt cùng thẻ thanh toán. Kiểm tra cài đặt dùng thẻ ở nước ngoài và phí của nhà cung cấp; khả năng chấp nhận tùy cửa hàng và khu vực.",
    "Mang sạc, nước, áo phù hợp thời tiết và túi nhỏ đựng rác. Để hành lý cồng kềnh ở chỗ ở hoặc dùng nơi gửi đồ đã xác nhận."
  ]
},
"fr": {
  "title": "Internet, argent et petit sac de journée",
  "items": [
    "Prévoyez itinérance, SIM/eSIM compatible ou Wi-Fi de poche avant de compter sur les cartes mobiles. Téléchargez adresses et réservations importantes pour un usage hors ligne.",
    "Gardez un peu d’espèces en plus d’une carte. Vérifiez les réglages à l’étranger et les frais de votre établissement ; l’acceptation varie selon les commerces et les régions.",
    "Emportez chargeur, eau, vêtements adaptés et petit sac à déchets. Laissez les bagages encombrants à l’hébergement ou utilisez une consigne dont vous avez confirmé la disponibilité."
  ]
},
"es": {
  "title": "Internet, dinero y una mochila pequeña",
  "items": [
    "Prepara roaming, una SIM/eSIM compatible o wifi portátil antes de depender de los mapas móviles. Descarga las direcciones y reservas importantes para usarlas sin conexión.",
    "Lleva algo de efectivo además de una tarjeta. Comprueba la configuración para uso en el extranjero y las comisiones; la aceptación varía según el comercio y la zona.",
    "Lleva cargador, agua, ropa adecuada al tiempo y una bolsa pequeña para residuos. Deja el equipaje voluminoso en el alojamiento o usa una consigna confirmada."
  ]
},
      ja: {
        title: '通信、お金、小さな荷物',
        items: [
          '地図に頼る前にローミング、対応SIM/eSIM、Wi-Fiルーターなどを準備。重要な住所や予約内容はオフラインでも保存。',
          'カードに加えて現金も少し用意。海外利用設定や手数料は発行会社で確認し、店や地域によって使える支払い方法が違うことを想定。',
          '充電器、飲み水、天候に合う服、小さなごみ袋を携帯。大きな荷物は宿や利用確認済みの預かり先へ。',
        ],
      },
      th: {
        title: 'อินเทอร์เน็ต เงิน และกระเป๋าเที่ยว',
        items: [
          'เตรียมโรมมิ่ง SIM/eSIM ที่รองรับเครื่อง หรือ Pocket Wi-Fi ก่อนพึ่งแผนที่มือถือ ดาวน์โหลดที่อยู่และการจองสำคัญไว้ใช้แบบออฟไลน์',
          'พกเงินสดส่วนหนึ่งคู่กับบัตร ตรวจการเปิดใช้งานต่างประเทศและค่าธรรมเนียมกับผู้ออกบัตร ร้านและพื้นที่ต่างกันอาจรับวิธีจ่ายไม่เหมือนกัน',
          'พกที่ชาร์จ น้ำดื่ม เสื้อให้เหมาะกับอากาศ และถุงขยะเล็ก ๆ ฝากกระเป๋าใหญ่กับที่พักหรือจุดรับฝากที่ตรวจสอบไว้',
        ],
      },
    },
  },
  {
    id: 'etiquette',
    source: 'https://www.japan.travel/en/responsible-travel-guide/',
    copy: {
      en: {
        title: 'At your destination: slow down and check signs',
        items: [
          'Check opening days, admission and reservations on the venue’s official site. A pin on a map does not guarantee that a place is open or accessible.',
          'Keep voices low on public transport, leave private lanes clear and ask before photographing people. Follow shoe-removal and photography signs.',
          'For step-free routes, dietary needs or onsen policies, contact the actual venue ahead. General travel advice cannot confirm every facility’s arrangements.',
        ],
      },
"ko": {
  "title": "목적지에서: 여유를 갖고 안내 표지 확인하기",
  "items": [
    "시설 공식 사이트에서 운영일, 입장료와 예약을 확인하세요. 지도에 표시되어 있다고 해서 개방 중이거나 접근 가능하다는 뜻은 아닙니다.",
    "대중교통에서는 목소리를 낮추고 사유지 골목을 막지 마세요. 사람을 찍기 전에는 허락을 받고 신발을 벗거나 촬영을 제한하는 표지를 따르세요.",
    "계단 없는 경로, 식이 요구나 온천 이용 규정은 해당 시설에 미리 문의하세요. 일반 여행 안내로 모든 시설의 조건을 확인할 수는 없습니다."
  ]
},
"zh-CN": {
  "title": "到达目的地：放慢脚步，留意标识",
  "items": [
    "请在场所官网核对开放日期、门票及预约要求。地图上的标记不代表该地点一定开放或可进入。",
    "乘公共交通时请轻声交谈，不要堵住私人巷道，拍摄他人前先征得同意。遵守脱鞋和摄影标识。",
    "如需无台阶路线、有饮食要求或想了解温泉规定，请提前联系具体场所。一般旅行建议无法确认每家设施的安排。"
  ]
},
"vi": {
  "title": "Tại điểm đến: đi chậm và đọc biển báo",
  "items": [
    "Kiểm tra ngày mở cửa, vé vào và đặt chỗ trên trang chính thức của địa điểm. Dấu ghim trên bản đồ không bảo đảm nơi đó đang mở hay có thể tiếp cận.",
    "Nói nhỏ trên phương tiện công cộng, không chắn ngõ riêng và xin phép trước khi chụp người khác. Làm theo biển yêu cầu cởi giày và quy định chụp ảnh.",
    "Với lộ trình không bậc thang, nhu cầu ăn uống hoặc quy định onsen, hãy hỏi trực tiếp địa điểm trước. Hướng dẫn chung không thể xác nhận điều kiện của mọi cơ sở."
  ]
},
"fr": {
  "title": "Sur place : ralentir et lire les panneaux",
  "items": [
    "Vérifiez jours d’ouverture, tarifs et réservations sur le site officiel du lieu. Un repère sur une carte ne garantit ni ouverture ni accessibilité.",
    "Parlez doucement dans les transports, laissez libres les passages privés et demandez l’accord avant de photographier quelqu’un. Respectez les consignes sur les chaussures et les photos.",
    "Pour un accès sans marches, des besoins alimentaires ou les règles d’un onsen, contactez le lieu à l’avance. Les conseils généraux ne peuvent confirmer les dispositions de chaque établissement."
  ]
},
"es": {
  "title": "En el destino: ve con calma y lee las señales",
  "items": [
    "Consulta los días de apertura, las entradas y las reservas en la web oficial del lugar. Un marcador en el mapa no garantiza que esté abierto ni sea accesible.",
    "Habla bajo en el transporte público, no bloquees callejones privados y pide permiso antes de fotografiar a personas. Respeta los carteles sobre quitarse los zapatos y hacer fotos.",
    "Para rutas sin escalones, necesidades alimentarias o normas de onsen, contacta antes con el establecimiento. Los consejos generales no pueden confirmar las condiciones de cada lugar."
  ]
},
      ja: {
        title: '目的地では：表示を見てゆっくりと',
        items: [
          '開館日、料金、予約は施設の公式サイトで確認。地図に載っていても営業や利用可能な経路が保証されるわけではありません。',
          '公共交通では静かに、私道をふさがず、人の撮影は許可を。靴を脱ぐ場所や撮影の表示を守りましょう。',
          '段差のない経路、食事の配慮、温泉の利用条件は施設へ事前連絡を。一般的な案内だけでは個別の対応を確認できません。',
        ],
      },
      th: {
        title: 'ถึงจุดเที่ยว: อ่านป้ายและเที่ยวอย่างใส่ใจ',
        items: [
          'ตรวจวันเปิด ค่าเข้า และการจองจากเว็บไซต์สถานที่ การมีหมุดบนแผนที่ไม่ได้ยืนยันว่าเปิดหรือมีเส้นทางที่ทุกคนเข้าได้',
          'พูดเบาบนขนส่งสาธารณะ ไม่กีดขวางพื้นที่ส่วนบุคคล ขออนุญาตก่อนถ่ายคน และปฏิบัติตามป้ายถอดรองเท้าหรือห้ามถ่ายภาพ',
          'หากต้องการเส้นทางไร้บันได อาหารเฉพาะ หรือข้อมูลกฎออนเซ็น ให้ติดต่อสถานที่โดยตรงก่อนเดินทาง คำแนะนำทั่วไปยืนยันบริการรายแห่งไม่ได้',
        ],
      },
    },
  },
  firstVisitHelp,
]
