# Day-map handoff and source maintenance — 20 November 2026

Four specialist scopes covered UI, source maintenance, independent language/category review and QA/security. The lead integrated changes, measured local performance and owns final build/browser verification. Source edits used one writer; the site remains local-first with eight languages and 477 static pages.

## Visitor changes

- Day-map click, Enter or Space selects the corresponding existing visit card using its visit key, then focuses and scrolls to that card. Repeated visits and personal stops retain distinct keys. Selection is derived from current points, so deleting a selected visit clears its visible marker state. The action does not change the URL, trip, day filter, draft or Undo history.
- Coincident pins retain Leaflet's existing stacking: a mouse/touch selects the exposed top marker; keyboard focus can select each numbered marker. This change does not introduce an overlapping-pin chooser or a new routing engine.
- [Primary-source comparison](source-review-2026-11-20.md) covers all 26 fields due November 24, across 14 venues. Only those field review dates move to November 20. Sixteen language values clarify school-based admission categories at Dejima, Takayama Jinya and Zuiganji; prices stay unchanged. Other dates, unknowns, IDs, coordinates and event periods/expiry remain intact.
- The cadence queue through December 3 falls from 68 to 42 fields; none remain due November 24. Kyoto Museum booking still first expires November 30, and Kiyomizu December 1. New source checks do not extend those events.
- The existing visitor worksheet now includes touch/keyboard selection of repeated and personal visits. All human and physical-device rows remain Not Run. Homepage ordering and broad advanced-control changes await observed visitor findings.

## Performance diagnostic

The final diagnostic sampled build `1Ai3zLEDdU-0FRNsI4M6K` with Node 26.13.1 and Chromium 156.0.8078.4. Each fixture used three fresh contexts at 390×844/DPR3, reduced motion, 4× CPU slowdown, 150ms latency, 200,000 download bytes/s and 93,750 upload bytes/s. Tiles were synthetic and Next image-transform caching was uncontrolled. No browser test suite ran concurrently with these samples.

| Fixture | Editor ready median (range), ms | Lab INP median (range), ms | Maximum CLS |
| --- | ---: | ---: | ---: |
| Empty | 2690.5 (2658–2828.6) | 112 (64–256) | 0.00172 |
| 60 visits / 30 Thai notes | 3471.5 (2825.1–3794.4) | 184 (136–232) | 0.00172 |

Editor ready is title-field DOM detection plus two animation frames, not visually verified readiness. All six runs checked typed-value persistence; large fixtures also retained 60 calendar events without private visit identifiers. No page errors occurred. These are descriptive local samples, not physical-phone/field p75 or evidence of a speedup. Slow samples remain a profiling follow-up. Raw reports are temporary `/tmp/japan-nov20-performance*.json` artifacts.

No performance dependency or export-loading change was introduced. The current export code supports the existing first-use offline export contract; deferring its libraries until a click would require additional recovery/download behavior. Profile startup/download/hydration before choosing a narrower optimization.

## Verification

Passed: production build (477 static pages), typecheck, full lint, source-link/deployment checker self-tests, credential-pattern scan and full/production dependency audits (zero findings). Six new day-map cases passed across Chromium, mobile WebKit and Firefox, covering focus/header clearance, coincident visits, personal stops, invalid draft persistence, unchanged URL/storage/day filter, reload, selected deletion and Undo. Both tests retain zero-page-error assertions. Firefox's existing project selector includes this new file.

The integration run passed 190 of 192 cases; two Korean/Firefox route cases hit the unchanged 30-second limit after about 18 seconds in page creation before application navigation. Both passed in an isolated one-worker rerun (6.6 seconds total) with the same assertions and timeouts. Failed traces were retained under `/tmp/japan-nov20-timeout-evidence/`. Together with the six day-map cases, 198 distinct focused cases passed verification; the initial batch is not represented as a clean 192-case run. The pushed commit's Website quality checks remain authoritative for the full Linux suite; no snapshot, tolerance, skip, retry or test timeout was changed.

## Remaining acceptance

Use [visitor acceptance](visitor-acceptance.md) for novice sessions, native-language review, VoiceOver/TalkBack, physical-device file recovery, calendar clients, on-site routes and deployed HTTPS/rollback checks. Those checks remain **Not Run**. Aoyagi's direct operator certificate error remains unresolved; its reviewed fields cite the retrieved official tourism-association guide. No certificate bypass, operator contact, deployment, public tunnel or monitoring service was performed.
