import type { Locale } from '@/i18n/config'

type Localized<T> = Record<Locale, T>
export const experiences = [
  {
    kanji: '茶',
    image: '/images/kyoto.jpg',
    source: 'https://www.japan.travel/en/guide/tea-ceremony/',
    en: {
      title: 'A moment for tea',
      text: 'Slow down with a bowl of matcha. A guided tea experience opens a small window into Japanese hospitality; check the language and booking requirements.',
    },
    ja: {
      title: '一服のお茶と、静かな時間',
      text: '抹茶を味わいながら、もてなしの心に触れるひととき。茶道体験は、対応言語や予約の要否を事前に確認しましょう。',
    },
  },
  {
    kanji: '食',
    image: '/images/osaka.jpg',
    source: 'https://www.japan.travel/en/destinations/kansai/osaka/',
    en: {
      title: 'Let your appetite lead',
      text: 'Takoyaki in Osaka, noodles in a neighborhood shop, a seasonal sweet with tea. Choose a few local tastes and enjoy them where the shop asks you to eat.',
    },
    ja: {
      title: 'おいしいものを、道しるべに',
      text: '大阪のたこ焼き、街の麺料理、季節の和菓子。地域ならではの味を少しずつ。飲食は店が案内する場所で楽しみましょう。',
    },
  },
  {
    kanji: '湯',
    image: '/images/hokkaido.jpg',
    source: 'https://faq.japan-travel.jnto.go.jp/en/guide/how-to-best-enjoy-onsen/',
    en: {
      title: 'The art of doing less',
      text: 'Make a bath part of the journey. Wash before entering an onsen, keep towels out of the water, and ask each facility about tattoos and private bathing.',
    },
    ja: {
      title: '何もしない、温泉の時間',
      text: '旅の途中に、湯につかるひとときを。入浴前に体を洗い、タオルは湯船の外へ。タトゥーや貸切風呂の利用条件は施設ごとに確認を。',
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
    ja: {
      title: '一つの街を、深く歩く',
      text: 'チェックリストを少し短くして、街を歩く朝に。小さな店をのぞき、カフェで休み、大通りと路地の表情の違いを楽しみましょう。',
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
    ja: {
      title: '少し違う角度から、山を見る',
      text: '頂上だけでなく、湖畔の道にも山の魅力があります。天候や体力に合う散策を。登山をする場合は、別途、入念な計画が必要です。',
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
    ja: {
      title: '島のリズムで、過ごす',
      text: '島の話に耳を傾け、琉球の料理を味わい、海辺で午後を過ごす。海の生きものを大切にし、遊泳は現地の案内に従いましょう。',
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
    ja: {
      title: 'はじめての日本、街と古都へ',
      text: '都会の活気、寺院の朝、大阪の夜。東京に到着し、関西から出発する旅程なら、移動の重複を抑えられます。',
      transport: '東京から京都は新幹線、京都から大阪は在来線などで移動。',
    },
    stops: [
      {
        slug: 'tokyo',
        days: 3,
        en: {
          title: 'Tokyo',
          text: 'Use the first day to settle in. Pair Asakusa with nearby walks, and give Shibuya and Meiji Jingu a separate day.',
        },
        ja: {
          title: '東京',
          text: '初日は体を休めながら街に慣れる時間に。浅草周辺と、渋谷・明治神宮は別の日にゆっくり巡りましょう。',
        },
      },
      {
        slug: 'kyoto',
        days: 3,
        en: {
          title: 'Kyoto',
          text: 'Travel west, then choose one district per day: Higashiyama, Arashiyama or the Fushimi area.',
        },
        ja: {
          title: '京都',
          text: '西へ移動したら、東山、嵐山、伏見など、一日一つのエリアを目安に散策。',
        },
      },
      {
        slug: 'osaka',
        days: 1,
        en: {
          title: 'Osaka',
          text: 'Leave time for the airport journey. If your departure allows, take a final neighborhood walk and enjoy a local meal.',
        },
        ja: {
          title: '大阪',
          text: '空港への移動時間を確保し、出発時刻に余裕があれば街歩きと地元の食事を楽しみましょう。',
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
    ja: {
      title: '東京の街と、北の空',
      text: '二つの拠点で、違うリズムを味わう旅。東京のあとに北海道の一部をじっくり巡り、島全体を急いで移動しない計画です。',
      transport: '東京から新千歳へ航空便。札幌・小樽周辺は鉄道や事前に確認したバスを利用。',
    },
    stops: [
      {
        slug: 'tokyo',
        days: 4,
        en: {
          title: 'Tokyo',
          text: 'Choose a few neighborhoods, a museum for a rainy day and an evening without fixed plans.',
        },
        ja: {
          title: '東京',
          text: '気になる街をいくつか選び、雨の日に訪れる美術館と、予定を決めない夜も用意しておきましょう。',
        },
      },
      {
        slug: 'hokkaido',
        days: 6,
        en: {
          title: 'Sapporo & a seasonal escape',
          text: 'Allow a day for the flight. Explore Sapporo and Otaru, then add one seasonal outing with confirmed transport. Keep a weather buffer before departure.',
        },
        ja: {
          title: '札幌と、季節の小旅行',
          text: '航空移動に一日を見込み、札幌と小樽を散策。交通を確認して季節の小旅行を一つ追加し、帰路の前には天候への余裕を。',
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
    ja: {
      title: 'ゆっくりつなぐ、東から西へ',
      text: '定番の街に、富士山を眺める余白を加えた旅。東京着・関西発を基本に、往復便なら東京に戻る移動日も別途確保しましょう。',
      transport:
        '東京から河口湖は鉄道・バス。京都へは東海道新幹線方面への乗り継ぎを確認し、大阪へは鉄道で移動。',
    },
    stops: [
      {
        slug: 'tokyo',
        days: 5,
        en: {
          title: 'Tokyo',
          text: 'Settle in and explore one area at a time. Leave room for museums, neighborhood cafés and a flexible day.',
        },
        ja: {
          title: '東京',
          text: '旅に慣れながら一つずつ街を散策。美術館やカフェ、予定を調整できる一日も入れましょう。',
        },
      },
      {
        slug: 'mount-fuji',
        days: 2,
        en: {
          title: 'Fuji Five Lakes',
          text: 'Stay overnight for more than one chance at a clear view. Pick a lakeside walk and a rainy-day alternative.',
        },
        ja: {
          title: '富士五湖',
          text: '一泊して、晴れた富士山に出会う機会を増やす旅に。湖畔の散歩と、雨の日の行き先を選びましょう。',
        },
      },
      {
        slug: 'kyoto',
        days: 4,
        en: {
          title: 'Kyoto',
          text: 'Balance popular temples with garden visits and a tea experience. Keep each day geographically compact.',
        },
        ja: {
          title: '京都',
          text: '人気の寺院に、庭園やお茶の体験を組み合わせて。一日の移動範囲を小さくまとめると快適です。',
        },
      },
      {
        slug: 'osaka',
        days: 3,
        en: {
          title: 'Osaka',
          text: 'Enjoy the city’s food culture and castle park. Keep the final day light around your departure arrangements.',
        },
        ja: {
          title: '大阪',
          text: '食文化と大阪城公園を楽しみ、最後の日は出発の手配に合わせて軽めの予定に。',
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
    ja: {
      day: [
        '静かな時間帯に東山へ。寺院や庭園を一つ選び、急がずに楽しみましょう。',
        '昼食のあとは予約した茶道体験や工芸品の店へ。私道や撮影禁止の表示を守って散策を。',
        '鴨川沿いを歩き、近くの店で夕食を。宿に戻る時間にも余裕を残しましょう。',
      ],
      food: '湯豆腐、京野菜、季節の和菓子などに注目。野菜料理にも魚のだしが使われる場合があるため、食事制限があれば確認を。',
      extra: '嵐山や伏見は別の日にすると、市内を何度も横断せずに過ごせます。',
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
    ja: {
      day: [
        '浅草寺と周辺の街からスタート。参拝する人の妨げにならないよう、落ち着いて散策しましょう。',
        '隅田川のほうへ歩くか、天候に合わせて近くの文化施設へ。昼食やカフェで休む時間も大切に。',
        '夜も東側のエリアで食事を楽しめば、長い電車移動を減らせます。宿への帰り道を確認しましょう。',
      ],
      food: 'そば、天ぷら、小さな寿司店などを楽しんで。メニューや価格、予約条件は店ごとに異なります。アレルギーは注文前に確認を。',
      extra: '渋谷、原宿、明治神宮は別の日にまとめると、街を横断する移動を減らせます。',
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
    ja: {
      day: [
        '大阪城公園の散歩から一日を始めます。天守閣の博物館に入る場合は、別途入場情報と時間を確認。',
        '昼はなんば方面へ移動し、食事と商店街巡りを。店を詰め込みすぎず、気になる味を少しずつ。',
        '日が暮れたら道頓堀の明かりを楽しんで。橋の通行を妨げず、宿へ戻る列車の時間も確認しましょう。',
      ],
      food: 'たこ焼きや大阪のお好み焼きから味わってみましょう。だし、魚介、小麦が使われることが多いため、アレルギーは店に確認を。',
      extra: 'もう一日あれば、にぎやかな運河沿いを離れた街の散策もおすすめです。',
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
  },
}
