# Atlas 6.2 — Tool-by-tool parity audit

**Prepared 12 November 2026 · Team Jura × Elario Studios**

This is a comparison of publicly observable functionality, NOT permission to copy a competitor's software or database. “Atlas” statuses reflect the packaged code and basic static tests; **actual browser rendering against live external tile hosts remains unverified in this environment**. GTADB.org and GTADB.net are different destinations; data/license permissions are not interchangeable. GTA VI reference coordinates remain provisional.

## Primary public references

- GTADB.org original map: https://map.gtadb.org/ (user-supplied screenshot shows 920 locations and the list/photo presentation)
- GTADB open map implementation: https://github.com/rolux/gtadb.org/blob/main/maps/maps.js (2D tiles, layering, source map styles, landmark navigation)
- GTADB 3D: https://github.com/rolux/gtadb.org/blob/main/maps/maps3d.js and https://github.com/rolux/gtadb.org/blob/main/maps/maps3dflat.js
- GTADB data license: https://github.com/rolux/gtadb.org/blob/main/LICENSE-DATA ; exceptions and game IP remain applicable.
- GTADB tool overview: https://gtadb.org/ (original GTA IV/V/VI map, experimental Leonida, local markers editor, guessr)
- GTAWeb main map/tool navigation: https://gtaweb.eu/ ; GTA Online Toolkit: https://gtaweb.eu/gtao-toolkit ; maps: https://gtaweb.eu/gtao-map/ls/0 and https://gtaweb.eu/gtao-map/cp/-/cayo-perico-heist
- GTAWeb settings policy provides evidence of crossed-off map markers and synced settings: https://gtaweb.eu/policy

## Map and explorer parity

| Tool / behavior | Source | Atlas 6.2 package | Next work / qualification |
|---|---|---|---|
| GTA V Story map | Both | Implemented | Confirm live radar/satellite imagery after deployment |
| GTA Online Los Santos map | GTAWeb | Implemented | Same map tiles, separate progress; confirm live image |
| GTA VI Leonida map | GTADB + GTAWeb | Implemented | Provisional community reconstruction |
| GTA Online Cayo Perico separate map | GTAWeb | **Not implemented** | Requires authorized artwork and calibrated coordinates |
| Other GTA game maps (IV, VC, SA, etc.) | GTAWeb / GTADB | **Not implemented** | Out of V/Online/VI scope, rights/data review needed |
| GTA V satellite / terrain / roadmap / hybrid | GTADB | Implemented | Live host test pending |
| GTA V in-game radar | GTADB | Repair in 6.2: main tile host + repository fallback | Requires live verification of fix |
| GTA VI Yanis V15 / V17 | GTADB | Implemented | Original credited artwork |
| GTA VI Dupzor V51 / Cyber | GTADB | Implemented | Legacy Cyber falls back to Yanis where needed |
| Scaly and Loki illustrated views | Atlas original presets | Implemented | Team Jura names are style presets, **not** separate third-party maps |
| Source map overlays / patchwork | GTADB | Partial | Certain patches were intentionally retired in 6.1; restore only when verified |
| Interactive pan, zoom, touch, reset | Both | Implemented | Browser smoke test pending |
| All individual color-coded landmark pins | GTADB | Implemented | Source colors where supplied, otherwise Atlas category colors |
| Always visible landmark directory | GTADB | **Improved in 6.2** | Search + sorted paginated list in main sidebar |
| Name / reference-address search | GTADB | Implemented | Filters accessible in all game worlds |
| Region / area filter | GTADB | Implemented | Based on name/district/tags, not geocoded polygons |
| Sort by name | GTADB | Implemented | A–Z |
| Sort by in-game address / region | GTADB | Approximate | Region/name grouping; true standardized game street address not in all records |
| Sort by proximity to map center | Atlas addition | **Added in 6.2** | World-unit proximity only |
| Location count and pagination | GTADB | **Improved in 6.2** | 40 results/page, retains entire filtered dataset |
| Toggle all or per-category pins | GTAWeb / GTADB | Implemented | Expand “Map categories & filters” drawer |
| Confirmed vs unverified filter | GTADB | Partial | Atlas marks VI provisional until external confirmation |
| Favorites / hide visited | GTAWeb-style completion | Implemented | Local browser storage |
| Searchable collection categories | GTAWeb | Implemented when data exists | Source coverage is not complete for every collectible |
| Location photo pane | GTADB | Implemented | Per-landmark photo loads only where upstream image is published |
| Full photo gallery / before-after carousel | GTADB | **Not implemented** | Need licensed, indexed multi-image data and UI |
| In-game/real-world coordinates and reference address | GTADB | Implemented | Reference does not imply Rockstar game address |
| Map coordinate finder & sharable coordinates | GTADB / GTAWeb-inspired | Implemented | Game-space X/Y; not Google lat/long navigation |
| Nearby places and radius | Atlas original | Implemented | Unit radius; no travel-time promise |
| Copy/share direct place link | Both | Implemented | Source-based linked IDs, no account needed |
| Custom markers | GTAWeb / GTADB markers | Implemented | Local pins and backups |
| Marker tags, photos and cloud sharing | GTADB markers editor | Partial / missing | Imported packs support tags, personal images/sharing not yet |
| Offline starter records | Atlas original | Implemented | Small starter only; full dataset requires first online fetch |
| Save tile overview offline | Atlas original | Implemented | Low zoom only, quota and CORS limits apply |
| Download matching records as CSV | Atlas addition | **Added in 6.2** | Includes source/uncertainty labels |
| Import licensed map data packs | Atlas original | Implemented | Validates attribution/license, reject unauthorized packs |
| Visible tile network health | Atlas addition | **Added in 6.2** | Health cannot establish image quality or data license by itself |

## Navigation, 3D and game utilities

| Tool / behavior | Source | Atlas 6.2 | Qualification |
|---|---|---|---|
| 2D GTA map | Both | Implemented | Map artwork still needs live verification |
| 3D tilt / perspective / orbit | GTADB | Partial | Native WebGL engine + visible 2D-perspective fallback |
| True elevation terrain | GTADB | Conditional | Needs validated/licensed height data; importing local heightfield supported |
| GTA V/VI Google Maps geographic comparison | GTADB | **Not integrated** | Requires independent Google Maps key, terms, quota and proper transforms |
| Multi-stop directions interface | GTADB | Implemented | Up to 12 stops in named-navigation UI |
| Direct-line route preview | Atlas original | Implemented | Not a driving route |
| Road-following directions & ETA | GTADB experiment / requested | **Not verified** | Requires licensed road graph; do not claim without data |
| Reverse and nearest-next stop | GTADB-inspired / Atlas | Implemented | Greedy ordering, no network optimization guarantee |
| 100+ collectible tour | GTAWeb-style / Atlas | Implemented | Auto route can order up to 250, direct-line only |
| In-game compass/coordinates | Atlas original | Partial | Coordinates and north/3D controls available |
| GTA Online sale high-demand bonus calculator | GTAWeb Toolkit | **Not implemented** | Dedicated business logic and testing needed |
| GTA Online timers, alarm and cycle tools | GTAWeb Toolkit | **Not implemented** | Dedicated toolkit; cannot claim parity |
| Daily/weekly challenge tracking | GTAWeb Toolkit | Partial / missing | Separate checklists exist, not synchronized challenges |
| Casino wheel timer | GTAWeb Toolkit | **Not implemented** | Future toolkit |
| MC business / nightclub / bunker stock & safes | GTAWeb Toolkit | **Not implemented** | Source of timers/profit formulas required |
| GTA Online business guide and checklists | GTAWeb Toolkit | Partial | Existing Atlas toolkit, catalog, and completion pages |
| GTAWeb cloud account progress sync | GTAWeb | **Not implemented** | Intentional guest-only app; local JSON export/import instead |
| GTADB marker editor import/export/share | GTADB.org | Partial | Local export/import, not a full graphical marker studio |
| GTADB screenshot guessing game | GTADB.org | **Not implemented** | Different project, optional future expansion |

## Accuracy and legal boundaries

- Do not ingest GTAWeb's copyrighted map/database; its public pages are used as user-experience references only.
- GTADB.org's `LICENSE-DATA` covers published data/image files under CC BY 4.0 **subject to stated exceptions**; credit GTADB contributors and the individual map artists. Rockstar trademarks and game assets belong to their owners.
- Community map reconstructions and identified real-world reference addresses are not official GTA VI confirmations.
- `gtadb.net` is a separately operated site. Its impressive searchable maps and game-specific collectible counts do not imply permission to copy its dataset.
- Any tile server may fail, rate-limit, change its CORS rules or change its address. Atlas now tries the publisher map server first and its published GitHub repository mirror second, then reports unavailable tiles.
- Verified browser rendering on GitHub Pages, photo availability, exact source counts, modern collector completeness, and 3D elevation still need on-device testing.

## Priorities for Atlas 6.3 / later

1. Verify live V radar and VI Scaly/Loki tile requests and CORS; capture screenshots from Windows and iPhone.
2. Confirm 3D WebGL textured map loads on devices; obtain validated licensed heightfield before advertising true relief.
3. Full documented collectible coverage for GTA V/Online, Cayo Perico, event and seasonal packs; source/license review for each.
4. Complete per-location photos and additional photo metadata.
5. Licensed GTA road graph for drivable routes; only then publish turn-by-turn road instructions.
6. Expand Atlas Toolkit into tested GTA Online earnings and timer modules, without copying GTAWeb code.
7. Add optional user-created marker images/tags and group sharing with safe export/import.


## UV art verification correction

- GTAWeb GTA V/Online provides a separate *UV-light illustrated blueprint* map option. It is not simply a blue background. Sources: https://gtaweb.eu/gtao-map and https://gtamap.io/gta-5-interactive-map/ (describes original collector blueprint vs other styles).
- Atlas 6.2 UV now applies its own blacklight-blue treatment to CC BY 4.0 GTADB radar **illustration tiles**, with illustrated roadmap and satellite fallbacks. Atlas UV II provides a warmer map illustration.
- **Important non-parity:** Team Jura's blue UV treatment does not reproduce the special-edition UV map's actual secret markings or GTAWeb's copyrighted UV map. An independently permitted true-UV map asset with calibrated coordinates would be required for 1:1 artwork accuracy.
- Named map-layer controls now appear for clovers, Ammu-Nation, vehicle spawns, property sites, collectibles and activities when coordinate records support them. All are click-to-show/hide; story/Online/VI state is isolated. These are not claims of complete source coverage.


### Cross-game UV layer parity (verified against published sources 12 November 2026)

| Game | GTAWeb | GTADB.org published map | Team Jura Atlas 6.2 UV | Qualification |
|---|---|---|---|---|
| GTA V Story | UV Light view reported in GTAWeb interface and third-party independent documentation | Radar / roadmap / satellite / terrain / hybrid illustrations in `maps/maps.js` | **UV Blueprint** on illustrated radar + **UV II Paper** on illustrated roadmap | Team Jura's UV appearance is an original treatment, NOT GTAWeb's exact map or hidden UV symbols. Browser artwork requires verification. |
| GTA Online | UV Light map option in GTAWeb map interface | GTA V basemap; GTADB.net has additional Online marker families | **Both V UV choices**; separate Story/Online category state | Same world artwork, different game-mode pins and saved state; live verification pending. |
| GTA VI | Interactive map is linked as `gtavi-map`; the JavaScript-based public page did not expose a confirmable UV option or 6 view list when checked | YANIS V17/V15, DUPZOR V51, CYBER community illustrations; experimental 3D | **UV Leonida Blueprint** using YANIS V17 / fallbacks, **UV II Leonida Paper** using DUPZOR V51 / fallbacks; Scaly/Loki remain | **Creative styles**, not game-authentic UV light or claim that GTAWeb VI UV currently exists. All GTADB underlying data remains source-linked. |

Sources: https://gtaweb.eu/gtav-map ; https://gtaweb.eu/gtao-map ; https://gtaweb.eu/gtavi-map ; https://github.com/rolux/gtadb.org/blob/main/maps/maps.js ; https://github.com/rolux/gtadb.org/blob/main/LICENSE-DATA ; https://contilnetnoticias.com.br/lite/esports/gta-web-conheca-site-com-mapa-completo-de-gta-online-e-saiba-como-usar .


## Atlas 6.2.1 — Layer-by-layer improvements and remaining gaps

The always-visible Team Jura layer deck offers 27 named, mapped-only filters and up to 32 source-provided collectible categories, plus full category on/off controls, tool tabs and source-layer switches. GTA V Story, GTA Online and GTA VI retain independent category and named-layer visibility. Since GTAWeb's live JavaScript category inventory cannot be fully observed from its public HTML, this is **not a claim that every GTAWeb label is reproduced**. The category inventory is source-grounded; the Atlas app does not invent point coordinates or claim inferred places are interactable in-game. See `MAP-VIEWS-AND-LAYERS-6-2-1.md` for the UV comparison in all three game modes.
