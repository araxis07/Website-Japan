# Local release readiness — 16 November 2026

The owner confirmed that this site is tested only on localhost and has no production origin. No deployment, domain, hosting configuration or `PRODUCTION_ORIGIN` variable was created. The production workflow remains gated until a real HTTPS origin exists; local checker self-tests do not certify a deployed site.

## Security and dependency scope

The initial audit reported seven Moderate development-tool findings, with no runtime findings. They traced to minimatch 10.2.6 in the TypeScript ESLint project service ([advisory GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)). The available automatic fix still retained the affected matcher and proposed unrelated updates.

A scoped npm override pins only `@typescript-eslint/typescript-estree`'s minimatch to 11.0.1. The installed consumer uses the retained `minimatch(path, pattern, { dot: true })` API; a regression exercises the real parser's project-service allow and deny paths, including a dotfile. Other minimatch consumers, Next.js and React are unchanged. The lock adds the patched matcher's own development-only transitive dependency. Remove this override when the upstream tool declares a compatible patched dependency, after checking the parser regression and audit again. This is a deliberate major-version override, not a blanket dependency upgrade.

Clean `npm ci --ignore-scripts`, full lint and build/typecheck passed locally. Both full and production-only audits reported zero vulnerabilities on this date. CI now rejects Moderate or higher audit findings. An empty audit does not establish that application code is free of security defects.

## Keyboard usability and data safety

- A selected backup hands focus to its review heading only while the file input still has focus. Successful merge/replace also recover focus dropped to the document body when the focused button is disabled during a write. Cancellation returns focus from its button to the persistent import input.
- A declined confirmation or failed storage write keeps the preview available. Completing an asynchronous read or queued write respects focus moved elsewhere by the user.
- Discarding an invalid field draft returns focus to that field without discarding other drafts or changing saved values.
- Regression coverage includes all eight languages, quota failure, a queued cross-tab import, asynchronous file reading and another invalid field draft. Offline emergency-download parity now covers all eight languages.

Storage formats, personal-stop coordinates, map destinations, export privacy defaults and the first offline calendar download are preserved. Deferring the calendar module would make a first offline export dependent on an uncached network chunk; that change was rejected. A second lazy wrapper around the map was also rejected because its chunk failure would replace the planner with the page error instead of the existing local map fallback.

## Content and source maintenance

[Language review](language-review-2026-11-16.md) records eight findings corrected in nine Vietnamese/French/Spanish values. They concern steep ramps, additional stairs, accessible toilets, funicular/return transport, ordinary opening days and an offline insurer assistance number. Language-only corrections did not refresh factual review dates.

[Route review](route-review-2026-11-16.md) records official-source checks for four core venues and six previously flagged URLs. Three route fields were clarified in all eight languages: Kiyomizu's wheelchair vehicle approach, the limit of Senso-ji's A4 guidance, and Tokyo National Museum's Main Gate/security/suitcase restrictions. Only these three fields received fresh provenance; the remaining facts retain their previous review dates. Nagoya Castle's source now uses the retrieved equivalent official page. Unknown station-to-gate accessibility and entrance coordinates remain unknown.

Hokkaido University Museum and KIX source retrieval still need browser/manual follow-up. The expired Yokosuka notice retains its historical source and expiry. Model review is not native-speaker, novice, wheelchair-user or on-site acceptance.

## Performance measurement

The My Trip loading state originally allowed the footer to appear in the initial viewport, then hydration pushed it down. The planner now reserves at least one small viewport height. A server-rendered regression checks footer geometry at 320px and 1440px with JavaScript disabled.

Production builds `U5ACji-gqLn90IVdsYtVT` and `O00UAnTtEorKZOJEcwGDk` were measured in a dedicated window without concurrent QA. Chromium 156.0.8078.4 ran five fresh contexts per fixture and viewport on each build: 390×844 at DPR3 and 1440×1000 at DPR1, reduced motion, no CPU/network throttling. Local Node was 26.13.1; CI targets Node 24 and was not run by this lab. The large synthetic fixture has 60 visits and 30 notes of 1,000 Thai characters, totaling 92,791 UTF-8 bytes. Tiles use a synthetic image, so marker readiness does not establish live map readiness.

Values are medians, with observed ranges in parentheses. CLS had the same value in all five samples of each row and fell to zero in every after sample; no remaining shift sources were recorded.

| Viewport / fixture | CLS before → after | Lab INP before → after, ms | Planner ready before → after, ms |
| --- | --- | --- | --- |
| Mobile / empty | 0.39218 → 0 | 40 (40–40) → 40 (40–48) | 98.1 (95.2–261.9) → 101.3 (95.7–311.9) |
| Mobile / large | 0.39218 → 0 | 40 (40–48) → 40 (40–48) | 170.3 (153.9–221.8) → 162.6 (157.6–186.5) |
| Desktop / empty | 0.50134 → 0 | 40 (40–56) → 40 (40–40) | 95.9 (93.1–111.4) → 94.0 (92.5–104.9) |
| Desktop / large | 0.51600 → 0 | 48 (40–56) → 40 (40–40) | 161.1 (153.4–167.8) → 140.6 (139.7–142.1) |

The installed Next.js Web Vitals implementation supplied CLS/LCP/INP. Interactions included 20 native typing events with a 20ms delay and persisted-value checks, opening calendar controls, and, for the large fixture, day filtering, map markers and an ICS download checked for 60 events and private identifier exclusion. Planner ready is a supplemental timestamp: the title field first appears in the DOM, followed by two animation frames. It is not a Core Web Vital or proof of visual readiness. Before the fix, mobile LCP identified the footer heading; afterward it identified the planner introduction. The changed candidate makes a direct LCP speedup claim inappropriate. These small local samples do not establish field performance, physical-device acceptance or a typing speedup.

Resource Timing encoded body sizes through initial network idle were unchanged at 366,543 bytes for initial HTML-referenced JavaScript and 16,365 bytes for HTML. CSS changed from 20,781 to 20,783 bytes; median prefetched RSC from 72,321 to 72,325 bytes, with small sample variation. No payload reduction is claimed, and prefetch behavior was not changed. All 40 measured runs passed the persistence/export checks without page errors. Raw samples, attribution, script and comparison remain local under `/tmp/japan-nov16-performance/`.

## Remaining acceptance

The [visitor acceptance checklist](visitor-acceptance.md) remains the source for native-speaker review, five novice participants, VoiceOver/TalkBack, physical iPhone/Android downloads and real calendar clients. These checks were not performed by automation or model review. Production headers, live traffic performance, hosting and rollback checks wait for an actual deployment.

## Local verification

- **Passed:** clean install, build (477 generated pages), typecheck and full lint.
- **Passed:** 72 focused cases covering release readiness, content/schema checks, Explore payload/search and the next-journey flows across the configured Chromium, WebKit and Firefox projects. This includes all eight emergency-download languages and the real lint parser regression.
- **Passed:** credential-pattern scan, source-link checker self-test, deployment-checker self-test, full dependency audit and production-only audit (both zero findings).
- **Passed:** 40 before/after lab runs described above. Measurements isolate the layout fix; the later focus-only correction was verified by the focused regression suite.
- The full Linux/Node 24 regression runs in GitHub Actions after push; its result is reported separately from these local checks. Self-tests do not verify hosting or live external services.
