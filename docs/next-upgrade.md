# Travel experience upgrade

## Scope and design

The visitor should be able to prepare for a first Japan trip, choose any of the 47 prefectures, locate an actual place on a street map and save it into a day plan in Japanese, English or Thai. Existing guide URLs and saved-place IDs must remain valid.

Keep the Japanese paper aesthetic the owner approved: daylight paper `#f6f2e9`, ink `#23333d`, torii `#b33d2d`, sakura `#e9a6b8`; add midnight indigo `#101d2b` and lantern gold `#e8bc7c`. System serif headings and readable system sans-serif body copy remain. Use depth in the landscape, floating petals and interactive surfaces, with quiet reading areas. Motion and theme controls stay available on every page.

The navigation follows the visitor's task: first-visit preparation → explore prefectures and a real map → saved trip. Province pages place arrival information, local highlights and map/directions together. Geographic markers identify places, not decorative offsets. All three languages must contain the same substantive sections.

## Implementation reach

- Shared locale layout, navigation, footer, theme/ambient effects and all existing page styles.
- Real-map component for the home overview, detailed guides and prefecture explorer; map loading/failure and accessible list alternatives.
- 47 prefecture records and localized pages, first-visit guide, canonical/hreflang metadata and sitemap.
- Place identifiers, trip links, storage validation and existing plan compatibility.
- Translation parity, browser/keyboard/mobile tests, dependency and tracked-file security checks.

## Source and operating constraints

- Prefecture references: [JNTO destinations](https://www.japan.travel/en/destinations/), with a source link on every prefecture page. Access advice is a planning overview, not a timetable or a fare quote.
- Street maps: [Leaflet](https://leafletjs.com/) and [OpenStreetMap tiles](https://operations.osmfoundation.org/policies/tiles/), with visible attribution, normal browser caching and no tile prefetch/offline download.
- Directions: [Google Maps URLs](https://developers.google.com/maps/documentation/urls/get-started). No Google API key is needed for external directions.
- Keep static rendering; do not add an account/backend or silently replace saved plans. Do not publish a guessed domain or claim real-time transport data.

Implementation and verification results follow.

## Delivered experience

- Added `/[lang]/first-visit`, `/[lang]/explore` and `/[lang]/prefectures/[slug]`. The header, hero and three-step start section follow preparation → prefecture selection → saved trip.
- All 47 prefectures have Japanese, English and Thai names, summaries, base/arrival advice, two map highlights, an official JNTO link and a review date. These are starting guides, not an exhaustive attraction directory or live transport feed.
- Added 94 prefecture highlight records and reviewed the 18 existing guide places against OpenStreetMap objects. Each includes a Japanese location label, a source URL and named Google Maps directions. Ambiguous search results were checked individually: stops/stations with the same name were replaced with the actual park, shrine or garden. The Kakunodate highlight identifies Aoyagi Samurai Manor specifically.
- Replaced the schematic maps with a shared Leaflet street map, lazy loading, visible attribution, zoom/pan, labelled keyboard markers, accessible place lists and retry/fallback links. Removed the unused schematic SVG and its CSS. National markers become small dots until zoomed in so Japan remains readable.
- Added a shared persistent day/night theme, synchronized tabs, blocked-storage fallback and CSS 3D sakura in both modes. CSS depth is used for page surfaces and prefecture artwork; the original interactive Three.js miniature remains user-activated. Reduced motion shows static blossom artwork, and the pause control freezes falling petals.
- Existing destination URLs and saved-place IDs remain valid. Prefecture places open their correct guide from My trip. Storage parsing now also rejects oversized input before JSON parsing.
- Added source links for first-arrival advice from the Digital Agency, JNTO and MOFA. Nagasaki access explicitly follows JR Kyushu’s current Takeo-Onsen transfer rather than the older direct-service description on the tourism overview.

## Verification

- ESLint, TypeScript checks during the build and static generation pass (179 generated paths, including framework/metadata paths).
- All 60 production Playwright checks pass on desktop Chromium and mobile WebKit. This covers every localized prefecture route, translation/content invariants, beginner-to-saved-trip flow, search/filter/reset, real map interaction and keyboard selection, tile failure/retry, day/night persistence and cross-tab sync, blocked storage, CSS 3D pause/resume, the interactive miniature, gallery focus, plan preservation and printing.
- Both development hydration regression tests pass with Grammarly-like body attributes and a saved night theme, covering all three locales and navigation from the 404 page. Root HTML/body suppression remains narrow; descendants are still checked.
- No-JavaScript checks cover server-rendered content and all 47 explorer links. The `<noscript>` map message is checked in the returned HTML; lists and external map links remain present. WebGL failure preserves the miniature image and does not disable the CSS petals or travel content.
- One-off axe WCAG 2 A/AA and 2.1 AA checks across six representative routes × two widths × two themes reported zero automated violations and no horizontal overflow. Routes: `/en`, `/th/explore`, `/ja/prefectures/nara`, `/en/first-visit`, `/th/destinations/tokyo`, `/th/my-trip`. These scans use reduced motion to avoid transient animation opacity; they are not a complete manual accessibility audit.
- Live OSM tiles were visually checked separately on desktop and mobile. Automated interaction tests substitute a tiny tile image, avoiding repeated public-tile downloads.
- A temporary `https://example.test` build verified 171 sitemap URLs, 171 canonical links, 513 language alternates and `noindex` on the three personal-trip routes. The real deployment domain remains an environment setting; the final local build leaves it unset.
- Official JNTO prefecture references and first-visit sources were reviewed. MOFA was readable through the web tool, although the command-line link checker received its bot-blocking 403 response.

## Security and file review

`npm audit --omit=dev` reports **zero known production dependency vulnerabilities**. The full audit reports **five High entries** in one development-only chain: `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`. The upstream [GHSA-vfj7-8cjw-p6xm advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) lists no patched version at the check. The proposed force fix downgrades Next’s ESLint configuration to 14.x; it was not applied to this Next 16 project. These packages are lint tooling, not visitor-controlled runtime request handlers. Recheck when a compatible upstream fix is released.

Responses disable `X-Powered-By`, add Permissions-Policy and a limited CSP for base URLs, objects, frames and forms, and retain nosniff/frame/referrer protections. This is **not a strict script CSP**. The theme bootstrap is a constant script, map tooltip labels use `textContent`, and saved plans validate bounds and known IDs. No API key, account service, location permission or server-side personal data store was added.

Credential-pattern checks found no matches in the current tracked/new source files, 268 historical text blobs or 913 historically tracked build-text blobs. Local asset references resolve; generated build/test artifacts and local environment files are not staged. The old map asset/styles and outdated map descriptions were removed or updated, including contributor instructions. Pattern scans and dependency audits do not prove the absence of every secret or vulnerability.

Street-map requests go to OSM; Google Maps opens only when a visitor follows a place/directions link. OSM tiles require internet access and are best-effort infrastructure, with no availability guarantee. Coordinates identify the reviewed feature, not a guaranteed entrance or accessible route. The UI retains a place list and directions links if tiles fail.

Physical phones/GPUs, production hosting/CDN behavior, field Core Web Vitals and penetration testing were not checked. No deployment or account/booking backend was added.


## Initial-load measurement

A one-off Lighthouse mobile simulation against local production `/th` used the same browser and default mobile throttling before and after simplifying the ambient layer. These are local lab measurements, not field Core Web Vitals or a performance guarantee. The final run reports Performance **95**, Accessibility **100**, Best Practices **100** and SEO **100**, with no run warnings.

| Metric | Automatic WebGL petals | Final CSS 3D petals |
| --- | --- | --- |
| Largest Contentful Paint | 3.4 s | 2.9 s |
| Total Blocking Time | 470 ms | 30 ms |
| Cumulative Layout Shift | 0 | 0 |

The interactive miniature still initializes WebGL when requested. The ambient layer uses perspective/rotation/depth transforms and does not load an extra Three.js scene at startup.
