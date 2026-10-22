# 日本旅行 · Japan Travel

An independent Japan travel guide in Japanese (`/ja`, the default), English (`/en`) and Thai (`/th`).

The 2026 renovation is a Japanese travel journal in warm paper, vermilion and indigo. Explore an interactive 3D miniature, search six destination guides, discover six cultural experiences, compare 7-, 10- and 14-day routes, browse nine regions and plan with practical advice in all three languages. Each destination includes accommodation areas, airport access, rainy-day alternatives, preparation advice, a day plan, local food, nearby places and a photo gallery.

## Run locally

Use Node.js 24 LTS (minimum 22.13) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. `/` redirects to `/ja`.

Run one development server per project. If Next.js reports “Another next dev server is already running”, use the existing URL or stop that server with Ctrl+C in its terminal before restarting. For a background server, verify that the PID and directory shown by Next.js belong to this project, then stop that PID with `kill`. Changing ports does not allow a second development server to use the same build directory.

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

The stack is Next.js 16, React 19 and TypeScript. Explicit CSS in `src/app/globals.css` replaces the broken Tailwind configuration. System fonts and locally stored photos avoid external font/image requests in the visitor's browser. Next Image generates responsive optimized images. No database, API keys or remote service is needed to run the guide.

## Interactive scenery and motion

The home page contains an original Three.js miniature: Mount Fuji, a torii gate, cherry trees, a pagoda, a bridge and lanterns. Drag horizontally to rotate, tap a lantern or use the light button for night/day, choose a season, or use the rotate/reset/pause controls. These controls also work with a keyboard.

`src/components/JapanDiorama.tsx` initially shows a local render of the same miniature. The **Explore the 3D scene** button loads `src/lib/japan-scene.ts` on demand so WebGL initialization does not block the initial page. The renderer caps pixel density at 1.5 and animation at about 30 frames per second, caches static shadows, pauses offscreen or in a background tab, and disposes GPU resources on unmount. Reduced-motion preferences disable autonomous motion. Devices without WebGL2 or with a lost graphics context retain the miniature image; the travel content remains available.

Card tilt, photo transitions, section entrances, itinerary changes and a reading progress line provide additional motion. CSS animations respect reduced-motion preferences; content is server-rendered and stays readable without JavaScript. No GSAP, React Three Fiber or model downloads are required.

## Maps and personal trips

The home map connects six destinations to their guides. Each guide includes three nearby places, a schematic local map and Google Maps search/directions links. National outlines use public-domain Natural Earth data. Pins and distances are approximate; the local diagrams do not show streets or walking routes. No map API key or embedded third-party map is needed.

Use **Save to my trip** on a destination or place, then open `/th/my-trip`, `/en/my-trip` or `/ja/my-trip`. Choose 1–30 days, assign places, reorder them within a day and use **Print / save PDF**. Unscheduled places remain in the plan when its duration is shortened. This is a personal list, not automatic route optimization or a booking service.

Plans use `localStorage` under `japan-travel-trip-v1`; they remain on this browser and update across its tabs. There is no account, server copy or cross-device sync. Clearing browser data removes the plan; print a PDF to keep a separate copy. Stored data is validated before use. Unreadable data requires an explicit confirmed reset, and failed writes do not replace the previous plan. Future changes to place IDs or the storage schema need a migration.

## Browser checks

```sh
npx playwright install chromium webkit
npm run build
npm test
```

Playwright starts a production server on port 3100 and checks desktop Chromium and mobile WebKit. Coverage includes all three locales, all detail routes, image loading, no horizontal overflow, hash links, filters/search/empty state, keyboard season tabs, mobile menu, FAQ, language switching, invalid routes and server-rendered content without JavaScript. Checks also cover on-demand 3D, canvas changes, reduced motion, WebGL fallback, map links, gallery focus, trip scheduling/reordering, reloads, cross-tab updates, invalid/blocked storage, failed writes and print styles. This is browser emulation, not physical-device testing.

To check development-only hydration warnings, stop any running development server first, then run:

```sh
PLAYWRIGHT_DEV=1 npm test -- --grep 'browser extension'
```

This test simulates Grammarly adding attributes to `<body>` before React hydrates, then checks all three locales and the 404 navigation. The two root bodies use `suppressHydrationWarning` only at that element; descendant hydration warnings remain enabled. The test server uses `localhost` so Next.js permits its development WebSocket origin, and stops automatically after testing.

## Edit the content

- `src/i18n/dictionaries/en.json`, `ja.json` and `th.json`: interface, planning information and FAQs. Keep their keys aligned.
- `src/data/journeys.ts`: cultural experiences, sample multi-day routes and day plans/food notes for every destination. Route durations must equal the sum of their stops.
- `src/data/travel.ts`: destination copy, regional links, seasons and the editorial review date.
- `src/data/guides.ts`: practical advice, official references and per-guide review dates.
- `src/data/places.ts`: stable saved-place IDs, localized names and approximate coordinates. Do not rename IDs without migrating stored plans.
- `src/data/photos.ts` and `public/images/`: local photographs, translated captions and credits. Sources are listed on each locale’s `/credits` page.
- `src/components/`: one implementation of each section; superseded `.improved` and backup copies were removed.
- `src/app/[lang]/destinations/[slug]/page.tsx`: shared guide template, generated statically for all three languages.

The nine-region editorial grouping includes Hokuriku Shinetsu and Tokai within Chubu. Official JNTO links explain that distinction. Stay lengths are suggestions; season windows are approximate, not live forecasts. Check original sources before changing travel advice or the review date.

## Production domain and SEO

Set `NEXT_PUBLIC_BASE_URL` to the real website origin in your deployment environment **before building**. See `.env.example`.

Without that setting, canonical links are omitted and the sitemap is empty so the site does not claim the old, unverified `japantravel-guide.com` domain. With it, the sitemap contains 24 existing home, destination and credit URLs across all three languages, with language alternates. Personal `/my-trip` pages are excluded from the sitemap and marked `noindex`. Metadata, icons and structured data are localized. Next's `globalNotFound` option handles invalid locale and destination URLs with a full HTML 404 document.

No deployment was performed. Contact/newsletter forms and invented contact/social details were removed because they had no working backend. Visitor help links to JNTO; the site does not collect form data or process bookings.

## Assets and tooling

```sh
npm run icons   # regenerate the SVG-derived PNG/ICO icons; includes an ICO self-check
npm run analyze # optional webpack bundle report
```

Photography comes from Unsplash; see the in-app credits and [Unsplash license](https://unsplash.com/license). The source icons are in `public/icon.svg`. The 3D scene is original procedural artwork, not a geographically accurate reconstruction.

`npm audit --omit=dev` reports no known production dependency vulnerabilities at the renovation check. Development tooling still has upstream glob/braces advisories through `eslint-config-next`; do not force-downgrade Next's lint configuration to silence them. ESLint stays on the compatible 9.x line because the current Next lint plugins do not yet declare ESLint 10 support. Recheck advisories when those packages update.

The original repository tracked `.next` build artifacts. They are now removed from version control and ignored. The local `.next` directory remains available; no local build data was discarded.

## Official content references

General guidance reviewed on 2026-10-22; expanded city guides reviewed on 2026-10-23. Each city guide links its transport operators, museums and tourism authorities in its sources section. General references:

- [Destinations and regional guides — JNTO](https://www.japan.travel/en/destinations/)
- [Travel planning — JNTO](https://www.japan.travel/en/plan/)
- [Seasonal weather — JNTO](https://www.japan.travel/en/plan/weather/)
- [IC cards — JNTO](https://faq.japan-travel.jnto.go.jp/en/plan/ic-card/)
- [JAPAN RAIL PASS prices](https://japanrailpass.net/en/purchase/price/)
- [Accommodation — JNTO](https://www.japan.travel/en/au/plan/accommodation/)
- [Tea ceremony — JNTO](https://www.japan.travel/en/guide/tea-ceremony/)
- [Onsen etiquette — JNTO](https://faq.japan-travel.jnto.go.jp/en/guide/how-to-best-enjoy-onsen/)
- [Accessible travel — JNTO](https://www.japan.travel/en/plan/traveling-with-disability/)
- [Luggage storage and delivery — JNTO](https://www.japan.travel/en/plan/getting-around/luggage-storage/)
- [Currency and payment — JNTO](https://www.japan.travel/en/plan/currency/)
- [Responsible travel — JNTO](https://www.japan.travel/en/responsible-travel-guide/)

The site is an independent editorial guide and is not affiliated with JNTO.
