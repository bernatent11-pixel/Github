// Generate per-component doc stubs so the DS pane groups cleanly and each
// component ships a human-written summary as its .prompt.md.
import { mkdirSync, writeFileSync } from 'node:fs';
mkdirSync('docs', { recursive: true });

const D = {
  // Foundations
  Logo: ['Foundations', 'The Milonga wordmark + hand/plant mark in the new brand palette. Variants: `mark` (hand only), `primary` (hand + MILONGA), `full` (YERBA MATE + hand + MILONGA). Tones: gold, green, beige, white — pick for contrast against the surface.'],
  Icon: ['Foundations', 'The brand glyph set (leaf, bolt, brain, clock, heart, seed, check, cross, star) used in benefits, comparisons and list markers. Size and color are props.'],
  Divider: ['Foundations', 'A section break: `line` (hairline), `mark` (centered hand mark) or `dots` (three gold dots). Set `onDark` on forest surfaces.'],
  // Layout
  EmailShell: ['Layout', 'The outer email frame — a full-bleed page backdrop with a centered content column at email width (~600px). Wrap every Milonga email in this, then stack blocks inside.'],
  Section: ['Layout', 'A padded content band with a brand surface (white / beige / forest / gold / leaf / cream). The building block that hosts content between the header and footer.'],
  SectionHeading: ['Layout', 'Eyebrow + title + intro set in Gotham with the brand rhythm. Use `onDark` on forest surfaces.'],
  Header: ['Layout', 'The email masthead: centered logo, optional tagline ("Energy That Thinks"), on a forest (dark) or beige (light) bar.'],
  Footer: ['Layout', 'The closing block: logo, tagline, social links, address and unsubscribe. Forest (dark) or beige (light).'],
  // Blocks
  Hero: ['Blocks', 'The opening statement: eyebrow, big Gotham headline, a line of copy, a CTA, and a hero image slot. Tones: forest, gold, beige.'],
  Button: ['Blocks', 'The call-to-action. Gold-on-forest is the Milonga default. Variants: gold, forest, leaf, outline, outlineOnDark. Sizes: sm, md, lg.'],
  ImageSlot: ['Blocks', 'An image block with a first-class on-brand placeholder (product / lifestyle / studio). Drop a `src` in later and the placeholder is replaced 1:1.'],
  ProductCard: ['Blocks', 'A single product feature card: image, name, spec chips, price and CTA.'],
  Callout: ['Blocks', 'A highlighted band for a key message (`highlight`) or a customer quote (`quote`). Tones: forest, gold, beige.'],
  List: ['Blocks', 'A short, scannable list with brand markers (leaf / check / dot) for benefits or steps in body copy.'],
  // Data
  BenefitsGrid: ['Data', 'A grid of icon + title + copy benefit cards — the core "why it’s good" block. 1 or 2 columns; `onDark` for forest surfaces.'],
  IngredientList: ['Data', 'A functional-ingredient readout: name, dose and what it does, one row each.'],
  ComparisonTable: ['Data', 'A "Milonga vs. the rest" table. Cells are check / cross / short text; the Milonga column is highlighted in forest + gold.'],
  BarChart: ['Data', 'A minimal horizontal bar chart for at-a-glance comparisons (caffeine, focus). Highlight the Milonga bar in gold.'],
  Stats: ['Data', 'A row of headline numbers with captions — dosages, counts, proof points.'],
  // Blueprints
  PromoEmail: ['Blueprints', 'Full promotion email: masthead, hero offer, proof stats, a highlighted code band and a closing CTA. Swap in product/lifestyle art.'],
  EducationalEmail: ['Blueprints', 'Full educational email: hero image, benefits, an ingredient readout and a comparison chart. The "value" email.'],
  StorytellingEmail: ['Blueprints', 'Full brand-story email: an evocative hero, a short story section with a lifestyle image, a customer quote and a soft CTA.'],
  LaunchEmail: ['Blueprints', 'Full product-launch email: a bold hero, the product card, a "why it’s different" comparison and an urgency band.'],
};

for (const [name, [category, blurb]] of Object.entries(D)) {
  writeFileSync(`docs/${name}.md`, `---\ncategory: ${category}\n---\n\n# ${name}\n\n${blurb}\n`);
}
console.log('wrote', Object.keys(D).length, 'doc stubs to docs/');
