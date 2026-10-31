# Content review queue and claim expiry — 2026-10-31

This is an actionable queue snapshot from the committed venue model at `4b9dc74`, evaluated for the fixed Japan calendar date **2026-10-31**, plus two additive expiry dates. It does not record a mass factual refresh or claim that the queued operator pages were read again. Existing statements, source URLs, source review dates and stable IDs remain unchanged.

## Claim expiry

`fieldSources` may now carry an optional `validThrough` Japan date. The date is inclusive: the first expired day is the next Japan calendar day. `fieldReview()` returns `expired` ahead of `overdue`, preserves the independent cadence-derived `nextReviewBy`, and returns `validThrough` when supplied. A missing field remains `unverified`, even if source metadata exists. `Source reviewed` is evidence of a source check, not proof of a complete route or applicability to every travel date.

Only two existing booking claims receive this metadata. Their end dates were checked against the following primary pages on October 31; their original **October 30 source review dates are preserved**:

- **Kyoto National Museum:** the [museum homepage](https://www.kyohaku.go.jp/eng/) names The Tale of Genji special exhibition as October 6–November 29, 2026 and says advance ticket reservations are not required for that exhibition. `validThrough` is November 29; it does not extend the claim to other exhibitions.
- **Kiyomizu-dera:** the [2026 special night viewing page](https://www.kiyomizudera.or.jp/event/yakan.php) and [autumn notice](https://www.kiyomizudera.or.jp/news/yakan-haikanautumn.php) identify the final announced period as November 21–30, with no reservation required. `validThrough` is November 30. The earlier spring/summer dates and the gaps between event periods do not become continuously open or reservation-free dates; the existing event-scoped wording remains authoritative.

For these rows, the operational action deadline is the earlier of the ordinary review date and the first expired day: `min(nextReviewBy, validThrough + 1 Japan calendar day)`. Recheck before the cadence date; retire or replace an event claim when its named period ends. A successful HTTP response cannot renew a claim or move its review date.

| Stable place ID / field | Inclusive last date | First expired day | Cadence review by | Action deadline | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `kyoto-museum` / booking | 2026-11-29 | 2026-11-30 | 2026-11-29 | 2026-11-29 | Unassigned | Pending |
| `kiyomizu` / booking | 2026-11-30 | 2026-12-01 | 2026-11-29 | 2026-11-29 | Unassigned | Pending |

On the final applicable date a claim can still be `overdue` for source review: Kiyomizu booking becomes overdue on November 30 because its cadence review was due November 29, then becomes `expired` on December 1. The Museum booking claim is not expired on November 29 and is expired on November 30. Expiry marks the dated claim, not the venue as permanently closed; source links and limitations remain available.

## Thirty-day review queue

The queue contains **73 field records in 32 places**, displayed as **39 rows grouped by stable ID and due date**. It includes three Gion N/A statements that also need review. The count is 70 earlier records plus three Kyoto additions; Osaka Museum booking was already part of the earlier 70 and is not counted again. The two expiry rows above are a prioritized view of existing queue entries, not two extra review records.

All owners are **Unassigned** and all statuses are **Pending**: no queued field is marked fact-reviewed by this document. Repository owner **`araxis07`** is the existing escalation contact for assigning an actual issue owner, not an invented assignee or a claim of a staffed rota. Each accepted item needs an owner, due date, operator evidence and completion/blocked follow-up; follow the [editorial triage procedure](release-operations.md#feedback-and-editorial-triage).

| Review by (JST) | Field records |
| --- | ---: |
| 2026-11-23 | 6 |
| 2026-11-24 | 26 |
| 2026-11-25 | 9 |
| 2026-11-26 | 11 |
| 2026-11-27 | 17 |
| 2026-11-29 | 4 |

Each field link below is the existing resolved provenance for that field, using its field-specific override, N/A source or record fallback. These links are review work items, not newly checked facts. “Source reviewed” is the existing data date, not a completion date for this Pending queue.

| Review by (JST) | Stable place ID | Fields → existing source | Source reviewed | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| 2026-11-23 | `fuji-center` | [hours](https://www.fujisan-whc.jp/en/guide/index.html) | 2026-10-24 | Unassigned | Pending |
| 2026-11-23 | `hokkaido-museum` | [hours](https://www.museum.hokudai.ac.jp/english/visit/), [admission](https://www.museum.hokudai.ac.jp/english/visit/) | 2026-10-24 | Unassigned | Pending |
| 2026-11-23 | `kiyomizu` | [hours](https://www.kiyomizudera.or.jp/en/location/) | 2026-10-24 | Unassigned | Pending |
| 2026-11-23 | `osaka-museum` | [hours](https://www.osakamushis.jp/eng/), [admission](https://www.osakamushis.jp/eng/) | 2026-10-24 | Unassigned | Pending |
| 2026-11-24 | `beer-museum` | [hours](https://www.sapporobeer.jp/english/brewery/s_museum/), [admission](https://www.sapporobeer.jp/english/brewery/s_museum/), [booking](https://www.sapporobeer.jp/english/brewery/s_museum/) | 2026-10-25 | Unassigned | Pending |
| 2026-11-24 | `pref:aichi:nagoya-castle` | [hours](https://db.nagoya-info.jp/en/spot/detail/1/), [admission](https://db.nagoya-info.jp/en/spot/detail/1/) | 2026-10-25 | Unassigned | Pending |
| 2026-11-24 | `pref:akita:aoyagi-samurai-manor` | [hours](https://tazawako-kakunodate.com/spots/5990/), [admission](https://tazawako-kakunodate.com/spots/5990/) | 2026-10-25 | Unassigned | Pending |
| 2026-11-24 | `pref:aomori:nebuta-museum-wa-rasse` | [hours](https://www.nebuta.jp/warasse/foreign/english.html), [admission](https://www.nebuta.jp/warasse/foreign/english.html), [booking](https://www.nebuta.jp/warasse/foreign/english.html) | 2026-10-25 | Unassigned | Pending |
| 2026-11-24 | `pref:fukui:fukui-prefectural-dinosaur-museum` | [hours](https://www.dinosaur.pref.fukui.jp/en/info.html), [admission](https://www.dinosaur.pref.fukui.jp/en/info.html) | 2026-10-25 | Unassigned | Pending |
| 2026-11-24 | `pref:gifu:takayama-jinya` | [hours](https://jinya.gifu.jp/en/guide/info/), [admission](https://jinya.gifu.jp/en/guide/info/) | 2026-10-25 | Unassigned | Pending |
| 2026-11-24 | `pref:hyogo:himeji-castle` | [hours](https://www.himejicastle.jp/en/) | 2026-10-25 | Unassigned | Pending |
| 2026-11-24 | `pref:ishikawa:kenrokuen` | [hours](https://shiro-niwa.pref.ishikawa.lg.jp/kenrokuen-garden/info.html) | 2026-10-25 | Unassigned | Pending |
| 2026-11-24 | `pref:miyagi:zuiganji-temple` | [hours](https://www.zuiganji.or.jp/english/), [admission](https://www.zuiganji.or.jp/english/) | 2026-10-25 | Unassigned | Pending |
| 2026-11-24 | `pref:miyagi:zuihoden` | [hours](https://www.zuihoden.com/en/info/) | 2026-10-25 | Unassigned | Pending |
| 2026-11-24 | `pref:nagano:matsumoto-castle` | [hours](https://www.matsumoto-castle.jp/eng/info), [booking](https://www.matsumoto-castle.jp/eng/info) | 2026-10-25 | Unassigned | Pending |
| 2026-11-24 | `pref:nagasaki:dejima` | [hours](https://nagasakidejima.jp/about/), [admission](https://nagasakidejima.jp/about/) | 2026-10-25 | Unassigned | Pending |
| 2026-11-24 | `pref:nara:todaiji-temple` | [hours](https://www.todaiji.or.jp/en/information/haikan/), [admission](https://www.todaiji.or.jp/en/information/haikan/) | 2026-10-25 | Unassigned | Pending |
| 2026-11-24 | `sensoji` | [hours](https://www.senso-ji.jp/access/) | 2026-10-25 | Unassigned | Pending |
| 2026-11-25 | `gion` | [hours (N/A)](https://www.japan.travel/en/spot/84/), [admission (N/A)](https://www.japan.travel/en/spot/84/), [booking (N/A)](https://www.japan.travel/en/spot/84/) | 2026-10-26 | Unassigned | Pending |
| 2026-11-25 | `hokkaido-museum` | [booking](https://www.museum.hokudai.ac.jp/english/visit/) | 2026-10-26 | Unassigned | Pending |
| 2026-11-25 | `kyoto-museum` | [hours](https://www.kyohaku.go.jp/eng/visit/info/), [admission](https://www.kyohaku.go.jp/eng/visit/info/) | 2026-10-26 | Unassigned | Pending |
| 2026-11-25 | `tokyo-museum` | [hours](https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en), [admission](https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en), [booking](https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en) | 2026-10-26 | Unassigned | Pending |
| 2026-11-26 | `pref:fukuoka:dazaifu-tenmangu` | [hours](https://www.dazaifutenmangu.or.jp/), [admission](https://www.dazaifutenmangu.or.jp/en/plan/faq/) | 2026-10-27 | Unassigned | Pending |
| 2026-11-26 | `pref:hiroshima:itsukushima-shrine` | [hours](https://itsukushimajinja.jp/en/admission.html), [admission](https://itsukushimajinja.jp/en/admission.html) | 2026-10-27 | Unassigned | Pending |
| 2026-11-26 | `pref:hyogo:himeji-castle` | [admission](https://www.himejicastle.jp/en/) | 2026-10-27 | Unassigned | Pending |
| 2026-11-26 | `pref:ishikawa:kenrokuen` | [admission](https://shiro-niwa.pref.ishikawa.lg.jp/kenrokuen-garden/e/info.html) | 2026-10-27 | Unassigned | Pending |
| 2026-11-26 | `pref:kumamoto:suizenji-jojuen` | [hours](https://www.suizenji.or.jp/en/guide/), [admission](https://www.suizenji.or.jp/en/guide/), [booking](https://www.suizenji.or.jp/en/guide/) | 2026-10-27 | Unassigned | Pending |
| 2026-11-26 | `pref:nagano:matsumoto-castle` | [admission](https://www.matsumoto-castle.jp/eng/info) | 2026-10-27 | Unassigned | Pending |
| 2026-11-26 | `pref:tochigi:nikko-toshogu` | [booking](https://www.visitnikko.jp/en/spots/nikko-toshogu-shrine/) | 2026-10-27 | Unassigned | Pending |
| 2026-11-27 | `pref:ibaraki:hitachi-seaside-park` | [hours](https://www.hitachikaihin.jp/guide/schedule.html), [admission](https://www.hitachikaihin.jp/guide/ticket.html) | 2026-10-28 | Unassigned | Pending |
| 2026-11-27 | `pref:iwate:chusonji-temple` | [hours](https://www.chusonji.or.jp/worship/index.html), [admission](https://www.chusonji.or.jp/worship/index.html) | 2026-10-28 | Unassigned | Pending |
| 2026-11-27 | `pref:kagoshima:sengan-en` | [hours](https://www.senganen.jp/about/), [admission](https://www.senganen.jp/about/) | 2026-10-28 | Unassigned | Pending |
| 2026-11-27 | `pref:kanagawa:kotoku-in` | [hours](https://www.kotoku-in.jp/en/), [admission](https://www.kotoku-in.jp/en/), [booking](https://www.kotoku-in.jp/en/) | 2026-10-28 | Unassigned | Pending |
| 2026-11-27 | `pref:osaka:osaka-castle` | [hours](https://www.osakacastle.net/guide/), [admission](https://www.osakacastle.net/guide/), [booking](https://www.osakacastle.net/guide/) | 2026-10-28 | Unassigned | Pending |
| 2026-11-27 | `pref:saga:yoshinogari-historical-park` | [hours](https://www.yoshinogari.jp/information/use/), [admission](https://www.yoshinogari.jp/information/use/) | 2026-10-28 | Unassigned | Pending |
| 2026-11-27 | `pref:saitama:railway-museum` | [hours](https://www.railway-museum.jp/information/), [admission](https://www.railway-museum.jp/information/), [booking](https://www.railway-museum.jp/information/) | 2026-10-28 | Unassigned | Pending |
| 2026-11-29 | `kiyomizu` | [admission](https://www.kiyomizudera.or.jp/faq/), [booking](https://www.kiyomizudera.or.jp/event/yakan.php) | 2026-10-30 | Unassigned | Pending |
| 2026-11-29 | `kyoto-museum` | [booking](https://www.kyohaku.go.jp/eng/) | 2026-10-30 | Unassigned | Pending |
| 2026-11-29 | `osaka-museum` | [booking](https://www.osakamushis.jp/eng/about/faq.html) | 2026-10-30 | Unassigned | Pending |

## Coverage and remaining acceptance

As of the fixed snapshot, the 104 canonical places contain 212 published field values and three N/A values (215 total), with no cadence-overdue or expired field. Published coverage remains access 104, entrance 16, hours 30, admission 27, booking 13 and accessibility 22. Nonempty fields are not complete operational guidance: Kiyomizu admission still lacks a verified ordinary price, Gion accessibility covers a station lift only, and the booking claims above have event limits.

The Kyoto pilot remains three venues plus one district in two existing planning groups. Fushimi Inari hours, admission, booking and accessibility remain Unknown; no source dates or facts were added to those fields. See the [pilot evidence and remaining scope](kyoto-pilot-2026-10-30.md).

- **Done in this content batch:** additive expiry metadata for the two dated booking claims; fixed-date queue generation and primary end-date reading. This is not a new review of all 73 fields.
- **Pending / Unassigned:** the queue above, ordinary-price/booking evidence gaps, and continuous street/gate connections. Do not close items because a source responds with HTTP 200.
- **Not Run:** independent native-language review, physical routes, real-device Google Maps handoffs and live production acceptance. No external operator contact, human approval or task-completion evidence is claimed.

Integration must handle `expired` separately in VisitFacts and expose the inclusive end date without turning the venue into a closure. Content/schema reporting must count expired fields separately from overdue fields. Existing follow-through and upgrade tests exercise the earlier statuses; QA should cover expiry boundaries and precedence, missing fields, existing field sources, and Japan-date rollover. Repository-wide checks and browser results belong to the integration lead.
