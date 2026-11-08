# UI polish audit — 8 November 2026

Reviewed application code at `7978fed` using the existing production build. This is an analysis and implementation handoff, not a release or a claim of user acceptance.

## Evidence and scope

- Chromium: Thai home, Explore list, My Trip and Kyoto guide at 390px and 1440px, light theme.
- Opened the visit editor and measured its controls in Thai, English and Japanese at 320px in both themes.
- No horizontal document overflow in those sampled states. The measured visit-editor buttons were 44px tall without clipped text in all six language/theme combinations.
- Screenshots and metrics are local temporary artifacts in `/tmp/japan-ui-audit-2026-11-08/`. Tall element screenshots can include sticky-header/focus artifacts; these were excluded from defect claims. Clean component captures hide the header for capture only.

## Findings and proposed work

| Priority | Evidence | Smallest proposed change |
| --- | --- | --- |
| First | Visit-editor repeat button has computed padding `1px 6px` and 15px text; Remove uses `8px 12px` and 12px text. Both are 44px tall. | In `globals.css` / `TripPlanner.tsx`, distinguish text actions from square reorder controls. Give text actions explicit shared spacing; replace the positional `button:last-child` styling with an explicit action class. Preserve handlers, disabled states and accessible names. |
| First | The gap between `.trip-file-actions` and the following privacy note is 0px at both sampled widths. | Add a scoped 8–12px separation in `journey-tools.css`; retain the privacy copy. |
| First | Import label/input is about 79px high beside approximately 48px buttons on desktop. | Give import its own labeled row or align the action layout deliberately. Preserve the native file input, same-file reselection and import/Undo safeguards. Native English file-picker labels reflect the browser language, not a missing dictionary key. |
| Next | Primary, save and tool buttons use several size/font/radius combinations. Different semantic roles are legitimate, but same-role controls lack a clear shared convention. | Define a small set of shared CSS values and primary/secondary/text-action treatments using existing components. Avoid a new UI dependency or forcing every control to the same size. |
| Next | The Thai mobile help label wraps into two uneven lines; the desktop trip task links form a dense row. | Review a concise localized navigation label and intentional task grouping/spacing. Preserve emergency access and full accessible names; check all three languages. |
| Next | At 1440×900 the trip heading and supporting sections occupy the initial viewport before visit rows. On the sampled 390px Explore page the first result starts near the viewport bottom. | Compact utility-page introductions, repeated result counts and vertical gaps. Keep the homepage's editorial composition. Evaluate with novice tasks before removing useful guidance. |

## Acceptance for the implementation pass

- Check affected controls at 320/390/768/1440px in three languages and both themes, including disabled, keyboard focus, long text and wrapped rows.
- Keep established 44px control targets; preserve readable text padding and separation. Verify overflow, hit areas and screenshots rather than relying only on minimum height.
- Exercise reorder, repeat, remove/Undo, file reselection and import rejection/replacement after any markup change. Reuse existing tests and add only assertions for the spacing regressions actually fixed.
- Review screenshots before accepting updated references. Do not relax assertions or change storage contracts to accommodate visual work.

## Wider direction and limits

The next milestone should be consistent utility-page UI followed by novice/device acceptance. Broad feature expansion is not justified by this audit. Content depth, verified entrance/access details and assigned review owners remain separate editorial workstreams; new live venue facts were not researched here.

The initial audit made no application changes. Differences in button dimensions alone are not evidence of an accessibility failure.

## Implementation

- Explicit text/reorder action classes replace positional button styling. Repeat and Remove share 13px text and 12px horizontal padding; reorder controls remain 44px square.
- Backup actions precede a dedicated native import row, with 12px separation before privacy copy. Import validation, reselection, stale-preview protection and Undo handlers are unchanged.
- Planner headings and task-link spacing are compacted; Explore result spacing is reduced. Live result counts, beginner guidance and homepage composition remain.
- Mobile Help has a concise visible label in all three languages and preserves the full accessible name and emergency destination.
- The existing control styles are reused; no new design abstraction, dependency or storage contract is introduced.
- QA added `ui-polish.spec.ts`: three languages, two themes, four widths, three utility pages, across Chromium/WebKit/Firefox. A separate agent reviewed the UI diff read-only.

## Verification

Production build (182 pages), TypeScript and ESLint passed. All 18 new UI test cases passed in the initial focused run; the five expected visual changes were inspected before updating macOS references. The macOS full run finished with 545 passed, two existing skipped tests and one Firefox FX draft-return failure (the page navigated away after the focus assertion). All 15 targeted repetitions of the three FX draft-return cases then passed without changing code or assertions; the intermittent failure remains a follow-up observation.

Linux CI run `42419282783` completed with 541 passed, two existing skipped tests and only five expected screenshot mismatches. All functional tests, including FX draft return, passed there. The four trip-tools images and Thai mobile hero image were visually reviewed before replacing Linux references. The mobile hero differs by a one-pixel capture height after the shorter navigation; its content and composition are preserved. No screenshot tolerance was relaxed.

Fresh security checks: production dependency audit found zero vulnerabilities; the complete audit reported eight Moderate findings in the development lint dependency chain, with no High/Critical findings. Credential-pattern, CSP-checker self-test and source-link-checker self-test passed. No force dependency downgrade was applied.

Physical-device, assistive-technology, performance benchmark and production deployment checks remain outside this pass. Source-link self-tests verify the checker, not current availability of external travel sites.
