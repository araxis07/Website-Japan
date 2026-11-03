# Japanese visual identity — 3 November 2026

The redesign uses a travel-journal composition: real photography, ivory paper, indigo ink, vermilion accents and Japanese vertical lettering. The original sun, mountain and winding-path mark replaces the old character stamp in navigation, the footer and application icons. It is independent site branding, not an official emblem.

## What changed

- The homepage opens with a Kyoto photograph and three chapter links. First-visit, exploration and travel-day shortcuts remain directly below it.
- A visible cultural chapter introduces Nara's temples and shrines, Kanazawa's gardens and craft neighborhoods, and Naha's local culture. All three stories link to existing guides and are written in Japanese, English and Thai. Existing image credits remain on `/credits`.
- The interactive miniature has its own chapter. Timber details, lantern ribs, an indigo base and regional bridge colors refine the existing scene. Kyoto's visible pagoda links to the Kiyomizu temple guide; torii gates link to Fushimi Inari. The new still preview is a transparent render of the same scene.
- Shared colors, headings, photo frames, cards, guide navigation, planner days and the footer carry the identity across route families. The existing search, map, trip storage, privacy and export contracts remain in place.
- Pointer tilt extends to the cover and cultural photographs. Touch input does not activate tilt; both the user's Pause setting and reduced-motion preference disable it. Three.js still loads only on request and retains offscreen/background suspension, frame/DPR limits and cleanup.

No dependency, remote font, tracking service, account or backend was added. The eager hero uses a static image import so Next's development image registry distinguishes it from lazy thumbnails of the same photograph.

## Content basis

The cultural summaries reuse the guide data and do not add opening hours, prices or historical dates. Their scope was checked against the [official Nara guide](https://www.visitnara.jp/venues/A00487/), [Kanazawa tourism guide](https://visitkanazawa.jp/en/itineraries/detail_3.html) and [Okinawa museum's permanent exhibition description](https://okimu.jp/sp/en/museum/permanent/). The museum's desktop website returned a maintenance notice during review; this does not establish venue opening status. Existing factual review timestamps were not refreshed by the redesign.

## Verification

- Production build: 182 static pages; TypeScript and ESLint pass.
- Focused integration checks: 109 passed and one existing skip across Chromium, mobile WebKit and Firefox. New tests cover the homepage's three languages in both themes, chapter links and motion preferences; existing tests cover 3D, fallback, planning and narrow controls.
- Full local production suite: 528 passed, two existing skips, no failures. Additional homepage checks at 320px and 768px found no horizontal overflow in any of the three languages.
- Reviewed macOS visual references retain their original comparison thresholds. Linux references are reviewed separately using the quality workflow's actual screenshots.
- Linux review caught overlapping Japanese lettering in Chromium's vertical font fallback. Decorative labels now place each character in its own row with a Japanese font stack, including destination and map labels. Per-character text-range checks cover the homepage labels; raster screenshots are still reviewed separately.
- Typography follow-up: 56 focused regression checks pass across the three engines, including visual references, narrow layouts and text-range checks.
- The still preview decreased from 97,856 to 72,716 bytes. Local production inspection found no scene chunk request before activation; the scene and Three.js chunk transferred 137,472 gzip bytes after activation. This measures asset delivery, not frame rate or field Core Web Vitals.
- Credential-pattern, source-checker and deployment/CSP self-tests pass. Production dependency audit: zero reported vulnerabilities. The complete audit reports 16 moderate development-tool findings, with no high or critical findings; no forced dependency overrides were introduced.
- Fresh development loads in all three languages produced no React hydration or image-loading warnings. Chromium's software WebGL driver reported ReadPixels performance notices during scene inspection; these are not hardware performance measurements.

Physical mobile GPU/battery behavior, native screen readers, production hosting and customer usability acceptance are not verified by the local browser checks. The 3D landscapes remain illustrative miniatures, not geographic or architectural reconstructions.
