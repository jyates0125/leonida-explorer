# Team Jura Atlas 6.0 — Multi-stop navigation, 2D/3D maps and guest-only access

## Atlas 5.7 — Combined collectibles & optional world-object overlays

This package **includes the 5.6 Collectibles Completion Edition** (no separate 5.6 upload required). Core world data and source overlays are loaded from the publishers' JSON files on demand; datasets are not embedded or republished in this ZIP. Published 22 world-object reference lists total **33,912 coordinates**, from MiniMaps for FiveM (derived from DurtyFree). They are **not collectible pickups**. All 22 are optional, and all high-volume layers are off by default. Calibrated community Story Mode sources cover 276 positions; those positions are not all individually verified in gameplay. GTA VI points are community/provisional.

- Story collectible tracker: [atlas-completion.html](./atlas-completion.html). Progress now shares `jura3-progress` with the GTA V map. Existing set-slot checklists remain supported; numbering may differ between guides.
- 22 optional base-world object layers: source selectors on the GTA V / Online map. Toggle a category to fetch it. District and model names are searchable in the main search bar. Source counts are *published*, not verified live loaded counts.
- Map route transfer: Select category, plan unfinished route on completion page, then choose **Open this entire route on GTA V map**. This is straight-line waypoint ordering, **not** road or air navigation.
- Site checks: [atlas-test-center.html](./atlas-test-center.html) includes offline structural and fixture checks and optional live endpoint checks. Real-world map artwork and third-party feeds require post-deployment browser verification.
- Source license references: [MiniMaps locations](https://fivem-minimaps.com/locations) explicitly permit reuse of JSON/CSV in resources; [danharper/GTAV](https://github.com/danharper/GTAV) WTFPL; [GTADB](https://github.com/rolux/gtadb.org) CC BY 4.0; [Mapheist](https://mapheist.com/) CC BY 4.0. Attribute underlying contributors.
- Not included without further rights verification: MapGenie images, GTAWeb's proprietary database, third-party unlicensed collectible dumps. Rockstar/Take-Two retain game IP rights.

## Atlas 5.6 — Collectibles Completion Edition

- [Mapped collectible tracker](./atlas-completion.html): 276 GTA V Story Mode source records loaded via the Atlas 5.5 calibrated adapter; searchable, checkable, with nearest-neighbor route ordering, deep links to map search and exportable progress.
- The mapped tracker shares the existing `team-jura-checklist-v54` storage key. Matching collection categories synchronize using source order, **which is not guaranteed to match the in-game or guide numbering**. Back up progress before relying on cross-view numbering.
- Source data loads at runtime from the original publicly licensed repository. If offline and not cached, the tracker cannot display the records.
- GTA Online collections and GTA VI are not claimed as fully mapped. GTAWeb is research inspiration only, not a copied database.

**Unofficial, free, noncommercial fan project** by Team Jura / Elario Studios. Not affiliated with, endorsed by, or sponsored by Rockstar Games, Take-Two Interactive, GTADB.org, or GTAWeb.eu.

See [Release 5.8 notes](RELEASE-ATLAS-5-8.md) for all map views, current tile overlays, cache refresh, original UV styles, original markers, guest progress and passwordless-only account policy.

## Explore
- [Homepage](https://jyates0125.github.io/leonida-explorer/)
- [GTA V Story](https://jyates0125.github.io/leonida-explorer/atlas.html)
- [GTA Online](https://jyates0125.github.io/leonida-explorer/atlas-online.html)
- [GTA VI Leonida](https://jyates0125.github.io/leonida-explorer/atlas-vi.html)
- [GTA Online toolkit](https://jyates0125.github.io/leonida-explorer/atlas-toolkit.html)
- [Reference catalog and garage tracker](https://jyates0125.github.io/leonida-explorer/atlas-catalog.html) (reference catalog from Atlas 5.4; unchanged in 5.5)
- [Calibration and data sources](https://jyates0125.github.io/leonida-explorer/atlas-calibration.html)
- [Credits](https://jyates0125.github.io/leonida-explorer/atlas-credits.html)
- [Project Showcase](https://jyates0125.github.io/leonida-explorer/project.html)
- [Elario Studios — Coming Soon](https://jyates0125.github.io/leonida-explorer/elario.html)

## Version 5.5 additions — Map calibration and approved source overlays

- **GTA V Story Mode:** automatically retrieves `danharper/GTAV`'s 276 public community locations (WTFPL) and transforms Leaflet pseudo-geo coordinates to actual game-world X/Y using an eight-anchor Web-Mercator fit. Six further holdout locations differed by about 0–2 world units from independent published coordinates. Individual pickups and challenge entry points still require gameplay verification.
- **GTA VI:** optionally retrieves Mapheist's public CC BY 4.0 trailer research; 77 of 94 records had YANIS v16 pixel positions as of November 11, 2026. Converted to GTADB's centered 32,768-unit grid. All imported records remain **PROVISIONAL**, since differences between reconstructed map versions may shift features.
- **GTA V/Online world objects:** four optional feeds from MiniMaps for FiveM, publisher-permitted JSON reuse: 121 ATMs, 157 gas pump/air-service objects, 49 bus stops and 125 radio masts (452 positions). Base-map objects are not automatically collectible locations or usable Online services.
- **Controls:** source-by-source overlay switches, source status and refresh, configurable marker grouping, exact X/Y coordinate jump crosshair, source links, source-specific shareable locations and <a href="atlas-calibration.html">source/calibration report</a>.
- **Safety and performance:** original Atlas 5.4 routes, bookmarks and progress keys are unchanged. Denser prop overlays default OFF. New feeds load only from explicitly published JSON endpoints and are cached after success; failures do not block GTADB maps. Not all external hosts' live CORS behavior is verified across browsers.
- No GTAWeb database, artwork or tiles are copied; GTAWeb remains a feature-troubleshooting reference. Sources and rights holders are credited separately.

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
GitHub Pages publishes from `main`; `GTA-maps` is the development branch. Extract and upload the deployable files to the repository root; never upload the ZIP itself. The Atlas 5.5 direct-upload release includes the upgraded `index.html` and should replace the older 5.4 homepage. Files are uploaded unpacked into the root of `main`. Test map alignment, navigation, progress backups and credits after deployment.

## Limitations
The bundled GTA V/VI GTADB JSON files contain only small offline starter subsets; full landmark records load from GitHub at runtime. These are **landmarks**, not a complete weapon, vehicle, collectible, business, or spawn-location database. The catalog is a reference/tracking foundation, not verified gameplay spawn data. As of this build GTA V has not been exhaustively verified item-by-item; a completed collection checklist counts toward user tracking, not map coverage. Some views require internet access. Last reviewed 2026-11-11.

**Current demo note:** A successful local simulated-browser test is not a production hosting test; verify the published GitHub Pages site before public showcase.

## Correctness / coverage policy
There is no claim that GTA V is a 100% complete database. We have checked the selected collection counts against linked guides. Full GTA V/VI community landmarks can load from licensed GTADB GitHub at runtime; GTA V Story community locations now load from the independently licensed source at runtime; complete GTA Online coordinate coverage and a comprehensive ~800+ vehicle catalog are not yet verified. On the 6 map, community landmarks and all 18 starter research records are **UNVERIFIED** until gameplay confirmation. See `atlas-verification.html`.

## Atlas 5.7 Location Edition enhancements

- Search any published name, coordinates, source, or object model, with an optional **area/neighborhood** text filter; district names come from MiniMaps' game zone mapping when object layers are enabled.
- **Nearby discovery** can search around the selected pin, coordinate target, or map center; choose a 250–5,000 GTA world-unit radius and add up to 12 unfinished nearby pins to a route. Straight-line distances are not travel times or road-network distances.
- **Share exact coordinates** using portable `?x=...&y=...&zoom=...` links, even for areas without verified pins. Source-backed map pins continue to use `?place=` links.
- All location discovery is game-mode aware. GTA V Story Mode and Online progress remain distinct. Heavy object overlays default off; selecting an overlay opts in to loading its published feed.

- Use **Use map center X/Y** to turn the current viewport center into a persistent crosshair, then Copy exact map link. No coordinate typing is necessary.
- Wrecked vehicles from object dumps are **static props**, not vehicle-spawn locations; their layer is classified as world objects, separate from collectible and vehicle-spawn records.


## Atlas 5.9 navigation additions
- GTA VI retains YANIS, DUPZOR, CYBER and licensed community patch map selections; GTA VI UV and UV II options are removed. GTA V and Online UV views remain.
- Quick **Directions** shortcut opens the existing route builder. Its distances are straight-line estimates, not turn-by-turn road navigation.
- **Source photos** displays GTADB licensed in-game images for a selected landmark where available; it is not a complete photo/satellite map.
- **2D overview** resets the map view. **3D reference** opens GTADB externally; Atlas does **not** implement native 3D rendering yet.
- This release does not import new landmark data or modify saved progress. Community patch art remains mixed-style as designed.


## Atlas 6.0: GTADB-inspired navigation and 3D

[Read the 6.0 release notes](RELEASE-ATLAS-6-0.md). This update supersedes 5.9, retains saved-game progress, and adds an original Elario Studios 2D/3D WebGL interface, named-location multi-stop routes, optional licensed roads and optional local terrain elevation. **Without verified road data, directions remain direct-line previews. Without supplied elevation binary, the 3D view is an interactive flat-perspective plane.**


## Team Jura Atlas 6.0 · Navigation and WebGL 3D
An in-app GTADB-style 2D/3D explorer, named-landmark search and multi-stop route planning. 3D uses GTADB elevation **when fetchable**; flat perspective otherwise. Routes are straight-line previews unless a independently validated, properly licensed game-coordinate road graph is supplied. See [release guide](RELEASE-ATLAS-6-0.md). Elario Studios is the creator of this unofficial fan tool, not the owner of GTA game assets.
