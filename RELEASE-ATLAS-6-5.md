# Atlas 6.5 — Research / GTADB-inspired navigation

- Retired legacy CYBER map selector. Added Research (YANIS V17 community illustration and Atlas research overlays). No copied GTADB UI/code.
- Removed first GTA VI UV blueprint selector; retained UV II if desired.
- Preserved exactly one Scaly (YANIS 17) and one Loki (DUPZOR 51) view.
- Both on-map legends default to collapsed edge tabs: Map Legend left, Trailer Legend right. Existing filters and trailer route actions remain. Research also supports both.
- Fixed GTADB GitHub Action VI snapshot compatibility: the updater stores an object keyed by landmark ID and the browser can now load it.
- Service worker cache bumped so old open legends don't persist from cached scripts.

## Verified data status
The included starter is deliberately small. Direct upstream network sync was not possible in this environment. On GitHub, run `.github/workflows/gtadb-vi-sync.yml` to obtain the current CC BY 4.0 landmark snapshot. A successful Action run and live browser tests are still required. The public reference at gtadb.net/gta-6-map/interactive/ reports YANIS V17 as community / provisional; Atlas does not claim in-game accuracy.

## Upload
Extract into repository root, keeping subfolders. Upload to a development branch first. Test `atlas-vi.html`, Scaly, Loki, Research, both tabs, marker selection, navigation and other game pages before merging to main.
