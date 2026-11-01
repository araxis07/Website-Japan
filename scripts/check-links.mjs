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
  ['venue', 'src/data/visit-access.json'],
  ['venue', 'src/data/visit-details.ts'],
  ['arrival', 'src/data/arrival-guides.ts'],
  ['notice', 'src/data/travel-notices.ts'],
  ['city-guide', 'src/data/guides.ts'],
  ['prefecture', 'src/data/prefectures.ts'],
  ['help', 'src/data/first-visit-help.ts'],
]
function collectSources(documents) {
  const urls = new Map()
  for (const { category, file, text } of documents)
    for (const url of extract(text)) {
      const entry = urls.get(url) || { url, sources: [] }
      entry.sources.push({ category, file })
      urls.set(url, entry)
    }
  return [...urls.values()]
}
const urls = collectSources(
  await Promise.all(
    files.map(async ([category, file]) => ({
      category,
      file,
      text: await readFile(file, 'utf8'),
    })),
  ),
)
if (process.argv.includes('--self-test')) {
  assert.deepEqual(
    collectSources([
      { category: 'venue', file: 'a', text: '"https://example.test/a" "https://example.test/a"' },
      { category: 'help', file: 'b', text: '"https://example.test/a" "https://example.test/b"' },
    ]),
    [
      { url: 'https://example.test/a', sources: [{ category: 'venue', file: 'a' }, { category: 'help', file: 'b' }] },
      { url: 'https://example.test/b', sources: [{ category: 'help', file: 'b' }] },
    ],
  )
  for (const [category, file] of files)
    assert(
      urls.some((entry) => entry.sources.some(
        (source) => source.file === file && source.category === category,
      )),
    )
  for (const { url } of urls) assert.equal(new URL(url).protocol, 'https:')
  console.log(`Source-link self-test passed: ${urls.length} unique URLs across ${files.length} source files.`)
} else {
  const results = []
  for (let i = 0; i < urls.length; i += 4) {
    await Promise.all(
      urls.slice(i, i + 4).map(async (entry) => {
        const { url } = entry
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
            ...entry,
            status: response.status,
            finalUrl: response.url,
            reviewNeeded: !response.ok,
          })
        } catch {
          results.push({ ...entry, status: null, reviewNeeded: true })
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
}
