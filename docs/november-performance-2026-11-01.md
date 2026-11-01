# November performance experiments — 2026-11-01

This work follows the retained [October 31 measurements](next-journey-2026-10-31.md). It changes no trip schema, validation boundary, recovery format, dependency or production service.

## Draft no-op writes

`writeDraft` now skips persistence and notification when the serialized draft snapshot is unchanged. A pending-persistence flag retains retries after a failed `sessionStorage.setItem`, including an identical draft or an absent-field clear following a failed clear. Changed values still notify subscribers; existing in-memory fallback and beforeunload protection remain.

An isolated Chromium 156.0.8078.4 page used real sessionStorage and the actual TypeScript source transpiled in memory, with no application server or artificial storage delay. Each case ran 1,000 repeated calls; these are medians of nine samples after one warmup.

| Unchanged operation | Before batch time | After batch time |
| --- | ---: | ---: |
| Clear an absent field, empty drafts | 3.2 ms | 0.1 ms |
| Clear an absent field, 60 existing drafts | 25.0 ms | 14.3 ms |
| Write an identical existing draft | 3.3 ms | 0.4 ms |

Each batch changes from 1,000 setItem calls and notifications to zero. Those counts are API calls, not physical disk writes or React commits. Batch CPU timings are not typing latency or INP. The 60-draft case still pays for parsing and serialization; no broader store rewrite is justified by this experiment.

Twenty-two baseline/candidate assertions cover failed writes and clears, identical retries, retry through an absent-field clear, distinct fields, module reload from the persisted session and unavailable-storage fallback/recovery. They pass. Core trip validation, expected snapshots, grouped Undo and first-offline JSON/HTML/library behavior remain integration requirements.

## Footer prefetch trial

On the existing production baseline, Chromium at 390×844 with reduced motion visited `/en/about`, kept the header language picker closed, then scrolled to the footer. Across seven fresh contexts, the two alternate-language footer home links initiated six RSC responses totaling 70,428 encoded body bytes: 33,731 for `/ja` and 36,697 for `/th`. They added no JavaScript requests at that stage. The full footer stage, including other links, fetched 79,086 RSC bytes in 11 requests.

Clicking the prefetched Japanese link reached a visible heading in a median 81.1 ms, range 74.6–101.9 ms. This is a local navigation measurement, not INP. It is not evidence that the prefetch traffic is wasted.

The temporary candidate disabled prefetch only for the two footer links to other languages; the current-language link retained automatic prefetch. Seven fresh treatment contexts made zero alternate-language requests before the click. Footer-stage RSC fell from 79,086 to 8,659 bytes, while the first Japanese click then fetched 22,670 RSC bytes instead of a baseline median of zero. Neither footer stage added JavaScript requests.

| Measurement | Baseline | Candidate |
| --- | ---: | ---: |
| Click to destination URL and visible h1, median | 81.1 ms | 100.3 ms |
| Observed timing range | 74.6–101.9 ms | 87.2–155.3 ms |
| RSC through initial load, footer and click, median | 145,697 bytes | 98,427 bytes |
| JS through the same sequence | 260,148 bytes | 261,991 bytes |

The treatment build also contained date, approach, daily-shortcut and CSS changes, so its shared payload totals and timing differences cannot be attributed solely to the footer property. The request family was removed from the pre-click stage, but part of the cost moved to navigation and the observed median was higher. Despite overlapping ranges, this evidence does not establish the required absence of a material navigation regression. The candidate was rejected and the original Footer prefetch behavior restored. No footer transfer reduction ships, and no blanket prefetch disable was introduced.

The lead retained the existing TripDirections CSS ownership after inventory. A component-module move had no measured visitor/runtime benefit sufficient to justify a wider cascade change.

Instrumentation and raw evidence are under `/tmp/japan-november-performance` for this local session. Targeted ESLint and the isolated draft checks pass; repository integration checks remain with the lead. The final build must use the restored Footer source. No field LCP/INP or production-hosting result is claimed.
