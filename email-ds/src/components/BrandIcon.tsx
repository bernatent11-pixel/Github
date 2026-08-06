import * as React from 'react';
import { EmailBg, onBg } from '../theme';

// Icons — the real brand art, four ink colors each.
import yerbaGold from '../../public/brand/icons/yerba-mate-gold.png';
import yerbaLeaf from '../../public/brand/icons/yerba-mate-leaf.png';
import yerbaForest from '../../public/brand/icons/yerba-mate-forest.png';
import yerbaCream from '../../public/brand/icons/yerba-mate-cream.png';
import maneGold from '../../public/brand/icons/lions-mane-gold.png';
import maneLeaf from '../../public/brand/icons/lions-mane-leaf.png';
import maneForest from '../../public/brand/icons/lions-mane-forest.png';
import maneCream from '../../public/brand/icons/lions-mane-cream.png';
import theaGold from '../../public/brand/icons/l-theanine-gold.png';
import theaLeaf from '../../public/brand/icons/l-theanine-leaf.png';
import theaForest from '../../public/brand/icons/l-theanine-forest.png';
import theaCream from '../../public/brand/icons/l-theanine-cream.png';
import sugarGold from '../../public/brand/icons/no-cane-sugar-gold.png';
import sugarLeaf from '../../public/brand/icons/no-cane-sugar-leaf.png';
import sugarForest from '../../public/brand/icons/no-cane-sugar-forest.png';
import sugarCream from '../../public/brand/icons/no-cane-sugar-cream.png';
import freeGold from '../../public/brand/icons/gluten-dairy-free-gold.png';
import freeLeaf from '../../public/brand/icons/gluten-dairy-free-leaf.png';
import freeForest from '../../public/brand/icons/gluten-dairy-free-forest.png';
import freeCream from '../../public/brand/icons/gluten-dairy-free-cream.png';
import hotGold from '../../public/brand/icons/hot-gold.png';
import hotLeaf from '../../public/brand/icons/hot-leaf.png';
import hotForest from '../../public/brand/icons/hot-forest.png';
import hotCream from '../../public/brand/icons/hot-cream.png';
import icedGold from '../../public/brand/icons/iced-gold.png';
import icedLeaf from '../../public/brand/icons/iced-leaf.png';
import icedForest from '../../public/brand/icons/iced-forest.png';
import icedCream from '../../public/brand/icons/iced-cream.png';

/** The seven Milonga marks. */
export type BrandMark =
  | 'yerba-mate'
  | 'lions-mane'
  | 'l-theanine'
  | 'no-cane-sugar'
  | 'gluten-dairy-free'
  | 'hot'
  | 'iced';

export type BrandInk = 'gold' | 'leaf' | 'forest' | 'cream';

/** The three functional ingredients — always shown together, and first. */
export const INGREDIENTS: BrandMark[] = ['yerba-mate', 'lions-mane', 'l-theanine'];
/** The free-from claims — always shown together, as a secondary note. */
export const FREE_FROM: BrandMark[] = ['no-cane-sugar', 'gluten-dairy-free'];
/** How to serve it — always shown together. */
export const SERVE: BrandMark[] = ['hot', 'iced'];

/** Human labels for each mark. */
export const MARK_LABEL: Record<BrandMark, string> = {
  'yerba-mate': 'Yerba Mate',
  'lions-mane': "Lion's Mane",
  'l-theanine': 'L-Theanine',
  'no-cane-sugar': 'No cane sugar / erythritol',
  'gluten-dairy-free': 'Gluten & dairy-free',
  hot: 'Hot',
  iced: 'Iced',
};

const ART: Record<BrandMark, Record<BrandInk, string>> = {
  'yerba-mate': { gold: yerbaGold, leaf: yerbaLeaf, forest: yerbaForest, cream: yerbaCream },
  'lions-mane': { gold: maneGold, leaf: maneLeaf, forest: maneForest, cream: maneCream },
  'l-theanine': { gold: theaGold, leaf: theaLeaf, forest: theaForest, cream: theaCream },
  'no-cane-sugar': { gold: sugarGold, leaf: sugarLeaf, forest: sugarForest, cream: sugarCream },
  'gluten-dairy-free': { gold: freeGold, leaf: freeLeaf, forest: freeForest, cream: freeCream },
  hot: { gold: hotGold, leaf: hotLeaf, forest: hotForest, cream: hotCream },
  iced: { gold: icedGold, leaf: icedLeaf, forest: icedForest, cream: icedCream },
};

/** Which ink reads on which background. */
export const inkFor: Record<EmailBg, BrandInk> = {
  forest: 'gold',
  gold: 'cream',
  beige: 'forest',
};

export interface BrandIconProps {
  mark: BrandMark;
  /** The email background — picks the ink automatically. */
  bg?: EmailBg;
  /** Override the ink color. */
  ink?: BrandInk;
  /** Rendered height in px. */
  size?: number;
  alt?: string;
}

/** A Milonga brand icon — the real art, not a drawn substitute. */
export function BrandIcon({ mark, bg = 'forest', ink, size = 40, alt }: BrandIconProps) {
  const tone = ink ?? inkFor[bg];
  return (
    <img
      src={ART[mark][tone]}
      alt={alt ?? MARK_LABEL[mark]}
      height={size}
      style={{ display: 'inline-block', height: size, width: 'auto' }}
    />
  );
}

export interface IconRowProps {
  /** Which marks to show. Defaults to the three ingredients. */
  marks?: BrandMark[];
  bg?: EmailBg;
  ink?: BrandInk;
  size?: number;
  /** Show the label under each icon. */
  labels?: boolean;
}

/**
 * A row of brand icons. Use the exported groups so the marks stay together the
 * way the brand intends: INGREDIENTS (primary), FREE_FROM (extra), SERVE.
 */
export function IconRow({ marks = INGREDIENTS, bg = 'forest', ink, size = 56, labels = true }: IconRowProps) {
  const t = onBg[bg];
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 26, flexWrap: 'wrap', textAlign: 'center' }}>
      {marks.map((m) => (
        <div key={m} style={{ maxWidth: 120 }}>
          <BrandIcon mark={m} bg={bg} ink={ink} size={size} />
          {labels ? (
            <div
              style={{
                marginTop: 9,
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: t.accent,
                lineHeight: 1.35,
              }}
            >
              {MARK_LABEL[m]}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
