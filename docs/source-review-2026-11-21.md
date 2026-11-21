# Seven fields due November 25 — source review on 21 November 2026

Scope: Gion's three N/A statements, Tokyo National Museum hours/admission/booking, and Hokkaido University Museum booking. All 56 locale values were compared with the retrieved evidence. Only these seven provenance dates become `2026-11-21`; source URLs remain unchanged. November 19/20 fields, record dates, other fields, unknowns, IDs, coordinates and event periods/expiry are retained. No framework or schema change is made.

| Stable ID / fields | Retrieved evidence and bounded decision |
| --- | --- |
| `gion` / hours, admission, booking (N/A) | [JNTO Gion](https://www.japan.travel/en/spot/84/) identifies an entertainment district with separate businesses, temples and shrines. [Kyoto City's Southern Gionmachi guidance](https://kyoto.travel/en/responsible-travel/gion-manner-message-from-southern-gionmachi/) describes a lived-in district and distinguishes permissions for private/restricted premises. Retain all three N/A reasons and their existing JNTO URL. This is an editorial classification of the mapped district, not evidence that every business is free, always open, accessible or reservation-free. No individual venue's rules or private-lane permission are newly certified. |
| `tokyo-museum` / hours | [Museum visitor information](https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en) confirms regular 09:30–17:00, calendar-based evening extensions, last admission 30 minutes earlier and the Monday/public-holiday exception. Existing qualified text is retained; Spanish alone now says public holidays rather than vacations. No new holiday schedule is copied into the guide. |
| `tokyo-museum` / admission | The same operator page confirms collection admission of ¥1,000 adults / ¥500 university students, separate special-exhibition arrangements and ID/concession conditions. Eight existing values agree; no prices or eligibility categories are added. |
| `tokyo-museum` / booking | The operator explicitly states online collection tickets are valid for two months from purchase during opening hours; special-exhibition ticketing is separate. Existing eight values agree. This does not promise entry on a closed day, a reserved slot, re-entry or admission to every special exhibition. |
| `hokkaido-museum` / booking | Both the [English Visit page](https://www.museum.hokudai.ac.jp/english/visit/) and [Japanese opening information](https://www.museum.hokudai.ac.jp/outline/open/) support ordinary individual visits without advance reservation, while describing separate group/school application procedures. Retain the English field URL and qualify all eight values as described below. |

## Hokudai application scope

The Japanese page requests most groups, excluding high-school visits, to submit an application a month ahead. It separately gives one week for teaching at the Model Dairy Farm and directs high-school educational visits through the university admissions process a month ahead. The English page requests group application forms, treats high schools separately, and mentions a one-week paperwork period in the paragraph following Model Dairy Farm teaching instructions. That wording does not establish one universal deadline for every group category.

The accepted visitor text therefore preserves no reservation for **regular individual visits** and instructs groups/schools to contact the museum **in advance** to confirm the applicable application procedure and deadline. It does not remove the advance-application requirement or choose a generic one-week/month deadline. Unclear eligibility and deadlines remain for the operator to resolve; no contact or newly changed policy is claimed.

## Retrieval and dates

The web reader retrieved substantive JNTO, Kyoto City and TNM content. Hokudai's English page returned a reader 502 and its Japanese page timed out. Normal local headless Chromium navigations retrieved both pages with HTTP 200, their page titles and full booking/application text. No authentication, altered identity, certificate bypass or challenge bypass was used. Browser responses describe those retrievals, not origin uptime; dates were renewed from the compared text, not status alone.

Kyoto City's community message is dated January 9, 2024; that is the page's own publication date, distinct from this review. No content-specific update date was visible for the other compared sections. Unrelated news dates, copyright years and retrieval dates do not establish when an operating rule changed. No street-route, live facility, on-site or native-speaker acceptance follows from this research.

## Change and verification manifest

- Provenance: Gion N/A hours/admission/booking; TNM hours/admission/booking; Hokudai booking — seven fields, unchanged URLs, each reviewed November 21 and next due **December 21**.
- Visitor text: Hokudai booking in eight locales; TNM hours in Spanish only (`vacaciones` → `días festivos`). Other visitor text and all Gion N/A reasons remain unchanged. This is model review, not native editorial certification.
- The cadence queue through December 3 falls from **42 to 35 fields**; no field remains due November 25. The seven November 19 fields and 26 November 20 fields are not reviewed again. Kyoto Museum booking still first expires November 30, and Kiyomizu booking December 1; neither claim is retired early or extended.
- An in-memory comparison checks exactly these seven provenance and nine locale-value changes, unchanged record/unreviewed dates and unknown fields, all retained periods/expiry, the new due date and queue transition. Application tests, build and integration checks belong to the lead/QA owner. Human, physical-device and on-site acceptance remain Not Run.
