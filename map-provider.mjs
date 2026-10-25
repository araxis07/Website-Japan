const url =
  process.env.NEXT_PUBLIC_MAP_TILE_URL ||
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const creditName =
  process.env.NEXT_PUBLIC_MAP_CREDIT_NAME || 'OpenStreetMap contributors'
const creditUrl =
  process.env.NEXT_PUBLIC_MAP_CREDIT_URL ||
  'https://www.openstreetmap.org/copyright'
const parsed = new URL(url)
const credit = new URL(creditUrl)
if (
  parsed.protocol !== 'https:' ||
  parsed.username ||
  parsed.password ||
  !['{z}', '{x}', '{y}'].every((token) => url.includes(token)) ||
  credit.protocol !== 'https:' ||
  credit.username ||
  credit.password ||
  /[<>\r\n]/.test(creditName)
)
  throw new Error(
    'Map provider needs an HTTPS tile template, plain credit name and HTTPS credit URL',
  )
if (
  process.env.NEXT_PUBLIC_MAP_TILE_URL &&
  (!process.env.NEXT_PUBLIC_MAP_CREDIT_NAME ||
    !process.env.NEXT_PUBLIC_MAP_CREDIT_URL)
)
  throw new Error('Custom map tiles require provider attribution')
export const mapProvider = {
  url,
  origin: parsed.origin,
  creditName,
  creditUrl: credit.href,
}
