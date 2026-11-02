# Prefecture day-plan route origins — 2026-11-03

Prefecture day plans now distinguish arriving at the first stop from travelling between the suggested stops. A later stop's main Google Maps link uses the previous stop in the same day as its origin, with both place names visible in the link. Previously every stop omitted the origin, so the links did not describe the connections implied by the day order.

## Link contract

- The first stop of **each day group** keeps the existing origin-free transit URL. Its label names the destination and says **Current location / choose in Google Maps**, localized in English, Japanese and Thai. Google Maps may use a device location or ask for a starting point; the guide does not request geolocation or promise automatic location access.
- Each later main link says **previous place → next place · Directions in Google Maps**. Its destination is the existing `mapUrl(current, true, 'transit')` target. Its `origin` is the destination target produced by the same helper for the previous place, so fallback queries and encoding use the same rules.
- Each later stop also offers the origin-free version under the existing native **Start directions from** disclosure. This lets a visitor who is already elsewhere choose a start in Google Maps without changing the suggested day plan.
- All links retain `api=1` and `travelmode=transit`. The origin resets at the next day; no link silently starts from the previous day's final stop.

Place lookup still resolves the current page's points with `canonicalPlaceId`. Plan membership, saved-place IDs, coordinates, ordering, first-stop access text and straight-line distance estimates remain unchanged. The existing Google Maps text queries remain venue references; this change does not replace them with entrance coordinates or claim a step-free route.

The localized guidance makes clear that Google Maps calculates the transit route and visitors must check the starting point, entrance and any step-free approach. Route availability, departure times, fares and the gate chosen by Google Maps still require confirmation. These are suggested planning connections, not verified journeys or automatic route optimization.

## Verification and acceptance

The installed Next.js page and Server/Client Component guides were read before editing. The page remains an async Server Component with Promise-based params; native links and disclosures add no new client component, geolocation request, state or storage schema.

Targeted ESLint for the changed page passed. At implementation time the model contained 47 prefecture plans, 79 day groups, 104 suggested stops and 25 within-day legs. These are snapshot counts, not hardcoded constraints: checks should derive their expectations from the current plan groups and resolved points if the catalog changes.

QA integration cases:

1. For every current plan in all three locales, check each main link's destination against the resolved place's `mapUrl` target. First-stop main links omit `origin`; later main links include the previous stop's target and display the corresponding localized names.
2. Check day boundaries, especially Kyoto's separate groups. Its second group starts independently rather than inheriting Gion as an origin.
3. Check the longest current groups, including Osaka's three stops, so the third stop starts from the second rather than the first. Include canonical aliases represented by prefecture points, such as Tokyo and Hokkaido.
4. Open each alternate-origin disclosure by keyboard and follow the origin-free link. Its destination must match the main link, with no leftover previous-stop origin.
5. Check narrow-width reflow and accessible link names in English, Japanese and Thai. Confirm that routing changes do not alter applying a plan, canonical anchor links or the existing straight-line distance note.

Browser integration results are recorded by the integration lead/QA separately. Actual Google Maps behavior on physical iPhone/Android devices, native-language wayfinding, entrances, accessible paths and production acceptance remain **Not Run** for this change. A correct generated URL does not complete those manual checks.
