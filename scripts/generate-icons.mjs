import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import assert from 'node:assert/strict'

const publicDir = new URL('../public/', import.meta.url)
const source = await readFile(new URL('icon.svg', publicDir))
for (const size of [16, 32, 48, 64, 72, 96, 120, 128, 144, 152, 192, 384, 512]) {
  await sharp(source)
    .resize(size, size)
    .png()
    .toFile(fileURLToPath(new URL(`icon-${size}x${size}.png`, publicDir)))
}
await sharp(source)
  .resize(180, 180)
  .png()
  .toFile(fileURLToPath(new URL('apple-touch-icon.png', publicDir)))
// ICO supports an embedded PNG; Sharp cannot write the ICO container itself.
const png = await sharp(source).resize(32, 32).png().toBuffer()
const header = Buffer.alloc(22)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(1, 4)
header[6] = 32
header[7] = 32
header.writeUInt16LE(1, 10)
header.writeUInt16LE(32, 12)
header.writeUInt32LE(png.length, 14)
header.writeUInt32LE(22, 18)
const ico = Buffer.concat([header, png])
assert.equal(ico.readUInt32LE(14) + ico.readUInt32LE(18), ico.length)
assert.equal((await sharp(ico.subarray(22)).metadata()).width, 32)
await writeFile(new URL('favicon.ico', publicDir), ico)
console.log('Generated application icons and verified the ICO image.')
