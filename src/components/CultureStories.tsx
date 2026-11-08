import Image from 'next/image'
import Link from 'next/link'
import prefecturePhotos from '@/data/prefecture-photos.json'
import { detailPhotos } from '@/data/photos'
import type { Locale } from '@/i18n/config'

type StoryCopy = {
  location: string
  title: string
  text: string
  link: string
}

type CultureCopy = {
  title: string
  intro: string
  stories: [StoryCopy, StoryCopy, StoryCopy]
}

const copy: Record<Locale, CultureCopy> = {
  "ko": {
  "title": "문화를 가까이에서 만나다",
  "intro": "사찰 경내, 공예 마을, 시장 골목을 걸으며 각 지역의 개성을 만드는 일상의 모습을 만나 보세요.",
  "stories": [
    {
      "location": "나라",
      "title": "배려하며 둘러보는 사찰",
      "text": "나라의 사찰과 신사를 방문해 보세요. 사진 촬영과 신발을 벗는 장소에 관한 안내를 확인하고 다른 방문객을 배려해 주세요.",
      "link": "나라 둘러보기"
    },
    {
      "location": "가나자와 · 이시카와",
      "title": "정원, 공예와 옛 거리",
      "text": "겐로쿠엔과 히가시 차야 거리를 걸어 보세요. 가나자와의 정원, 공예와 보존된 옛 마을을 여유롭게 둘러보세요.",
      "link": "가나자와 둘러보기"
    },
    {
      "location": "나하 · 오키나와",
      "title": "나하에서 만나는 오키나와",
      "text": "현립 박물관에서 류큐 문화를 알아보고 나하의 시장 골목과 향토 음식을 즐겨 보세요.",
      "link": "오키나와 둘러보기"
    }
  ]
},
  "zh-CN": {
  "title": "走近当地文化",
  "intro": "走进寺院、工艺街区和市场小巷，发现赋予各地独特个性的日常细节。",
  "stories": [
    {
      "location": "奈良",
      "title": "心怀体谅，参访寺社",
      "text": "探访奈良的寺院和神社。留意拍照和脱鞋提示，并为其他访客留出空间。",
      "link": "探索奈良"
    },
    {
      "location": "金泽 · 石川",
      "title": "庭园、工艺与老街",
      "text": "漫步兼六园和东茶屋街，留出时间欣赏金泽的庭园、工艺和保存完好的老街区。",
      "link": "探索金泽"
    },
    {
      "location": "那霸 · 冲绳",
      "title": "从那霸认识冲绳",
      "text": "在县立博物馆了解琉球文化，再到那霸的市场街道散步，品尝当地美食。",
      "link": "探索冲绳"
    }
  ]
},
  "vi": {
  "title": "Đến gần hơn với văn hóa địa phương",
  "intro": "Khám phá khuôn viên chùa, phố nghề và đường chợ qua những nét sinh hoạt làm nên bản sắc từng nơi.",
  "stories": [
    {
      "location": "Nara",
      "title": "Thăm đền chùa với sự tôn trọng",
      "text": "Khám phá chùa và đền ở Nara. Chú ý biển hướng dẫn chụp ảnh, nơi cần cởi giày và nhường không gian cho khách khác.",
      "link": "Khám phá Nara"
    },
    {
      "location": "Kanazawa · Ishikawa",
      "title": "Vườn, nghề thủ công và phố cổ",
      "text": "Dạo vườn Kenrokuen và khu Higashi Chaya. Dành thời gian cho những khu vườn, nghề thủ công và phố cổ được gìn giữ ở Kanazawa.",
      "link": "Khám phá Kanazawa"
    },
    {
      "location": "Naha · Okinawa",
      "title": "Tìm hiểu Okinawa qua Naha",
      "text": "Tìm hiểu văn hóa Ryukyu tại bảo tàng tỉnh, rồi khám phá các con phố chợ và ẩm thực địa phương ở Naha.",
      "link": "Khám phá Okinawa"
    }
  ]
},
  "fr": {
  "title": "La culture, au plus près",
  "intro": "Temples, quartiers d’artisans et rues commerçantes : découvrez les détails du quotidien qui donnent à chaque lieu son caractère.",
  "stories": [
    {
      "location": "Nara",
      "title": "Visiter les temples avec attention",
      "text": "Découvrez les temples et sanctuaires de Nara. Respectez les consignes de photographie et de retrait des chaussures, et laissez de la place aux autres visiteurs.",
      "link": "Découvrir Nara"
    },
    {
      "location": "Kanazawa · Ishikawa",
      "title": "Jardins, artisanat et rues anciennes",
      "text": "Promenez-vous dans le jardin Kenrokuen et le quartier Higashi Chaya. Prenez le temps de découvrir les jardins, l’artisanat et les quartiers préservés de Kanazawa.",
      "link": "Découvrir Kanazawa"
    },
    {
      "location": "Naha · Okinawa",
      "title": "Découvrir Okinawa à travers Naha",
      "text": "Découvrez la culture des Ryukyu au musée préfectoral, puis explorez les rues du marché et la cuisine locale de Naha.",
      "link": "Découvrir Okinawa"
    }
  ]
},
  "es": {
  "title": "La cultura, de cerca",
  "intro": "Recorre templos, barrios de artesanos y calles de mercado para descubrir los detalles cotidianos que dan carácter a cada lugar.",
  "stories": [
    {
      "location": "Nara",
      "title": "Visitar los templos con respeto",
      "text": "Descubre los templos y santuarios de Nara. Respeta las indicaciones sobre fotografías y dónde quitarte los zapatos, y deja espacio a otros visitantes.",
      "link": "Explorar Nara"
    },
    {
      "location": "Kanazawa · Ishikawa",
      "title": "Jardines, artesanía y calles antiguas",
      "text": "Pasea por Kenrokuen y el barrio Higashi Chaya. Dedica tiempo a los jardines, la artesanía y los barrios históricos conservados de Kanazawa.",
      "link": "Explorar Kanazawa"
    },
    {
      "location": "Naha · Okinawa",
      "title": "Conocer Okinawa a través de Naha",
      "text": "Conoce la cultura de Ryukyu en el museo de la prefectura y después recorre los mercados y disfruta de la gastronomía local de Naha.",
      "link": "Explorar Okinawa"
    }
  ]
},
  en: {
    title: 'Culture, seen up close',
    intro:
      'Temple grounds, craft districts and market streets. Explore different places and the everyday details that give each its character.',
    stories: [
      {
        location: 'Nara',
        title: 'A thoughtful temple visit',
        text: 'Explore Nara’s temples and shrines. Follow photography and shoe-removal signs, and leave room for other visitors.',
        link: 'Explore Nara',
      },
      {
        location: 'Kanazawa · Ishikawa',
        title: 'Gardens, craft and old streets',
        text: 'Walk through Kenrokuen and the streets of Higashi Chaya. Make time for Kanazawa’s gardens, craft and preserved neighborhoods.',
        link: 'Explore Kanazawa',
      },
      {
        location: 'Naha · Okinawa',
        title: 'Meet Okinawa through Naha',
        text: 'Explore Ryukyu culture at the prefectural museum, then spend time in Naha’s market streets and local food scene.',
        link: 'Explore Okinawa',
      },
    ],
  },
  ja: {
    title: '土地の文化に、もう一歩近く',
    intro:
      '寺社の境内、工芸の街、市場の通り。それぞれの土地を歩き、その場所らしさをつくる日々の風景に目を向けてみませんか。',
    stories: [
      {
        location: '奈良',
        title: '心を配る、寺社めぐり',
        text: '奈良の寺院や神社を訪ねる旅。撮影や靴を脱ぐ場所の表示を確認し、ほかの参拝者にも配慮しましょう。',
        link: '奈良を知る',
      },
      {
        location: '金沢・石川',
        title: '庭園、工芸、古い街並み',
        text: '兼六園やひがし茶屋街を歩き、金沢の庭園や工芸、受け継がれてきた街並みをゆっくり訪ねてみましょう。',
        link: '金沢を知る',
      },
      {
        location: '那覇・沖縄',
        title: '那覇から出会う沖縄',
        text: '県立博物館で琉球文化に触れたら、那覇の市場の通りへ。街歩きと地元の食を楽しむ時間も旅の一部に。',
        link: '沖縄を知る',
      },
    ],
  },
  th: {
    title: 'มองวัฒนธรรมให้ใกล้ขึ้น',
    intro:
      'จากลานวัดและศาลเจ้า สู่ย่านงานฝีมือและถนนตลาด เดินสำรวจแต่ละพื้นที่ผ่านรายละเอียดในชีวิตประจำวันซึ่งทำให้แต่ละแห่งมีเสน่ห์ต่างกัน',
    stories: [
      {
        location: 'นารา',
        title: 'เยือนวัดและศาลเจ้าอย่างใส่ใจ',
        text: 'สำรวจวัดและศาลเจ้าในนารา อ่านป้ายเรื่องการถ่ายภาพและจุดที่ต้องถอดรองเท้า พร้อมเว้นพื้นที่ให้ผู้มาเยือนคนอื่น',
        link: 'สำรวจนารา',
      },
      {
        location: 'คานาซาวะ · อิชิคาวะ',
        title: 'สวน งานฝีมือ และย่านเก่า',
        text: 'เดินชมสวนเค็นโรคุเอ็นและย่านฮิกาชิชายะ เผื่อเวลาให้สวน งานฝีมือ และย่านเก่าที่ได้รับการอนุรักษ์ของคานาซาวะ',
        link: 'สำรวจคานาซาวะ',
      },
      {
        location: 'นาฮะ · โอกินาวะ',
        title: 'รู้จักโอกินาวะผ่านเมืองนาฮะ',
        text: 'เรียนรู้วัฒนธรรมริวกิวที่พิพิธภัณฑ์ประจำจังหวัด แล้วใช้เวลาเดินถนนตลาดและลองอาหารท้องถิ่นในนาฮะ',
        link: 'สำรวจโอกินาวะ',
      },
    ],
  },
}

const stories = [
  { id: 'nara', href: '/prefectures/nara#places', photo: prefecturePhotos.nara },
  {
    id: 'kanazawa',
    href: '/prefectures/ishikawa#places',
    photo: prefecturePhotos.ishikawa,
  },
  { id: 'okinawa', href: '/destinations/okinawa#places', photo: detailPhotos.okinawa },
] as const

export default function CultureStories({ lang }: { lang: Locale }) {
  const labels = copy[lang]

  return (
    <section
      id="culture"
      className="culture-stories section container"
      aria-labelledby="culture-title"
    >
      <div className="section-heading">
        <div>
          <h2 id="culture-title">{labels.title}</h2>
          <p>{labels.intro}</p>
        </div>
        <span className="culture-vertical" aria-hidden="true" lang="ja">
          <span>暮</span>
          <span>ら</span>
          <span>し</span>
          <span>と</span>
          <span>文</span>
          <span>化</span>
        </span>
      </div>
      <div className="culture-grid">
        {stories.map((story, index) => {
          const item = labels.stories[index]
          const titleId = `culture-${story.id}-title`
          const linkId = `culture-${story.id}-link`

          return (
            <Link
              key={story.id}
              href={`/${lang}${story.href}`}
              className="culture-story"
              aria-labelledby={`${titleId} ${linkId}`}
            >
              <div className="culture-photo">
                <Image
                  src={story.photo.src}
                  alt={story.photo.alt[lang]}
                  fill
                  sizes={
                    index === 0
                      ? '(max-width: 950px) 100vw, 45vw'
                      : '(max-width: 750px) 100vw, (max-width: 950px) 50vw, 28vw'
                  }
                />
              </div>
              <div className="culture-copy">
                <p className="culture-number">
                  {String(index + 1).padStart(2, '0')} · {item.location}
                </p>
                <h3 id={titleId}>{item.title}</h3>
                <p>{item.text}</p>
                <span id={linkId} className="text-link culture-link">
                  {item.link} <span aria-hidden="true">↗</span>
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
