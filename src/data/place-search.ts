import type { Place } from './places'
export const placeSearchAliases: Record<string, string> = {
  kiyomizu: 'kiyomizudera kiyomizu dera きよみずでら คิโยะมิซุ คิโยมิสึ',
  sensoji: 'sensōji senso ji asakusa せんそうじ あさくさ เซนโซจิ อาซากุสะ',
  gion: 'ぎおん กิอง',
  'kyoto-museum': 'きょうとこくりつはくぶつかん',
  'tokyo-museum': 'とうきょうこくりつはくぶつかん',
  kawaguchiko: 'kawaguchi ko かわぐちこ คาวาคุจิโกะ',
  'fuji-center': 'ふじさんせかいいさんせんたー ฟูจิซัง',
  dotonbori: 'dōtonbori dotombori どうとんぼり โดทงโบะริ',
  odori: 'ōdōri おおどおり โอโดะริ',
  'beer-museum': 'さっぽろびーるはくぶつかん',
  makishi: 'まきしこうせついちば มาคิชิ',
  tsuboya: 'つぼややちむんどおり สึโบยะ',
  'pref:kyoto:fushimi-inari-taisha':
    'fushimi inari ふしみいなり ฟูชิมิอินาริ ฟุชิมิอินาริ',
  'pref:nagano:matsumoto-castle':
    'matsumoto jo まつもとじょう มัตสึโมโตะ มัตสึโมโต',
  'pref:hyogo:himeji-castle': 'himeji jo ひめじじょう ฮิเมจิ ฮิเมะจิ',
  'pref:ishikawa:kenrokuen': 'kenroku en けんろくえん เคนโรคุเอ็น เค็นโรคุเอ็น',
  'pref:tochigi:nikko-toshogu':
    'nikko toshogu nikkō tōshōgū にっこうとうしょうぐう นิกโก้โทโชกุ นิกโกโทโชกุ',
  'pref:nara:todaiji-temple': 'todai ji tōdaiji とうだいじ โทไดจิ โทไดจิ',
  'pref:kanagawa:kotoku-in':
    'kotoku in kōtokuin kamakura daibutsu こうとくいん かまくらだいぶつ โคโตคุอิน ไดบุตสึคามาคุระ',
  'pref:gifu:takayama-jinya':
    'takayama jinya たかやまじんや ทาคายามะจินยะ ทะคะยะมะจินยะ',
  'pref:aichi:nagoya-castle': 'nagoya jo なごやじょう นาโกย่า นาโกยา',
  'pref:aomori:hirosaki-castle': 'hirosaki jo ひろさきじょう ฮิโรซากิ ฮิโรซะกิ',
}
export const normalizeSearch = (text: string) =>
  text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[-\s]/g, '')
export const placeSearchText = (place: Place) =>
  Object.values(place.names).join(' ') +
  ' ' +
  (placeSearchAliases[place.id] || '')

// Suggest a single missing/extra/changed Latin or Thai character; never rewrite the query.
export function searchSuggestions(query: string, candidates: Place[]) {
  const q = normalizeSearch(query.trim())
  if (!/^[a-z\u0e00-\u0e7f]{4,60}$/.test(q)) return []
  const near = (word: string) => {
    if (Math.abs(word.length - q.length) > 1) return false
    let a = 0,
      b = 0,
      edits = 0
    while (a < q.length && b < word.length) {
      if (q[a] === word[b]) {
        a++
        b++
        continue
      }
      if (++edits > 1) return false
      if (q.length >= word.length) a++
      if (word.length >= q.length) b++
    }
    return edits + q.length - a + word.length - b === 1
  }
  return candidates
    .filter((place) =>
      [
        ...Object.values(place.names),
        ...(placeSearchAliases[place.id] || '').split(' '),
      ].some((name) => near(normalizeSearch(name))),
    )
    .slice(0, 5)
}
