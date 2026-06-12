# Creature Card Backbone

This is a small static prototype for a creature-card summoning game. Open it with a local server and use the Summoning menu to test pack pulls.

## Current Systems

- Main menu with Summoning and Monsters sections.
- Dev layout editor for repositioning and resizing main-map buttons from inside the game.
- Monster collection screen listing all summoned creatures.
- Collection sorting by attribute, stars, level, ATK, SPD, DEF, or HP in ascending or descending order.
- Two summon packs:
  - Worst Scroll: one natural 1-3 star creature at 91.5% / 8% / 0.5%.
  - Mystic Pack: natural 3-5 star creatures at 91.5% / 8% / 0.5%.
- Packs can be opened in batches of 1, 10, or 100.
- Six rarity definitions exist: 1-5 stars plus Secret. No pack summons Secret yet.
- All non-secret cards can be upgraded to 6 stars.
- HP, ATK, and DEF are calculated as a percent of the card's final 6-star Lv40 stat budget.
- Star grade adds cumulative stat budget chunks: 1-star 10%, 2-star 16%, 3-star 24%, 4-star 34%, 5-star 50%, and 6-star 73%.
- Each level above Lv1 adds exactly `9 / 13` percent of the final 6-star Lv40 HP, ATK, and DEF, rounded to the nearest integer.
- Elements: Fire, Water, Wind, Light, Dark.
- Attribute rules:
  - Fire beats Wind.
  - Wind beats Water.
  - Water beats Fire.
  - Light and Dark are neutral to basic elements.
  - Light and Dark are strong against each other.
  - Advantage changes crit chance and effect accuracy modifiers, not direct damage.

## Future Hooks

Each summoned card instance already includes these fields for later expansion:

- `skills`: empty array for movesets.
- `art`: null placeholder for card images.
- `baseStats`, `currentStats`, and `projectedMaxStats`.
- `naturalStars`, `currentStars`, and `maxStars`.
- `canAwaken`: placeholder flag for evolution or awakening-style systems.

In the browser console, inspect `window.cardGameSystem` to see the live data, odds, player state, and helper functions.

## Editing Button Layouts

Run the dev server when you want in-game layout changes to write back to this repo:

```sh
node dev-server.mjs
```

Open `http://127.0.0.1:4174`, click **Edit Layout**, then drag map buttons to move them or drag the lower-right handle to resize them. If that port is busy, run another port, for example `node dev-server.mjs 4175`, and open `http://127.0.0.1:4175`.

- **Save** writes the current button layout to `layout.json`.
- **Save + GitHub** writes `layout.json`, commits it with `Update in-game layout`, and runs `git push`.
- If the game is opened without the dev server, edits are kept as a browser draft until the dev server is available.
