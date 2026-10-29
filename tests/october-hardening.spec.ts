import type { Download, Page } from '@playwright/test'
import { test, expect, openDetails } from './fixtures'
import { emptyTrip, parseTrip, tripKey, type Trip } from '../src/lib/trip'
import { tripCalendar } from '../src/lib/trip-calendar'
import { firstVisitSteps } from '../src/data/first-visit'
import { places } from '../src/data/places'
import { visitFor, visitSource } from '../src/data/visit-details'
import en from '../src/i18n/dictionaries/en.json'
import ja from '../src/i18n/dictionaries/ja.json'
import th from '../src/i18n/dictionaries/th.json'

const libraryKey = 'japan-travel-library-v1'

async function seed(page: Page, trip: Trip, library = '[]') {
  await page.addInitScript(
    ({ tripKey, trip, libraryKey, library }) => {
      localStorage.setItem(tripKey, JSON.stringify(trip))
      localStorage.setItem(libraryKey, library)
    },
    { tripKey, trip, libraryKey, library },
  )
  await page.goto('/en/my-trip')
}

async function storedTrip(page: Page): Promise<Trip> {
  return page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), tripKey)
}

async function openLibrary(page: Page) {
  await openDetails(page.locator('.trip-extras'))
  await openDetails(page.locator('.trip-library'))
  return page.locator('.trip-library')
}

async function downloadText(download: Download) {
  const stream = await download.createReadStream()
  if (!stream) throw new Error('Missing download stream')
  const chunks: Buffer[] = []
  for await (const chunk of stream) chunks.push(Buffer.from(chunk))
  return Buffer.concat(chunks).toString('utf8')
}

test('alias migration preserves explicit zero and complementary duration fields, rejecting contradictory duplicates in either order', () => {
  const alias = { id: 'pref:kyoto:kiyomizu-dera', day: 0 }
  const canonical = { id: 'kiyomizu', day: 2 }
  for (const [first, second, expected] of [
    [
      { ...alias, duration: 0 },
      { ...canonical, buffer: 25 },
      { duration: 0, buffer: 25 },
    ],
    [
      { ...canonical, buffer: 25 },
      { ...alias, duration: 0 },
      { duration: 0, buffer: 25 },
    ],
    [
      { ...alias, buffer: 0 },
      { ...canonical, duration: 90 },
      { duration: 90, buffer: 0 },
    ],
    [
      { ...canonical, duration: 90 },
      { ...alias, buffer: 0 },
      { duration: 90, buffer: 0 },
    ],
  ]) {
    const parsed = parseTrip(
      JSON.stringify({ ...emptyTrip, items: [first, second] }),
    )!
    expect(parsed.items).toEqual([
      {
        id: 'kiyomizu',
        day: 2,
        ...expected,
      },
    ])
    expect(parseTrip(JSON.stringify(parsed))).toEqual(parsed)
  }
  for (const field of ['duration', 'buffer'] as const) {
    for (const values of [
      [0, 30],
      [30, 0],
    ]) {
      expect(
        parseTrip(
          JSON.stringify({
            ...emptyTrip,
            items: [
              { ...alias, [field]: values[0] },
              { ...canonical, [field]: values[1] },
            ],
          }),
        ),
      ).toBeNull()
    }
  }
})

test('loading a stale saved copy rejects changed source data before and during confirmation; a current load has Undo', async ({
  page,
}) => {
  const active = { ...emptyTrip, title: 'Active plan' }
  const saved = [{ id: 'copy-a', trip: { ...emptyTrip, title: 'Saved plan' } }]
  const updated = [
    { ...saved[0], trip: { ...saved[0].trip, title: 'Updated elsewhere' } },
  ]
  await seed(page, active, JSON.stringify(saved))
  const library = await openLibrary(page)
  const load = library.getByRole('button', {
    name: en.tools.loadCopy,
    exact: true,
  })
  await load.evaluate(
    (button, { libraryKey, updated }) => {
      localStorage.setItem(libraryKey, JSON.stringify(updated))
      ;(button as HTMLButtonElement).click()
    },
    { libraryKey, updated },
  )
  await expect(page.locator('.trip-extras p[role=alert]')).toHaveText(
    en.tools.libraryConflict,
  )
  expect(await storedTrip(page)).toEqual(active)

  await page.evaluate(
    ({ libraryKey, saved }) => {
      localStorage.setItem(libraryKey, JSON.stringify(saved))
      dispatchEvent(new Event('trip-library-change'))
    },
    { libraryKey, saved },
  )
  await page.evaluate(
    ({ libraryKey, updated }) => {
      window.confirm = () => {
        localStorage.setItem(libraryKey, JSON.stringify(updated))
        return true
      }
    },
    { libraryKey, updated },
  )
  await load.click()
  await expect(page.locator('.trip-extras p[role=alert]')).toHaveText(
    en.tools.libraryConflict,
  )
  expect(await storedTrip(page)).toEqual(active)

  await page.evaluate(
    ({ libraryKey, saved }) => {
      localStorage.setItem(libraryKey, JSON.stringify(saved))
      dispatchEvent(new Event('trip-library-change'))
      window.confirm = () => true
    },
    { libraryKey, saved },
  )
  await load.click()
  await expect(page.getByLabel(en.tools.title, { exact: true })).toHaveValue(
    'Saved plan',
  )
  expect(await storedTrip(page)).toEqual(saved[0].trip)
  await page.locator('.trip-file-actions button').first().click()
  expect(await storedTrip(page)).toEqual(active)
})

for (const importer of ['trip', 'library'] as const) {
  test(`${importer} import keeps the latest File.text result and discards cancelled or cleared reads`, async ({
    page,
  }) => {
    await seed(page, emptyTrip)
    if (importer === 'library') await openLibrary(page)
    const panel = page.locator(
      importer === 'trip' ? '.trip-tools' : '.trip-library',
    )
    const file = page.locator(
      importer === 'trip'
        ? '.trip-file-actions input[type=file]'
        : '.trip-library input[type=file]',
    )
    const preview = panel.locator(
      importer === 'trip' ? ':scope > .import-preview' : '.import-preview',
    )
    await page.evaluate(() => {
      const nativeText = File.prototype.text
      const reads: Record<string, () => Promise<void>> = {}
      Object.assign(window, { hardeningReads: reads })
      File.prototype.text = function () {
        const contents = nativeText.call(this)
        return new Promise<string>((resolve, reject) => {
          reads[this.name] = async () => {
            try {
              resolve(await contents)
            } catch (error) {
              reject(error)
            }
          }
        })
      }
    })
    const select = async (name: string, title: string) => {
      const trip = { ...emptyTrip, title }
      await file.setInputFiles({
        name,
        mimeType: 'application/json',
        buffer: Buffer.from(
          JSON.stringify(
            importer === 'trip' ? trip : [{ id: 'incoming', trip }],
          ),
        ),
      })
      await expect
        .poll(() =>
          page.evaluate(
            (name) =>
              Boolean(
                (
                  window as unknown as {
                    hardeningReads: Record<string, unknown>
                  }
                ).hardeningReads[name],
              ),
            name,
          ),
        )
        .toBe(true)
    }
    const finish = (name: string) =>
      page.evaluate(async (name) => {
        await (
          window as unknown as {
            hardeningReads: Record<string, () => Promise<void>>
          }
        ).hardeningReads[name]()
      }, name)

    await select('a.json', 'Slow old selection')
    await select('b.json', 'Latest selection')
    await finish('b.json')
    await expect(preview).toContainText('Latest selection')
    await finish('a.json')
    await expect(preview).toContainText('Latest selection')
    await expect(preview).not.toContainText('Slow old selection')
    await preview
      .getByRole('button', { name: en.tools.cancel, exact: true })
      .click()
    await expect(preview).toHaveCount(0)

    await select('cancelled.json', 'Cancelled selection')
    await file.setInputFiles([])
    await finish('cancelled.json')
    await expect(preview).toHaveCount(0)

    await select('cleared.json', 'Cleared selection')
    await page.evaluate(
      (key) => {
        localStorage.removeItem(key)
        dispatchEvent(
          new StorageEvent('storage', { key: null, newValue: null }),
        )
      },
      importer === 'trip' ? tripKey : libraryKey,
    )
    await finish('cleared.json')
    await expect(preview).toHaveCount(0)
    await expect(panel.locator('[role=alert]')).toHaveCount(0)
  })
}

test('checklist and saved-copy destructive actions name the exact action and respect cancellation', async ({
  page,
}) => {
  const active = { ...emptyTrip, preparation: ['documents', 'airport'] }
  const copies = [{ id: 'copy-a', trip: emptyTrip }]
  await seed(page, active, JSON.stringify(copies))
  await page.goto('/en/first-visit')
  await openDetails(page.locator('.readiness-checklist'))
  const reset = page.getByRole('button', {
    name: en.tools.checklistReset,
    exact: true,
  })
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe(en.tools.checklistClearConfirm)
    await dialog.dismiss()
  })
  await reset.click()
  expect(await storedTrip(page)).toEqual(active)
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe(en.tools.checklistClearConfirm)
    await dialog.accept()
  })
  await reset.click()
  expect((await storedTrip(page)).preparation).toEqual([])
  await page.goto('/en/my-trip')
  const library = await openLibrary(page)
  const remove = library.getByRole('button', {
    name: en.tools.deleteCopy,
    exact: true,
  })
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe(en.tools.copyDeleteConfirm)
    await dialog.dismiss()
  })
  await remove.click()
  expect(
    await page.evaluate((key) => localStorage.getItem(key), libraryKey),
  ).toBe(JSON.stringify(copies))
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe(en.tools.copyDeleteConfirm)
    await dialog.accept()
  })
  await remove.click()
  await expect(
    library.getByRole('button', { name: en.tools.loadCopy, exact: true }),
  ).toHaveCount(0)

  await page.evaluate((key) => {
    localStorage.setItem(key, '{malformed')
    dispatchEvent(new Event('trip-library-change'))
  }, libraryKey)
  const resetCopies = library.getByRole('button', {
    name: en.tools.resetCopies,
    exact: true,
  })
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe(en.tools.libraryResetConfirm)
    await dialog.dismiss()
  })
  await resetCopies.click()
  expect(
    await page.evaluate((key) => localStorage.getItem(key), libraryKey),
  ).toBe('{malformed')
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe(en.tools.libraryResetConfirm)
    await dialog.accept()
  })
  await resetCopies.click()
  expect(
    await page.evaluate((key) => localStorage.getItem(key), libraryKey),
  ).toBe('[]')
})

test('public JSON and HTML identify share copies while full exports retain private data and saved plans stay intact', async ({
  page,
}) => {
  const trip: Trip = {
    ...emptyTrip,
    title: 'Private title',
    base: 'Private hotel',
    notes: { 1: 'Private day note' },
    preparation: ['documents'],
    items: [
      {
        id: 'gion',
        day: 1,
        entryId: 'PrivateReservation',
        note: 'Private visit note',
      },
      { id: 'gion', day: 2, entryId: 'PrivateRepeat' },
    ],
  }
  const library = JSON.stringify([{ id: 'copy-a', trip }])
  await seed(page, trip, library)
  for (const publicCopy of [false, true]) {
    if (publicCopy)
      await page.getByLabel(en.tools.sanitized, { exact: true }).check()
    for (const format of ['json', 'html'] as const) {
      const label =
        format === 'json'
          ? publicCopy
            ? en.tools.shareDownload
            : en.tools.backup
          : publicCopy
            ? en.tools.shareHtml
            : en.tools.offline
      const received = page.waitForEvent('download')
      await page.getByRole('button', { name: label, exact: true }).click()
      const download = await received
      expect(download.suggestedFilename()).toMatch(
        publicCopy
          ? new RegExp(`^japan-trip-share-.+\\.${format}$`)
          : new RegExp(`^japan-trip-(?!share-).+\\.${format}$`),
      )
      const text = await downloadText(download)
      if (publicCopy) {
        expect(text).not.toMatch(
          /Private title|Private hotel|Private day note|Private visit note|PrivateReservation|PrivateRepeat/,
        )
        if (format === 'json')
          expect(
            parseTrip(text)?.items.map(({ id, day }) => ({ id, day })),
          ).toEqual([
            { id: 'gion', day: 1 },
            { id: 'gion', day: 2 },
          ])
      } else if (format === 'json') expect(JSON.parse(text)).toEqual(trip)
      else expect(text).toContain('Private visit note')
    }
  }
  expect(await storedTrip(page)).toEqual(trip)
  expect(
    await page.evaluate((key) => localStorage.getItem(key), libraryKey),
  ).toBe(library)
})

test('calendar UIDs hide private identifiers and retain entry identity across exports, reordering and independent plans', async () => {
  const trip: Trip = {
    ...emptyTrip,
    startDate: '2026-11-01',
    items: [
      {
        id: 'gion',
        day: 1,
        entryId: 'PrivateReservation_a',
        note: 'PRIVATE NOTE',
      },
      { id: 'gion', day: 1, entryId: 'PrivateReservation_b' },
      {
        id: 'custom-PrivateHotel_a',
        day: 1,
        custom: { name: 'Hotel A', address: 'Address A' },
      },
      {
        id: 'custom-PrivateHotel_b',
        day: 1,
        custom: { name: 'Hotel B', address: 'Address B' },
      },
    ],
  }
  const uids = (calendar: string) =>
    calendar
      .replace(/\r\n /g, '')
      .split('\r\n')
      .filter((line) => line.startsWith('UID:'))
  const first = (await tripCalendar(
    trip,
    'en',
    new Date('2026-10-30T00:00:00Z'),
  ))!
  const second = (await tripCalendar(
    trip,
    'en',
    new Date('2026-10-31T00:00:00Z'),
  ))!
  expect(uids(first)).toHaveLength(4)
  expect(new Set(uids(first)).size).toBe(4)
  expect(uids(first)).toEqual(uids(second))
  expect(uids(first).join('\n')).not.toMatch(
    /PrivateReservation|PrivateHotel|Hotel A|Hotel B|Address/,
  )
  expect(first).not.toContain('PRIVATE NOTE')
  expect(await tripCalendar(trip, 'en', undefined, true)).toContain(
    'PRIVATE NOTE',
  )
  const reordered = (await tripCalendar(
    { ...trip, items: [...trip.items].reverse() },
    'en',
  ))!
  expect(uids(reordered)).toEqual([...uids(first)].reverse())
  const independent = (await tripCalendar(
    {
      ...trip,
      items: [{ id: 'gion', day: 1, entryId: 'AnotherPlansReservation' }],
    },
    'en',
  ))!
  expect(uids(independent)).toHaveLength(1)
  expect(uids(independent)[0]).not.toBe(uids(first)[0])
})

test('calendar download works without secure-context crypto APIs', async ({
  page,
}) => {
  const trip: Trip = {
    ...emptyTrip,
    startDate: '2026-11-01',
    items: [{ id: 'gion', day: 1, entryId: 'PrivateReservation' }],
  }
  await seed(page, trip)
  await page.evaluate(() => {
    Object.defineProperty(crypto, 'subtle', {
      value: undefined,
      configurable: true,
    })
    Object.defineProperty(crypto, 'randomUUID', {
      value: undefined,
      configurable: true,
    })
  })
  await openDetails(page.locator('.trip-extras'))
  const calendar = page
    .locator('.trip-extras > .budget-panel')
    .filter({ has: page.locator('summary', { hasText: en.tools.calendar }) })
  await openDetails(calendar)
  const received = page.waitForEvent('download')
  await calendar
    .getByRole('button', { name: en.tools.calendar, exact: true })
    .click()
  const text = await downloadText(await received)
  expect(text).toContain('BEGIN:VEVENT')
  expect(text).not.toContain('PrivateReservation')
})

test('first-visit TOC and checklist guide links reach every topic without marking it complete', async ({
  page,
}) => {
  await page.goto('/en/first-visit')
  const toc = page.locator('.first-visit-toc')
  await expect(toc).toHaveAccessibleName(en.guide.toc)
  await expect(toc.locator('a')).toHaveCount(firstVisitSteps.length)
  await openDetails(page.locator('.readiness-checklist'))
  const checklist = page.locator('.readiness-checklist')
  for (const step of firstVisitSteps) {
    const checkbox = checklist.getByRole('checkbox', {
      name: step.copy.en.title,
      exact: true,
    })
    await expect(checkbox).not.toBeChecked()
    const link = checklist.getByRole('link', {
      name: `${en.tools.readTopic}: ${step.copy.en.title} ↗`,
      exact: true,
    })
    await expect(link).toHaveAttribute('href', `/en/first-visit#${step.id}`)
    await expect(toc.locator(`a[href="#${step.id}"]`)).toHaveCount(1)
    await link.click()
    await expect(page).toHaveURL(new RegExp(`/en/first-visit#${step.id}$`))
    await expect(page.locator(`#${step.id}`)).toBeVisible()
    await expect(checkbox).not.toBeChecked()
  }
  expect(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key) || '{}').preparation,
      tripKey,
    ),
  ).toBeUndefined()
})

test('checklist explains blocked drafts and editor and travel-day selections retain independent accessible labels and states', async ({
  page,
}) => {
  await seed(page, { ...emptyTrip, days: 3, items: [{ id: 'gion', day: 1 }] })
  const editor = page.getByRole('combobox', {
    name: en.tools.editDay,
    exact: true,
  })
  await openDetails(page.locator('.trip-on-the-go'))
  const travel = page.getByRole('combobox', {
    name: en.tools.travelDay,
    exact: true,
  })
  await editor.selectOption('2')
  await travel.selectOption('3')
  await expect(editor).toHaveValue('2')
  await expect(travel).toHaveValue('3')
  await expect(page.locator('#trip-day-2')).toBeVisible()
  await expect(page.locator('#trip-day-1')).toBeHidden()
  await page.evaluate(() => {
    const write = Storage.prototype.setItem
    Storage.prototype.setItem = function (key, value) {
      if (key === 'japan-travel-trip-v1')
        throw new DOMException('Full', 'QuotaExceededError')
      return write.call(this, key, value)
    }
  })
  await page.getByLabel(en.tools.title, { exact: true }).fill('Unsaved title')
  await page.getByLabel(en.tools.title, { exact: true }).blur()
  page.once('dialog', (dialog) => dialog.accept())
  await page.goto('/en/first-visit')
  await openDetails(page.locator('.readiness-checklist'))
  const checklist = page.locator('.readiness-checklist')
  await expect(checklist).toContainText(en.tools.checklistPendingHelp)
  const draftsLink = checklist.locator('a[href="#trip-drafts"]')
  await draftsLink.click()
  await expect(page.locator('#trip-drafts')).toBeVisible()
  for (const checkbox of await checklist.getByRole('checkbox').all())
    await expect(checkbox).toBeDisabled()
})

test('3D secondary topics open by keyboard and global theme and motion controls describe their scope', async ({
  page,
  browserName,
}) => {
  await page.emulateMedia({
    reducedMotion: 'no-preference',
    colorScheme: 'light',
  })
  await page.goto('/en')
  const scene = page.locator('.diorama')
  const disclosure = scene
    .locator('details')
    .filter({ has: page.locator('summary', { hasText: en.tools.sceneMore }) })
  await expect(disclosure).not.toHaveAttribute('open')
  const summary = disclosure.locator('summary')
  await summary.focus()
  await page.keyboard.press('Enter')
  await expect(disclosure).toHaveAttribute('open', '')
  const topics = disclosure.getByRole('group', {
    name: en.tools.sceneExplore,
    exact: true,
  })
  await expect(topics.getByRole('button')).toHaveCount(3)
  const target = topics.getByRole('button').nth(1)
  // WebKit follows macOS keyboard preferences, so explicitly focus the activation target.
  if (browserName === 'webkit') await target.focus()
  else {
    await page.keyboard.press('Tab')
    await expect(topics.getByRole('button').first()).toBeFocused()
    await page.keyboard.press('Tab')
  }
  await expect(target).toBeFocused()
  await expect(target).toHaveAttribute('aria-pressed', 'false')
  await page.keyboard.press('Space')
  await expect(target).toHaveAttribute('aria-pressed', 'true')
  const supportsWebGL = await page.evaluate(() => {
    const context = document.createElement('canvas').getContext('webgl2', {
      alpha: true,
      antialias: true,
    })
    if (!context) return false
    context.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  })
  await page.getByRole('button', { name: en.scene.start, exact: true }).click()
  await expect(scene).toHaveAttribute(
    'data-scene-status',
    supportsWebGL ? 'ready' : 'fallback',
    { timeout: 15000 },
  )
  if (!supportsWebGL) {
    await expect(scene.locator('.scene-fallback img')).toBeVisible()
    await expect(scene.locator('.scene-hint')).toHaveText(en.scene.fallback)
    await expect(scene.locator('.scene-toolbar')).toBeHidden()
    await expect(target).toHaveAttribute('aria-pressed', 'true')
    await openDetails(page.locator('header .appearance-panel'))
  }
  const theme = supportsWebGL
    ? scene.getByRole('button', { name: new RegExp(en.tools.sceneGlobalTheme) })
    : page
        .locator('header')
        .getByRole('button', { name: en.atmosphere.dark, exact: true })
  await theme.focus()
  await page.keyboard.press('Space')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  const motion = supportsWebGL
    ? scene.getByRole('button', {
        name: new RegExp(en.tools.sceneGlobalMotion),
      })
    : page
        .locator('header')
        .getByRole('button', { name: en.atmosphere.pause, exact: true })
  await motion.focus()
  await page.keyboard.press('Space')
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'still')
  await expect(scene).toHaveAttribute('data-moving', 'false')
})

for (const [lang, dict] of [
  ['en', en],
  ['ja', ja],
  ['th', th],
] as const) {
  test(`${lang} header appearance controls fit narrow screens and Escape returns keyboard focus`, async ({
    page,
    browserName,
  }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.setViewportSize({ width: 320, height: 844 })
    await page.goto(`/${lang}`)
    const panel = page.locator('header .appearance-panel')
    await expect(page.locator('.appearance-panel')).toHaveCount(1)
    const summary = panel.locator('summary')
    await expect(summary).toHaveAccessibleName(dict.atmosphere.label)
    for (const width of [320, 390, 430]) {
      await page.setViewportSize({ width, height: 844 })
      await summary.focus()
      await page.keyboard.press('Enter')
      await expect(panel).toHaveAttribute('open', '')
      await expect(
        panel.getByRole('button', { name: dict.atmosphere.dark, exact: true }),
      ).toBeVisible()
      for (const target of [
        summary,
        ...(await panel.getByRole('button').all()),
      ]) {
        const bounds = await target.boundingBox()
        expect(Number(bounds!.width.toFixed(3))).toBeGreaterThanOrEqual(44)
        expect(Number(bounds!.height.toFixed(3))).toBeGreaterThanOrEqual(44)
      }
      const bounds = await panel.locator('.atmosphere-controls').boundingBox()
      expect(bounds).not.toBeNull()
      expect(bounds!.x).toBeGreaterThanOrEqual(0)
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width)
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true)
      const control = panel.getByRole('button').first()
      // WebKit follows macOS keyboard preferences; real Tab traversal is checked in other engines.
      if (browserName === 'webkit') await control.focus()
      else await page.keyboard.press('Tab')
      await expect(control).toBeFocused()
      await page.keyboard.press('Escape')
      await expect(panel).not.toHaveAttribute('open')
      await expect(summary).toBeFocused()
    }
  })
}

test('reviewed entrance and booking claims retain the source for their own field', () => {
  for (const [id, field, source] of [
    ['sensoji', 'entrance', 'https://www.senso-ji.jp/faq/'],
    ['sensoji', 'accessibility', 'https://www.senso-ji.jp/faq/'],
    ['pref:kyoto:fushimi-inari-taisha', 'entrance', 'https://inari.jp/en/map/'],
    [
      'osaka-museum',
      'booking',
      'https://www.osakamushis.jp/eng/about/faq.html',
    ],
  ] as const) {
    const place = places.find((place) => place.id === id)!
    const visit = visitFor(place)!
    expect(visitSource(visit, field)).toEqual({
      source,
      reviewedAt: '2026-10-30',
    })
    for (const lang of ['en', 'ja', 'th'] as const)
      expect(visit[field]?.[lang].trim()).toBeTruthy()
  }
})
