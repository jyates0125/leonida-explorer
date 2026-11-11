# Team Jura Atlas 5.4 — GTA Map Explorer

**Unofficial, free, noncommercial fan project** by Team Jura / Elario Studios. Not affiliated with, endorsed by, or sponsored by Rockstar Games, Take-Two Interactive, GTADB.org, or GTAWeb.eu.

## Explore
- [Homepage](https://jyates0125.github.io/leonida-explorer/)
- [GTA V Story](https://jyates0125.github.io/leonida-explorer/atlas.html)
- [GTA Online](https://jyates0125.github.io/leonida-explorer/atlas-online.html)
- [GTA VI Leonida](https://jyates0125.github.io/leonida-explorer/atlas-vi.html)
- [GTA Online toolkit](https://jyates0125.github.io/leonida-explorer/atlas-toolkit.html)
- [Reference catalog and garage tracker](https://jyates0125.github.io/leonida-explorer/atlas-catalog.html) (5.4, after deployment)
- [Credits](https://jyates0125.github.io/leonida-explorer/atlas-credits.html)
- [Project Showcase](https://jyates0125.github.io/leonida-explorer/project.html)
- [Elario Studios — Coming Soon](https://jyates0125.github.io/leonida-explorer/elario.html)

## Version 5.4 additions
- [Collectibles checklist](https://jyates0125.github.io/leonida-explorer/atlas-checklist.html) — 20 checked set counts, 955 personal tracking slots, 100% Story Mode thresholds, separate Story/Online progress, export/import, daily resets for rotating sets. **Slots are not mapped game coordinates.**
- [Data and verification hub](https://jyates0125.github.io/leonida-explorer/atlas-verification.html) — coverage matrix, source links, data dictionary, on-demand GitHub landmark source counting, and explicit GTA VI unverified labeling.
- `atlas-schema.json` defines database fields for catalog identities, vehicles, weapons, properties, businesses, garages, missions, events, source evidence, inventory, collections, and coordinates.
- `atlas-catalog.json` has 261 curated GTA V/Online references and 18 GTADB GTA VI research landmarks (all **UNVERIFIED**); CSV export is in `atlas-catalog.csv`. No falsely asserted game spawn points or prices.

## Features
Map views, GTADB landmarks, searchable categories, marker controls, routes, local progress tracking, and a GTA Online business toolkit. Atlas 5.4 adds a searchable reference catalog, custom garages, and personal vehicle inventory. Catalog entries do not imply verified spawn coordinates or complete coverage. GTA VI locations are provisional community reconstructions. Browser-stored progress does not synchronize with Rockstar; export backups before clearing data.

Atlas 5.4 adds shareable per-landmark links, a student/community project showcase, a standalone Elario Studios coming-soon page, and contribution guidelines. Select a mapped GTADB pin and choose **Share**; the link can also be opened with `?place=gtadb-5-L8` (a documented GTADB landmark). This only shares public source landmarks, not custom locally saved pins.

## Data sources, licenses, and inspiration

**GTADB.org** — [public repository](https://github.com/rolux/gtadb.org). The maintainers explicitly welcome reuse of their published landmark data, photos and map tiles. Code: MIT; data: **CC BY 4.0**, attribution **GTADB.org and all contributors**. Team Jura normalizes categories, adapts coordinate presentation, adds independently implemented marker and tracking controls, and may cache repository-hosted map assets. Check individual assets for any additional rights. **Do not repeatedly fetch data or media from GTADB's production server**; obtain them from its GitHub repository.

**GTAWeb.eu** — [website](https://gtaweb.eu/) · [public issues and suggestions](https://github.com/PLTytus/GTAWeb). We use its feature descriptions, public issues, and suggestions as a benchmark for usability and functionality. Its public GitHub repository is an issue/suggestion tracker, **not a grant to reuse unpublished source code, coordinates, databases, icons, or artwork**. We implement comparable features independently and credit inspiration.

**Rockstar Games / Take-Two Interactive** — Grand Theft Auto names, game art, and related marks belong to their owners. Being an unpaid fan project does not itself provide permission to copy protected content.

## Contribute and report issues
Open GitHub issues for reproducible bugs, desired features, missing locations, and independently verifiable source links. Search existing issues first. For location reports, specify game/mode, category, source URL, approximate coordinate and confidence level (confirmed/estimated). Do not submit leaked, private, or unlicensed assets. Pull requests and suggestions are welcome, subject to review of licenses and provenance.

**Reuse:** Everyone can use and link to the free fan tool. Original Team Jura code is available under the separate [MIT source-code license](LICENSE-TEAM-JURA-CODE.md); third-party tiles/data/art retain their own rights. Names and logos are not licensed for unrelated branding. Read [contribution guidelines](CONTRIBUTING.md) and the [school/community portfolio](PROJECT-PORTFOLIO.md).

## Development and deployment
GitHub Pages publishes from `main`; `GTA-maps` is the development branch. Extract and upload the deployable files to the repository root; never upload the ZIP itself. Atlas 5.4 does not include `index.html` and should not replace the existing homepage. Test map alignment, navigation, progress backups and credits after deployment.

## Limitations
The bundled GTA V/VI GTADB JSON files contain only small offline starter subsets; full landmark records load from GitHub at runtime. These are **landmarks**, not a complete weapon, vehicle, collectible, business, or spawn-location database. The catalog is a reference/tracking foundation, not verified gameplay spawn data. As of this build GTA V has not been exhaustively verified item-by-item; a completed collection checklist counts toward user tracking, not map coverage. Some views require internet access. Last reviewed 2026-11-11.

**Current demo note:** A successful local simulated-browser test is not a production hosting test; verify the published GitHub Pages site before public showcase.

## Correctness / coverage policy
There is no claim that GTA V is a 100% complete database. We have checked the selected collection counts against linked guides. Full GTA V/VI community landmarks can load from licensed GTADB GitHub at runtime; no GTA V per-item collectible coordinate database or comprehensive ~800+ vehicle catalog is bundled. On the 6 map, community landmarks and all 18 starter research records are **UNVERIFIED** until gameplay confirmation. See `atlas-verification.html`.
