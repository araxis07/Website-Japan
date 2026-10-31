# Planning clarity and measured performance — 2026-10-31

This batch builds on `4b9dc74`. It improves the existing planning flow without introducing accounts, services, dependencies or new file formats.

## Delivered behavior

- Calendar, library and other advanced-tool buttons use the existing theme and at least 44px touch targets. Nested library file inputs and accommodation selects fit narrow layouts instead of stretching their grid tracks.
- Directions show the resolved start point beside the Google Maps action even when its controls are closed. Previous stop, base, checkout, overnight accommodation, manual address and an empty manual address remain distinct; route URL behavior is unchanged.
- Calendar previews separate timed visits, all-day visits without a time, and unscheduled visits excluded from export. Existing dates, event IDs and optional-note privacy behavior are preserved.
- The existing export preview explains full JSON backup, readable offline HTML, redacted sharing and calendar export. Its calendar link opens the existing panels rather than adding another workflow.
- Only a pristine, default seven-day plan starts with its toolbar/day editor collapsed. Plans with visits, explicit optional fields, notes, accommodation, budget, preparation, FX, pending changes, undo history or drafts remain open. The editor stays mounted. Personal stops, import, backup, settings and drafts stay outside this disclosure.
- Reloaded `#trip-tools` and `#trip-import` links scroll after the saved plan mounts. The delayed scroll does not move focus or interrupt a focused input.
- Interface keys match across Japanese, English and Thai: **616 leaf keys** per dictionary.

## Information validity

Two existing event-scoped booking claims now carry an inclusive Japan-date `validThrough`: Kyoto National Museum, November 29; Kiyomizu special night viewing, November 30. `expired` is separate from `overdue` source review. Original statements, provenance dates and unknown fields are retained; the event periods do not imply continuous opening.

The [content review queue](content-review-2026-10-31.md) identifies **73 fields across 32 places**, with sources, deadlines and honest Pending/Unassigned status. Only the two event end dates were checked for this metadata change; this release does not claim a factual refresh of the whole catalog.

## Performance evidence and decisions

`PlacesMap` and `VisitFacts` now read the existing stable language/copy context instead of subscribing to trip storage. Ten Gion Save/Remove actions on the Kyoto guide produced these function-execution counts:

| Component | Base `4b9dc74` | Retained build |
| --- | ---: | ---: |
| PlacesMap | 10 | 0 |
| VisitFacts, four instances combined | 40 | 0 |

These are Chrome precise-coverage function executions, not React commit counts, INP measurements or a field-performance claim. Save controls retain their own live trip subscription.

Payload measurements used local production builds, Chromium 156.0.8078.4, a 390×844 viewport, reduced motion and three fresh contexts per route, with no CPU/network throttling and map tiles blocked. Values below are median encoded body bytes. Initial JS is identified from the response's script URLs; all JS also includes viewport-triggered prefetch. Images, fonts, headers and later interactions are excluded.

| Route | Initial JS: base → retained | All JS: base → retained |
| --- | ---: | ---: |
| `/en` | 187,184 → 187,184 | 266,374 → 266,939 |
| `/en/explore?scope=places&view=list` | 213,032 → 213,076 | 277,241 → 277,860 |
| `/en/my-trip` | 198,107 → 198,628 | 266,374 → 266,939 |
| `/en/about` | 171,030 → 171,030 | 267,519 → 268,084 |
| `/en/credits` | 169,885 → 169,885 | 266,374 → 266,939 |

HTML, CSS and prefetched RSC were measured too, to detect cost shifting. For `/en/my-trip`, HTML changed from 14,796 to 14,949 bytes, RSC from 66,055 to 66,526 and CSS from 19,651 to 19,923. Combined HTML+all-JS+RSC+CSS increased from 366,876 to 368,337 bytes (+0.40%). Across the five routes, the combined increase was 1,461–1,524 bytes. The added explanations and controls have a small payload cost; this is not a bundle-size reduction claim.

A generated identity/route registry was built and checked against 611 parser and 3,030 report-context parity cases, plus display equality and stale-output checks. It did not remove the retained display-catalog dependency: its measured all-JS payload exceeded the retained build by 1,011–1,034 bytes. That candidate preceded the final hash/overflow fixes, so this is a build comparison rather than exact per-line attribution. The registry, generator and build hooks were removed from this release. Stable IDs, alias migration and report privacy validation keep their existing authoritative implementation.

Core backup, readable HTML and saved-copy recovery remain available before the first offline interaction. Optional-tool splitting and navigation-prefetch changes were not shipped: they need a separate measured experiment that preserves this offline contract and demonstrates a navigation benefit. No global prefetch disable, additional caching layer or duplicated ID list was introduced.

## Verification and ownership

- Passed: production build (182 generated pages), TypeScript, ESLint, dependency audit (zero reported vulnerabilities), credential-pattern scan, deployment-checker self-test and diff whitespace check.
- Passed: 22 targeted browser/schema cases, including all six new planning cases in Chromium, mobile WebKit and Firefox. They cover three-language origins, export purposes, calendar contents, 320px/light and 390px/dark controls, pristine-plan safety, notes/drafts/import paths, Japan-date expiry boundaries and offline-first JSON/HTML/library equality.
- Passed: all 354 applicable regression cases, with two intentional engine-specific skips. The full local run passed 350 cases; four trip-tool screenshot references changed by one pixel after the surrounding layout changed. Their light/dark desktop/mobile images were visually reviewed and all four passed a targeted macOS rerun. The first Linux quality run also passed 350 cases with the same four one-pixel screenshot framing differences and two skips. Its [reviewed artifact images](https://github.com/araxis07/Website-Japan/actions/runs/41154295964) supply the four updated Linux references; the subsequent commit’s quality run provides independent verification. No screenshot threshold or behavioral assertion was weakened.

Five specialist workstreams covered UI behavior, CSS, content validity, performance experiments and regression coverage. Root integrated shared translations, rejected the registry based on measurements, reproduced and fixed the narrow-screen/hash failures, and owns the production build and browser checks. Two agent follow-up turns reached their usage limit; root completed those fixes directly.

Physical-device Files/Downloads recovery, VoiceOver/TalkBack, native calendar clients, novice sessions, native-language editorial acceptance and a confirmed live-production check remain **Not Run**, tracked in the [visitor acceptance checklist](visitor-acceptance.md). No production deployment, alert delivery or physical-route verification is implied by local or CI results. Existing local `next-env.d.ts` development references are preserved outside the commit.
