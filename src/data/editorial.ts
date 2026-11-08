import type { Locale } from '@/i18n/config'
export const editorial: Record<
  Locale,
  {
    title: string
    description: string
    sections: { title: string; text: string }[]
  }
> = {
  en: {
    title: 'About this independent guide',
    description: 'How we choose places, check sources and handle your data.',
    sections: [
      {
        title: 'Who maintains the guide',
        text: 'This independent project is maintained through the Website-Japan repository. It is not an official tourism authority or booking agency. Project history and corrections are public on GitHub.',
      },
      {
        title: 'Sources and corrections',
        text: 'Prefecture introductions refer to JNTO; venue access and admission refer to operators where checked. Map coordinates and location labels are credited to OpenStreetMap. A review date applies to the information named beside it, not a guarantee that every detail is current. Unknown details are marked explicitly. Please report a page URL and the correction with an official source.',
      },
      {
        title: 'Your trip and privacy',
        text: 'Trips and appearance settings are stored in this browser. There is no account or cross-device cloud sync. Clearing browser data removes the saved trip. Backups and offline files can contain accommodation, dates and personal notes; review them before sharing. This site does not operate booking or payment forms and does not include visitor analytics or advertising trackers.',
      },
      {
        title: 'External services',
        text: 'Viewing an interactive map makes requests to OpenStreetMap tile servers, which receive normal connection information such as your IP address and referring website. Google Maps, official visitor sites and GitHub open only when you follow their links and apply their own policies. Hosting infrastructure may keep access logs; deployment-specific retention details must be published by the site operator.',
      },
      {
        title: 'Accessibility and illustrated scenery',
        text: 'Use the list instead of the map, keyboard controls, day/night themes and the shared animation pause. System reduced-motion settings take precedence. The 3D miniature is an illustration, not a geographic model. Report accessibility barriers through the project issue link without including personal trip data.',
      },
    ],
  },
"ko": {
  "title": "이 독립 여행 가이드 소개",
  "description": "장소 선정, 출처 확인과 데이터 관리 방식.",
  "sections": [
    {
      "title": "가이드 운영 주체",
      "text": "이 독립 프로젝트는 Website-Japan 저장소에서 관리합니다. 공식 관광 기관이나 예약 대행사가 아닙니다. 프로젝트 이력과 수정 내용은 GitHub에 공개됩니다."
    },
    {
      "title": "출처와 수정",
      "text": "도도부현 소개는 JNTO, 확인된 시설 교통·입장 정보는 운영사 안내를 참조합니다. 지도 좌표와 지명은 OpenStreetMap을 출처로 표시합니다. 검토일은 옆에 명시된 정보에만 적용되며 모든 내용이 최신임을 보장하지 않습니다. 미확인 정보는 명시합니다. 수정 요청에는 페이지 URL과 공식 출처를 보내 주세요."
    },
    {
      "title": "여행과 개인정보",
      "text": "여행과 화면 설정은 이 브라우저에 저장됩니다. 계정이나 기기 간 클라우드 동기화는 없습니다. 브라우저 데이터를 지우면 저장된 여행도 삭제됩니다. 백업·오프라인 파일에는 숙소, 날짜와 개인 메모가 포함될 수 있으니 공유 전에 검토하세요. 예약·결제 양식, 방문자 분석이나 광고 추적기는 운영하지 않습니다."
    },
    {
      "title": "외부 서비스",
      "text": "대화형 지도는 OpenStreetMap 타일 서버에 요청하며 IP 주소와 참조 사이트 등 일반 연결 정보를 전송합니다. Google Maps, 공식 방문 사이트와 GitHub는 링크를 열 때만 연결되며 각 정책이 적용됩니다. 호스팅에서 접속 로그를 보관할 수 있으며 운영자는 배포 환경의 보관 기간을 공개해야 합니다."
    },
    {
      "title": "접근성과 장식 풍경",
      "text": "지도 대신 목록, 키보드 조작, 주야간 테마와 공통 애니메이션 일시 정지를 이용할 수 있습니다. 시스템의 동작 줄이기 설정이 우선합니다. 3D 모형은 그림이며 지리 모델이 아닙니다. 접근성 문제는 개인 여행 데이터를 제외하고 프로젝트 신고 링크로 알려 주세요."
    }
  ]
},
"zh-CN": {
  "title": "关于这份独立指南",
  "description": "我们如何选择地点、核查来源并处理您的数据。",
  "sections": [
    {
      "title": "谁维护本指南",
      "text": "本独立项目通过 Website-Japan 代码仓库维护，并非官方旅游机构或预订代理。项目历史和更正记录在 GitHub 公开。"
    },
    {
      "title": "来源与更正",
      "text": "都道府县介绍参考 JNTO；已核查的交通及门票信息参考运营方。地图坐标与地名注明来源 OpenStreetMap。核查日期仅适用于旁边注明的信息，不保证所有细节均为最新；未知信息会明确标注。请提供页面 URL、修正内容及官方来源。"
    },
    {
      "title": "行程与隐私",
      "text": "行程和外观设置保存在本浏览器中，没有账户或跨设备云同步。清除浏览器数据会删除行程。备份和离线文件可能包含住宿、日期及私人备注，分享前请检查。本网站不提供预订或支付表单，也不使用访客分析或广告追踪器。"
    },
    {
      "title": "外部服务",
      "text": "查看互动地图会请求 OpenStreetMap 瓦片服务器，对方会收到 IP 地址、来源网站等正常连接信息。Google Maps、官方参观网站和 GitHub 仅在点击链接时打开，并适用各自政策。托管平台可能保留访问日志；网站运营方须公布实际部署环境的保存期限。"
    },
    {
      "title": "无障碍与示意景观",
      "text": "可使用列表代替地图，并支持键盘、日夜主题及统一暂停动画。系统的减少动态设置优先。3D 微缩景观仅为示意，并非地理模型。请通过项目问题链接报告使用障碍，不要包含私人行程数据。"
    }
  ]
},
"vi": {
  "title": "Về cẩm nang độc lập này",
  "description": "Cách chọn địa điểm, kiểm tra nguồn và xử lý dữ liệu của bạn.",
  "sections": [
    {
      "title": "Ai duy trì cẩm nang",
      "text": "Dự án độc lập này được duy trì qua kho Website-Japan, không phải cơ quan du lịch chính thức hay đại lý đặt chỗ. Lịch sử và sửa đổi công khai trên GitHub."
    },
    {
      "title": "Nguồn và đính chính",
      "text": "Giới thiệu tỉnh tham khảo JNTO; thông tin đường đi và vé đã kiểm tra tham khảo đơn vị vận hành. Tọa độ, nhãn địa điểm ghi nguồn OpenStreetMap. Ngày rà soát chỉ áp dụng cho thông tin ghi kèm, không bảo đảm mọi chi tiết đều mới; mục chưa rõ được đánh dấu. Khi báo sửa, gửi URL trang và nguồn chính thức."
    },
    {
      "title": "Chuyến đi và quyền riêng tư",
      "text": "Chuyến đi và cài đặt giao diện lưu trong trình duyệt này. Không có tài khoản hay đồng bộ đám mây giữa thiết bị. Xóa dữ liệu trình duyệt sẽ xóa chuyến đi. Bản sao và tệp ngoại tuyến có thể chứa chỗ ở, ngày, ghi chú riêng; kiểm tra trước khi chia sẻ. Trang không có biểu mẫu đặt chỗ, thanh toán, phân tích khách truy cập hay theo dõi quảng cáo."
    },
    {
      "title": "Dịch vụ bên ngoài",
      "text": "Bản đồ tương tác gửi yêu cầu đến máy chủ ô bản đồ OpenStreetMap, nơi nhận IP và trang giới thiệu như thông tin kết nối thông thường. Google Maps, trang tham quan chính thức và GitHub chỉ mở khi theo liên kết, áp dụng chính sách riêng. Hạ tầng lưu trữ có thể ghi nhật ký truy cập; đơn vị vận hành phải công bố thời hạn lưu của bản triển khai."
    },
    {
      "title": "Khả năng tiếp cận và cảnh minh họa",
      "text": "Có thể dùng danh sách thay bản đồ, bàn phím, giao diện ngày/đêm và nút dừng hoạt ảnh chung. Cài đặt giảm chuyển động của hệ thống được ưu tiên. Mô hình 3D là minh họa, không phải mô hình địa lý. Báo rào cản tiếp cận qua liên kết vấn đề dự án, không kèm dữ liệu chuyến đi riêng."
    }
  ]
},
"fr": {
  "title": "À propos de ce guide indépendant",
  "description": "Notre sélection des lieux, vérification des sources et gestion des données.",
  "sections": [
    {
      "title": "Qui entretient ce guide",
      "text": "Ce projet indépendant est maintenu dans le dépôt Website-Japan. Il ne s’agit ni d’une autorité touristique officielle ni d’une agence de réservation. Historique et corrections sont publics sur GitHub."
    },
    {
      "title": "Sources et corrections",
      "text": "Les présentations des préfectures se réfèrent à la JNTO ; accès et tarifs vérifiés aux exploitants. Coordonnées et noms de carte sont crédités à OpenStreetMap. Une date de vérification ne couvre que l’information indiquée, sans garantir l’actualité de chaque détail. Les inconnues sont signalées. Merci de fournir l’URL, la correction et une source officielle."
    },
    {
      "title": "Votre voyage et la confidentialité",
      "text": "Voyages et apparence sont enregistrés dans ce navigateur. Aucun compte ni synchronisation cloud entre appareils. Effacer les données du navigateur supprime le voyage. Sauvegardes et fichiers hors ligne peuvent contenir hébergement, dates et notes personnelles : vérifiez-les avant partage. Le site ne propose ni réservation ni paiement et n’intègre ni analyse des visiteurs ni traceurs publicitaires."
    },
    {
      "title": "Services externes",
      "text": "La carte interactive contacte les serveurs de tuiles OpenStreetMap, qui reçoivent les informations usuelles comme l’IP et le site d’origine. Google Maps, sites officiels et GitHub ne s’ouvrent qu’en suivant leurs liens et appliquent leurs politiques. L’hébergeur peut conserver des journaux ; l’exploitant doit publier la durée de conservation propre au déploiement."
    },
    {
      "title": "Accessibilité et paysage illustré",
      "text": "Utilisez liste plutôt que carte, clavier, thèmes jour/nuit et pause commune des animations. Les réglages système de réduction des mouvements priment. La miniature 3D est illustrative, non géographique. Signalez les obstacles d’accessibilité via le lien du projet sans données personnelles de voyage."
    }
  ]
},
"es": {
  "title": "Sobre esta guía independiente",
  "description": "Cómo elegimos lugares, verificamos fuentes y gestionamos tus datos.",
  "sections": [
    {
      "title": "Quién mantiene la guía",
      "text": "Este proyecto independiente se mantiene mediante el repositorio Website-Japan. No es una autoridad turística oficial ni una agencia de reservas. El historial y las correcciones son públicos en GitHub."
    },
    {
      "title": "Fuentes y correcciones",
      "text": "Las introducciones de prefecturas se basan en JNTO; los accesos y entradas comprobados, en los operadores. Las coordenadas y etiquetas del mapa se atribuyen a OpenStreetMap. La fecha de revisión solo cubre la información indicada, sin garantizar que todo esté actualizado. Los datos desconocidos se señalan. Envía la URL, la corrección y una fuente oficial."
    },
    {
      "title": "Tu viaje y privacidad",
      "text": "Los viajes y la apariencia se guardan en este navegador. No hay cuentas ni sincronización en la nube entre dispositivos. Borrar los datos del navegador elimina el viaje. Las copias y archivos sin conexión pueden contener alojamiento, fechas y notas privadas: revísalos antes de compartir. La web no tiene formularios de reserva o pago, analítica de visitantes ni rastreadores publicitarios."
    },
    {
      "title": "Servicios externos",
      "text": "El mapa interactivo solicita datos a servidores de teselas de OpenStreetMap, que reciben información habitual como la IP y la web de origen. Google Maps, webs oficiales y GitHub solo se abren al seguir sus enlaces y aplican sus políticas. El alojamiento puede guardar registros; el operador debe publicar los plazos de conservación de su despliegue."
    },
    {
      "title": "Accesibilidad y paisajes ilustrados",
      "text": "Puedes usar lista en vez de mapa, teclado, temas de día/noche y pausa común de animaciones. La reducción de movimiento del sistema tiene prioridad. La miniatura 3D es ilustrativa, no un modelo geográfico. Informa de barreras mediante el enlace del proyecto sin incluir datos privados del viaje."
    }
  ]
},
  ja: {
    title: 'この独立した旅行ガイドについて',
    description: '場所の選び方、出典の確認、データの取り扱い。',
    sections: [
      {
        title: '運営について',
        text: 'Website-Japanリポジトリで管理する独立したプロジェクトです。公的な観光機関や予約代理店ではありません。変更履歴や修正はGitHubで公開しています。',
      },
      {
        title: '出典と訂正',
        text: '都道府県の紹介はJNTO、確認済みのアクセス・料金は運営者の案内を参照しています。地図の座標と地名はOpenStreetMapに基づきます。確認日は併記された情報に対するもので、すべての情報の最新性を保証するものではありません。未確認の項目は明示しています。訂正の際はページURLと公式の出典をお知らせください。',
      },
      {
        title: '旅程とプライバシー',
        text: '旅程と表示設定はこのブラウザに保存します。アカウントや端末間のクラウド同期はありません。ブラウザデータを削除すると旅程も消えます。バックアップとオフラインファイルには宿泊先・日付・メモが含まれる場合があります。共有前に確認してください。予約・決済フォーム、アクセス解析、広告トラッカーは設置していません。',
      },
      {
        title: '外部サービス',
        text: '地図の表示時はOpenStreetMapのタイルサーバーに接続し、IPアドレスや参照元など通常の通信情報を送信します。Google Maps、公式観光サイト、GitHubはリンクを開いた場合に各サービスの方針が適用されます。ホスティング側でアクセスログを保存する場合があり、公開環境の保持期間は運営者が別途案内する必要があります。',
      },
      {
        title: 'アクセシビリティと模型',
        text: '地図の代わりに一覧を使えます。キーボード操作、昼夜テーマ、共通のアニメーション停止に対応し、OSの動きを減らす設定を優先します。3D模型はイメージであり地理的な地図ではありません。利用上の問題は個人的な旅程を含めず、プロジェクトの報告リンクからお知らせください。',
      },
    ],
  },
  th: {
    title: 'เกี่ยวกับคู่มือท่องเที่ยวอิสระนี้',
    description: 'แนวทางคัดเลือกสถานที่ ตรวจแหล่งข้อมูล และดูแลข้อมูลของคุณ',
    sections: [
      {
        title: 'ผู้ดูแลคู่มือ',
        text: 'โครงการอิสระนี้ดูแลผ่าน repository Website-Japan ไม่ใช่องค์การท่องเที่ยวทางการหรือตัวแทนรับจอง สามารถดูประวัติการปรับปรุงและแจ้งข้อผิดพลาดผ่าน GitHub ได้',
      },
      {
        title: 'แหล่งข้อมูลและการแก้ไข',
        text: 'ข้อมูลจังหวัดอ้างอิง JNTO ส่วนการเดินทางและค่าเข้าที่ตรวจแล้วอ้างอิงผู้ให้บริการ พิกัดและชื่อบนแผนที่อ้างอิง OpenStreetMap วันที่ตรวจหมายถึงข้อมูลที่ระบุข้างกัน ไม่ได้รับรองว่าทุกรายละเอียดเป็นปัจจุบัน ข้อมูลที่ยังไม่ได้ตรวจจะแสดงไว้ชัดเจน หากพบข้อผิดพลาด โปรดระบุ URL ของหน้าและแหล่งทางการที่ใช้อ้างอิง',
      },
      {
        title: 'ทริปและความเป็นส่วนตัว',
        text: 'ทริปและการตั้งค่าการแสดงผลเก็บในเบราว์เซอร์นี้ ไม่มีบัญชีหรือการซิงก์บนคลาวด์ข้ามอุปกรณ์ การล้างข้อมูลเบราว์เซอร์ทำให้ทริปหาย ไฟล์สำรองและไฟล์ออฟไลน์อาจมีที่พัก วันที่ และหมายเหตุส่วนตัว โปรดตรวจสอบก่อนแชร์ เว็บไม่มีแบบฟอร์มจองหรือชำระเงิน และไม่ได้ติดตั้งระบบวิเคราะห์ผู้เข้าชมหรือตัวติดตามโฆษณา',
      },
      {
        title: 'บริการภายนอก',
        text: 'เมื่อแสดงแผนที่จะมีการเชื่อมต่อเซิร์ฟเวอร์แผนที่ OpenStreetMap ซึ่งได้รับข้อมูลการเชื่อมต่อทั่วไป เช่น IP และเว็บไซต์ต้นทาง เมื่อกดลิงก์ Google Maps เว็บไซต์ผู้ให้บริการ หรือ GitHub จะอยู่ภายใต้นโยบายของบริการนั้น ระบบโฮสติ้งอาจเก็บบันทึกการเข้าถึง ผู้ดูแลต้องระบุระยะเวลาเก็บข้อมูลของระบบที่เผยแพร่จริงเพิ่มเติม',
      },
      {
        title: 'การเข้าถึงและฉากจำลอง',
        text: 'ใช้รายการแทนแผนที่ได้ รองรับคีย์บอร์ด ธีมกลางวันและกลางคืน และการหยุดแอนิเมชันร่วมกัน โดยให้ความสำคัญกับการลดการเคลื่อนไหวที่ตั้งในอุปกรณ์ ฉาก 3D เป็นภาพประกอบ ไม่ใช่แผนที่ภูมิศาสตร์ แจ้งปัญหาการใช้งานผ่านลิงก์โครงการได้โดยไม่ใส่ข้อมูลทริปส่วนตัว',
      },
    ],
  },
}
