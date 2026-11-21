# My Trip CPU and controlled local samples — 2026-11-21

The retained performance change reuses one `Intl.DateTimeFormat` in `japanDate` rather than constructing it for every date snapshot. The `now = new Date()` API, English calendar parts, `Asia/Tokyo` timezone and part ordering remain unchanged. Trip validation, write-on-type behavior, Web Locks, checkpoints, drafts and eager offline exports were not relaxed.

## Builds and method

Baseline source was `4161253`, production build `1Ai3zLEDdU-0FRNsI4M6K`. The integrated comparison build was `eoHoeKpIkYfCDBk2CbwTT`. The comparison also contains day-map ordinal/ref changes, native visit-choice buttons rendered only while their panel is open, and venue-copy updates. Its complete delta cannot be attributed to the formatter change alone.

Chromium 156.0.8078.4 used five fresh contexts per fixture on each build, without concurrent builds or browser QA. The viewport was 390×844 at DPR3, reduced motion, CDP CPU throttle 4×, 150ms network latency, 200,000 download bytes/second and 93,750 upload bytes/second. Local Node was 26.13.1 on macOS ARM64; this is not the Node 24 GitHub Actions environment. Browser-process, operating-system and server caches were not reset. Map tiles were synthetic; no live map or physical-phone performance result is claimed.

The empty fixture is 33 UTF-8 bytes. The middle fixture has 20 repeated Gion visits over ten days, with ten notes of 200 Thai characters: 6,951 bytes. The large fixture has 60 repeated visits over 30 days, with 30 notes of 1,000 Thai characters: 92,791 bytes. These are fake local records, not user plans or a representative sample of real itineraries.

Editor ready means detection of the title field in the DOM followed by two animation frames after navigation. It does not mean LCP, visual completeness or verified interactivity of every control. Editing measures 20 native key events at a requested 20ms interval until the final title is persisted and the field reports no pending save. Layout/style/scripting come from CDP Performance metrics. Lab INP uses the installed Next.js Web Vitals implementation and the complete scripted interaction sequence, including calendar controls and, for nonempty fixtures, day filtering, map markers and ICS download.

## Controlled measurements

Times are milliseconds, reported as median (observed minimum–maximum), before → integrated comparison. Five samples describe this local run, not a field percentile or a general speedup guarantee.

| Fixture | Editor ready | Startup scripting | Editing scripting | Editing elapsed | Lab INP |
| --- | --- | --- | --- | --- | --- |
| Empty | 2636.8 (2538.0–2717.4) → 2510.1 (2505.8–2621.7) | 374.8 (345.6–423.1) → 332.8 (317.3–354.5) | 260.7 (237.2–272.3) → 167.1 (160.1–193.7) | 920.0 (757.9–1138.2) → 678.3 (647.0–700.7) | 112 (72–264) → 56 (48–88) |
| 20 visits | 2725.5 (2708.0–2931.0) → 2621.5 (2583.1–2692.0) | 422.6 (386.0–548.8) → 370.2 (352.2–392.8) | 505.5 (466.7–661.2) → 453.0 (438.9–461.5) | 1134.3 (1111.7–1520.9) → 1098.4 (1037.2–1123.6) | 104 (96–248) → 88 (56–128) |
| 60 visits | 3075.2 (2781.8–3648.8) → 2767.1 (2748.3–2787.4) | 554.2 (473.5–621.5) → 438.8 (430.6–441.3) | 1009.5 (899.1–1061.9) → 929.9 (900.4–993.8) | 2045.1 (1861.2–2362.9) → 1806.9 (1785.6–2033.7) | 256 (152–368) → 104 (96–264) |

The largest fixture retains substantial work. Its editing layout median increases from 136.7 (117.1–174.5) to 150.3 (138.7–155.1)ms; style recalculation increases from 319.8 (250.3–389.8) to 345.4 (318.7–361.1)ms. The after INP range still reaches 264ms. CLS ranges from zero to 0.001713 on both builds. These findings do not establish that the main bottleneck is solved.

LCP is separate from editor readiness: medians were 628 → 576ms for empty, 632 → 568ms for middle and 604 → 556ms for large. Startup scripting, transfer and layout overlap, so their durations must not be added or subtracted to assign causal percentages.

## Download, rendering and storage evidence

The twelve script URLs in the server-rendered My Trip HTML account for 341,432 → 342,106 encoded body bytes, an increase of 674 bytes across this batch. Encoded HTML is 16,364 → 16,383 bytes and CSS 20,830 → 20,840 bytes. Initial scripts are matched to the original HTML URLs, not the later-mutated `document.scripts` collection. No payload reduction is claimed. Automatic prefetch remains enabled; baseline large-fixture RSC through the initial observation varies from zero to 72,581 bytes, so those totals do not establish a consistent transfer saving. At the configured bandwidth, the initial JavaScript alone represents about 1.7 seconds of payload capacity before latency and scheduling; this is a capacity calculation, not a measured critical-path decomposition.

Separate unthrottled diagnostic passes collected actual CDP CPU profiles for startup and typing in each fixture, then V8 precise function coverage during another 20-key sequence. Native JSON/Storage wrappers recorded counts and synchronous durations. Profiling, wrappers and coverage add overhead and were excluded from the controlled timing passes. Minified frame names were checked against source offsets: the baseline frame inferred as `e.s.JSON.stringify` at column 102654 of `2gq1y8waugvq6.js` is actually `japanDate`, with 7.501ms sampled self time in the large typing profile. That small sampled value is not evidence that a date helper caused all editor delay.

The large baseline trace also contains React input-property commit work, context propagation, reconciliation and garbage collection. Its `(program)` samples remain unattributed rather than being assigned wholesale to React or storage. Precise coverage records 80 `TripProvider` and 80 `TripPlanner` invocations during 20 keys both before and after, and 1,116 `TripField` invocations in both large-fixture passes. The retained change therefore does not demonstrate fewer context-driven renders. Simply switching `TripDayOverview` to `useTripCopy` would not prove a gain when its parent still recreates entry props; no new context layer or memoization scheme was introduced.

For the large typing diagnostic, trip JSON stringify is 140 calls / 7.3ms before and 140 / 6.3ms after; parse is 81 / 1.9ms and 81 / 1.8ms. Baseline local Storage reads/writes plus session Storage writes total approximately 3ms of synchronous API time. Local trip writes remain 20 in both passes. These measurements exclude asynchronous lock/checkpoint waiting and do not measure physical disk I/O or complete validation cost. They do not justify bypassing validation, deferring persistence or weakening conflict handling.

## Verification and limits

- An isolated check executes the actual before/after trip module date helper for 1,007 calls, including the default date, JST midnight, leap day, New Year, repeated/out-of-order instants and invalid dates. Results and `RangeError` behavior match; formatter constructions change from 1,007 to one. This establishes removed construction work, not an isolated application-latency speedup.
- A durable test adds leap-day/New-Year/repeated-date assertions while retaining the existing October midnight checks. Scoped ESLint and `git diff --check` passed. The lead owns integrated browser regression execution.
- All 30 controlled runs and six diagnostic passes completed without page errors. Controlled runs verified the final persisted title; diagnostics checked the first 20-key title before their additional coverage sequence. Controlled nonempty cases also verified the expected ICS event count and exclusion of private entry identifiers, and reached synthetic map markers. These are bounded checks, not full export, accessibility or real calendar-client acceptance.

Raw samples, twelve CPU profiles, source-offset evidence, scripts, parity check and `comparison.json` remain local in `/tmp/japan-nov21-performance/`. No application telemetry or dependency was added. Field Core Web Vitals, real mobile hardware, real network variability and broader itineraries remain unmeasured; additional work should target those gaps before a wider storage/context rewrite.
