# Team Jura Atlas 5.8 — Current map layers, smart routes and guest-first access

## Current map layers (reviewed November 11, 2026)

GTADB's GitHub repository is the tile and landmark authority used by this site, under CC BY 4.0 (see `LICENSE-DATA`). All photo and tile paths point to published *GitHub repository* files, not the GTADB production media server. **Current online tiles are loaded on demand**; the ZIP does not mirror huge map-tile directories. Source folder changes can affect availability until checked in the browser.

- **GTA V Story & GTA Online**: the same five GTADB terrain layers — radar, satellite, terrain, roadmap, hybrid — plus original visual treatments UV (night/blacklight-style) and UV II (paper-style) derived from licensed original tiles. Gameplay records and player progress remain separate.
- **GTA VI Leonida**: YANIS 17, YANIS 15, DUPZOR 51 base styles, plus their published GTADB composite overlays (AIWE / MARTIPK / RICKRICK), and original UV and UV II color treatments. Composite tiles are partial; our renderer draws overlay tiles only over covered areas and uses base tiles elsewhere.
- **CYBER**: preserved as a selectable legacy map view because existing users report it working. The legacy folder is absent from the currently listed upstream GitHub tiles; missing tile requests fall back to YANIS 17 with an original cyber color treatment. Existing legacy CYBER tiles display unchanged when available. A fallback is not a restored original CYBER dataset. Availability of legacy tiles depends on the user's existing cache or an older endpoint.
- External GTADB landmark feeds and optional community coordinate feeds check for fresh records after a successful cache's 24-hour lifetime, preserving existing local snapshots if offline. The update button forces a refresh. Data and map-source licenses differ by source and remain labeled.

## Gameplay and permissions

Every item with coordinates can be displayed as a marker. Legend categories show their symbol and color; clicking a marker opens its detail panel and an *optional, licensed* GTADB photo if available. GTADB in-game photos are loaded only when the user requests that location. Locations without source photos show text, not fictitious imagery. GTA VI marker positions remain provisional until gameplay verification. GTA V Story-exclusive content is not treated as GTA Online collectibles.

Click **Start here** on a map marker, or **Pick start on map** and tap any point. Then click **Smart route** to draw a numbered, nearest-first route through up to 250 visible unfinished locations; the 2-opt improvement reduces extra travel. Routes are **straight-line estimates**, not navigable roads. Progress, favorites, route starts and custom pins are saved locally on this browser; export a backup before switching devices.

Home page remains **guest-only**. Sign-in is disabled until a proper authentication provider is configured. Future accounts must use **HTTPS and passwordless methods** (passkeys or email links). There are no passwords, credentials, login forms, login cookies, or cloud account endpoints in this build. An HTTP version must never offer sign-in.

## Notes

- No source artwork/icons were copied from GTAWeb; map-like UV and UV II are original CSS/Canvas color treatments of licensed GTADB source tiles, not a reproduction of GTAWeb's distinct map artwork.
- GTADB repo: https://github.com/rolux/gtadb.org (MIT code, CC BY 4.0 data/photos/tiles). The source repository can change; client-visible availability is tested by the browser after upload.
- Back up existing progress (`My pins` → `Export backup`), download this full website ZIP, upload all files **into the repository root**, commit, then hard-refresh the HTTPS GitHub Pages link.
