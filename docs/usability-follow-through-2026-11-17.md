# Usability and release follow-through — 17 November 2026

Scope: improve the existing journey, source accuracy and verification without adding languages, accounts, cloud storage, routing providers or decorative scenes. The site remains localhost-only; no domain, deployment, public tunnel or production infrastructure was configured. Human and physical-device checks retain their explicit Not Run status.

## Ownership and changes

Four independent agent scopes covered UI/CSS, primary-source research, multilingual data and security/test quality. The lead reviewed source evidence, integrated changes, corrected optional import metadata, extended export/source regressions and owns build/security/CI checks. Data edits were coordinated through one writer; no concurrent app-file edits or destructive Git operations were used.

- **UI:** actual Chromium inspection covered French, Spanish and Thai in both themes at 320, 390 and 1440px. Import action borders touched with zero gap; the map preview's return control was 33px high; the export checkbox could shrink to 13px. Twelve CSS lines reuse the existing control rules, add an 8px action gap and keep the checkbox at 24px. Injected after previews showed a roughly 48px return control and no document overflow. Regression checks also exercise keyboard focus, text visibility, budget controls and map recovery.
- **Import review:** empty accommodation/date fields and missing visit times left orphan separators in the preview. Optional metadata now renders only when supplied. Tests cover neither field, each alone, both together and timed/untimed repeated visits, alongside the existing focus and failed-write cases.
- **Languages:** [model review](language-review-2026-11-17.md) corrected ten venue values and two Vietnamese UI values. Travel time is distinguished from waiting time, loans from paid rentals, return connections from round trips, university students from the broader student category, and day numbers from a trip's day count. Language-only edits retain factual dates.
- **Sources:** [operator review](source-review-2026-11-17.md) confirmed Hokudai through a real browser and added its Japanese station estimates with access-only provenance. Two compact KIX checks link separately to the shuttle operator and JR-West. Their optional airport code places them inside the existing KIX disclosure, keeping the three general checks in place. The generic airport instructions, map pins and other factual dates remain intact. KIX's original URL still denies these clients; group deadlines, suitcase locker capacity and continuous accessible routes remain unresolved.
- **Tests:** expiry/review-age logic now uses a fixed synthetic venue, while a separate integration test retains explicit assertions for published Kyoto/Kiyomizu provenance. Eight-language export checks cover Japan-time and all-day dates, repeated visits, distinct IDs, UTF-8 line folding and the different privacy scopes of calendar/full/shared exports. New operator cards expose their own source and date in all eight languages.

Before/after screenshots and measured control geometry remain local under `/tmp/japan-nov17-ux/`. The build-based browser regression is separate from those injected previews. No visual baseline or test threshold was relaxed to hide a defect.

## Security

The fresh audit found one Moderate runtime finding in Next.js 16.4.2: [GHSA-mfr8-8qww-v76h](https://github.com/vercel/next.js/security/advisories/GHSA-mfr8-8qww-v76h). The vulnerable pattern combines a root-param-reading `use cache` function with `unstable_cache`; the current app does not use those APIs. The framework still required an upgrade: its initial build stopped after generation with a security upgrade recommendation.

The Next.js, lint-config and analyzer version floors now require the patched 16.4.5 line; the lock resolves all three and the associated Next internals to 16.4.6. The [16.4.6 release](https://github.com/vercel/next.js/releases/tag/v16.4.6) is a stable patch release. React and unrelated dependencies were retained. Clean install and the patched build passed, and full/production-only audits both returned zero findings. The existing scoped lint-matcher override remains in place; its real parser regression is retained.

Read-only review of import validation, offline HTML, calendar escaping and sharing found no additional material app issue. This is source review plus automated verification, not a penetration test. No secrets, imported personal plans or real bookings were added to the repository.

## Performance and verification

The lab recorded build `FdpKq6xjmaHvvP-Kj_Jl8` with Chromium 156.0.8078.4 and Node 26.13.1 in a dedicated window without concurrent QA. Each row uses three fresh contexts at 390×844/DPR3 with reduced motion. CDP requested 4× CPU slowdown, 150ms latency, 200,000 download bytes/s and 93,750 upload bytes/s. Tiles were synthetic; Next image-transform caching was not controlled. These settings are not calibrated to a physical phone or a real mobile network.

| My Trip fixture | Lab INP median (range), ms | CLS median (maximum) | Editor ready median, ms |
| --- | --- | --- | --- |
| Empty | 64 (56–72) | 0 (0.00172) | 2532.1 |
| 60 visits / 30 Thai notes | 96 (96–96) | 0 (0) | 2785.3 |

The large synthetic fixture is 92,791 UTF-8 bytes. All six runs checked typed-value persistence; the large runs also checked markers and a 60-event calendar export without private identifiers. Editor ready means title-field DOM detection plus two animation frames, not verified visual readiness. My Trip's median LCP was 556ms, but its candidate was the static introduction: it does not imply the editor was ready then. Initial HTML-referenced JavaScript was 366,699 encoded bytes on this measured build; no payload saving is claimed.

| Additional page | Observed LCP median (range), ms | CLS median |
| --- | --- | --- |
| Explore / Kyoto list search | 680 (660–692) | 0.01316 |
| First Visit | 576 (568–584) | 0.00687 |
| Kyoto detail | 1252 (1244–1260) | 0 |

These nine page-load runs recorded no document overflow or page errors. The Kyoto LCP candidate was the eager hero image. The samples are descriptive local measurements, not field p75, a speedup claim or physical-device/live-tile acceptance. Raw scripts/results remain under `/tmp/japan-nov17-performance/`. The final English wording clarification in Hokudai access does not constitute a measured performance change.

**Passed:** clean lockfile install; build (477 pages); typecheck; full lint; 110 focused browser cases including all configured visual cases; full and production-only audits (zero findings); credential-pattern scan; source-link and deployment-checker self-tests. The temporary global placement of the KIX checks changed two arrival screenshots; contextual placement restored the existing initial layout and the visual rerun passed without changing baselines or tolerances. The final Linux/Node 24 full regression is reported by the pushed commit's GitHub Actions checks, separately from these local results. Self-tests do not verify live hosting or every external source URL.

## Remaining acceptance

The existing [visitor acceptance checklist](visitor-acceptance.md) now includes a reusable session worksheet and the secure-context prerequisite for testing saving on a phone. An HTTP LAN IP is not the phone's localhost. The worksheet does not create a test origin or certify a participant session.

Native-speaker acceptance, five novice participants, VoiceOver/TalkBack, physical iPhone/Android Files/Downloads, real Apple/Google/Outlook calendar imports, production headers/traffic and rollback remain **Not Run**. Existing controls, automated keyboard checks, model review and emulated devices supply supporting evidence only. The operator-source uncertainties listed above remain explicit rather than being replaced with guessed facts.
