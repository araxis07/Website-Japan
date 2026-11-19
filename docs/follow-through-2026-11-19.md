# Focused follow-through — 19 November 2026

Four specialist scopes covered Explore UX, primary-source maintenance, CI and security/QA. The lead integrated changes and fixed a layout shift discovered during verification. The site remains local-first with eight locales and 477 static pages.

## Changes

- Explore renders a neutral accessible progress indicator until its browser URL snapshot is ready. It no longer presents default prefecture/map results for a place/list deep link before hydration. Static metadata and all 47 no-JavaScript guide links remain. Existing speculative-prefetch guards remain unchanged.
- A slow-network diagnostic exposed a footer shift when the short progress indicator became results. The loading area now reserves one viewport of height, keeping the footer below the fold. The delayed-JavaScript regression checks that condition and the eventual Gion/list state without filtering page errors.
- [Seven operational fields](source-review-2026-11-19.md) were checked against primary sources. Existing wording in all eight locales agrees; only those fields' provenance changes. The cadence queue through December 3 falls from 75 to 68 fields. Seasonal expiry remains independent: Kyoto Museum booking expires November 30; Kiyomizu booking expires December 1.
- CI builds once and transfers its production build to two complete-suite shards. Both shard artifacts retain browser/content evidence; `quality-evidence-verify` retains scheduled/manual source-link reports even when later build gates fail; `quality-complete` requires successful static gates and both shards. This introduces extra runner setup/artifact transfer, so no runtime or cost saving is claimed before actual CI results. Maintainers should require `quality-complete` in branch protection; repository settings were not changed.
- [Release operations](release-operations.md) now consistently refer to eight locales, moderate-level audit enforcement and the generated current content report. Dated review ledgers remain historical snapshots.

## Verification

Passed locally: production build (477 static pages), typecheck, full lint, credential-pattern scan, full and production-only dependency audits (zero findings), and both checker self-tests. The current 822-case test inventory divides into two disjoint 411-case shards with an exact complete union.

A single diagnostic Chromium run at 390×844, reduced motion, 4× CPU slowdown and 150ms/200,000 B/s simulated download observed a 0.4277 footer layout-shift entry before height reservation; the corresponding after run observed no layout-shift entries or overflow. These were diagnostic samples with concurrent QA, not controlled benchmarks, physical-phone results or field p75.

The integrated focused browser suite passed **294 cases with one existing skip** across Chromium, WebKit and Firefox (4.1 minutes): Explore payload/hydration, content quality, planning clarity, November next steps, international coverage and travel/no-JavaScript regressions. The pushed commit's Website quality checks are the authority for the full Linux regression and artifact handoff.

## Linux runner follow-up

The first CI attempt passed shard 1 (411 tests, 7.6 minutes), while shard 2 timed out before any tests during system-package installation: its Ubuntu mirror download took 7 minutes 31 seconds for 126 MB. A 12-minute allowance also timed out downloading packages from the same regional mirror. A subsequent official-container trial completed setup but changed screenshot rendering and Firefox home-directory ownership; it was withdrawn without altering baselines or assertions. The final jobs retain native Ubuntu 24.04 and its original 8-minute installer limit. They use the runner's existing `/etc/apt/apt-mirrors.txt` mechanism with Ubuntu's official HTTPS archive/security mirrors, preserving signed repository verification while avoiding the observed slow EC2 mirror. See the [runner image's mirror configuration](https://github.com/actions/runner-images/blob/main/images/ubuntu/scripts/build/configure-apt-sources.sh). The 35-minute job limit, browser-test timeouts, assertions and full suite remain unchanged. The latest commit checks remain authoritative for both shards and the aggregate gate.

## External acceptance

Use the existing [visitor acceptance worksheet](visitor-acceptance.md#session-worksheet--17-november-2026). Native reviewers, novice participants, physical iPhone/Android recovery, VoiceOver/TalkBack, calendar-client interoperability, on-site route checks and deployed HTTPS/rollback acceptance remain **Not Run**. No production origin, tunnel, account system, analytics service or infrastructure was created. Existing unknown visitor facts remain unknown; source research does not certify an accessible route.
