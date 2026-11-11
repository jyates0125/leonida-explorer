# Team Jura Explorer 3.2 — Live landmark feeds (testing branch only)

## What is included
- Original Halloween/Thanksgiving Command Center and existing pages retained.
- New explorer.html searches GTA V and GTA VI GTADB landmark feeds from their public, CC BY 4.0 GitHub data files, when network/CORS permits. Source snapshot is refreshed by pressing Refresh data.
- Source GTA V: https://github.com/rolux/gtadb.org/blob/main/map/data/5/landmarks.json (2,335 records at inspection).
- Source GTA VI: https://github.com/rolux/gtadb.org/blob/main/map/data/6/landmarks.json (3,307 records at inspection).
- The existing 46-item locations.json remains as GTA VI offline/fetch-failure fallback. GTA V has no offline fallback.
- Custom pointed category-colored pins, search, category filters, paginated results, marked found, personal pins, backup, straight-line waypoint routes, separate GTADB original map.
- Pins only render after selecting a category or entering a search; cap 120 per view.

## Important limitations
- These are GTADB LANDMARK datasets, not GTA Online collectible sets, events, or verified gameplay spawns. No collectible coordinates are fabricated. GTA VI entries are community reconstructions.
- The full data is fetched at runtime; the ZIP does NOT contain the full databases. Browser must reach raw.githubusercontent.com. Check status counts before publishing.
- GTA V landmark coordinates are transformed from GTADB world positions to VIRUXE map positions (4096 offset), requiring visual alignment verification on a real device before publication.
- The GTA VI direct tile host can fail or change. GTADB source map is separate and its markers cannot be controlled by this app.
- This is not a commercial license for Rockstar artwork. Respect upstream source and attribution requirements.
- No road-aware routing, automatic seasonal event ingestion, or complete GTA Online collectibles yet.

## Licenses
GTADB landmark data copyright GTADB.org and contributors, CC BY 4.0. Data modified: categories normalized and GTA V coordinate offset added. https://github.com/rolux/gtadb.org/blob/main/LICENSE-DATA and https://creativecommons.org/licenses/by/4.0/
GTADB software MIT. Leaflet BSD-2-Clause. GTA V/VI artwork rights remain with respective owners.

## Upload / test
On GTA-maps branch, upload ONLY explorer.html and README.md from this ZIP. Keep existing locations.json. Test the two counters and marker alignment on your iPhone before any merge to main. Do not upload the ZIP itself.
