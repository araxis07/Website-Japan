import { test, expect, openDetails } from './fixtures'
import { emptyTrip, tripKey, type TripEntry } from '../src/lib/trip'
import en from '../src/i18n/dictionaries/en.json'

test('a plain unscheduled save has an explicit Remove action and Undo restores it', async ({
  page,
}) => {
  await page.goto('/en/destinations/kyoto')
  await page
    .getByRole('button', {
      name: `${en.trip.save}: Kiyomizu-dera`,
      exact: true,
    })
    .click()
  const remove = page.getByRole('button', {
    name: `${en.trip.remove}: Kiyomizu-dera`,
    exact: true,
  })
  await expect(remove).toHaveAttribute('aria-pressed', 'true')
  await expect(remove).toContainText(en.trip.remove)
  await remove.focus()
  await page.keyboard.press('Enter')
  expect(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!).items,
      tripKey,
    ),
  ).toEqual([])
  await page
    .locator('.trip-feedback')
    .getByRole('button', { name: en.tools.undo, exact: true })
    .click()
  await expect(remove).toBeVisible()
  expect(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!).items,
      tripKey,
    ),
  ).toEqual([{ id: 'kiyomizu', day: 0 }])
})

for (const example of [
  {
    name: 'a scheduled visit with notes',
    items: [
      {
        id: 'kiyomizu',
        day: 2,
        time: '10:15',
        note: 'Keep my ticket note',
        duration: 60,
        buffer: 15,
      },
    ],
  },
  {
    name: 'two unscheduled visits',
    items: [
      { id: 'kiyomizu', day: 0 },
      { id: 'kiyomizu', day: 0, entryId: 'return-visit' },
    ],
  },
  {
    name: 'an explicitly entered zero-minute buffer',
    items: [{ id: 'kiyomizu', day: 0, buffer: 0 }],
  },
] satisfies { name: string; items: TripEntry[] }[]) {
  test(`guide controls open the trip without removing ${example.name}`, async ({
    page,
  }) => {
    await page.goto('/en/destinations/kyoto')
    const trip = { ...emptyTrip, items: example.items, title: 'Keep this trip' }
    await page.evaluate(
      ({ key, trip }) => {
        localStorage.setItem(key, JSON.stringify(trip))
        dispatchEvent(new Event('trip-change'))
      },
      { key: tripKey, trip },
    )
    const saved = page.getByRole('link', {
      name: `${en.trip.saved}: Kiyomizu-dera · ${en.trip.plan} ↗`,
      exact: true,
    })
    await expect(saved).toHaveAttribute('href', '/en/my-trip')
    await expect(
      page.getByRole('button', {
        name: `${en.trip.remove}: Kiyomizu-dera`,
        exact: true,
      }),
    ).toHaveCount(0)
    await saved.focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL('/en/my-trip')
    await expect(
      page.locator('.trip-day li[data-place-id="kiyomizu"]'),
    ).toHaveCount(example.items.length)
    expect(
      await page.evaluate(
        (key) => JSON.parse(localStorage.getItem(key)!),
        tripKey,
      ),
    ).toEqual(trip)
    if ('note' in example.items[0]) {
      await openDetails(page.locator('.trip-visit-editor').first())
      await expect(
        page.getByLabel(`${en.tools.notes}: Kiyomizu-dera`, {
          exact: true,
        }),
      ).toHaveValue('Keep my ticket note')
    }
  })
}

test('travel controls keep readable spacing and touch targets at narrow widths in every language', async ({
  page,
}) => {
  test.setTimeout(90_000)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.addInitScript(
    ({ key, trip }) => {
      localStorage.setItem(key, JSON.stringify(trip))
    },
    { key: tripKey, trip: { ...emptyTrip, items: [{ id: 'gion', day: 1 }] } },
  )
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 })
    for (const lang of ['en', 'ja', 'th']) {
      await page.goto(`/${lang}/explore?scope=places&view=list`)
      const menu = await page.locator('.menu-toggle').boundingBox()
      expect(menu!.width, `${lang}/${width} menu width`).toBeGreaterThanOrEqual(
        44,
      )
      expect(
        menu!.height,
        `${lang}/${width} menu height`,
      ).toBeGreaterThanOrEqual(44)
      const language = await page
        .locator('.language-picker > summary')
        .boundingBox()
      expect(
        language!.width,
        `${lang}/${width} language target`,
      ).toBeGreaterThanOrEqual(44)
      const gap = await page
        .locator('.explorer-toolbar > label')
        .evaluate((label) => {
          const text = Array.from(label.childNodes).find(
            (node) =>
              node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
          )!
          const range = document.createRange()
          range.selectNode(text)
          const caption = range.getBoundingClientRect()
          const select = label.querySelector('select')!.getBoundingClientRect()
          return Math.max(
            select.left - caption.right,
            select.top - caption.bottom,
          )
        })
      expect(gap, `${lang}/${width} browse label gap`).toBeGreaterThanOrEqual(
        7.5,
      )
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${lang}/${width} explorer overflow`,
      ).toBe(true)

      await page.goto(`/${lang}/my-trip`)
      const print = await page.locator('.planner-toolbar .button').boundingBox()
      const toolbar = await page.locator('.planner-toolbar').boundingBox()
      expect(
        print!.height,
        `${lang}/${width} print target`,
      ).toBeGreaterThanOrEqual(44)
      expect(print!.width, `${lang}/${width} print fits content`).toBeLessThan(
        toolbar!.width - 8,
      )
      await expect(page.locator('.trip-task-links a').first()).toBeVisible()
      for (const link of await page.locator('.trip-task-links a').all())
        expect(
          (await link.boundingBox())!.height,
          `${lang}/${width} task target`,
        ).toBeGreaterThanOrEqual(44)
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${lang}/${width} planner overflow`,
      ).toBe(true)

      await page.goto(`/${lang}/destinations/kyoto`)
      await expect(
        page.locator('.map-place-list h3 button').first(),
      ).toBeVisible()
      for (const button of await page
        .locator('.map-place-list h3 button')
        .all())
        expect(
          (await button.boundingBox())!.height,
          `${lang}/${width} place target`,
        ).toBeGreaterThanOrEqual(44)
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${lang}/${width} guide overflow`,
      ).toBe(true)
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/en/explore?scope=places&view=list')
  const result = page.locator('.place-search-results li').first()
  const button = await result.locator(':scope > button').boundingBox()
  expect(button!.height).toBeGreaterThanOrEqual(44)
  expect(button!.width).toBeLessThan((await result.boundingBox())!.width - 8)
})

test('manual Pause stops decorative motion without hiding content and task pages reduce decoration', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/en')
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'moving')
  const copy = page.locator('.hero-copy')
  const action = page.locator('.hero-actions .button')
  await expect(copy).not.toHaveCSS('animation-name', 'none')
  await expect(action).not.toHaveCSS('transition-duration', '0s')
  const homeDecoration = await page
    .locator('.sakura-atmosphere')
    .evaluate((element) => Number(getComputedStyle(element).opacity))
  await openDetails(page.locator('.appearance-panel'))
  await page
    .getByRole('button', { name: en.atmosphere.pause, exact: true })
    .click()
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'still')
  await expect(copy).toHaveCSS('animation-name', 'none')
  await expect(action).toHaveCSS('transition-duration', '0s')
  await expect(page.locator('#hero-title')).toBeVisible()
  await expect(action).toBeVisible()
  await page.goto('/en/my-trip')
  await expect(page.locator('.planner-heading h1')).toBeVisible()
  expect(
    await page
      .locator('.sakura-atmosphere')
      .evaluate((element) => Number(getComputedStyle(element).opacity)),
  ).toBeLessThan(homeDecoration)
})
