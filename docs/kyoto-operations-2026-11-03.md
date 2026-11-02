# Kyoto operating detail and source follow-up — 2026-11-03

The Codex content-research agent checked the primary pages below on November 3. Only `kiyomizu.hours` and `kyoto-museum.hours/admission` change, in Japanese, English and Thai. These are refinements of three existing fields, not three newly completed venues or a refresh of the 73-field queue. No operator contact or independent native/physical acceptance is claimed.

## Three checked fields

| Stable ID / field | Primary evidence | Change and provenance |
| --- | --- | --- |
| `kiyomizu` / hours | [Temple's 2026 operating table](https://www.kiyomizudera.or.jp/access.php) | Replaces the generic closing-time note with year-scoped normal, summer and night-viewing distinctions, including last entry. Adds this field's source override and review date November 3; the record and other field dates remain unchanged. |
| `kyoto-museum` / hours | [English operator hours/admission](https://www.kyohaku.go.jp/eng/visit/info/), cross-checked against [Japanese operator page](https://www.kyohaku.go.jp/jp/visit/info/) | Separates the named Genji exhibition from collection/garden-only hours, Friday extensions, last entry, Monday/holiday and year-end closures. Identifies the upcoming garden-only interval and collection reopening; field review changes from October 26 to November 3. |
| `kyoto-museum` / admission | Same English/Japanese operator pages | Separates Genji same-day prices from collection and garden-only prices. Student proof, ended advance-ticket sales and separate group/concession conditions remain explicit; field review changes from October 26 to November 3. The note is not a full concession/ticketing rulebook. |

Concrete source examples for review (not an automatic opening-calendar API):

| Date / scope | Operator evidence |
| --- | --- |
| Kiyomizu, November 20, 2026: ordinary day | 06:00–18:00. |
| Kiyomizu, November 21, 2026: night-viewing period | 06:00–21:30; night-viewing entry ends 21:00. |
| Museum, November 29, 2026: Genji exhibition | Event hours/prices apply, rather than collection rates. |
| Museum, December 1, 2026: garden-only period | Galleries are unavailable; garden hours/prices apply. |

The existing text model is retained. No shared helper/type, opening calendar or new period selector is introduced. No field-wide `validThrough` or `applicablePeriods` is added to these mixed normal/event/garden notes: doing so would misrepresent the whole field as one event. The existing booking periods, October 30 booking review dates and booking expiry dates remain unchanged. Event-specific operating detail still needs follow-up when the named exhibition ends; the Museum's existing November 29 booking review is an appropriate joint follow-up opportunity, even though these three fields' ordinary 30-day review dates now fall on December 3.

Kiyomizu ordinary admission/ordinary booking and the four Fushimi Inari operational fields remain Unknown where previously unverified. No new evidence for those claims is inferred from these three checks. `visit-access.json` does not need a change.

## Five pending-source retrievals

Each exact pending URL received one bounded primary-page-reader request on November 3. The observations below describe that retrieval path, not proven origin-server health or a fact review. No replacement URL was guessed and no associated field date was renewed.

| Original source | November 3 reader observation | Remaining state |
| --- | --- | --- |
| [Makishi market guide](https://www.makishi-public-market.jp/about/guide/) | Timeout; reader wrapper labelled the failure 400. This is not evidence that the origin returned HTTP 400. | Retrieval/manual review Pending. |
| [Tohoku attraction](https://www.tohokukanko.jp/en/attractions/detail_1785.html) | 503 Service Unavailable. | Retrieval/manual review Pending. |
| [Nagoya Castle visitor source](https://db.nagoya-info.jp/en/spot/detail/1/) | 502 Bad Gateway. | Retrieval/manual review Pending. |
| [Hokkaido University Museum visit](https://www.museum.hokudai.ac.jp/english/visit/) | 502 Bad Gateway. | Retrieval/manual review Pending. |
| [Kansai Airport rail access](https://www.kansai-airport.or.jp/en/access/from-airport/train) | 403 Forbidden. | Retrieval/manual review Pending. |

All five remain unresolved through this path. A blocked/failed retrieval is different from an Unknown visitor fact or a confirmed broken public page. Human ownership remains Unassigned; the repository owner must assign an actual reviewer/follow-up. The two JR East pages readable in the November 2 report are outside this five-source follow-up and are not newly renewed here.

## Integration and acceptance

`tests/planning-clarity.spec.ts` contains old Museum hours-source date expectations (October 26) that legitimately become November 3; the Kiyomizu entrance date expectation stays October 26. Existing booking/applicability and offline snapshot tests keep their original contracts. QA should check the ordinary/event examples, scope distinctions, field-specific dates, three-language parity and retention of all unrelated records/metadata. No test, build, server or Git operation was run by this content workstream.

Independent native-language review, novice comprehension, physical approaches and real-device handoffs remain **Not Run**. This source research does not close the maintenance queue or establish live operating availability for an arbitrary future visit.
