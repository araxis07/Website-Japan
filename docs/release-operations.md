# Release operations and editorial review

## Production setup

1. Use Node 24 and the committed lockfile (`npm ci`). Set `NEXT_PUBLIC_BASE_URL` to the real HTTPS origin before `npm run build`. Public environment values are compiled into the browser bundle; never put secrets in them. Leave the origin blank for local previews. Personal trip pages stay `noindex` and outside the sitemap.
2. Optionally set `NEXT_PUBLIC_CONTACT_URL` to an HTTPS support page. The About form copies a report locally; submitting to the linked destination is a separate user action. The repository issue form remains the default. Do not include personal itinerary data in a public issue.
3. For a licensed raster tile service, set all three `NEXT_PUBLIC_MAP_TILE_URL`, `NEXT_PUBLIC_MAP_CREDIT_NAME`, and `NEXT_PUBLIC_MAP_CREDIT_URL`. The template must contain `{z}`, `{x}`, `{y}`, use HTTPS, and have no embedded username/password. Its origin is added to CSP automatically; attribution is plain text with a validated link. Use only public browser tokens restricted by domain and provider quota. A service using subdomain templates needs a concrete tile host. No secret key may be exposed through this configuration.
4. Default tiles are OpenStreetMap's public service. Follow its [tile usage policy](https://operations.osmfoundation.org/policies/tiles/): visible attribution, normal browser caching, no bulk/offline download. Tests replace tiles. Select a provider with suitable traffic limits before promotion. Current maps use raster labels and a night CSS treatment; localized vector labels and a dedicated night basemap require a separate provider/design integration.
5. Run `npm run lint`, `npm run build`, `npm run typecheck`, `npm test`, and `npm audit --audit-level=high`. Install Playwright Chromium/WebKit when setting up a new machine. GitHub Actions runs these on pushes, PRs and weekly. Inspect the `quality-evidence` artifact: content-review JSON, traces and failed screenshots. A local pass is not evidence of a successful deployment.
6. At the deployed origin verify `/` redirects, HTTPS, cache behavior, image optimization, all three locales, canonical/hreflang, `robots.txt`, `sitemap.xml`, manifest, 404, map tiles and the contact link. Confirm no localhost/example origin appears in published metadata. Hosting may alter headers; inspect CSP, `nosniff`, frame denial and Referrer-Policy there. Enable HSTS at hosting only after all affected HTTPS hosts work.
7. Use the operator's monitoring accounts to check homepage, explorer and one guide at a modest interval; alert the owner on repeated HTTP failures. Check expired TLS, map quotas and client error logs. Collect only consented/minimized diagnostics, never local trip notes or backup files. Confirm retention/access controls before enabling telemetry. No monitoring account or alert recipient is configured by this repository.

## Content and translations

`tests/content-quality.spec.ts` produces a per-place maintenance queue. Missing fields and reviews older than 90 days are reported, not silently presented as current. Prioritize high-traffic venues, closures, accessibility, pricing and reservation changes. Schema checks cannot verify that a source remains factually current.

- Operator access, admission/calendar and booking pages are the primary sources. Update only facts actually checked and their field-specific source/date; retain different dates when one field has not been rechecked.
- All 104 mapped places have localized names and explicit categories. Seventeen currently have reviewed visit-detail records; the remaining 87 have explicit unknown operational fields. A reviewed record may still have missing fields. No page claims universal entrance/accessibility verification.
- Map coordinates are approximate venue/area references. An entrance photograph or description does not certify a precise entrance pin, step-free access or a usable route. Confirm the exact entrance with the operator before moving a pin or adding accessibility claims.
- Day groups, visit durations, regional seasonal advice, rainy-day substitutions and budgets are editorial planning aids. They are not live schedules, route times, bloom forecasts or quotes. Keep that distinction in every language.
- Match the same factual meaning in Japanese, English and Thai. Preserve Japanese place names/addresses for taxi, station and map use. Keep the stable ID unchanged; use the existing alias migration for renamed records.
- Photo changes need a verified subject, meaningful alt in all three languages, original source, named creator, license and local optimized file. Preserve share-alike licensing for adapted Commons photos.

| Meaning | English | 日本語 | ไทย |
| --- | --- | --- | --- |
| Regional division | Prefecture | 都道府県 | จังหวัด |
| Travel planning only | Suggested plan | おすすめプラン | แผนเที่ยวแนะนำ |
| Not verified | Check with the official source | 公式情報を確認 | ตรวจสอบกับแหล่งทางการ |
| Estimate, not quote | Estimated budget | 予算の目安 | งบประมาณโดยประมาณ |
| Public transport route | Transit directions | 公共交通機関の経路 | เส้นทางขนส่งสาธารณะ |
| Distance, not journey time | Straight-line distance | 直線距離 | ระยะทางเส้นตรง |
| Saved locally | Saved on this device | この端末に保存済み | บันทึกบนอุปกรณ์นี้แล้ว |
| Unscheduled visit | Unscheduled | 未設定 | ยังไม่จัดวัน |
| Accommodation check-out | Check-out day | チェックアウト日 | วันเช็กเอาต์ |

Native-speaker review should check tone, ambiguous station exits, transliteration and accessibility wording, not just dictionary-key parity. This glossary is an editorial reference, not evidence that a native reviewer has signed off.

## Accessibility, performance and regression checks

- Test keyboard access to the skip link, navigation, map/list controls, marker buttons, mobile dialog close/focus return, all trip inputs, backup preview and 3D topic controls. No essential information may require dragging the 3D model.
- Check 200% text/desktop zoom and a 320px reflow width. Test real screen-reader speech on VoiceOver and TalkBack; automated axe scans alone do not verify reading order or announcements.
- Honor reduced motion and global pause. Three.js loads only after activation, caps mobile pixel ratio/shadows/particles and pauses when offscreen. Recheck on a physical low-end Android and iPhone for input delay, thermal/battery cost and WebGL fallback. Emulators do not establish frame-rate budgets on hardware.
- Check first load and navigation separately. Use the [Core Web Vitals targets](https://web.dev/articles/vitals): field p75 LCP ≤2.5s, INP ≤200ms, CLS ≤0.1; these are release targets, not measured production results. Use field reports only after a real origin has sufficient traffic. Inspect before/after network requests to ensure maps and 3D remain deferred.
- Visual baselines cover desktop/mobile trip forms in both themes. Platform-specific baselines account for native controls/fonts. To update intentionally, run `npm test -- tests/visual.spec.ts --update-snapshots`, inspect every changed image, and commit the appropriate OS baselines. Never approve differences merely because a test failed.
- Security checks include bounded UTF-8 imports, known place IDs, stale-tab guards, failed-write recovery, escaped offline HTML and dependency audit. Production CSP excludes eval and inline event handlers, but Next's static output still uses inline scripts/styles. Moving to nonce CSP changes rendering/caching and needs a separate verified implementation. This release is not a penetration test.

## First-time visitor usability session

Recruit at least five people who have not used the site, including Thai and Japanese readers and mobile users. Use consented notes without collecting their actual bookings. Give tasks without explaining the interface:

1. Plan an arrival from the airport to a city base; explain which information still needs checking.
2. Find Gion using a name in their own language, open its map details and identify the difference between a venue pin and an entrance.
3. Add a Kyoto suggested plan starting on day 3; add a second visit to one place and remove only that visit.
4. Enter a hotel, two travelers, a budget, a reservation time and a note; reload and switch language.
5. Shorten the trip and recover the retained notes; export a private backup and a sanitized copy, then preview an import without losing the original.
6. Find emergency help without using the 3D model, then pause motion and switch to night mode.

Record completion, wrong turns, time, requests for help, misunderstood terms and whether the participant can explain what is saved/shared. Prioritize blocked tasks and data-loss misunderstandings over decoration. Retest the fixes with fresh participants. No participant sessions have been run as part of this workspace change.
