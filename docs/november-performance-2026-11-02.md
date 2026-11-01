# Home payload and search work — 2026-11-02

Measurements compare the production baseline at `07a89b7`, narrowed Home dictionary props (stage 1), localized Journey data (stage 2), and the final build including the search predicate. The lead completed stage 3 and integration after the Performance agent reached its usage limit. No dependencies, prefetch policy, recovery format or lazy loading were introduced.

## Transfer and navigation

Chromium 156.0.8078.4, 390×844, reduced motion, seven fresh contexts per route, no CPU/network throttle and blocked map tiles. Medians below are encoded HTML + all JavaScript + RSC + CSS body bytes through network idle, including automatic prefetch. Images, fonts, headers and later interaction downloads are excluded. These are local transfer measurements, not field Core Web Vitals.

| Route | Baseline | Final | Reduction |
| --- | ---: | ---: | ---: |
| `/en` | 382,180 | 367,151 | 15,029 |
| `/ja` | 391,114 | 373,928 | 17,186 |
| `/th` | 398,958 | 379,958 | 19,000 |
| `/en/about` | 365,956 | 352,447 | 13,509 |
| `/en/my-trip` | 363,437 | 349,927 | 13,510 |
| `/en/explore?scope=places&view=list` | 401,040 | 387,548 | 13,492 |

All-JS falls by 3,655 bytes on each measured route. English Home HTML is 33,993 → 32,604; RSC 67,288 → 57,305; CSS 19,958 → 19,956 bytes. The other final repeats were identical at these routes; Explore combined varies by one byte.

Stage 1 removed the last three full-dictionary client retainers: FeaturedDestinations, Journeys and SeasonalHighlights. Other Home dictionary consumers are Server Components or already pass subsets. Its measured whole-batch reduction was 10,193–16,927 bytes, but that build also included feedback, offline and Kyoto-copy changes. The entire delta cannot be attributed to dictionary narrowing, nor is one dictionary automatically counted as three downloaded copies.

Stage 2 changed only the Home/Journeys boundary relative to stage 1: the server sends all three tabs in the current language, with image, route, days and one derived start day used for display and ApplyPlan. The client no longer imports the multilingual Journey array. All-JS fell another 4,312 bytes; added HTML/RSC reduced the net gain to 2,092–3,316 bytes. This stage was retained after that cost shift was counted.

About → Home navigation waited for the destination URL and exact visible localized hero heading. Seven-run medians/ranges were:

| Locale | Baseline median (range), ms | Final median (range), ms |
| --- | --- | --- |
| English | 109.5 (103.7–139.0) | 111.6 (104.9–139.0) |
| Japanese | 102.6 (98.0–115.6) | 100.2 (97.1–114.7) |
| Thai | 118.1 (102.4–121.3) | 119.4 (96.5–203.8) |

Medians remain close, with a wider Thai final range. These small local samples do not establish tail latency, a navigation speedup or an INP/LCP improvement. No Footer prefetch change from the rejected November 1 trial was restored.

## Search normalization

Explore memoizes the normalized query and skips assembling/normalizing search text when it is empty. Existing memo boundaries, province-keyword matching, aliases, filters and result ordering remain. Using a memoized normalized value also preserves the installed React Compiler's manual-memoization checks; no lint suppression was added.

An isolated Node 26.13.0 check executed the actual selector callbacks with server-derived data for all 47 prefectures. All 1,728 combinations across three locales, regions, queries, categories and information filters retained identical ordered place/prefecture IDs. Normalization calls per selection changed from 94 → 1 for an empty query, 302 → 1 for a hyphen-only query, 108 → 55 for `kyoto`, and 120 → 61 for the Thai Kyoto query. Real memo reuse may avoid the query call on other state changes.

For 100 selections per sample, nine samples after warmup, empty-query medians were 12.10–13.07 → 0.48–0.52 ms; hyphen-only 19.85–21.89 → 0.48–0.67 ms. Nonempty-query timings were mixed and one became slightly slower. Counts and batch CPU are not typing latency or React commits; no index, worker or cache layer was justified.

Mocked render-data checks also matched 75 Featured states, nine Journey tabs and 12 season states, including SavePlace/ApplyPlan inputs. These supplemental checks do not replace browser tests. Durable regression covers empty-normalized queries and aliases, and all localized Journey tabs/ApplyPlan/Undo with the browser set offline before their first use. Existing JSON/HTML/library offline checks remain.

Raw runs and instrumentation are in `/tmp/japan-nov2-performance` for this local session. Repository verification and external acceptance are recorded in the delivery ledger; no production-hosting or physical-device performance result is claimed.
