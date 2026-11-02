import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'

function originFor(value) {
  const url = new URL(value)
  assert(
    url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      url.pathname === '/' &&
      !url.search &&
      !url.hash,
    'Supply a bare HTTPS origin',
  )
  assert(
    !['localhost', 'example.test', 'example.com'].includes(url.hostname),
    'Supply the real deployed origin',
  )
  return url.origin
}
function checkHeaders(headers) {
  assert.equal(headers.get('x-content-type-options'), 'nosniff')
  assert.equal(headers.get('x-frame-options')?.toUpperCase(), 'DENY')
  const csp = headers.get('content-security-policy') || ''
  const directives = new Map()
  for (const part of csp.split(';')) {
    if (!part.trim()) continue
    const [name, ...values] = part.trim().toLowerCase().split(/\s+/)
    assert(!directives.has(name), `Duplicate CSP directive: ${name}`)
    assert(!values.includes("'unsafe-eval'"), 'Production must not allow eval')
    directives.set(name, values)
  }
  for (const [name, value] of [
    ['default-src', "'self'"],
    ['object-src', "'none'"],
    ['frame-ancestors', "'none'"],
    ['script-src-attr', "'none'"],
  ])
    assert.deepEqual(directives.get(name), [value], `Expected CSP: ${name} ${value}`)
  assert.equal(
    headers.get('referrer-policy'),
    'strict-origin-when-cross-origin',
  )
}
if (process.argv[2] === '--self-test') {
  assert.equal(
    originFor('https://travel.example.org'),
    'https://travel.example.org',
  )
  for (const bad of [
    'http://travel.example.org',
    'https://user:pass@travel.example.org',
    'https://example.test',
    'https://travel.example.org/a',
    'https://travel.example.org/?token=secret',
  ])
    assert.throws(() => originFor(bad))
  const good = new Headers({
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
    'referrer-policy': 'strict-origin-when-cross-origin',
    'content-security-policy':
      "default-src 'self'; object-src 'none'; frame-ancestors 'none'; script-src-attr 'none'",
  })
  checkHeaders(good)
  assert.throws(() => checkHeaders(new Headers()))
  const policy = good.get('content-security-policy')
  for (const invalid of [
    policy.replace("default-src 'self'", "default-src 'self' https://untrusted.example"),
    policy.replace("object-src 'none'", "object-src *; object-src 'none'"),
    policy + "; OBJECT-SRC 'none'",
    policy.replace("frame-ancestors 'none'", "frame-ancestors 'none' https://untrusted.example"),
    policy.replace("script-src-attr 'none'", "script-src-attr 'none' 'unsafe-inline'"),
    policy.replace("default-src 'self'; ", ''),
    policy + "; script-src 'UNSAFE-EVAL'",
  ]) {
    const rejected = new Headers(good)
    rejected.set('content-security-policy', invalid)
    assert.throws(() => checkHeaders(rejected))
  }
  const spaced = new Headers(good)
  spaced.set('content-security-policy', `  ${policy.toUpperCase().replaceAll('; ', ';\t')} ; `)
  checkHeaders(spaced)
  const config = (await import('../next.config.mjs')).default
  const rule = (await config.headers()).find((item) => item.source === '/(.*)')
  checkHeaders(new Headers(rule.headers.map(({ key, value }) => [key, value])))
  console.log('Deployment checker self-test passed.')
} else {
  const origin = originFor(process.argv[2] || '')
  const results = []
  for (const path of [
    '/',
    '/en',
    '/ja',
    '/th',
    '/en/explore',
    '/en/first-visit',
    '/en/destinations/kyoto',
    '/en/my-trip',
    '/robots.txt',
    '/sitemap.xml',
    '/manifest.webmanifest',
    '/not-a-real-route',
  ]) {
    try {
      const response = await fetch(origin + path, {
        redirect: 'manual',
        signal: AbortSignal.timeout(15000),
      })
      if (path === '/') {
        assert([307, 308].includes(response.status), 'Missing locale redirect')
        assert.equal(
          new URL(response.headers.get('location'), origin).href,
          origin + '/ja',
        )
      } else if (path === '/not-a-real-route')
        assert.equal(response.status, 404)
      else {
        assert.equal(response.status, 200)
        const body = await response.text()
        if (path.startsWith('/en') || ['/ja', '/th'].includes(path)) {
          checkHeaders(response.headers)
          assert(body.includes('id="main-content"'), 'Missing page content')
          if (path === '/en/my-trip')
            assert(
              /name="robots"[^>]+noindex/.test(body),
              'Private planner must be noindex',
            )
          else {
            assert(
              body.includes(`href="${origin}${path}"`),
              'Canonical origin/path missing',
            )
            assert(
              body.includes('property="og:image"'),
              'Missing sharing image',
            )
            for (const locale of ['en', 'ja', 'th'])
              assert(
                body.includes(`hrefLang="${locale}"`) ||
                  body.includes(`hreflang="${locale}"`),
                'Missing language alternate',
              )
          }
        }
        if (path === '/sitemap.xml') {
          assert(
            body.includes(`<loc>${origin}/`),
            'Sitemap uses a different origin',
          )
          assert(!body.includes('/my-trip'), 'Private planner in sitemap')
        }
        if (path === '/manifest.webmanifest')
          assert(JSON.parse(body).icons.length >= 2)
      }
      await response.body?.cancel().catch(() => {})
      results.push({ path, ok: true })
    } catch (error) {
      results.push({
        path,
        ok: false,
        error: error instanceof Error ? error.message : 'Check failed',
      })
    }
  }
  await mkdir('test-results', { recursive: true })
  await writeFile(
    'test-results/deployment-check.json',
    JSON.stringify(
      { origin, checkedAt: new Date().toISOString(), results },
      null,
      2,
    ),
  )
  console.log(results)
  if (results.some((result) => !result.ok)) process.exitCode = 1
}
