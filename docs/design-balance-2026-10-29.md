# Design balance and visitor detail — 2026-10-29

The next direction is a quieter reading/planning interface with a Japanese visual identity, clearer actions and deeper verified visitor detail. The homepage miniature and day/night sakura remain; secondary controls should not compete with finding a place or using an itinerary.

## Evidence and decisions

Before editing, the lead captured the homepage, Explore, Kyoto, My Trip and First Visit at 390px and 1440px, plus individual visit/place cards. The mobile menu measured 36 × 38px, map-place name buttons about 33px high, and the Browse label touched the select. Trip task links had equal heavy borders, while Print used the main red CTA treatment. Floating blossoms also appeared over task-page text.

- Frontend owns `journey-tools.css`: Browse spacing/wrapping, at least 44px menu/place targets, intrinsic neutral result buttons, lighter trip task links and a neutral Print control. The travel-day link retains an accent. Task/guide petals use lower opacity; homepage decoration remains unchanged.
- Manual Pause now suppresses decorative CSS animation and transitions as well as scrolling/3D motion. Petals retain their existing freeze behavior and functional toast timing is preserved. Operating-system reduced-motion behavior remains supported.
- Trip integrity owns `SavePlace.tsx`: a plain unscheduled saved place has an explicit Remove action; entries with scheduling/details or repeated visits open My Trip. Removal checks the expected trip snapshot, and Undo remains available. No saved metadata is discarded to simplify the visual interface.
- Performance owns only the miniature image `sizes`: measured rendered widths were 398px at a 780px viewport and 734px at 1920px, while the prior hints selected 828px/1080px candidates at DPR 1. Responsive hints now respect mobile/desktop caps. Artwork, image quality and eager loading remain.
- Content owns `visit-access.json`: six new localized fields across five records representing four visitor areas. Existing facts, review dates, coordinates and stable IDs remain unchanged.
- QA owns `design-balance.spec.ts` and affected existing expectations; the lead alone runs shared builds/servers, reviews screenshots and integrates commits. No files were deleted or dependencies added.

## Verified content

New fields are entrance guidance for Gion, Dotonbori, Osaka Castle Park and the Osaka Castle Tower record, plus accessibility detail for Sumida Park's Taito-bank information office and Osaka Castle Park. Each field includes Japanese, English, Thai and its own source/review date (2026-10-29).

- [Osaka park/tower operator barrier-free map](https://www.osakacastlepark.jp/pdf/OsakaCastleMainTower_BFmap_w_jp.pdf?lang=ja): signed approach, stairs/detour and steep northern approaches. Do not treat all approaches as accessible.
- [Southern Gionmachi Council guidance on Kyoto Travel](https://kyoto.travel/en/responsible-travel/gion-manner-message-from-southern-gionmachi/): public-road traffic and restrictions on private/religious property.
- [Tonbori Riverwalk operator walking map](https://tonbori.jp/osanpo/): stairs at Ebisubashi; no unverified step-free alternative is invented.
- [Taito information-office page](https://www.city.taito.lg.jp/kenchiku/hanamidori/koen/annnaijonogoannnai.html): rest benches, nursing room and multipurpose toilet near the Tobu railway bridge. Facilities do not certify every park path.

Published entrance fields increase from 10 to 14 of 104 venues; accessibility fields increase from 18 to 20. Remaining gaps are 90 entrance and 84 accessibility fields. Hours, admission and booking coverage are unchanged. Continue operator research in small batches rather than publishing guessed completeness.

## Verification and follow-up

Regression coverage checks explicit Remove/Undo, scheduled/repeated/zero-buffer metadata preservation, readable control spacing and touch targets at 320/390px in all three locales, desktop button sizing, manual Pause and reduced task-page decoration. Existing content schema, accessibility, navigation, storage and visual checks remain release gates. Before/after visual review and the actual test/build results accompany this release.

Next work should prioritize keyboard focus after moving a visit, checkout-day hotel origins, field-specific freshness in map summaries and broader Firefox data-recovery coverage. Real-device/frame pacing, native-language wayfinding, novice sessions and production-origin measurements still require external acceptance. Do not use screenshot geometry or a published facility list as proof of real-world accessibility or production performance.

Local release checks passed: lint, TypeScript, production build (182 routes), secret-pattern scan, dependency audit (zero reported vulnerabilities) and the full suite (215 passed, two existing deliberate skips). Existing macOS visual baselines passed unchanged. The six new behavior cases run in Chromium and mobile WebKit; the existing Firefox refinement suite also passed. An independent comparison confirmed that every previously published fact and provenance value was retained. Generated content-review evidence confirms 104 venues, 14 entrance fields and 20 accessibility fields.

The lead inspected before/after captures of all five task routes at 390px and 1440px, including both themes after changes. The language-picker target was also increased to 44px after measuring the original icon-only hit area. At DPR 1, the miniature selected a 640px candidate instead of 828px at a 780px viewport, and a 750px candidate instead of 1080px at 1920px, with rendered geometry unchanged. This is a local candidate-selection check, not measured production Web Vitals or physical-device calibration.

The pre-existing `next-env.d.ts` development references were restored after build and excluded from the release. Full Linux verification is recorded by the workflow on the pushed commit.
