# Team Jura Atlas 6.3 · Navigation + Dual Legends · 12 November 2026

**Upload destination:** existing `GTA-maps` development branch, repository root. **Do not replace `main` before testing.** This ZIP is the complete website; extract it and upload *contents*, keeping `.github/`, `data/`, and `scripts/` folder paths intact.

## New in 6.3

- **One Scaly view, one Loki view** — their original GTA VI illustration sources, YANIS V17 and DUPZOR V51 respectively, remain intact; no duplicate dropdown entries or map forks.
- **Scaly/Loki: LEFT Map Legend** — searchable source-grounded location categories and named data layers, counts, ON/OFF and Only isolation. Uses the same filtering state as the existing sidebar, not an unconnected decorative menu.
- **Scaly/Loki: RIGHT Trailer Legend** — search source/scene-tagged mapped *candidates*, locate a selected record, add it to the multi-stop route, and launch the navigator. Source and provisional status are shown; source-tagging does **not** prove appearance in a specific trailer. No made-up locations or coordinates.
- **Navigation:** 2–12 stop named route planner now supports explicit ↑ / ↓ stop reordering, reverse order, nearest-next-stop order, copy summary and downloadable CSV of stops, coordinates, game and routing method. Road graph import stays opt-in. Without a validated imported road graph, routes remain labeled **direct-line previews, not driving directions**.
- Existing game Story/Online scope, progress, favorites, named marker layers, location packs, coordinate finder, nearby search, illustrations, 2D/3D controls, overlays, photo references, source links and Elario branding remain.
- New service worker shell cache name to encourage updated assets without clearing saved player progress.

## Features compared (inspiration, not copying)
- GTAWeb: explore map categories, collectible filters, marked progress, map-oriented tool navigation, GTA Online and Cayo features.
- GTADB.org (open-source mapped data): CC BY 4.0 licensed GTA landmarks, multiple basemaps, independent searchable markers and source artwork.
- GTADB.net: marker search, named categories, visited/favorite states, individual marker sharing and provisional GTA VI indicators. **GTADB.net is not automatically covered by GTADB.org's license.**
- Community references: GTA VI source labeling and trailer annotations; no coordinates are copied from unlicensed websites.

## Current limits
- GTA Online Cayo Perico map and truly validated road-following GTA VI driving instructions are **not included**: source/rights/graph validation is needed. GTA VI data remains provisional ahead of launch.
- No claim of feature-for-feature parity, live GTADB/GTAWeb data redistribution rights, or official Rockstar affiliation.
- Local tests: JavaScript parsing, offline static regressions, page/element/source reference checks and deterministic navigation core tests. Chromium browser test was **blocked by this execution environment's administrator policy**, so real browser tile display, CORS, network sources, mobile touch and WebGL need device verification.

## Quick smoke test after uploading
1. Open `atlas-vi.html` in GitHub Pages preview and select **Scaly View**. Confirm actual map art, left Map Legend, right Trailer Legend and all map zoom buttons.
2. Toggle a named layer, then switch to **Loki View**, verify artwork changes and there is only one Loki entry.
3. Open a right-side trailer candidate, use `+ Route`; add a start and generate route. Check ↑/↓, copy and CSV export.
4. Switch to YANIS Original: contextual legends should hide. Switch to GTA V Story and GTA Online: ensure separate pin filters and saved progress.
5. Test iPhone touch layout, tile load at high zoom, Favorites, GPS-free coordinate finder and 3D fallback. Check browser console for any errors.

## Evidence / credits
- https://gtadb.org/ · https://github.com/rolux/gtadb.org · https://gtaweb.eu/
- https://gtadb.net/gta-6-map/interactive/ · https://gtadb.net/gta-online-map/interactive/
- See `atlas-credits.html`, `LICENSE-TEAM-JURA-CODE.md`, `FEATURE-COMPARISON-GTAWEB-GTADB.md` and `MAP-VIEWS-AND-LAYERS-6-2-1.md`.
