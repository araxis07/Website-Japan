# Japan Travel renovation

## Scope and existing problems
- Preserve Japanese (default) and English, all nine editorial regions, seasonal discovery and destination guidance.
- Reach home/detail routes, navigation, footer, dictionaries, shared styles, metadata/schema, sitemap, manifest, build/lint config and browser checks.
- Baseline: Next 15.3.2 builds but Tailwind reports missing content configuration; random SSR decoration risks hydration errors; page transition hides content until JavaScript runs; contact/newsletter are simulations; footer and sitemap advertise nonexistent pages; unsupported locales silently get Japanese.
- No database or working contact delivery exists. Replace simulated forms and invented contact details with official visitor resources. No user records are migrated or deleted.

## Design
A photographic Japanese travel journal: snow white #f8f9f6, paper #ffffff, sumi #24332e, vermilion #b3332e, soft sakura #f4e6e5, mist #e8eeea. Georgia / Yu Mincho display type with a system sans-serif reading face. Left-aligned, generous readable spacing, restrained borders and rounded photo corners.

Layout: compact masthead → full-width photographic opening → destination discovery → north-to-south regional directory → interactive seasons → practical planning → editorial footer. On mobile, use a disclosure menu and single-column content. The Japan photography and Japanese letterforms carry the identity; avoid floating emoji, decorative gradients, blocking animations and generic dashboard tiles.

## Content policy
Sources reviewed 2026-10-22. Destination and planning links point to JNTO and transport operators. Recommended stay lengths are editorial suggestions. Seasons are broad planning windows, not live forecasts. Check official pages for dates, fares, access and entry requirements. This is an independent guide, not a booking service or JNTO affiliate.

## Implementation decisions
- Removed the unused utility CSS pipeline after moving all layout rules to explicit CSS; this fixes missing generated styles and removes its broad safelist and unused dependencies.
- Static prerendering for both locales and all six detail guides; only navigation, discovery and seasons need client state.
- `NEXT_PUBLIC_BASE_URL` controls domain-dependent SEO; no production domain is inferred from old placeholder metadata.
- System font stacks keep builds independent of external font availability. Photos are local, optimized by Next Image and have in-app source credits.
- Generated `.next` files were removed from version control while preserving the local build directory. No deployment or messaging was performed.

## Verification completed
- Production build, ESLint, TypeScript and diff whitespace checks pass.
- All 16 Playwright checks pass across desktop Chromium and mobile WebKit, including the back-to-top scroll-position assertion and production configuration loading without development dependencies.
- No page errors, hydration errors, broken visible images or horizontal overflow in the tested homepages. Visual review completed at 1440px desktop and 390px mobile, including destination and seasonal sections and a detail page.
- One-off axe WCAG 2 A/AA and 2.1 AA scan: zero automated violations on `/en`, `/ja`, two localized detail pages, credits and the global 404. This does not constitute a full manual accessibility certification.
- With a temporary test domain configured at build time: all 16 sitemap URLs return 200; canonical URLs, language alternates and robots refer to the configured origin. Final local build has no production domain configured.
- All destination, region and planning source links were checked; the outdated accommodation URL was replaced with JNTO's current accommodation guide.
- `npm audit --omit=dev`: zero reported vulnerabilities. Five affected development dependency entries remain in the current Next ESLint/glob/braces dependency chain; no compatible upstream fix was reported. No forced framework downgrade was applied.
- Icon generation and the ICO self-check pass. Clean-install dry run succeeds without peer-dependency overrides.

Not checked: physical phones, production hosting/CDN behavior, field Core Web Vitals, live booking or message delivery (neither service exists in this guide).
