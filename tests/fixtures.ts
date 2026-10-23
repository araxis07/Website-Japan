import { test as base, expect } from '@playwright/test'

// Test interactions without repeatedly downloading public map tiles. Live tiles are checked separately.
export const test = base.extend({
  context: async ({ context }, run) => {
    await context.route('https://tile.openstreetmap.org/**', (route) =>
      route.fulfill({
        contentType: 'image/png',
        body: Buffer.from(
          'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jZ1kAAAAASUVORK5CYII=',
          'base64',
        ),
      }),
    )
    await run(context)
  },
})
export { expect }
