# Team Jura Atlas 6.2.1 — UV and layer-view comparison

**Reviewed 12 November 2026.** The GTAWeb site renders most of its live interactive map interface client-side; available HTML confirms it offers GTA V, Online, and VI maps but does **not** expose a complete category inventory or prove each selectable VI map view. GTADB.org publishes its source map selections openly. Conclusions below distinguish evidence from assumptions.

| Game and view | Basemap used in Team Jura | Our treatment and fallbacks | Source reference | What is NOT verified |
|---|---|---|---|---|
| GTA V Story: In-game Radar | `5/radar` | GTADB original radar illustration; GTADB tile server then repository mirror | `maps/maps.js` | Real network render in GitHub Pages |
| GTA V Story: Satellite, Terrain, Roadmap, Hybrid | Matching `5/*` | Exact geographically mapped, separately selectable licensed views | `maps/maps.js` | Live per-view imagery and color fidelity |
| GTA V Story: UV illustrated blueprint | `5/radar` | Team Jura blue/UV-style color treatment over **illustrated tiles**; try roadmap then satellite if unavailable | GTADB licensed radar + GTAWeb UX reference | Not GTAWeb's exact UV map or its secret markings |
| GTA V Story: UV II illustrated paper | `5/roadmap` | Team Jura original warm paper treatment; radar then satellite fallback | GTADB licensed roadmap | Appearance needs browser review |
| GTA Online: seven GTA V map styles | Same licensed V map geometry | Separate **Online-only** source labels, progress and category toggles; two illustrated UV treatments included | GTAWeb Online; GTADB map | Not all seasonal Online collectibles have verified coordinates |
| GTA VI: Scaly | `6/yanis,17` | Slightly saturated Team Jura treatment; preserve original YANIS | GTADB YANIS V17 | Not distinct new geography, not official launch map |
| GTA VI: Loki | `6/dupzor,51` | Muted-contrast Team Jura treatment; preserve DUPZOR | GTADB DUPZOR V51 | Not a separate authored map layer |
| GTA VI: Original source views | YANIS V17/V15, DUPZOR V51, CYBER | Four original selections, CYBER fallback to YANIS | GTADB `maps/maps.js` | Map reconstruction is provisional |
| GTA VI: UV Leonida blueprint | `6/yanis,17` | Team Jura blue ultraviolet-style recoloring **of YANIS illustrated map**; fallback YANIS15 then DUPZOR | GTADB YANIS licensed illustration | **Not an actual GTA VI UV map**, not proven present in GTAWeb's VI menu |
| GTA VI: UV II Leonida paper | `6/dupzor,51` | Team Jura warm illustration; fallback YANIS V17/V15 | GTADB DUPZOR licensed illustration | No official VI UV blueprint or secret clues claimed |
| GTA V/VI 3D | Team Jura WebGL + optional local elevation | Native 3D uses licensed 2D map as texture where CORS permits; tilted 2D fallback remains visible until texture loads | GTADB public 3D reference | Real elevation unavailable unless separately installed |

## Tool and left-panel category parity

- **27 curated toggles** cover available mapped Ammu-Nation, clovers, vehicle spawns, mapped properties, garages, collectibles, activities, weapon sites, fuel stations, mod shops, shops/markets, nightlife, casino, banks/ATMs, police, hospitals, transport, airports, marinas, rail, bridges/tunnels, stunt jumps/races, safehouses, businesses, towers/masts, nature and photo locations. Exact count is determined from the code's `NAMED_LAYERS`; labels without coordinates are hidden rather than invented.
- **Up to 32 additional dynamic collection-type toggles** appear from real imported `collectionType` field values (e.g. Spaceship Part and Letter Scrap) when loaded. They do not imply a complete dataset.
- Tap a category to show or hide its pins. **Show all**, **Hide all**, category-wide switches, filtered search, source overlays and individual marker selection remain separate tools. Turning a named layer back on also enables its parent category if necessary.
- **GTA V Story and GTA Online category states are independent**; separate VI state; Story-only collectible source stays in Story. Do not convert ordinary landmarks into purchased businesses, verified vehicle spawns, or confirmed collectibles.
- More advanced features from GTAWeb's GTA Online Toolkit, Cayo Perico map and true driving network / exact road routing **remain unimplemented or conditional**; see `FEATURE-COMPARISON-GTAWEB-GTADB.md`.

## Evidence and usage limitations

- GTADB.org original map and source: https://map.gtadb.org/ ; https://github.com/rolux/gtadb.org/blob/main/maps/maps.js ; https://github.com/rolux/gtadb.org/blob/main/LICENSE-DATA ; https://gtadb.org/.
- GTAWeb: https://gtaweb.eu/ ; https://gtaweb.eu/gtav-map ; https://gtaweb.eu/gtao-map ; https://gtaweb.eu/gtavi-map.
- This is a functional/tool comparison and **not** permission to copy protected GTAWeb tiles, proprietary scripts or data. Team Jura UV styles are transformations of permitted GTADB illustration tiles with attribution.
- The system-level tests in this ZIP are offline; **the map art, 3D texture, CORS and image/photo requests must still be reviewed in a real browser on preview deployment**.
