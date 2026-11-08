# Wayfinding source review — 9 November 2026

Compared the access, entrance and accessibility notes for four core venues in `src/data/visit-details.ts` with official operator pages. This document records evidence for review; it does not change source data or `reviewedAt`. Retrieval date is not a publication date or on-site inspection. No entrance coordinates were verified.

## Kiyomizu-dera (`kiyomizu`)

**Confirmed:** the two approaches are via Kiyomizu-zaka/Nio-mon and Chawan-zaka/emergency road; mapping apps can suggest roads that do not enter the grounds. Keihan Kiyomizu-Gojo is approximately 25 minutes on foot. Existing access/approach copy agrees. [Official Japanese access page](https://www.kiyomizudera.or.jp/access.php), [English location page](https://www.kiyomizudera.or.jp/en/location/).

**Useful missing caution:** the operator's wheelchair map shows a recommended loop but also warns of gravel and slopes. It must not be presented as a uniformly smooth or independently easy route. The PDF was visually inspected; no publication date is printed. [Official wheelchair route PDF](https://www.kiyomizudera.or.jp/assets/img/map_for_wc.pdf).

The FAQ describes vehicle approach via the Chawan-zaka emergency-road entrance, maps at Todoroki-mon, accessible toilets and no wheelchair loans. Existing notes broadly agree. It does not establish a station-to-temple step-free journey. Add the gravel/slope caution and retain operator guidance rather than inventing entrance coordinates. [Official FAQ](https://www.kiyomizudera.or.jp/faq/).

## Kyoto National Museum (`kyoto-museum`)

**Confirmed:** approximately seven minutes east along Shichijo Street from Keihan Shichijo Station. [Official access page](https://www.kyohaku.go.jp/eng/visit/access/).

The microbus/motorcoach arrival PDF explicitly redirects visitors from the West Gate vicinity to the South Gate on foot; the West Gate is not a visitor entrance. Its printed revision date is **11 March 2025**, distinct from this review date. The PDF was visually inspected. Existing entrance/approach wording agrees; keep the bus-specific scope. [Official bus-arrival PDF](https://www.kyohaku.go.jp/jp/assets/visit/access/bus-map.pdf).

A wheelchair ramp at the South Gate, limited loan wheelchairs, multipurpose toilets and possible stroller restrictions in crowded galleries are confirmed. This does not verify street gradients or an uninterrupted station-to-gate route. No factual correction is required to the current scoped copy. [Official accessibility page](https://www.kyohaku.go.jp/eng/visit/accessibility/).

## Senso-ji (`sensoji`)

**Confirmed:** the operator lists roughly five minutes from the named Asakusa stations and specifically A4 for the Toei Asakusa Line. This is general access guidance, not confirmation of an elevator exit. Do not label A4 an accessible exit. [Official access page](https://www.senso-ji.jp/access/).

Kaminarimon is the outer/main gate and the approach continues to the Main Hall. The lift is to the left when facing the Main Hall. Multipurpose toilets are to the right of Hozomon and behind the Main Hall. Existing copy agrees and correctly separates station-route checks. The FAQ additionally says these toilets lack ostomate facilities; add this only if expanding the specific facilities note. No publication/update date is shown for these access/FAQ facts. [Official FAQ](https://www.senso-ji.jp/faq/).

## Tokyo National Museum (`tokyo-museum`)

**Confirmed:** the operator gives approximately ten minutes from JR Ueno or Uguisudani and directs visitors through the Main Gate. Existing general access/entrance copy agrees. [Official visitor information](https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en).

**Recommended improvement:** the accessibility page distinguishes JR Ueno **Park Exit**, approximately 500 m from the main entrance, from Uguisudani **South Entrance**, approximately 600 m, where paths can be narrow and steep. It also warns of slopes/stairs on approaches from other nearby stations. A shared ten-minute estimate must not imply equivalent accessibility. The Main Gate faces Metropolitan Road 452. Existing notes about toilets excluding Hyokeikan, steep entrance ramps and wheelchair loans are supported; small internal steps also remain. Add a short station-approach warning and link the operator's detailed access maps, rather than asserting a universally step-free route. [Official accessibility information](https://www.tnm.jp/modules/r_free_page/index.php?id=128).

## Changes proposed for the data owner

1. Add Kiyomizu-dera's official gravel/slope caution to its accessibility/approach note across supported languages; link the wheelchair PDF directly where useful.
2. Distinguish the two JR station approaches in Tokyo National Museum's access/accessibility note, preserving the Main Gate instruction and operator confirmation caveat.
3. Keep the existing Kyoto National Museum and Senso-ji entrance facts. A4 remains general station guidance; no accessible-exit claim is justified by this review.
4. If updating field freshness later, update only the individual fields actually checked here. Hours, admission, booking, construction conditions and every map coordinate were outside this review.

No live routing, station elevator availability, on-site surface condition, gate coordinates or end-to-end accessible journey was certified. These official documents support planning, not a guarantee for every visitor or date.

## Applied in stabilization

The data owner added the Kiyomizu gravel/slope caution to its approach note and a separate, operator-linked Tokyo National Museum station-approach note in all eight languages. The existing general access, entrance and facility facts were retained. Their historical field dates were not reset; this document records the scope of the new source review.
