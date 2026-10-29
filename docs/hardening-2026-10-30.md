# Trip hardening and first-visit improvements — 2026-10-30

This note records the authorized October 30 implementation against the current working tree. It extends the visitor-task direction in [the October 29 roadmap](roadmap-2026-10-29.md); it does not replace its outstanding field, usability, device, performance or production acceptance work.

## Changes delivered

- **Trip imports:** legacy aliases preserve `duration` and `buffer`, including zero. Conflicting provided values reject the import instead of silently losing scheduling details.
- **Import safety:** selecting a newer file invalidates an older pending read. Clearing trip/library storage also clears the pending preview; stale source and active-selection checks prevent an old async load from applying after state changes.
- **Export clarity:** sanitized JSON/HTML share downloads use share-specific labels and filenames. Calendar entry UIDs use SHA-256 of the stable entry key plus the event date when Web Crypto is available, so reexports and item reordering retain identity while distinct modern visit IDs stay distinct. Without `crypto.subtle`, fresh UIDs are used; treat calendars as copies, not sync feeds. Reimporting can create duplicates, especially with fallback exports. Older calendar UIDs used a different format, so clients may treat migrated events as new. Calendar files still include place names/addresses and optionally notes; hashing an identifier does not make the file anonymous.
- **First Visit and controls:** appearance controls render once in the shared header, support Escape, and retain 44px targets. First-visit contents appear before optional cards; checklist links explain their checks, explicit checklist items stay explicit, and day labels remain separate. Secondary 3D controls are disclosed behind global controls.
- **Loading:** download code is split into a small helper without first-visit content, and gallery image sizing matches the displayed cap. The Leaflet CSS relocation experiment was reverted: About/Credits still fetched the same stylesheet, so the original import order is retained.
- **Verified field facts:** added sourced English/Japanese/Thai Senso-ji main-gate and accessibility notes, a Fushimi Inari lower-ground landmark clarification, and Osaka Museum group-visit booking guidance reviewed October 30. Four shadowed access records were removed; the Gion record was retained. Only the named fields changed; other venue facts remain unknown or unchanged.

Sources: [Senso-ji FAQ](https://www.senso-ji.jp/faq/), [Fushimi Inari official map](https://inari.jp/en/map/), [Osaka Museum FAQ](https://www.osakamushis.jp/eng/about/faq.html). Field statements are limited to what those sources support; station routes and summit access are not inferred from entrance landmarks.

## Scope and verification

No dependencies, storage schema, accounts, cloud sync or live infrastructure were added. The changes preserve the local plan architecture. Models used for the actual delegated work: Sol High (implementation/review), Terra High (UX/content), and Luna Medium (documentation). The local default model setting is in configuration outside this repository and did not change the current conversation.

Passed locally: lint, TypeScript, production build (182 routes), credential-pattern scan, dependency audit (zero reported vulnerabilities), deployment-checker self-test, **45 targeted browser cases** and **309 full-suite cases, with two existing deliberate skips**. The mobile/desktop Thai Hero references on macOS and Linux changed after direct before/after review because secondary actions now start collapsed; other visual references remain unchanged. Keyboard activation/Escape is tested in every engine. The scene-control test probes WebGL2 independently: capable browsers must render the scene, while unsupported browsers must show the fallback and retain global appearance controls. Safari/macOS Full Keyboard Access traversal and the OS file picker remain manual acceptance items.

Linux traces also exposed runner contention: WebKit page creation took 10–15 seconds, exhausting the compound 30-second budget after four successful accessibility audits or the final cross-engine roundtrip. Those two test groups now have a 60-second total budget; individual assertions retain their original deadlines. CI uses two workers instead of three to reduce contention, including for map initialization. No map assertion, accessibility rule or data-equality check was removed.

## Measured results

Baseline `810dc4d` versus this implementation, same local production server settings, Chromium 156.0.8078.4, 390×844, reduced motion, no network/CPU throttling, three fresh contexts per route and intercepted tiles. All repeated byte measurements matched. `Initial JS` sums encoded Resource Timing bytes only for scripts in the server HTML; `All JS` also includes automatic link prefetch through network idle. Neither includes HTML, RSC, images or later interactions.

| Route | Initial JS before → after | All JS before → after |
| --- | ---: | ---: |
| `/en` | 193,009 → 187,092 | 258,709 → 265,337 |
| `/en/explore?scope=places&view=list` | 217,783 → 212,056 | 269,514 → 276,163 |
| `/en/my-trip` | 197,357 → 198,034 | 258,709 → 265,337 |
| `/en/about` | 177,001 → 170,974 | 259,850 → 266,478 |
| `/en/credits` | 175,860 → 169,833 | 258,709 → 265,337 |

The helper split lowers the critical initial script payload on informational pages. Including background prefetch, JavaScript grows about 6.6 kB with the additional validation, controls and facts; this release does not claim a total-transfer reduction. CSS changes from 19,431 to 19,592 encoded bytes. Remaining place-data/context profiling is still a roadmap item; no LCP/INP or field-performance percentage is inferred from these figures.

For the same Kyoto gallery photo at 1920px/DPR 1, the selected width changes from 1920 to 1080 while its CSS box remains 1060px. The corresponding AVIF responses at quality 75 and the same Accept header are 159,320 versus 60,450 bytes (about 62% smaller for this one variant). The sampled 1440px/DPR 2 and mobile DPR 3 selections remain unchanged; do not extrapolate this saving to all images.

At the same Thai mobile viewport, the homepage Start Here section moves from y=1486px to y=1180px and the First Visit contents from y=765px to y=422px. This verifies space recovered, not novice task completion. Fresh field coverage is entrance 16/104, accessibility 21/104 and booking 11/104; other counts and the 104 canonical venue records remain unchanged. All three dictionaries have matching 607 leaf keys. Native-language meaning and physical routes still need human review.

## Remaining acceptance

- Test assistive technology, physical devices, novice tasks and native-language wayfinding.
- Verify live hosting, alert delivery and rollback with the real production origin/operator.
- Continue measured place-data/CSS/context optimization without weakening imports, aliases or Undo.

See [roadmap acceptance and performance gates](roadmap-2026-10-29.md#subsequent-phases-and-acceptance) before closing these items.
