import * as React from 'react';
import { EmailBg } from '../theme';
import { BrandMark, MARK_LABEL, INGREDIENTS } from './BrandIcon';

// Badges — icon + label baked into a filled pill, named by the pill's fill.
import yerbaGold from '../../public/brand/badges/yerba-mate-gold.png';
import yerbaCream from '../../public/brand/badges/yerba-mate-cream.png';
import yerbaForest from '../../public/brand/badges/yerba-mate-forest.png';
import yerbaLeaf from '../../public/brand/badges/yerba-mate-leaf.png';
import maneGold from '../../public/brand/badges/lions-mane-gold.png';
import maneCream from '../../public/brand/badges/lions-mane-cream.png';
import maneForest from '../../public/brand/badges/lions-mane-forest.png';
import maneLeaf from '../../public/brand/badges/lions-mane-leaf.png';
import theaGold from '../../public/brand/badges/l-theanine-gold.png';
import theaCream from '../../public/brand/badges/l-theanine-cream.png';
import theaForest from '../../public/brand/badges/l-theanine-forest.png';
import theaLeaf from '../../public/brand/badges/l-theanine-leaf.png';
import sugarGold from '../../public/brand/badges/no-cane-sugar-gold.png';
import sugarCream from '../../public/brand/badges/no-cane-sugar-cream.png';
import sugarForest from '../../public/brand/badges/no-cane-sugar-forest.png';
import freeGold from '../../public/brand/badges/gluten-dairy-free-gold.png';
import freeCream from '../../public/brand/badges/gluten-dairy-free-cream.png';
import freeForest from '../../public/brand/badges/gluten-dairy-free-forest.png';
import hotGold from '../../public/brand/badges/hot-gold.png';
import hotCream from '../../public/brand/badges/hot-cream.png';
import hotForest from '../../public/brand/badges/hot-forest.png';
import icedGold from '../../public/brand/badges/iced-gold.png';
import icedCream from '../../public/brand/badges/iced-cream.png';
import icedForest from '../../public/brand/badges/iced-forest.png';

/** The pill fill. `leaf` exists only for the three ingredients. */
export type BadgeFill = 'gold' | 'cream' | 'forest' | 'leaf';

const ART: Record<BrandMark, Partial<Record<BadgeFill, string>>> = {
  'yerba-mate': { gold: yerbaGold, cream: yerbaCream, forest: yerbaForest, leaf: yerbaLeaf },
  'lions-mane': { gold: maneGold, cream: maneCream, forest: maneForest, leaf: maneLeaf },
  'l-theanine': { gold: theaGold, cream: theaCream, forest: theaForest, leaf: theaLeaf },
  'no-cane-sugar': { gold: sugarGold, cream: sugarCream, forest: sugarForest },
  'gluten-dairy-free': { gold: freeGold, cream: freeCream, forest: freeForest },
  hot: { gold: hotGold, cream: hotCream, forest: hotForest },
  iced: { gold: icedGold, cream: icedCream, forest: icedForest },
};

/** Pill fill that contrasts with each email background. */
export const fillFor: Record<EmailBg, BadgeFill> = {
  forest: 'gold',
  gold: 'forest',
  beige: 'forest',
};

export interface BrandBadgeProps {
  mark: BrandMark;
  /** The email background — picks a contrasting pill fill automatically. */
  bg?: EmailBg;
  /** Override the pill fill. `leaf` only exists for the ingredients. */
  fill?: BadgeFill;
  /** Rendered height in px. */
  size?: number;
}

/** A finished brand pill — icon and label together, on a filled background. */
export function BrandBadge({ mark, bg = 'forest', fill, size = 34 }: BrandBadgeProps) {
  const want = fill ?? fillFor[bg];
  // Fall back to gold when a mark has no art in the requested fill.
  const src = ART[mark][want] ?? ART[mark].gold ?? ART[mark].forest!;
  return (
    <img
      src={src}
      alt={MARK_LABEL[mark]}
      height={size}
      style={{ display: 'inline-block', height: size, width: 'auto' }}
    />
  );
}

export interface BadgeRowProps {
  /** Which marks to show. Defaults to the three ingredients. */
  marks?: BrandMark[];
  bg?: EmailBg;
  fill?: BadgeFill;
  size?: number;
  align?: 'left' | 'center';
}

/**
 * A row of brand pills. Keep the brand's groupings: INGREDIENTS together first,
 * FREE_FROM together as an extra, SERVE together for hot/iced.
 */
export function BadgeRow({ marks = INGREDIENTS, bg = 'forest', fill, size = 34, align = 'center' }: BadgeRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        alignItems: 'center',
      }}
    >
      {marks.map((m) => (
        <BrandBadge key={m} mark={m} bg={bg} fill={fill} size={size} />
      ))}
    </div>
  );
}
