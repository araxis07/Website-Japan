# Renovation follow-up — 2026-10-25

The owner approved the 48 follow-up recommendations. This release retains the three languages, 47 prefectures, existing URLs, version-1 local trip storage and the Japanese paper/ink visual style. No runtime dependency was added. See [release operations](release-operations.md) for deployment, editorial review, the translation glossary and the novice usability protocol.

## Implementation coverage

| Recommendations | Implemented and verified in the repository |
| --- | --- |
| 1. CI | Isolated fresh-page hydration per locale from route transitions to avoid WebKit's cancelled-prefetch false positive. Pinned the runner OS and retained failure evidence. Linux run status is recorded by GitHub Actions for the pushed commit. |
| 2–4. Saving | Shared 512,000-byte UTF-8 limit for parsing/import, immediate field saves with visible failures, retained notes for empty and shortened trips. Old version-1 backups remain readable. |
| 5–7. Venue facts | Expanded reviewed records from 6 to 17, six operational fields with explicit unknowns, field-level sources/dates, automated missing/overdue review queue. |
| 8–14. Beginner content | All 47 prefectures have place-specific day groups and local planning notes in three languages; slower one-stop alternatives, reviewed indoor suggestions where available, regional seasonal cautions, five airport arrival guides, ticket examples and downloadable emergency help. |
| 15–18. Finding places | Search covers all 104 mapped places, Japanese/Thai/romanized aliases, direct place anchors, explicit categories and an independent all-category label. |
| 19–24. Maps | Mobile native detail dialog with focus return, national marker clustering, consistent selection/preview, directions from real providers, entrance descriptions/photos where checked and configurable licensed raster tiles/attribution/CSP. Coordinates remain approximate references, clearly labeled. |
| 25–28. Plan editing | Suggested-plan preview and start-day offset, expanded import preview and metadata warning, per-field validation, separately identified repeat visits. |
| 29–32. Trip details | Accommodation nights with overlap/out-of-range warning, user-entered visit durations/transfer buffers and conflict warning, budget per traveler/day, timestamped backups and optional export without private fields. Lodging rows retain stable identity when another row is removed. |
| 33–36. Reading and photos | Primary direction action, consolidated secondary map tools, Thai line spacing/print layout, corrected mobile cover sizing, three licensed entrance photographs with localized descriptions and credits. |
| 37–39. 3D and motion | Raycast content hotspots with equivalent ordinary buttons, Fuji/Kyoto/Hokkaido miniature variants, existing light/night controls, coordinated motion pause, lower mobile pixel/shadow/particle cost. Models remain illustrative, not geographic reconstructions. |
| 40–43. Quality | Editorial glossary, keyboard/focus/reflow checks, deferred 3D/map loading, platform-specific visual comparisons, data-loss and invalid-import regression coverage. Hardware/field measurements remain external checks. |
| 44–47. Maintenance | Tighter CSP, dependency/credential-pattern review, validated tile configuration, content quality reports, dead scene-topic styles removed, copyable correction report with configurable public support destination. |
| 48. Usability | Reproducible novice tasks, observation criteria and retest protocol, ready for actual participants. |

## Data safety and limits

The parser accepts at most 60 visits, 30 days, 30 accommodation records, bounded text and finite nonnegative budget values. Unknown fields are discarded. Canonical aliases preserve older saved places; conflicting legacy notes are rejected instead of discarded. Merge adds missing visit identities and retains the current trip's metadata, notes, hotels and budget. Replacement requires confirmation. Stale imports and stale edits cannot overwrite a newer tab. Rejected field input remains visible and marked unsaved.

Removing one repeat visit leaves the other visit intact. Reducing trip length moves affected visits to Unscheduled and keeps notes/hotels available for correction. A sanitized export contains only place/day/visit identities. Normal JSON and offline HTML can contain personal information; the interface explains this before sharing. Offline HTML contains no scripts or remote assets. Maps and external links still need a connection.

## Content provenance and remaining review

There are **17 reviewed venue records out of 104 mapped places**. The other **87** have no reviewed operational-detail record; even reviewed venues may have individual unknown fields. Sources and review dates appear next to each confirmed field. No content date was advanced merely because the page design changed. Day groups and times are editorial suggestions, not routing or booking guarantees.

Three new entrance photos identify the Kiyomizu-dera Nio-mon approach, Fushimi Inari's Romon and Matsumoto Castle's Kuromon. These do not certify accessible routes or precise entrance coordinates. Individual entrance-coordinate surveys, complete venue-level accessibility data and operational details for every remaining place are still editorial work.

## Release checks

- ESLint, TypeScript and the optimized 182-route production build are required before commit.
- Local Playwright result: **105 passed, 1 intentionally skipped**. Coverage includes Chromium desktop and WebKit mobile, all locales/prefectures, data persistence/imports, maps/dialog focus, 3D variants and theme screenshots. The WebKit LCP case is intentionally skipped because that browser does not expose the tested observation API.
- Automated axe WCAG 2 A/AA and 2.1 AA scans of six Thai routes at desktop/mobile widths in both themes found no violations (24 scans). A mobile cover overflow found by visual review was corrected and receives a regression assertion.
- Full dependency audit on 2026-10-25: zero reported vulnerabilities. Credential-pattern scan of tracked/new text: no matches. No generated build/test output or dependency directory is committed.
- Check the pushed commit's Actions result and retained artifacts for the final browser count and Linux screenshot evidence. Never infer remote CI success from a local result.

## External work and deliberate limits

No production domain, hosting account, monitoring destination, map-provider account or contact email was supplied. Environment configuration and rollout checks are ready; no credentials, destination or live measurement was invented. Public OSM tiles remain best effort. Full localized vector maps/night basemaps require a provider integration; the current implementation keeps the existing raster map. Budgets use user-entered JPY without live FX quotes. No cloud account/sync or live transport/weather service was added.

Native-speaker editorial approval, screen-reader speech testing, physical low-end-device performance, real-origin Core Web Vitals and first-time-user sessions have not been performed. Their protocols and acceptance targets are documented in [release operations](release-operations.md).
