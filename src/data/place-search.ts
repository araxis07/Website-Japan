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
