import assert from 'node:assert/strict'
import { mkdir, readFile, writeFile } from 'node:fs/promises'

const locales = ['ja', 'en', 'th', 'ko', 'zh-CN', 'vi', 'fr', 'es']
const pagePaths = ['', '/explore', '/first-visit', '/destinations/kyoto', '/my-trip']

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
function checkPage(body, locale, path, origin) {
  assert(new RegExp(`<html\\b[^>]*\\slang="${locale}"`).test(body), 'Missing or incorrect page language')
  assert(body.includes('id="main-content"'), 'Missing page content')
  assert(/<title>[^<]+<\/title>/.test(body), 'Missing page title')
  if (path.endsWith('/my-trip')) {
    assert(/name="robots"[^>]+noindex/.test(body), 'Private planner must be noindex')
    return
  }
  assert(/name="description"[^>]+content="[^"]+"/.test(body), 'Missing page description')
  assert(body.includes(`rel="canonical" href="${origin}${path}"`), 'Canonical origin/path missing')
  assert(body.includes('property="og:image"'), 'Missing sharing image')
  const suffix = path.slice(locale.length + 1)
  const alternates = body.match(/<link\b[^>]*>/g) || []
  for (const alternate of locales)
    assert(
      alternates.some((tag) =>
        /rel="alternate"/.test(tag) &&
        (tag.includes(`hrefLang="${alternate}"`) || tag.includes(`hreflang="${alternate}"`)) &&
        tag.includes(`href="${origin}/${alternate}${suffix}"`),
      ),
      `Missing or incorrect language alternate: ${alternate}`,
    )
}
function checkManifest(body) {
  const manifest = JSON.parse(body)
  assert.equal(manifest.start_url, '/ja', 'Unexpected default manifest route')
  assert(manifest.icons?.length >= 2, 'Missing manifest icons')
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
  const localeConfig = await readFile(new URL('../src/i18n/config.ts', import.meta.url), 'utf8')
  const configuredLocales = localeConfig.match(/locales:\s*\[([^\]]+)\]/)?.[1].match(/'[^']+'/g)?.map((value) => value.slice(1, -1))
  assert.deepEqual(locales, configuredLocales, 'Deployment locales must match the application')
  const origin = 'https://travel.example.org'
  const alternates = locales.map((locale) => `<link rel="alternate" hreflang="${locale}" href="${origin}/${locale}/explore"/>`).join('')
  const page = `<html lang="es"><title>Explorar Japón</title><meta name="description" content="Guía de Japón"/><link rel="canonical" href="${origin}/es/explore"/><meta property="og:image" content="${origin}/image.jpg"/>${alternates}<main id="main-content"></main></html>`
  checkPage(page, 'es', '/es/explore', origin)
  assert.throws(() => checkPage(page.replace('hreflang="vi"', 'hreflang="xx"'), 'es', '/es/explore', origin))
  assert.throws(() => checkPage(page.replace('lang="es"', 'lang="en"'), 'es', '/es/explore', origin))
  assert.throws(() => checkPage(page.replace('/es/explore"/><meta', '/en/explore"/><meta'), 'es', '/es/explore', origin))
  const planner = '<html lang="ko"><title>여행</title><meta name="robots" content="noindex, nofollow"/><main id="main-content"></main></html>'
  checkPage(planner, 'ko', '/ko/my-trip', origin)
  assert.throws(() => checkPage(planner.replace('noindex', 'index'), 'ko', '/ko/my-trip', origin))
  checkManifest(JSON.stringify({ start_url: '/ja', icons: [{}, {}] }))
  assert.throws(() => checkManifest(JSON.stringify({ start_url: '/es', icons: [{}, {}] })))
  console.log('Deployment checker self-test passed (8 locales).')
} else {
  const origin = originFor(process.argv[2] || '')
  const results = []
  for (const path of [
    '/',
    ...locales.flatMap((locale) => pagePaths.map((path) => `/${locale}${path}`)),
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
        const locale = locales.find((value) => path === `/${value}` || path.startsWith(`/${value}/`))
        if (locale) {
          checkHeaders(response.headers)
          checkPage(body, locale, path, origin)
        }
        if (path === '/sitemap.xml') {
          assert(
            body.includes(`<loc>${origin}/`),
            'Sitemap uses a different origin',
          )
          assert(!body.includes('/my-trip'), 'Private planner in sitemap')
          for (const locale of locales)
            assert(body.includes(`<loc>${origin}/${locale}</loc>`), `Missing sitemap locale: ${locale}`)
        }
        if (path === '/manifest.webmanifest')
          checkManifest(body)
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
