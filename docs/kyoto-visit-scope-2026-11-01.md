# Kyoto visit-date and approach scope — 2026-11-01

This batch adds date-applicability and operator-approach metadata to the existing four-stop Kyoto pilot. It does not renew the 73-field review queue, move reference pins or certify continuous accessible routes. The source-research actor is the Codex content-research agent; human ownership remains Unassigned and independent native/physical acceptance remains Not Run.

## Evidence read on November 1

| Existing claim | Primary evidence | Additive metadata and limit |
| --- | --- | --- |
| `kiyomizu` booking | [2026 night-viewing schedule](https://www.kiyomizudera.or.jp/event/yakan.php), [autumn notice dated October 28](https://www.kiyomizudera.or.jp/news/yakan-haikanautumn.php) | Inclusive periods March 27–April 5, August 14–16 and November 21–30, 2026. The operator states no reservation is needed for these viewings. Gaps, ordinary visits and other events are not covered. |
| `kyoto-museum` booking | [Museum homepage](https://www.kyohaku.go.jp/eng/), named exhibition and visitor notification | The Tale of Genji exhibition is October 6–November 29, 2026; advance ticket reservations are not required for that exhibition. A date within this span does not prove the museum is open that day or confirm a booking. |
| `kiyomizu` approach | [Temple access guide](https://www.kiyomizudera.or.jp/access.php) | Labelled as an operator guide, not a surveyed gate map. It identifies the two accepted approaches and warns that map apps may direct visitors to non-entry routes. |
| `kyoto-museum` approach | [Operator bus-arrival map, updated March 11, 2025](https://www.kyohaku.go.jp/jp/assets/visit/access/bus-map.pdf) | Labelled explicitly as a bus-arrival PDF: visitors cannot enter at the West Gate and continue on foot to the South Gate. This does not establish a station-exit-to-gate step-free route. |

Existing booking wording, October 30 source-review dates, inclusive `validThrough` dates, record dates and all other field dates are preserved. This records a bounded metadata check, not a new verification of ordinary prices, schedules or every source in the maintenance queue. The two booking review deadlines remain November 29.

## Applicability versus freshness

`VisitSource.applicablePeriods` stores inclusive Japan calendar-date ranges. `fieldApplicability(visit, field, visitDate?)` returns no applicability for a missing field or absent periods, `dateNeeded` for an absent/invalid calendar date, `inPeriod` within any published period, and `outsidePeriod` before, after or between periods. It does not calculate opening days, time-of-day eligibility, availability or reservation status. `fieldReview(today)` independently retains source cadence and expiry behavior.

`VisitFacts` accepts an optional visit date and renders the named periods and result only for fields carrying periods. Generic pages can show the date-needed state. Existing full and subset field rendering, unknown values and sources remain. Trip directions supplies the saved visit date inside an expandable booking section, while trip and place-detail views put the scoped operator link next to the external route action; no full trip context is added here.

## Four-stop gaps and possible follow-up

- **Kiyomizu:** ordinary admission price, accepted-document interpretation and ordinary-visit booking requirements remain Unknown. The [access page's 2026 hours table](https://www.kiyomizudera.or.jp/access.php) is a primary source for a later seasonal-hours refinement, but this batch does not replace the existing hours note or treat an event-period match as an opening-hours result.
- **Gion:** the existing station-lift note and bounded public-street research segment remain; the lift/crossing/street connection and access to individual buildings are not physically verified. No new field is added.
- **Fushimi Inari:** [English FAQ](https://inari.jp/en/faq/), [Japanese FAQ](https://inari.jp/about/faq/) and [prayer-service page](https://inari.jp/grace/gokito/) were read again. They do not establish ordinary grounds hours, admission, general booking or a continuous accessible approach. Those four fields stay Unknown; prayer-service times/offerings are not substituted for visitor facts.
- **Kyoto Museum:** booking rules outside the named exhibition and a continuous station-to-South-Gate step-free route remain unverified. The existing [Getting Here](https://www.kyohaku.go.jp/eng/visit/access/) railway advice does not select a numbered exit; the bus-arrival map is not generalized into that route.

No missing visitor field is filled to improve coverage. Native-language comprehension, novice date/gate decisions, actual iPhone/Android Maps handoffs and physical/assistive-technology acceptance remain Not Run. No operator contact or human approval is claimed. Integration and QA own the repository checks and boundary/date-gap regression results.

The content agent's bounded assert-based self-check passed 28 applicability cases, including inclusive endpoints of all three Kiyomizu periods and intervening gaps, Museum endpoints, absent dates/fields and invalid actual calendar dates. It also checked retained booking review/expiry dates, translated approach metadata and the four unchanged Fushimi unknowns. TS/TSX transpilation reported no syntax errors; this is not a full typecheck, browser run or build.
