// LUZ color system: tokens, CMYK, nearest-Pantone notes, WCAG matrix.
import { writeFileSync } from 'node:fs';

const C = {
  forest:     { hex: '#004D27', name: 'Forest',      role: 'Primary ground. Backgrounds, buttons, icons, wordmark on light.', pms: 'PMS 3435 C (nearest)' },
  gold:       { hex: '#E3BC62', name: 'Gold',        role: 'Primary highlight. Titles on dark, accents, the sol. On tin: metallic spec.', pms: 'PMS 141 C (nearest) · tin: PMS 871 C metallic or hot foil' },
  leaf:       { hex: '#057441', name: 'Leaf',        role: 'Secondary. Buttons, botanical accents, eyebrows and icons on gold.', pms: 'PMS 3425 C (nearest)' },
  beige:      { hex: '#F0EFDF', name: 'Beige',       role: 'Light ground. Backgrounds, paper.', pms: 'print as paper or 6% tint of PMS 7527 C' },
  white:      { hex: '#FFFFFF', name: 'White',       role: 'Text only, on forest and gold grounds.', pms: '—' },
  forestDeep: { hex: '#00351B', name: 'Forest Deep', role: 'Depth tone: shadows, pattern-on-forest, hover states.', pms: 'PMS 627 C (nearest)' },
  goldSoft:   { hex: '#EFD9A0', name: 'Gold Soft',   role: 'Soft fills, illustration skies, tints.', pms: 'PMS 7501 C (nearest)' },
  cream:      { hex: '#FBF8EF', name: 'Cream Paper', role: 'Email/web paper tone where beige is too heavy.', pms: 'paper' },
  ink:        { hex: '#12331F', name: 'Ink',         role: 'Long-form text on light grounds.', pms: 'PMS 5535 C (nearest)' },
};

const hex2rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const cmyk = h => {
  const [r, g, b] = hex2rgb(h).map(v => v / 255);
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return [0, 0, 0, 100];
  return [((1 - r - k) / (1 - k)), ((1 - g - k) / (1 - k)), ((1 - b - k) / (1 - k)), k].map(v => Math.round(v * 100));
};
const lum = h => {
  const [r, g, b] = hex2rgb(h).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); };

// text/ground pairs the system allows or forbids
const pairs = [
  ['forest', 'beige'], ['ink', 'beige'], ['leaf', 'beige'],
  ['white', 'forest'], ['gold', 'forest'], ['beige', 'forest'], ['goldSoft', 'forest'],
  ['forest', 'gold'], ['ink', 'gold'], ['forestDeep', 'gold'], ['white', 'gold'],
  ['forest', 'goldSoft'], ['white', 'leaf'], ['gold', 'beige'], ['leaf', 'gold'],
  ['ink', 'cream'], ['forest', 'cream'],
];

let rows = pairs.map(([t, g]) => {
  const r = ratio(C[t].hex, C[g].hex);
  const aa = r >= 4.5 ? 'AA' : r >= 3 ? 'AA-large only' : 'FAIL';
  const aaa = r >= 7 ? ' · AAA' : '';
  return `| ${C[t].name} on ${C[g].name} | ${r.toFixed(2)}:1 | ${aa}${aaa} |`;
}).join('\n');

const tokenEntries = Object.entries(C);

writeFileSync('tokens.json', JSON.stringify({
  color: Object.fromEntries(tokenEntries.map(([k, v]) => [k, { value: v.hex, cmyk: cmyk(v.hex), pantone: v.pms, role: v.role }])),
  ratio: { screen: { beige: 60, forest: 25, gold: 12, leaf: 3 }, pack: { gold: 55, forest: 35, beige: 10 } },
}, null, 2));

writeFileSync('color-tokens.css', `:root{\n${tokenEntries.map(([k, v]) => `  --luz-${k}: ${v.hex};`).join('\n')}\n}\n`);

writeFileSync('color.md', `# LUZ Color System

Inherited from the Milonga foundation ("never invent a hex — these five do everything"), with LUZ usage rules.
All Pantone matches are nearest approximations — **confirm against a physical Pantone book with the printer.**
Tin gold is metallic in print: **PMS 871 C metallic ink or hot foil**, chosen with the tin printer. Never simulate it with a CMYK gradient.

## Palette

| Color | HEX | RGB | CMYK (approx) | Pantone | Role |
|---|---|---|---|---|---|
${tokenEntries.map(([k, v]) => `| **${v.name}** | ${v.hex} | ${hex2rgb(v.hex).join(' · ')} | ${cmyk(v.hex).join('/')} | ${v.pms} | ${v.role} |`).join('\n')}

## Usage ratios

- **Screen (site, email, social):** 60% Beige/Cream ground · 25% Forest · 12% Gold · 3% Leaf.
- **Pack (tin, stick, mailer):** 55% Gold (metallic) · 35% Forest · 10% Beige. The shelf reads gold first, forest second — like the approved tin.
- One ground per piece. Everything sits on Forest, Beige/Cream, or Gold — never stacked grounds.

## Approved text pairings (WCAG 2.1, computed)

| Pairing | Contrast | Verdict |
|---|---|---|
${rows}

## Rules

- **Forbidden:** Gold text on Beige (fails), Leaf body text on Forest, White on Gold (fails), long text in Gold anywhere — Gold is for display moments ≥24 px.
- Gold on Forest is display-only (AA-large): headlines, the wordmark, numbers — never body copy.
- Body copy on light grounds is Ink or Forest; on Forest it is White or Beige.
- Never white cards on white/beige grounds (carried from Milonga book). Paper grain lives on Forest and Gold, never on Beige.
`);
console.log('color system written');
