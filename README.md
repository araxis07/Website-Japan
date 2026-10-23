# 日本旅行 · Japan Travel

An independent Japan travel guide in Japanese (`/ja`, the default), English (`/en`) and Thai (`/th`).

The 2026 renovation is a Japanese travel journal in warm paper, vermilion and midnight indigo. Start with a six-step first-visit guide, explore all 47 prefectures on real street maps, and save places into a personal day plan. Every prefecture has Japanese, English and Thai content: suggested base, arrival overview, two mapped highlights and official references. The six longer city/area guides retain accommodation advice, airport access, rainy-day alternatives, day plans, local food and galleries. Six cultural experiences, nine editorial regions and 7-, 10- and 14-day sample routes remain available.

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

The stack is Next.js 16, React 19 and TypeScript. Explicit CSS in `src/app/globals.css` replaces the broken Tailwind configuration. System fonts and locally stored photos avoid external font/image requests in the visitor's browser. Next Image generates responsive optimized images. No database or API key is required. Street-map tiles need internet access to OpenStreetMap; the guide text, place lists and saved-plan controls still work if the tile service fails.

## Interactive scenery and motion

The home page contains an original Three.js miniature: Mount Fuji, a torii gate, cherry trees, a pagoda, a bridge and lanterns. Drag horizontally to rotate, tap a lantern or use the light button for night/day, choose a season, or use the rotate/reset/pause controls. These controls also work with a keyboard.

`src/components/JapanDiorama.tsx` initially shows a local render of the same miniature. The **Explore the 3D scene** button loads `src/lib/japan-scene.ts` on demand so WebGL initialization does not block the initial page. The renderer caps pixel density at 1.5 and animation at about 30 frames per second, caches static shadows, pauses offscreen or in a background tab, and disposes GPU resources on unmount. Reduced-motion preferences disable autonomous motion. Devices without WebGL2 or with a lost graphics context retain the miniature image; the travel content remains available.

Every page has a day/night switch, remembers the chosen theme, and starts from the system preference. The home miniature follows the same theme. A shared CSS 3D layer animates 28 falling sakura petals in both modes using perspective, rotation and depth. This keeps the browser from initializing an extra WebGL renderer on page load. A visible pause control freezes the petals; reduced-motion preferences show static blossom artwork. The petals do not require WebGL. Card depth, photo transitions, section entrances, itinerary changes and a reading progress line provide additional motion. CSS animations respect reduced-motion preferences; content is server-rendered and stays readable without JavaScript. No GSAP, React Three Fiber or model downloads are required.

## Maps and personal trips

Leaflet displays real OpenStreetMap street tiles on the home overview, `/[lang]/explore`, city guides and prefecture guides. The explorer searches all 47 prefectures and landmark names in three languages, filters by region and opens a selected guide. National-scale dots expand into numbered markers as the map zooms in. Maps can be dragged, pinched, zoomed with buttons and operated by keyboard; the adjacent place list is always available. Loading failures offer retry and Google Maps links.

The 94 prefecture highlights and 18 existing guide places have reviewed coordinates, Japanese map-location labels and links to their original OSM objects. Named Google Maps search/directions links help locate the actual entrance; the site does not calculate routes, journey times, current opening hours or bookings. Some highlights are far apart, so prefecture pages explicitly identify them as choices rather than a same-day itinerary.

Tiles load only near the viewport, use normal browser caching and show OpenStreetMap attribution. There is no offline tile download, runtime geocoding, autocomplete service or location permission. Public OSM tiles are best-effort infrastructure: follow the [tile usage policy](https://operations.osmfoundation.org/policies/tiles/) and use an appropriate hosted tile provider if traffic or availability requirements grow. Tile requests go directly from the browser to OSM and disclose the usual IP/referrer/request information. Coordinates and Japanese location labels include © OpenStreetMap contributors data under the [ODbL](https://www.openstreetmap.org/copyright).

Use **Save to my trip** on a destination or place, then open `/th/my-trip`, `/en/my-trip` or `/ja/my-trip`. Choose 1–30 days, assign places, reorder them within a day and use **Print / save PDF**. Unscheduled places remain in the plan when its duration is shortened. This is a personal list, not automatic route optimization or a booking service.

Plans use `localStorage` under `japan-travel-trip-v1`; they remain on this browser and update across its tabs. There is no account, server copy or cross-device sync. Clearing browser data removes the plan; print a PDF to keep a separate copy. Stored data is validated before use. Unreadable data requires an explicit confirmed reset, and failed writes do not replace the previous plan. Future changes to place IDs or the storage schema need a migration.

## Browser checks

```sh
npx playwright install chromium webkit
npm run build
npm test
```

Playwright starts a production server on port 3100 and checks desktop Chromium and mobile WebKit. Coverage includes all three locales, all detail routes, image loading, no horizontal overflow, hash links, filters/search/empty state, keyboard season tabs, mobile menu, FAQ, language switching, invalid routes and server-rendered content without JavaScript. Checks also cover all 141 localized prefecture pages, complete content records, first-visit flows, multilingual prefecture filters, map markers and keyboard selection, tile failure/retry, persisted/synchronized theme, blocked appearance storage, 3D petals, on-demand miniature controls, WebGL fallback, gallery focus, trip scheduling/reordering, reloads, cross-tab updates, invalid/blocked storage, failed writes, print styles and security headers. Automated browser tests substitute a tiny tile image to avoid repeatedly downloading public OSM tiles; a separate visual check uses live tiles. This is browser emulation, not physical-device testing.

To check development-only hydration warnings, stop any running development server first, then run:

```sh
PLAYWRIGHT_DEV=1 npm test -- --grep 'browser extension'
```

This test simulates Grammarly adding attributes to `<body>` before React hydrates, then checks all three locales and the 404 navigation. The root bodies narrowly suppress extension-added attributes; root HTML elements suppress only the theme attribute set by the constant before-paint script. Descendant hydration warnings remain enabled. The test server uses `localhost` so Next.js permits its development WebSocket origin, and stops automatically after testing.

## Edit the content

- `src/i18n/dictionaries/en.json`, `ja.json` and `th.json`: interface, planning information and FAQs. Keep their keys aligned.
- `src/data/journeys.ts`: cultural experiences, sample multi-day routes and day plans/food notes for every destination. Route durations must equal the sum of their stops.
- `src/data/travel.ts`: destination copy, regional links, seasons and the editorial review date.
- `src/data/guides.ts`: practical advice, official references and per-guide review dates.
- `src/data/places.ts`: stable existing place IDs, sourced coordinates, map URLs and guide routing. Do not rename IDs without migrating stored plans.
- `src/data/prefectures.ts`: 47 prefectures, arrival/base advice, source links and review dates in all three languages.
- `src/data/prefecture-places.ts`: 94 featured-place records with names, coordinates, Japanese location labels and OSM source URLs. Check the returned feature itself: stations and bus stops can share a landmark name.
- `src/data/first-visit.ts`: six preparation/arrival steps and official references.
- `src/components/StreetMap.tsx`: shared real map, lazy initialization, keyboard interaction, provider-failure handling and attribution.
- `src/components/Atmosphere.tsx`, `src/lib/appearance.ts` and the atmosphere CSS: global theme, persistence and ambient 3D petals.
- `src/data/photos.ts` and `public/images/`: local photographs, translated captions and credits. Sources are listed on each locale’s `/credits` page.
- `src/components/`: one implementation of each section; superseded `.improved` and backup copies were removed.
- `src/app/[lang]/destinations/[slug]/page.tsx`: shared guide template, generated statically for all three languages.

The nine-region editorial grouping includes Hokuriku Shinetsu and Tokai within Chubu. Official JNTO links explain that distinction. Stay lengths are suggestions; season windows are approximate, not live forecasts. Check original sources before changing travel advice or the review date.

## Production domain and SEO

Set `NEXT_PUBLIC_BASE_URL` to the real website origin in your deployment environment **before building**. See `.env.example`.

Without that setting, canonical links are omitted and the sitemap is empty so the site does not claim the old, unverified `japantravel-guide.com` domain. With it, the sitemap contains 171 home, destination, prefecture, explorer, beginner and credit URLs across all three languages, with language alternates. Personal `/my-trip` pages are excluded from the sitemap and marked `noindex`. Metadata, icons and structured data are localized. Next's `globalNotFound` option handles invalid locale and destination URLs with a full HTML 404 document.

No deployment was performed. Contact/newsletter forms and invented contact/social details were removed because they had no working backend. Visitor help links to JNTO; the site does not collect form data or process bookings.

## Assets and tooling

```sh
npm run icons   # regenerate the SVG-derived PNG/ICO icons; includes an ICO self-check
npm run analyze # optional webpack bundle report
```

Photography comes from Unsplash; see the in-app credits and [Unsplash license](https://unsplash.com/license). The source icons are in `public/icon.svg`. The 3D scene is original procedural artwork, not a geographically accurate reconstruction.

`npm audit --omit=dev` reports no known production dependency vulnerabilities at the renovation check. The full audit reports five High entries along the development-only `eslint-config-next → fast-glob → micromatch → braces` chain, from [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). The upstream advisory lists no patched version at this check. Do not force-downgrade Next's lint configuration to silence it. ESLint stays on the compatible 9.x line because the current Next lint plugins do not yet declare ESLint 10 support. Recheck advisories when those packages update.

Production responses disable the framework header and include `nosniff`, frame protection, referrer/permission restrictions and a limited CSP for base URLs, objects, frames and form destinations. This is not a strict script CSP. Saved plans validate length, schema, known IDs, duplicates and day bounds before use. The current file review found no credential-pattern matches in tracked/new source files or reviewed historical text blobs; this is not a penetration test or proof that all secrets/vulnerabilities are absent.

The original repository tracked `.next` build artifacts. They are now removed from version control and ignored. The local `.next` directory remains available; no local build data was discarded.

## Official content references

General guidance reviewed on 2026-10-22; expanded city guides, all prefectures, first-visit guidance and mapped locations reviewed on 2026-10-23. Each city guide links its transport operators, museums and tourism authorities in its sources section. General references:

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

Latest implementation and verification notes: [47-prefecture upgrade](docs/next-upgrade.md). Earlier renovation measurements are historical, not measurements of the current ambient 3D release.
