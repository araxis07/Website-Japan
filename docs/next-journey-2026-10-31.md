# Clearer discovery, Kyoto approaches and measured client loading — 2026-10-31

This batch follows `0695fca`. Four implementation/QA workstreams and an independent security reviewer contributed; the lead owns integration, measurements, shared configuration and release verification. No dependency, storage schema, place ID, map provider or production service changes are required.

## Visitor outcomes

- Header links close an open mobile menu on Next.js navigation, including the brand, task links, trip link and locale navigation. Escape still returns focus; modified clicks retain normal browser behavior.
- Explore uses the existing place-guide label for a venue and the existing prefecture-guide label for a prefecture, in both preview and mobile sheet. The live status puts the current result unit first while retaining the secondary count.
- Unscheduled visits show their existing day selector beside a visible label. Scheduled visits retain it inside the visit editor. There is one selector per visit; the snapshot check, repeated-visit identity, rejected drafts, failed-write behavior, Undo and destination focus remain intact.
- A stable button/container disclosure replaces the outer controlled native details wrapper for pristine plans. The editor stays mounted. The button exposes `aria-expanded` and `aria-controls`; plans with metadata or drafts stay open. In the bundled mobile WebKit, the old open details/hidden-summary combination intermittently returned false from native `checkVisibility()` despite positive geometry and visible ancestors. A diagnostic replacement of only that wrapper changed the native result to true with the same geometry. The shipped fix avoids remounts, forced visibility and browser-specific CSS.
- Checklist labels are supplied by the server for the current language. Emergency help has one authoritative record shared by the guide, text download and offline HTML exporter. It stays eagerly available before the first offline interaction.
- Calendar controls are an eagerly imported component with local note-opt-in state. The library/FX state, error reporting, calendar anchor, counts, privacy defaults, disabled conditions and ICS implementation stay intact.

## Kyoto source research

Seven existing fields were checked against venue, railway or city sources. The [research ledger](kyoto-approach-2026-10-31.md) records each source and limit. The changes clarify Kiyomizu's two accepted approaches, Gion's district context, the Museum's West-Gate/South-Gate distinction and Fushimi's separate JR/Keihan stations. Source review dates move only for the fields actually checked. Record dates, event booking expiry and the four unsupported Fushimi fields are preserved.

Coverage remains 104 access notes, 16 entrance notes, 30 hours notes, 27 admission notes, 13 booking notes and 22 accessibility notes across 104 canonical places. These are published notes with varying scope, not a count of complete or continuously accessible routes. The [review queue](content-review-2026-10-31.md) remains 73 fields / 32 places; its 40 grouped rows reflect the one limited admission-policy recheck moving to November 30. Source research is recorded separately from Pending human/native review and ordinary-price follow-up.

## Performance evidence

Production before/after measurements used Chromium 156.0.8078.4, 390×844, reduced motion, three fresh contexts per route, no CPU/network throttling and blocked map tiles. Values are median encoded body bytes through network idle. Initial JS comes from response script URLs; all JS includes navigation prefetch. Images, fonts, headers and later interaction downloads are excluded. These are local transfer measurements, not field LCP/INP results.

| Route | Initial JS: before → after | All JS: before → after |
| --- | ---: | ---: |
| `/en` | 187,184 → 187,200 | 266,939 → 259,003 |
| `/en/explore?scope=places&view=list` | 213,076 → 213,775 | 277,860 → 269,924 |
| `/en/my-trip` | 198,628 → 194,395 | 266,939 → 259,003 |
| `/en/first-visit` | 177,706 → 173,330 | 266,939 → 259,003 |
| `/en/about` | 171,030 → 171,044 | 268,084 → 260,148 |
| `/en/credits` | 169,885 → 169,899 | 266,939 → 259,003 |

All-JS transfer falls by **7,936 bytes** per measured route. HTML/RSC cost shifting is included in the decision: My Trip HTML changes 14,949 → 14,952 bytes and prefetched RSC 66,526 → 66,611; First Visit HTML changes 25,226 → 25,248. CSS changes 19,923 → 19,931 bytes. Combined HTML+all-JS+RSC+CSS falls **7,821–7,843 bytes** across these six routes. Initial Explore grows 699 bytes alongside the clearer visitor information; the batch does not claim every initial bundle shrinks.

Chrome precise-coverage function executions after ten actions:

| Component / action | Before | After |
| --- | ---: | ---: |
| JapanDiorama preview / Save–Remove | 10 | 0 |
| JapanDiorama active WebGL / Save–Remove | 10 | 0 |
| EmergencyCard / checklist changes | 10 | 0 |
| TripExtras / calendar note toggles | 10 | 0 |

The active-scene test also retains the same canvas element. These counts are component function executions, not React commits or interaction-latency percentages. Save controls and the checklist keep their necessary live trip subscriptions.

Supplemental parity checks compare all six original guide records, 30 full/public HTML outputs including hostile text and repeated/personal visits, 12 checklist states / six writes, and the three emergency text downloads including source/date/filename/MIME. They match the original outputs. The existing first-offline JSON/HTML/library tests remain required.

## Bounded design experiments

A temporary browser-only compact-header prototype reduced the mobile header minimum by 6px and vertical padding by 2px. Across English/Japanese/Thai at 320, 390 and 430px, it recovered 6px without width overflow. Fully visible main-content actions were unchanged in eight of nine samples; Japanese at 320px gained one. This small viewport result does not establish novice or native-control improvement, so no header CSS change ships. The three task shortcuts and current touch sizing remain.

Navigation prefetch remains unchanged. Initial-versus-prefetched byte differences are recorded above, but they do not establish wasted transfer or justify moving that cost to the first click. No generated identity registry, blanket CSS deletion, new language, extra 3D library, account/backend or lazy recovery path is introduced.

## Security review and remaining dependency finding

- Production dependency audit (`npm audit --omit=dev`): **zero reported vulnerabilities**. The full audit has **zero High/Critical** and **16 Moderate affected dependency entries** associated with the minimatch advisory through the development lint-tool chain. The existing high-severity CI gate remains unchanged; a successful gate is not a zero-findings report.
- [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) lists minimatch versions below 11.0.1. The [upstream advisory](https://github.com/isaacs/minimatch/security/advisories/GHSA-g3hv-75wg-m249) describes attacker-controlled glob amplification with optimization level at least two. Installed minimatch 10.2.6 defaults to level one; the inspected TypeScript-ESLint call supplies `dot: true`, not that optimization setting. This review did not identify a triggering application path, and does not close the advisory.
- Installed development callers request major versions 3 or 10. A forced major-11 override or npm's suggested framework/linter downgrade has no verified compatibility here. The finding remains open for an upstream compatible update; do not import untrusted lint configuration/glob patterns. Dependencies and lockfile are unchanged.
- Review of the changed export/help boundary retains HTML escaping, exported-document CSP and existing HTTPS-only personal-link validation. No new external submission, credential, account, permission or private-trip telemetry is added.
- Credential-pattern scan, whitespace checks and deployment-checker self-test pass. This is scoped source/dependency and regression verification, not a penetration-test claim.

## Verification and external acceptance

Production build generates 182 static pages; TypeScript and ESLint pass. Targeted checks cover three-language navigation, map/list scope, visible assignment, repeated visits, failed writes/drafts, checklist semantics, offline help and existing calendar/recovery behavior. The pristine editor also opens with Enter and retains the focused note when it becomes a non-pristine plan. Native select tests reach the row, verify visibility and accessible name, and retain all focus, data and recovery assertions. Temporary diagnostic hooks were removed; no retries or visibility overrides were added.

The final targeted run passed 48 cases across Chromium, mobile WebKit and Firefox. Two macOS Japanese-search references were visually reviewed for the intentional primary-result-unit change and passed their targeted rerun. Other visual references stayed unchanged. A final local full run passed 102 cases without failures before it was deliberately stopped under host resource contention (three interrupted, 269 Not Run); it is not reported as a completed full suite. Linux CI supplies the complete release regression, with its platform references independently reviewed where needed. Screenshot thresholds, test timeouts and CI worker settings remain unchanged.

Novice participants, independent native-language review, physical walking/accessible approaches, actual iPhone/Android Files workflows, VoiceOver/TalkBack, calendar clients and confirmed live-production/rollback checks remain **Not Run** in [visitor acceptance](visitor-acceptance.md). The repository's homepage field is empty; no live origin or hosting state is inferred from that. Existing deployment tooling is retained for the operator-confirmed origin. The user's original `next-env.d.ts` development references remain outside this commit.
