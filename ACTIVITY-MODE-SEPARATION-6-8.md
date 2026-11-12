# Atlas 6.8: Game-specific activity conditions

The conditions dashboard is available in **three strictly scoped modes**:

- `atlas-activities.html?mode=story` — GTA V Story Mode only. No Gun Van, daily dealers, weekly rotations, pumpkins, ghosts, or GTA Online businesses/events.
- `atlas-activities.html?mode=online` — GTA Online (includes Cayo Perico). Daily global rotations are different from player-specific, session and event conditions.
- `atlas-activities.html?mode=vi` — GTA VI Leonida research and forthcoming game evidence only. GTA Online content must not be carried over as VI gameplay facts.

Each mode uses its own progress key, `jura68-conditions-<mode>`, while GTA Online dated rotation imports are stored under a separate key. Activity rules do not create map pins or invent coordinate datasets. Map pins require a known licensed source, game scope, and an explicit activity ID. For imported activity pins use `game: "5"` with `scope: "online"` or `scope: "story"` (matching the activity mode); for GTA VI use `game: "6"` and `scope: "vi"`. Do not tag an activity as `both`; matches must be location IDs validated against the imported source. No user account or automatic Rockstar game-state access.

## Map marker status
- Yellow: eligible in the manually confirmed in-game clock or selected in a current dated position snapshot; a manually imported snapshot is explicitly labeled *not independently verified*.
- White: published possible spot, not confirmed current.
- Gray: marked completed or locked.
- Blue: no current dated data, or GTA VI research without verification.

Source references: https://gtadb.net/gta-online-map/interactive/ , https://gtadb.net/gta-online-map/ghosts-exposed-2026/ , https://gtadb.net/gta-5-map/ , https://gtadb.net/gta-6-map/interactive/ .

## Known limits
Data feed imports and activity progress are on-device only. Atlas cannot know a player's current requested Simeon cars, Exotic Exports board, whether a random event spawned, or whether the game session has an activity enabled. Verify each location before displaying as active; expiry turns selections off. Story Mode and GTA VI never display Online activity rules. No new licensed images or full coordinate datasets are included by this release.
