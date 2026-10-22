# Japan Travel renovation

## Scope

Preserve Japanese (default) and English, all nine editorial regions, the six destinations and their URLs. Renovate home, destination guides, navigation, footer, planning, credits and error pages; keep metadata, icons, translations and browser checks aligned. No database, user records, booking service or message delivery exists in this guide.

The first renovation repaired the missing utility styles, removed random server-rendered decoration, made initial content readable without JavaScript, replaced simulated forms and nonexistent links, validated locales and upgraded Next/React. The second renovation adds the stronger Japanese identity, interactive 3D and expanded editorial content requested by the owner.

## Design and content

A Japanese travel journal in warm paper `#f6f2e9`, indigo `#23333d` and torii vermilion `#b33d2d`, with seasonal colors, serif display type, Japanese letterforms, local photography and paper-like route cards. System fonts avoid external font requests. Layouts adapt to desktop, tablet and mobile.

Home: editorial opening with a miniature Japan → destination search → six cultural experiences → regional directory → seasons → 7-, 10- and 14-day itineraries → practical planning and FAQs. Every destination now includes a three-part day plan, local food and pacing advice. Interface, new content and controls are available in both languages.

Sources reviewed on 2026-10-22 include JNTO guidance on destinations, tea ceremony, onsen, accessible travel, luggage, payment and responsible travel. The README and in-app links identify the original sources. Itineraries and stay lengths are editorial suggestions, not reservations or current transport schedules. Seasonal windows are approximate, not live forecasts. This is an independent guide, not a JNTO affiliate.

## Interactive scene and motion

`JapanDiorama` lazy-loads an original procedural Three.js scene near the viewport. The miniature contains Mount Fuji, a torii, trees, a bridge, a pagoda and lanterns. Visitors can drag to rotate, click a lantern or use the day/night button, change seasons, rotate/reset with buttons and pause animation. All actions have keyboard-accessible controls.

The scene caps pixel density at 1.5 and animation at approximately 30 fps, caches static shadows, pauses offscreen and in background tabs, and disposes graphics resources and listeners on unmount. Reduced-motion preferences disable autonomous motion. A local photo replaces the canvas if WebGL2 is unavailable or its context is lost. The scene is illustrative artwork, not a geographic reconstruction.

Native CSS and browser APIs provide section entrances, card tilt, image transitions, itinerary changes and reading progress. Content is server-rendered and stays visible without JavaScript. No animation framework, remote models or asset service is required.

## Runtime and SEO

- Static prerendering remains enabled for both locales and all six detail guides.
- `NEXT_PUBLIC_BASE_URL` controls domain-dependent SEO. No production domain is inferred from old placeholder metadata.
- The Grammarly attribute mismatch is handled only on the two root bodies with `suppressHydrationWarning`; descendant hydration checks remain enabled.
- One development server may use the project build directory at a time. The README explains how to reuse or stop an existing server. Test servers stop automatically.
- Generated build artifacts and test results remain ignored. No production deployment was performed.

## Verification

- ESLint, TypeScript, production build and diff whitespace checks pass.
- All 26 production Playwright checks pass across desktop Chromium and mobile WebKit. They cover both locales, all destination routes, metadata assets, visible images, overflow, navigation, filters, keyboard controls, FAQs, no-JavaScript content, canvas lighting/rotation/reset, reduced motion, WebGL fallback and itinerary integrity.
- Both development hydration regression checks pass with Grammarly-like attributes injected before hydration.
- Visual review completed at 1440px desktop and 390px mobile, including the miniature by day/night, destination cards, itinerary and detail pages.
- One-off axe WCAG 2 A/AA and 2.1 AA scans report zero automated violations on `/en`, `/ja`, `/en/destinations/kyoto`, `/en/credits` and the home page's night state. Reduced-motion mode avoids measuring transient entrance-animation opacity. This is not a full manual accessibility certification.
- All 12 new experience and planning reference links return HTTP 200. Existing destination/region sources and configured-domain SEO were checked in the first renovation.
- `npm audit --omit=dev`: zero reported production vulnerabilities. Five affected development dependency entries remain in the upstream Next ESLint/glob/braces chain; no forced downgrade was applied.
- Icon generation and the ICO self-check pass.

Not checked: physical phones or GPU calibration, production hosting/CDN behavior, field Core Web Vitals, live bookings or message delivery. WebGL2-capable hardware is required for the miniature; the photo fallback preserves access to the guide.
