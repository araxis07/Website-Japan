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

// Suggest a single missing/extra/changed Latin letter; never rewrite the query.
export function searchSuggestions(query: string, candidates: Place[]) {
  const q = normalizeSearch(query.trim())
  if (!/^[a-z]{4,40}$/.test(q)) return []
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
      [place.names.en, ...(placeSearchAliases[place.id] || '').split(' ')].some(
        (name) => near(normalizeSearch(name)),
      ),
    )
    .slice(0, 5)
}
