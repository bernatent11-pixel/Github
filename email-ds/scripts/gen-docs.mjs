// Generate per-component doc stubs so the DS pane groups cleanly and each
// component ships a human-written summary as its .prompt.md.
import { mkdirSync, writeFileSync } from 'node:fs';
mkdirSync('docs', { recursive: true });

const D = {
  // Foundations
  Logo: ['Foundations', 'The Milonga mark. Variants: `mark` (hand only), `primary` (MILONGA + hand — the standard), `full` (adds a YERBA MATE line). Tones: gold, green, beige, white.'],
  Icon: ['Foundations', 'The brand glyph set (leaf, bolt, brain, clock, heart, seed, check, cross, star) used in benefits, comparisons and list markers. Size and color are props.'],
  Divider: ['Foundations', 'A section break: `line` (hairline, default), `mark` (centered hand mark) or `dots` (three accent dots).'],
  BrandIcon: ['Foundations', 'The real Milonga icon art in four inks. Seven marks: yerba-mate, lions-mane, l-theanine (the three ingredients — always shown together), no-cane-sugar + gluten-dairy-free (an extra pair), and hot + iced (how to serve it). Ink is picked from the background.'],
  IconRow: ['Foundations', 'A row of brand icons with labels. Use the exported groups so marks stay together: INGREDIENTS (primary), FREE_FROM (extra), SERVE (hot/iced).'],
  ForestScene: ['Layout', 'The illustrated tree canopy. Sits on a beige or gold section and resolves into the dark green section below, so a background change reads as a scene rather than a hard edge.'],
  IconBadge: ['Foundations', 'A brand mark inside a filled disc, glyph in the opposite colour — a gold disc carries a dark green icon. Leads benefit and ingredient rows.'],
  BenefitList: ['Blocks', 'A vertical run of benefits, each led by a brand mark in a filled disc. Titles are two-tone by default; add `text` for a regular-weight line underneath.'],
  BleedImage: ['Blocks', 'A transparent product cutout that enters from the left or right edge of the email, running past the margin instead of sitting centred in a box. Place it directly in the shell, not inside a Section.'],
  BundleOffer: ['Blocks', 'The image-led sales close: a product shot, the one-time bundles side by side (buy 1 / 2 / 3), then the subscription across the full width as the best-value option. Use `PriceBlock` when the offer is only two options.'],
  PriceBlock: ['Blocks', 'The sales block: an optional bundle selector, then the purchase options side by side with their per-serving maths. The featured option is outlined in the accent colour and carries the solid button.'],
  // Layout
  EmailShell: ['Layout', 'The outer frame. A Milonga email is ONE flat color end to end — pass `bg` (forest / gold / beige) and every block inside inherits it.'],
  Section: ['Layout', 'A padded content band on the flat email color, optionally preceded by a hairline `rule`. The building block between header and footer.'],
  SectionHeading: ['Layout', 'Eyebrow + uppercase title + intro, colored automatically for the email background.'],
  Header: ['Layout', 'The masthead: the flat email background with the Milonga logo centered at 92px. The logo tone is picked automatically for contrast.'],
  Footer: ['Layout', 'The sign-off: hairline, Milonga lockup, uppercase social links, the MILONGA YERBA MATE brand line, then unsubscribe / view in browser.'],
  // Blocks
  Hero: ['Blocks', 'The opening statement: eyebrow, uppercase headline, a line of copy, the image, then the CTA. Omit the image for a typographic hero.'],
  Button: ['Blocks', 'The call to action — always uppercase, raised with a gradient face and shadow. Colors derive from the email background. `solid` or `outline`; sm / md / lg.'],
  ImageSlot: ['Blocks', 'An image block with an on-brand placeholder (product / lifestyle / studio). A regular photo is inset with rounded corners; a `cutout` (transparent PNG) runs full width with square corners, fitted not cropped.'],
  ProductCard: ['Blocks', 'A product feature block: image (cutout by default), uppercase name, spec chips, price and CTA — outlined so the flat color carries through.'],
  Callout: ['Blocks', 'An outlined band for a key message (`highlight`, set in caps) or a customer quote (`quote`, sentence case).'],
  List: ['Blocks', 'A short, scannable list with brand markers (leaf / check / dot) for benefits or steps in body copy.'],
  // Data
  BenefitsGrid: ['Data', 'A grid of icon + title + copy benefit cards — the core "why it’s good" block. 1 or 2 columns; cards are raised off the background.'],
  IngredientList: ['Data', 'A functional-ingredient readout: uppercase name, dose and what it does, one row each.'],
  ComparisonTable: ['Data', 'A "Milonga vs. the rest" table. Cells are check / cross / short text; the Milonga column is accented. `style`: rows (default), lane or grid.'],
  BarChart: ['Data', 'A horizontal bar chart for at-a-glance comparisons. The highlighted Milonga bar gets a gradient face; comparison bars stay muted.'],
  Stats: ['Data', 'A row of headline numbers with captions — dosages, counts, proof points.'],
  TextImage: ['Blocks', 'A short paragraph paired with an image. `stacked` gives the image full width above the text; `side` places them in two columns (alternate `imageSide` down the email).'],
  VersusBlock: ['Data', 'A two-column contrast — "Coffee at 3pm" vs "Milonga at 3pm". The right side is the Milonga side and is always the accented, raised one.'],
  Steps: ['Data', 'A 1-2-3 sequence. `numerals` shows oversized 01/02/03 (editorial, default); `discs` is a row of accent discs across the email.'],
  EnergyCurve: ['Data', 'The "no crash" story as a picture: energy over time. The Milonga line is solid in the accent color with a filled area wash; comparisons are dashed and muted.'],
  Panel: ['Layout', 'Groups related content. `raised` (default) lifts the block off the background with a soft fill, a lit top edge and a shadow; `outlined` is a flat hairline border.'],
  TwoToneTitle: ['Foundations', 'Splits a headline into two brand colors so titles are never one flat block — half beige / half gold on dark green, green-on-green elsewhere. Hero, SectionHeading and TextImage use it automatically; pass `accentPart` to choose the split.'],
  SectionBreak: ['Layout', 'The seam between two differently-colored sections. An email may switch background once or twice for emphasis — `hard` for a clean edge, `fade` to blend the colors.'],
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
