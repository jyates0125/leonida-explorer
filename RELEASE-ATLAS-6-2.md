# Team Jura Atlas 6.2 — Explorer Repair

## Why this release

In 6.1 the Scaly/Loki entries were art filters, not a redesigned map explorer. Users also reported absent GTA V / Online radar imagery and a blank 3D map/fallback. This update preserves old data and capabilities, improves the sidebar, and gives map imagery an alternate source path.

## Changed (not just planned)

- Maps now load from `maps.gtadb.org/tiles/` first, then the upstream GitHub published tile location if the image fails to load. Images are requested with cross-origin permission for 2D canvas and 3D texture usage.
- Display explicit tile-loading counts or an unavailable-artwork warning rather than silently displaying pins on an empty grid.
- Compact dark Team Jura / Elario Studios map explorer on all three game pages. Color drops, searchable location list, paging, country/reference address when known, legend drawer, and a selected-place photo/details panel.
- Search results sorting: name, region (approximate), category, map-center distance, or unvisited first.
- Download filtered place records as attributed CSV (not arbitrary unlicensed map content).
- 3D fallback continues using the working 2D illustrated map until valid artwork is available; no claim of complete road/elevation parity.
- Preserve 6.1 GTA VI presets, existing user storage keys, collectibles and checklist features, coordinates, legacy route tools, and user backups.
- Updated the service worker shell cache identifier to avoid reusing old code.

## Not changed or not yet verified

- No new collectible/spawn records manufactured. GTA VI references are still provisional.
- No GTAWeb copyrighted artwork/database reused.
- No proper licensed road graph bundled; 3D relief remains data-dependent.
- External map servers and real images were not reachable by the isolated test environment. **Live browser screenshots and device acceptance test remain open**, despite passing static suite.
- No changes were pushed directly to the GitHub repository by this package.

## Install

1. Extract `Team_Jura_Atlas_6_2_EXPLORER_COMPLETE_SITE.zip` on your PC.
2. **Safer:** use a `preview-62` GitHub branch for testing before changing `main`.
3. Upload the *contents* to the repository preserving directories (`scripts`, `data`, `.github/workflows`). GitHub web upload may flatten folders if selected incorrectly; use GitHub Desktop to preserve them, or upload the small root-only quick update to the root of the preview branch.
4. For the **quick update**, replace root files only. Do not delete or replace data, scripts, or existing workflow folders.
5. Visit GTA V, GTA Online and VI, verify tile art appears, pin click and source photo, Scaly/Loki, 2D/3D, search, sorting and backup after a hard refresh.

See `FEATURE-COMPARISON-GTAWEB-GTADB.md` for full parity audit and `TEST-REPORT-ATLAS-6-2.txt` for actual verification details.


## UV illustrated-map correction (12 November 2026)

GTA V and GTA Online **UV** is an illustrated blue/blacklight-style treatment of properly licensed GTADB radar map artwork, not an empty blue field. **UV II** is an illustrated paper-style treatment. UV now has explicit alternate illustration sources: radar → roadmap → satellite, so one missing tile set does not immediately create an empty blue tile. The code tries the main GTADB tile host and the published repository; if CORS blocks both, it retries image-display mode (2D only; a CORS-disabled image is deliberately not sent to the WebGL texture). The diagnostic status indicates if all sources fail. These are Team Jura UV-style treatments, **not** copies of GTAWeb's UV tiles or the collector-edition ultraviolet secret markings. Browser rendering remains unverified until preview deployment.

The category panel also includes **named show/hide map layer buttons**, for clovers, Ammu-Nation, vehicle spawns, mapped properties, collectibles and activities **only when matching coordinate records exist**. Story, Online, and VI layer-toggle states are independent; no unavailable locations are fabricated.


### UV for GTA V, Online AND GTA VI (12 November 2026)

- **GTA V Story / GTA Online:** UV Blueprint uses GTADB radar illustration as its base, colored with Team Jura's navy/blue treatment; UV II Paper uses the GTADB roadmap illustration and an original paper treatment. Both share correctly calibrated world coordinates but the category/progress filters are scoped separately to Story and Online.
- **GTA VI Leonida:** Two additional UV choices added: **UV Leonida Blueprint** draws the licensed YANIS V17 illustrated community map with the blue treatment (fallback YANIS V15, DUPZOR V51), and **UV II Leonida Paper** uses DUPZOR V51 with a warmer treatment (fallback YANIS V17/V15). No location coordinates are changed. Scaly/Loki and all four original map choices stay available.
- **Comparison limitation:** GTAWeb has GTA V/Online UV light layer, but its JavaScript app does not expose enough inspectable detail to verify the exact working GTA VI UV view at this time. GTADB.org's source shows community YANIS/DUPZOR maps for GTA VI, not an official Rockstar GTA VI UV blueprint. Atlas VI UV is explicitly a Team Jura **style**, not a copy or an officially confirmed game map. No special UV-hidden clue artwork is copied or claimed.
- Browser proof is still required for actual map tiles in each UV option. 3D UV appearance also needs a browser/GPU check.


## Atlas 6.2.1 patch — complete map layer deck, UV for both worlds

- Keep the original six GTA VI source selections and register two new UV illustrated choices separately, preserving the existing GitHub Actions validation contract.
- 27 source-grounded named category switches across Story, Online and VI (only rows with real coordinates render a label), plus up to 32 real collectible-type layers per world when source data exists. The panels are directly visible on the left, with an in-panel search and Show all / Hide all.
- Category state saved separately for GTA V Story, GTA Online and GTA VI. A selected layer can switch itself back on even after All off. The global All on now resets both named layer filters and category toggles.
- GTA V / Online illustrated radar, UV, UV II; GTA VI Scaly, Loki, original four, plus UV Leonida Blueprint and UV II Leonida Paper. No GTAWeb artwork copied. All new VI UV maps are original stylistic treatments of licensed GTADB tile artwork and not official game UV secrets.
- See `MAP-VIEWS-AND-LAYERS-6-2-1.md` for the per-map comparison and feature limitations.
- Validation: 41 Atlas assertions, 12 dynamic JavaScript layer assertions, original Atlas baseline contract, GTADB sync validation, and route tests passed locally. Live browser rendering is **NOT yet proven**.
