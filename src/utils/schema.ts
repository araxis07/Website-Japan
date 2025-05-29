import { Locale } from "@/i18n/config"

export function generateTravelGuideSchema(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    "name": lang === 'ja' ? "日本旅行ガイド" : "Japan Travel Guide",
    "description": lang === 'ja' 
      ? "日本の美しい地域と観光地を発見しよう。47都道府県、9地域の魅力的な旅行情報をお届けします。"
      : "Discover Japan's beautiful regions and destinations with comprehensive travel information.",
    "publisher": {
      "@type": "Organization",
      "name": lang === 'ja' ? "日本旅行ガイド" : "Japan Travel Guide",
      "logo": {
        "@type": "ImageObject",
        "url": "https://japantravel-guide.com/logo.png"
      }
    },
    "inLanguage": lang === 'ja' ? "ja-JP" : "en-US",
    "about": [
      {
        "@type": "Country",
        "name": lang === 'ja' ? "日本" : "Japan"
      }
    ],
    "audience": {
      "@type": "PeopleAudience",
      "audienceType": "Tourists"
    },
    "datePublished": "2025-05-30",
    "dateModified": "2025-05-30"
  }
}

export function generateTouristDestinationSchema(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": lang === 'ja' ? "日本" : "Japan",
    "description": lang === 'ja'
      ? "古代の伝統と現代の革新が出会う美しい国"
      : "A beautiful country where ancient traditions meet modern innovation",
    "touristType": ["Cultural tourism", "Adventure tourism", "Food tourism", "Urban tourism", "Rural tourism"],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "36.204824",
      "longitude": "138.252924"
    }
  }
}

export function generateBreadcrumbSchema(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": lang === 'ja' ? "ホーム" : "Home",
        "item": `https://japantravel-guide.com/${lang}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": lang === 'ja' ? "地域" : "Regions",
        "item": `https://japantravel-guide.com/${lang}#regions`
      }
    ]
  }
}
