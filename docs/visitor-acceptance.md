# Visitor and release acceptance

This checklist covers evidence that automated browser tests cannot establish. It extends [release operations](release-operations.md), including its privacy, editorial and rollback procedures. The October 30 [hardening results](hardening-2026-10-30.md) remain automated/local evidence; they do not complete any item below.

All sessions use invented trip details. Do not collect real bookings, private backup files or personal coordinates. Record the tested commit, date, device/browser or calendar version, locale, outcome and a short redacted observation. Use **Passed**, **Failed**, **Blocked** or **Not Run**; name the remaining blocker when applicable.

| Acceptance | Current status | Required reviewer | Smallest completion evidence |
| --- | --- | --- | --- |
| First-time visitor tasks | **Not Run** | At least five people who have not used the site, including Thai and Japanese readers and mobile users | Observe the tasks below without teaching the interface; record completion, wrong turns, help needed and misunderstood terms. Resolve task blockers or data-loss/privacy misunderstandings, then retest with fresh participants. |
| Assistive technology and native controls | **Not Run** | VoiceOver and TalkBack users/reviewers; a physical keyboard reviewer | Complete finding, saving, assigning, directions and import-preview tasks using VoiceOver on Safari/iPhone and TalkBack on Android/Chrome. Check spoken labels, status/error announcements, focus order/return and recovery from invalid input. Separately check Safari/macOS Full Keyboard Access, Escape, native day selection and the OS file picker. |
| Files, Downloads and recovery | **Not Run** | Physical iPhone and Android reviewers | Download full trip JSON, library JSON and readable HTML through the real browser UI. Find the files in Files/Downloads, open HTML while offline, then restore trip and library into a separate clean browser profile/device. Compare visits, notes, stays, coordinates, FX and checklist with the invented source plan. Keep the original plan intact throughout. |
| Calendar interoperability and UID migration | **Not Run** | Apple Calendar, Google Calendar and Outlook reviewers | Complete the matrix below in disposable test calendars. Record what reimport and old-to-new UID migration actually do; do not infer synchronization from stable UIDs. |
| Deployed browser session | **Not Run** | Production operator and QA | At the operator-confirmed HTTPS origin, run the deployment checker and a real browser session through all three locales: search/list/map, save, assign, reload and export. Check console/network failures, actual images/cache behavior, tiles, contact destination and effective hosting headers. Record origin, deployed commit and evidence; localhost results do not complete this item. |
| Alert delivery and rollback | **Not Run** | Production operator, primary maintainer and named backup | Verify that the deployment workflow runs for the real origin and a controlled failure reaches the intended recipient. Rehearse rollback on an isolated staging/release candidate using the host's known-good artifact; rerun the checker and affected visitor task, confirming the existing browser plan survives. Record recipients, recovery result and where release evidence is retained. Production changes require separate authorization. |

## Novice tasks

Use the existing [visitor-session tasks](release-operations.md#first-time-visitor-usability-session), with these explicit checks of the planning journey:

1. Find Gion in the participant's language, save it, follow the scheduling action and assign a day. Use Undo and explain where the saved visit went.
2. Open the travel-day view, follow a guide place back to its source, then open directions. Distinguish a venue reference pin from a verified entrance.
3. Start with an empty trip and choose among finding places, a suggested starter, importing and adding a personal stop. Complete one path without help.
4. Add a repeated visit, a personal hotel linked to a stay and a note. Reload, change language, shorten the trip and find the retained information.
5. Produce a full backup and a share copy. Explain which file restores all details and which exports still contain names, addresses, dates, coordinates or notes. In particular, explain that the JSON/HTML share choice does not redact print or calendar output.

Do not mark comprehension as passed solely because a participant clicked Download. Record their explanation. Key parity, axe results and device emulation support this review but do not replace human or physical-device evidence.

## Calendar test matrix

Use an isolated calendar for each scenario and remove its test events afterwards. Keep fixtures free of real reservations. A legacy fixture must come from a known previous release; record that commit rather than reconstructing its UIDs from memory.

| Scenario | Apple Calendar | Google Calendar | Outlook | Expected observation |
| --- | --- | --- | --- | --- |
| Fresh current export: timed, all-day and repeated visits; Thai/Japanese names | Not Run | Not Run | Not Run | Japan-time visits show the correct instant in Japan and another display timezone; all-day dates and distinct repeated visits remain correct. |
| Notes excluded by default, then explicitly included | Not Run | Not Run | Not Run | Default events contain no private visit note; opt-in events contain the invented note. Personal-place names/addresses remain visible in either export. |
| Import the same current export again, then an edited/rescheduled export | Not Run | Not Run | Not Run | Record update/duplicate behavior and a safe copy-import procedure. Calendar downloads are copies, not a live feed. |
| Import a legacy export, then the current export of that plan | Not Run | Not Run | Not Run | Record any duplicates caused by the UID format change and verify the documented cleanup/replacement procedure in the isolated calendar. |

If these checks uncover a problem, record the specific device/client, trigger and visitor impact before proposing code changes or additional infrastructure.
