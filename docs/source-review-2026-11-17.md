# Hokudai and KIX source follow-up — 17 November 2026

Following root's independent source review, the data owner applied one Hokudai access correction and two KIX operator checks in eight languages. Only Hokudai's access field received a new factual review date; each new check has its own 2026-11-17 date. The research agent wrote only this ledger and reviewed the resulting source text. Coordinates, place IDs and routing providers were unchanged. Translations are model-reviewed; native-editorial and novice acceptance remain Pending.

## Retrieval method and outcome

The web reader and a local headless Chromium browser independently requested the two original URLs. Chromium used normal page navigation, no authentication, custom headers, challenge bypass, proxy or alternative identity. Browser response status is evidence for the response delivered to that browser, not a direct origin measurement. No application server or automated test suite was run.

| URL | Web reader, 17 November | Chromium, 17 November | Interpretation |
| --- | --- | --- | --- |
| [Hokudai English Visit](https://www.museum.hokudai.ac.jp/english/visit/) | TimeoutError | HTTP 200; title “Visit \| The Hokkaido University Museum”; full visit text, twice in the bounded comparison | Original URL is retrievable in this browser. The earlier reader 502/timeout does not establish a broken/deleted page. Keep the URL. |
| [KIX English train access](https://www.kansai-airport.or.jp/en/access/from-airport/train) | 403 | HTTP 403; title “Access Denied”; denial body references `errors.edgesuite.net` | Unavailable to these clients. The denial appears to come through an edge service; the actual origin's availability and reason for denial remain Unknown. Keep the URL; do not substitute unrelated evidence to make the checker green. |
| [Hokudai Japanese opening/access](https://www.museum.hokudai.ac.jp/outline/open/) | 502 | HTTP 200; full Japanese text | Retrieved primary evidence, not merely indexed material. |
| [Hokudai Japanese facilities](https://www.museum.hokudai.ac.jp/outline/service/) | TimeoutError | HTTP 200; full Japanese text | Retrieved primary evidence, not merely indexed material. |

Additional retrieved primary pages: [JR-West airport usage guide](https://www.westjr.co.jp/travel-information/en/train-usage-guide/howto/guide/), [Nankai railway access](https://www.nankai.co.jp/en_railway/access-fromkix), [Nankai Rapi:t](https://www.nankai.co.jp/en_railway/rapit), [Nankai Bus English guidance](https://www.nankaibus.jp/howto_en/) and its [current airport route/timetable index](https://www.nankaibus.jp/airport/kanku_02/). The airport's Japanese train page and English FAQ also returned reader 403; their search snippets were not treated as successful retrievals.

No content-specific publication/update date was visible for the retrieved museum pages or the JR-West/Nankai guidance sections. Footer copyright and unrelated dated news entries do not date those claims. The shuttle PDFs linked by the current Nankai index print **2025-08-25**; that is their own timetable date, distinct from this retrieval. Their domestic/international T2 headings explicitly show travel towards T1/Aeroplaza and free fare: [international PDF](https://www.nankaibus.jp/assets/pdf/airport/kanku_02/20250825_01_03.pdf), [domestic PDF](https://www.nankaibus.jp/assets/pdf/airport/kanku_02/20250825_01_02.pdf). Exact departures/headways are outside the proposed copy.

## Verified gaps and retained facts

### 1. Hokudai station estimate differs between operator languages

Before this batch, `src/data/visit-details.ts:731` gave ten minutes from JR Sapporo North Exit in all eight locales. The English Visit page agrees with that former value. The retrieved Japanese opening/access page instead gives **13 minutes from JR Sapporo North Exit**, **nine minutes from subway Kita 12-jo**, seven from the university Main Gate and eight from the North 13 Gate. It also explicitly says there is no museum parking and cars cannot enter the museum campus approach.

This is an operator-language discrepancy, not proof that walking speed or the street layout changed. Root accepted the Japanese page's 13-minute estimate with a field-specific source and the useful subway alternative; no 10–13-minute operator-published range was invented. The accepted text below omits campus-gate estimates to avoid a wall of alternative directions.

### 2. KIX terminal handoff is correct but underspecified

Current `src/data/arrival-guides.ts:109` only says T2 needs a terminal transfer. Nankai Bus identifies the **free shuttle between T2 and Aeroplaza**, while its English page identifies the bridge connection from Aeroplaza to Kansai-airport Station. The current timetable index links separate domestic and international T2 boarding information. Naming Aeroplaza gives a concrete connection landmark.

Do not publish an airport floor number or shuttle duration based only on the blocked airport page's indexed text. Do not generalize Nankai's “LCC” heading to all low-cost airlines or promise a current departure, empty bus, baggage capacity, lift availability or accessible boarding. These remain unverified.

### 3. KIX railway operator choice needs a source-linked practical cue

Current KIX comparison at `src/data/arrival-guides.ts:110` correctly distinguishes Nankai and JR destinations; the worked Nankai example at `:500` already distinguishes Nankai Namba from JR Namba and Osaka-Namba. Retain those facts. JR-West's retrieved guide identifies **JR-West in blue and Nankai in red** on the concourse, and explicitly requires an additional limited-express fare for HARUKA. This is useful evidence for selecting the correct company's gate without changing the map destination.

The same guide's “first four cars at Hineno” warning is specifically **towards Kansai-airport**. It must not be inserted as an instruction for a passenger departing the airport. No arrival-direction carriage rule is established here. The Rapi:t page confirms all reserved seating and ordinary fare plus limited-express ticket; the existing worked example agrees, so no repeat rewrite is proposed.

### 4. Hokudai facilities agree; group deadline and luggage size need restraint

Existing hours/admission and accessibility notes at `src/data/visit-details.ts:741`, `:751`, `:761` agree with the retrieved primary pages. Japanese guidance says the next weekday after a holiday Monday; the existing wording follows this more general rule, so do not replace it with the English page's narrower “Tuesday.” The Japanese facilities page confirms an intercom at the accessible entrance, loan wheelchairs/strollers, and toilets on floors 1–2. This establishes facility provision, not live lift service or a continuous route from either station.

Current booking at `src/data/visit-details.ts:771` is correctly limited to a regular visit. Japanese guidance asks most groups to apply a month ahead; English general paperwork says a week, and high-school applications follow a separate process. Keep the current regular-visit claim; do not publish one universal group deadline without resolving the operator-language discrepancy.

Both languages describe refundable-coin lockers near the first-floor entrance. Neither retrieved text gives locker dimensions, suitcase acceptance or guaranteed availability. No luggage-storage promise, new baggage policy or entrance coordinate is proposed. The existing 90-minute planning duration is editorial: the Japanese page says a leisurely complete visit takes more than half a day. Do not present 90 minutes as an operator-certified complete tour.

## Accepted bounded data changes

These changes were applied by the data owner and read back by the research agent. Existing IDs, coordinates and unrelated locale values were retained. The only renewed existing field is Hokudai access. No shared schema change was made.

### A. Replace only `visitDetails['hokkaido-museum'].access`

Applied `fieldSources.access.source = 'https://www.museum.hokudai.ac.jp/outline/open/'` and `reviewedAt: '2026-11-17'` to this individually checked access field. The English ten-minute page remains the record-level source for historical claims; the record-level date and other fields' dates were retained. No source URL was removed merely due to reader failure.

| Locale | Exact proposed access text |
| --- | --- |
| en | About 13 minutes on foot from JR Sapporo North Exit or nine from subway Kita 12-jo. No museum parking; use public transport. |
| ja | JR札幌駅北口から徒歩約13分、地下鉄北12条駅から約9分。博物館の駐車場はありません。公共交通機関をご利用ください。 |
| th | เดินประมาณ 13 นาทีจากทางออกทิศเหนือ JR Sapporo หรือ 9 นาทีจากสถานีรถไฟใต้ดิน Kita 12-jo พิพิธภัณฑ์ไม่มีที่จอดรถ โปรดใช้ขนส่งสาธารณะ |
| ko | JR 삿포로역 북쪽 출구에서 도보 약 13분, 지하철 기타12조역에서 약 9분입니다. 박물관 주차장은 없으니 대중교통을 이용하세요. |
| zh-CN | 从JR札幌站北口步行约13分钟，或从地铁北12条站步行约9分钟。博物馆无停车场，请乘坐公共交通。 |
| vi | Đi bộ khoảng 13 phút từ cửa bắc ga JR Sapporo hoặc chín phút từ ga tàu điện ngầm Kita 12-jo. Bảo tàng không có bãi đỗ xe; hãy dùng phương tiện công cộng. |
| fr | Environ 13 minutes à pied de la sortie nord de JR Sapporo, ou neuf de la station de métro Kita 12-jo. Aucun parking au musée ; prenez les transports en commun. |
| es | A unos 13 minutos a pie de la salida norte de JR Sapporo o nueve del metro Kita 12-jo. El museo no tiene aparcamiento; use transporte público. |

### B. One compact KIX terminal check; retain the general guide

Applied one existing-shape `arrivalChecks` entry with `source: 'https://www.nankaibus.jp/airport/kanku_02/'` and narrowly checked date `2026-11-17`. The entire existing general KIX guide, its airport source and aggregate date were retained. The [English operator page](https://www.nankaibus.jp/howto_en/) supplies the shuttle/bridge context; the visible source is the current route/timetable index, whose T2 PDFs establish the reverse direction. The new check exposes Nankai Bus provenance alongside its own practical detail; the detail was not duplicated in the general guide.

| Locale | Exact title | Exact text |
| --- | --- | --- |
| en | KIX: Terminal 2 to the station | From Terminal 2, take the free shuttle towards Terminal 1/Aeroplaza, then the bridge from Aeroplaza to Kansai-airport Station. |
| ja | 関空：第2ターミナルから駅へ | 第2ターミナルからは第1ターミナル・エアロプラザ方面の無料連絡バスへ。エアロプラザから連絡橋を通り関西空港駅へ。 |
| th | KIX: จาก Terminal 2 ไปสถานี | จาก Terminal 2 นั่งรถรับส่งฟรีไปทาง Terminal 1/Aeroplaza แล้วตามทางเชื่อมจาก Aeroplaza ไปสถานี Kansai-airport |
| ko | KIX: 제2터미널에서 역으로 | 제2터미널에서는 제1터미널·에어로플라자 방면 무료 셔틀버스를 타세요. 에어로플라자에서 연결 다리를 따라 간사이공항역으로 가세요. |
| zh-CN | KIX：从第2航站楼前往车站 | 从第2航站楼乘免费接驳巴士前往第1航站楼／Aeroplaza方向，再从Aeroplaza沿连桥前往关西机场站。 |
| vi | KIX: từ nhà ga 2 đến ga tàu | Từ nhà ga 2, đi xe buýt miễn phí hướng nhà ga 1/Aeroplaza, rồi theo cầu nối từ Aeroplaza đến ga Kansai-airport. |
| fr | KIX : du terminal 2 à la gare | Depuis le terminal 2, prenez la navette gratuite vers le terminal 1/Aeroplaza, puis le pont reliant Aeroplaza à la gare Kansai-airport. |
| es | KIX: de la terminal 2 a la estación | Desde la terminal 2, tome la lanzadera gratuita hacia la terminal 1/Aeroplaza y siga el puente desde Aeroplaza hasta la estación Kansai-airport. |

The unchanged general guide retains the T1 station-sign instruction. Neither the old guide nor the new check establishes an accessible path between the terminal and station.

### C. One KIX operator check using the existing `arrivalChecks` shape

Applied one entry with `source: 'https://www.westjr.co.jp/travel-information/en/train-usage-guide/howto/guide/'` and narrowly checked date `2026-11-17`. This provides accessible primary evidence alongside the retained airport URL without creating a new source model or directions provider. Other arrival records' dates were retained. Text operator names accompany color; color alone is not the instruction.

| Locale | Exact title | Exact text |
| --- | --- | --- |
| en | KIX: choose the railway | Concourse signs: JR-West blue, Nankai red. Match the company to your ticket. HARUKA requires a separate limited-express fare. |
| ja | 関空：鉄道会社を確認 | コンコースではJR西日本が青、南海が赤の案内。切符の会社を確認。はるかは乗車券のほかに特急券が必要です。 |
| th | KIX: เลือกบริษัทรถไฟ | ป้ายโถงสถานี: JR-West สีน้ำเงิน Nankai สีแดง เลือกบริษัทให้ตรงตั๋ว HARUKA ต้องจ่ายค่าด่วนพิเศษเพิ่มจากค่าโดยสารพื้นฐาน |
| ko | KIX: 철도회사 확인 | 대합실 안내는 JR서일본이 파란색, 난카이가 빨간색입니다. 승차권의 회사를 확인하세요. 하루카는 기본 운임 외에 특급 요금이 필요합니다. |
| zh-CN | KIX：确认铁路公司 | 站厅指示中JR西日本为蓝色、南海为红色。请核对车票所属公司。乘HARUKA须在基本车费外另付特急费。 |
| vi | KIX: chọn hãng đường sắt | Biển ở sảnh ga: JR-West màu xanh dương, Nankai màu đỏ. Chọn đúng hãng ghi trên vé. HARUKA cần trả thêm phí tàu tốc hành. |
| fr | KIX : choisir la compagnie | Dans le hall : JR-West en bleu, Nankai en rouge. Vérifiez la compagnie du billet. HARUKA exige un supplément express distinct. |
| es | KIX: elija la compañía | En el vestíbulo: JR-West en azul, Nankai en rojo. Compruebe la compañía del billete. HARUKA requiere un suplemento de expreso aparte. |

## Acceptance and remaining Unknown

- First batch is A–C only: one venue access field and two compact source-linked arrival checks, each complete in eight locales. The general KIX guide remains intact. Source/date changes must stay within the exact accepted claim scope. Preserve the original Hokudai and KIX URLs as provenance; record KIX access denial separately from factual freshness.
- This is an editorial improvement, not a new walking-route implementation. Reference pins remain reference pins. No station exit-to-museum continuous step-free route, entrance coordinate, Place ID, current elevator operation, weather condition, train availability or route duration is certified.
- No KIX baggage rule was revalidated. Nankai Bus's page has separate limousine/long-distance sections; their suitcase limits cannot be applied to the free terminal shuttle or to trains. No lockers are promised to fit a suitcase at Hokudai.
- Root independently reviewed the Hokudai Japanese/English estimate discrepancy and selected the Japanese estimate; the discrepancy remains documented above. No invented averaged range was published. Group application deadlines stay out of the regular-visit booking field pending operator clarification; no contact was made.
- Native-speaker review of all variants, novice route comprehension and physical accessibility acceptance: **Pending**. App tests/build/server/commits: **Not Run**, outside this task. Browser activity above was limited to external primary-source retrieval and all browser processes were closed.

## Applied and verification boundary

The data owner's completed changes were read back on 2026-11-17: Hokudai's eight `access` values at `src/data/visit-details.ts:731`, its new access-only source/date at `:781`, and the two eight-locale checks beginning at `src/data/arrival-guides.ts:398` and `:434`. The generic KIX guide remains at `src/data/arrival-guides.ts:104` with its original airport source and 2026-10-25 date. Hokudai's record date remains 2026-10-24; booking/accessibility remain 2026-10-26. Group booking, lockers, hours, admission and accessibility text were retained. This source readback does not claim UI rendering, browser regression or native acceptance; integration checks belong to root/QA.

During integration, the lead assigned `airport: 'KIX · Kansai'` to the two new checks and extended the existing check metadata with an optional airport code. The First Visit page renders these checks inside the matching airport's existing disclosure, reusing the same source/date markup. The three general checks retain their original positions. This contextual grouping changes presentation metadata only; it does not change the checked facts, operator links or review dates. Integration tests validate the airport references and open both nested checks in all eight locales.
