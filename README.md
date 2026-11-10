# Team Jura GTA Discovery Platform v2 — Thanksgiving Command Center

## Installation
Upload all six files from this ZIP to the root of `jyates0125/leonida-explorer` on the `main` branch, replacing files with matching names. Do not upload the enclosing folder. Wait for GitHub Pages deployment, then hard-refresh.

## Implemented
- Existing GTA V tile map and GTA VI GTADB embedded source map retained
- Autumn home menu and command launcher retained
- New Discover All page with searchable, categorized research checklist and browser-local completion status
- Discover page export/import/reset backup
- On-map Layers & Routes panel for **user-saved pins**: category filter, hide completed, completed checkbox, approximate nearest-neighbor straight-line waypoint route, clear route
- Map popup completion control for user pins
- Categorized new pins placed by tapping the GTA V map; imported backups retain category
- Credits and outbound reference links

## Not implemented / limitations
- Full licensed location database is NOT included: coordinates must be sourced, normalized, attributed, and validated before showing pins. Catalog entries are topic checklists, not individual location records.
- GTA VI uses an embedded third-party GTADB map. Its controls and locations cannot be programmatically manipulated from our site due to cross-origin isolation. Use Research pins mode for custom pins and route overlay.
- Route is approximate straight-line ordering of user pins, not drivable road navigation.
- No verified current-week events or Simeon requests are bundled.
- GTA V image tiles are hosted by VIRUXE and Rockstar retains game-art rights. External source availability may change.
- No browser-based test on user's iPhone was performed; do not replace working live site until tested in a preview branch if possible.

## Licensing
Original new site UI and data model: Team Jura. GTADB code MIT and data CC BY 4.0 per upstream repo; no GTADB landmark bulk dataset is bundled in this release. Map source attribution retained. Rockstar/Take-Two trademarks and game imagery remain theirs. No endorsement implied.
