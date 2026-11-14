# Team Jura Atlas 7.4 · Verification and release boundaries

Generated: November 13, 2026.

**Verified in build pipeline**: JS syntax via Node, local href/src reference integrity, JSON schema counts, page list, ZIP integrity.

**Not verified in this tool session**: browser rendering, mobile tap behavior, third-party servers, full GTA V/GTA VI tile availability, elevation-based true 3D, road network routing, complete per-title collectibles/spawns. These require live device preview and current reference checks. GitHub main left unchanged.

**Parity levels**:

| Map | Locally navigable tiles | Markers | Filters | Routes | 3D | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| GTA V | Existing GTADB tiles | Starter + upstream licensed landmarks + opt-in sources | Yes | Existing planner; graph quality varies | Conditional | Needs data/completeness QA |
| GTA Online | Same GTADB V terrain | Separate online mode / opt-in sources | Yes | Existing planner | Conditional | Online rotating spawns not live synchronized |
| GTA VI | Community map tiles; Scaly/Loki/17/15/extra | Provisional GTADB + optional sources | Yes | Existing planner | Conditional | Verify after Nov 19 release |
| GTA IV | Source tiles via GitHub | Full upstream landmarks if online, 19 offline sample | Yes | Straight-line preview | No | No complete episode collectibles yet |
| Cayo Perico | Original schematic | Local planner marks | Limited | Schematic | No | Not a calibrated full island raster |
| GTA III/VC/SA/other classic | Reference gateways | Source links / count tracker | No local map markers | No | No | Do not claim equivalent full maps |

Sources: https://github.com/rolux/gtadb.org (MIT / CC BY 4.0), https://gtaweb.eu/, https://gtamap.io/gta-maps/, https://gta.wiki/w/Collectibles, https://www.rockstargames.com/VI.
