# Team Jura Atlas 6.0 · GTADB-style navigation and 2D/3D explorer

**Elario Studios × Team Jura. Unofficial Grand Theft Auto fan project.**

## Working implementation in this source release

- GTA V, GTA Online and GTA VI selectable worlds. Previously working GTA V & GTA Online radar, satellite, terrain, roadmap, hybrid, and original UV / UV II preserved. GTA VI YANIS 17, YANIS 15, DUPZOR, updated/community patch variants and CYBER legacy fallback preserved; GTA VI UV / UV II removed per request.
- On-map **2D / 3D**, 3D mouse/touch orbit, Shift+drag pan (desktop), zoom and north reset. In-app WebGL terrain renderer triangulates a mesh and **attempts to load the GTADB published GTA V/VI elevation binary**. If GTADB elevation cannot be retrieved (CORS/network/source restrictions), 3D uses a flat projected mesh. Do not treat that fallback as real terrain.
- Original Team Jura interface follows GTADB workflow: Find, Directions, location-name or real-world-reference-address search, 2–12 stops, add/reverse, nearest order, route geometry preview, export stop coordinates.
- **Road routing:** direct-line only by default. Licensed game-coordinate graph JSON can be imported to enable graph-following route preview; validated graph needed. Importing a graph does not prove roads are real. No invented real-world ETA or GTA turn-by-turn claims.
- Color-coded category legend, markers and selection continue to work; 3D shows matching category pins and projected multi-stop route. Marker detail includes Navigate action and available GTADB contributed photographs.
- Overlay opacity slider added without suppressing artist-specific map patches. Overlay imagery may have visibly different styles. GTADB CC BY 4.0 map/data credits remain in UI. Original Elario Studios × Team Jura branding identifies the producer and makes clear Grand Theft Auto is Rockstar IP.
- Saved collectible progress and existing saved route selections use unchanged storage keys. The new navigation preview does not overwrite either.

## Research notes / dependencies

GTADB community source repository: https://github.com/rolux/gtadb.org — source renderer `maps/maps.js`, `maps/maps3d.js`, `maps/maps3dflat.js`. Elevation configuration public in `maps/maps.js`; source fetch endpoint in GTADB's code is `https://api.gtadb.org/data/{game}/elevation.bin`. **Live availability and cross-origin access are not guaranteed.** No bundled GTA VI terrain geometry or building models. No validated licensed road network bundled. GTA VI landmarks are community-estimated, not game-release confirmed.

**Attribution:** GTADB.org and all contributors. Data, selected map tiles and contributed photographs CC BY 4.0 unless otherwise noted: https://creativecommons.org/licenses/by/4.0/ . GTADB project code MIT; this navigation and 3D renderer is original Team Jura code, designed around documented features and data formats rather than copied UI or 3D renderer code. Grand Theft Auto, fictional names and game worlds remain Rockstar Games / Take-Two intellectual property. No affiliation or endorsement.

## Verification and caveats

Passed static checks: all JS files pass `node --check`; HTML unique IDs and referenced files resolve; all JSON parses; 2D/3D/nav controls exist for three game entry pages; road-graph Dijkstra and direct-line tests pass. ZIP CRC validation. **No end-to-end visual browser test was possible in the current runtime** (Chromium browsing blocked by administrator), no iPhone Safari test, no live elevation/network verification and no deployment to GitHub.

## Deploy

1. Before deployment, on current Atlas **My pins → Export backup**.
2. Unzip QUICK_UPDATE. Upload **files from inside the ZIP to the repository ROOT** at `https://github.com/jyates0125/leonida-explorer`, replacing same-named files. Do not delete any other repository files. The COMPLETE zip is only needed for an all-files refresh (do not upload both).
3. Commit `Atlas 6.0 - In-app 2D 3D directions landmarks and Elario branding`.
4. After GitHub Pages completes, reload the HTTPS page in a private window; test GTA V / Online / VI, marker categories, landmark search, original vs updated maps, overlay slider, 2D and 3D (look for elevation status), route with at least three named stops and preserved My Pins.
5. If 3D says 'flat-perspective fallback', GTADB height data is unavailable from that browser. The flat 3D perspective still works but is **not** real elevation. If 3D says WebGL unavailable, use 2D.

## Next steps

A permitted, reliably served elevation asset for offline 3D and a validated, licensed GTA road graph are required for fully dependable GTA-style 3D terrain and road-following routes. GTA VI world and collectible claims remain provisional until independently verified against the released game.
