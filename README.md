# 日本旅行 · Japan Travel

An independent, bilingual Japan travel guide. Japanese is the default (`/ja`); English is at `/en`.

The 2026 renovation replaces the old simulated forms, broken routes and animation-heavy landing page with a photographic, responsive guide. It includes searchable destinations, six destination guides in both languages, nine regional links, keyboard-accessible season tabs, practical travel information and a real 404 page.

## Run locally

Use Node.js 24 LTS (minimum 22.13) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. `/` redirects to `/ja`.

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

The stack is Next.js 16, React 19 and TypeScript. Explicit CSS in `src/app/globals.css` replaces the broken Tailwind configuration. System fonts and locally stored photos avoid external font/image requests in the visitor's browser. Next Image generates responsive optimized images. No database, API keys or remote service is needed to run the guide.

## Browser checks

```sh
npx playwright install chromium webkit
npm run build
npm test
```

Playwright starts a production server on port 3100 and checks desktop Chromium and mobile WebKit. Coverage includes both locales, all detail routes, image loading, no horizontal overflow, hash links, filters/search/empty state, keyboard season tabs, mobile menu, FAQ, language switching, invalid routes and server-rendered content without JavaScript. This is browser emulation, not physical-device testing.

## Edit the content

- `src/i18n/dictionaries/en.json` and `ja.json`: interface, planning information and FAQs. Keep their keys aligned.
- `src/data/travel.ts`: destination copy, regional links, seasons and the editorial review date.
- `public/images/`: local photo assets. Sources are listed on `/en/credits` and `/ja/credits`.
- `src/components/`: one implementation of each section; superseded `.improved` and backup copies were removed.
- `src/app/[lang]/destinations/[slug]/page.tsx`: shared guide template, generated statically for both languages.

The nine-region editorial grouping includes Hokuriku Shinetsu and Tokai within Chubu. Official JNTO links explain that distinction. Stay lengths are suggestions; season windows are approximate, not live forecasts. Check original sources before changing travel advice or the review date.

## Production domain and SEO

Set `NEXT_PUBLIC_BASE_URL` to the real website origin in your deployment environment **before building**. See `.env.example`.

Without that setting, canonical links are omitted and the sitemap is empty so the site does not claim the old, unverified `japantravel-guide.com` domain. With it, the sitemap contains only existing home, destination and credit pages in both languages, with language alternates. Metadata, icons and structured data are localized. Next's `globalNotFound` option handles invalid locale and destination URLs with a full HTML 404 document.

No deployment was performed. Contact/newsletter forms and invented contact/social details were removed because they had no working backend. Visitor help links to JNTO; the site does not collect form data or process bookings.

## Assets and tooling

```sh
npm run icons   # regenerate the SVG-derived PNG/ICO icons; includes an ICO self-check
npm run analyze # optional webpack bundle report
```

Photography comes from Unsplash; see the in-app credits and [Unsplash license](https://unsplash.com/license). The source icons are in `public/icon.svg`.

`npm audit --omit=dev` reports no known production dependency vulnerabilities at the renovation check. Development tooling still has upstream glob/braces advisories through `eslint-config-next`; do not force-downgrade Next's lint configuration to silence them. ESLint stays on the compatible 9.x line because the current Next lint plugins do not yet declare ESLint 10 support. Recheck advisories when those packages update.

The original repository tracked `.next` build artifacts. They are now removed from version control and ignored. The local `.next` directory remains available; no local build data was discarded.

## Official content references

Reviewed on 2026-10-22:

- [Destinations and regional guides — JNTO](https://www.japan.travel/en/destinations/)
- [Travel planning — JNTO](https://www.japan.travel/en/plan/)
- [Seasonal weather — JNTO](https://www.japan.travel/en/plan/weather/)
- [IC cards — JNTO](https://faq.japan-travel.jnto.go.jp/en/plan/ic-card/)
- [JAPAN RAIL PASS prices](https://japanrailpass.net/en/purchase/price/)
- [Accommodation — JNTO](https://www.japan.travel/en/au/plan/accommodation/)
- [Responsible travel — JNTO](https://www.japan.travel/en/responsible-travel-guide/)

The site is an independent editorial guide and is not affiliated with JNTO.
