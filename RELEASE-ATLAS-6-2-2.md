# Team Jura Atlas 6.2.2 — Two-sided Loki/Scaly legends

Continuing Atlas 6.2.1 source, not a reimplementation.

- On GTA VI **Scaly** and **Loki** illustrated views, the **left map legend** now controls live category visibility for existing, source-based map markers. All on, all off, toggle each category and Only are wired to the Atlas core.
- The **right trailer legend** shows only records explicitly carrying words such as trailer, footage or scene in the loaded database. These are research candidates, **not verified frames or coordinates**; when none are sourced it says so rather than fabricating locations.
- The right legend provides a shortcut to the existing multi-stop navigation planner; map selection and routing behavior are unchanged.
- Both floating panels collapse independently and shrink for mobile. Other styles and GTA V/Online remain unchanged.
- Attribution, licensed map imagery, offline progress and saved data keys are retained from Atlas 6.2.1.

## Upload

Use the **GTA-maps development branch** to test first, then merge into `main` after browser verification. Upload the entire archive at repository root (preserving folders) or update only changed files. Do not overwrite `main` without viewing the live preview and testing both map legends.

## Verification still needed

Live trailer tagging depends on successfully loaded dataset; live source tile fetching, responsive interactions and GitHub Pages behavior require browser testing. Source comparisons do not grant redistribution rights for GTAWeb assets.
