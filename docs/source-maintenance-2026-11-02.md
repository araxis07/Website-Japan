# Source-link coverage — 2026-11-02

The existing checker now collects 221 unique HTTPS URLs from seven files, adding city guides, prefectures and first-visit emergency help to venue, arrival and notice sources. Each result carries all originating files/categories while duplicate URLs are fetched once. The four-request concurrency and 12-second timeout remain; normal checks are still scheduled/manual. A network-free self-test now runs on every quality workflow.

The November 2 local run completed all 221 URLs: 214 returned successful HTTP responses and seven were flagged below. An HTTP success is reachability evidence only. It does not verify the text, renew review dates or close any of the existing 73 venue-field review entries. No source URL, visitor fact or review date was changed to make the report pass.

| Source | CLI observation | Follow-up observation / state |
| --- | --- | --- |
| [Makishi market guide](https://www.makishi-public-market.jp/about/guide/) | 503 | Primary-page fetch also returned 503; manual review Pending. |
| [Tohoku attraction](https://www.tohokukanko.jp/en/attractions/detail_1785.html) | 503 | Primary-page fetch also returned 503; manual review Pending. |
| [Nagoya Castle visitor source](https://db.nagoya-info.jp/en/spot/detail/1/) | Timeout | Primary-page fetch returned 502; manual review Pending. |
| [Hokkaido University Museum visit](https://www.museum.hokudai.ac.jp/english/visit/) | Timeout | Primary-page fetch also timed out; manual review Pending. |
| [Kansai Airport rail access](https://www.kansai-airport.or.jp/en/access/from-airport/train) | 403 | Primary-page fetch also returned 403; manual review Pending. |
| [JR East Narita Express](https://www.jreast.co.jp/en/multi/nex/) | 403 | Official page was readable through the web reader on November 2; keep the URL. CLI denial remains in the raw report. |
| [JR East tunnel notice](https://www.jreast.co.jp/en/yokosuka-tunnel-koji/) | 403 | Official page was readable through the web reader on November 2; keep the URL. CLI denial remains in the raw report. |

The seven flags are not seven confirmed broken links. Human ownership remains Unassigned; the existing editorial triage process should assign reviewers for the five still-unretrieved sources and investigate CLI restrictions separately. The two readable pages do not constitute factual or native-language acceptance of their associated guidance.

`node scripts/check-links.mjs --self-test` checks cross-file deduplication, category/file provenance, coverage of all configured inputs and HTTPS URL validity without network access. The live report remains `test-results/source-links.json`; a local preserved copy is `/tmp/japan-november-02-work/source-links.json`. Future scheduled reports continue to distinguish HTTP/network failure from factual review. No CMS, monitoring service, new account, external message or production change was introduced.
