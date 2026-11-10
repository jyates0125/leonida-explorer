# Team Jura Explorer 3.0 — Integrated Live Maps

## Open
Upload all files to the repository root, replacing older files. Open `explorer.html` for the new map and tracker. The original `index.html` remains as a compatible welcome screen and includes a new prominent link to Explorer 3.0.

## Verified features
- GTA V bounded Leaflet map requests, on-demand pins and map list
- GTA VI independently controlled research map, with original GTADB map fallback
- 46 real, named, source-backed GTA VI landmarks from GTADB (CC BY 4.0)
- Collection category filters, local custom pins, completion state, progress backup
- Approximate straight-line waypoint routes, not drivable roads
- No Activate All Pins at startup; optional map pins start hidden

## Important limitations
- GTADB tile server may reject direct tile requests; use the original source-map view. Our own overlays cannot be drawn inside their iframe.
- GTA V map tile artwork belongs to Rockstar; VIRUXE's hosting does not grant unlimited republication rights.
- GTA V collectible coordinates are not imported because licensing and coordinate validation are not yet completed. Do not confuse a catalog of activity names with verified map pins.
- This release includes a curated subset, NOT the entire GTADB database (3,307 records). Data source is a snapshot, not automatically refreshed.
- No automatic weekly GTA Online event data and no claims of confirmed GTA VI gameplay locations.
- Browser syntax and ZIP integrity can be tested here; actual external tiles and mobile browser performance must be tested after upload.

## Credits
GTA VI landmark data: gtadb.org and all contributors — CC BY 4.0 — https://github.com/rolux/gtadb.org
Map artwork: respective artists / contributors and Rockstar Games, as applicable. Leaflet BSD 2-Clause.
