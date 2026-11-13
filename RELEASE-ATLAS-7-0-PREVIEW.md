# Atlas 7.0 Preview — Packaging and Accuracy Notes

**Prepared:** 13 November 2026  
**Target branch:** `atlas-7-dev` (not `main`)  
**Source:** user-supplied `Team-Jura-Atlas-Preview(1).zip`, containing 122 files and a version 6.8 functional baseline. The independently completed 6.9 source package is not verifiable from this ZIP.

## Changes made for this package

1. Updated page-specific browser titles and search descriptions throughout the active HTML pages to **Atlas 7.0 Preview**, with current navigation and visible release banners.
2. Replaced the outdated project showcase with a clear, attractive current-status and roadmap view, including implemented foundation vs pending 3D work.
3. Rebuilt the top-level README and deployment guide; moved the cumulative historical README into `docs/` and retained historical release records.
4. Added `SECURITY.md`, `Dependabot` config (GitHub Actions ecosystem), `.gitignore` and Cloudflare Pages `_headers`.
5. Added GitHub Actions checks for `atlas-7-dev` and a site metadata/link audit.
6. Bumped asset query cache versions and same-origin service-worker cache names without intentionally resetting existing user progress keys.
7. Kept the public Research page distinct from any private Research Lab; no private GTAMapLib assets or licensed external heightfield files are bundled.

## Not implemented or not verified

- No independently verified Atlas 6.9 engine merge; no complete 3D V/Online/VI integration, Cloudflare deployment, live tile network test, phone-browser acceptance or account-level GitHub security settings change.
- Community GTA VI maps, estimated landmarks and route sketches are provisional. Full GTAWeb/GTADB parity is not asserted.
- The planned private 3D Research Lab is deliberately excluded from this public ZIP.
- No historical runtime storage key migration was performed; users should export a backup before updating a live installation.

## Test record

See `TEST-REPORT-ATLAS-7-0-PREVIEW.txt` for results produced in the packaging environment. Those results do not substitute for hosted or mobile browser testing.
