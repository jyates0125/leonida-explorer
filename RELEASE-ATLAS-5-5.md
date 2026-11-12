# Team Jura Atlas 5.5 — Calibrated Maps & Licensed Data Expansion

**Release date:** November 11, 2026. **Status:** tested in simulated Chromium with representative mock JSON; production GitHub Pages hosting and cross-origin sources still need deployment verification.

## New features

- GTA V Story Mode: adapter for 276 community-researched coordinates (10 source categories) under public WTFPL project; eight fitted anchors and six independent holdout checks, max roughly 2 GTA units of observed disagreement in comparison set.
- GTA VI: up to 77 preliminary Leonida reference pins, sourced from the Mapheist CC BY 4.0 dataset as of this release; converted from community YANIS v16 pixel coordinates to Atlas map coordinates. **Positions are provisional and map-version differences exist.**
- GTA V / GTA Online: 452 source-listed base-game prop coordinates in four optional, individually toggleable layers (ATMs, pumps/air services, bus stops, radio masts/towers), from public reuse-permitted JSON resources.
- Source overlays switchable independently; coordinate X/Y jump; crosshair; switch from grouped pin clusters to individual pins; source links; source status and refresh; versioned cache and source provenance report.
- Original Atlas 5.4 map layers, routes, checklists, catalog, local progress keys and Elario Studios page preserved. Existing `index.html` replaced with Atlas 5.5 landing page.

## What is not claimed

- A 100%-complete or item-by-item game-verified GTA V / Online database.
- Confirmed GTA VI in-game locations; these are community reconstructed research points only.
- Universal cross-browser CORS success for third-party APIs or tile delivery; browser tests used controlled source fixture responses.
- Permission to copy GTAWeb.eu's unpublished data, map tiles or graphics.

## Verification

- Node adapter/parser tests (projection mathematics, source schema and counts): **PASS**.
- Chromium simulated browser controls, switching game modes, source record counts, X/Y jump, pin density, no uncaught page errors: **PASS**.
- Inline calibration self-test in `atlas-calibration.html`: **PASS**.
- External-host source availability and production deployment: **NOT YET VERIFIED**.

## Recommended GitHub deployment

Upload the **16 changed/new deployable files from the QUICK UPDATE ZIP**, unzipped, to the existing `main` branch root and commit. All other Atlas 5.4 files can remain. Or upload the FULL DIRECT UPLOAD ZIP content if restoring the website from scratch. Keep the old `jura-atlas-*` local browser storage values; Atlas 5.5 preserves them.
