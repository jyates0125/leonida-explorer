# Atlas 7.4.1 combined preview — release checks

## Scope
- New Thanksgiving × winter directory design is applied to the homepage; explorer pages use the unified complementary palette and responsive toolbar styling. Specialized pages share the same studio shell and spacing rules.
- One Last Ride has a dedicated HTML page, approved poster, playable motion-poster MP4 and 9-scene interactive storyboard. **This is not a fully animated movie.** The 36-second teaser is a motion-poster preview, not source gameplay footage.
- Sources have three categories: **Official** Rockstar/Take-Two; **Community Research & Development** attributed independently; **Fan-made / Unverified** research and fictional cinematic ideas. Crediting is not permission to copy.
- The official developer and community research credits are intentionally distinct. Review `ATTRIBUTION-AND-COMMUNITY-RD.md` and `atlas-credits.html`.

## Checks performed
- Static HTML page parsing, required local links/scripts/styles/images, JavaScript syntax and Python test scripts; summary in `RELEASE-TEST-RESULTS-741.txt`.
- Preview MP4 decoded/inspected with ffprobe.
- ZIP CRC and expected entries verified after packaging.

## Still required before public production
- Manual browser/device acceptance on desktop and phone for all interactive map and routes, map tile providers and license constraints.
- Check service worker cache after deployment, network errors and API behavior.
- Separate licenses/permissions for Rockstar footage/trailer clips, public-person likeness/voice or audio, map tile reuse and music if footage is added.
- Never treat GTA VI fan reconstructions as official coordinates.

## Safe deployment
Preview only on `atlas-7-dev`. Keep `main` untouched until tested and reviewed. Upload extracted files to the root of the preview branch (not the enclosing folder); large web uploads may need batches.
