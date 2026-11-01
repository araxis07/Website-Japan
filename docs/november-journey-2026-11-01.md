# Trip recovery and Kyoto visit scope — 2026-11-01

This release follows the [October 31 delivery](next-journey-2026-10-31.md). Work was divided between Frontend, Content/Maps, Performance and QA/Security agents, with shared files and integration owned by the lead. No package, trip schema, storage key or recovery-file format changes are included.

## Visitor behavior

- A remembered editor day falls back to All days when it is absent from the current plan. Import replacement, saved-copy loading and another-tab changes can no longer leave the editor empty while its select displays All days. Undo can restore the remembered day when it exists again; the view fallback never rewrites trip data.
- Personal-place values reverted exactly to their current saved values remove only that field's draft. Other pending edits and the original-value conflict check remain. Contextual draft labels are capped at the existing 200-character metadata limit.
- Checklist storage failures now explain the existing invalid/unavailable state and link to My Trip recovery. No reset or overwrite is performed automatically.
- Pending drafts identify their day/place and offer a return action. An in-memory target opens the relevant day and nested panels before focusing the field; keys and private values are not added to URLs. This includes all three manual FX fields. Missing targets explain the situation, keep the draft and clear the navigation request.
- Saved plans have a direct daily-editing link. It uses the same day-selection/focus action as the existing overview and includes unscheduled visits.

## Content and language

[Kyoto metadata evidence](kyoto-visit-scope-2026-11-01.md) records the official dates and scope for Kiyomizu night viewing and Kyoto National Museum's named exhibition. The saved visit date is compared with inclusive event periods, separately from source-review cadence and claim expiry. Dates outside a period do not imply closure or mandatory booking; dates inside do not prove opening or a confirmed reservation. Booking detail is expandable to avoid turning every trip row into a long fact sheet.

Scoped operator approach links sit next to Google route actions in trip and place-detail views. Kiyomizu uses an access guide; the Museum PDF is explicitly labelled for bus arrivals. Reference pins are unchanged and no continuous step-free route is certified.

The information-filter labels now mean that notes on the selected topic exist in all three languages. They do not assert complete operational coverage. The 73-field maintenance queue and four missing Fushimi operational fields remain open; human/native review has not been invented or completed by source research.

## Bounded design and performance decisions

A local Chromium 390×844 review retained the Home composition and Japanese artwork. An in-page Explore spacing trial across English/Japanese/Thai and widths 320/390/700 moved the first result title up 38px in all nine cases, with no horizontal overflow and minimum measured search/toolbar control height unchanged at 48.19px. The existing mobile spacing rules were adjusted; controls, navigation and result counts remain. This is geometry evidence, not a novice task-completion result.

[Performance experiments](november-performance-2026-11-01.md) retain only the draft no-op write guard, including persistence retries after storage failures. The Footer prefetch trial was rejected after observing a higher first-language-navigation median; automatic prefetch remains unchanged. Broad context rewrites, CSS ownership migration, new dependencies and extra 3D effects were not needed for these outcomes. No net bundle, field LCP or INP saving is claimed.

## Security and verification

The November 1 dependency review reports zero production findings, zero High/Critical findings and 16 Moderate affected entries through the development lint-tool chain associated with [minimatch GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). No compatible fix for the full installed chain was established; no forced dependency upgrade or relaxed audit gate is included. The finding remains open.

The return action compares complete dataset values instead of interpolating imported keys into a selector, and uses a fixed locale route. Existing import validation, conflict checks, in-memory draft fallback, backup/share boundaries and Undo are retained.

Final integration checks:

- **Passed:** ESLint, production build (182 generated pages), TypeScript, credential-pattern scan and deployment-checker self-test.
- **Passed:** all 69 new browser cases across Chromium, mobile WebKit and Firefox, including FX/orphan draft recovery, write-failure retry, imported-plan filters, date boundaries and three-language visit messages.
- The complete local run finished 443 cases: 427 Passed, two existing engine-specific Skipped and 14 Failed. Those failures came from five older test contracts: the new Museum periods object, an information-filter label, direction controls no longer being the only details element, and duplicate displayed end dates. Exact expected metadata was added and selectors now address the intended origin panel or source-expiry date. The same 14 cases then Passed on the final build (21.8 seconds); no thresholds, timeouts, skips or functional assertions were relaxed. GitHub's quality workflow provides the independent full rerun for the committed source.
- Existing visual references were unchanged and passed in the local full run. Device emulation and screenshot geometry do not establish physical-device or human acceptance.

[External visitor acceptance](visitor-acceptance.md) remains Not Run: novice sessions, native-language acceptance, physical approaches, VoiceOver/TalkBack and OS controls, real iPhone/Android downloads and Maps handoffs, actual calendar clients, confirmed production-origin checks and rollback/alert delivery. Local browser automation cannot complete these items.
