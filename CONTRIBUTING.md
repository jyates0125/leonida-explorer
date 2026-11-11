# Contribute to Team Jura Atlas

We welcome reproducible bugs, source-backed location corrections, design/accessibility suggestions, and independently written code. Start with [GitHub Issues](https://github.com/jyates0125/leonida-explorer/issues). Please include:

- Issue title and expected behavior versus what happened.
- Map (GTA V Story, GTA Online, GTA VI), device/browser and steps to reproduce.
- For a new pin: name, category, coordinates, game mode, source URL, confidence and source license.
- For suspected locations: mark **inferred**, **provisional**, or **unverified**, not confirmed.
- For code changes: explain the purpose, testing done, and any new third-party assets or dependencies.

Do not upload leaked, private, copyrighted/unlicensed imagery or scrape GTAWeb data without permission. GTADB data and tiles have CC BY 4.0 terms and require attribution. Only verified item pickup/vehicle spawn coordinates should be labeled as such. GTA V locations and GTA Online game functions must be distinguished; GTA VI remains provisional.

## Suggested review checklist

- [ ] Existing homepage `index.html` unchanged unless specifically reviewed
- [ ] Both game maps and all map layers display on the intended device
- [ ] Map pin tags, categories, and uncertainty are correct
- [ ] User saved progress and garage backups still work
- [ ] No runtime exceptions, broken navigation or horizontal overflow on mobile
- [ ] Attribution and data confidence preserved
