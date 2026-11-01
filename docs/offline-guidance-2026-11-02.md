# Offline Kyoto guidance snapshot — 2026-11-02

The readable HTML itinerary now carries the existing Kiyomizu-dera and Kyoto National Museum approach notes and event-scoped booking information. It reuses the [November 1 evidence](kyoto-visit-scope-2026-11-01.md), `visitFor`, `visitSource`, `fieldApplicability` and `fieldReview`; no visitor fact, source-review date, expiry date, stable ID or trip format is changed. Other guide places and personal stops retain their existing itinerary output without this pilot guidance.

## Snapshot behavior

- One Japan calendar date is captured when `offlineTrip` generates a file. The heading identifies the generated date and explains that saved guide notes/event dates do not update automatically. Reopening an old file does not refresh its facts or source status.
- Each pilot visit contains the operator approach label, source link and scope note. Kiyomizu uses the temple access guide and its access-field review date; the Museum uses the explicitly labelled bus-arrival PDF and its entrance-field review date. These are reference instructions, not certified entrance coordinates or proof of continuous step-free travel.
- Booking text, all named event periods, the supplied trip's visit-date applicability, source link, original source-review date and inclusive expiry date are saved as escaped HTML. Freshness/expiry status is evaluated against the generated Japan date, independently of the scheduled visit date. A period match does not establish opening days/times or a confirmed reservation; an outside-period result does not mean closure or mandatory booking.
- Source links and Google route links remain ordinary anchors that need internet when followed. The file adds no scripts, images, map tiles, automatic external requests or offline caches. The existing exported-document CSP remains unchanged.

## Privacy and integration contract

`TripTools` already passes `exportTrip`: either the full trip or `publicTrip(trip)`. The renderer reads only that supplied argument. Its scheduled date is derived from that argument's start date and day; a redacted export has no private start date, so pilot booking applicability is `dateNeeded`. Named public event dates and the generated snapshot date may remain, but no original trip date is recovered from browser storage, context or a second trip object.

Only non-custom entries whose resolved canonical ID is `kiyomizu` or `kyoto-museum` receive the extra guidance. Personal stops never receive guide facts, including a custom record that collides with a guide ID. Existing notes, accommodation, budget, personal-link and sanitized-export behavior remain. Every added text and attribute value is passed through the existing HTML escape function; URLs come from the existing static operator records.

HTML selectors for integration/QA: `.offline-snapshot` contains the generated-date `time`; `.offline-visit-guidance[data-place-id]` scopes each pilot visit; `.offline-approach` contains the operator anchor/note and approach review date; `[data-applicability]` contains `dateNeeded`, `inPeriod` or `outsidePeriod`; `[data-review-status]` contains the booking status at generation. Dates use semantic `time[datetime]` elements. Only `tools.offlineSnapshotGenerated` and `tools.offlineSnapshotHelp` are new locale keys; existing booking, applicability, source, review and expiry labels are reused.

## Verification and remaining acceptance

The content agent reviewed the export call chain, public-redaction boundary, helper behavior and existing client-boundary documentation. No build, browser/server, test suite or Git operation was run by this workstream. QA/integration owns durable date-boundary, escaping/CSP, public/private and downloaded-file checks, plus repository verification. No test pass is inferred from source inspection.

Opening the downloaded HTML through real iPhone/Android Files/Downloads while offline, native-language comprehension, physical approaches and real Google Maps handoffs remain **Not Run**. A static source status is historical snapshot information, not live verification. PWA behavior, offline tiles, calendar-guide content and full 104-place fact export are outside this batch.
