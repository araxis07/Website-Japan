# Visitor flow, Kyoto evidence and runtime work — 2026-10-30

This batch follows the [October 30 hardening](hardening-2026-10-30.md) and the approved visitor-task roadmap. It keeps the static/local-storage architecture, three languages, themes, on-demand 3D, map/list alternatives and existing backup format.

## Delivered behavior

- A saved, unscheduled place has a localized **Choose a day** action beside Remove. It opens the existing unscheduled section; visits with dates/details and repeated visits keep their existing behavior. Save, failed-write protection and Undo remain intact.
- Guide-place names in Travel day open their canonical guide/anchor. Personal stops remain plain text and use their entered address for directions.
- My Trip has one empty-trip introduction with starter, manual-discovery and import paths. Its place-discovery links consistently open places/list; general prefecture/map browsing remains available.
- Saved-plan library parsing is memoized by the raw storage value. Write-time validation, expected snapshots, import ordering, cancellations and storage failures remain checked.
- ReportLink and ReportIssue read a stable language/tools context. The existing trip context and its drafts, validation, feedback and Undo API remain unchanged.
- New scheduling links retain 44px targets and wrapping. One redundant trip-field label rule was removed; existing error, invalid, focus, theme and print rules remain.
- The [Kyoto pilot evidence](kyoto-pilot-2026-10-30.md) adds four limited, primary-source-backed fields in English/Japanese/Thai. Fushimi Inari's four unresolved fields remain Unknown. Published coverage is not a claim that every price, condition or route is complete.

No dependencies, account system, cloud sync, storage-schema migration, analytics service, map provider or production infrastructure were added. The existing artwork and photo credits remain.

## Measurements

Baseline `078798a` versus this implementation, local production builds on Node.js 26.13.0 and Chromium 156.0.8078.4. Payload checks use a 390×844 viewport, reduced motion, fresh contexts, no network/CPU throttling, intercepted tiles and three runs per route. Repeated byte measurements matched. Initial JS counts scripts in server HTML; All JS includes automatic prefetch through network idle. Neither column includes HTML/RSC, CSS, images or subsequent interactions.

| Route | Initial JS bytes before → after | All JS bytes before → after |
| --- | ---: | ---: |
| `/en` | 187,092 → 187,184 | 265,337 → 266,374 |
| `/en/explore?scope=places&view=list` | 212,056 → 213,032 | 276,163 → 277,241 |
| `/en/my-trip` | 198,034 → 198,107 | 265,337 → 266,374 |
| `/en/about` | 170,974 → 171,030 | 266,478 → 267,519 |
| `/en/credits` | 169,833 → 169,885 | 265,337 → 266,374 |

CSS encoded bytes change from 19,592 to 19,651. New actions and sourced text add roughly 1.0–1.1 kB of JavaScript including prefetch; this batch reduces repeated runtime work, not total transferred bytes. No LCP, INP, frame-rate or production field-performance improvement is inferred.

Local production-build browser CDP precise coverage, after initial reads:

| Scenario | Before executions | After executions |
| --- | ---: | ---: |
| Library parser: 10 title edits + 10 calendar-note toggles, raw library unchanged | 30 | 0 |
| ReportLink: 10 trip-storage updates on About, language/tools unchanged | 10 | 0 |
| ReportIssue: same updates | 10 | 0 |

The parser result holds for 0, 1 and 10 saved plans: 2, 39,167 and 391,661 serialized bytes respectively; populated saved plans contain 60 visits each. Zero means no additional parse during those interactions, not that initial reads or write boundaries skip validation. These are function execution counts, not React committed-render counts or interaction latency measurements. An isolated mock-hook harness additionally checked parser invalidation and write guards; its CPU timings are not browser performance results.

Computed trip-field styles match before/after in **30 states**: normal, focus, invalid draft, conflict and print across 320/390/1440px and light/dark. Browser screenshots and regressions cover the visitor flows separately.

## Bounded work and remaining acceptance

Shared data retention was traced through both TripProvider → trip → places and Footer → ReportLink → report-context → places. A parser-only move would leave another catalog consumer. This batch does not introduce a manually duplicated ID registry or claim a bundle reduction from a source-file split. A compact authoritative registry and broader context/CSS changes remain separate measured experiments.

The [visitor acceptance checklist](visitor-acceptance.md) records novice sessions, VoiceOver/TalkBack, physical Files/Downloads recovery, actual calendar clients, deployed browser checks and alert/rollback drills as **Not Run**. They require participants, devices or the confirmed production operator/origin. No human/native-language approval, physical route validation, production deployment or alert delivery is implied by local checks.

## Integration verification

Passed locally: lint, TypeScript, production build, deployment-checker self-test, credential-pattern scan of 250 non-ignored files and dependency audit (zero reported vulnerabilities). The targeted browser run passed **102 cases**; the full suite passed **336 cases with two existing deliberate skips**. All local visual references passed unchanged. The prior pagination test now checks a published first-page place and an unknown Fushimi record instead of assuming Gion has no published accessibility note; pagination, spelling suggestions and map-return focus remain asserted.

The new schedule action was inspected at 320–430px in all three languages and both themes across six scenarios: it retained a 44px target with no overlap with Remove or document-width overflow. Three dictionaries have matching **608 leaf keys**. Those local checks do not replace the external acceptance above. The pre-existing `next-env.d.ts` development references are preserved outside this release.
