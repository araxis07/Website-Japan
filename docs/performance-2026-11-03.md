# Local performance evidence — 2026-11-03

Baseline: `21507dc`. Comparison: this delivery, including coordinated browser writes and pending drafts. Chromium 156, 390×844 viewport, reduced motion, no CPU/network throttling, three samples per fixture. CDP instrumentation adds overhead. These are local lab measurements, not field INP/LCP or physical-device acceptance. Raw scripts, profiles and samples are retained locally in `/tmp/japan-nov3-performance/`.

## Trip editing

Twenty native key events, with final text checked after persistence. The large fixture has 60 repeated visits and 30 day notes of 1,000 Thai characters (186,077 UTF-8 bytes).

| Fixture / measurement | Baseline median (range), ms | Current median (range), ms |
| --- | --- | --- |
| Empty trip, scripting | 16.293 (16.272–17.252) | 20.757 (17.298–21.462) |
| Empty trip, wall time | 29.083 (28.948–41.712) | 60.738 (60.532–69.099) |
| Large trip, scripting | 138.622 (137.119–139.549) | 157.596 (150.741–161.701) |
| Large trip, wall time | 166.753 (164.198–170.055) | 227.191 (213.525–301.869) |

Large-fixture serialization median falls from 13.3 to 6.7ms; parsing is 2.8 to 3.0ms. Baseline performs 20 mirror writes/digests; current samples perform 1–3 as superseded queued edits are cancelled. Despite fewer commits, total scripting and elapsed time increase because draft retention, locking and consistency checkpoints add work. This is a correctness trade-off, not a claimed speedup. Asynchronous digest calls themselves cost mostly 0–0.2ms; profiles did not justify a new hashing implementation or dependency.

## First-use scene and map

Cold means a new browser context; warm means a second navigation in the same context. Both sides use the same manual scroll/reset protocol. Server image-transform cache state is uncontrolled. Map tiles were blocked to isolate component work: marker readiness does not establish live tile readiness.

| Context / DPR | Start 3D ready, baseline → current median ms | Map markers ready, baseline → current median ms |
| --- | --- | --- |
| Cold / 1 | 680.638 → 723.746 | 98.913 → 98.820 |
| Cold / 3 | 554.502 → 589.328 | 101.010 → 106.006 |
| Warm / 1 | 513.443 → 560.132 | 95.567 → 101.031 |
| Warm / 3 | 509.746 → 576.514 | 101.554 → 98.182 |

All scene samples reported WebGL2 and ready. Current cold scene ranges are 517.324–754.909ms at DPR1 and 585.125–591.886ms at DPR3; cold map ranges are 95.888–110.716ms and 98.752–239.030ms respectively. Three samples do not establish tail latency or a field improvement.

Cold initial image encoded bytes are unchanged: 90,356 at DPR1 and 247,926 at DPR3. Additional scene JavaScript is unchanged at 137,323 encoded bytes, map JavaScript at 42,631. Warm wire transfer for these resources is zero; cached encoded bodies are still nonzero. Warm navigation may select additional cached below-fold images, so total body sizes do not imply identical asset sets. Geometry, render engine, prefetch and image-loading policies are unchanged.

Baseline map filtering (four events) uses a median 15.273ms scripting with 21 marker additions/removals; four zoom events use 10.952ms with 76 additions/removals. This evidence does not justify a new marker cache, search worker or map dependency. Revisit with physical-phone or field evidence showing a user-visible bottleneck.
