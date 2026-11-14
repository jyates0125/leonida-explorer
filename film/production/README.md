# ONE LAST RIDE · Production master

**Team Jura × Elario Studios**  |  Version 7.4.1 fan-film production bundle  |  2026-11-13

## State of the project

The website includes a **playable, original 36-second motion-poster video with original generated instrumental sound**, nine interactive story chapters, approved ensemble art, and a browser-local memory wall. **This is not a finished animated feature.** Full-action animation, fully mixed dialogue, gameplay recordings and official trailer footage have not been rendered or licensed here. A site-ready proof of concept and a complete shoot/edit blueprint are included.

## Narrative north star

**Loki and Scaly Man are the leads.** Their bond is the reason the plot works: each saves the other during a state-wide battle that starts near Paleto Bay, moves through Los Santos, and ends aboard a luxury Aquarius Galaxy Super Yacht. Cmac is introduced in a fictionalized 55th Street homecoming after a bus arrival and one affectionate hug with Lupe; he later fights the Yeti in a tragicomic act of compassion. The crew believes they have survived, until something hits the yacht in open water. Some are swept apart. **Do not confirm whether Loki, Scaly Man or Cmac survive.** A separate GTA VI fan chapter picks up the mystery with Jason and Lucia and an artifact washing up in Leonida.

## Order of production files

1. `SCREENPLAY.md` — scene-by-scene narrative, dialogue, timing and transition.
2. `SHOT-LIST.csv` — practical film/edit sequence for storyboard frames and gameplay capture.
3. `VOICE-AND-SOUND.md` — original voice personas, Foley/effects, original score design and mix guidance.
4. `ASSET-AND-RIGHTS.md` — verified credits versus community R&D, third-party permissions and public release checklist.
5. `../../one-last-ride.html` — working public film page and memory wall.
6. `../assets/one-last-ride-motion-preview.mp4` — 36-second MP4 proof-of-direction.

## Visual continuity

- **Loki:** Long flowing crimson/red hair, theatrical white/red/black Joker-style face paint, dramatic scarlet top hat and ornate red suit. Maintain across shots; separate outfit variations in flashbacks only.
- **Scaly Man:** Clean recognizable face and green short/spiked hair matching submitted gamer outfits; polished purple and emerald **galaxy suit** (not a face-covering mask). Alternate all-blue suit only in Cmac memory/dream beat.
- **Cmac:** Blue-clothed fictionalized cameo grounded in provided imagery; the 55th Street alley, bus and Lupe hug are imaginative re-creations, not claimed real events.
- **World:** recognizable GTA V landscape, forest, Paleto coast, LS freeways, the waterfront and yacht; surreal handoff to neon Leonida, no claim of being actual traversable in-game map connection.
- **Color:** Thankgiving amber/red at dusk → deep navy/steel and kinetic cyan during pursuit → purple-pink/teal at the Leonida handoff. Match the overall polish and bright contrast of official *marketing language*, not exact frames or third-party assets.

## Editing and delivery standards

16:9 composition, minimum 1080p master for final animated film when produced; spatially coherent action (land vehicles reach waterfront, then boats/helicopters reach ship); on-screen subtitles for dialogue and character names; safe audio peak <= -1 dBTP for final export, nominal online mix around -16 LUFS integrated (adjust per destination); no autoplay. Keep a 9:16 trailer crop plan for mobile. Never replace an unavailable scene with an unlabelled official screenshot.

## Deployment

Deploy website files into **`atlas-7-dev`** first; do **not** merge over `main` until visual review of laptop/phone, map tiles and research dataset permissions. This ZIP contains the website root; `index.html` stays at repository root. The film page is `/one-last-ride.html`. Changes must be tested in a served HTTPS preview (not `file://`) because service workers and map fetching need a proper origin.
