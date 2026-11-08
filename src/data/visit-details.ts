import accessRecords from './visit-access.json'
import type { Locale } from '@/i18n/config'
import { canonicalPlaceId, type Place } from './places'
type Text = Record<Locale, string>
export const visitFields = [
  'access',
  'entrance',
  'hours',
  'admission',
  'booking',
  'accessibility',
] as const
export type VisitField = (typeof visitFields)[number]
export type VisitSource = {
  source: string
  reviewedAt: string
  // Inclusive Japan calendar date; this does not describe continuous opening.
  validThrough?: string
  applicablePeriods?: { from: string; through: string }[]
}
export type Visit = {
  source: string
  infoSource?: string
  reviewedAt: string
  access?: Text
  hours?: Text
  admission?: Text
  accessibility?: Text
  entrance?: Text
  booking?: Text
  fieldSources?: Partial<Record<VisitField, VisitSource>>
  minutes?: number
  approach?: { source: string; label: Text; note: Text }
  notApplicable?: Partial<
    Record<VisitField, VisitSource & { reason: Text }>
  >
}
export const visitDetails: Record<string, Visit> = {
  ...accessRecords,
  gion: {
    ...accessRecords.gion,
    accessibility: {
      en: 'Keihan Gion-Shijo Station’s map shows an elevator at Exit 7. Check street routes and individual Gion buildings separately; this does not verify access across the district.',
      ja: '京阪祇園四条駅の構内図では7番出口にエレベーターが示されています。公道の経路や各建物の利用条件は別途確認してください。祇園全域の移動を確認した情報ではありません。',
      th: 'แผนผังสถานี Keihan Gion-Shijo ระบุลิฟต์ที่ทางออก 7 ตรวจเส้นทางถนนและอาคารแต่ละแห่งในกิออนแยกต่างหาก ข้อมูลนี้ไม่ได้ยืนยันการเข้าถึงทั่วทั้งย่าน',
      "ko": "게이한 기온시조역 안내도에는 7번 출구의 엘리베이터가 표시되어 있습니다. 거리의 이동 경로와 기온의 개별 건물은 따로 확인하세요. 이 정보만으로 기온 전역의 이동 편의를 보장할 수는 없습니다.",
      "zh-CN": "京阪祇园四条站的站内图标有7号出口的电梯。请另行确认街道路线和祇园各建筑的通行条件；此信息并不代表整个街区均可无障碍通行。",
      "vi": "Bản đồ của Ga Keihan Gion-Shijo hiển thị thang máy ở Lối ra số 7. Kiểm tra riêng các tuyến đường và các tòa nhà Gion riêng lẻ; điều này không xác minh điều kiện đi lại trên toàn khu vực.",
      "fr": "Le plan de la station Keihan Gion-Shijo montre un ascenseur à la sortie 7. Vérifiez séparément les itinéraires des rues et les bâtiments individuels de Gion ; cela ne vérifie pas l’accès à travers le district.",
      "es": "El mapa de la estación Keihan Gion-Shijo muestra un ascensor en la salida 7. Verifique las rutas de las calles y los edificios individuales de Gion por separado; esto no verifica el acceso en todo el distrito.",
    },
    fieldSources: {
      ...accessRecords.gion.fieldSources,
      accessibility: {
        source:
          'https://www.keihan.co.jp/traffic/station/assets/pdf/info/station-162.pdf',
        reviewedAt: '2026-10-31',
      },
    },
    notApplicable: {
      hours: {
        reason: {
          en: 'Gion is a district, not a single ticketed venue. Each business, temple and private lane has its own access, hours and reservation rules.',
          ja: '祇園は地域名で、単一の有料施設ではありません。店舗・寺院・私道ごとに利用条件・営業時間・予約規則を確認。',
          th: 'กิออนเป็นย่าน ไม่ใช่สถานที่ซื้อตั๋วแห่งเดียว ตรวจเงื่อนไขเข้า เวลา และการจองของร้าน วัด และซอยส่วนบุคคลแต่ละแห่ง',
          "ko": "기온은 하나의 유료 시설이 아니라 지역 이름입니다. 가게, 사찰, 사유 골목길마다 출입 조건, 운영 시간, 예약 규정이 다릅니다.",
          "zh-CN": "祇园是一个地区，而不是一个单独的售票场所。每个企业、寺庙和私人巷道都有自己的通道、营业时间和预订规则。",
          "vi": "Gion là một quận, không phải là một địa điểm bán vé. Mỗi doanh nghiệp, ngôi chùa và làn đường riêng đều có quy tắc ra vào, giờ làm việc và đặt chỗ riêng.",
          "fr": "Gion est un quartier, pas un seul lieu payant. Chaque entreprise, temple et voie privée a ses propres règles d'accès, d'horaires et de réservation.",
          "es": "Gion es un distrito, no un lugar con entrada única. Cada negocio, templo y carril privado tiene sus propias reglas de acceso, horario y reserva.",
        },
        source: 'https://www.japan.travel/en/spot/84/',
        reviewedAt: '2026-10-26',
      },
      admission: {
        reason: {
          en: 'Gion is a district, not a single ticketed venue. Each business, temple and private lane has its own access, hours and reservation rules.',
          ja: '祇園は地域名で、単一の有料施設ではありません。店舗・寺院・私道ごとに利用条件・営業時間・予約規則を確認。',
          th: 'กิออนเป็นย่าน ไม่ใช่สถานที่ซื้อตั๋วแห่งเดียว ตรวจเงื่อนไขเข้า เวลา และการจองของร้าน วัด และซอยส่วนบุคคลแต่ละแห่ง',
          "ko": "기온은 하나의 유료 시설이 아니라 지역 이름입니다. 가게, 사찰, 사유 골목길마다 출입 조건, 운영 시간, 예약 규정이 다릅니다.",
          "zh-CN": "祇园是一个地区，而不是一个单独的售票场所。每个企业、寺庙和私人巷道都有自己的通道、营业时间和预订规则。",
          "vi": "Gion là một quận, không phải là một địa điểm bán vé. Mỗi doanh nghiệp, ngôi chùa và làn đường riêng đều có quy tắc ra vào, giờ làm việc và đặt chỗ riêng.",
          "fr": "Gion est un quartier, pas un seul lieu payant. Chaque entreprise, temple et voie privée a ses propres règles d'accès, d'horaires et de réservation.",
          "es": "Gion es un distrito, no un lugar con entrada única. Cada negocio, templo y carril privado tiene sus propias reglas de acceso, horario y reserva.",
        },
        source: 'https://www.japan.travel/en/spot/84/',
        reviewedAt: '2026-10-26',
      },
      booking: {
        reason: {
          en: 'Gion is a district, not a single ticketed venue. Each business, temple and private lane has its own access, hours and reservation rules.',
          ja: '祇園は地域名で、単一の有料施設ではありません。店舗・寺院・私道ごとに利用条件・営業時間・予約規則を確認。',
          th: 'กิออนเป็นย่าน ไม่ใช่สถานที่ซื้อตั๋วแห่งเดียว ตรวจเงื่อนไขเข้า เวลา และการจองของร้าน วัด และซอยส่วนบุคคลแต่ละแห่ง',
          "ko": "기온은 하나의 유료 시설이 아니라 지역 이름입니다. 가게, 사찰, 사유 골목길마다 출입 조건, 운영 시간, 예약 규정이 다릅니다.",
          "zh-CN": "祇园是一个地区，而不是一个单独的售票场所。每个企业、寺庙和私人巷道都有自己的通道、营业时间和预订规则。",
          "vi": "Gion là một quận, không phải là một địa điểm bán vé. Mỗi doanh nghiệp, ngôi chùa và làn đường riêng đều có quy tắc ra vào, giờ làm việc và đặt chỗ riêng.",
          "fr": "Gion est un quartier, pas un seul lieu payant. Chaque entreprise, temple et voie privée a ses propres règles d'accès, d'horaires et de réservation.",
          "es": "Gion es un distrito, no un lugar con entrada única. Cada negocio, templo y carril privado tiene sus propias reglas de acceso, horario y reserva.",
        },
        source: 'https://www.japan.travel/en/spot/84/',
        reviewedAt: '2026-10-26',
      },
    },
  },
  sensoji: {
    source: 'https://www.senso-ji.jp/access/',
    reviewedAt: '2026-10-25',
    minutes: 90,
    access: {
      en: 'About five minutes from Asakusa stations; the Toei Asakusa Line guide specifies exit A4.',
      ja: '浅草駅から徒歩約5分。都営浅草線はA4出口の案内。',
      th: 'เดินประมาณ 5 นาทีจากสถานี Asakusa สาย Toei Asakusa ระบุทางออก A4',
      "ko": "아사쿠사역에서 약 5분. 도에이 아사쿠사선 가이드에는 A4 출구가 명시되어 있습니다.",
      "zh-CN": "距离浅草站约5分钟；都营浅草线指南指定了 A4 出口。",
      "vi": "Khoảng năm phút từ ga Asakusa; hướng dẫn Tuyến Toei Asakusa chỉ định lối ra A4.",
      "fr": "À environ cinq minutes des gares d'Asakusa ; le guide de la ligne Toei Asakusa précise la sortie A4.",
      "es": "A unos cinco minutos de las estaciones de Asakusa; la guía de la línea Toei Asakusa especifica la salida A4.",
    },
    entrance: {
      en: 'Kaminarimon is the main gate; the approach continues from there to the main hall.',
      ja: '雷門は総門で、そこから本堂まで参道が続きます。',
      th: 'Kaminarimon เป็นประตูหลัก และมีทางเดินไปจนถึงวิหารหลัก',
      "ko": "가미나리몬은 정문이며, 이곳에서 본당까지 참배길이 이어집니다.",
      "zh-CN": "雷门是正门；从那里继续通往主厅。",
      "vi": "Kaminarimon là cổng chính; con đường tiếp tục từ đó đến sảnh chính.",
      "fr": "Kaminarimon est la porte principale ; l'approche se poursuit de là jusqu'au hall principal.",
      "es": "Kaminarimon es la puerta principal; el acceso continúa desde allí hasta el salón principal.",
    },
    accessibility: {
      en: 'A lift is on the left when facing the main hall. Multipurpose toilets are to the right of Hozomon and behind the main hall. Check the route from the station separately.',
      ja: '本堂に向かって左側にエレベーターがあります。多目的トイレは宝蔵門の右側と本堂裏にあります。駅からの経路は別途確認してください。',
      th: 'มีลิฟต์ทางซ้ายเมื่อหันหน้าเข้าวิหารหลัก ห้องน้ำอเนกประสงค์อยู่ด้านขวาของประตู Hozomon และด้านหลังวิหารหลัก โปรดตรวจเส้นทางจากสถานีแยกต่างหาก',
      "ko": "본당을 바라보면 왼쪽에 엘리베이터가 있습니다. 다목적 화장실은 호조몬 오른쪽, 본당 뒤편에 있습니다. 역에서 출발하는 경로는 별도로 확인하세요.",
      "zh-CN": "面对主厅时，电梯位于左侧。多功能厕所位于宝藏门右侧、主殿后面。请分别确认从车站出发的路线。",
      "vi": "Có thang máy ở bên trái khi đối diện với sảnh chính. Nhà vệ sinh đa năng nằm ở bên phải Hozomon và phía sau sảnh chính. Kiểm tra tuyến đường từ nhà ga một cách riêng biệt.",
      "fr": "Un ascenseur se trouve sur la gauche face au hall principal. Les toilettes polyvalentes se trouvent à droite d'Hozomon et derrière le hall principal. Vérifiez l'itinéraire depuis la gare séparément.",
      "es": "Hay un ascensor a la izquierda de cara al vestíbulo principal. Los baños multiuso están a la derecha de Hozomon y detrás del salón principal. Consulta la ruta desde la estación por separado.",
    },
    fieldSources: {
      entrance: {
        source: 'https://www.senso-ji.jp/faq/',
        reviewedAt: '2026-10-30',
      },
      accessibility: {
        source: 'https://www.senso-ji.jp/faq/',
        reviewedAt: '2026-10-30',
      },
    },
    hours: {
      en: 'Main hall: 06:00–17:00; opens 06:30 October–March. Other halls may differ.',
      ja: '本堂6:00〜17:00。10〜3月は6:30開堂。他のお堂は別途確認。',
      th: 'วิหารหลัก 06:00–17:00 น. ต.ค.–มี.ค. เปิด 06:30 น. อาคารอื่นอาจต่างกัน',
      "ko": "본당은 06:00~17:00에 운영하며, 10월~3월에는 06:30에 엽니다. 다른 전각의 운영 시간은 다를 수 있습니다.",
      "zh-CN": "主厅：06:00-17:00；十月至三月 06:30 开放。其他大厅可能有所不同。",
      "vi": "Sảnh chính: 06:00–17:00; mở cửa lúc 06:30 Tháng 10 - Tháng 3. Các hội trường khác có thể khác nhau.",
      "fr": "Bâtiment principal : 06:00–17:00 ; ouverture à 06:30 d’octobre à mars. Les horaires des autres bâtiments peuvent différer.",
      "es": "Salón principal: 06:00–17:00; de octubre a marzo abre a las 06:30. Los horarios de otros salones pueden ser distintos.",
    },
  },
  'pref:kyoto:fushimi-inari-taisha': {
    source: 'https://inari.jp/en/access/',
    reviewedAt: '2026-10-25',
    minutes: 90,
    access: {
      en: 'Beside Inari Station on the JR Nara Line, or a five-minute walk east from Fushimi-inari Station on the Keihan Main Line. These are different stations; check the lower-ground entrance separately from any mountain walk.',
      ja: 'JR奈良線の稲荷駅すぐ、または京阪本線の伏見稲荷駅から東へ徒歩約5分。別々の駅です。ふもとの境内への入口と山道の行程は分けて確認してください。',
      th: 'ติดสถานี Inari สาย JR Nara หรือเดินไปทางตะวันออกประมาณ 5 นาทีจากสถานี Fushimi-inari สาย Keihan Main ทั้งสองเป็นคนละสถานี ตรวจทางเข้าบริเวณศาลเจ้าด้านล่างแยกจากเส้นทางขึ้นภูเขา',
      "ko": "JR 나라선 이나리역 바로 옆에 있으며, 게이한 본선 후시미이나리역에서는 동쪽으로 도보 약 5분입니다. 두 역은 서로 다릅니다. 산기슭 경내의 입구와 산길 탐방 경로를 따로 확인하세요.",
      "zh-CN": "位于JR奈良线稻荷站旁，从京阪本线伏见稻荷站向东步行约5分钟也可到达。这是两个不同的车站。请分别确认山脚下境内的入口和登山步道。",
      "vi": "Ngay cạnh Ga Inari trên Tuyến JR Nara, hoặc đi bộ khoảng 5 phút về phía đông từ Ga Fushimi-inari trên Tuyến chính Keihan. Đây là hai ga khác nhau; hãy kiểm tra riêng lối vào khu đền ở chân núi và đường đi bộ lên núi.",
      "fr": "Juste à côté de la gare d’Inari sur la ligne JR Nara, ou à environ cinq minutes à pied vers l’est depuis Fushimi-inari sur la ligne principale Keihan. Il s’agit de deux gares différentes. Vérifiez séparément l’entrée du sanctuaire au pied de la montagne et les itinéraires de randonnée.",
      "es": "Junto a la estación Inari de la línea JR Nara, o a unos cinco minutos a pie hacia el este desde Fushimi-inari, en la línea principal Keihan. Son estaciones distintas; compruebe por separado la entrada al recinto situado al pie de la montaña y la ruta de senderismo.",
    },
    entrance: {
      en: 'Use the Romon (main gate) on the official map as a landmark for the lower shrine grounds. The path beyond Senbon Torii continues towards Inariyama; station directions do not take you to the summit.',
      ja: 'ふもとの境内へ向かう際は、公式境内図の楼門を目印にしてください。千本鳥居の先には稲荷山へ続く山道があります。駅からの案内は山頂までの案内ではありません。',
      th: 'ใช้ประตู Romon (ประตูหลัก) บนแผนที่ทางการเป็นจุดสังเกตสำหรับบริเวณศาลเจ้าด้านล่าง ทางเลย Senbon Torii จะต่อไปยังภูเขา Inariyama เส้นทางจากสถานีไม่ได้พาไปถึงยอดเขา',
      "ko": "산기슭 신사 경내로 갈 때는 공식 지도에 표시된 로몬(정문)을 기준으로 삼으세요. 센본 도리이 너머의 길은 이나리야마로 이어집니다. 역에서 오는 길 안내는 정상까지의 안내가 아닙니다.",
      "zh-CN": "使用官方地图上的楼门（正门）作为下层神社场地的地标。越过千本鸟居，继续前往稻荷山。车站指示不会带您前往山顶。",
      "vi": "Sử dụng Romon (cổng chính) trên bản đồ chính thức làm điểm mốc cho khu đền phía dưới. Con đường vượt qua Senbon Torii tiếp tục hướng tới Inariyama; chỉ đường của nhà ga không đưa bạn lên đỉnh.",
      "fr": "Utilisez le Romon (porte principale) sur la carte officielle comme point de repère pour les terrains inférieurs du sanctuaire. Le chemin au-delà de Senbon Torii continue vers Inariyama ; les indications de la gare ne vous amènent pas au sommet.",
      "es": "Utilice el Romon (puerta principal) en el mapa oficial como punto de referencia para los terrenos del santuario inferior. El camino más allá de Senbon Torii continúa hacia Inariyama; Las direcciones de la estación no te llevan a la cima.",
    },
    fieldSources: {
      access: {
        source: 'https://inari.jp/en/access/',
        reviewedAt: '2026-10-31',
      },
      entrance: {
        source: 'https://inari.jp/en/map/',
        reviewedAt: '2026-10-30',
      },
    },
  },
  'beer-museum': {
    source: 'https://www.sapporobeer.jp/english/brewery/s_museum/',
    reviewedAt: '2026-10-25',
    access: {
      en: 'About ten minutes on foot from exit 4 of Higashi-Kuyakusho-Mae on the Toho subway. This is the Sapporo museum, not the brewery in Eniwa.',
      ja: '地下鉄東豊線東区役所前駅4番出口から徒歩約10分。恵庭の工場とは別施設です。',
      th: 'เดินประมาณ 10 นาทีจากทางออก 4 ของ Higashi-Kuyakusho-Mae สาย Toho ที่นี่คือพิพิธภัณฑ์ในซัปโปโร ไม่ใช่โรงงานใน Eniwa',
      "ko": "지하철 도호선 히가시쿠야쿠쇼마에역 4번 출구에서 도보 약 10분입니다. 에니와의 양조장이 아니라 삿포로에 있는 박물관입니다.",
      "zh-CN": "从东丰地铁东区役所前4号出口步行约10分钟。这是札幌博物馆，不是惠庭的啤酒厂。",
      "vi": "Khoảng mười phút đi bộ từ lối ra số 4 của Higashi-Kuyakusho-Mae trên tàu điện ngầm Toho. Đây là bảo tàng Sapporo, không phải nhà máy bia ở Eniwa.",
      "fr": "Une dizaine de minutes à pied de la sortie 4 de Higashi-Kuyakusho-Mae du métro Toho. Il s'agit du musée de Sapporo, pas de la brasserie d'Eniwa.",
      "es": "A unos diez minutos a pie desde la salida 4 de Higashi-Kuyakusho-Mae en el metro de Toho. Este es el museo de Sapporo, no la cervecería de Eniwa.",
    },
    minutes: 60,
    hours: {
      en: 'Self-guided exhibition: 11:00–18:00, last entry 17:30. Check the current operating calendar.',
      ja: '自由見学11:00〜18:00、最終入館17:30。営業カレンダーも確認。',
      th: 'ชมนิทรรศการด้วยตนเอง 11:00–18:00 น. เข้าสุดท้าย 17:30 น. ตรวจปฏิทินเปิดบริการด้วย',
      "ko": "자유 관람 전시는 11:00~18:00에 운영하며 마지막 입장은 17:30입니다. 최신 운영 일정을 확인하세요.",
      "zh-CN": "自助展览：11:00-18:00，最后入场时间17:30。检查当前的运行日历。",
      "vi": "Triển lãm tự hướng dẫn: 11:00–18:00, vào cửa lần cuối 17:30. Kiểm tra lịch hoạt động hiện tại.",
      "fr": "Exposition libre : de 11h00 à 18h00, dernière entrée à 17h30. Consultez le calendrier opérationnel actuel.",
      "es": "Exposición autoguiada: 11:00-18:00, última entrada 17:30. Consulta el calendario operativo actual.",
    },
    admission: {
      en: 'Current self-guided adult ticket: ¥1,000. Older free-tour leaflets are outdated. Tastings cost extra.',
      ja: '現在の自由見学は大人1,000円。旧「無料見学」の資料とは異なります。試飲は別料金。',
      th: 'ราคาชมเองปัจจุบัน ผู้ใหญ่ 1,000 เยน ใบปลิวเก่าที่บอกเข้าฟรีล้าสมัยแล้ว ชิมเครื่องดื่มคิดเพิ่ม',
      "ko": "자유 관람 성인 입장권은 현재 1,000엔입니다. 무료 관람을 안내하는 옛 전단은 더 이상 유효하지 않습니다. 맥주 시음은 별도 요금입니다.",
      "zh-CN": "目前自助成人票：1000日元。旧的免费旅游传单已经过时了。品尝需要额外付费。",
      "vi": "Vé tự tham quan cho người lớn hiện là 1.000 yên. Các tờ rơi cũ ghi tham quan miễn phí đã hết hiệu lực. Hoạt động nếm bia tính phí riêng.",
      "fr": "Billet adulte autoguidé actuel : 1 000 ¥. Les anciens dépliants de visite gratuite sont obsolètes. Les dégustations coûtent en supplément.",
      "es": "Boleto de adulto autoguiado actual: ¥1,000. Los folletos de visitas guiadas gratuitas más antiguos están desactualizados. Las degustaciones tienen un costo adicional.",
    },
    booking: {
      en: 'Self-guided visits do not require a reservation; premium tours use separate booking.',
      ja: '自由見学は予約不要。プレミアムツアーは別途予約。',
      th: 'ชมเองไม่ต้องจอง ส่วนทัวร์พรีเมียมมีระบบจองแยก',
      "ko": "자유 관람은 예약이 필요하지 않습니다. 프리미엄 투어는 별도로 예약해야 합니다.",
      "zh-CN": "自助参观无需预约；高级旅游使用单独预订。",
      "vi": "Tham quan tự do không cần đặt trước; tour cao cấp có hệ thống đặt chỗ riêng.",
      "fr": "Les visites libres ne nécessitent pas de réservation ; Les circuits premium utilisent une réservation séparée.",
      "es": "Las visitas autoguiadas no requieren reserva; Los tours premium utilizan reservas por separado.",
    },
    fieldSources: {
      access: {
        source: 'https://www.sapporobeer.jp/english/brewery/s_museum/',
        reviewedAt: '2026-10-25',
      },
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
      "ko": "JR이나 산요히메지에서 도보로 약 20분. 버스는 역 북쪽 출구에서 오테몬마에(Otemon-mae) 방향으로 출발합니다.",
      "zh-CN": "从JR或山阳姬路步行约20分钟。巴士从车站北口出发前往大手门前。",
      "vi": "Đi bộ khoảng 20 phút từ JR hoặc Sanyo Himeji. Xe buýt rời ga theo lối ra phía bắc để đến Otemon-mae.",
      "fr": "Marchez environ 20 minutes depuis JR ou Sanyo Himeji. Les bus quittent la gare par la sortie nord en direction d'Otemon-mae.",
      "es": "Camine unos 20 minutos desde JR o Sanyo Himeji. Los autobuses salen de la estación por la salida norte hacia Otemon-mae.",
    },
    hours: {
      en: '09:00–17:00, entry until 16:00. Scheduled closure December 29–30; check weather-related route changes.',
      ja: '9:00〜17:00、入城16:00まで。12月29・30日休城予定。天候による経路変更を確認。',
      th: '09:00–17:00 น. เข้าถึง 16:00 น. กำหนดปิด 29–30 ธ.ค. ตรวจการเปลี่ยนเส้นทางจากสภาพอากาศ',
      "ko": "09:00~17:00, 입장은 16:00까지. 12월 29~30일 휴무 예정; 날씨 관련 경로 변경을 확인하세요.",
      "zh-CN": "09:00–17:00，入场截止至16:00。预定关闭时间为 12 月 29 日至 30 日；检查与天气相关的路线变化。",
      "vi": "09:00–17:00, vào cửa đến 16:00. Dự kiến đóng cửa từ 29–30 tháng 12; kiểm tra các thay đổi tuyến đường liên quan đến thời tiết.",
      "fr": "09h00-17h00, entrée jusqu'à 16h00. Fermeture prévue les 29 et 30 décembre ; vérifier les changements d'itinéraire liés à la météo.",
      "es": "09:00–17:00, entrada hasta las 16:00. Cierre programado del 29 al 30 de diciembre; verifique los cambios de ruta relacionados con el clima.",
    },
    admission: {
      en: 'Visitors aged 18+: ¥2,500; castle + Kokoen ¥2,600. Under 18 free, including through the first March 31 after turning 18. Himeji residents have separate rates.',
      ja: '18歳以上2,500円、好古園共通券2,600円。18歳未満（18歳到達後最初の3月31日までを含む）は無料。姫路市民は別料金。',
      th: 'ผู้มาเยือนอายุ 18 ปีขึ้นไป 2,500 เยน รวมสวน Kokoen 2,600 เยน อายุต่ำกว่า 18 ปีฟรี รวมถึงวันที่ 31 มี.ค. ครั้งแรกหลังอายุครบ 18 ปี ชาวเมืองฮิเมจิใช้อัตราแยก',
      "ko": "18세 이상 방문객은 2,500엔이며, 성과 고코엔 통합권은 2,600엔입니다. 18세 미만과 18세가 된 뒤 처음 맞는 3월 31일까지의 방문객은 무료입니다. 히메지 주민에게는 별도 요금이 적용됩니다.",
      "zh-CN": "18岁及以上游客：2,500日元；城堡与好古园联票2,600日元。未满18岁免费，免费期限延续至年满18岁后的首个3月31日。姬路市居民另有票价。",
      "vi": "Du khách từ 18 tuổi trở lên: 2.500 Yên; lâu đài + Kokoen 2.600 yên. Dưới 18 tuổi miễn phí, kể cả đến hết ngày 31 tháng 3 đầu tiên sau khi đủ 18 tuổi. Cư dân Himeji có mức giá riêng.",
      "fr": "Visiteurs âgés de 18 ans et plus : 2 500 ¥ ; château + Kokoen 2 600 ¥. Gratuit pour les moins de 18 ans, y compris jusqu'au 31 mars après l'âge de 18 ans. Les résidents de Himeji ont des tarifs différents.",
      "es": "Visitantes de 18 años o más: 2.500 ¥; castillo y Kokoen: 2.600 ¥. La entrada es gratuita para menores de 18 años, con validez hasta el primer 31 de marzo después de cumplir los 18. Los residentes de Himeji tienen tarifas propias.",
    },
    accessibility: {
      en: 'Steep stairs and slopes; no lifts in the keep. Wheelchairs cannot enter the keep buildings.',
      ja: '急な階段・坂があり、天守にエレベーターはありません。天守などの建物内は車いす不可。',
      th: 'มีบันไดและทางลาดชัน หอปราสาทไม่มีลิฟต์และรถเข็นเข้าอาคารหอปราสาทไม่ได้',
      "ko": "가파른 계단과 경사면; 성채에는 엘리베이터가 없습니다. 휠체어는 천수각 건물에 들어갈 수 없습니다.",
      "zh-CN": "陡峭的楼梯和斜坡；城堡内没有电梯。轮椅不能进入城堡建筑。",
      "vi": "Có cầu thang và lối dốc cao; tháp chính không có thang máy. Xe lăn không thể vào các tòa nhà của tháp chính.",
      "fr": "Escaliers et pentes raides ; pas d'ascenseur dans le donjon. Les fauteuils roulants ne peuvent pas entrer dans les bâtiments du donjon.",
      "es": "Escaleras empinadas y pendientes; No hay ascensores en la torre del homenaje. Las sillas de ruedas no pueden acceder a los edificios del homenaje.",
    },
    fieldSources: {
      admission: {
        source: 'https://www.himejicastle.jp/en/',
        reviewedAt: '2026-10-27',
      },
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
      "ko": "대불전: 4월~10월 07:30~17:30, 11월~3월 08:00~17:00. 다른 홀은 다릅니다.",
      "zh-CN": "大佛殿：4月-10月 07:30-17:30； 11 月至 3 月 08:00–17:00。其他大厅有所不同。",
      "vi": "Đại Phật Điện: Tháng 4–Tháng 10 07:30–17:30; Tháng 11–Tháng 3 08:00–17:00. Các hội trường khác thì khác.",
      "fr": "Grande salle du Bouddha : avril-octobre, de 7 h 30 à 17 h 30 ; De novembre à mars, de 8h00 à 17h00. Les autres salles diffèrent.",
      "es": "Gran Salón del Buda: abril-octubre de 07:30 a 17:30; Noviembre-marzo 08:00-17:00. Otras salas difieren.",
    },
    admission: {
      en: 'Great Buddha Hall adult admission: ¥800; joint museum ticket ¥1,200.',
      ja: '大仏殿の大人拝観料800円。ミュージアムとの共通券1,200円。',
      th: 'วิหารพระใหญ่ ผู้ใหญ่ 800 เยน ตั๋วรวมพิพิธภัณฑ์ 1,200 เยน',
      "ko": "대불전 성인 입장료는 800엔이며, 박물관 통합 입장권은 1,200엔입니다.",
      "zh-CN": "大佛殿成人门票：800日元；联合博物馆门票 1,200 日元。",
      "vi": "Đại Phật Điện vào cổng người lớn: ¥800; vé bảo tàng chung 1.200 yên.",
      "fr": "Entrée adulte à la salle du Grand Bouddha : 800 ¥ ; billet combiné avec le musée : 1 200 ¥.",
      "es": "Entrada para adultos al Gran Salón del Buda: ¥800; entrada conjunta al museo ¥ 1.200.",
    },
    access: {
      en: 'About 20 minutes on foot from Kintetsu Nara. The temple also publishes bus stop guidance.',
      ja: '近鉄奈良駅から徒歩約20分。公式サイトにバス停の案内もあります。',
      th: 'เดินประมาณ 20 นาทีจาก Kintetsu Nara เว็บไซต์วัดมีข้อมูลป้ายรถบัสด้วย',
      "ko": "긴테쓰 나라에서 도보로 약 20분. 사찰에서는 버스 정류장 안내도 발행합니다.",
      "zh-CN": "从近铁奈良步行约20分钟。寺庙还发布了公交车站指南。",
      "vi": "Khoảng 20 phút đi bộ từ Kintetsu Nara. Ngôi chùa cũng xuất bản hướng dẫn dừng xe buýt.",
      "fr": "A environ 20 minutes à pied de Kintetsu Nara. Le temple publie également des conseils sur les arrêts de bus.",
      "es": "A unos 20 minutos a pie desde Kintetsu Nara. El templo también publica instrucciones sobre paradas de autobús.",
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
      "ko": "아오모리역에서 도보 약 1분.",
      "zh-CN": "从青森站步行约1分钟。",
      "vi": "Khoảng một phút đi bộ từ ga Aomori.",
      "fr": "À environ une minute à pied de la gare d'Aomori.",
      "es": "Aproximadamente a un minuto a pie desde la estación de Aomori.",
    },
    hours: {
      en: 'May–August 09:00–19:00; September–April 09:00–18:00. Closed August 9–10 and December 31–January 1.',
      ja: '5〜8月9:00〜19:00、9〜4月9:00〜18:00。8月9・10日、12月31日・1月1日休館。',
      th: 'พ.ค.–ส.ค. 09:00–19:00 น. ก.ย.–เม.ย. 09:00–18:00 น. ปิด 9–10 ส.ค. และ 31 ธ.ค.–1 ม.ค.',
      "ko": "5월~8월 09:00~19:00; 9월~4월 09:00~18:00. 8월 9~10일, 12월 31일~1월 1일은 휴무입니다.",
      "zh-CN": "5 月至 8 月 09:00–19:00； 9 月至 4 月 09:00–18:00。 8 月 9 日至 10 日以及 12 月 31 日至 1 月 1 日关闭。",
      "vi": "Tháng 5–tháng 8 09:00–19:00; Tháng 9–Tháng 4 09:00–18:00. Đóng cửa từ ngày 9 đến ngày 10 tháng 8 và ngày 31 tháng 12 đến ngày 1 tháng 1.",
      "fr": "mai-août de 9h00 à 19h00 ; De septembre à avril, de 9h00 à 18h00. Fermé du 9 au 10 août et du 31 décembre au 1er janvier.",
      "es": "Mayo-agosto 09:00-19:00; Septiembre-abril 09:00-18:00. Cerrado del 9 al 10 de agosto y del 31 de diciembre al 1 de enero.",
    },
    admission: {
      en: 'Adult admission: ¥620 at review.',
      ja: '確認時の大人入館料620円。',
      th: 'ราคาที่ตรวจ ผู้ใหญ่ 620 เยน',
      "ko": "성인 입장료: 정보 확인 당시 620엔.",
      "zh-CN": "成人门票：信息核查时 620 日元。",
      "vi": "Vé người lớn: ¥620 tại thời điểm kiểm tra thông tin.",
      "fr": "Entrée adulte : 620 ¥ au moment de la vérification.",
      "es": "Entrada para adultos: ¥620 en la fecha de comprobación.",
    },
    booking: {
      en: 'Buy admission at the ticket machine on the day; the museum does not offer advance tickets.',
      ja: '前売券はなく、当日券売機で購入。',
      th: 'ซื้อตั๋วจากเครื่องในวันเข้าชม ไม่มีตั๋วล่วงหน้า',
      "ko": "당일 매표기에서 입장권을 구매하세요. 박물관에서는 예매권을 제공하지 않습니다.",
      "zh-CN": "当天在售票机购买门票；博物馆不提供预售票。",
      "vi": "Mua vé vào cửa tại máy bán vé trong ngày; bảo tàng không cung cấp vé trước.",
      "fr": "Achetez votre entrée au distributeur de billets le jour même ; le musée ne propose pas de billets à l'avance.",
      "es": "Comprar la entrada en la máquina expendedora de billetes del día; El museo no ofrece entradas anticipadas.",
    },
  },
  'pref:ishikawa:kenrokuen': {
    source: 'https://shiro-niwa.pref.ishikawa.lg.jp/kenrokuen-garden/info.html',
    reviewedAt: '2026-10-25',
    access: {
      en: 'From Kanazawa Station, use the Kenrokuen-shita bus stop for Katsurazaka Gate, or Hirosaka for Mayumizaka Gate. Choose your entrance before boarding.',
      ja: '金沢駅から桂坂口へは兼六園下、真弓坂口へは広坂でバスを下車。利用する門を決めて乗車。',
      th: 'จากสถานี Kanazawa ลงบัส Kenrokuen-shita เพื่อเข้าประตู Katsurazaka หรือ Hirosaka เพื่อเข้าประตู Mayumizaka เลือกประตูก่อนขึ้นรถ',
      "ko": "가나자와역에서 가쓰라자카 게이트로 가려면 겐로쿠엔시타 버스 정류장을 이용하고, 마유미자카 게이트로 가려면 히로사카 버스 정류장을 이용하세요. 탑승 전 입구를 선택하세요.",
      "zh-CN": "从金泽站出发，前往桂坂门可在兼六园下车站下车，前往真弓坂门可在广坂下车。请在乘车前选好入口。",
      "vi": "Từ Ga Kanazawa, hãy sử dụng trạm xe buýt Kenrokuen-shita để đến Cổng Katsurazaka hoặc Hirosaka để đến Cổng Mayumizaka. Chọn lối vào của bạn trước khi lên xe.",
      "fr": "Depuis la gare de Kanazawa, utilisez l'arrêt de bus Kenrokuen-shita pour la porte Katsurazaka ou Hirosaka pour la porte Mayumizaka. Choisissez votre entrée avant d'embarquer.",
      "es": "Desde la estación de Kanazawa, utilice la parada de autobús Kenrokuen-shita hacia la puerta Katsurazaka o Hirosaka hacia la puerta Mayumizaka. Elige tu entrada antes de embarcar.",
    },
    minutes: 90,
    hours: {
      en: 'March 1–October 15: 07:00–18:00; October 16–February: 08:00–17:00. Last entry 30 minutes before closing.',
      ja: '3月1日〜10月15日7:00〜18:00、10月16日〜2月末8:00〜17:00。入園は閉園30分前まで。',
      th: '1 มี.ค.–15 ต.ค. 07:00–18:00 น. 16 ต.ค.–สิ้น ก.พ. 08:00–17:00 น. เข้าสุดท้ายก่อนปิด 30 นาที',
      "ko": "3월 1일~10월 15일: 07:00~18:00; 10월 16일~2월: 08:00~17:00. 마지막 입장은 폐장 30분 전입니다.",
      "zh-CN": "3月1日-10月15日：07:00-18:00； 10 月 16 日至 2 月：08:00–17:00。最后入场时间为关门前 30 分钟。",
      "vi": "Ngày 1 tháng 3 – ngày 15 tháng 10: 07:00–18:00; Ngày 16 tháng 10 – tháng 2: 08:00–17:00. Lần vào cuối cùng là 30 phút trước khi đóng cửa.",
      "fr": "Du 1er mars au 15 octobre : de 7h00 à 18h00 ; Du 16 octobre au février : de 8h00 à 17h00. Dernière entrée 30 minutes avant la fermeture.",
      "es": "Del 1 de marzo al 15 de octubre: de 07:00 a 18:00 horas; 16 de octubre a febrero: de 08:00 a 17:00 horas. Última entrada 30 minutos antes del cierre.",
    },
    admission: {
      en: 'Ages 18+: ¥320; ages 6–17: ¥100. Visitors aged 65+ can request free entry with proof of age; bring a passport.',
      ja: '18歳以上320円、6〜17歳100円。65歳以上は年齢確認で無料。旅行者はパスポートを持参。',
      th: 'อายุ 18 ปีขึ้นไป 320 เยน อายุ 6–17 ปี 100 เยน อายุ 65 ปีขึ้นไปขอเข้าฟรีโดยแสดงหลักฐานอายุ เช่น พาสปอร์ต',
      "ko": "18세 이상: 320엔; 6~17세: 100엔. 65세 이상의 방문객은 연령 증명을 통해 무료 입장을 요청할 수 있습니다. 여권을 지참하세요.",
      "zh-CN": "18岁及以上：320日元； 6-17 岁：100 日元。 65岁及以上游客可凭年龄证明免费入场；带上护照。",
      "vi": "Từ 18 tuổi trở lên: ¥320; 6–17 tuổi: ¥100. Du khách từ 65 tuổi trở lên có thể yêu cầu vào cửa miễn phí nếu có bằng chứng về tuổi; mang theo hộ chiếu.",
      "fr": "18 ans et plus : 320 ¥ ; 6 à 17 ans : 100 ¥. Les visiteurs âgés de 65 ans et plus peuvent demander une entrée gratuite sur présentation d’une preuve d’âge ; apporter un passeport.",
      "es": "De 18 años en adelante: 320 ¥; de 6 a 17 años: 100 ¥. Las personas de 65 años o más pueden solicitar entrada gratuita con un documento que acredite la edad; lleve el pasaporte.",
    },
    accessibility: {
      en: 'Wheelchairs are available at listed gates. The garden has slopes and gravel; use the official recommended accessible route.',
      ja: '各料金所に貸出車いすあり。坂道・砂利道があるため公式の推奨コースを確認。',
      th: 'มีรถเข็นให้ยืมตามประตูที่ระบุ สวนมีทางลาดและกรวด ตรวจเส้นทางที่เว็บไซต์แนะนำ',
      "ko": "휠체어는 나열된 게이트에서 이용 가능합니다. 정원에는 경사면과 자갈이 있습니다. 공식적으로 권장하는 접근 가능한 경로를 이용하세요.",
      "zh-CN": "官方列出的出入口可提供轮椅。花园有斜坡和砾石；使用官方推荐的无障碍路线。",
      "vi": "Xe lăn có sẵn tại các cổng được liệt kê. Vườn có độ dốc và sỏi; sử dụng tuyến đường dành cho người hạn chế vận động chính thức được đề xuất.",
      "fr": "Des fauteuils roulants sont disponibles aux portes répertoriées. Le jardin a des pentes et du gravier ; utilisez l’itinéraire accessible officiel recommandé.",
      "es": "Hay sillas de ruedas disponibles en las puertas indicadas. El jardín tiene desniveles y gravilla; Utilice la ruta accesible oficial recomendada.",
    },
    fieldSources: {
      access: {
        source: 'https://shiro-niwa.pref.ishikawa.lg.jp/access.html',
        reviewedAt: '2026-10-25',
      },
      admission: {
        source:
          'https://shiro-niwa.pref.ishikawa.lg.jp/kenrokuen-garden/e/info.html',
        reviewedAt: '2026-10-27',
      },
      entrance: {
        source:
          'https://shiro-niwa.pref.ishikawa.lg.jp/kenrokuen-garden/e/info.html',
        reviewedAt: '2026-10-27',
      },
    },
    entrance: {
      en: 'Early free entry uses Renchi-mon and Zuishinzaka only. Leave 15 minutes before paid opening hours; daytime gate choices differ.',
      ja: '早朝無料入園は蓮池門・随身坂口のみ。有料開園の15分前までに退園。日中の入口とは異なります。',
      th: 'เข้าฟรีช่วงเช้ามืดได้เฉพาะ Renchi-mon และ Zuishinzaka ต้องออกก่อนเวลาเปิดเก็บค่าเข้า 15 นาที ประตูช่วงกลางวันต่างกัน',
      "ko": "이른 아침 무료 입장은 렌치몬과 즈이신자카만 이용할 수 있습니다. 유료 관람 시작 15분 전까지 나와야 합니다. 주간에 이용 가능한 입구는 다릅니다.",
      "zh-CN": "早期免费入场仅限莲池门和瑞神坂。付费开放时间前 15 分钟离开；白天的出入口选择有所不同。",
      "vi": "Vào cửa miễn phí vào sáng sớm chỉ qua Renchi-mon và Zuishinzaka. Phải rời vườn trước giờ mở cửa có thu phí 15 phút; các cổng sử dụng ban ngày khác nhau.",
      "fr": "L'entrée gratuite anticipée utilise uniquement Renchi-mon et Zuishinzaka. Partir 15 minutes avant les heures d’ouverture payantes ; les choix de portes de jour diffèrent.",
      "es": "La entrada gratuita anticipada solo utiliza Renchi-mon y Zuishinzaka. Salir 15 minutos antes del horario de apertura pagado; Las opciones de puertas durante el día difieren.",
    },
  },
  'pref:nagano:matsumoto-castle': {
    source: 'https://www.matsumoto-castle.jp/eng/info',
    reviewedAt: '2026-10-25',
    access: {
      en: 'Walk about 20 minutes from JR Matsumoto Station. Use the south-side Kuromon entrance; the red bridge is not an entrance.',
      ja: 'JR松本駅から徒歩約20分。南側の黒門から入場。赤い橋は入口ではありません。',
      th: 'เดินประมาณ 20 นาทีจาก JR Matsumoto เข้าประตู Kuromon ด้านใต้ สะพานแดงไม่ใช่ทางเข้า',
      "ko": "JR 마츠모토역에서 도보로 약 20분. 남쪽 구로몬 입구를 이용하세요. 빨간 다리는 입구가 아닙니다.",
      "zh-CN": "从JR松本站步行约20分钟。使用南侧黑门入口；红桥不是入口。",
      "vi": "Đi bộ khoảng 20 phút từ Ga JR Matsumoto. Sử dụng lối vào Kuromon phía nam; cây cầu đỏ không phải là lối vào.",
      "fr": "Marchez environ 20 minutes depuis la gare JR Matsumoto. Utilisez l’entrée Kuromon du côté sud ; le pont rouge n'est pas une entrée.",
      "es": "Camine unos 20 minutos desde la estación JR Matsumoto. Utilice la entrada de Kuromon del lado sur; El puente rojo no es una entrada.",
    },
    minutes: 90,
    hours: {
      en: 'Usually 08:30–17:00, last entry 16:30. Closed December 29–31; holiday extensions vary.',
      ja: '通常8:30〜17:00、最終入場16:30。12月29〜31日休場。延長日は別途確認。',
      th: 'ปกติ 08:30–17:00 น. เข้าสุดท้าย 16:30 น. ปิด 29–31 ธ.ค. วันขยายเวลาต้องตรวจเพิ่ม',
      "ko": "보통 08:30~17:00, 마지막 입장은 16:30입니다. 12월 29~31일 휴무; 휴일 연장 운영 시간은 달라질 수 있습니다.",
      "zh-CN": "通常为 08:30–17:00，最后入场时间为 16:30。 12 月 29 日至 31 日闭馆；假期延长各不相同。",
      "vi": "Thường là 08:30–17:00, lượt vào cuối cùng là 16:30. Đóng cửa từ ngày 29 đến ngày 31 tháng 12; giờ mở cửa kéo dài vào ngày lễ có thể khác nhau.",
      "fr": "Généralement de 8h30 à 17h00, dernière entrée à 16h30. Fermé du 29 au 31 décembre ; les prolongations des horaires pendant les vacances varient.",
      "es": "Generalmente de 08:30 a 17:00, última entrada a las 16:30. Cerrado del 29 al 31 de diciembre; las extensiones de vacaciones varían.",
    },
    admission: {
      en: 'Adults: timed e-ticket ¥1,200 / paper ticket ¥1,300. Ages 6–15: ¥400; ages 5 and under free.',
      ja: '大人：日時指定電子券1,200円／紙券1,300円。6〜15歳400円、5歳以下無料。',
      th: 'ผู้ใหญ่: ตั๋วออนไลน์ระบุเวลา 1,200 เยน / ตั๋วกระดาษ 1,300 เยน อายุ 6–15 ปี 400 เยน อายุไม่เกิน 5 ปีฟรี',
      "ko": "성인: 시간 지정 전자 티켓 1,200엔 / 종이 티켓 1,300엔. 6~15세: 400엔; 5세 이하 무료.",
      "zh-CN": "成人：定时电子票 1,200 日元/纸质票 1,300 日元。 6-15岁：400日元； 5 岁及以下免费。",
      "vi": "Người lớn: vé điện tử theo khung giờ ¥1.200 / vé giấy ¥1.300. Độ tuổi 6–15: ¥400; từ 5 tuổi trở xuống miễn phí.",
      "fr": "Adultes : e-billet chronométré 1 200 ¥ / billet papier 1 300 ¥. 6 à 15 ans : 400 ¥ ; 5 ans et moins gratuit.",
      "es": "Adultos: entrada electrónica con franja horaria 1.200 ¥ / entrada en papel 1.300 ¥. De 6 a 15 años: 400 ¥; hasta los 5 años, gratis.",
    },
    booking: {
      en: 'Choose a time for online tickets. Read the no-cancellation terms before payment.',
      ja: '電子券は日時を指定。購入前に取消不可の条件を確認。',
      th: 'ตั๋วออนไลน์ต้องเลือกเวลา อ่านเงื่อนไขยกเลิกไม่ได้ก่อนจ่าย',
      "ko": "온라인 티켓 시간을 선택하세요. 결제 전 취소 불가 조건을 읽어보세요.",
      "zh-CN": "选择网上购票的时间。付款前请阅读不可取消条款。",
      "vi": "Chọn thời gian đặt vé trực tuyến. Đọc các điều khoản không hủy trước khi thanh toán.",
      "fr": "Choisissez une heure pour les billets en ligne. Lisez les conditions de non-annulation avant le paiement.",
      "es": "Elija un horario para las entradas en línea. Lea las condiciones de no cancelación antes del pago.",
    },
    entrance: {
      en: 'Use Kuromon Gate on the south side. The red bridge is not an entrance.',
      ja: '入口は南側の黒門。赤い橋からは入れません。',
      th: 'เข้าทางประตู Kuromon ด้านใต้ สะพานแดงไม่ใช่ทางเข้า',
      "ko": "남쪽의 쿠로몬 게이트를 이용하세요. 빨간 다리는 입구가 아닙니다.",
      "zh-CN": "使用南侧的黑门。红桥不是入口。",
      "vi": "Sử dụng Cổng Kuromon ở phía nam. Cây cầu đỏ không phải là lối vào.",
      "fr": "Utilisez la porte Kuromon du côté sud. Le pont rouge n'est pas une entrée.",
      "es": "Usa la Puerta Kuromon en el lado sur. El puente rojo no es una entrada.",
    },
    fieldSources: {
      access: {
        source: 'https://www.matsumoto-castle.jp/access',
        reviewedAt: '2026-10-25',
      },
      entrance: {
        source: 'https://www.matsumoto-castle.jp/eng/faq',
        reviewedAt: '2026-10-25',
      },
      admission: {
        source: 'https://www.matsumoto-castle.jp/eng/info',
        reviewedAt: '2026-10-27',
      },
      accessibility: {
        source: 'https://www.matsumoto-castle.jp/eng/faq',
        reviewedAt: '2026-10-27',
      },
    },
    accessibility: {
      en: 'No wheelchair entry or lift in the keep. Borrow wheelchairs at Kuromon; limited stock, no reservations. Accessible toilets: one inside the paid grounds, two in the park; none in the keep.',
      ja: '天守は車いす入場不可・エレベーターなし。黒門の貸出車いすは台数限定・予約不可。多目的トイレは有料区域1か所、公園2か所。天守内にはありません。',
      th: 'รถเข็นเข้าหอปราสาทไม่ได้และไม่มีลิฟต์ ยืมรถเข็นที่ Kuromon มีจำกัดและจองไม่ได้ ห้องน้ำผู้พิการ: ในเขตเสียค่าเข้า 1 แห่ง ในสวน 2 แห่ง ไม่มีในหอปราสาท',
      "ko": "천수각에는 휠체어로 입장할 수 없으며 엘리베이터도 없습니다. 구로몬에서 휠체어를 빌릴 수 있으나 수량이 한정되어 있고 예약은 받지 않습니다. 장애인용 화장실은 유료 경내에 1곳, 공원에 2곳 있으며 천수각 안에는 없습니다.",
      "zh-CN": "城堡内没有轮椅入口或电梯。在黑门借用轮椅；库存有限，不接受预订。无障碍厕所：收费场地内1个，公园内2个；城堡里没有。",
      "vi": "Tháp chính không cho xe lăn vào và không có thang máy. Có thể mượn xe lăn tại Kuromon; số lượng có hạn, không nhận đặt trước. Có 1 nhà vệ sinh phù hợp cho người khuyết tật trong khu thu phí và 2 trong công viên; tháp chính không có.",
      "fr": "Pas d'accès aux fauteuils roulants ni d'ascenseur dans le donjon. Emprunter des fauteuils roulants chez Kuromon ; stock limité, pas de réservation. Toilettes accessibles : une à l'intérieur du terrain payant, deux dans le parc ; aucun dans le donjon.",
      "es": "No hay entrada para sillas de ruedas ni ascensor en la torre del homenaje. Pedir prestadas sillas de ruedas a Kuromon; Stock limitado, sin reservas. Baños accesibles: uno dentro del recinto de pago, dos en el parque; ninguno en la torre del homenaje.",
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
      "ko": "후쿠이에서 에치젠철도를 타고 가쓰야마까지 간 후 커뮤니티 버스나 택시를 타세요. 마지막 귀환 교통편을 확인하십시오.",
      "zh-CN": "从福井出发，乘坐越前铁道到胜山，然后乘坐社区巴士或出租车。检查最后的返回连接。",
      "vi": "Từ Fukui, đi Đường sắt Echizen đến Katsuyama, sau đó đi xe buýt cộng đồng hoặc taxi. Kiểm tra kết nối trở lại cuối cùng.",
      "fr": "Depuis Fukui, prenez le chemin de fer Echizen jusqu'à Katsuyama, puis un bus communautaire ou un taxi. Vérifiez la dernière connexion de retour.",
      "es": "Desde Fukui, tome el ferrocarril Echizen hasta Katsuyama y luego un autobús comunitario o un taxi. Verifique la última conexión de retorno.",
    },
    hours: {
      en: 'Usually 09:00–17:00, last entry 16:30. Closed second/fourth Wednesdays outside summer holidays and over New Year.',
      ja: '通常9:00〜17:00、入館16:30まで。夏休み以外の第2・4水曜と年末年始は休館。',
      th: 'ปกติ 09:00–17:00 น. เข้าถึง 16:30 น. ปิดพุธที่ 2 และ 4 นอกช่วงปิดเทอมฤดูร้อน และช่วงปีใหม่',
      "ko": "보통 09:00~17:00, 마지막 입장 시간은 16:30입니다. 여름방학을 제외한 둘째, 넷째 수요일과 신년 연휴는 휴무입니다.",
      "zh-CN": "通常09:00–17:00，最后入场16:30。暑假以外的第二、第四个周三以及新年期间休馆。",
      "vi": "Thường là 09:00–17:00, lượt vào cuối cùng là 16:30. Đóng cửa vào thứ Tư của tuần thứ hai/thứ tư ngoài kỳ nghỉ hè và dịp Năm Mới.",
      "fr": "Généralement de 9h00 à 17h00, dernière entrée à 16h30. Fermé le deuxième/quatrième mercredi hors vacances d'été et pendant le Nouvel An.",
      "es": "Generalmente de 09:00 a 17:00, última entrada a las 16:30. Cerrado el segundo y cuarto miércoles fuera de las vacaciones de verano y durante el Año Nuevo.",
    },
    admission: {
      en: 'Regular adult admission ¥1,000. Special exhibitions and the Field Station may cost extra.',
      ja: '一般大人1,000円。特別展・野外恐竜博物館は別料金の場合あり。',
      th: 'ตั๋วปกติผู้ใหญ่ 1,000 เยน นิทรรศการพิเศษและ Field Station อาจคิดเพิ่ม',
      "ko": "일반 성인 입장료 1,000엔. 특별 전시회와 필드 스테이션(Field Station)에는 추가 비용이 발생할 수 있습니다.",
      "zh-CN": "普通成人票价 1,000 日元。特别展览和现场站可能需要额外付费。",
      "vi": "Vé vào cửa người lớn thông thường 1.000 yên. Các cuộc triển lãm đặc biệt và Trạm thực địa có thể phải trả thêm phí.",
      "fr": "Entrée adulte régulière 1 000 ¥. Les expositions spéciales et la Field Station peuvent entraîner des frais supplémentaires.",
      "es": "Entrada normal para adultos ¥1.000. Las exhibiciones especiales y la estación de campo pueden tener un costo adicional.",
    },
  },
  'pref:nagasaki:dejima': {
    source: 'https://nagasakidejima.jp/about/',
    reviewedAt: '2026-10-25',
    access: {
      en: 'From Nagasaki Station, take a tram toward Sofukuji and get off at Dejima. Check the operator’s entrance map and each gate’s closing time.',
      ja: '長崎駅前から崇福寺行きの路面電車で出島へ。公式の入口案内と各入口の終了時刻を確認。',
      th: 'จากสถานี Nagasaki นั่งรถรางไปทาง Sofukuji ลง Dejima ตรวจแผนที่ทางเข้าและเวลาปิดแต่ละประตูจากเว็บไซต์สถานที่',
      "ko": "나가사키역에서 소후쿠지행 노면전차를 타고 데지마에서 내리세요. 운영 기관의 입구 안내도와 각 출입문의 마감 시간을 확인하세요.",
      "zh-CN": "从长崎站乘坐开往崇福寺方向的电车，在出岛站下车。检查运营商的入口地图和每个出入口的关闭时间。",
      "vi": "Từ Ga Nagasaki, đi xe điện về hướng Sofukuji và xuống ở Dejima. Kiểm tra bản đồ lối vào của nhà điều hành và thời gian đóng cửa của mỗi cổng.",
      "fr": "Depuis la gare de Nagasaki, prenez un tramway en direction de Sofukuji et descendez à Dejima. Vérifiez le plan d’entrée de l’opérateur et l’heure de fermeture de chaque porte.",
      "es": "Desde la estación de Nagasaki, tome un tranvía hacia Sofukuji y bájese en Dejima. Consulte el mapa de entrada del operador y el horario de cierre de cada puerta.",
    },
    minutes: 120,
    hours: {
      en: '08:00–21:00; last entry 20:40. Open year-round, with possible maintenance closures inside.',
      ja: '8:00〜21:00、最終入場20:40。年中無休ですが施設の整備休止あり。',
      th: '08:00–21:00 น. เข้าสุดท้าย 20:40 น. เปิดตลอดปี แต่บางส่วนอาจปิดซ่อม',
      "ko": "08:00~21:00에 운영하며 마지막 입장은 20:40입니다. 연중 운영하지만 내부 일부 구역은 유지보수로 폐쇄될 수 있습니다.",
      "zh-CN": "08:00–21:00；最后入场时间为 20:40。全年开放，内部可能因维护而关闭。",
      "vi": "08:00–21:00; lượt vào cuối cùng 20:40. Mở cửa quanh năm, có thể đóng cửa để bảo trì bên trong.",
      "fr": "08h00-21h00 ; dernière entrée 20h40. Ouvert toute l'année, avec fermetures possibles pour maintenance à l'intérieur.",
      "es": "08:00–21:00; última entrada 20:40. Abierto todo el año, con posibles cierres de mantenimiento en el interior.",
    },
    admission: {
      en: 'Adult ¥1,100; school-age visitors ¥550. Re-entry is not permitted.',
      ja: '大人1,100円、小中高生550円。再入場不可。',
      th: 'ผู้ใหญ่ 1,100 เยน นักเรียน 550 เยน ออกแล้วกลับเข้าใหม่ไม่ได้',
      "ko": "성인 1,100엔, 학생 연령 방문객 550엔입니다. 재입장은 불가능합니다.",
      "zh-CN": "成人 1,100 日元；学龄游客 550 日元。不允许再次入场。",
      "vi": "Người lớn 1.100 yên; du khách trong độ tuổi đi học 550 yên. Việc vào lại không được phép.",
      "fr": "Adulte 1 100 ¥ ; visiteurs d’âge scolaire 550 ¥. Toute sortie est définitive.",
      "es": "Adulto ¥1.100; visitantes en edad escolar ¥ 550. No se permite el reingreso.",
    },
    entrance: {
      en: 'Omotemon bridge entry until 20:40; the Suimon entrance closes at 18:00.',
      ja: '表門橋は最終入場20:40、水門は18:00まで。',
      th: 'ทางสะพาน Omotemon เข้าสุดท้าย 20:40 น. ทาง Suimon ปิด 18:00 น.',
      "ko": "오모테몬 다리에서는 20:40까지 입장할 수 있습니다. 스이몬 입구는 18:00에 닫힙니다.",
      "zh-CN": "表门桥入口截止时间为 20:40；水门入口于 18:00 关闭。",
      "vi": "vào cầu Omotemon đến 20h40; lối vào Suimon đóng cửa lúc 18:00.",
      "fr": "Entrée du pont Omotemon jusqu'à 20h40 ; l'entrée Suimon ferme à 18h00.",
      "es": "Entrada al puente Omotemon hasta las 20:40; la entrada de Suimon cierra a las 18:00.",
    },
    fieldSources: {
      access: {
        source: 'https://nagasakidejima.jp/about/',
        reviewedAt: '2026-10-25',
      },
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
      "ko": "메이조선 나고야조역 7번 출구에서 약 5분 거리입니다.",
      "zh-CN": "距离名城线名古屋城站7号出口约5分钟。",
      "vi": "Khoảng năm phút từ Ga Nagoyajo, Tuyến Meijo, lối ra số 7.",
      "fr": "À environ cinq minutes de la gare de Nagoyajo, ligne Meijo, sortie 7.",
      "es": "A unos cinco minutos de la estación Nagoyajo, línea Meijo, salida 7.",
    },
    hours: {
      en: 'Usually 09:00–16:30; entry until 16:00. Closed December 29–January 1. The main keep is closed to visitors.',
      ja: '通常9:00〜16:30、入場16:00まで。12月29日〜1月1日休園。天守閣は入場不可。',
      th: 'ปกติ 09:00–16:30 น. เข้าถึง 16:00 น. ปิด 29 ธ.ค.–1 ม.ค. หอปราสาทหลักปิดไม่ให้เข้าชม',
      "ko": "보통 09:00~16:30; 16시까지 입장. 12월 29일부터 1월 1일까지 휴무. 주요 천수각은 방문객에게 개방되지 않습니다.",
      "zh-CN": "通常为 09:00–16:30；入场截止时间为 16:00。 12 月 29 日至 1 月 1 日关闭。主城堡不对游客开放。",
      "vi": "Thường là 09:00–16:30; vào cửa đến 16h. Đóng cửa từ ngày 29 tháng 12 đến ngày 1 tháng 1. Pháo đài chính không đón khách tham quan.",
      "fr": "Généralement de 9h00 à 16h30 ; entrée jusqu'à 16h00. Fermé du 29 décembre au 1er janvier. Le donjon principal est fermé aux visiteurs.",
      "es": "Generalmente de 09:00 a 16:30; Entrada hasta las 16:00 horas. Cerrado del 29 de diciembre al 1 de enero. La torre del homenaje principal está cerrada a los visitantes.",
    },
    admission: {
      en: 'Adult admission ¥1,000 from October 1, 2026. Check event exceptions.',
      ja: '2026年10月1日以降、大人1,000円。行事の例外は確認。',
      th: 'ตั้งแต่ 1 ต.ค. 2026 ผู้ใหญ่ 1,000 เยน ตรวจข้อยกเว้นช่วงกิจกรรม',
      "ko": "2026년 10월 1일부터 성인 입장료 1,000엔. 이벤트 예외 사항을 확인하세요.",
      "zh-CN": "自 2026 年 10 月 1 日起，成人门票 1,000 日元。查看活动例外情况。",
      "vi": "Vé vào cửa cho người lớn 1.000 yên từ ngày 1 tháng 10 năm 2026. Kiểm tra các trường hợp ngoại lệ của sự kiện.",
      "fr": "Entrée adulte 1 000 ¥ à partir du 1er octobre 2026. Vérifiez les exceptions aux événements.",
      "es": "Entrada para adultos ¥1000 a partir del 1 de octubre de 2026. Consultar excepciones del evento.",
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
      "ko": "오사카 지하철 다니마치 4초메역을 이용하세요. 박물관은 2번과 9번 출구 부근에 있습니다. 계단 없는 경로는 역 안내도를 확인하세요.",
      "zh-CN": "使用 Osaka Metro 谷町 4 丁目，靠近 2 号和 9 号出口。查看车站地图，了解无障碍通道。",
      "vi": "Sử dụng Osaka Metro Tanimachi 4-chome, gần lối ra 2 và 9. Kiểm tra bản đồ ga để biết lối vào không có bậc thang.",
      "fr": "Utilisez le métro d'Osaka Tanimachi 4-chome, près des sorties 2 et 9. Consultez le plan de la station pour un accès sans marche.",
      "es": "Utilice el metro de Osaka Tanimachi 4-chome, cerca de las salidas 2 y 9. Consulte el mapa de la estación para acceder sin escalones.",
    },
    hours: {
      en: '09:30–17:00; last admission 16:30. Closed Tuesdays (Wednesday after a Tuesday holiday) and December 28–January 4.',
      ja: '9:30〜17:00、入館は16:30まで。火曜休館（祝日は翌日）、12月28日〜1月4日休館。',
      th: '09:30–17:00 น. เข้ารอบสุดท้าย 16:30 น. ปิดวันอังคาร (เลื่อนไปวันพุธหากอังคารเป็นวันหยุด) และ 28 ธ.ค.–4 ม.ค.',
      "ko": "09:30~17:00; 마지막 입장 시간은 16:30입니다. 화요일(화요일 공휴일 다음 수요일), 12월 28일~1월 4일은 휴관합니다.",
      "zh-CN": "09:30–17:00；最后入场时间为 16:30。周二（周二节假日后的周三）和 12 月 28 日至 1 月 4 日闭馆。",
      "vi": "09:30–17:00; lượt vào cuối cùng là 16:30. Đóng cửa vào các ngày Thứ Ba (Thứ Tư sau ngày nghỉ Thứ Ba) và từ ngày 28 tháng 12 đến ngày 4 tháng 1.",
      "fr": "09h30-17h00 ; dernière entrée 16h30. Fermé le mardi (le mercredi après un mardi férié) et du 28 décembre au 4 janvier.",
      "es": "09:30–17:00; última entrada 16:30. Cerrado los martes (miércoles después de un martes feriado) y del 28 de diciembre al 4 de enero.",
    },
    admission: {
      en: 'Permanent exhibition: adults ¥600 at review. Check special-exhibition tickets separately.',
      ja: '確認時の常設展は大人600円。特別展の料金は別途確認。',
      th: 'ราคาที่ตรวจ: นิทรรศการถาวรผู้ใหญ่ 600 เยน โปรดตรวจตั๋วนิทรรศการพิเศษแยกต่างหาก',
      "ko": "상설전: 정보 확인 당시 어른 600엔. 특별전시 티켓은 별도로 확인하세요.",
      "zh-CN": "常设展览：成人参观时600日元。特展门票需单独核对。",
      "vi": "Triển lãm thường trực: người lớn ¥600 tại thời điểm kiểm tra thông tin. Kiểm tra vé triển lãm đặc biệt một cách riêng biệt.",
      "fr": "Exposition permanente : adultes 600 ¥ au moment de la vérification. Vérifiez séparément les billets d’exposition spéciale.",
      "es": "Exposición permanente: adultos ¥600 en la fecha de comprobación. Consulte las entradas para exposiciones especiales por separado.",
    },
    accessibility: {
      en: 'Accessible toilets on every floor and loan wheelchairs. Strollers may be restricted when galleries are crowded; a nursing room is on the first floor.',
      ja: '各階に多目的トイレ、車いす貸出あり。混雑時はベビーカー利用制限あり。授乳室は1階。',
      th: 'มีห้องน้ำรถเข็นทุกชั้นและรถเข็นให้ยืม ช่วงคนแน่นอาจจำกัดรถเข็นเด็ก มีห้องให้นมชั้นหนึ่ง',
      "ko": "모든 층에 장애인용 화장실이 있으며 휠체어도 대여 가능합니다. 갤러리가 혼잡할 경우 유모차 이용이 제한될 수 있습니다. 수유실은 1층에 있어요.",
      "zh-CN": "每层楼均设有无障碍卫生间，并提供轮椅借用服务。当画廊拥挤时，婴儿车可能会受到限制；一楼设有哺乳室。",
      "vi": "Nhà vệ sinh dành cho người khuyết tật ở mỗi tầng và cho thuê xe lăn. Xe đẩy có thể bị hạn chế khi phòng trưng bày đông đúc; một phòng cho con bú ở tầng một.",
      "fr": "Toilettes accessibles à tous les étages et prêt de fauteuils roulants. Les poussettes peuvent être restreintes lorsque les galeries sont bondées ; une salle de allaitement se trouve au niveau 1.",
      "es": "Aseos accesibles en cada planta y préstamo de sillas de ruedas. Los cochecitos pueden estar restringidos cuando las galerías estén abarrotadas; una sala de lactancia está en el primer piso.",
    },
    booking: {
      en: 'For group visits, the museum asks visitors to submit a group application by mail or fax. Check the separate arrangements for special exhibitions.',
      ja: '団体見学は申込書を郵送またはFAXで提出するよう博物館が案内しています。特別展の取扱いは別途確認してください。',
      th: 'พิพิธภัณฑ์ขอให้ผู้เข้าชมเป็นกลุ่มส่งแบบฟอร์มทางไปรษณีย์หรือแฟกซ์ โปรดตรวจเงื่อนไขนิทรรศการพิเศษแยกต่างหาก',
      "ko": "단체 관람은 우편이나 팩스로 단체 신청서를 제출하도록 안내하고 있습니다. 특별전의 별도 이용 조건도 확인하세요.",
      "zh-CN": "对于团体参观，博物馆要求参观者通过邮寄或传真提交团体申请。查看专题展览的单独安排。",
      "vi": "Đối với các chuyến tham quan theo nhóm, bảo tàng yêu cầu du khách nộp đơn đăng ký theo nhóm qua đường bưu điện hoặc fax. Kiểm tra các sắp xếp riêng biệt cho các cuộc triển lãm đặc biệt.",
      "fr": "Pour les visites de groupe, le musée demande aux visiteurs de déposer une demande de groupe par courrier ou par fax. Vérifiez les dispositions distinctes pour les expositions spéciales.",
      "es": "Para visitas grupales, el museo solicita a los visitantes que envíen una solicitud grupal por correo o fax. Consulte los arreglos separados para exposiciones especiales.",
    },
    fieldSources: {
      booking: {
        source: 'https://www.osakamushis.jp/eng/about/faq.html',
        reviewedAt: '2026-10-30',
      },
      accessibility: {
        source: 'https://www.osakamushis.jp/eng/about/faq.html',
        reviewedAt: '2026-10-26',
      },
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
      "ko": "JR 삿포로역 북쪽 출구에서 도보 약 10분, 대학 캠퍼스 내. 대중교통을 이용하세요.",
      "zh-CN": "从JR札幌站北口步行约10分钟，大学校园内。使用公共交通工具。",
      "vi": "Khoảng 10 phút đi bộ từ lối ra phía bắc của Ga JR Sapporo, bên trong khuôn viên trường đại học. Sử dụng phương tiện giao thông công cộng.",
      "fr": "À environ 10 minutes à pied de la sortie nord de la gare JR Sapporo, à l'intérieur du campus universitaire. Utilisez les transports en commun.",
      "es": "A unos 10 minutos a pie desde la salida norte de la estación JR Sapporo, dentro del campus universitario. Utilice el transporte público.",
    },
    hours: {
      en: '10:00–17:00. Closed Mondays and December 28–January 4; holiday Mondays move the closure to the following weekday. Check event exceptions.',
      ja: '10:00〜17:00。月曜、12月28日〜1月4日休館。月曜祝日は翌平日が休館。行事による変更を確認。',
      th: '10:00–17:00 น. ปิดจันทร์และ 28 ธ.ค.–4 ม.ค. หากจันทร์เป็นวันหยุดจะเลื่อนปิดไปวันทำการถัดไป ตรวจข้อยกเว้นจากกิจกรรมด้วย',
      "ko": "10:00~17:00. 월요일과 12월 28일~1월 4일은 휴무입니다. 공휴일인 월요일은 휴무일을 다음 평일로 옮깁니다. 이벤트 예외를 확인하세요.",
      "zh-CN": "10:00–17:00。周一和 12 月 28 日至 1 月 4 日闭馆；周一假期则将关闭时间移至下一个工作日。检查活动期间的例外安排。",
      "vi": "10:00–17:00. Đóng cửa vào thứ Hai và ngày 28 tháng 12 đến ngày 4 tháng 1; ngày thứ Hai nghỉ lễ sẽ đóng cửa sang ngày trong tuần tiếp theo. Kiểm tra ngoại lệ sự kiện.",
      "fr": "10h00-17h00. Fermé le lundi et du 28 décembre au 4 janvier ; les lundis fériés déplacent la fermeture au jour de la semaine suivant. Vérifiez les exceptions d'événements.",
      "es": "10:00–17:00. Cerrado los lunes y del 28 de diciembre al 4 de enero; los lunes festivos se traslada el cierre al siguiente día laborable. Verifique las excepciones de eventos.",
    },
    admission: {
      en: 'Free admission at review.',
      ja: '確認時は入館無料。',
      th: 'ไม่เสียค่าเข้าชม ณ วันที่ตรวจสอบ',
      "ko": "정보 확인 당시 무료입장이 가능합니다.",
      "zh-CN": "信息核查时免费入场。",
      "vi": "Vào cửa miễn phí tại thời điểm kiểm tra thông tin.",
      "fr": "Entrée gratuite au moment de la vérification.",
      "es": "Entrada gratuita en la fecha de comprobación.",
    },
    accessibility: {
      en: 'Use the intercom before using the wheelchair lift. Loan wheelchairs/strollers at first-floor reception; accessible toilets on floors 1 and 2.',
      ja: '車いす用リフトはインターホンで連絡。1階受付で車いす・ベビーカー貸出。多目的トイレは1・2階。',
      th: 'ใช้อินเตอร์คอมก่อนใช้ลิฟต์รถเข็น ยืมรถเข็นหรือรถเข็นเด็กที่เคาน์เตอร์ชั้นหนึ่ง มีห้องน้ำรถเข็นชั้น 1 และ 2',
      "ko": "휠체어 리프트를 이용하기 전에 인터콤으로 연락하세요. 1층 안내 데스크에서 휠체어와 유모차를 빌릴 수 있습니다. 장애인용 화장실은 1층과 2층에 있습니다.",
      "zh-CN": "使用轮椅升降机之前使用对讲机。可在一楼接待处借用轮椅/婴儿车；无障碍卫生间位于 1 楼和 2 楼。",
      "vi": "Sử dụng hệ thống liên lạc nội bộ trước khi sử dụng thang máy dành cho xe lăn. Cho mượn xe lăn/xe đẩy tại lễ tân tầng 1; nhà vệ sinh thuận tiện ở tầng 1 và 2.",
      "fr": "Utilisez l’interphone avant d’utiliser l’élévateur pour fauteuil roulant. Prêt de fauteuils roulants/poussettes à la réception du niveau 1 ; toilettes accessibles aux étages 1 et 2.",
      "es": "Utilice el intercomunicador antes de utilizar el elevador de sillas de ruedas. Préstamo de sillas de ruedas/cochecitos en la recepción del primer piso; Aseos accesibles en plantas 1 y 2.",
    },
    booking: {
      en: 'Advance reservation is not required for a regular visit.',
      ja: '通常の見学は事前予約不要。',
      th: 'การเข้าชมปกติไม่ต้องจองล่วงหน้า',
      "ko": "일반 관람은 사전 예약이 필요하지 않습니다.",
      "zh-CN": "一般参观无需提前预约。",
      "vi": "Tham quan thông thường không cần đặt trước.",
      "fr": "Il n'est pas nécessaire de réserver à l'avance pour une visite régulière.",
      "es": "No se requiere reserva previa para una visita regular.",
    },
    fieldSources: {
      booking: {
        source: 'https://www.museum.hokudai.ac.jp/english/visit/',
        reviewedAt: '2026-10-26',
      },
      accessibility: {
        source: 'https://www.museum.hokudai.ac.jp/english/visit/',
        reviewedAt: '2026-10-26',
      },
    },
  },
  'fuji-center': {
    source: 'https://www.fujisan-whc.jp/en/guide/index.html',
    reviewedAt: '2026-10-24',
    access: {
      en: 'From Kawaguchiko Station, the operator lists a sightseeing bus to Prefectural Fuji Visitor Center Entrance (about five minutes). Confirm the current stop name and departures with Fujikyu Bus.',
      ja: '河口湖駅から周遊バスで県立富士ビジターセンター入口へ約5分の案内。現在の停留所名と発車時刻は富士急バスで確認。',
      th: 'จากสถานี Kawaguchiko เว็บไซต์ศูนย์ระบุบัสเที่ยวชมไป Prefectural Fuji Visitor Center Entrance ประมาณ 5 นาที ตรวจชื่อป้ายและเวลาเดินรถล่าสุดกับ Fujikyu Bus',
      "ko": "가와구치코역에서 현립 후지 방문자 센터 입구까지 가는 관광버스가 안내되어 있으며 약 5분 걸립니다. 현재 정류장 이름과 출발 시간은 후지큐 버스에 확인하세요.",
      "zh-CN": "从河口湖站出发，运营商列出了前往县立富士游客中心入口的观光巴士（约 5 分钟）。与富士急行巴士确认当前的车站名称和发车时间。",
      "vi": "Theo đơn vị vận hành, từ Ga Kawaguchiko có xe buýt tham quan đến trạm Prefectural Fuji Visitor Center Entrance, khoảng 5 phút. Hãy xác nhận tên trạm và giờ khởi hành hiện tại với Fujikyu Bus.",
      "fr": "Depuis la gare de Kawaguchiko, l'opérateur propose un bus touristique jusqu'à l'entrée du centre d'accueil préfectoral de Fuji (environ cinq minutes). Confirmez le nom de l’arrêt actuel et les départs auprès de Fujikyu Bus.",
      "es": "Desde la estación Kawaguchiko, el operador ofrece un autobús turístico hasta la entrada del Centro de Visitantes de la Prefectura de Fuji (unos cinco minutos). Confirme el nombre de la parada actual y las salidas con Fujikyu Bus.",
    },
    minutes: 90,
    hours: {
      en: 'Usually 09:00–17:00; July–August 08:30–18:00 and December–February 09:00–16:30. Last admission is 30 minutes before closing; check closure notices.',
      ja: '通常9:00〜17:00。7〜8月は8:30〜18:00、12〜2月は9:00〜16:30。入館は閉館30分前まで。休館案内も確認。',
      th: 'ปกติ 09:00–17:00 น. ก.ค.–ส.ค. 08:30–18:00 น. และ ธ.ค.–ก.พ. 09:00–16:30 น. เข้าชมได้ก่อนปิด 30 นาที โปรดตรวจประกาศวันปิดด้วย',
      "ko": "보통 09:00~17:00; 7월~8월 08:30~18:00, 12월~2월 09:00~16:30. 마지막 입장은 폐관 30분 전입니다. 폐쇄 공지를 확인하세요.",
      "zh-CN": "通常为 09:00–17:00； 7 月至 8 月 08:30–18:00，12 月至 2 月 09:00–16:30。最后入场时间为闭馆前 30 分钟；检查关闭通知。",
      "vi": "Thường là 09:00–17:00; Tháng 7–Tháng 8 08:30–18:00 và Tháng 12–Tháng 2 09:00–16:30. Lần vào cửa cuối cùng là 30 phút trước khi đóng cửa; kiểm tra thông báo đóng cửa.",
      "fr": "Généralement de 9h00 à 17h00 ; Juillet-août de 8h30 à 18h00 et décembre-février de 9h00 à 16h30. La dernière admission s'effectue 30 minutes avant la fermeture ; vérifier les avis de fermeture.",
      "es": "Generalmente de 09:00 a 17:00; Julio-agosto de 08:30 a 18:00 y diciembre-febrero de 09:00 a 16:30. La última admisión es 30 minutos antes del cierre; consultar avisos de cierre.",
    },
    fieldSources: {
      access: {
        source: 'https://www.fujisan-whc.jp/en/access/index.html',
        reviewedAt: '2026-10-25',
      },
    },
  },
  kiyomizu: {
    source: 'https://www.kiyomizudera.or.jp/en/location/',
    reviewedAt: '2026-10-24',
    minutes: 120,
    approach: {
      source: 'https://www.kiyomizudera.or.jp/access.php',
      label: {
        en: 'Temple approach guide',
        ja: '寺院の参道案内',
        th: 'คู่มือเส้นทางเข้าของวัด',
        "ko": "사찰 접근 안내",
        "zh-CN": "寺庙参观指南",
        "vi": "Hướng dẫn vào chùa",
        "fr": "Guide d'approche du temple",
        "es": "Guía de aproximación al templo.",
      },
      note: {
        en: 'The temple identifies the Kiyomizu-zaka/Nio-mon and Chawan-zaka/emergency-road approaches. A map app may suggest a route that does not enter the grounds.',
        ja: '清水坂・仁王門と茶わん坂・防災道路からの2経路を寺院が案内しています。地図アプリでは境内に入れない経路が表示される場合があります。',
        th: 'วัดระบุเส้นทาง Kiyomizu-zaka/ประตู Nio-mon และ Chawan-zaka/ถนนฉุกเฉิน แอปแผนที่อาจแนะนำเส้นทางที่เข้าบริเวณวัดไม่ได้',
        "ko": "사찰은 기요미즈자카/니오몬 경로와 차완자카/비상도로 경로를 안내합니다. 지도 앱이 경내로 들어갈 수 없는 길을 제안할 수 있습니다.",
        "zh-CN": "寺庙标出了清水坂/仁王门和茶碗坂/紧急道路的引道。地图应用程序可能会建议一条不进入场地的路线。",
        "vi": "Ngôi chùa xác định các phương pháp tiếp cận Kiyomizu-zaka/Nio-mon và Chawan-zaka/đường khẩn cấp. Ứng dụng bản đồ có thể đề xuất tuyến đường không đi vào khu đất.",
        "fr": "Le temple identifie les approches Kiyomizu-zaka/Nio-mon et Chawan-zaka/route d'urgence. Une application cartographique peut suggérer un itinéraire qui ne pénètre pas dans le terrain.",
        "es": "El templo identifica los accesos Kiyomizu-zaka/Nio-mon y Chawan-zaka/carretera de emergencia. Una aplicación de mapas puede sugerir una ruta que no ingrese al terreno.",
      },
    },
    access: {
      en: 'Allow about 25 minutes on foot from Keihan Kiyomizu-Gojo. The temple lists only two approaches: Kiyomizu-zaka to Nio-mon, or Chawan-zaka to the emergency road entrance. Map apps may suggest routes that do not enter the grounds.',
      ja: '京阪清水五条駅から徒歩約25分。境内への経路は清水坂を上り仁王門前から入る道と、茶わん坂を上り防災道路から入る道の2つのみです。地図アプリが入山できない経路を示す場合があります。',
      th: 'จาก Keihan Kiyomizu-Gojo เดินประมาณ 25 นาที วัดระบุทางเข้าเพียง 2 ทาง: ขึ้น Kiyomizu-zaka ไปประตู Nio-mon หรือขึ้น Chawan-zaka ไปทางเข้าถนนฉุกเฉิน แอปแผนที่อาจแนะนำเส้นทางที่เข้าบริเวณวัดไม่ได้',
      "ko": "게이한 기요미즈고조에서 도보로 약 25분 소요됩니다. 사원에는 기요미즈자카에서 인왕문으로 가는 길과 차완자카에서 비상도로 입구로 가는 두 가지 접근 방법만 나와 있습니다. 지도 앱은 경내로 들어가지 않는 경로를 제안할 수 있습니다.",
      "zh-CN": "从京阪清水五条步行约25分钟。寺庙只列出了两条通道：从清水坂到仁王门，或者从茶碗坂到紧急道路入口。地图应用程序可能会建议不进入场地的路线。",
      "vi": "Mất khoảng 25 phút đi bộ từ Keihan Kiyomizu-Gojo. Ngôi chùa chỉ liệt kê hai lối đi: Kiyomizu-zaka đến Nio-mon, hoặc Chawan-zaka đến lối vào đường khẩn cấp. Ứng dụng bản đồ có thể đề xuất các tuyến đường không đi vào khu đất.",
      "fr": "Compter environ 25 minutes à pied depuis Keihan Kiyomizu-Gojo. Le temple ne répertorie que deux approches : Kiyomizu-zaka vers Nio-mon, ou Chawan-zaka vers l'entrée de la route de secours. Les applications cartographiques peuvent suggérer des itinéraires qui n’entrent pas dans le domaine.",
      "es": "Calcula unos 25 minutos a pie desde Keihan Kiyomizu-Gojo. El templo enumera sólo dos accesos: Kiyomizu-zaka a Nio-mon, o Chawan-zaka a la entrada de emergencia de la carretera. Las aplicaciones de mapas pueden sugerir rutas que no ingresan al terreno.",
    },
    hours: {
      en: '2026: opens 06:00. Normally closes 18:00; July–August closes 18:30 except night viewings. Night viewings March 27–April 5, August 14–16 and November 21–30 close 21:30, last entry 21:00. Check the temple calendar for other years.',
      ja: '2026年は6:00開門。通常18:00閉門、7〜8月は18:30（夜間特別拝観を除く）。夜間は3/27〜4/5・8/14〜16・11/21〜30に21:30閉門、21:00受付終了。他年は公式日程を確認。',
      th: 'ปี 2026 เปิด 06:00 น. ปกติปิด 18:00 น. ก.ค.–ส.ค. ปิด 18:30 น. ยกเว้นช่วงกลางคืน วันที่ 27 มี.ค.–5 เม.ย., 14–16 ส.ค. และ 21–30 พ.ย. ปิด 21:30 น. รับเข้าถึง 21:00 น. ปีอื่นตรวจปฏิทินวัด',
      "ko": "2026년에는 06:00에 문을 엽니다. 보통 18:00에 닫으며, 7~8월은 야간 관람일을 제외하고 18:30에 닫습니다. 야간 관람일인 3월 27일~4월 5일, 8월 14~16일, 11월 21~30일에는 21:30에 닫으며 마지막 입장은 21:00입니다. 다른 연도는 사찰 운영 일정을 확인하세요.",
      "zh-CN": "2026 年：06:00 开放。一般18:00关门； 7 月至 8 月除夜间观赏外于 18:30 关闭。 3月27日至4月5日、8月14日至16日和11月21日至30日夜间观赏截止时间为21:30，最后入场时间为21:00。检查寺庙日历以了解其他年份。",
      "vi": "2026: mở cửa lúc 06:00. Thường đóng cửa lúc 18:00; Tháng 7-tháng 8 đóng cửa lúc 18:30 trừ việc xem ban đêm. Xem đêm từ ngày 27 tháng 3 đến ngày 5 tháng 4, ngày 14 đến ngày 16 tháng 8 và ngày 21 đến ngày 30 tháng 11 đóng cửa lúc 21:30, lượt vào cuối cùng là 21:00. Kiểm tra lịch chùa cho những năm khác.",
      "fr": "2026 : ouvre à 06h00. Ferme normalement à 18h00 ; Juillet-août, fermeture à 18h30 sauf visites nocturnes. Visites nocturnes du 27 mars au 5 avril, du 14 au 16 août et du 21 au 30 novembre, fermeture à 21h30, dernière entrée à 21h00. Consultez le calendrier du temple pour les autres années.",
      "es": "2026: abre a las 06:00. Normalmente cierra a las 18:00; Julio-agosto cierra a las 18:30, excepto visitas nocturnas. Las visitas nocturnas del 27 de marzo al 5 de abril, del 14 al 16 de agosto y del 21 al 30 de noviembre cierran a las 21:30, última entrada a las 21:00. Consulte el calendario del templo para conocer otros años.",
    },
    admission: {
      en: 'No group discount. The temple lists free entry for a disability-handbook holder and one companion on presenting the original. Confirm accepted documents and the regular admission price with the temple.',
      ja: '団体割引はありません。障がい者手帳・療育手帳の原本提示で本人と付添1名は無料。通常の拝観料と手帳の適用条件は寺院に確認してください。',
      th: 'ไม่มีส่วนลดหมู่คณะ วัดระบุว่ายกเว้นค่าเข้าให้ผู้แสดงสมุดประจำตัวผู้พิการฉบับจริงและผู้ติดตาม 1 คน สอบถามวัดเรื่องเอกสารที่รับและค่าเข้าปกติ',
      "ko": "단체 할인은 없습니다. 장애인 수첩 원본을 제시하면 소지자와 동반자 1명이 무료로 입장할 수 있다고 안내되어 있습니다. 인정되는 서류와 일반 입장료는 사찰에 확인하세요.",
      "zh-CN": "无团体优惠。寺方说明：残疾人手册持有人出示原件时，本人及一名陪同者可免费入场。请向寺方确认认可的证件和普通票价。",
      "vi": "Không giảm giá theo nhóm. Ngôi chùa liệt kê quyền vào cửa miễn phí cho người giữ sổ tay khuyết tật và một người đi cùng xuất trình bản gốc. Xác nhận các giấy tờ đã được chấp nhận và giá vào cửa thông thường với chùa.",
      "fr": "Pas de réduction de groupe. Le temple propose une entrée gratuite pour un détenteur du manuel du handicap et un accompagnateur sur présentation de l'original. Confirmez les documents acceptés et le prix d'entrée régulier auprès du temple.",
      "es": "Sin descuento para grupos. El templo ofrece entrada gratuita para el titular de un certificado de discapacidad y un acompañante al presentar el original. Confirme los documentos aceptados y el precio de entrada regular con el templo.",
    },
    booking: {
      en: 'No reservation is needed for the 2026 special night viewings. For ordinary visits and other events, confirm the current requirements with the temple.',
      ja: '2026年の夜間特別拝観は予約不要です。通常拝観やその他の行事の条件は寺院に確認してください。',
      th: 'การเข้าชมกลางคืนพิเศษปี 2026 ไม่ต้องจอง สำหรับการเข้าชมปกติและกิจกรรมอื่น โปรดตรวจเงื่อนไขปัจจุบันกับวัด',
      "ko": "2026년 특별야경은 예약이 필요하지 않습니다. 일반 방문 및 기타 행사의 경우 현재 요구 사항을 사찰에 확인하세요.",
      "zh-CN": "2026年特别夜间观赏无需预约。对于普通参观和其他活动，请与寺庙确认当前要求。",
      "vi": "Không cần đặt trước cho buổi xem đêm đặc biệt năm 2026. Đối với các chuyến viếng thăm thông thường và các sự kiện khác, hãy xác nhận các yêu cầu hiện tại với ngôi chùa.",
      "fr": "Aucune réservation n'est nécessaire pour les visites nocturnes spéciales 2026. Pour les visites ordinaires et autres événements, confirmer les exigences en vigueur auprès du temple.",
      "es": "No es necesario reservar para las visitas nocturnas especiales de 2026. Para visitas ordinarias y otros eventos, confirmar con el templo los requisitos vigentes.",
    },
    accessibility: {
      en: 'Follow the temple’s wheelchair route; accessible toilets are provided. Wheelchairs cannot be borrowed at the temple.',
      ja: '寺院の車いす用経路図に従ってください。多目的トイレあり。車いすの貸出はありません。',
      th: 'ใช้แผนที่เส้นทางรถเข็นของวัด มีห้องน้ำรองรับรถเข็น แต่ไม่มีรถเข็นให้ยืม',
      "ko": "사원의 휠체어 경로를 따라가세요. 접근 가능한 화장실이 제공됩니다. 사찰에서는 휠체어를 빌릴 수 없습니다.",
      "zh-CN": "沿着寺庙的轮椅路线行驶；提供无障碍厕所。寺庙内不能借用轮椅。",
      "vi": "Đi theo con đường dành cho xe lăn của ngôi chùa; nhà vệ sinh dễ tiếp cận được cung cấp. Xe lăn không được mượn ở chùa.",
      "fr": "Suivez l’itinéraire du temple en fauteuil roulant ; des toilettes accessibles sont prévues. Les fauteuils roulants ne peuvent pas être empruntés au temple.",
      "es": "Siga la ruta para sillas de ruedas del templo; Se proporcionan baños accesibles. No se pueden prestar sillas de ruedas en el templo.",
    },
    entrance: {
      en: 'For a step-free approach, consult the route via the emergency entrance at the top of Chawan-zaka. The Main Hall route map is available at Todoroki-mon.',
      ja: '段差を避ける場合は茶わん坂上の緊急車両用入口を通る経路を確認。本堂入口の轟門で経路図を入手。',
      th: 'หากต้องการเลี่ยงบันได ตรวจเส้นทางผ่านทางเข้ารถฉุกเฉินด้านบน Chawan-zaka รับแผนที่ทางสู่วิหารหลักที่ Todoroki-mon',
      "ko": "계단 없는 접근 경로는 차완자카 상단의 비상 출입구를 지나는 경로를 참고하세요. 본당 이동 안내도는 토도로키몬에서 볼 수 있습니다.",
      "zh-CN": "如需无障碍通道，请通过 Chawan-zaka 顶部的紧急入口查阅路线。大雄宝殿路线图可在轰门获取。",
      "vi": "Để tiếp cận không có bậc thang, hãy tham khảo lộ trình qua lối vào khẩn cấp trên đỉnh Chawan-zaka. Bản đồ lộ trình của Main Hall có sẵn tại Todoroki-mon.",
      "fr": "Pour une approche sans marche, consultez l'itinéraire via l'entrée de secours au sommet de Chawan-zaka. La carte du parcours du hall principal est disponible à Todoroki-mon.",
      "es": "Para acceder sin escalones, consulte la ruta a través de la entrada de emergencia en la cima de Chawan-zaka. El mapa de ruta del Salón Principal está disponible en Todoroki-mon.",
    },
    fieldSources: {
      access: {
        source: 'https://www.kiyomizudera.or.jp/access.php',
        reviewedAt: '2026-10-31',
      },
      hours: {
        source: 'https://www.kiyomizudera.or.jp/access.php',
        reviewedAt: '2026-11-03',
      },
      admission: {
        source: 'https://www.kiyomizudera.or.jp/faq/',
        reviewedAt: '2026-10-31',
      },
      booking: {
        source: 'https://www.kiyomizudera.or.jp/event/yakan.php',
        reviewedAt: '2026-10-30',
        validThrough: '2026-11-30',
        applicablePeriods: [
          { from: '2026-03-27', through: '2026-04-05' },
          { from: '2026-08-14', through: '2026-08-16' },
          { from: '2026-11-21', through: '2026-11-30' },
        ],
      },
      entrance: {
        source: 'https://www.kiyomizudera.or.jp/en/faq/',
        reviewedAt: '2026-10-26',
      },
      accessibility: {
        source: 'https://www.kiyomizudera.or.jp/en/faq/',
        reviewedAt: '2026-10-26',
      },
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
      "ko": "JR 우에노 또는 우구이스다니에서 도보 약 10분. 메인 게이트를 통해 입장하세요.",
      "zh-CN": "从JR上野或莺谷步行约10分钟。从正门进入。",
      "vi": "Khoảng 10 phút đi bộ từ JR Ueno hoặc Uguisudani. Vào qua Cổng Chính.",
      "fr": "A environ 10 minutes à pied de JR Ueno ou Uguisudani. Entrez par la porte principale.",
      "es": "A unos 10 minutos a pie de JR Ueno o Uguisudani. Ingrese por la puerta principal.",
    },
    hours: {
      en: '09:30–17:00; extended evenings on the official calendar. Last entry 30 minutes before closing. Mondays normally closed; holiday exceptions apply.',
      ja: '9:30〜17:00。延長開館は公式カレンダーを確認。入館は閉館30分前まで。原則月曜休館、祝日は例外あり。',
      th: '09:30–17:00 น. วันเปิดค่ำให้ดูปฏิทินทางการ เข้าก่อนปิด 30 นาที ปกติปิดจันทร์โดยมีข้อยกเว้นวันหยุด',
      "ko": "09:30~17:00에 운영하며 야간 연장일은 공식 운영 일정에 나와 있습니다. 마지막 입장은 폐관 30분 전입니다. 보통 월요일에 쉬지만 공휴일에는 예외가 있습니다.",
      "zh-CN": "09:30–17:00；官方日历上延长的夜晚。最后入场时间为关门前 30 分钟。周一正常休息；节假日例外。",
      "vi": "09:30–17:00; buổi tối kéo dài theo lịch chính thức. Lần vào cuối cùng là 30 phút trước khi đóng cửa. Thứ Hai thường đóng cửa; áp dụng ngoại lệ ngày lễ.",
      "fr": "09h30-17h00 ; soirées prolongées au calendrier officiel. Dernière entrée 30 minutes avant la fermeture. Les lundis normalement fermés ; des exceptions pour les jours fériés s'appliquent.",
      "es": "09:30–17:00; Tardes extendidas en el calendario oficial. Última entrada 30 minutos antes del cierre. Los lunes normalmente cerrado; Se aplican excepciones de vacaciones.",
    },
    admission: {
      en: 'Collection: adults ¥1,000, university students ¥500. Special exhibitions are priced separately; check ID and concession rules.',
      ja: '総合文化展：一般1,000円、大学生500円。特別展は別料金。学生証・減免条件を確認。',
      th: 'นิทรรศการประจำ: ผู้ใหญ่ 1,000 เยน นักศึกษามหาวิทยาลัย 500 เยน นิทรรศการพิเศษต่างราคา ตรวจหลักฐานและเงื่อนไขส่วนลด',
      "ko": "소장품: 어른 1,000엔, 대학생 500엔. 특별전시 가격은 별도로 책정됩니다. ID와 할인 규정을 확인하세요.",
      "zh-CN": "常设展：成人1,000日元，大学生500日元。特别展另行收费；请确认所需证件和优惠条件。",
      "vi": "Bộ sưu tập: người lớn 1.000 yên, sinh viên đại học 500 yên. Triển lãm đặc biệt được định giá riêng; kiểm tra ID và điều kiện giảm giá.",
      "fr": "Collection permanente : adultes 1 000 ¥, étudiants 500 ¥. Les expositions temporaires ont des tarifs distincts ; vérifiez les justificatifs et les conditions de réduction.",
      "es": "Colección permanente: adultos 1.000 ¥, estudiantes universitarios 500 ¥. Las exposiciones temporales tienen entradas aparte; consulte los documentos exigidos y las condiciones de descuento.",
    },
    booking: {
      en: 'Collection tickets are available online, valid for two months during opening hours. Check special-exhibition ticket conditions separately.',
      ja: '総合文化展のオンライン券は購入から2か月間、開館時間内に有効。特別展の条件は別途確認。',
      th: 'ตั๋วนิทรรศการประจำซื้อออนไลน์ได้ ใช้ภายในสองเดือนในเวลาเปิด ตรวจเงื่อนไขนิทรรศการพิเศษแยกต่างหาก',
      "ko": "컬렉션 티켓은 온라인으로 구매 가능하며 영업시간 중 2개월 동안 유효합니다. 특별전시 티켓 조건을 별도로 확인하세요.",
      "zh-CN": "常设展门票可在网上购买，开放时间内有效期为两个月。单独检查特别展览门票条件。",
      "vi": "Vé triển lãm thường trực bán trực tuyến và có giá trị trong giờ mở cửa trong 2 tháng. Kiểm tra riêng điều kiện vé triển lãm đặc biệt.",
      "fr": "Les billets de la collection permanente sont disponibles en ligne, valables deux mois pendant les heures d'ouverture. Vérifiez séparément les conditions des billets pour les expositions spéciales.",
      "es": "Las entradas para la colección permanente se venden en línea y son válidas durante dos meses dentro del horario de apertura. Consulte por separado las condiciones de las exposiciones temporales.",
    },
    entrance: {
      en: 'Use the Main Gate; consult the museum’s entrance access map.',
      ja: '正門を利用。公式の入口周辺バリアフリー図を確認。',
      th: 'ใช้ประตูหลัก Main Gate และตรวจแผนที่ทางเข้าของพิพิธภัณฑ์',
      "ko": "정문을 이용하세요. 박물관 입구 접근 지도를 참고하세요.",
      "zh-CN": "使用正门；请查阅博物馆的入口访问地图。",
      "vi": "Sử dụng Cổng chính; tham khảo bản đồ lối vào bảo tàng.",
      "fr": "Utilisez la porte principale ; consulter le plan d’accès à l’entrée du musée.",
      "es": "Utilice la puerta principal; consultar el mapa de acceso a la entrada del museo.",
    },
    accessibility: {
      en: 'Accessible toilets in exhibition buildings except Hyokeikan. Some entrances have steep ramps; ask staff for assistance. Wheelchair loans are available.',
      ja: '表慶館以外の展示館に多目的トイレ。一部入口は急勾配のため職員に相談。車いす貸出あり。',
      th: 'อาคารจัดแสดงมีห้องน้ำรถเข็นยกเว้น Hyokeikan บางทางเข้ามีทางลาดชัน ขอความช่วยเหลือเจ้าหน้าที่ได้ มีรถเข็นให้ยืม',
      "ko": "효케이칸을 제외한 전시관에 장애인용 화장실이 있습니다. 일부 입구에는 가파른 경사로가 있으므로 직원에게 도움을 요청하세요. 휠체어 대여도 가능합니다.",
      "zh-CN": "除表庆馆外，展览馆内设有无障碍厕所。一些入口有陡峭的坡道；向工作人员寻求帮助。提供轮椅借用服务。",
      "vi": "Nhà vệ sinh dành cho người khuyết tật trong các tòa nhà triển lãm ngoại trừ Hyokeikan. Một số lối vào có đường dốc; yêu cầu nhân viên giúp đỡ. Có sẵn dịch vụ cho mượn xe lăn.",
      "fr": "Toilettes accessibles dans les bâtiments d'exposition sauf Hyokeikan. Certaines entrées ont des rampes raides ; demandez de l’aide au personnel. Des prêts de fauteuils roulants sont disponibles.",
      "es": "Baños accesibles en edificios de exhibición excepto Hyokeikan. Algunas entradas tienen rampas empinadas; pida ayuda al personal. Préstamos para sillas de ruedas están disponibles.",
    },
    fieldSources: {
      hours: {
        source:
          'https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en',
        reviewedAt: '2026-10-26',
      },
      admission: {
        source:
          'https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en',
        reviewedAt: '2026-10-26',
      },
      booking: {
        source:
          'https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en',
        reviewedAt: '2026-10-26',
      },
      entrance: {
        source: 'https://www.tnm.jp/modules/r_free_page/index.php?id=128',
        reviewedAt: '2026-10-26',
      },
      accessibility: {
        source: 'https://www.tnm.jp/modules/r_free_page/index.php?id=128',
        reviewedAt: '2026-10-26',
      },
    },
  },
  'kyoto-museum': {
    source: 'https://www.kyohaku.go.jp/eng/visit/access/',
    infoSource: 'https://www.kyohaku.go.jp/eng/visit/info/',
    reviewedAt: '2026-10-24',
    minutes: 120,
    approach: {
      source: 'https://www.kyohaku.go.jp/jp/assets/visit/access/bus-map.pdf',
      label: {
        en: 'Bus-arrival map (PDF)',
        ja: 'バス乗降案内図（PDF）',
        th: 'แผนผังจุดรับส่งรถบัส (PDF)',
        "ko": "버스 도착 지도(PDF)",
        "zh-CN": "巴士到达地图 (PDF)",
        "vi": "Bản đồ xe buýt đến (PDF)",
        "fr": "Plan d'arrivée des bus (PDF)",
        "es": "Mapa de llegada de autobuses (PDF)",
      },
      note: {
        en: 'For bus arrivals: visitors cannot enter at the West Gate and must continue on foot to the South Gate. This map does not verify a station-to-gate step-free route.',
        ja: 'バス乗降時の案内です。西門からは入館できず、南門まで徒歩で移動します。駅から南門までの段差のない経路を確認した地図ではありません。',
        th: 'สำหรับผู้มาทางรถบัส: เข้าทาง West Gate ไม่ได้ ต้องเดินต่อไป South Gate แผนผังนี้ไม่ได้ยืนยันเส้นทางไร้ขั้นบันไดจากสถานีถึงประตู',
        "ko": "버스로 오는 경우 서문으로 입장할 수 없으며 남문까지 걸어가야 합니다. 이 지도만으로 역에서 남문까지 계단 없이 이동할 수 있는지는 확인할 수 없습니다.",
        "zh-CN": "巴士抵达：游客无法从西门进入，必须继续步行至南门。此地图尚未确认从车站到出入口的无台阶路线。",
        "vi": "Đối với xe buýt đến: du khách không thể vào cổng phía Tây và phải đi bộ đến Cổng phía Nam. Bản đồ này không xác minh lộ trình không có bậc thang từ trạm đến cổng.",
        "fr": "Si vous arrivez en bus, l’accès visiteurs n’est pas possible par la porte ouest : continuez à pied jusqu’à la porte sud. Ce plan ne confirme pas un trajet sans marches depuis la gare jusqu’à cette entrée.",
        "es": "Si llega en autobús, no podrá entrar por la puerta oeste y deberá continuar a pie hasta la puerta sur. Este mapa no confirma una ruta sin escalones entre la estación y dicha entrada.",
      },
    },
    access: {
      en: 'Walk east along Shichijo Street for about seven minutes from Keihan Shichijo Station.',
      ja: '京阪七条駅から七条通を東へ徒歩約7分。',
      th: 'จากสถานีเคฮัง Shichijo เดินไปทางตะวันออกตามถนน Shichijo ประมาณ 7 นาที',
      "ko": "게이한 시치조역에서 시치조 거리를 따라 동쪽으로 약 7분 정도 걸어가세요.",
      "zh-CN": "从京阪七条站沿七条街向东步行约7分钟。",
      "vi": "Đi bộ về phía đông dọc theo Phố Shichijo từ Ga Keihan Shichijo khoảng bảy phút.",
      "fr": "Marchez vers l'est le long de la rue Shichijo pendant environ sept minutes depuis la gare de Keihan Shichijo.",
      "es": "Camine hacia el este por la calle Shichijo durante unos siete minutos desde la estación Keihan Shichijo.",
    },
    hours: {
      en: 'Genji (October 6–November 29, 2026): 09:00–17:30, last entry 17:00. Collection/garden-only days: 09:30–17:00, last entry 16:30. Fridays: all close 20:00, last entry 19:30. Normally closed Mondays (holiday: following day), plus December 28, 2026–January 1, 2027. December 1–20, 2026 is garden-only: galleries closed. Collection resumes December 22; check the calendar.',
      ja: '特別展「源氏物語」（2026/10/6〜11/29）は9:00〜17:30、最終入館17:00。名品ギャラリー・庭園のみは9:30〜17:00、最終16:30。金曜はいずれも20:00まで、最終19:30。原則月曜休館（祝日は翌日）、2026/12/28〜2027/1/1休館。2026/12/1〜20は庭園のみで展示室休止。名品ギャラリーは12/22再開。公式カレンダーも確認。',
      th: 'Genji วันที่ 6 ต.ค.–29 พ.ย. 2026 เปิด 09:00–17:30 น. เข้าสุดท้าย 17:00 น. นิทรรศการประจำ/เฉพาะสวนเปิด 09:30–17:00 น. เข้าสุดท้าย 16:30 น. ศุกร์ทุกแบบปิด 20:00 น. เข้าสุดท้าย 19:30 น. ปกติปิดจันทร์ (หากเป็นวันหยุดเลื่อนไปวันถัดไป) และ 28 ธ.ค. 2026–1 ม.ค. 2027 วันที่ 1–20 ธ.ค. 2026 เปิดเฉพาะสวน ห้องจัดแสดงปิด นิทรรศการประจำกลับมา 22 ธ.ค. ตรวจปฏิทินด้วย',
      "ko": "겐지 특별전(2026년 10월 6일~11월 29일)은 09:00~17:30, 마지막 입장 17:00입니다. 소장품 전시 또는 정원만 개방하는 날은 09:30~17:00, 마지막 입장 16:30입니다. 금요일에는 모두 20:00까지 운영하며 마지막 입장은 19:30입니다. 보통 월요일(공휴일이면 다음 날)과 2026년 12월 28일~2027년 1월 1일에 쉽니다. 2026년 12월 1~20일에는 정원만 개방하고 전시실은 닫습니다. 소장품 전시는 12월 22일 재개됩니다. 운영 일정을 확인하세요.",
      "zh-CN": "源氏特别展（2026年10月6日至11月29日）：09:00–17:30，最后入场17:00。常设展或仅开放庭园的日期：09:30–17:00，最后入场16:30。周五均延长至20:00，最后入场19:30。通常周一休馆（逢节假日顺延至次日），2026年12月28日至2027年1月1日也休馆。2026年12月1日至20日仅开放庭园，展厅关闭；12月22日恢复常设展。请确认日历。",
      "vi": "Genji (6 tháng 10 – 29 tháng 11 năm 2026): 09:00–17:30, vào cửa lần cuối 17:00. Ngày triển lãm thường trực hoặc ngày chỉ mở vườn: 09:30–17:00, vào cửa lần cuối lúc 16:30. Thứ Sáu: đóng cửa lúc 20:00, vào cửa lần cuối lúc 19:30. Thường đóng cửa vào Thứ Hai (ngày lễ: ngày hôm sau), cộng với ngày 28 tháng 12 năm 2026–ngày 1 tháng 1 năm 2027. Ngày 1–20 tháng 12 năm 2026 chỉ dành cho khu vườn: các phòng trưng bày đóng cửa. Bộ sưu tập tiếp tục vào ngày 22 tháng 12; kiểm tra lịch.",
      "fr": "Genji (6 octobre–29 novembre 2026) : 09:00–17:30, dernière entrée 17:00. Jours de collection permanente ou d’ouverture du jardin seul : 09:30–17:00, dernière entrée 16:30. Le vendredi, tous ferment à 20:00, dernière entrée 19:30. Fermeture habituelle le lundi (le lendemain si le lundi est férié), ainsi que du 28 décembre 2026 au 1er janvier 2027. Du 1er au 20 décembre 2026, seul le jardin ouvre : les galeries sont fermées. La collection permanente reprend le 22 décembre. Consultez le calendrier.",
      "es": "Genji (6 de octubre–29 de noviembre de 2026): 09:00–17:30, última entrada 17:00. Días de colección permanente o de apertura solo del jardín: 09:30–17:00, última entrada 16:30. Los viernes todo cierra a las 20:00, última entrada 19:30. Normalmente cierra los lunes (si es festivo, al día siguiente) y del 28 de diciembre de 2026 al 1 de enero de 2027. Del 1 al 20 de diciembre de 2026 solo abre el jardín; las galerías están cerradas. La colección permanente reabre el 22 de diciembre. Consulte el calendario.",
    },
    admission: {
      en: 'Genji (October 6–November 29, 2026), same-day: adult ¥2,200; university ¥1,200; high school ¥700. Collection: ¥700/¥350 adult/university; garden-only: ¥300/¥150. Student ID required. Genji advance ticket sales ended October 5; group rates and concessions have separate conditions. Confirm the visit type.',
      ja: '特別展「源氏物語」（2026/10/6〜11/29）の当日券は一般2,200円・大学生1,200円・高校生700円。名品ギャラリーは一般700円・大学生350円、庭園のみ300円・150円。学生証が必要。源氏物語展の前売販売は10/5終了。団体料金・減免は別条件。訪問日の公開区分を確認。',
      th: 'Genji วันที่ 6 ต.ค.–29 พ.ย. 2026 ตั๋ววันเข้า: ผู้ใหญ่ 2,200 นักศึกษามหาวิทยาลัย 1,200 มัธยมปลาย 700 เยน นิทรรศการประจำผู้ใหญ่/มหาวิทยาลัย 700/350 เยน เฉพาะสวน 300/150 เยน นักเรียน/นักศึกษาต้องแสดงบัตร การขายตั๋วล่วงหน้า Genji สิ้นสุด 5 ต.ค. หมู่คณะและการยกเว้นมีเงื่อนไขแยก ตรวจประเภทการเข้าชมตามวัน',
      "ko": "겐지 특별전(2026년 10월 6일~11월 29일) 당일권은 성인 2,200엔, 대학생 1,200엔, 고등학생 700엔입니다. 소장품 전시는 성인/대학생 700엔/350엔, 정원만 관람하면 300엔/150엔입니다. 학생증이 필요합니다. 겐지전 예매권 판매는 10월 5일 종료되었습니다. 단체 요금과 할인은 별도 조건이 있으므로 관람 유형을 확인하세요.",
      "zh-CN": "源氏特别展（2026年10月6日至11月29日）当日票：成人2,200日元、大学生1,200日元、高中生700日元。常设展成人/大学生票为700/350日元；仅庭园票为300/150日元。学生须出示学生证。源氏展预售票已于10月5日停售；团体票和优惠另有条件。请确认参观类型。",
      "vi": "Genji (6 tháng 10 – 29 tháng 11 năm 2026), cùng ngày: người lớn 2.200 yên; đại học 1.200 yên; trung học ¥700. Triển lãm thường trực: ¥700/¥350 người lớn/đại học; chỉ dành cho khu vườn: ¥300/¥150. Cần có ID sinh viên. Việc bán vé trước Genji kết thúc vào ngày 5 tháng 10; giá nhóm và ưu đãi có điều kiện riêng biệt. Xác nhận loại lượt truy cập.",
      "fr": "Genji (6 octobre-29 novembre 2026), le jour même : adulte 2 200 ¥ ; étudiant 1 200 ¥ ; lycéen 700 ¥. Collection permanente : 700 ¥/350 ¥ adulte/étudiant ; jardin uniquement : 300 ¥/150 ¥. Carte d'étudiant requise. La prévente des billets pour Genji s'est terminée le 5 octobre ; les tarifs de groupe et les réductions ont des conditions distinctes. Confirmez le type de visite.",
      "es": "Genji (6 de octubre–29 de noviembre de 2026), entrada del día: adulto 2.200 ¥; estudiante universitario 1.200 ¥; estudiante de bachillerato 700 ¥. Colección permanente: adulto/universitario 700/350 ¥; solo jardín 300/150 ¥. Se exige carné de estudiante. La venta anticipada de Genji terminó el 5 de octubre; los grupos y descuentos tienen condiciones propias. Confirme el tipo de visita.",
    },
    booking: {
      en: 'The Tale of Genji special exhibition (October 6–November 29, 2026) does not require advance ticket reservations. Check the museum’s requirements for other exhibitions.',
      ja: '特別展「源氏物語 王朝のかがやき」（2026年10月6日〜11月29日）はチケットの事前予約不要。その他の展覧会の条件は博物館に確認してください。',
      th: 'นิทรรศการพิเศษ The Tale of Genji (6 ต.ค.–29 พ.ย. 2026) ไม่ต้องจองตั๋วล่วงหน้า ตรวจเงื่อนไขของนิทรรศการอื่นกับพิพิธภัณฑ์',
      "ko": "겐지 이야기 특별전(2026년 10월 6일~11월 29일)은 사전 티켓 예약이 필요하지 않습니다. 다른 전시회에 대한 박물관의 요구 사항을 확인하세요.",
      "zh-CN": "源氏物语特别展（2026年10月6日至11月29日）无需提前预订门票。检查博物馆对其他展览的要求。",
      "vi": "Triển lãm đặc biệt Tale of Genji (6 tháng 10 – 29 tháng 11 năm 2026) không yêu cầu đặt vé trước. Kiểm tra các yêu cầu của bảo tàng đối với các triển lãm khác.",
      "fr": "L'exposition spéciale Le Dit du Genji (du 6 octobre au 29 novembre 2026) ne nécessite pas de réservation de billets à l'avance. Vérifiez les exigences du musée pour les autres expositions.",
      "es": "La exposición especial La historia de Genji (6 de octubre–29 de noviembre de 2026) no exige reserva anticipada de entradas. Consulte las condiciones del museo para otras exposiciones.",
    },
    entrance: {
      en: 'Use the South Gate visitor entrance. The museum’s bus-arrival guide says visitors cannot enter at the West Gate and must continue to the South Gate.',
      ja: '来館者入口は南門です。博物館のバス乗降案内では、西門から入館できないため南門まで徒歩で移動するよう案内しています。',
      th: 'ใช้ทางเข้าผู้เข้าชมที่ South Gate คู่มือจุดรับส่งรถบัสของพิพิธภัณฑ์ระบุว่าเข้าทาง West Gate ไม่ได้ และต้องเดินต่อไปที่ South Gate',
      "ko": "남문 방문자 입구를 이용하세요. 박물관의 버스 도착 안내에 따르면 방문객은 서문으로 입장할 수 없으며 남문으로 계속 이동해야 합니다.",
      "zh-CN": "使用南门游客入口。博物馆的巴士到达指南称游客不能从西门进入，必须继续前往南门。",
      "vi": "Sử dụng lối vào dành cho du khách Cổng Nam. Hướng dẫn đón xe buýt của bảo tàng cho biết du khách không thể vào Cổng Tây và phải tiếp tục đến Cổng Nam.",
      "fr": "Utilisez l’entrée visiteurs de la porte sud. Le guide d’arrivée des bus du musée indique que les visiteurs ne peuvent pas entrer par la porte ouest et doivent continuer jusqu’à la porte sud.",
      "es": "Utilice la entrada para visitantes de la puerta sur. La guía de llegada de autobuses del museo dice que los visitantes no pueden ingresar por la puerta oeste y deben continuar hasta la puerta sur.",
    },
    accessibility: {
      en: 'A wheelchair ramp is at the South Gate. Accessible toilets on every floor, in the garden and South Gate area. Limited loan wheelchairs; ask staff. Strollers may be restricted in crowded galleries. Check the street approach separately.',
      ja: '南門に車いす用スロープがあります。各階・庭園・南門に多目的トイレ。貸出車いすは台数制限あり、職員に相談。混雑時は展示室のベビーカー利用制限あり。駅からの公道の経路は別途確認してください。',
      th: 'South Gate มีทางลาดรถเข็น มีห้องน้ำรถเข็นทุกชั้น ในสวนและบริเวณประตูใต้ รถเข็นให้ยืมมีจำนวนจำกัด ติดต่อเจ้าหน้าที่ ช่วงคนแน่นอาจจำกัดรถเข็นเด็กในห้องจัดแสดง ตรวจเส้นทางถนนจากสถานีแยกต่างหาก',
      "ko": "남문에 휠체어 경사로가 있습니다. 모든 층과 정원, 남문 구역에 장애인용 화장실이 있습니다. 대여 휠체어는 수량이 한정되어 있으므로 직원에게 문의하세요. 전시실이 혼잡하면 유모차 이용이 제한될 수 있습니다. 거리에서 접근하는 경로는 별도로 확인하세요.",
      "zh-CN": "南门设有轮椅坡道。每层楼、花园和南门区域均设有无障碍厕所。有限借用轮椅；询问工作人员。婴儿车可能会被限制进入拥挤的画廊。单独检查街道引道。",
      "vi": "Một đoạn đường dành cho xe lăn nằm ở Cổng phía Nam. Nhà vệ sinh dành cho người khuyết tật ở mỗi tầng, trong sân vườn và khu vực Cổng Nam. Cho mượn xe lăn có giới hạn; hỏi nhân viên. Xe đẩy có thể bị hạn chế trong các phòng trưng bày đông đúc. Kiểm tra cách tiếp cận đường phố một cách riêng biệt.",
      "fr": "Une rampe pour fauteuils roulants se trouve à la porte sud. Toilettes accessibles à tous les étages, dans le jardin et dans la zone Porte Sud. Fauteuils roulants à prêt limité ; demandez au personnel. Les poussettes peuvent être restreintes dans les galeries bondées. Vérifiez l'approche de la rue séparément.",
      "es": "Hay una rampa para sillas de ruedas en la puerta sur. Aseos accesibles en todas las plantas, en el jardín y en la zona de la Puerta Sur. Préstamo limitado de sillas de ruedas; pregunte al personal. Los cochecitos pueden estar restringidos en galerías abarrotadas. Verifique el acceso a la calle por separado.",
    },
    fieldSources: {
      booking: {
        source: 'https://www.kyohaku.go.jp/eng/',
        reviewedAt: '2026-10-30',
        validThrough: '2026-11-29',
        applicablePeriods: [
          { from: '2026-10-06', through: '2026-11-29' },
        ],
      },
      hours: {
        source: 'https://www.kyohaku.go.jp/eng/visit/info/',
        reviewedAt: '2026-11-03',
      },
      admission: {
        source: 'https://www.kyohaku.go.jp/eng/visit/info/',
        reviewedAt: '2026-11-03',
      },
      entrance: {
        source: 'https://www.kyohaku.go.jp/jp/assets/visit/access/bus-map.pdf',
        reviewedAt: '2026-10-31',
      },
      accessibility: {
        source: 'https://www.kyohaku.go.jp/eng/visit/accessibility/',
        reviewedAt: '2026-10-31',
      },
    },
  },
  'pref:kumamoto:suizenji-jojuen': {
    source:
      'https://www.japan.travel/en/japans-local-treasures/suizenji-jojuen-garden-2020/',
    reviewedAt: '2026-10-25',
    access: {
      en: 'About four minutes on foot from Suizenji Park tram stop, or ten minutes from JR Shin-Suizenji Station.',
      ja: '市電水前寺公園停留場から徒歩約4分、JR新水前寺駅から約10分。',
      th: 'เดินประมาณ 4 นาทีจากป้ายรถราง Suizenji Park หรือประมาณ 10 นาทีจาก JR Shin-Suizenji',
      "ko": "스이젠지 공원 트램 정류장에서 도보로 약 4분, JR 신스이젠지역에서 10분 거리에 있습니다.",
      "zh-CN": "从水前寺公园电车站步行约4分钟，从JR新水前寺站步行约10分钟。",
      "vi": "Khoảng bốn phút đi bộ từ trạm xe điện Công viên Suizenji hoặc mười phút từ Ga JR Shin-Suizenji.",
      "fr": "À environ quatre minutes à pied de l'arrêt de tramway Suizenji Park ou dix minutes de la gare JR Shin-Suizenji.",
      "es": "A unos cuatro minutos a pie desde la parada de tranvía Suizenji Park, o a diez minutos desde la estación JR Shin-Suizenji.",
    },
    fieldSources: {
      hours: {
        source: 'https://www.suizenji.or.jp/en/guide/',
        reviewedAt: '2026-10-27',
      },
      admission: {
        source: 'https://www.suizenji.or.jp/en/guide/',
        reviewedAt: '2026-10-27',
      },
      booking: {
        source: 'https://www.suizenji.or.jp/en/guide/',
        reviewedAt: '2026-10-27',
      },
      entrance: {
        source: 'https://www.suizenji.or.jp/en/guide/',
        reviewedAt: '2026-10-27',
      },
      accessibility: {
        source: 'https://www.suizenji.or.jp/en/guide/',
        reviewedAt: '2026-10-27',
      },
    },
    hours: {
      en: 'Daily 08:30–17:00; last entry 16:30. Event hours can differ.',
      ja: '毎日8:30〜17:00、最終入園16:30。催事時は変更あり。',
      th: 'ทุกวัน 08:30–17:00 น. เข้าสุดท้าย 16:30 น. ช่วงงานกิจกรรมอาจเปลี่ยนเวลา',
      "ko": "매일 08:30~17:00; 마지막 입장 16:30. 행사시간은 다를 수 있습니다.",
      "zh-CN": "每日 08:30–17:00；最后入场时间为 16:30。活动时间可能有所不同。",
      "vi": "Hàng ngày 08:30–17:00; lượt vào cuối cùng 16:30. Giờ sự kiện có thể khác nhau.",
      "fr": "Tous les jours de 8h30 à 17h00 ; dernière entrée 16h30. Les heures des événements peuvent différer.",
      "es": "Todos los días de 08:30 a 17:00; última entrada 16:30. Los horarios del evento pueden diferir.",
    },
    admission: {
      en: 'Ages 16+: ¥500; ages 6–15: ¥200. Check separate group and certificate-holder rules.',
      ja: '16歳以上500円、6〜15歳200円。団体・手帳割引は別途条件を確認。',
      th: 'อายุ 16 ปีขึ้นไป 500 เยน อายุ 6–15 ปี 200 เยน ส่วนลดหมู่คณะและผู้ถือบัตรมีเงื่อนไขแยก',
      "ko": "16세 이상은 500엔, 6~15세는 200엔입니다. 단체 및 증명서 소지자의 별도 이용 조건을 확인하세요.",
      "zh-CN": "16岁及以上：500日元； 6-15岁：200日元。检查单独的组和证书持有者规则。",
      "vi": "Từ 16 tuổi trở lên: ¥500; 6–15 tuổi: 200 yên. Kiểm tra các quy tắc nhóm và người giữ chứng chỉ riêng biệt.",
      "fr": "16 ans et plus : 500 ¥ ; 6 à 15 ans : 200 ¥. Vérifiez les règles distinctes pour les groupes et les titulaires de certificat.",
      "es": "De 16 años en adelante: 500 ¥; de 6 a 15 años: 200 ¥. Consulte las condiciones específicas para grupos y titulares de certificados.",
    },
    booking: {
      en: 'Japanese/English guided tours require advance contact and an extra fee.',
      ja: '日本語・英語ガイドは事前連絡が必要で別料金。',
      th: 'ทัวร์มีไกด์ภาษาญี่ปุ่นหรืออังกฤษต้องติดต่อล่วงหน้าและมีค่าใช้จ่ายเพิ่ม',
      "ko": "일본어/영어 가이드 투어는 사전 연락이 필요하며 추가 요금이 부과됩니다.",
      "zh-CN": "日语/英语导游服务需要提前联系并收取额外费用。",
      "vi": "Các chuyến tham quan có hướng dẫn viên tiếng Nhật/tiếng Anh yêu cầu liên hệ trước và phải trả thêm phí.",
      "fr": "Les visites guidées en japonais/anglais nécessitent un contact préalable et des frais supplémentaires.",
      "es": "Las visitas guiadas en japonés/inglés requieren contacto previo y una tarifa adicional.",
    },
    entrance: {
      en: 'Use Main or North Gate. East, South and Soseki gates are closed at review.',
      ja: '正門・北門を利用。確認時点で東門・南門・漱石門は閉鎖中。',
      th: 'ใช้ประตูหลักหรือประตูเหนือ ประตูตะวันออก ใต้ และ Soseki ปิดอยู่ ณ วันที่ตรวจสอบ',
      "ko": "정문이나 북문을 이용하세요. 동쪽, 남쪽 및 소세키 게이트는 정보 확인 당시 폐쇄되어 있었습니다.",
      "zh-CN": "使用正门或北门。东门、南门和漱石门在信息核查时关闭。",
      "vi": "Sử dụng Cổng chính hoặc Cổng Bắc. Các cổng Đông, Nam và Soseki đang đóng cửa tại thời điểm kiểm tra thông tin.",
      "fr": "Utilisez la porte principale ou nord. Les portes Est, Sud et Soseki sont fermées au moment de la vérification.",
      "es": "Utilice la puerta principal o norte. Las puertas Este, Sur y Soseki están cerradas durante la revisión.",
    },
    accessibility: {
      en: 'Four loan wheelchairs at the Main Gate ticket office. Ostomate facilities at east toilets; nursing room in the exhibition hall. This does not confirm every path is step-free.',
      ja: '正門券売所に貸出車いす4台。東トイレにオストメイト設備、展示館に授乳室。全経路の段差解消を保証する情報ではありません。',
      th: 'ยืมรถเข็นได้ 4 คันที่เคาน์เตอร์ประตูหลัก ห้องน้ำตะวันออกมีอุปกรณ์รองรับถุงทวารเทียม ห้องให้นมอยู่ในอาคารนิทรรศการ ไม่ได้ยืนยันว่าทุกทางไร้บันได',
      "ko": "정문 매표소에서 휠체어 4대를 대여합니다. 동쪽 화장실에는 장루·요루 이용자를 위한 설비가 있으며 전시관에는 수유실이 있습니다. 모든 경로에 계단이 없다는 뜻은 아닙니다.",
      "zh-CN": "正门售票处提供四张借用轮椅。东厕所设有人工造口设施；展厅内的哺乳室。这并不能确认每条路径都是无障碍的。",
      "vi": "Cho mượn bốn chiếc xe lăn tại phòng vé Cổng Chính. Cơ sở Ostomate tại nhà vệ sinh phía đông; phòng cho con bú trong phòng triển lãm. Điều này không xác nhận mọi lối đi đều không có bậc thang.",
      "fr": "Quatre fauteuils roulants en prêt à la billetterie de la porte principale. Installations pour stomisés dans les toilettes est ; salle de allaitement dans le hall d'exposition. Cela ne confirme pas que chaque chemin est sans marches.",
      "es": "Cuatro sillas de ruedas en préstamo en la taquilla de la puerta principal. Instalaciones para ostomizados en los baños del este; Sala de lactancia en la sala de exposiciones. Esto no confirma que todos los caminos estén sin escalones.",
    },
  },
  'pref:tochigi:nikko-toshogu': {
    source: 'https://www.japan.travel/en/spot/1482/',
    reviewedAt: '2026-10-25',
    access: {
      en: 'From JR or Tobu Nikko, take the World Heritage sightseeing bus (about 15 minutes). Walking from the station takes about 45 minutes.',
      ja: 'JR・東武日光駅から世界遺産めぐりバス約15分。駅から徒歩では約45分。',
      th: 'จาก JR หรือ Tobu Nikko ใช้บัสชมมรดกโลกประมาณ 15 นาที หากเดินจากสถานีใช้ประมาณ 45 นาที',
      "ko": "JR이나 도부닛코에서 세계유산 관광버스를 타세요(약 15분). 역에서 도보로 약 45분 정도 소요됩니다.",
      "zh-CN": "从JR或东武日光乘坐世界遗产观光巴士（约15分钟）。从车站步行约需45分钟。",
      "vi": "Từ JR hoặc Tobu Nikko, đi xe buýt tham quan Di sản Thế giới (khoảng 15 phút). Đi bộ từ nhà ga mất khoảng 45 phút.",
      "fr": "Depuis JR ou Tobu Nikko, prenez le bus touristique du patrimoine mondial (environ 15 minutes). Marcher depuis la gare prend environ 45 minutes.",
      "es": "Desde JR o Tobu Nikko, tome el autobús turístico World Heritage (unos 15 minutos). Caminar desde la estación dura unos 45 minutos.",
    },
    fieldSources: {
      booking: {
        source: 'https://www.visitnikko.jp/en/spots/nikko-toshogu-shrine/',
        reviewedAt: '2026-10-27',
      },
    },
    booking: {
      en: 'The city guide’s linked online vouchers must be exchanged at Tobu-Nikko Station Tourist Center, not the shrine entrance. Check your selected product’s exchange instructions.',
      ja: '市観光案内のオンライン引換券は東武日光駅ツーリストセンターで交換。神社入口では交換不可。購入商品の引換条件を確認。',
      th: 'เวาเชอร์ออนไลน์ที่คู่มือท่องเที่ยวเมืองลิงก์ไว้ต้องแลกที่ Tobu-Nikko Station Tourist Center ไม่ใช่ทางเข้าศาลเจ้า ตรวจเงื่อนไขของตั๋วที่เลือก',
      "ko": "시티 가이드 연계 온라인 바우처는 신사 입구가 아닌 도부닛코역 관광센터에서 교환해야 합니다. 선택한 상품의 교환 안내를 확인하세요.",
      "zh-CN": "城市指南链接的在线优惠券必须在东武日光站游客中心而不是神社入口处兑换。检查您所选产品的换货说明。",
      "vi": "Các voucher trực tuyến được liên kết của hướng dẫn viên thành phố phải được đổi tại Trung tâm du lịch ga Tobu-Nikko chứ không phải lối vào đền thờ. Kiểm tra hướng dẫn trao đổi sản phẩm đã chọn của bạn.",
      "fr": "Les bons en ligne liés au guide de la ville doivent être échangés au centre touristique de la gare de Tobu-Nikko, et non à l'entrée du sanctuaire. Vérifiez les instructions d’échange du produit sélectionné.",
      "es": "Los vales en línea vinculados a la guía de la ciudad deben canjearse en el centro turístico de la estación Tobu-Nikko, no en la entrada del santuario. Consulta las instrucciones de cambio del producto seleccionado.",
    },
  },
  'pref:fukuoka:dazaifu-tenmangu': {
    source: 'https://www.japan.travel/en/spot/798/',
    reviewedAt: '2026-10-25',
    access: {
      en: 'From Nishitetsu Fukuoka (Tenjin), change at Futsukaichi for Dazaifu. The shrine is about five minutes on foot from Dazaifu Station.',
      ja: '西鉄福岡（天神）から二日市で乗り換え太宰府へ。太宰府駅から徒歩約5分。',
      th: 'จาก Nishitetsu Fukuoka (Tenjin) เปลี่ยนที่ Futsukaichi ไป Dazaifu แล้วเดินจากสถานีประมาณ 5 นาที',
      "ko": "니시테츠 후쿠오카(텐진)에서 후쓰카이치에서 다자이후로 환승하세요. 신사는 다자이후역에서 도보로 약 5분 거리에 있습니다.",
      "zh-CN": "从西铁福冈（天神）出发，在二日市换乘前往太宰府。从太宰府站步行约5分钟。",
      "vi": "Từ Nishitetsu Fukuoka (Tenjin), đổi tàu ở Futsukaichi để đến Dazaifu. Đền thờ cách Ga Dazaifu khoảng năm phút đi bộ.",
      "fr": "Depuis Nishitetsu Fukuoka (Tenjin), changement à Futsukaichi pour Dazaifu. Le sanctuaire se trouve à environ cinq minutes à pied de la gare de Dazaifu.",
      "es": "Desde Nishitetsu Fukuoka (Tenjin), transbordo en Futsukaichi a Dazaifu. El santuario está a unos cinco minutos a pie desde la estación Dazaifu.",
    },
    fieldSources: {
      hours: {
        source: 'https://www.dazaifutenmangu.or.jp/',
        reviewedAt: '2026-10-27',
      },
      admission: {
        source: 'https://www.dazaifutenmangu.or.jp/en/plan/faq/',
        reviewedAt: '2026-10-27',
      },
    },
    hours: {
      en: 'Opens 06:00 from the spring equinox, 06:30 from the autumn equinox. Closes 19:00 Apr–May/Sep–Nov, 19:30 Jun–Aug, 18:30 Dec–Mar. Check temporary changes.',
      ja: '春分の日から6:00、秋分の日から6:30開門。閉門は4〜5月・9〜11月19:00、6〜8月19:30、12〜3月18:30。臨時変更も確認。',
      th: 'เปิด 06:00 น. ตั้งแต่วันวสันตวิษุวัต และ 06:30 น. ตั้งแต่วันศารทวิษุวัต ปิด 19:00 น. เม.ย.–พ.ค./ก.ย.–พ.ย., 19:30 น. มิ.ย.–ส.ค., 18:30 น. ธ.ค.–มี.ค. ตรวจการเปลี่ยนเวลาชั่วคราวด้วย',
      "ko": "춘분부터 06:00, 추분부터 06:30에 개장합니다. 4월~5월/9월~11월 19:00, 6월~8월 19:30, 12월~3월 18:30에 마감됩니다. 임시 변경 사항을 확인하세요.",
      "zh-CN": "春分06:00开始，秋分06:30开始。关闭时间：4 月至 5 月/9 月至 11 月 19:00、6 月至 8 月 19:30、12 月至 3 月 18:30。检查临时更改。",
      "vi": "Mở cửa lúc 06:00 từ điểm xuân phân, 06:30 từ điểm thu phân. Đóng cửa 19:00 Tháng 4–Tháng 5/Tháng 9–Tháng 11, 19:30 Tháng 6–Tháng 8, 18:30 Tháng 12–Tháng 3. Kiểm tra những thay đổi tạm thời",
      "fr": "Ouverture à 06:00 à partir de l’équinoxe de printemps, à 06:30 à partir de l’équinoxe d’automne. Fermeture à 19:00 en avril–mai et septembre–novembre, à 19:30 en juin–août, à 18:30 en décembre–mars. Vérifiez les changements temporaires.",
      "es": "Abre a las 06:00 a partir del equinoccio de primavera y a las 06:30 a partir del equinoccio de otoño. Cierra a las 19:00 en abril–mayo y septiembre–noviembre; a las 19:30 en junio–agosto; a las 18:30 en diciembre–marzo. Compruebe los cambios temporales.",
    },
    admission: {
      en: 'Ordinary worship and shrine grounds are free. On-site museums and nearby attractions charge separately.',
      ja: '通常参拝・境内は無料。境内の博物館や周辺施設は別途有料。',
      th: 'สักการะตามปกติและเดินในบริเวณศาลเจ้าฟรี พิพิธภัณฑ์ในพื้นที่และสถานที่ใกล้เคียงคิดค่าเข้าแยก',
      "ko": "일반 참배와 신사 경내는 무료입니다. 현장 박물관과 인근 관광 명소에는 별도 요금이 부과됩니다.",
      "zh-CN": "一般的参拜和神社场地都是免费的。现场博物馆和附近的景点单独收费。",
      "vi": "Việc thờ cúng thông thường và khuôn viên đền thờ đều miễn phí. Bảo tàng trong khuôn viên và các điểm tham quan gần đó tính phí riêng.",
      "fr": "La visite ordinaire pour prier et l’accès à l’enceinte du sanctuaire sont gratuits. Les musées sur place et les attractions voisines sont payants séparément.",
      "es": "El culto ordinario y los terrenos del santuario son gratuitos. Los museos en el lugar y las atracciones cercanas cobran por separado.",
    },
  },
  'pref:hiroshima:itsukushima-shrine': {
    source:
      'https://www.japan.travel/en/world-heritage/itsukushima-shinto-shrine/',
    reviewedAt: '2026-10-25',
    access: {
      en: 'From Hiroshima take JR to Miyajimaguchi (about 30 minutes), a ferry to Miyajima (about 10 minutes), then walk about 10 minutes to the shrine.',
      ja: '広島からJRで宮島口へ約30分、フェリーで宮島へ約10分、神社まで徒歩約10分。',
      th: 'จาก Hiroshima ใช้ JR ถึง Miyajimaguchi ราว 30 นาที ต่อเรือไป Miyajima ราว 10 นาที แล้วเดินถึงศาลเจ้าอีกประมาณ 10 นาที',
      "ko": "히로시마에서 JR을 타고 미야지마구치까지(약 30분), 미야지마까지 페리를 타고(약 10분) 그런 다음 약 10분 정도 걸어서 신사까지 가세요.",
      "zh-CN": "从广岛乘坐JR到宫岛口（约30分钟），再乘坐渡轮到宫岛（约10分钟），然后步行约10分钟到达神社。",
      "vi": "Từ Hiroshima đi JR đến Miyajimaguchi (khoảng 30 phút), đi phà tới Miyajima (khoảng 10 phút), sau đó đi bộ khoảng 10 phút là đến đền.",
      "fr": "Depuis Hiroshima, prenez le JR jusqu'à Miyajimaguchi (environ 30 minutes), un ferry pour Miyajima (environ 10 minutes), puis marchez environ 10 minutes jusqu'au sanctuaire.",
      "es": "Desde Hiroshima, tome JR hasta Miyajimaguchi (unos 30 minutos), un ferry hasta Miyajima (unos 10 minutos) y luego camine unos 10 minutos hasta el santuario.",
    },
    fieldSources: {
      hours: {
        source: 'https://itsukushimajinja.jp/en/admission.html',
        reviewedAt: '2026-10-27',
      },
      admission: {
        source: 'https://itsukushimajinja.jp/en/admission.html',
        reviewedAt: '2026-10-27',
      },
    },
    hours: {
      en: 'Normally opens 06:30. Closes 18:00 Mar 1–Oct 14, 17:30 Oct 15–Nov and Jan 4–Feb, 17:00 Dec. Jan 1–3 use special hours.',
      ja: '通常6:30開門。閉門は3/1〜10/14が18:00、10/15〜11月・1/4〜2月が17:30、12月17:00。1/1〜3は特別時間。',
      th: 'ปกติเปิด 06:30 น. ปิด 18:00 น. วันที่ 1 มี.ค.–14 ต.ค., 17:30 น. วันที่ 15 ต.ค.–พ.ย. และ 4 ม.ค.–ก.พ., 17:00 น. ใน ธ.ค. วันที่ 1–3 ม.ค. ใช้เวลาพิเศษ',
      "ko": "보통 06:30에 엽니다. 폐문은 3월 1일~10월 14일 18:00, 10월 15일~11월 및 1월 4일~2월 17:30, 12월 17:00입니다. 1월 1~3일은 특별 운영 시간입니다.",
      "zh-CN": "通常06:30开放。闭门时间：3月1日至10月14日18:00；10月15日至11月以及1月4日至2月17:30；12月17:00。1月1日至3日采用特别开放时间。",
      "vi": "Thường mở cửa lúc 06:30. Đóng cửa lúc 18:00 từ 1/3–14/10; 17:30 từ 15/10–tháng 11 và từ 4/1–tháng 2; 17:00 trong tháng 12. Ngày 1–3/1 áp dụng giờ đặc biệt.",
      "fr": "Ouverture habituelle à 06:30. Fermeture à 18:00 du 1er mars au 14 octobre ; à 17:30 du 15 octobre à novembre et du 4 janvier à février ; à 17:00 en décembre. Horaires spéciaux du 1er au 3 janvier.",
      "es": "Normalmente abre a las 06:30. Cierra a las 18:00 del 1 de marzo al 14 de octubre; a las 17:30 del 15 de octubre a noviembre y del 4 de enero a febrero; y a las 17:00 en diciembre. Del 1 al 3 de enero hay horarios especiales.",
    },
    admission: {
      en: 'Shrine: adults ¥300; high school ¥200; elementary/junior high ¥100. Treasure Hall and combined tickets differ.',
      ja: '神社：大人300円、高校生200円、小中学生100円。宝物館・共通券は別料金。',
      th: 'ศาลเจ้า: ผู้ใหญ่ 300 เยน มัธยมปลาย 200 เยน ประถมและมัธยมต้น 100 เยน หอสมบัติและตั๋วรวมมีราคาแยก',
      "ko": "신사 입장료는 성인 300엔, 고등학생 200엔, 초·중학생 100엔입니다. 보물관과 통합 입장권의 요금은 다릅니다.",
      "zh-CN": "神社：成人300日元；高中生200日元；中小学生100日元。宝物馆和联票有所不同。",
      "vi": "Đền thờ: người lớn ¥300; trung học 200 yên; tiểu học/trung học cơ sở 100 yên. Phòng kho báu và vé kết hợp khác nhau.",
      "fr": "Sanctuaire : adultes 300 ¥ ; lycéen 200 ¥ ; élémentaire/secondaire 100 ¥. La Salle du Trésor et les billets combinés diffèrent.",
      "es": "Santuario: adultos 300 ¥; estudiantes de bachillerato 200 ¥; escolares de primaria y secundaria básica 100 ¥. El Salón del Tesoro y las entradas combinadas tienen otras tarifas.",
    },
  },
}
export function visitFor(place: Pick<Place, 'id'>) {
  return visitDetails[canonicalPlaceId(place.id)]
}
export const placeCategory = (place: Place) => place.category

export function visitSource(
  visit: Visit,
  field: keyof NonNullable<Visit['fieldSources']>,
): VisitSource {
  return (
    visit.notApplicable?.[field] ||
    visit.fieldSources?.[field] || {
      source:
        (field === 'hours' || field === 'admission') && visit.infoSource
          ? visit.infoSource
          : visit.source,
      reviewedAt: visit.reviewedAt,
    }
  )
}

export const reviewDays: Record<VisitField, number> = {
  access: 180,
  entrance: 180,
  hours: 30,
  admission: 30,
  booking: 30,
  accessibility: 90,
}

export function fieldApplicability(
  visit: Visit | undefined,
  field: VisitField,
  visitDate?: string,
) {
  if (!visit || (!visit[field] && !visit.notApplicable?.[field])) return
  const periods = visitSource(visit, field).applicablePeriods
  if (!periods?.length) return
  if (
    !visitDate ||
    !/^\d{4}-\d{2}-\d{2}$/.test(visitDate) ||
    !Number.isFinite(Date.parse(`${visitDate}T12:00:00Z`)) ||
    new Date(`${visitDate}T12:00:00Z`).toISOString().slice(0, 10) !== visitDate
  )
    return 'dateNeeded' as const
  return periods.some(
    ({ from, through }) => from <= visitDate && visitDate <= through,
  )
    ? ('inPeriod' as const)
    : ('outsidePeriod' as const)
}

export function fieldReview(
  visit: Visit | undefined,
  field: VisitField,
  today: string,
) {
  if (!visit || (!visit[field] && !visit.notApplicable?.[field]))
    return { status: 'unverified' as const }
  const source = visitSource(visit, field)
  const nextReviewBy = new Date(
    Date.parse(source.reviewedAt) + reviewDays[field] * 86400000,
  )
    .toISOString()
    .slice(0, 10)
  return {
    status:
      source.validThrough && today > source.validThrough
        ? ('expired' as const)
        : today > nextReviewBy
          ? ('overdue' as const)
          : visit.notApplicable?.[field]
            ? ('notApplicable' as const)
            : ('reviewed' as const),
    source: source.source,
    reviewedAt: source.reviewedAt,
    nextReviewBy,
    validThrough: source.validThrough,
  }
}
