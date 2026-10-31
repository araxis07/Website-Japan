import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 3,
  reporter: 'list',
  use: { baseURL: 'http://localhost:3100', trace: 'retain-on-failure' },
  webServer: {
    command: `npm run ${process.env.PLAYWRIGHT_DEV === '1' ? 'dev' : 'start'} -- --port 3100`,
    url: 'http://localhost:3100/en',
    reuseExistingServer: false,
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 1000 },
      },
    },
    { name: 'mobile-webkit', use: { ...devices['iPhone 13'] } },
    {
      name: 'desktop-firefox',
      testMatch:
        /(?:refinement|next-phase|trip-safety|design-balance|travel-reliability|next-direction|october-hardening|visitor-flow|planning-clarity)\.spec\.ts$/,
      use: { ...devices['Desktop Firefox'] },
    },
  ],
})
