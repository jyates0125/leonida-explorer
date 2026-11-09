# GTA Map Explorer — One-upload package (GTA V + GTA VI)

## Install on iPhone (GitHub Pages)
1. Save and extract `gta-map-explorer-final-upload.zip` in Files.
2. Open https://github.com/jyates0125/leonida-explorer and navigate to the repository root on `main`.
3. Upload **index.html** and **hunt-hq.html** together, and commit to `main`. `legacy-explorer.html` is optional, and `README.md` may also be uploaded.
4. Wait for GitHub Pages to publish, then visit https://jyates0125.github.io/leonida-explorer/ and test **both GTA V and GTA VI** on your iPhone.
5. If a map doesn't load, check network access and tile host availability. GitHub Pages does not need a build step.

## Included
- Map-first mobile homepage, GTA V / GTA VI switch, compass, zoom, style switching, and reset view.
- GTA V: Atlas / Satellite / Grid from external VIRUXE community tile host.
- GTA VI: GTADB Yanis V17 / V15 speculative community reconstruction map tiles.
- 34 clearly labeled **community research** GTA VI landmarks (not collectibles).
- Coordinate finder (GTA V: image coordinates; GTA VI: community research coordinates), search, personal pins, reviewed status, JSON backup **export and import**.
- Separate `hunt-hq.html` 100-piece collectible checklists, notes, hunt management, CSV export/import (manual; no verified GTA V collectible pins bundled).
- Credits and permission caveats; no donation button or payments.

## Important rights and accuracy notes
This is an unofficial fan project. GTA V underlying artwork belongs to Rockstar Games. VIRUXE's public tiles do **not** establish the right to redistribute copyrighted game artwork; obtain rights clarification before broad promotion or monetization. GTADB's repository declares CC BY 4.0, but third-party assets and Rockstar intellectual property may require separate permission. GTA VI reconstruction is unofficial and may be inaccurate. Map artwork loads over the internet; if a remote provider changes its access rules, it may stop working. No map service was verified on a physical iPhone in this build.

## Sources
- https://github.com/rolux/gtadb.org
- https://github.com/VIRUXE/gtav-map-tiles
- https://leafletjs.com/ (BSD-2-Clause)
- https://creativecommons.org/licenses/by/4.0/

## Data caution
The map's JSON backup is **separate** from the Hunt HQ backup. Export both before replacing versions or clearing browser storage. Browser localStorage persistence depends on the same site origin.

## Leonida display fix
Previous versions requested `maps.gtadb.org` image tiles directly; these failed on the user's iPhone.
This build displays the working `https://map.gtadb.org/` source site in the GTA VI tab instead, with an explicit **Open full Leonida map** link if iframe embedding is disallowed by the source server.
The source site is third-party and may prevent iframe embedding; the direct link remains available. GTA VI research pins mode remains as a separate fallback.
This is not a claim of permission to redistribute GTADB artwork or Rockstar game assets.
