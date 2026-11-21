# Visit references, coincident pins and Japan dates — 21 November 2026

Four specialist scopes covered UI, primary-source maintenance, performance and QA/security. The lead coordinated file ownership, integration and release verification. The site remains local-first with eight locales; human and physical-device acceptance are separate from automated checks.

## Visitor changes

- Day-map numbers retain the original visit-list positions, including gaps for stops without coordinates. Cards show the same references; the timeline preserves those references while sorting by the entered visit times. A translated note explains the distinction. No trip data is automatically reordered.
- Coincident locations have native visit-choice buttons inside the open day map. Number, place name and any entered time distinguish visits; each button uses the existing focus/scroll handoff. Long names wrap at narrow widths. These controls do not change the URL, saved plan, day filter, drafts or Undo history. Generic maps keep their previous numbering and cluster counts.
- [Seven reviewed fields](source-review-2026-11-21.md) receive field-specific November 21 dates. Hokudai booking text separates ordinary individual visits from group/school application arrangements in eight languages; TNM Spanish hours now say public holidays. Other data and November 19/20 provenance remain intact. The queue through December 3 falls from 42 to 35 fields, with none still due November 25.
- Japan-date formatting reuses one immutable `Intl.DateTimeFormat` with the existing explicit English locale and Asia/Tokyo timezone. Every call still formats its supplied instant. Validation, per-edit persistence, locks, draft recovery and offline exports remain intact.

## Performance and correctness

See [the performance report](performance-2026-11-21.md) for CPU traces, fresh-context timing conditions and before/after limitations. Timing and instrumented diagnostic passes are separate; browser regression suites do not run alongside the timing samples. No broad context rewrite or speculative lazy-loading change was introduced.

The actual-module date parity check passed 1,007 calls covering supplied/default instants and invalid-date cases, including Tokyo midnight, leap day, New Year and revisiting earlier instants. Formatter constructions in that isolated check fell from 1,007 to one. This verifies reuse and output compatibility; it is not a claim that end-to-end page latency fell by the same ratio.

UI regressions cover an unmapped stop in the middle of the list, reversed entered times, native mouse/keyboard handoffs, mobile-emulated taps for every coincident visit, long names at 320px, selected removal, Undo, reload and unchanged URL/storage/drafts. The new helper test retains explicit leap/year boundary expectations.

## Security and release scope

Full and production-only dependency audits returned zero findings. QA found no material new trust-boundary issue in the reviewed diff: map names remain text, ordinals are derived locally, visit identity uses existing keys and selection does not export private identifiers. Content comparison checks exactly seven provenance and nine visitor-text changes; event expiry and unreviewed fields remain unchanged.

Read-only public GitHub API checks on November 21 returned `main.protected: false` and no active rules for `main`. The repository runs `quality-complete`, but platform rules do not require it before writes/merges. Repository settings were not changed: adopting required PR checks would change the owner's direct-main workflow and remains a maintainer decision. No production origin, hosting, tunnel or telemetry service was created.

Local verification passed: TypeScript, lint, the production build (477 static pages), 11 targeted map/date cases, 192 content/planning/international regressions and six shared-map regressions (209 browser/helper cases in total). Full and production-only audits returned zero findings; the 314-file secret scan and link/deployment checker self-tests passed. The QA specialist completed the initial review but hit its usage limit on the final follow-up; the lead performed the final integrated diff review. The pushed commit's Website quality checks remain authoritative for the complete Linux browser suite. No snapshot, tolerance, retry or test timeout was relaxed.

## Remaining acceptance

Use the existing [visitor worksheet](visitor-acceptance.md) for novice sessions, native review, physical touch/assistive technology, file recovery and calendar clients. Those checks, on-site routes and deployed HTTPS/rollback acceptance remain **Not Run**. The new timeline text is model-reviewed, not native-certified. Live operator availability and group-specific application deadlines are not guaranteed by a source check.

Kyoto Museum booking still first expires November 30 and Kiyomizu December 1. These dated claims need their own end-of-event follow-up; no period was extended or retired early.
