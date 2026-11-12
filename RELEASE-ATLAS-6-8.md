# Atlas 6.8 — Story / Online / Leonida activity condition isolation

## Included

- `atlas-activities.html` + `.css` + `.js`: mobile-friendly activity rule and personal status dashboard.
- `atlas-conditions.js`: pure reusable evaluator with `mode` on every rule, ghost clock, prerequisites, season confirmation, source expiry and mode isolation.
- GTA Online: rotating daily systems, weekly inventory, seasonal ghost/UFO/pumpkin events and player/session conditions.
- Story: eight Story Mode activity categories (no Online seasons, heists, dealers, vehicles, pumpkins or Online-specific collectibles).
- VI: separate pre-release research and verification categories; no GTA Online events copied over.
- Individual activity/pin color plumbing for any future authorized coordinate pack with explicit `activityId` + `rotationMarkerId` and correct scope; map labels do not automatically become event coordinates.
- Daily snapshot JSON example with NO asserted current locations; import is opt-in and expires.
- Main navigation, GTA V Story, Online, Cayo and VI Research links. Cache revision updated.

## Current limitations

- No direct GTA Online or GTA VI gameplay/account API; session-specific activity availability cannot be known from the browser.
- Most specific event datasets, daily positions and images are NOT bundled in this version. Map status highlighting requires accurate mapped marker IDs and a current sourced snapshot.
- GTA VI has no gameplay-verified road, active event or heist system in this release.
- Ghost hourly planner is based on 2026 schedule as published by GTADB, but season availability must be confirmed before using it in-game.
- User-stored progress is not backed up automatically; export before clearing browser data.

## Sources

- https://gtadb.net/gta-online-map/interactive/
- https://gtadb.net/gta-online-map/ghosts-exposed-2026/
- https://gtadb.net/gta-5-map/
- https://gtadb.net/gta-6-map/interactive/
- https://www.rockstargames.com/VI

No GTADB.net proprietary content is repackaged; only independently authored logic and citations are added. Existing GTADB.org CC BY 4.0 data pipeline remains unchanged.
