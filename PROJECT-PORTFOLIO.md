# Elario Studios · Team Jura Atlas — School / Community Portfolio

**Project:** An unofficial, noncommercial, responsive interactive Grand Theft Auto map explorer and companion tracker. **Developed by:** Team Jura, as a project under the Elario Studios vision. **Version:** Atlas 5.4 (2026-11-11).

## The problem

Large game maps make it difficult to search, categorize, remember what has been found, plan routes and manage owned vehicles. Our goal is to combine these tasks without falsely claiming that landmarks are real gameplay spawn locations.

## Technology

Static HTML/CSS/vanilla JavaScript, HTML5 Canvas, offline-aware service worker, JSON data feeds, browser localStorage/Cache Storage, GitHub repository and Pages deployment. Responsive controls work for touch and mouse; keyboard support includes focus and map pan/zoom.

## Original algorithms

- Normalize GTADB source data to a common record structure and game-coordinate format.
- Classify tags and name clues into probable service-site categories while retaining provenance and an uncertainty label.
- Cluster map pins at far zoom and manage click/touch interactions.
- Order waypoint lists using nearest-neighbor straight-line distance, not road routing.
- Store personal progress separately for GTA V Story and GTA Online; track user-owned garages and cars.
- Provide deep links to individual GTADB landmarks using `?place=gtadb-5-L8` and browser clipboard sharing.

## Sources and data confidence

GTA V 2,335 GTADB landmark records; GTA VI 3,401 at source review on November 11, 2026. GTADB datasets and tiles are CC BY 4.0; software MIT. Dataset sizes can change. 261 manually curated reference entries are names/categories, **not** confirmed map spawns. GTA VI reconstructed map data and inferred gameplay uses are provisional/unverified. GTAWeb.eu issues and public feature descriptions are considered for usability inspiration, not reused proprietary coordinates/code.

## Ethics and licensing

We preserve attribution, avoid fabricated gameplay claims, do not sync or request Rockstar login credentials, and differentiate original code from third-party data and imagery. The fan project is unofficial and has no affiliation with Rockstar, Take-Two, GTADB or GTAWeb.

## Testing evidence and limitations

Package contains `test-atlas-5-2.js` (classification and confidence) and `test-browser-5-2.py` (simulated browser interactions). The Atlas 5.4 release also adds standalone page and deep-link checks. Offline UI and test fixtures are not a guarantee that live map tiles or every source record will work from GitHub Pages; these need manual verification after upload.

## How to present the demo

1. Open `project.html` and show the project description and technology overview.
2. Use `atlas.html` to search landmarks and test map layers.
3. Select a GTADB landmark and use Share to open the direct marker URL.
4. Show how the Services panel labels inferred sites.
5. Compare provisional GTA VI and mapped GTA V positions, without asserting gameplay verification.
6. In `atlas-catalog.html` create a sample garage, add a vehicle and export a backup.
7. Visit `elario.html` to introduce the Elario Studios vision.

## Future work

Add separately licensed collectible/spawn datasets, map-to-catalog linking for verified properties, more search indexing, optional automated unit and end-to-end tests in GitHub Actions, mobile performance optimizations, user-submitted reviews, and release-day verification of GTA VI data.

## Release 5.4 · evidence-led coverage
- Designed schema/dictionary for 11 entity families and populated 279 index/research records.
- Added twenty source-checked collection counts with 955 unique device-local progress slots, not invented pins.
- Added a browser-based verification dashboard, CSV export, source URLs, and pre-release GTA VI uncertainty labeling.
- Not yet fully item-verified: all GTA V vehicles, all per-item collectible positions, dynamic prices, ownership opportunities, and GTA VI final release map.
