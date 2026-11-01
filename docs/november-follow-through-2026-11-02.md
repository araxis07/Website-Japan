# Completing trip actions and offline guidance — 2026-11-02

This delivery builds on `07a89b7`. Frontend, Content/Maps, Performance and QA/Security workstreams had separate file ownership; the lead integrated shared copy, source maintenance, Kyoto entry points and verification. After the Performance agent hit its usage limit, the lead completed the search experiment, final measurements and integration. No dependencies, storage schema or recovery-file format changes are included.

## Visitor outcomes

- A successfully repeated visit or new personal stop now opens and focuses the existing Unscheduled day view, so an active day filter cannot hide the newly saved item. Failed writes preserve the view, field values, drafts, original visit metadata and previous Undo. Editing an existing personal place does not trigger the creation handoff.
- Feedback Undo stays usable while hovered or focused. The existing JavaScript timer is the single expiry clock and starts a fresh five-second interval after interaction ends. A short CSS fade-in ends at full opacity and honors reduced/paused motion. The panel stays mounted to preserve focus; only its message refreshes on a new feedback sequence.
- [Offline Kyoto guidance](offline-guidance-2026-11-02.md) carries the existing two venue approaches and booking-period information, with visit-date applicability, original provenance and a generated Japan date. It is a static snapshot. Shared HTML uses the redacted trip and does not recover private dates from context or storage. The HTML remains escaped, script-free and protected by its original CSP.
- The Kyoto city guide explicitly identifies its three-place selection and links to the broader prefecture plan, which also includes Fushimi Inari. My Trip now offers Kyoto through the existing prefecture day groups. Preview, canonical IDs, notes and Undo retain their existing contracts; the city's map/selection and unknown Fushimi facts were not silently changed.

## Payload, search and maintenance

[Staged performance evidence](november-performance-2026-11-02.md) records seven-run transfer/navigation comparisons. The three full-dictionary Home client props are narrowed; Journey tabs receive only current-language content while keeping every route and ApplyPlan input eager. Final combined HTML + all-JS + RSC + CSS transfer falls 13,492–19,000 encoded bytes over six measured routes. No field LCP/INP or navigation speedup is claimed.

Explore computes the normalized query once per query change and skips unnecessary text work for empty normalized queries. An isolated comparison retained the same ordered results in 1,728 cases. Existing aliases, province keywords, filters, history and map-return focus remain; no index, worker or extra cache layer was added.

[Source-link maintenance](source-maintenance-2026-11-02.md) now covers 221 unique URLs in seven files with cross-file/category provenance. The live run flagged seven responses; two were readable through the primary-page reader while five remain pending retrieval/review. Successful HTTP responses do not renew facts. A network-free checker self-test is added to CI; live checks retain the existing scheduled/manual behavior.

## Quality and security

Durable new cases exercise creation handoff, rejected writes, keyboard and hover timing under normal/reduced motion, offline privacy and escaping, normalized search, every localized Journey tab with the browser offline before first use, and Kyoto guide/starter preview/application/Undo.

- **Passed:** lint, TypeScript, production build (182 pages), secret-pattern check, source-checker self-test and deployment-checker self-test.
- The complete local suite finished 467 cases: **464 Passed**, two existing engine-specific **Skipped**, and one Firefox **Failed** while opening a moved visit's details before focusing its day selector. The unchanged case then passed alone and in five repeated runs with the normal three workers. Its original intermittent failure is recorded; a root cause is not established, and no app fix, timeout increase, automatic retry, skip or assertion change is claimed for it. The committed source is independently checked by the full GitHub workflow.
- All 24 new cases passed in the complete run. The offline privacy check subsequently scopes private-date assertions to itinerary/applicability output so a public generation date cannot cause a false failure when it coincides with a travel date; its three-engine rerun passed.
- An additional real Chromium download check exercised the full and share buttons, opened the downloaded share HTML as a local file while offline, and verified guidance, escaping, omitted private fields, no executable elements and the unchanged saved plan. This does not complete physical iPhone/Android acceptance.
- Existing visual references were unchanged. The isolated search and staged payload measurements are supplemental evidence, with their limits recorded separately.

The November 2 dependency review reports zero production findings and zero High/Critical findings. The existing 16 Moderate affected entries in the development lint chain remain associated with [minimatch GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249); no supported whole-chain remediation was established. No forced major override or relaxed audit gate was introduced. Targeted source review retained import validation, public-ID redaction, fixed draft-return routes and HTML/calendar escaping.

## Remaining external acceptance

The Home composition, Japanese artwork, light/dark modes, on-demand 3D, prefetch policy and existing recovery paths remain. The possible overlapping screen-reader announcements in Explore require an actual assistive-technology session before changes are chosen.

Novice sessions, independent native-language acceptance, physical approaches, VoiceOver/TalkBack/native OS controls, real iPhone/Android file opening and Maps handoffs, real calendar clients, confirmed deployed-origin checks and rollback/alert delivery remain **Not Run** under [visitor acceptance](visitor-acceptance.md). These are not completed by browser emulation, agents or reachability checks. No production service, account, deployment, new paid resource or external message was created.
