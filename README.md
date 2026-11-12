# Team Jura Atlas 6.1 — GTA V, GTA Online & GTA VI Leonida

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
