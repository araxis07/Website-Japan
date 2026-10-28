# Engineering team and next priorities — 2026-10-29

The next phase prioritizes reliable trip editing, consistent search results and smaller client payloads. Keep the existing Japanese minimal design and the current static/local-storage architecture. No new service, dependency, database or account is needed for this batch.

## Ownership and coordination

| Role | Current ownership | Review responsibility |
| --- | --- | --- |
| Lead / integration | Integration, release evidence, this plan | Assign files, resolve contracts, run shared checks and review every agent's result |
| Frontend / UX | `PrefectureExplorer.tsx` | Scope-specific empty results; future keyboard focus and explicit saved-place actions |
| Trip integrity | `TripField.tsx`, `TripExtras.tsx` | Persist drafts, prevent stale-field overwrites, preserve stored plans and failed-write recovery |
| Performance | `Navigation.tsx`, locale `layout.tsx` | Serialize only navigation copy actually consumed; preserve locale/menu behavior |
| Security / QA | `tests/next-phase.spec.ts` | Exercise conflict, recovery and search scenarios independently of implementation |
| Content / maps / languages | Data and dictionaries in the next editorial batch; read-only this batch | Verify facts, per-field provenance and three-language meaning |

One writer owns each file during a task. Shared files such as the trip provider, dictionaries, map component and configuration require the lead to transfer ownership before another agent edits them. Agents report dependencies and conflicts to the lead; duplicate findings become one backlog item. Only the lead runs shared builds/test servers and integrates commits. Existing user changes remain outside the release unless explicitly included.

Each task needs a concrete visitor failure or measured cost, named files, a minimal fix and acceptance checks. QA owns the new regression file. Implementation agents may review it but do not modify it concurrently. No automatic baseline approval, dependency upgrade, production deployment or invented travel facts.

## Current batch

1. Generic fields retain the saved baseline with a rejected draft. Reject edits if that field changed elsewhere; retain the draft for review/discard. Changes to unrelated fields must remain compatible.
2. Exchange-rate inputs use the existing draft registry and saved-FX baseline. Pending data survives reload, participates in backup guards and clears after successful save or explicit cancellation. Replacing/undoing a plan must display its actual saved FX rather than old local input.
3. Place search uses place-result count for its empty state, including a place-name/category mismatch; no unrelated prefecture preview should appear for zero places. Preserve reset/history/locales.
4. Navigation receives only the text it consumes. Compare generated HTML before/after and retain menu, keyboard and language-switch behavior.

## Next backlog, in order

- Verify keyboard focus after moving a visit, make removal actions explicit and distinguish checkout-day hotel origins from accommodation for the coming night.
- Expand Firefox coverage to critical import/export, storage recovery and library flows. Let dependency/security and scheduled source checks produce evidence independently of UI-test failures.
- Review 5–10 venues along the main routes against operators. Prioritize entrance/accessibility detail, then hours/admission/booking. Keep stable IDs and reference-pin semantics.
- Align map-summary freshness with the field-level sources/dates already used by `VisitFacts`; do not present an overall review date as proof that every field was checked then.
- Measure global trip-data imports and CSS before splitting them. Preserve schema validation and legacy aliases; do not trade correctness for byte reduction.
- Run novice sessions, native-language wayfinding review, VoiceOver/TalkBack and physical mobile performance checks. A real production origin/operator is needed for deployment metadata, hosting headers, map quotas, notifications and rollback acceptance.

## Audit evidence and limits

Resolved data on October 29 contains 47 prefectures and 104 venues. All three dictionaries have the same 593 leaf keys. Missing fields: entrance 94, accessibility 86, hours 73, admission 77 and booking 93. Last-mile access notes exist for all 104 venues; there are six entrance photographs. Missing and not-applicable are distinct. Schema completeness and review dates do not prove current conditions or an accessible entrance.

Read-only discovery passed lint, TypeScript, credential-pattern checks and dependency audit (zero reported vulnerabilities). Implementation checks and before/after payload measurements are recorded with this batch's release result. Physical-device, production and human-review acceptance remains separate from automated tests.

## Batch verification

Lint, TypeScript and the production build passed (182 generated routes). The full local suite passed 203 tests with two existing deliberate skips. Six new cases run in Chromium and mobile WebKit; the existing targeted Firefox suite also passed. Existing visual baselines passed unchanged. Credential-pattern scanning passed, and dependency audit reported zero vulnerabilities. Failed-write and invalid-input drafts, unrelated-field edits, stale-field conflicts, FX reload/export guards, replacement/Undo, cancellation and search reset were exercised.

Generated About HTML before/after narrowing Navigation props (uncompressed bytes, same local build setup): Japanese 76,651 → 60,782; English 68,990 → 55,405; Thai 116,543 → 90,125. Scene-description copy is no longer serialized into these pages. This is a payload comparison with the prior generated artifacts, not a production Web Vitals or compressed-transfer measurement.

The pre-existing development-route references in `next-env.d.ts` were preserved and excluded from the release. No dependencies, data records, locale keys, storage schema or production services changed.
