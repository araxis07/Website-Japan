# International languages — 8 November 2026

The guide now supports Japanese, English, Thai, Korean, Simplified Chinese (`zh-CN`), Vietnamese, French and Spanish. Traditional Chinese is not included in this release.

## Scope

- Complete interface dictionaries, including privacy, import/export, errors, emergency links and accessibility labels.
- Destination and prefecture guides, region/season planning, first-visit and arrival guidance, local itineraries, notices, venue access information and photo descriptions.
- Locale routes, language switching with query/hash preservation, localized manifests, schema names, Open Graph locales and hreflang/sitemap entries.
- Korean and Chinese numbered-day labels follow local word order. The language menu scrolls on smaller screens.

Public place IDs, coordinates, URLs, original-language text and factual review dates are preserved. Translation does not mean the underlying travel information has been checked again. Official Japanese names and addresses remain available for reliable map searches.

## Translation review

Five separate language workstreams translated the interface and checked key/type/array/placeholder parity. Data workstreams expanded the public guide records. Some venue/prefecture text used machine-assisted drafts followed by model review; there is no runtime translation service or new dependency. A second Korean review and targeted Spanish/Vietnamese checks corrected ambiguous transit, accessibility and safety wording. The dictionary and culture-story Chinese copy received a separate model review; a full second Chinese venue review did not finish before the agent usage limit.

This is not native-speaker editorial certification. Before a commercial launch, native-language reviewers should check the complete guides, particularly emergency instructions, accessibility limitations and proper names. Browser file/date controls and third-party map/source pages use their own language settings.

## Verification

The international test covers dictionary structure, placeholders and preserved URLs, localized-record completeness, routes for every page type, both themes, narrow/desktop layouts, browser errors and language-switch query preservation. Existing content checks now iterate over all eight locales. Production build generated 477 pages; TypeScript and ESLint passed. The eight-locale data check confirmed existing English/Japanese/Thai values were preserved across the audited data files. All 18 international browser cases passed across Chromium, WebKit and Firefox (eight page types, two themes, 320/1440px). Visual samples of all five new My Trip pages at 390px were reviewed.

The combined focused regression run completed with 124 passed, two existing skips and four failures: the two browser variants of a changed 404 link label and a test that incorrectly still expected `/fr` to return 404. The original return-link labels were restored and the unsupported-locale test now uses `/zz`; the final targeted rerun passed all 22 cases, including the corrected 404/unsupported-locale tests and the international matrix.

Fresh security checks: production dependency audit reported zero vulnerabilities; the full audit retained eight Moderate development-tool findings, with no High/Critical findings. Secret-pattern check, CSP-checker self-test, source-link-checker self-test and diff checks passed. No new dependency, runtime translation API or external credential was introduced. Full CI runs after the push; physical-device and native-editorial acceptance are not covered by these automated results.

## Follow-up — 9 November 2026

A second Chinese model review subsequently covered all 223 venue pairs and corrected 79 values. Targeted French and Spanish wording corrections were also applied. These are model reviews, not native-speaker certification. Four Chinese prefecture summaries were clarified without weakening the content assertions. The failed full CI run exposed cross-field search matching and system-font count overflow, addressed in the next stabilization release.
