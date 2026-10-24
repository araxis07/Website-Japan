import type { Locale } from '@/i18n/config'

// Editorial planning prompts, not a weather forecast or a transport timetable.
export const regionalPlanning: Record<string, Record<Locale, string>> = {
  hokkaido: {
    en: 'Start with one base and compare travel times before adding another city. In snowy conditions, leave a spare travel window and choose footwear for slippery paths. Keep a museum or café day available if outdoor plans change.',
    ja: 'まず一つの拠点を決め、移動時間を確認してから街を追加。雪の日は移動に余裕を取り、滑りにくい靴を用意。屋外の予定を変更できるよう博物館やカフェの候補も。',
    th: 'เริ่มจากเมืองฐานเดียวแล้วตรวจเวลาเดินทางก่อนเพิ่มเมือง เมื่อมีหิมะให้เผื่อเวลาและเลือกรองเท้ากันลื่น เตรียมพิพิธภัณฑ์หรือคาเฟ่ไว้สลับกับกิจกรรมกลางแจ้ง',
  },
  tohoku: {
    en: 'Pair a city base with one nearby outing rather than crossing the whole region each day. Check the last local train or bus before leaving. For mountain or winter visits, confirm access on the day and keep a city alternative.',
    ja: '都市の拠点と近郊の一か所を組み合わせ、毎日の広域移動を控えめに。出発前に帰りの最終列車・バスを確認。山や冬の旅は当日の通行情報と市街地の代案を用意。',
    th: 'ใช้เมืองหนึ่งเป็นฐานแล้วเลือกเที่ยวใกล้เคียงวันละพื้นที่ ตรวจรถไฟหรือรถบัสเที่ยวกลับสุดท้ายก่อนออกเดินทาง หากขึ้นภูเขาหรือเที่ยวฤดูหนาว ให้ตรวจการเข้าถึงในวันนั้นและเตรียมแผนในเมืองไว้ด้วย',
  },
  kanto: {
    en: 'Group city visits by neighborhood and note the station exit closest to each stop. Treat mountain and coastal outings as separate days. For wet weather, choose an indoor stop near your base instead of adding a long transfer.',
    ja: '市街地はエリアごとにまとめ、目的地に近い駅出口を記録。山や海辺への小旅行は別の日に。雨の日は長い乗り換えを増やさず、拠点近くの屋内施設へ。',
    th: 'จัดสถานที่ในเมืองตามย่านและจดทางออกสถานีที่ใกล้แต่ละจุด แยกทริปภูเขาหรือชายฝั่งเป็นคนละวัน วันฝนตกเลือกสถานที่ในร่มใกล้ที่พักเพื่อลดการต่อรถไกล',
  },
  chubu: {
    en: 'Decide between a coastal, city or mountain route before booking bases. Check seasonal access for mountain roads and trails. A city forecast does not describe conditions at elevation; keep a lower-altitude alternative and verify the return service.',
    ja: '海沿い・都市・山のどのルートかを決めてから宿泊拠点を予約。山道や登山道の季節規制を確認。市街地の予報と山の状況は別なので、低地の代案と帰りの交通も確認。',
    th: 'เลือกก่อนว่าจะเที่ยวชายฝั่ง เมือง หรือภูเขาแล้วค่อยจองเมืองฐาน ตรวจการเปิดถนนและเส้นทางภูเขาตามฤดูกาล อากาศในเมืองต่างจากพื้นที่สูง เตรียมทางเลือกในพื้นที่ต่ำและตรวจรถเที่ยวกลับ',
  },
  kansai: {
    en: 'Choose a station base that matches your planned cities; compare direct services before changing hotels. Keep temple walks and museum visits flexible. In busy periods, reserve only the activities that require it and leave room between bookings.',
    ja: '訪れる街に合う駅を宿泊拠点に。ホテルを移る前に直通列車を比較。寺社散策と博物館を柔軟に組み合わせ、混雑期は必要な予約に絞って予定の間に余裕を。',
    th: 'เลือกที่พักใกล้สถานีที่เชื่อมเมืองในแผน ตรวจรถตรงก่อนตัดสินใจย้ายโรงแรม สลับเดินวัดกับพิพิธภัณฑ์ได้ตามสภาพอากาศ ช่วงคนเยอะจองกิจกรรมที่จำเป็นและเว้นเวลาระหว่างรายการ',
  },
  chugoku: {
    en: 'Choose which coast or inland area to explore, then check connections from your base. For island outings, check both ferry directions and weather-related notices. Keep a mainland visit available if a sailing changes.',
    ja: '海側か内陸か、訪れる範囲を決めて拠点からの接続を確認。島へは往復の船便と天候による運航案内を確認し、欠航時に備えて本土の行き先も用意。',
    th: 'เลือกก่อนว่าจะเที่ยวฝั่งทะเลหรือพื้นที่ด้านใน แล้วตรวจการต่อรถจากเมืองฐาน ทริปเกาะต้องตรวจเรือทั้งไปและกลับรวมถึงประกาศสภาพอากาศ เตรียมสถานที่บนแผ่นดินไว้สลับเมื่อเรือเปลี่ยนแปลง',
  },
  shikoku: {
    en: 'Avoid packing a whole-island loop into short day trips. Match your base to the valley, pilgrimage section or coast you want to see. Check the last bus before a rural walk and arrange a wet-weather option nearby.',
    ja: '短い日帰りで島全体を詰め込まず、渓谷・遍路道・海辺など目的に合う拠点を。郊外を歩く前に最終バスを確認し、近くの雨天の代案も用意。',
    th: 'ไม่ควรอัดเส้นทางรอบเกาะไว้ในทริปสั้น เลือกฐานให้ตรงกับหุบเขา ช่วงเส้นทางแสวงบุญ หรือชายฝั่งที่สนใจ ตรวจรถบัสสุดท้ายก่อนเดินในชนบทและเตรียมทางเลือกวันฝนตกใกล้กัน',
  },
  kyushu: {
    en: 'Build the route around a few bases rather than returning across the region every night. Before visiting volcanic areas, consult current official access notices. Keep an urban or indoor alternative and extra time before your onward departure.',
    ja: '毎晩広域を往復せず、いくつかの拠点をつないだルートに。火山周辺は最新の公式立入情報を確認。都市や屋内の代案と、次の出発前の余裕を確保。',
    th: 'เชื่อมเมืองฐานไม่กี่แห่งแทนการเดินทางย้อนข้ามภูมิภาคทุกคืน ก่อนเที่ยวบริเวณภูเขาไฟให้ตรวจประกาศการเข้าถึงทางการล่าสุด เตรียมแผนในเมืองหรือในร่มและเผื่อเวลาก่อนเดินทางต่อ',
  },
  okinawa: {
    en: 'Choose the island first, then check transport from the airport or port to your accommodation. Leave flexibility around ferry or flight connections and consult typhoon notices. Use a cultural or museum visit as an alternative to a sea day.',
    ja: '最初に島を選び、空港・港から宿までの交通を確認。船や飛行機の接続には余裕を持ち、台風情報を確認。海の予定を文化施設や博物館へ変更できるように。',
    th: 'เลือกเกาะก่อนแล้วตรวจการเดินทางจากสนามบินหรือท่าเรือถึงที่พัก เผื่อความยืดหยุ่นในการต่อเรือและเครื่องบิน พร้อมตรวจประกาศพายุ เตรียมสถานที่ด้านวัฒนธรรมหรือพิพิธภัณฑ์ไว้แทนวันเที่ยวทะเล',
  },
}
export const searchAliases: Record<string, string> = {
  tokyo: 'โตเกียว โตเกียวโท とうきょう 東京',
  kyoto: 'เกียวโต เคียวโต きょうと 京都',
  osaka: 'โอซาก้า โอซากา おおさか 大阪',
  hokkaido: 'ฮอกไกโด ฮ็อกไกโด ซัปโปโร ซัปโปะโระ ほっかいどう さっぽろ',
  okinawa: 'โอกินาว่า โอกินาวะ โอกินาวา おきなわ なは',
  yamanashi:
    'ฟูจิ ฟูจิซัง คาวากุจิโกะ คาวากุจิโกะ ยามานาชิ やまなし かわぐちこ 富士山',
  fukuoka: 'ฟุกุโอกะ ฟูกูโอกะ ふくおか',
  nara: 'นารา นาระ なら',
}
