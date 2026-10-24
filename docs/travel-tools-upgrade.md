# Travel tools and content upgrade — 2026-10-25

This release makes the existing three-language guide easier to use for a first trip. It retains the Japanese visual style, static rendering, local-first trip storage and existing URLs. No dependency was added.

## Shipped

| Area | Change |
| --- | --- |
| Discovery | Shareable search, region, place category, selected prefecture and list/map view in the URL; refresh/back/language switching preserve state. Search normalizes character width and includes common Thai/Japanese spelling variants. |
| Maps | One Leaflet map instance survives filter changes, selected markers stay synchronized, fit-all and expanded-view controls, load/error/retry states. Walking/transit directions and copyable Japanese location labels accompany place lists. |
| Beginner flow | Compact mobile introductions, emergency/help navigation, collapsible six-step readiness checklist, guide section navigation and one-click starter plans. |
| Prefectures | All 47 pages have real cover photography, regional planning prompts, accommodation checks and nearby-prefecture suggestions. Six detailed areas also reuse their existing stay/rain/preparation advice. |
| Photography | 41 locally stored Wikimedia Commons photographs with en/ja/th descriptions, named creators, original file pages and per-image licenses. Six existing local destination photographs cover the remaining prefectures. Images are resized/cropped; Commons adaptations retain their original license. |
| Visit details | Reviewed access/hours/admission information where available for Kiyomizu-dera, Tokyo National Museum, Kyoto National Museum, Osaka Museum of History, Hokkaido University Museum and Yamanashi Fujisan World Heritage Center. Every other unknown field is explicitly marked, not invented. Suggested visit durations are editorial estimates. |
| Data consistency | Eight legacy aliases now resolve to one canonical place per venue. The 94 prefecture records and 18 guide records represent 104 distinct mapped places, plus six destination ideas. Coordinates and translations for shared places have one source. |
| Personal trips | Optional name, start date, base, per-day notes, reservation time/place notes, four-category JPY estimate, view-by-day and empty-day controls. Starter routes add new places without overwriting existing schedules or notes. |
| Recovery | One-level undo, validated JSON backup/import, full preview, merge or confirmed replacement, stale-tab conflict checks, explicit errors that preserve previous storage. |
| Offline/print | Self-contained escaped HTML itinerary with Japanese addresses and notes; print includes title/base/start date and wraps notes. Map links need internet; no offline tile downloads. |
| Motion | Global pause coordinates petals and the existing Three.js miniature, persists across reloads/tabs, and respects reduced motion. Appearance controls no longer overlay content. Scene-topic links lead to relevant guide content. |
| Transparency | Localized About/privacy/editorial/accessibility page, GitHub correction link and photo credits. No invented business contact or tracking account. |
| Metadata | Localized installation manifests, prefecture photo previews, About in the sitemap. Canonicals remain conditional on the real production origin. |
| Security/maintenance | Broader CSP, no production eval, validated user-controlled fields/import limits, escaped offline exports, SHA-pinned read-only GitHub Actions workflow for lint/build/types/browser tests/dependency audit. Weekly runs recheck the same quality gate. |

## Data safety

The `japan-travel-trip-v1` storage key and version remain unchanged. Old valid plans load without requiring a reset. Canonicalization collapses a legacy alias and its canonical place into one record, preferring the first scheduled visit and retaining additional notes/time. Conflicting nonempty notes/time reject the import rather than silently discarding text. Exact duplicate raw IDs and unknown places remain invalid.

Import accepts at most 64 KB and 60 entries, validates real dates, time syntax, known IDs, day bounds, text lengths, and finite nonnegative budget amounts. Imported unknown fields are discarded. A merge adds only missing places; incoming metadata does not replace the current trip. Replacement requires confirmation. Undo refuses to overwrite a newer cross-tab change. Failed storage writes leave the last saved plan intact.

The HTML file has no scripts, embedded tracking or remote assets. User content and generated navigation URLs are escaped. It has a restrictive CSP of its own. Backup/HTML/PDF files may contain personal accommodation and dates; the UI explains this before sharing.

## Content review

Venue facts above were checked on 2026-10-24. Source links sit beside the affected fields; the date on a prefecture introduction remains its earlier review date. An image, new UI or editorial planning prompt does not imply that every venue has been reverified.

- [Kiyomizu-dera visitor access](https://www.kiyomizudera.or.jp/en/location/)
- [Tokyo National Museum visitor information](https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en)
- [Kyoto National Museum access](https://www.kyohaku.go.jp/eng/visit/access/) and [opening/admission calendar](https://www.kyohaku.go.jp/eng/visit/info/)
- [Osaka Museum of History](https://www.osakamushis.jp/eng/)
- [Hokkaido University Museum visitor information](https://www.museum.hokudai.ac.jp/english/visit/)
- [Yamanashi Fujisan World Heritage Center hours](https://www.fujisan-whc.jp/en/guide/index.html)
- [JNTO weather/seasonal guidance](https://www.japan.travel/en/plan/weather/)

The Okinawa museum operator site was in maintenance during this review; its hours and pricing are left unverified. Map points are area/venue references, not guaranteed entrances. Nearby distances and the 30 km trip warning are straight-line measurements, not route lengths or journey times. Categories describe the listed highlights, not every attraction in a prefecture; they do not certify wheelchair, child or dietary suitability.

For future edits: check the operator's current access/calendar/pricing pages, translate the same fact into all three languages, retain the source URL, and update only that record's review date. Keep unknown fields explicit. Preserve stable IDs or add an alias and a migration test. For photos, confirm the subject/location and license, store the local resized file and preserve credit/license links.

## Verification

See the final check results below. Browser tests substitute map tiles to avoid bulk requests to public OpenStreetMap infrastructure. Local screenshots cover Thai desktop and mobile home/explorer/prefecture/planner pages in light and dark themes. This is browser emulation, not a physical-device or usability study.

## Deployment and remaining external work

1. Set `NEXT_PUBLIC_BASE_URL` to the actual HTTPS origin before building. The current local environment has no confirmed production domain; no domain was guessed. With a domain, the sitemap contains 174 public localized URLs. The three personal-trip pages remain `noindex` and are excluded.
2. Deploy with the hosting provider's secret/environment settings, run the quality workflow, and check the real origin's redirects, HTTPS, security headers, canonical/hreflang, robots, sitemap and image responses. Add Search Console and uptime/error monitoring using the operator's accounts if required. No analytics credentials or monitoring endpoint were supplied.
3. Confirm hosting access-log retention and a public contact channel. Until then, corrections use the public repository issue link; users are told not to post personal trip information.
4. Public OSM tiles remain best effort. For higher traffic/SLA requirements, select a licensed hosted tile provider and update CSP/attribution together. Dark mode currently styles OSM raster tiles; it is not a separate localized vector map.
5. Venue-by-venue hours, fares, entrance accessibility and reservations beyond the six checked records require additional primary-source review. Do not interpret an unverified field as free, always open or accessible. No live routing, ticketing or weather feed is implemented.
6. Test on physical iOS/Android devices and GPUs, including a slow connection, text zoom and keyboard/screen reader. A suggested first-time-user session: find Kyoto in their language, locate a venue/entrance, save and schedule it, change language, export and restore the trip, recover a removal, and find emergency help. Record completion, wrong turns and hesitation; do not claim measured usability improvements without those sessions.

The site remains a travel guide with an optional 3D miniature and ambient effects. New bespoke 3D models for every prefecture, a map bottom-sheet interaction, full vector-map localization and cloud accounts are not included. The production CSP permits inline Next.js scripts/styles; it is more restrictive than before but not nonce-based strict CSP. No production deployment, penetration test or field Core Web Vitals measurement was performed.

## Final local checks — 2026-10-25

- ESLint, TypeScript and optimized Next.js build pass; 182 prerendered routes.
- Production Playwright: **81 passed, 1 intentionally skipped**. The skipped LCP observation is Chromium-only and therefore skipped on WebKit. Coverage includes 141 localized prefecture pages, all guide routes/locales, images, old-ID migration, backup validation/recovery, stale-tab imports, URLs/language switching, reduced motion/3D fallback and responsive/print behavior.
- Development hydration/extension regressions: **2 passed** across Chromium and mobile WebKit, including client-side language and 404 transitions.
- Axe WCAG 2 A/AA and 2.1 AA: zero automated violations after fixes on six Thai routes (explore, Nara, Kyoto, first visit, About and a populated trip), at desktop/mobile widths in light/dark themes. Explorers were rechecked with live OSM tiles after fixing the decorative label contrast and underlining map attribution links. These scans do not constitute a manual accessibility certification.
- Visual screenshots inspected for desktop/mobile layout, real map tiles, Thai typography, light/dark themes, prefecture cover and trip controls; no horizontal overflow in the checked screens.
- Full `npm audit`: **0 reported vulnerabilities** on 2026-10-24. Credential-pattern scan of tracked/new text files: no matches. No build output, dependencies, test traces or secret files are tracked. This is not a penetration test.
- GitHub workflow execution is separate from these local results; verify its run for the pushed commit in Actions.
