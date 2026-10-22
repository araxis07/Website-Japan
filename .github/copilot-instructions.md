# Japan Travel development notes

This is an independent Japanese/English travel guide. Keep Japanese as the default locale and maintain translation parity.

Use the existing components, dictionaries and `src/data/travel.ts`. The design uses sumi green, vermilion, restrained sakura tones, serif headings and local travel photography. Styles live in `src/app/globals.css`; there is no Tailwind pipeline.

Use Next Image for photographs, server components for static content, native HTML for disclosures and accessible client controls only where needed. Respect reduced motion and visible keyboard focus. Do not hide initial content behind JavaScript or use random render-time values.

New internal links must point to implemented pages. Validate locale and destination parameters. Never simulate successful form delivery or invent contact details. Travel guidance needs an official source; keep suggestions distinct from current rules and forecasts. Do not change the review date without checking the content.

Run lint, typecheck, production build and appropriate Playwright checks after substantive changes. Do not commit generated `.next` or test-result files.
