import { test, expect, openDetails } from './fixtures'
import { emptyTrip, tripKey } from '../src/lib/trip'
import { places, mapUrl } from '../src/data/places'
import { prefectures } from '../src/data/prefectures'
import plans from '../src/data/prefecture-plans.json'
import en from '../src/i18n/dictionaries/en.json'
import ja from '../src/i18n/dictionaries/ja.json'
import th from '../src/i18n/dictionaries/th.json'

const languages = [['en', en], ['ja', ja], ['th', th]] as const

test.afterEach(async ({ page }, info) => {
  if (info.status === info.expectedStatus || page.isClosed()) return
  try {
    const state = await page.evaluate(() => ({
      path: location.pathname,
      activeTag: document.activeElement?.tagName,
      days: Array.from(document.querySelectorAll('.trip-day')).map((day) => ({
        heading: day.getAttribute('aria-labelledby'),
        hidden: (day as HTMLElement).hidden,
        editors: Array.from(day.querySelectorAll('details.trip-visit-editor')).map((editor) => ({
          open: (editor as HTMLDetailsElement).open,
          connected: editor.isConnected,
          visible: (editor as HTMLElement).checkVisibility(),
          height: editor.getBoundingClientRect().height,
          select: Array.from(editor.querySelectorAll('select')).map((select) => ({
            connected: select.isConnected,
            visible: select.checkVisibility(),
            height: select.getBoundingClientRect().height,
            focused: document.activeElement === select,
          })),
        })),
      })),
    }))
    await info.attach('failure-interaction-state', {
      body: JSON.stringify(state, null, 2), contentType: 'application/json',
    })
  } catch {
    // A closed page must not replace the original failure.
  }
})

test('Home searches hand the original query to all places without transferring the Home category', async ({ page }) => {
  test.setTimeout(60_000)
  const query = 'No match & ไทย / 日本? 50%'
  for (const [lang, copy] of languages) {
    await page.goto(`/${lang}`)
    const home = page.locator('#destinations')
    await home.getByRole('button', { name: copy.destinations.nature, exact: true }).click()
    await home.getByRole('searchbox', { name: copy.destinations.search, exact: true }).fill(query)
    const action = home.locator('.empty-state').getByRole('link', { name: `${copy.destinations.searchAll} ↗`, exact: true })
    const href = new URL((await action.getAttribute('href'))!, 'http://localhost:3100')
    expect(href.pathname).toBe(`/${lang}/explore`)
    expect([...href.searchParams.keys()].sort()).toEqual(['q', 'scope', 'view'])
    expect(href.searchParams.get('q')).toBe(query)
    expect(href.searchParams.get('scope')).toBe('places')
    expect(href.searchParams.get('view')).toBe('list')
    await action.click()
    await expect(page.getByRole('searchbox', { name: copy.explorer.search, exact: true })).toHaveValue(query)
    await openDetails(page.locator('.search-options'))
    await expect(page.locator('.search-options select').nth(1)).toHaveValue('all')
  }
})

test('Explore names each map action and avoids repeating an identical Japanese place name', async ({ page }) => {
  test.setTimeout(60_000)
  await page.setViewportSize({ width: 390, height: 844 })
  const gion = places.find((place) => place.id === 'gion')!
  for (const [lang, copy] of languages) {
    await page.goto(`/${lang}/explore?scope=places&view=list&q=Gion`)
    const row = page.locator('.place-search-results > ul > li').filter({
      has: page.getByRole('link', { name: gion.names[lang], exact: true }),
    })
    await expect(row.locator(':scope > span[lang="ja"]')).toHaveCount(lang === 'ja' ? 0 : 1)
    const show = row.getByRole('button', { name: `${copy.explorer.show}: ${gion.names[lang]}`, exact: true })
    await show.focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('.prefecture-preview h2')).toHaveText(gion.names[lang])
    await expect(page.locator('#explore-map')).toBeFocused()

    await page.goto(`/${lang}/destinations/kyoto`)
    const place = page.locator('[id="place-kiyomizu"]')
    const route = place.locator(':scope > .map-links > a')
    await expect(route).toBeVisible()
    expect((await route.boundingBox())!.height).toBeGreaterThanOrEqual(43.99)
    const details = place.locator(':scope > .visit-details')
    expect(await route.evaluate((link) => Boolean(link.compareDocumentPosition(link.closest('li')!.querySelector(':scope > .visit-details')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true)
    await openDetails(details)
    for (const label of [copy.tools.access, copy.tools.hours, copy.tools.booking, copy.tools.accessibility])
      await expect(details.getByText(label, { exact: true })).toBeVisible()
  }
})

test('enlarged mobile headers leave shortcut, assigned-day and hash targets below the real header', async ({ page }) => {
  test.setTimeout(90_000)
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const [lang, copy] of languages) {
    await page.goto(`/${lang}/my-trip`)
    await page.evaluate(async ({ key, trip }) => {
      await window.seedTestStorage(key, JSON.stringify(trip))
      dispatchEvent(new Event('trip-change'))
    }, { key: tripKey, trip: { ...emptyTrip, days: 3, items: [{ id: 'gion', day: 2 }] } })
    await page.addStyleTag({ content: '.site-header .brand small { font-size:16px; letter-spacing:2px; }' })
    const topOf = async (selector: string) => page.locator(selector).evaluate((element) => element.getBoundingClientRect().top - document.querySelector('.site-header')!.getBoundingClientRect().bottom)
    await page.locator('.trip-task-links a[href="#trip-tools"]').click()
    await expect.poll(() => topOf('#trip-tools')).toBeGreaterThanOrEqual(-1)
    await openDetails(page.locator('.trip-day[aria-labelledby="trip-day-2"] .trip-visit-editor'))
    await page.getByRole('combobox', { name: `${copy.trip.assign}: ${places.find((place) => place.id === 'gion')!.names[lang]}`, exact: true }).selectOption('1')
    await expect(page.locator('#trip-day-1')).toBeFocused()
    await expect.poll(() => topOf('#trip-day-1')).toBeGreaterThanOrEqual(-1)
    await expect(page.locator('#trip-day-1')).toBeInViewport()
    await page.goto(`/${lang}/prefectures/kyoto`)
    await page.addStyleTag({ content: '.site-header .brand small { font-size:16px; letter-spacing:2px; }' })
    await page.locator('a[href="#suggested-plan"]').first().click()
    await expect.poll(() => topOf('#suggested-plan')).toBeGreaterThanOrEqual(-1)
    await expect(page.locator('#suggested-plan > h2')).toBeInViewport()
  }
})

test('every prefecture plan resets its route origin each day and chains later stops in every language', async ({ page, request }) => {
  test.setTimeout(120_000)
  for (const [lang, copy] of languages) {
    for (let offset = 0; offset < prefectures.length; offset += 4) {
      const samples = await Promise.all(prefectures.slice(offset, offset + 4).map(async (prefecture) => {
        const response = await request.get(`/${lang}/prefectures/${prefecture.slug}`)
        expect(response.status()).toBe(200)
        return { slug: prefecture.slug, html: await response.text() }
      }))
      const rendered = await page.evaluate((samples) => samples.map(({ slug, html }) => {
        const document = new DOMParser().parseFromString(html, 'text/html')
        return { slug, groups: Array.from(document.querySelectorAll('#suggested-plan > ol > li')).map((group) => Array.from(group.querySelectorAll(':scope > ul > li')).map((stop) => ({
          id: stop.querySelector('a[href^="#place-"]')!.getAttribute('href')!.slice('#place-'.length),
          primary: stop.querySelector(':scope > a.text-link')!.getAttribute('href')!,
          label: stop.querySelector(':scope > a.text-link')!.textContent!,
          alternate: stop.querySelector('details.place-extra-actions a')?.getAttribute('href'),
        }))) }
      }), samples)
      for (const { slug, groups } of rendered) {
        const expectedGroups = plans[slug as keyof typeof plans].groups
        expect(groups.map((group) => group.map((stop) => stop.id)), `${lang}/${slug} membership`).toEqual(expectedGroups)
        for (const group of groups) {
          let previous: { destination: string; name: string } | undefined
          for (const stop of group) {
            const point = places.find((place) => place.id === stop.id)!
            const route = new URL(stop.primary)
            const destination = new URL(mapUrl(point, true, 'transit')).searchParams.get('destination')!
            expect(route.hostname).toBe('www.google.com')
            expect(route.searchParams.get('api')).toBe('1')
            expect(route.searchParams.get('travelmode')).toBe('transit')
            expect(route.searchParams.get('destination')).toBe(destination)
            expect(route.searchParams.get('origin')).toBe(previous?.destination ?? null)
            expect(stop.label).toContain(point.names[lang])
            expect(stop.label).toContain(previous?.name ?? copy.tools.prefectureCurrentOrigin)
            if (previous) {
              const alternate = new URL(stop.alternate!)
              expect(alternate.searchParams.get('origin')).toBeNull()
              expect(alternate.searchParams.get('destination')).toBe(destination)
              expect(alternate.searchParams.get('travelmode')).toBe('transit')
            } else expect(stop.alternate).toBeUndefined()
            previous = { destination, name: point.names[lang] }
          }
        }
      }
    }
  }
  await page.goto('/en/prefectures/osaka#suggested-plan')
  const alternate = page.locator('#suggested-plan details.place-extra-actions').first()
  await alternate.locator('summary').focus()
  await page.keyboard.press('Enter')
  await expect(alternate).toHaveAttribute('open')
  await alternate.getByRole('link').focus()
  await expect(alternate.getByRole('link')).toBeFocused()
  expect(new URL((await alternate.getByRole('link').getAttribute('href'))!).searchParams.has('origin')).toBe(false)
})

test('Kyoto hours and admission retain distinct event scopes and field-specific evidence', async ({ page }) => {
  test.setTimeout(60_000)
  for (const [lang, copy] of languages) {
    await page.goto(`/${lang}/destinations/kyoto`)
    for (const [id, fields, source] of [
      ['kiyomizu', ['hours'], 'https://www.kiyomizudera.or.jp/access.php'],
      ['kyoto-museum', ['hours', 'admission'], 'https://www.kyohaku.go.jp/eng/visit/info/'],
    ] as const) {
      const details = page.locator(`[id="place-${id}"] > .visit-details`)
      await openDetails(details)
      for (const field of fields) {
        const fact = details.locator('.visit-facts > div').filter({ has: page.getByText(copy.tools[field], { exact: true }) })
        await expect(fact.locator('.field-source a')).toHaveAttribute('href', source)
        await expect(fact.locator('.field-source time')).toHaveAttribute('datetime', '2026-11-03')
      }
      const booking = details.locator('.visit-facts > div').filter({ has: page.getByText(copy.tools.booking, { exact: true }) })
      await expect(booking.locator('.field-source time').first()).toHaveAttribute('datetime', '2026-10-30')
      await expect(booking.locator('.field-source time').last()).toHaveAttribute('datetime', id === 'kiyomizu' ? '2026-11-30' : '2026-11-29')
    }
    if (lang === 'en') {
      const temple = page.locator('[id="place-kiyomizu"] > .visit-details .visit-facts > div').filter({ has: page.getByText(copy.tools.hours, { exact: true }) })
      for (const time of ['06:00', '18:00', '18:30', '21:30', '21:00']) await expect(temple).toContainText(time)
      await expect(temple).toContainText('2026')
      const museum = page.locator('[id="place-kyoto-museum"] > .visit-details')
      const hours = museum.locator('.visit-facts > div').filter({ has: page.getByText(copy.tools.hours, { exact: true }) })
      for (const time of ['09:00', '17:30', '09:30', '16:30', '20:00', '19:30']) await expect(hours).toContainText(time)
      await expect(hours).toContainText('garden-only: galleries closed')
      const price = museum.locator('.visit-facts > div').filter({ has: page.getByText(copy.tools.admission, { exact: true }) })
      for (const amount of ['2,200', '1,200', '700', '350', '300', '150']) await expect(price).toContainText(amount)
      await expect(price).toContainText('advance ticket sales ended October 5')
    }
  }
})

test('regional alternatives have source-scoped hours, reusable identities and explicit unknown entrance facts', async ({ page }) => {
  test.setTimeout(60_000)
  for (const [lang, copy] of languages) {
    for (const [slug, id] of [['niigata', 'pref:niigata:marinepia-nihonkai'], ['toyama', 'pref:toyama:toyama-glass-art-museum']]) {
      const place = places.find((place) => place.id === id)!
      await page.goto(`/${lang}/prefectures/${slug}#place-${id}`)
      const card = page.locator(`[id="place-${id}"]`)
      await expect(card.getByRole('heading', { name: place.names[lang], exact: true })).toBeVisible()
      const facts = card.locator(':scope > .visit-details')
      await openDetails(facts)
      for (const field of ['access', 'hours'] as const) {
        const fact = facts.locator('.visit-facts > div').filter({ has: page.getByText(copy.tools[field], { exact: true }) })
        await expect(fact.locator('.field-source time')).toHaveAttribute('datetime', '2026-11-03')
        await expect(fact.locator('.field-source a')).toHaveAttribute('href', /^https:\/\//)
      }
      for (const field of ['entrance', 'booking', 'accessibility'] as const) {
        const fact = facts.locator('.visit-facts > div').filter({ has: page.getByText(copy.tools[field], { exact: true }) })
        await expect(fact).toHaveAttribute('data-review-status', 'unverified')
        await expect(fact).toContainText(copy.tools.verify)
      }
      await expect(page.locator('#suggested-plan')).toContainText(copy.tools.indoor)
      expect(plans[slug as keyof typeof plans].groups.flat()).not.toContain(id)
      await card.getByRole('button', { name: `${copy.trip.save}: ${place.names[lang]}`, exact: true }).click()
      await expect(card.getByRole('button', { name: `${copy.trip.remove}: ${place.names[lang]}`, exact: true })).toHaveAttribute('aria-pressed', 'true')
      await card.getByRole('button', { name: `${copy.trip.remove}: ${place.names[lang]}`, exact: true }).click()
      await expect(card.getByRole('button', { name: `${copy.trip.save}: ${place.names[lang]}`, exact: true })).toHaveAttribute('aria-pressed', 'false')
    }
  }
})

test('static guide anchors remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ baseURL: 'http://localhost:3100', javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  await page.goto('/th/prefectures/kyoto#suggested-plan')
  await expect(page.locator('.site-header')).toHaveCSS('position', 'static')
  await expect(page.locator('#suggested-plan > h2')).toBeInViewport()
  expect((await page.locator('#suggested-plan').boundingBox())!.y).toBeGreaterThanOrEqual(0)
  await context.close()
})
