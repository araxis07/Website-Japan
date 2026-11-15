# Core route and source follow-up — 16 November 2026

The route proposals below have been applied in eight languages, together with the Nagoya source URL correction. Following the main agent's direct review, only the Kiyomizu entrance, Senso-ji access and Tokyo National Museum entrance field provenance was refreshed to 2026-11-16. Retrieval is distinct from operator publication dates and on-site verification. Translations are model-reviewed; native-speaker and novice acceptance remain Pending.

## Six previously flagged URLs

One direct reader request per original URL, followed by bounded official-page discovery where useful. Reader errors are not independently measured origin HTTP responses. Search-index content is distinguished from a successful page retrieval.

| Original source / code evidence | 16 November observation | Recommended action |
| --- | --- | --- |
| [Makishi facility guide](https://www.makishi-public-market.jp/about/guide/); `src/data/visit-access.json:1293` | Full operator page retrieved. The existing approximate walk and facility notes agree. The main information says ten minutes from both stations; the footer says nine minutes from Makishi and ten from Miebashi. | Mark this retrieval successful in the availability ledger; retain the URL and approximate copy. Do not interpret a successful request as continuous availability or refresh the record date. |
| [Nagoya database URL](https://db.nagoya-info.jp/en/spot/detail/1/); `src/data/visit-details.ts:624` | Reader 502. The official tourism bureau's [www same-place page](https://www.nagoya-info.jp/en/spot/detail/1/) retrieved and confirms Nagoyajo Station Exit 7, approximately five minutes. It explicitly warns that its English text uses machine translation. | A bounded source-URL correction is justified: change this record's `source` to `https://www.nagoya-info.jp/en/spot/detail/1/`, preserving `reviewedAt` and all locale text. This is a verified equivalent page, not an observed redirect. Existing other per-field sources remain intact. |
| [Hokkaido University Museum visit page](https://www.museum.hokudai.ac.jp/english/visit/); `src/data/visit-details.ts:724`, `:779`, `:783` | Direct reader 502; one follow-up direct request also 502. The same official URL is indexed with substantive visit text. | Remain retrieval-Pending; evidence does not establish a deleted page. Keep URL and dates. Indexed content alone is insufficient to renew operational claims. |
| [Kansai Airport train page](https://www.kansai-airport.or.jp/en/access/from-airport/train); `src/data/arrival-guides.ts:106` | Reader 403; the official parent access page also returned 403. The Japanese train page is indexed, but no equivalent English replacement was retrieved. | Keep URL/dates and flag automated-client access as a possible cause, not a proven explanation. Browser/manual follow-up is required; no source substitution solely to evade 403. |
| [JR East N'EX](https://www.jreast.co.jp/en/multi/nex/); `src/data/arrival-guides.ts:404` | Full official page retrieved; it displays Last Updated March 14, 2026. | Retain URL. Availability is resolved for this request only; no complete revalidation of the worked ticketing instructions or factual-date renewal is claimed. |
| [JR East Yokosuka construction notice](https://www.jreast.co.jp/en/yokosuka-tunnel-koji/); `src/data/travel-notices.ts:10` | Reader 404, consistent with the separate 9 November retrieval. The local notice ended 8 November. | Preserve historical provenance and expiry. `currentNotices` at `src/data/travel-notices.ts:49` excludes it after that date. Do not replace its source with the generic N'EX page or extend the notice. |

The original six now comprise two successfully retrieved original URLs, three unresolved original URLs, and one unavailable historical URL. Nagoya additionally has a retrieved official same-place replacement candidate. No site-wide uptime conclusion follows.

## Four core station-to-gate checks

| Venue / current evidence | Official evidence retrieved on 16 November | Conclusion and boundary |
| --- | --- | --- |
| Kiyomizu-dera; `src/data/visit-details.ts:823`, `:846`, `:896` | [Access](https://www.kiyomizudera.or.jp/access.php), [FAQ](https://www.kiyomizudera.or.jp/faq/), [wheelchair map PDF](https://www.kiyomizudera.or.jp/assets/img/map_for_wc.pdf). Access names two approaches and warns of map-app dead ends. The FAQ's wheelchair vehicle approach starts at the Chawan-zaka emergency road; its grounds guidance begins near the Main Hall. The PDF warns of gravel and slopes. | Existing approach caution already covers gravel/slopes: do not propose it again. Narrow `entrance` wording, which currently starts with “For a step-free approach,” so it cannot read as station-to-temple certification. Keep the route link and station walking estimate; neither proves street accessibility. |
| Kyoto National Museum; `src/data/visit-details.ts:1058`, `:1080`, `:1121`, `:1131` | [Getting Here](https://www.kyohaku.go.jp/eng/visit/access/) supports walking east along Shichijo Street from Keihan Shichijo. [Accessibility](https://www.kyohaku.go.jp/eng/visit/accessibility/) locates the ramp at South Gate. [Bus-arrival PDF](https://www.kyohaku.go.jp/jp/assets/visit/access/bus-map.pdf) directs bus passengers from West Gate vicinity to South Gate; printed revision 2025-03-11. | Retain current scoped wording. The bus map is not a station walking map; a gate ramp does not establish a continuous accessible street route. No new station exit, gradient, elevator or gate coordinate is supported. |
| Senso-ji; `src/data/visit-details.ts:109`, `:120`, `:131` | [Temple access](https://www.senso-ji.jp/access/) names A4 for Toei Asakusa Line; [FAQ](https://www.senso-ji.jp/faq/) distinguishes Kaminarimon from the Main Hall lift. [Toei Asakusa station](https://www.kotsu.metro.tokyo.jp/subway/stations/asakusa.html) reports elevators and a barrier-free station route, but the retrieved page text does not identify the ground-level elevator exit. | Add a short A4 interpretation caution to `access`. Do not publish an A2b routing instruction from search snippets alone, infer A4 has no lift, or equate station facilities with a complete route to the Main Hall. Temple facilities and station routes are separate scopes. |
| Tokyo National Museum; `src/data/visit-details.ts:940`, `:968`, `:1007` | [Accessibility](https://www.tnm.jp/modules/r_free_page/index.php?id=128) confirms the already-published JR Ueno Park Exit / Uguisudani distinction. [Visitor information](https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en) requires Main Gate entry, security/bag checks, and prohibits suitcases. [Written Ueno route](https://www.tnm.jp/modules/r_free_page/index.php?id=200) is explicitly current as of April 2024; tactile paving ends on part of its described walk. | Retain the existing station-approach note; add the gate-admission constraints before route handoff. Do not promise storage, quote a guaranteed queue, or import the older detailed walk as a newly inspected/live route. Preserve the written route's own April 2024 qualifier if exposed later. |

Both PDFs were opened as one-page documents and their screenshots requested. No on-site inspection, live railway elevator status, walking-time measurement or end-to-end accessible journey was performed. No entrance coordinates or Google Place IDs were established.

## Historical bounded data proposal for the coordinated data owner

The original proposal below covered three text fields in all eight supported locales and one source URL correction. It has since been applied; the original date instructions are historical and superseded for the three individually reviewed fields as described in the Applied section. No new schema, dictionary keys, station pins or map destinations were required.

### 1. `visitDetails.kiyomizu.entrance`

Replace the current full field at `src/data/visit-details.ts:896`. [Operator FAQ](https://www.kiyomizudera.or.jp/faq/) is the evidence for wheelchair vehicle approach and map collection. Preserve existing source metadata; do not change access/hours/booking/admission/accessibility dates.

| Locale | Proposed exact text |
| --- | --- |
| en | Wheelchair vehicle access: Chawan-zaka emergency road. Collect the grounds map at Todoroki-mon; check the station approach separately. |
| ja | 車いす利用時の車両での入山は茶わん坂の防災道路入口から。境内図は轟門で配布。駅からの経路は別途確認してください。 |
| th | ผู้ใช้รถเข็นที่มาโดยรถใช้ทางเข้าถนนฉุกเฉินฝั่ง Chawan-zaka รับแผนที่บริเวณวัดที่ Todoroki-mon และตรวจเส้นทางจากสถานีแยกต่างหาก |
| ko | 휠체어 이용자의 차량 진입은 차완자카 비상도로 입구를 이용합니다. 경내 지도는 도도로키몬에서 받으세요. 역에서 오는 경로는 별도로 확인하세요. |
| zh-CN | 轮椅使用者乘车进入时，请走茶碗坂的紧急通道入口。境内地图可在轰门领取；从车站前往的路线请另行确认。 |
| vi | Người dùng xe lăn đi bằng ô tô vào theo đường khẩn cấp phía Chawan-zaka. Nhận bản đồ khuôn viên tại Todoroki-mon; kiểm tra riêng đường từ ga. |
| fr | Accès en véhicule pour les personnes en fauteuil : voie de secours de Chawan-zaka. Plan du site à Todoroki-mon ; vérifiez séparément le trajet depuis la gare. |
| es | Acceso en vehículo para personas en silla de ruedas: vía de emergencia de Chawan-zaka. Recoja el plano en Todoroki-mon; compruebe aparte el trayecto desde la estación. |

### 2. `visitDetails.sensoji.access`

Replace the current full field at `src/data/visit-details.ts:109`. [Temple access](https://www.senso-ji.jp/access/) supports the existing estimate and A4; the caution explicitly limits what that source establishes. This does not assert that A4 has or lacks a working elevator. Retain the existing date and all other fields.

| Locale | Proposed exact text |
| --- | --- |
| en | About five minutes from Asakusa stations; Toei Asakusa Line guidance names A4. This does not confirm an elevator exit. |
| ja | 浅草駅から徒歩約5分。都営浅草線はA4出口の案内ですが、エレベーター出口を確認した情報ではありません。 |
| th | เดินประมาณ 5 นาทีจากสถานี Asakusa สาย Toei Asakusa ระบุทางออก A4 ข้อมูลนี้ไม่ได้ยืนยันทางออกที่มีลิฟต์ |
| ko | 아사쿠사역에서 도보 약 5분입니다. 도에이 아사쿠사선 안내에는 A4 출구가 명시되어 있지만, 엘리베이터 출구를 확인한 정보는 아닙니다. |
| zh-CN | 从浅草站步行约5分钟；都营浅草线指引列出A4出口。此信息并未确认电梯出口。 |
| vi | Đi bộ khoảng 5 phút từ các ga Asakusa; hướng dẫn tuyến Toei Asakusa nêu lối ra A4. Thông tin này chưa xác nhận lối ra có thang máy. |
| fr | À environ cinq minutes des gares d’Asakusa ; les indications de la ligne Toei Asakusa mentionnent A4, sans confirmer une sortie avec ascenseur. |
| es | A unos cinco minutos de las estaciones de Asakusa; la guía de la línea Toei Asakusa indica A4, sin confirmar una salida con ascensor. |

### 3. `visitDetails['tokyo-museum'].entrance`

Replace the current full field at `src/data/visit-details.ts:1007`. Proposed per-field `source`: `https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en`, since the current entrance source `id=128` does not carry the suitcase restriction. Keep `reviewedAt: '2026-10-26'` under the no-date-refresh instruction, with this ledger documenting the narrowly added evidence. The station-approach map remains linked through the existing `approach.source`; no route detail is lost by shortening entrance copy.

| Locale | Proposed exact text |
| --- | --- |
| en | Use the Main Gate. Suitcases are prohibited; security and bag checks apply. |
| ja | 正門から入館。スーツケースは持ち込めません。保安検査と手荷物検査があります。 |
| th | เข้าทาง Main Gate ห้ามนำกระเป๋าเดินทางเข้าพิพิธภัณฑ์ มีการตรวจความปลอดภัยและสัมภาระ |
| ko | 정문으로 입장하세요. 여행용 캐리어는 반입할 수 없으며 보안 및 소지품 검사가 있습니다. |
| zh-CN | 请从正门入馆。禁止携带行李箱入馆，须接受安检和行李检查。 |
| vi | Vào qua Cổng Chính. Không được mang va li vào; có kiểm tra an ninh và hành lý. |
| fr | Entrez par la porte principale. Les valises sont interdites ; contrôles de sécurité et des sacs à l’entrée. |
| es | Entre por la puerta principal. No se permiten maletas; hay controles de seguridad y de bolsos. |

### 4. Nagoya equivalent source URL

Change only `visitDetails['pref:aichi:nagoya-castle'].source` at `src/data/visit-details.ts:624` from the `db` URL to `https://www.nagoya-info.jp/en/spot/detail/1/`. Eight locale values already retain the same Exit 7 / five-minute fact; proposed locale text edits: **none**. Do not replace its other field sources or refresh dates.

## Acceptance, unresolved details and follow-up

- First batch acceptance: exactly three named text fields with eight non-empty locale values each, TNM entrance evidence URL matching the added constraint, and the single Nagoya record URL correction. Existing IDs, map destinations, coordinates, periods, record-wide dates, other field dates and unrelated facts stay intact. QA should check the constraints appear before route handoff and that the map continues to say reference location wherever entrance coordinates are absent.
- Confirmed missing detail is not the same as unavailable service. No source retrieved here establishes that elevator service is unavailable, a station-to-gate accessible route is continuous, storage is available, or an unverified entrance is closed. Keep these details Unknown rather than filling them with generic advice or a new coordinate.
- Keep Kyoto Museum's bus-specific label and no station-to-gate guarantee. No new Kyoto hours/booking refresh, calendar model, broad regional research or mass review-date renewal belongs to this route batch.
- Availability follow-up: browser/manual check of Hokudai and KIX; retain source failure observations separately from factual review cadence. Makishi and N'EX need no content mutation merely because they retrieved successfully.
- Human gates remain Pending: native review of all eight proposed variants; novice ability to select the correct station/operator/gate and recognize limitations; wheelchair-user/on-site validation for any future continuous-route claim. Model translation parity is not native editorial acceptance.
- Initial research verification: official-page research and source/data comparison only. Tests, build, server, live routing and physical-device/on-site checks were **Not Run** during that research; the subsequent applied changes are recorded below.

## Applied — 2026-11-16

The three proposed route fields were applied in all eight locales, and the Nagoya source URL was changed to the official same-place page. Following a separately authorized direct review of the specific operator sources, field-level provenance for Kiyomizu entrance, Senso-ji access and Tokyo National Museum entrance was updated to 2026-11-16 with the corresponding source URLs. This supersedes the earlier proposal above to retain those three field dates; record-wide dates and all other field dates remain unchanged. Language variants are model-reviewed, with native-speaker and novice acceptance still pending. No on-site or continuous accessible-route verification was performed.
