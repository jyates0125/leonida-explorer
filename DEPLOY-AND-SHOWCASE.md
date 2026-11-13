# Team Jura Atlas 7.0 Preview — Browser Deployment Runbook

## Safety gate

- Use `atlas-7-dev` for the development preview. Never overwrite `main` or force-merge divergent branches.
- Preserve existing routes, categories, save keys and attribution files. Extract ZIP contents before browser upload.
- This uploaded source is a 6.8 functionality baseline with updated 7.0 preview presentation and project governance; do not claim it is the completed 6.9 engine.

## GitHub upload in Microsoft Edge

1. Visit <https://github.com/jyates0125/leonida-explorer/tree/atlas-7-dev> and verify the branch label at the top says **atlas-7-dev**.
2. Extract the ZIP locally. The site files must be at the root of the extracted folder, not inside an extra folder called `atlas7_stage`.
3. **GitHub allows up to 100 files per browser upload.** Use the two prepared archive batches (`Atlas_7_0_Preview_Upload_Batch_A_Website.zip` then `Atlas_7_0_Preview_Upload_Batch_B_Docs_Security.zip`), one at a time; extract each ZIP first. Choose **Add file → Upload files** in `atlas-7-dev`. Drag in the extracted contents, maintaining each directory path. Verify the file-change list before committing. Do not upload either ZIP as a single file.
4. The GitHub browser may require special handling for nested directories and hidden files (`.github`, `.gitignore`, `.nojekyll`). Inspect each path after upload. If a file overwrite is blocked, stop and use the GitHub web editor or browser-based Codespaces rather than deleting files blindly.
5. Ensure `project.html`, `README.md`, `SECURITY.md`, `.github/workflows/atlas-checks.yml`, `.github/workflows/atlas-preview.yml`, and `scripts/test_site_release_70.py` all appear in the correct paths.
6. Commit **only to atlas-7-dev**. Suggested message: `Prepare Atlas 7.0 preview branding, docs, security and branch CI`.
7. Inspect **Actions** for passing validation. A `403` from the ChatGPT GitHub integration does not prevent your browser upload under your account.

## Cloudflare Pages

1. Wait for Cloudflare's account verification, if required by Cloudflare. Do not use production Direct Upload as a workaround.
2. Use **Workers & Pages → Create → Pages → Connect to Git** and authorize only the intended repository.
3. Site: `team-jura-atlas`; repository: `jyates0125/leonida-explorer`; production branch: **main**; framework preset **None**; no build command, or `exit 0`; output directory `.`.
4. Configure previews for **atlas-7-dev**. Cloudflare Pages previews may be public by default; protect previews with Cloudflare Access before sharing them or treating them as restricted.
5. Keep the private local Research Lab and any non-redistributable artwork **outside** the public GitHub repository and Cloudflare deploy output.
6. Verify the Cloudflare deployment points to the expected commit and branch before sharing its URL.

## Browser release test

- [ ] Open `/`, `/project.html`, `/atlas.html`, `/atlas-online.html`, `/atlas-vi.html`, `/atlas-research.html` on desktop and mobile.
- [ ] Confirm every current page has **Atlas 7.0 Preview** in the browser tab and an accurate page-specific description. Historical documents can retain their original dates.
- [ ] Verify real map imagery loads, not just empty map controls; pan/zoom and GTA V/Online/VI switching work.
- [ ] Check Scaly and Loki selections and their separate legends; treat both as community reconstructions.
- [ ] Test search, category toggles, pins, route preview, progress save/export/import and activities.
- [ ] Check console, broken links, 404s, legal attribution and privacy controls.
- [ ] Check cache/service-worker activation, hard refresh and a second device.
- [ ] Do not advertise 3D as finished until calibrated imagery and height data have been checked per map mode.
- [ ] Only then prepare a reviewed PR; never merge automatically.

## Technical checks

```sh
python scripts/test_site_release_70.py
python scripts/test_atlas_static.py
python scripts/test_sync_gtadb_vi.py
for f in ./*.js; do node --check "$f"; done
```
