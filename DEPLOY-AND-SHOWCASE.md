# Team Jura Atlas 5.4 — Deploy and Showcase

## Upload safely (phone or laptop)
1. Download `Team_Jura_Atlas_5_4_DIRECT_UPLOAD.zip` and extract it to a folder.
2. Open your existing `jyates0125/leonida-explorer` GitHub repository (do not create a new repository).
3. Choose the GitHub Pages publishing branch/folder already configured. The earlier README indicates `main` / root for deployment; confirm this in repository Settings → Pages.
4. Upload the extracted **files** into the repository root, selecting overwrite/replacement of matching paths. The ZIP file itself is not a webpage and must not be uploaded as-is.
5. Keep the existing `index.html`, custom maps and any files not in this update. This update intentionally does not include an `index.html`.
6. Commit with a message such as `Release Team Jura Atlas 5.4 – evidence, collections, GTA VI labels`.
7. Visit the published pages after deployment, hard refresh if the old version appears, and test with the device you plan to use for the showcase.

## Suggested live presentation
- Start with GTA V Story: pan, zoom, switch In-game / Terrain / Satellite, search and show a source landmark.
- Switch GTA Online and demonstrate separate progress; explain community place heuristics do not prove a vehicle spawn.
- Open the Collections tracker; demonstrate Story Mode 100% thresholds, the 54 playing cards, 100 action figures, and backup download.
- Open Data & Verification; show public source links, nullable schema and 18 explicitly UNVERIFIED GTA VI research records.
- Open a garage inventory example and export it; never imply sync with a Rockstar account.
- Finish with the Project Showcase and Elario Studios – Coming Soon pages.

## Verification limitations
- Automated source-integrity checks and **isolated Chromium UI tests** were run (HTML and JS executed in real Chromium with local mocked fetch, because this execution environment blocks browser navigation to localhost).
- We did NOT run a fully hosted GitHub Pages acceptance test, actual CDN/tile load, live network sync or final mobile-device test.
- Full GTA V coordinate-by-coordinate collectible verification has not been completed and must not be advertised as complete. This build deliberately never fabricates coordinates.
- GTA VI landmarks are only community map estimates until separately confirmed after official release.

## Data safety
- Browser progress is device-local. Export your JSON files before replacing browsers, clearing history/cache, or switching devices.
- Legacy progress keys from Atlas 5.3 and 5.1 are preserved; the new collection checklist has a separate storage key.
- No Rockstar/GTADB login or API token is needed.

## Source usage
- GTADB.org landmark data and tile routes: https://github.com/rolux/gtadb.org (CC BY 4.0; attribution required)
- GTAWeb.eu issue/suggestion benchmark: https://github.com/PLTytus/GTAWeb (no source database reuse implied)
- Individual GTA V collection totals: see `atlas-collections.json` for exact per-set links.
