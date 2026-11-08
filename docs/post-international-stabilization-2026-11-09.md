# Eight-language stabilization — 9 November 2026

Scope: close failures in CI run 42482037394 at c044b70, improve multilingual navigation and measured Explore loading, and review core route wording. Preserve the Japanese visual identity, storage format, private trip data and place IDs.

## Changes and evidence

- Search previously concatenated localized names before removing spaces. Repeated Tokyo names could consequently match Kyoto across field boundaries. Locale/name fields now retain separators; tests assert the Kyoto prefecture result and Tokyo venue discovery.
- Explore result counts inherited `white-space: nowrap`. Longer French/Spanish text overflowed at 320px with Linux/wider fonts. Counts now wrap naturally; font-stress tests retain the document overflow assertion.
- Language choices have 44px minimum height. Expanded mobile navigation has its own viewport-relative scroll area. Eight-locale keyboard, narrow/landscape/reflow and axe tests exercise reachability and focus. Firefox geometry is compared at three decimal places to avoid treating 43.999992px as a real sub-44px control.
- Four Chinese prefecture summaries were clarified while retaining the existing content assertions. A second Chinese venue review covered 223 pairs and fixed 79 localized values. Targeted French/Spanish grammar corrections preserve the source facts; these are model reviews, not native-editorial certification.
- Official-source research for four core venues is recorded in [wayfinding review](wayfinding-review-2026-11-09.md). Kiyomizu's approach note includes the operator's gravel/slope caution. Tokyo National Museum has a source-linked station-approach note distinguishing the two JR approaches, in all eight languages. No gate coordinate, live elevator state or complete step-free route is certified. Unchecked hours/admission/booking dates were not refreshed.
- The deployment checker now verifies all eight locales, language/canonical/hreflang metadata, private planner robots and manifests/sitemap. The stricter checks are supported by negative and positive self-tests.

## Measured loading

Same-machine generated production artifacts, before build `ywUjVF42nQLwDxhsc5hzT` and after `k0Um3A1N3IfKYQlS3ZD-b`. Sum unique initial scripts and gzip each asset separately; HTML includes inline RSC, so do not add the separate RSC payload again. Dynamic map/3D chunks, headers and timing are excluded.

| Explore | Before gzip bytes | After gzip bytes | Difference |
| --- | ---: | ---: | ---: |
| Initial JavaScript | 349,123 | 238,600 | −110,523 (31.66%) |
| HTML | 44,212 | 49,727 | +5,515 |
| HTML + initial JavaScript | 393,335 | 288,327 | −105,008 (26.70%) |

Explore now receives three availability flags and only the current-language approach text, preserving filters and map-preview information without importing all venue details into the client. Home initial JS is unchanged (244,526 gzip bytes). Trip JS changed from 378,162 to 379,339 gzip bytes alongside copy changes; no Trip reduction is claimed. HTTP checks at local port 3105 returned 200. Transfer size is not a Core Web Vitals, latency or physical-device benchmark.

## Verification and limits

The initial targeted run passed 111 cases with one Firefox geometry precision failure; rounding the measurement to three decimals preserves the 44px acceptance threshold. Full regression, build/type/lint, security and final CI evidence follow in delivery checks.

Fresh dependency audit: production zero vulnerabilities; full audit eight Moderate development-tool findings, zero High/Critical. No compatible patched minimatch 10 release was available during review; a forced Next lint downgrade or unrelated major override was not applied. Credential-pattern, source-link-checker and expanded deployment-checker self-tests passed. Self-tests do not establish live external-link availability or effective hosting headers.

Native-speaker acceptance, five novice participants, VoiceOver/TalkBack, physical iPhone/Android Files/Downloads, real calendar clients and deployment/rollback acceptance remain Not Run in [visitor acceptance](visitor-acceptance.md). A confirmed public origin has not been supplied; no production change was performed. Traditional Chinese, additional 3D scenes, cloud accounts and AI chat are outside this stabilization scope.

## Follow-up to Linux CI 42502709047

The local full run passed 632 tests with two existing skips. Linux CI then passed 629 with two skips and exposed three failures: French Credits overflow on two engines, plus a WebKit two-tab test that clicked Gion while its save control was still disabled. Trace snapshots confirmed the latter was before storage initialization completed; visibility alone did not establish readiness.

Credits headings now use language-aware hyphenation with an emergency word-wrap fallback. A wider-font 320px heading test checks both element and document overflow without hiding content. The two-tab test explicitly waits for both controls to be enabled before scheduling the same native concurrent clicks; click-result, conflict, saved-data and stale-Undo assertions remain intact. The final UI/international rerun passed 45 cases across Chromium, WebKit and Firefox. The two-tab stress run passed all 30 repetitions across three engines (150 rounds of paired native saves), with the original result and data-integrity assertions retained.

## Live source-link availability

A separate live run checked 224 URLs and flagged six for review. This is reachability evidence only and did not refresh factual review dates or replace source URLs.

| Source | Observed result / follow-up |
| --- | --- |
| Makishi Public Market `/about/guide/` | 503 in checker and separate retrieval; operator availability needs follow-up. |
| Nagoya tourism database `/en/spot/detail/1/` | Checker timeout; separate retrieval 502. |
| Hokkaido University Museum `/english/visit/` | Retrieval timed out; no claim that its facts changed. |
| Kansai Airport `/en/access/from-airport/train` | 403 in checker and separate retrieval; may be automated-client blocking. |
| JR East `/en/multi/nex/` | Checker 403; separate retrieval succeeded, so it is not established as a broken link. |
| JR East `/en/yokosuka-tunnel-koji/` | Checker 403; separate retrieval 404. Its notice expired on 8 November and is hidden by the existing expiry logic; the historical source was retained instead of substituting unrelated evidence. |
