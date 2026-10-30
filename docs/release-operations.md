# Release operations and editorial review

## Production setup

1. Use Node 24 and the committed lockfile (`npm ci`). Set `NEXT_PUBLIC_BASE_URL` to the real HTTPS origin before `npm run build`. Public environment values are compiled into the browser bundle; never put secrets in them. Leave the origin blank for local previews. Personal trip pages stay `noindex` and outside the sitemap.
2. Optionally set `NEXT_PUBLIC_CONTACT_URL` to an HTTPS support page. The About form copies a report locally; submitting to the linked destination is a separate user action. The repository issue form remains the default. Do not include personal itinerary data in a public issue.
3. For a licensed raster tile service, set all three `NEXT_PUBLIC_MAP_TILE_URL`, `NEXT_PUBLIC_MAP_CREDIT_NAME`, and `NEXT_PUBLIC_MAP_CREDIT_URL`. The template must contain `{z}`, `{x}`, `{y}`, use HTTPS, and have no embedded username/password. Its origin is added to CSP automatically; attribution is plain text with a validated link. Use only public browser tokens restricted by domain and provider quota. A service using subdomain templates needs a concrete tile host. No secret key may be exposed through this configuration.
4. Default tiles are OpenStreetMap's public service. Follow its [tile usage policy](https://operations.osmfoundation.org/policies/tiles/): visible attribution, normal browser caching, no bulk/offline download. Tests replace tiles. Select a provider with suitable traffic limits before promotion. Current maps use raster labels and a night CSS treatment; localized vector labels and a dedicated night basemap require a separate provider/design integration.
5. Run `npm run lint`, `npm run build`, `npm run typecheck`, `npm test`, and `npm audit --audit-level=high`. Install Playwright Chromium/WebKit/Firefox when setting up a new machine. GitHub Actions runs these on pushes, PRs and weekly. Inspect the `quality-evidence` artifact: content-review JSON, traces and failed screenshots. A local pass is not evidence of a successful deployment.
6. At the deployed origin verify `/` redirects, HTTPS, cache behavior, image optimization, all three locales, canonical/hreflang, `robots.txt`, `sitemap.xml`, manifest, 404, map tiles and the contact link. Confirm no localhost/example origin appears in published metadata. Hosting may alter headers; inspect CSP, `nosniff`, frame denial and Referrer-Policy there. Enable HSTS at hosting only after all affected HTTPS hosts work.
7. Set the repository Actions variable `PRODUCTION_ORIGIN` to that same real HTTPS origin to enable `.github/workflows/deployment.yml`. It runs the existing read-only deployment checker daily and on manual dispatch, and retains its report for seven days. Without the variable, the job skips. Configure GitHub Actions failure notifications for the maintainer; this does not establish a staffed alert response. Check expired TLS, map quotas and client error logs through the operator's monitoring accounts. Collect only consented/minimized diagnostics, never local trip notes or backup files. Confirm retention/access controls before enabling telemetry. No third-party monitoring account or alert recipient is configured by this repository.

## Content and translations

`tests/content-quality.spec.ts` produces a per-place maintenance queue and field coverage totals, including a suggested maintainer role and a next-review date for each checked field. The report and UI use the date in Japan. Run `node scripts/check-links.mjs` for a separate reachability report; scheduled/manual CI also runs it. HTTP failures flag manual review and never change factual review dates. Review intervals are 30 days for hours/admission/booking, 90 days for accessibility and 180 days for last-mile access/entrance descriptions. Missing and overdue fields remain explicit. Prioritize high-traffic venues, closures, accessibility, pricing and reservation changes. Schema checks cannot verify that a source remains factually current.

- Operator access, admission/calendar and booking pages are the primary sources. Update only facts actually checked and their field-specific source/date; retain different dates when one field has not been rechecked.
- All 104 mapped places have localized names and explicit categories. All 104 now have a reviewed last-mile access note in all three languages. Hours, admission, entrance, booking and accessibility remain explicitly unknown wherever they have not been checked. A reviewed record may still have missing fields. No page claims universal entrance/accessibility verification.
- Map coordinates are approximate venue/area references. An entrance photograph or description does not certify a precise entrance pin, step-free access or a usable route. Confirm the exact entrance with the operator before moving a pin or adding accessibility claims.
- Day groups, visit durations, regional seasonal advice, rainy-day substitutions and budgets are editorial planning aids. They are not live schedules, route times, bloom forecasts or quotes. Keep that distinction in every language.
- Match the same factual meaning in Japanese, English and Thai. Preserve Japanese place names/addresses for taxi, station and map use. Keep the stable ID unchanged; use the existing alias migration for renamed records.
- Photo changes need a verified subject, meaningful alt in all three languages, original source, named creator, license and local optimized file. Preserve share-alike licensing for adapted Commons photos.

| Meaning                    | English                        | 日本語             | ไทย                    |
| -------------------------- | ------------------------------ | ------------------ | ---------------------- |
| Regional division          | Prefecture                     | 都道府県           | จังหวัด                |
| Travel planning only       | Suggested plan                 | おすすめプラン     | แผนเที่ยวแนะนำ         |
| Not verified               | Check with the official source | 公式情報を確認     | ตรวจสอบกับแหล่งทางการ  |
| Estimate, not quote        | Estimated budget               | 予算の目安         | งบประมาณโดยประมาณ      |
| Public transport route     | Transit directions             | 公共交通機関の経路 | เส้นทางขนส่งสาธารณะ    |
| Distance, not journey time | Straight-line distance         | 直線距離           | ระยะทางเส้นตรง         |
| Saved locally              | Saved on this device           | この端末に保存済み | บันทึกบนอุปกรณ์นี้แล้ว |
| Unscheduled visit          | Unscheduled                    | 未設定             | ยังไม่จัดวัน           |
| Accommodation check-out    | Check-out day                  | チェックアウト日   | วันเช็กเอาต์           |
| Unverified geographic scope | Area reference point         | エリアの目安の位置 | ตำแหน่งอ้างอิงของพื้นที่ |
| User-entered location      | Personal stop                  | 自分のスポット     | สถานที่ส่วนตัว         |
| Redacted export scope      | Guide places and days only     | ガイド内スポットと日数のみ | เฉพาะสถานที่ในคู่มือและลำดับวัน |

Native-speaker review should check tone, ambiguous station exits, transliteration and accessibility wording, not just dictionary-key parity. This glossary is an editorial reference, not evidence that a native reviewer has signed off.

## Accessibility, performance and regression checks

- Test keyboard access to the skip link, navigation, map/list controls, marker buttons, mobile dialog close/focus return, all trip inputs, backup preview and 3D topic controls. No essential information may require dragging the 3D model.
- Check 200% text/desktop zoom and a 320px reflow width. Test real screen-reader speech on VoiceOver and TalkBack; automated axe scans alone do not verify reading order or announcements.
- Honor reduced motion and global pause. Three.js loads only after activation, caps mobile pixel ratio/shadows/particles and pauses when offscreen. Recheck on a physical low-end Android and iPhone for input delay, thermal/battery cost and WebGL fallback. Emulators do not establish frame-rate budgets on hardware.
- Check first load and navigation separately. Use the [Core Web Vitals targets](https://web.dev/articles/vitals): field p75 LCP ≤2.5s, INP ≤200ms, CLS ≤0.1; these are release targets, not measured production results. Use field reports only after a real origin has sufficient traffic. Inspect before/after network requests to ensure maps and 3D remain deferred.
- Visual baselines cover desktop/mobile trip forms in both themes, a Thai homepage, Japanese search filters and the English airport guide. Platform-specific baselines account for native controls/fonts. To update intentionally, run `npm test -- tests/visual.spec.ts --update-snapshots`, inspect every changed image, and commit the appropriate OS baselines. Never approve differences merely because a test failed.
- Security checks include bounded UTF-8 imports, known guide IDs or validated personal-stop records, HTTPS reference links without credentials, stale-tab guards, failed-write recovery, escaped offline HTML and dependency audit. Production CSP excludes eval and inline event handlers, but Next's static output still uses inline scripts/styles. Moving to nonce CSP changes rendering/caching and needs a separate verified implementation. This release is not a penetration test.

## First-time visitor usability session

Recruit at least five people who have not used the site, including Thai and Japanese readers and mobile users. Use consented notes without collecting their actual bookings. Give tasks without explaining the interface:

1. Plan an arrival from the airport to a city base; explain which information still needs checking.
2. Find Gion using a name in their own language, open its map details and identify the difference between a venue pin and an entrance.
3. Add a Kyoto suggested plan starting on day 3; add a second visit to one place and remove only that visit.
4. Enter a hotel, two travelers, a budget, a reservation time and a note; reload and switch language.
5. Shorten the trip and recover the retained notes; export a private backup and a sanitized copy, then preview an import without losing the original.
6. Find emergency help without using the 3D model, then pause motion and switch to night mode.

Record completion, wrong turns, time, requests for help, misunderstood terms and whether the participant can explain what is saved/shared. Prioritize blocked tasks and data-loss misunderstandings over decoration. Retest the fixes with fresh participants. No participant sessions have been run as part of this workspace change.

## Trip copies, drafts and export

The active version-1 trip remains in `japan-travel-trip-v1`. Up to ten separately saved copies use `japan-travel-library-v1`; edits do not update earlier copies automatically. Both are local to the browser, without account or cloud sync. Invalid drafts use per-tab session storage and survive route/language changes and reloads. If session storage fails, an in-memory draft and unload warning are the fallback; closing the tab can still lose that draft. The page must never label a trip fully saved while a rejected draft exists.

A full backup request stores a SHA-256 fingerprint and timestamp in `japan-trip-backup` when secure-context Web Crypto is available. On HTTP LAN previews, editing and downloads still work; backup fingerprint status is unavailable. This records the download request, not proof that the user retained the file. A sanitized export does not count as a full backup. Calendar export uses Japan time for timed visits and all-day entries otherwise; private visit notes are excluded by default and require an explicit opt-in before download. Personal place names and addresses still appear in calendar files. Review the file before sharing. Manually dated currency rates are estimates, never live quotes; the chosen rate, currency and date persist in private backups. The preparation checklist also belongs to the active trip. Named copies include snapshot timestamps; whole-library backup/restore is separate from active-trip backup.

Personal stops contain a name, full address, optional HTTPS reference and optional user-entered latitude/longitude. Both coordinates must be present and within range. They appear as reference pins only; Google directions still use the entered address. Editing a personal place updates every repeated visit and linked stay without changing visit dates, times or notes. Unlinking a stay or removing the last visit retains its accommodation name/address. Full JSON and library backups preserve coordinates; offline HTML preserves the place/address but contains no live map. Sanitized JSON/HTML remove the entire personal stop along with all other private trip fields. The checkbox does not redact printing or calendar exports. Export previews state these scopes before download. Personal edit drafts keep the original edited field values across reloads: if another tab changed one, cancel/discard and review the latest value before retrying. Other fields are not silently replaced by stale snapshots.

About has a confirmed deletion action for this site's trip, copies, drafts, backup status and appearance settings, using an explicit storage-key list. It preserves unrelated local storage and clears the current tab's Undo history. Downloaded files and data in another browser are outside this action. Close other tabs before clearing browser data if storage is blocked or a tab is suspended.

Before switching trips, repair or discard pending input and export the current plan. Load/replace requires confirmation; one-step Undo restores the preceding active trip. Invalid stored JSON can be downloaded unchanged before an explicit reset. No migration discards the existing trip automatically.

For current per-item acceptance and external checks, see [the 2026-10-28 delivery ledger](upgrade-2026-10-28.md). Earlier release ledgers remain historical evidence.

Track participant, assistive-technology, device recovery, calendar-client and live-operator evidence in [visitor and release acceptance](visitor-acceptance.md). Its initial **Not Run** status must change only after the named checks are performed.


## Feedback and editorial triage

Repository owner `araxis07` is the escalation contact for assigning content and release work. A named backup maintainer and staffed response rota are not configured. The public visitor-feedback issue form collects the page, language, problem and official evidence; the website only opens/copies a report, never sends it on the visitor's behalf. Do not request private backups, bookings or coordinates in a public issue. Security reports should use private vulnerability reporting if enabled; otherwise establish a private channel before sharing exploit details.

1. Triage closures, unsafe/incorrect access and data-loss reports first. Record the affected stable place ID and field; confirm the report against the operator, not a search snippet alone.
2. Assign an issue owner and a due date when accepting it. Use the generated per-field next-review dates for routine work; record a blocked source and next follow-up date if the operator site is unavailable. HTTP 200 proves reachability only, not correctness.
3. Correct all three languages and only the checked field's source/date. If a disputed fact cannot be verified, show it as unverified rather than keeping a confident stale claim. Do not turn a missing fee into “free”.
4. Run the content/schema and affected UI tests, then attach the correcting commit and source to the issue. Close only after the released page is checked; keep failed-source follow-ups open.
5. Each weekly review, inspect `content-review.json` and `source-links.json`, assign high-risk overdue fields, and check whether previous corrections need publication. This is an operating procedure, not a claim of staffed monitoring or an agreed response-time SLA.

For a production incident, record the origin, failing route, last successful deployment/commit and relevant public error. Stop rollout, use the host's rollback to the last known-good artifact, and rerun the deployment checker plus the affected visitor task before resuming. A git revert is a new reviewed commit; do not force-push history or clear visitor storage as a rollback. Hosting credentials and a real origin are required to exercise this procedure.

Add to the novice session: edit a personal hotel shared across two visits, link its stay, use it as the route origin, then explain what its map pin means and which exported files contain its coordinates. Record the participant's explanation, not just whether they clicked Download.

## PWA and synchronization decision

Keep the existing local trip and explicit file transfer for now. A PWA should be justified by measured demand for the guide offline and needs a freshness/update policy for advice; public OSM tiles must not be prefetched or packaged. Cross-device sync additionally needs identity, conflict resolution, deletion/export, retention and an operator. Neither feature is enabled by this release, and neither is implied by the manifest or a saved local copy.
