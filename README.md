# 日本旅行 · Japan Travel

An independent Japan travel guide with practical advice, interactive maps and personal trip planning for all 47 prefectures.

**Languages:** Japanese (`/ja`, default), English (`/en`) and Thai (`/th`).

## Features

- First-visit guidance, prefecture highlights and suggested itineraries.
- Searchable street maps with filters and Google Maps directions.
- Day-by-day trip plans with personal stops, accommodation, notes and budget estimates.
- JSON backup/import, offline HTML, calendar export and print/PDF.
- Japanese-inspired light/dark themes, on-demand 3D scenery and motion controls.

Built with **Next.js 16, React 19, TypeScript, Leaflet and Three.js**. No database or API key is required for local use.

## Run locally

Use **Node.js 24** and npm.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). `/` redirects to `/ja`. Keep one development server running per working copy; reuse or stop an existing server before starting another.

## Checks

```sh
npm run lint
npm run build
npm run typecheck
npx playwright install chromium webkit firefox
npm test
```

Playwright starts its own production server on port **3100**, covering Chromium, mobile WebKit and a targeted Firefox suite. [GitHub Actions](https://github.com/araxis07/Website-Japan/actions/workflows/quality.yml) runs the quality checks automatically.

## Production setup

Set `NEXT_PUBLIC_BASE_URL` to the real HTTPS origin **before building** to enable canonical URLs and the sitemap. Available settings are documented in [.env.example](.env.example).

```sh
npm run build
npm run start
```

Maps use [OpenStreetMap](https://www.openstreetmap.org/copyright) tiles and require internet access. Follow the [tile usage policy](https://operations.osmfoundation.org/policies/tiles/); custom providers and deployment checks are covered in [release operations](docs/release-operations.md).

## Trip data and travel information

Plans stay in the current browser; there is no account or cloud sync. Clearing site data removes them, so download a JSON backup to keep a separate copy. Full backups can contain private notes, accommodation and personal coordinates; redacted JSON/HTML exports are also available.

Map pins are reference locations, not verified entrances. Venue details link to official sources and review dates; missing information remains marked as unverified.

## Editing and documentation

| Location | Purpose |
| --- | --- |
| `src/app/`, `src/components/` | Pages, UI and shared interactions |
| `src/data/` | Places, guides, itineraries, visitor facts and photo credits |
| `src/i18n/dictionaries/` | Japanese, English and Thai interface text |
| `public/images/` | Local images |

Keep translation keys aligned, preserve stable place IDs, and update only facts and review dates checked against their sources. Photo sources and licenses are listed on each language's `/credits` page.

- [Release setup, content review and privacy](docs/release-operations.md)
- [Team ownership and development roadmap](docs/roadmap-2026-10-29.md)
- [Latest planning, content validity and measured results](docs/planning-clarity-2026-10-31.md)

This project is not affiliated with JNTO.
