# Japan Travel renovation

## Scope

Preserve Japanese (default), English, all nine editorial regions, the six destinations and their URLs; add Thai throughout. Renovate home, destination guides, navigation, footer, planning, credits and error pages; keep metadata, icons, translations and browser checks aligned. Personal plans stay in the visitor’s browser. No server-side user records, booking service or message delivery exists in this guide.

The first renovation repaired the missing utility styles, removed random server-rendered decoration, made initial content readable without JavaScript, replaced simulated forms and nonexistent links, validated locales and upgraded Next/React. The second renovation adds the stronger Japanese identity and interactive 3D. The third expands practical content, maps, saved trips, photography and Thai while preserving the minimal visual design.

## Design and content

A Japanese travel journal in warm paper `#f6f2e9`, indigo `#23333d` and torii vermilion `#b33d2d`, with seasonal colors, serif display type, Japanese letterforms, local photography and paper-like route cards. System fonts avoid external font requests. Layouts adapt to desktop, tablet and mobile.

Home: editorial opening with a miniature Japan → destination search → geographic overview → six cultural experiences → regional directory → seasons → 7-, 10- and 14-day itineraries → practical planning and FAQs. Every destination now includes a three-part day plan, local food and pacing advice. Interface, content and controls are available in Japanese, English and Thai. Each guide also includes accommodation areas, airport access, rainy-day alternatives, preparation advice, three nearby places, a two-image gallery, source links and a review date. Seven additional local photographs illustrate the experiences and destinations.

General sources reviewed on 2026-10-22 include JNTO guidance on destinations, tea ceremony, onsen, accessible travel, luggage, payment and responsible travel. Expanded city guides were reviewed on 2026-10-23 against tourism authorities, airport/rail operators and museum sites. The README and in-app links identify the original sources. Itineraries and stay lengths are editorial suggestions, not reservations or current transport schedules. Seasonal windows are approximate, not live forecasts. This is an independent guide, not a JNTO affiliate.

## Interactive scene and motion

`JapanDiorama` shows a local PNG render first and loads the original procedural Three.js scene only after the visitor presses the exploration button. This avoids WebGL startup work during initial rendering. The miniature contains Mount Fuji, a torii, trees, a bridge, a pagoda and lanterns. Visitors can drag to rotate, click a lantern or use the day/night button, change seasons, rotate/reset with buttons and pause animation. All actions have keyboard-accessible controls.

The scene caps pixel density at 1.5 and animation at approximately 30 fps, caches static shadows, pauses offscreen and in background tabs, and disposes graphics resources and listeners on unmount. Reduced-motion preferences disable autonomous motion. The local miniature render replaces the canvas if WebGL2 is unavailable or its context is lost. The scene is illustrative artwork, not a geographic reconstruction.

Native CSS and browser APIs provide section entrances, card tilt, image transitions, itinerary changes and reading progress. Content is server-rendered and stays visible without JavaScript. No animation framework, remote models or asset service is required.

## Runtime and SEO

- Static prerendering remains enabled for all three locales and all six detail guides.
- `NEXT_PUBLIC_BASE_URL` controls domain-dependent SEO. No production domain is inferred from old placeholder metadata.
- The Grammarly attribute mismatch is handled only on the two root bodies with `suppressHydrationWarning`; descendant hydration checks remain enabled.
- One development server may use the project build directory at a time. The README explains how to reuse or stop an existing server. Test servers stop automatically.
- Generated build artifacts and test results remain ignored. No production deployment was performed.

## Maps and saved plans

The national overview uses public-domain Natural Earth country geometry. Local maps use a small-area equirectangular scale, numbered buttons and a north indicator; they do not depict streets or compute routes. External Google Maps links offer search and directions without embedded trackers or an API key. Approximate positions are labelled as planning references.

Six destinations and 18 places can be saved into a 1–30-day plan. Visitors assign days, move places up/down, remove items and print/save PDF. Shortening a trip moves affected items to the unscheduled list. The UI warns when a day spans destinations. It does not calculate travel time or optimize a route.

The versioned `japan-travel-trip-v1` value validates IDs, uniqueness, shape and day bounds. Reads use a consistent server snapshot and browser subscription; same-tab and cross-tab updates are supported. Corrupt data remains untouched until an explicit confirmed reset. Blocked reads and failed writes are visible and do not silently replace a previous plan. There is no account, cloud backup or cross-device sync; clearing browser storage removes the plan. Stable place IDs must be preserved or migrated.

## Verification

- ESLint, TypeScript and the production build pass.
- All 42 production Playwright checks pass across desktop Chromium and mobile WebKit. They cover three locales, all guides, image loading, overflow, navigation, search, keyboard controls, no-JavaScript content, on-demand 3D and canvas changes, reduced motion, WebGL fallback, maps, photo dialogs, saved-plan workflows, cross-tab updates, invalid/blocked storage and failed writes, plus print styling.
- Both development hydration regression checks pass with Grammarly-like attributes injected before hydration across all three locales and the 404 page.
- Visual review covers 1440px desktop and 390px mobile layouts, maps, expanded guides, Thai typography, saved trips, the 3D preview and active scene. An actual Thai A4 PDF was generated and inspected.
- One-off axe WCAG 2 A/AA and 2.1 AA scans report zero automated violations on `/en`, `/ja`, `/th`, `/th/destinations/kyoto`, `/en/destinations/tokyo`, `/th/credits` and a populated `/th/my-trip`. Reduced-motion mode avoids measuring transient entrance-animation opacity. This is not a full manual accessibility certification.
- New guide references were checked against official sources; failed references were replaced or removed. Photo sources and Natural Earth attribution are linked on the credits pages.
- A temporary configured-domain build verified all 24 sitemap URLs, canonical links, three language alternates and `noindex` on all three personal-trip routes. The final local build leaves the production origin unset.
- `npm audit --omit=dev`: zero reported production vulnerabilities.

### Initial-load measurement

A one-off Lighthouse mobile simulation against the local production `/th` page compared automatic 3D initialization with the user-activated scene, using the same browser and default mobile throttling. These are local lab measurements, not field Core Web Vitals or a performance guarantee.

| Metric | Automatic 3D | User-activated 3D |
| --- | --- | --- |
| Performance | 58 | 96 |
| Largest Contentful Paint | 5.3 s | 2.9 s |
| Total Blocking Time | 1,040 ms | 10 ms |
| Cumulative Layout Shift | 0 | 0 |

Accessibility, Best Practices and SEO scored 100 in the latter Lighthouse run. WebGL still costs CPU/GPU time when the visitor explicitly starts it; pause and reduced-motion controls remain available.

Not checked: physical phones or GPU calibration, production hosting/CDN behavior, field Core Web Vitals, live bookings or message delivery. No deployment was performed. WebGL2 is required for the interactive scene; its static preview and the travel guide remain available without it.
