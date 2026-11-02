import type { Page } from '@playwright/test'
import { readStorage, test, expect, openDetails } from './fixtures'
import { emptyTrip, tripKey, publicTrip, type Trip } from '../src/lib/trip'
import { offlineTrip } from '../src/lib/trip-export'
import en from '../src/i18n/dictionaries/en.json'
import ja from '../src/i18n/dictionaries/ja.json'
import th from '../src/i18n/dictionaries/th.json'

const languages = [
  ['en', en],
  ['ja', ja],
  ['th', th],
] as const
const planned: Trip = {
  ...emptyTrip,
  days: 3,
  title: 'Keep this plan',
  notes: { 2: 'Keep this day note' },
  items: [
    {
      id: 'gion',
      day: 2,
      time: '14:30',
      note: 'Keep reservation',
      duration: 90,
      buffer: 20,
    },
  ],
}

async function seed(page: Page, trip: Trip) {
  await page.evaluate(
    async ({ key, trip }) => {
      await window.seedTestStorage(key, JSON.stringify(trip))
      dispatchEvent(new Event('trip-change'))
    },
    { key: tripKey, trip },
  )
}

const stored = async (page: Page): Promise<Trip> =>
  (JSON.parse((await readStorage(page, tripKey))!))

test('empty normalized searches retain the same ordered results and multilingual aliases', async ({ page }) => {
  for (const [lang, copy] of languages) {
    await page.goto(`/${lang}/explore?scope=places&view=list`)
    await expect(page.locator('.explorer-toolbar select')).toHaveValue('places')
    const status = page.locator('.explorer-result-status strong')
    const originalCount = await status.innerText()
    const results = page.locator('.place-search-results li > a')
    await expect(results).toHaveCount(12)
    const originalLinks = await results.evaluateAll((links) => links.map((link) => link.getAttribute('href')))
    const search = page.getByRole('searchbox')
    for (const query of ['-', '   ', '']) {
      await search.fill(query)
      await expect(status).toHaveText(originalCount)
      expect(await results.evaluateAll((links) => links.map((link) => link.getAttribute('href')))).toEqual(originalLinks)
    }
    await search.fill(lang === 'ja' ? 'ぎおん' : lang === 'th' ? 'กิอง' : 'Gion')
    await expect(status).toHaveText(`1 ${copy.tools.placeResults}`)
    await expect(results).toHaveAttribute('href', `/${lang}/destinations/kyoto#place-gion`)
  }
})

async function blockWrites(page: Page) {
  await page.evaluate(() => {
    const gate = { blocked: true }
    Object.assign(window, { tripWriteGate: gate })
    const write = Storage.prototype.setItem
    Storage.prototype.setItem = function (key, value) {
      if (
        gate.blocked &&
        this === localStorage &&
        key === 'japan-travel-trip-v1'
      )
        throw new DOMException('Full', 'QuotaExceededError')
      return write.call(this, key, value)
    }
  })
}

async function unblockWrites(page: Page) {
  await page.evaluate(() => {
    ;(
      window as unknown as { tripWriteGate: { blocked: boolean } }
    ).tripWriteGate.blocked = false
  })
}

async function repeatFromDayTwo(page: Page) {
  await page
    .getByRole('combobox', { name: en.tools.editDay, exact: true })
    .selectOption('2')
  const row = page.locator(
    '.trip-day[aria-labelledby="trip-day-2"] li[data-place-id="gion"]',
  )
  await openDetails(row.locator('.trip-visit-editor'))
  return row.getByRole('button', {
    name: `${en.tools.repeat}: Gion`,
    exact: true,
  })
}

test('adding a repeated visit reveals unscheduled visits, while a failed write preserves the filter and previous Undo', async ({
  page,
}) => {
  await page.goto('/en/my-trip')
  await seed(page, planned)
  const repeat = await repeatFromDayTwo(page)
  await repeat.click()
  const filter = page.getByRole('combobox', {
    name: en.tools.editDay,
    exact: true,
  })
  await expect(filter).toHaveValue('0')
  await expect(page.locator('#trip-day-0')).toBeFocused()
  const added = page.locator(
    '.trip-day[aria-labelledby="trip-day-0"] li[data-place-id="gion"]',
  )
  await expect(added).toBeVisible()
  const after = await stored(page)
  expect(after.items[0]).toEqual(planned.items[0])
  expect(after.items[1]).toMatchObject({ id: 'gion', day: 0 })
  expect(after.items[1].entryId).toBeTruthy()
  expect(after.notes).toEqual(planned.notes)
  await page.locator('.trip-file-actions > button').first().click()
  expect(await stored(page)).toEqual(planned)

  await page.getByLabel(en.tools.title, { exact: true }).fill('Working plan')
  const working = await stored(page)
  await repeatFromDayTwo(page)
  await blockWrites(page)
  await repeat.focus()
  await expect(repeat).toBeFocused()
  await repeat.press('Enter')
  await expect(page.locator('.trip-error-toast')).toContainText(en.trip.error)
  await expect(filter).toHaveValue('2')
  await expect(repeat).toBeFocused()
  expect(await stored(page)).toEqual(working)
  await page.locator('.trip-error-toast').getByRole('button', { name: en.trip.dismiss }).click()
  const undo = page.locator('.trip-file-actions > button').first()
  await expect(undo).toBeEnabled()
  await unblockWrites(page)
  await undo.click()
  expect(await stored(page)).toEqual(planned)
})

test('adding a personal stop reveals its new unscheduled row only after the write succeeds', async ({
  page,
}) => {
  page.on('dialog', (dialog) => dialog.accept())
  await page.goto('/en/my-trip')
  await seed(page, planned)
  const filter = page.getByRole('combobox', {
    name: en.tools.editDay,
    exact: true,
  })
  await filter.selectOption('2')
  const editor = page.locator('.personal-stop').last()
  await openDetails(editor)
  const name = editor.getByLabel(en.tools.personalName, { exact: true })
  const address = editor.getByLabel(en.tools.personalAddress, { exact: true })
  await name.fill('New personal stop')
  await address.fill('Kyoto Station, Japan')
  const submit = editor.getByRole('button', {
    name: en.tools.addPersonal,
    exact: true,
  })
  await blockWrites(page)
  await submit.focus()
  await expect(submit).toBeFocused()
  await submit.press('Enter')
  await expect(page.locator('.trip-error-toast')).toContainText(en.trip.error)
  await expect(filter).toHaveValue('2')
  await expect(submit).toBeFocused()
  await expect(name).toHaveValue('New personal stop')
  await expect(address).toHaveValue('Kyoto Station, Japan')
  expect(await stored(page)).toEqual(planned)

  await page.locator('.trip-error-toast').getByRole('button', { name: en.trip.dismiss }).click()
  await unblockWrites(page)
  await submit.click()
  await expect(filter).toHaveValue('0')
  await expect(page.locator('#trip-day-0')).toBeFocused()
  await expect(
    page.locator('.trip-day[aria-labelledby="trip-day-0"] h3'),
  ).toHaveText('New personal stop')
  const after = await stored(page)
  expect(after.items[0]).toEqual(planned.items[0])
  expect(after.items[1]).toMatchObject({
    day: 0,
    custom: { name: 'New personal stop', address: 'Kyoto Station, Japan' },
  })
  await expect(name).toHaveValue('')
  await expect(address).toHaveValue('')
  await expect(page.locator('#trip-drafts')).toHaveCount(0)
  await page.locator('.trip-file-actions > button').first().click()
  expect(await stored(page)).toEqual(planned)
})

for (const motion of ['no-preference', 'reduce'] as const) {
  test(`feedback Undo remains usable under focus and hover, then expires after leaving (${motion})`, async ({
    page,
  }) => {
    test.setTimeout(45_000)
    await page.emulateMedia({ reducedMotion: motion })
    await page.goto('/en/my-trip')
    await seed(page, planned)
    await (await repeatFromDayTwo(page)).click()
    const feedback = page.locator('.trip-feedback')
    const undo = feedback.getByRole('button', {
      name: en.tools.undo,
      exact: true,
    })
    await undo.focus()
    await feedback.hover()
    await page.mouse.move(0, 0)
    await page.waitForTimeout(5500)
    await expect(undo).toBeVisible()
    await expect(undo).toBeInViewport()
    await expect(undo).toBeFocused()
    await expect(feedback).toHaveCSS('opacity', '1')
    await page.keyboard.press('Enter')
    expect(await stored(page)).toEqual(planned)

    await (await repeatFromDayTwo(page)).click()
    await feedback.hover()
    await page
      .getByRole('combobox', { name: en.tools.editDay, exact: true })
      .focus()
    await page.waitForTimeout(5500)
    await expect(undo).toBeVisible()
    await expect(undo).toBeInViewport()
    expect((await stored(page)).items).toHaveLength(2)
    await expect(feedback).toHaveCSS('opacity', '1')
    await page.mouse.move(0, 0)
    await expect(undo).toHaveCount(0, { timeout: 6500 })
  })
}

test('offline Kyoto guidance follows each visit date while shared copies redact private dates and preserve safe snapshots', async ({
  page,
}) => {
  const trip: Trip = {
    ...emptyTrip,
    days: 2,
    startDate: '2026-11-20',
    title: 'Private title <script>window.exportInjected = true</script>',
    notes: {
      1: 'Private note <img src=x onerror="window.exportInjected=true">',
    },
    items: [
      { id: 'kiyomizu', day: 1 },
      { id: 'kyoto-museum', day: 1 },
      { id: 'kiyomizu', day: 2, entryId: 'kiyomizu-return' },
      { id: 'kyoto-museum', day: 2, entryId: 'museum-return' },
      {
        id: `custom-${'a'.repeat(32)}`,
        day: 1,
        custom: {
          name: 'Private hotel </h3><script>window.exportInjected=true</script>',
          address: 'Private address',
          coordinates: [35, 135],
        },
      },
    ],
  }
  const original = JSON.stringify(trip)
  for (const [lang, copy] of languages) {
    const first = offlineTrip(trip, lang, copy.trip, copy.tools)
    await page.setContent(first)
    await expect(page.locator('html')).toHaveAttribute('lang', lang)
    await expect(page.locator('.offline-snapshot')).toContainText(
      copy.tools.offlineSnapshotHelp,
    )
    await expect(page.locator('.offline-snapshot time')).toHaveAttribute(
      'datetime',
      /^\d{4}-\d{2}-\d{2}$/,
    )
    const kiyomizu = page.locator(
      '.offline-visit-guidance[data-place-id="kiyomizu"]',
    )
    const museum = page.locator(
      '.offline-visit-guidance[data-place-id="kyoto-museum"]',
    )
    await expect(kiyomizu).toHaveCount(2)
    await expect(museum).toHaveCount(2)
    await expect(
      kiyomizu.nth(0).locator('[data-applicability]'),
    ).toHaveAttribute('data-applicability', 'outsidePeriod')
    await expect(
      kiyomizu.nth(1).locator('[data-applicability]'),
    ).toHaveAttribute('data-applicability', 'inPeriod')
    await expect(museum.locator('[data-applicability="inPeriod"]')).toHaveCount(
      2,
    )
    await expect(
      kiyomizu.first().locator('.offline-approach a'),
    ).toHaveAttribute('href', 'https://www.kiyomizudera.or.jp/access.php')
    await expect(museum.first().locator('.offline-approach a')).toHaveAttribute(
      'href',
      'https://www.kyohaku.go.jp/jp/assets/visit/access/bus-map.pdf',
    )
    const reviewEvidence = await page
      .locator('.offline-visit-guidance p[data-review-status]')
      .allTextContents()
    const snapshot = await page
      .locator('.offline-snapshot time')
      .getAttribute('datetime')
    const csp = page.locator('meta[http-equiv="Content-Security-Policy"]')
    await expect(csp).toHaveAttribute('content', /default-src 'none'/)
    await expect(csp).toHaveAttribute('content', /form-action 'none'/)
    await expect(
      page.locator('script, img, iframe, object, [onerror], [onload]'),
    ).toHaveCount(0)
    expect(first).toContain('&lt;script&gt;')
    expect(await page.evaluate(() => 'exportInjected' in window)).toBe(false)

    await page.setContent(
      offlineTrip(
        { ...trip, startDate: '2026-11-29' },
        lang,
        copy.trip,
        copy.tools,
      ),
    )
    await expect(
      kiyomizu.locator('[data-applicability="inPeriod"]'),
    ).toHaveCount(2)
    await expect(museum.nth(0).locator('[data-applicability]')).toHaveAttribute(
      'data-applicability',
      'inPeriod',
    )
    await expect(museum.nth(1).locator('[data-applicability]')).toHaveAttribute(
      'data-applicability',
      'outsidePeriod',
    )
    expect(
      await page
        .locator('.offline-visit-guidance p[data-review-status]')
        .allTextContents(),
    ).toEqual(reviewEvidence)
    await expect(page.locator('.offline-snapshot time')).toHaveAttribute(
      'datetime',
      snapshot!,
    )

    const shared = offlineTrip(publicTrip(trip), lang, copy.trip, copy.tools)
    await page.setContent(shared)
    await expect(page.locator('.offline-visit-guidance')).toHaveCount(4)
    await expect(page.locator('[data-applicability="dateNeeded"]')).toHaveCount(
      4,
    )
    await expect(page.locator('[data-applicability] time')).toHaveCount(0)
    expect(shared).not.toMatch(
      /Private title|Private note|Private hotel|Private address|exportInjected|custom-/,
    )
    // Public event and generation dates can coincide with a private travel date.
    const plannedDateText = await page.locator('section > h2, [data-applicability]').allTextContents()
    expect(plannedDateText.join('\n')).not.toContain(trip.startDate!)
    await expect(page.locator('script, img, iframe, object')).toHaveCount(0)
    expect(JSON.stringify(trip)).toBe(original)
  }
})

test('localized home journey tabs retain complete routes and apply exactly the days shown to visitors', async ({
  page,
  context,
}) => {
  test.setTimeout(90_000)
  for (const [lang, copy] of languages) {
    await page.goto(`/${lang}`)
    const section = page.locator('#journeys')
    await expect(section.locator('#journeys-title')).toHaveText(
      copy.journeys.title,
    )
    const tabs = section.locator('.journey-tabs button')
    await expect(tabs).toHaveCount(3)
    await page.waitForLoadState('networkidle')
    await context.setOffline(true)
    for (let index = 0; index < 3; index++) {
      await tabs.nth(index).click()
      await expect(tabs.nth(index)).toHaveAttribute('aria-pressed', 'true')
      await expect(section.locator('.journey-description h3')).not.toBeEmpty()
      await expect(section.locator('.journey-description > p')).not.toBeEmpty()
      await expect(section.locator('.journey-transport')).toContainText(
        copy.journeys.transport,
      )
      const entries = await section
        .locator('.journey-route > li')
        .evaluateAll((rows) =>
          rows.map((row) => ({
            id: `destination:${row.querySelector('a')!.getAttribute('href')!.split('/').pop()}`,
            day: Number(
              row.querySelector('.route-days')!.textContent!.match(/\d+/)![0],
            ),
          })),
        )
      expect(entries.length).toBeGreaterThan(0)
      for (const link of await section.locator('.journey-route a').all()) {
        await expect(link).toHaveAttribute(
          'href',
          new RegExp(`^/${lang}/destinations/[^/]+$`),
        )
        await expect(link.locator('h4')).not.toBeEmpty()
      }
      await seed(page, emptyTrip)
      await section
        .getByRole('button', { name: copy.tools.apply, exact: true })
        .click()
      const preview = section.locator('.import-preview')
      await expect(preview.locator('ol > li')).toHaveCount(entries.length)
      await preview
        .getByRole('button', { name: copy.tools.applyConfirm, exact: true })
        .click()
      expect((await stored(page)).items).toEqual(entries)
      await page
        .locator('.trip-feedback')
        .getByRole('button', { name: copy.tools.undo, exact: true })
        .click()
      expect(await stored(page)).toEqual(emptyTrip)
    }
    await context.setOffline(false)
  }
})

test('Kyoto city and prefecture selections stay explicit and the starter applies the prefecture days shown', async ({
  page,
}) => {
  test.setTimeout(60_000)
  for (const [lang, copy] of languages) {
    await page.goto(`/${lang}/destinations/kyoto`)
    await expect(page.locator('.map-place-list > li')).toHaveCount(3)
    const scope = page.locator('.kyoto-plan-scope')
    await expect(scope).toBeVisible()
    const link = scope.getByRole('link', {
      name: copy.tools.kyotoPrefecturePlan,
      exact: false,
    })
    await expect(link).toHaveAttribute(
      'href',
      `/${lang}/prefectures/kyoto#suggested-plan`,
    )
    await link.click()
    await expect(page).toHaveURL(`/${lang}/prefectures/kyoto#suggested-plan`)
    const groups = page.locator('#suggested-plan > ol > li')
    await expect(groups).toHaveCount(2)
    const expected = await groups.evaluateAll((rows) =>
      rows.flatMap((row, index) =>
        Array.from(
          row.querySelectorAll('ul > li > a:first-child'),
          (anchor) => ({
            id: anchor.getAttribute('href')!.slice('#place-'.length),
            day: index + 1,
          }),
        ),
      ),
    )
    expect(expected).toHaveLength(4)
    expect(
      expected.some((item) => item.id === 'pref:kyoto:fushimi-inari-taisha'),
    ).toBe(true)
    await page.goto(`/${lang}/my-trip`)
    await seed(page, emptyTrip)
    const starter = page.locator('.trip-starter')
    await openDetails(starter)
    await starter
      .getByRole('combobox', { name: copy.tools.arrivalBase, exact: true })
      .selectOption('kyoto')
    await starter
      .getByRole('combobox', { name: copy.tools.planLength, exact: true })
      .selectOption('2')
    await expect(starter.locator('.starter-coverage')).toContainText('2 / 2')
    await starter
      .getByRole('button', { name: copy.tools.apply, exact: true })
      .click()
    await expect(starter.locator('.import-preview ol > li')).toHaveCount(4)
    await starter
      .getByRole('button', { name: copy.tools.applyConfirm, exact: true })
      .click()
    expect((await stored(page)).items).toEqual(expected)
    await page
      .locator('.trip-feedback')
      .getByRole('button', { name: copy.tools.undo, exact: true })
      .click()
    expect(await stored(page)).toEqual(emptyTrip)
  }
})
