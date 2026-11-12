# Atlas 6.4 — Cayo island + honest GTA VI route status

### Included
- Separate `atlas-cayo.html` map and original interactive SVG, with independent Cayo scoping states and heist route builder, no use of Los Santos coordinates.
- 20 named island planning markers and five category filters. All coordinates approximate/schematic, not in-game verified. The source supports place names and mechanics only; not these positions.
- Homepage Cayo tile and cross-map navigation links.
- Prevented automatic 'verified driving directions' from any imported community graph: valid path geometry != confirmed in-game drivable path.
- Bumped service-worker shell cache.

### Limitations
- The Cayo map is an original conceptual geographic diagram, **not** an official or calibrated map image, nor a complete Cayo POI database. Never report exact proximity or walking/driving time from its drawing.
- GTA VI launches November 19, 2026 as listed by Rockstar (accessed November 12, 2026); no release-verified road graph was available as of build. Graph import continues to work with prominent UNVERIFIED labels.
- Launch/nightly Pages and browser interactive tests must still be run on the uploaded branch.

### QA
- Existing offline checks + added Cayo checks and road-verification regression checks.
- Open `atlas-cayo.html` from a web server (not file://) and test search, categories, route, export and persistence.
- In `atlas-vi.html` test the source graph example and confirm its route displays UNVERIFIED.
