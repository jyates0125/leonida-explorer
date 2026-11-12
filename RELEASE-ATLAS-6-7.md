# Atlas 6.7 — Marker Coverage Audit

**Date:** 2026-11-12. **Branch:** `GTA-maps` development branch.

## Included

- Searchable marker-type coverage dashboard at `atlas-coverage.html`, mapping 100+ observed GTA Online category names from public map references.
- Coverage manifest `data/atlas-coverage-67.json` (categories and search aliases only, not third-party points or artwork).
- Live map named-layer definitions for Simeon requests, Exotic Exports, personal vehicle delivery points, properties/business subtypes, Gun Van, Street Dealers, Ghosts, Snowmen and pumpkins. These appear on actual Atlas maps only when relevant source-backed records are loaded.
- Navigation links from the main maps to the coverage dashboard.

## Critical data limitation

This is **category/schema parity**, not a claim of complete **marker/data parity**. No external proprietary GTAWeb / GTADB.net database, icon pack, screenshots or artwork were scraped or included. A category without licensed individual coordinates must not generate a pin. Starter audits use bundled files and report *potential substring matches*, not verified location counts. Existing GTA VI research stays provisional.

## References reviewed

- https://gtadb.net/gta-online-map/interactive/
- https://gtamap.io/gta-online-map/
- https://gtaweb.eu/

## Upload

Upload all archive contents to `GTA-maps` branch, preserving `data/` and `.github/` paths. Do not replace the GitHub Pages public `main` until checking the site.
