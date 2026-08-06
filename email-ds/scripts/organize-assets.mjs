// Copy the raw Assets-NN uploads into named brand asset folders.
// Run once after new assets land; the named copies are what the components import.
import { copyFileSync, mkdirSync } from 'node:fs';

const SRC = '..';
const OUT = 'public/brand';
for (const d of ['icons', 'badges', 'dividers', 'scene', 'textures']) mkdirSync(`${OUT}/${d}`, { recursive: true });

// The seven brand marks, in fixed order.
const MARKS = ['yerba-mate', 'lions-mane', 'l-theanine', 'no-cane-sugar', 'gluten-dairy-free', 'hot', 'iced'];

// Icons (no background) — four ink colors.
const ICONS = { gold: 30, leaf: 44, forest: 51, cream: 58 };
for (const [tone, first] of Object.entries(ICONS)) {
  MARKS.forEach((m, i) => copyFileSync(`${SRC}/Assets-${first + i}.png`, `${OUT}/icons/${m}-${tone}.png`));
}

// Badges (icon + label on a filled pill) — named by their BACKGROUND color.
const BADGES = { gold: 37, cream: 65, forest: 72 };
for (const [tone, first] of Object.entries(BADGES)) {
  MARKS.forEach((m, i) => copyFileSync(`${SRC}/Assets-${first + i}.png`, `${OUT}/badges/${m}-${tone}.png`));
}
// Leaf-green badges only exist for the three ingredients.
MARKS.slice(0, 3).forEach((m, i) => copyFileSync(`${SRC}/Assets-${79 + i}.png`, `${OUT}/badges/${m}-leaf.png`));

// Dividers — a rule with a diamond centerpiece.
for (const [tone, n] of Object.entries({ leaf: 23, cream: 24, gold: 25, forest: 26 })) {
  copyFileSync(`${SRC}/Assets-${n}.png`, `${OUT}/dividers/divider-${tone}.png`);
}

// Scene + textures.
copyFileSync(`${SRC}/Assets-02.png`, `${OUT}/scene/forest-canopy.png`);
copyFileSync(`${SRC}/Assets-03.jpg`, `${OUT}/textures/texture-gold.jpg`);
copyFileSync(`${SRC}/Assets-29.jpg`, `${OUT}/textures/texture-forest.jpg`);

console.log('organized brand assets into', OUT);
