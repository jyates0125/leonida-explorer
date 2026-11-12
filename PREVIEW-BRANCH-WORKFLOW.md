# Next phase: Protect main and preview on branches

Team Jura Atlas 6.1 is the last planned main-branch feature upload. From this point, develop new features in a separate **develop** branch (or small `feature/...` branches), test with the included GitHub Action **Atlas validation**, and use pull requests for review before merging to main.

Steps on GitHub:
1. Open repository branch selector (currently `main`), type `develop`, choose **Create branch: develop from main**.
2. For new features select `develop`, upload there, and use a PR against main when tested.
3. To preview on GitHub Pages without changing production main, create a second separate Pages repository or a dedicated `preview` folder on the main-hosted site. GitHub Pages normally publishes a single configured source branch; pushing to develop **does not** automatically make that branch live. There is no separate preview hosting configured in this release.
4. Check `Actions > Atlas validation` for syntax and structural tests. These do not substitute for manual mobile/desktop browser checks.
5. Keep user progress backups and deployment instructions; do not commit user pin exports.

VI auto-snapshot sync remains on main, but only if `Actions > Refresh licensed GTA VI landmarks` is enabled. This is a data-maintenance commit, not a new feature release.
