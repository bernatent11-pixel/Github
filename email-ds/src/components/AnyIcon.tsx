import * as React from 'react';
import { EmailBg, onBg } from '../theme';
import { Icon, IconName } from './Icon';
import { BrandIcon, BrandMark } from './BrandIcon';

/**
 * Either a Milonga brand mark (`'yerba-mate'`, `'lions-mane'`, …) — the real
 * brand art — or one of the generic glyphs (`'bolt'`, `'check'`, …) for things
 * the brand set doesn't cover.
 */
export type AnyIconName = BrandMark | IconName;

const BRAND_MARKS: BrandMark[] = [
  'yerba-mate',
  'lions-mane',
  'l-theanine',
  'no-cane-sugar',
  'gluten-dairy-free',
  'hot',
  'iced',
];

export const isBrandMark = (n: AnyIconName): n is BrandMark => (BRAND_MARKS as string[]).includes(n);

export interface AnyIconProps {
  name: AnyIconName;
  bg?: EmailBg;
  size?: number;
}

/** Renders the brand art when the name is a brand mark, else the generic glyph. */
export function AnyIcon({ name, bg = 'forest', size = 22 }: AnyIconProps) {
  if (isBrandMark(name)) return <BrandIcon mark={name} bg={bg} size={size} />;
  return <Icon name={name} size={size} color={onBg[bg].icon} />;
}
