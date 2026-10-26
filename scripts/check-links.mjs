import { readFile, mkdir, writeFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
// Reachability is a maintenance signal, not evidence that a page is factually current.
const extract = (text) => [
  ...new Set(text.match(/https:\/\/[^\s"'<>`]+/g) || []),
]
assert.deepEqual(extract('"https://example.test/a" "https://example.test/a"'), [
  'https://example.test/a',
])
const files = [
  'src/data/visit-access.json',
  'src/data/visit-details.ts',
  'src/data/arrival-guides.ts',
  'src/data/travel-notices.ts',
]
const urls = [
  ...new Set(
    (await Promise.all(files.map((file) => readFile(file, 'utf8')))).flatMap(
      extract,
    ),
  ),
]
const results = []
for (let i = 0; i < urls.length; i += 4) {
  await Promise.all(
    urls.slice(i, i + 4).map(async (url) => {
      try {
        const response = await fetch(url, {
          signal: AbortSignal.timeout(12000),
          headers: {
            'User-Agent':
              'Website-Japan source review (https://github.com/araxis07/Website-Japan)',
          },
        })
        await response.body?.cancel()
        results.push({
          url,
          status: response.status,
          finalUrl: response.url,
          reviewNeeded: !response.ok,
        })
      } catch {
        results.push({ url, status: null, reviewNeeded: true })
      }
    }),
  )
}
await mkdir('test-results', { recursive: true })
await writeFile(
  'test-results/source-links.json',
  JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2),
)
console.log(
  `${results.length} official source links checked; ${results.filter((row) => row.reviewNeeded).length} need manual review. See test-results/source-links.json.`,
)
