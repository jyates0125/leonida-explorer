# Atlas 5.7 — World Data & Collectibles Integration

Status: **locally packaged; not yet uploaded or verified live**.

## Delivered
- 5.6 completion edition included in this one update.
- 22 optional 33,912-total licensed world-object reference feeds; opted-in only for performance.
- 276-item Story collectible/challenge community map linked to tracker, with map progress and checklist slot synchronization.
- Incomplete-location nearest-neighbor route transferred to GTA V map, marked as straight-line only.
- Searchable model and district tags of world-object records on map.
- New test center runs local checks and selected real endpoint checks.
- Existing 5.5 map views, bookmarks, garages, and progress keys preserved.

## Limitations
- 33,912 is the **publisher's total**, not a locally bundled 33,912-JSON dataset. Network and publisher CORS required for initial load; offline caching opportunistic.
- GTA V 276 points are community mapped and need in-game checking, not individually verified. Not the complete GTA Online collection corpus.
- MapGenie, GTAWeb.eu, unlicensed GTA V map dumps and artwork are not copied. Competitor research is not a license.
- 22 layers default off to avoid lag on iPhone.
- Real-world browser and network quality still need validation after deployment.

## Attribution
- GTA V community locations: https://github.com/danharper/GTAV (WTFPL).
- GTADB landmarks/maps: https://github.com/rolux/gtadb.org (CC BY 4.0).
- MiniMaps for FiveM source tables: https://fivem-minimaps.com/locations (reuse explicitly permitted; derived from DurtyFree dumps).
- GTA VI trailer-research points: https://mapheist.com/ (CC BY 4.0; provisional).
- All GTA IP and artwork rights remain with the original owners.

### Location Edition improvements
- New nearby search around selected pin, coordinate crosshair, or map center.
- Radius 250/500/1000/2500/5000 game units, click-through results, route nearest 12 unfinished stops.
- New neighborhood / district free-text filter, game-mode-scoped.
- Coordinate share links (`x`, `y`, `zoom` URL parameters) with no localStorage dependency.
- All selected location and user progress remain in existing saved keys.
- Added map-center to X/Y one-tap control and explicit visit markers for world-object props (not collectibles).
- Test center checks for the location controls in all three map pages.
