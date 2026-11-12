# Team Jura Atlas 6.4 — Cayo Perico and route-truth update

**Complete branch-upload package:** upload the extracted contents to the `GTA-maps` development branch root, replacing prior files. Test on Pages before merging into `main`.

- Dedicated `atlas-cayo.html` island schematic with original vector artwork, searchable/category-toggled markers, scope progress, island-specific local storage, heist route previews and CSV export. All diagram coordinates are ILLUSTRATIVE, not game-world positions. This is not a calibrated collectible map or tile-based satellite map.
- Preserves GTA V, GTA Online Los Santos, GTA VI Scaly (one) and Loki (one), dual legends, backups, existing routes and tools.
- GTA VI imported road graphs are **unverified** and are never automatically called verified driving directions. Actual verified directions require released-game road and turn/access testing.
- Sources: https://gtalens.com/map/cayo-infiltration-points , https://gtalens.com/map/cayo-compound-entry-points , https://thegtamap.com/map?g=gta5&r=cayo , https://www.rockstargames.com/VI .

See RELEASE-ATLAS-6-4.md for quality checks and limitations.

---
# Team Jura Atlas 6.3 — Next development upload

**Latest:** [Release and upload test instructions](RELEASE-ATLAS-6-3.md). Scaly & Loki now have one named view each, left searchable Map Legend, right source-tagged Trailer Legend, and multi-stop route reorder/CSV tools. See release notes for source and browser-verification limitations.

> **Atlas 6.2.1 Explorer Repair (12 November 2026):** The new Team Jura map explorer includes sortable location directories, compact GTADB-attributed pin lists, CSV export, a 2-source licensed tile loader, and image-loading diagnostics. All existing game routes, collectible progress, personal pins and GTA VI Scaly/Loki presets are preserved. See [release notes](RELEASE-ATLAS-6-2.md) and [full GTAWeb/GTADB feature comparison](FEATURE-COMPARISON-GTAWEB-GTADB.md). Live map artwork and WebGL rendering still need verification in a real browser.

# Team Jura Atlas 6.2.1 — GTA V, GTA Online & GTA VI Leonida

**Team Jura · Elario Studios** — an independent, unofficial GTA community map explorer and software engineering showcase. We are not affiliated with Rockstar, Take-Two, or GTADB.

## The final original-view update

- **GTA VI: six distinct options**: **Scaly View** (slightly enhanced-color YANIS V17 original map), **Loki View** (subtle high-contrast DUPZOR V51 original map), **YANIS V17 Original**, **YANIS V15 Original**, **DUPZOR V51 Original**, and **CYBER Legacy** (with stated fallback to YANIS art if unavailable). Scaly and Loki are Team Jura aliases, **not separately licensed or independently authored artwork**. No patch-combined styles or GTA VI UV views.
- **Individual GTA-style source pins**, no clustering. Where the GTADB landmark data publishes a marker color it is used directly; otherwise original category icons/emoji are shown. Categories, filtering, research records, addresses and reference photos stay available.
- **GTADB-style in-app 2D/3D**: WebGL perspective terrain, camera orbit and 2D toggle. Without an installed licensed local heightfield (`elevation-6.bin`, 5,369,856 bytes), the renderer presents an interactive flat 3D map instead of inventing buildings/terrain. When WebGL is not supported, a **clearly labeled 2D perspective fallback** is used, not misrepresented as true 3D relief. 3D map textures depend on browser CORS and tile availability.
- **Named multi-stop navigation**: add up to 12 stops, reverse, order, route previews, local import of an independently licensed road graph. **No validated GTA VI driving road database has been found**, so a disconnected direct-line preview is labeled accordingly; never claim invented directions.
- **Daily GTA VI licensed database sync**: optional `.github/workflows/gtadb-vi-sync.yml` checks `map/data/6/landmarks.json` from GTADB GitHub **once per day**, validates and snapshots to `data/gtadb-6.json`, writes update history and commits *only when records change*. GitHub Actions must be enabled with `contents: write`; deployment alone does not activate it. Prior to first run, Atlas can load from GTADB's public **GitHub repository** (not their live website). **GTA V remains a slower-refresh legacy resource.** Data is attributed CC BY 4.0.
- **Safety**: No sign-in on HTTP and no passwords in Atlas; maps are guest only, user progress saved on-device. Always export a backup before replacing older files.

**Attribution:** GTADB.org and contributors; map tiles, eligible photos and data licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) except where noted. Team Jura adapts records, visual presentation and category mapping. GTA characters and game IP belong to Rockstar Games/Take-Two; no endorsement implied. Source: https://github.com/rolux/gtadb.org . Do not reproduce GTAWeb or MapGenie protected assets without permission. Public real-world addresses are inspirations/prototypes, not verified GTA VI street addresses.

## Getting started

1. Upload the **quick-update contents** to the repository root. Preserve `.github/workflows/` and `scripts/` paths. For a simple root-only browser uploader, use GitHub's folder upload feature or GitHub Desktop to preserve nested folder paths.
2. Visit `atlas-vi.html`. Choose Scaly or Loki view; select pins and test 2D/3D.
3. In GitHub repository Actions tab, enable workflows if needed; run **Refresh licensed GTA VI landmarks** manually once. If GitHub Pages uses a custom deploy process, check Pages after that commit.
4. In Atlas, click **Check GTA VI locations** to reload the new local snapshot. GTA V records will not be overwritten.
5. Test on desktop and iPhone, export your user progress backup.

## Prior releases and engineering notes

Earlier releases remain documented in `RELEASE-ATLAS-5-4.md`, `RELEASE-ATLAS-5-5.md`, `RELEASE-ATLAS-5-7.md`, `RELEASE-ATLAS-5-8.md`, `RELEASE-ATLAS-5-9.md`, and `RELEASE-ATLAS-6-0.md`. This 6.1 section supersedes older navigation and view statements.

For future contributions, use a feature/develop branch and see `PREVIEW-BRANCH-WORKFLOW.md`.


### Atlas 6.2.1 illustrated UV and live layers

- GTA V Story and GTA Online: five licensed basemap options plus original illustrated UV Blueprint and UV II Paper treatments.
- GTA VI: six licensed/original map selections, plus two **Team Jura-styled** illustrated UV options. The source map and coordinates remain unchanged; GTA VI geography is provisional.
- All three modes: directly visible mapped-only category toggles, dynamic collectible sets, search, show/hide, sorted source-grounded directory, place photos when available, personal pins, and 2D/3D fallback.
- **Deployment:** create an `atlas-6-2-preview` branch **from `main`**, then upload the root-level Quick Update ZIP contents into the branch root. Do not upload the complete site folder through GitHub's web upload since GitHub may flatten subfolders. The assistant's GitHub integration did not permit creating the branch (403); use the GitHub website for that one step.
- See `MAP-VIEWS-AND-LAYERS-6-2-1.md` and `TEST-REPORT-ATLAS-6-2-1.txt`. Do not move the preview to `main` until you confirm actual artwork and pin/filter behavior in a browser.
