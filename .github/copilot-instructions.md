# Japan Travel development notes

This is an independent Japanese/English/Thai travel guide. Keep Japanese as the default locale and maintain translation parity.

Use the existing components, dictionaries and `src/data/` modules. The design uses warm paper, indigo, vermilion and seasonal sakura tones, serif headings and local travel photography. Styles live in `src/app/globals.css`; there is no Tailwind pipeline.

Use Next Image for photographs, server components for static content, native HTML for disclosures and accessible client controls only where needed. Respect reduced motion and visible keyboard focus. Do not hide initial content behind JavaScript or use random render-time values.

New internal links must point to implemented pages. Validate locale and destination parameters. Never simulate successful form delivery or invent contact details. Travel guidance needs an official source; keep suggestions distinct from current rules and forecasts. Do not change the review date without checking the content.

Run lint, typecheck, production build and appropriate Playwright checks after substantive changes. Do not commit generated `.next` or test-result files.

The home-page Three.js scene lives in `src/lib/japan-scene.ts` and loads through `JapanDiorama`. Load it only after the visitor activates the preview. Keep its local miniature-image fallback, keyboard controls, reduced-motion behavior, offscreen/background pause and GPU cleanup. Scene assets are procedural; do not add external model services. Use native CSS and browser APIs for page motion.

Personal trips use validated, versioned localStorage. Preserve stable place IDs and never silently overwrite unreadable data. Keep storage failure handling, cross-tab updates and print styles. Maps use Leaflet and real OpenStreetMap tiles with visible attribution and failure/retry handling. Preserve keyboard selection and list alternatives. Named Google Maps links provide external directions; the site does not calculate routes. Prefecture and first-visit content must be complete in all three languages. Global day/night appearance and CSS 3D petals live in Atmosphere; retain reduced-motion, pause and storage-failure behavior. Reserve WebGL startup for the user-activated miniature.
