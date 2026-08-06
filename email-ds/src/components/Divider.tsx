import * as React from 'react';
import { EmailBg, onBg } from '../theme';
import { Logo } from './Logo';
import divLeaf from '../../public/brand/dividers/divider-leaf.png';
import divCream from '../../public/brand/dividers/divider-cream.png';
import divGold from '../../public/brand/dividers/divider-gold.png';
import divForest from '../../public/brand/dividers/divider-forest.png';

export interface DividerProps {
  /**
   * `brand` = the rule-with-diamond brand art (the default separator) ·
   * `line` = a plain hairline · `mark` = the centered hand mark ·
   * `dots` = three accent dots.
   */
  variant?: 'brand' | 'line' | 'mark' | 'dots';
  /** The email's flat background color. */
  bg?: EmailBg;
  /** Vertical space above/below in px. */
  gap?: number;
}

/** Which divider art reads on which background. */
const ART: Record<EmailBg, string> = {
  forest: divGold,
  gold: divForest,
  beige: divForest,
};

/** A brand section break — the diamond rule, a hairline, the mark, or dots. */
export function Divider({ variant = 'brand', bg = 'forest', gap = 24 }: DividerProps) {
  const t = onBg[bg];

  if (variant === 'brand') {
    return (
      <div style={{ padding: `${gap}px 0`, textAlign: 'center' }}>
        <img src={ART[bg]} alt="" style={{ display: 'block', width: '100%', height: 'auto' }} />
      </div>
    );
  }
  if (variant === 'mark') {
    return (
      <div style={{ textAlign: 'center', padding: `${gap}px 0` }}>
        <Logo variant="mark" tone={t.logo} height={30} />
      </div>
    );
  }
  if (variant === 'dots') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: `${gap}px 0` }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 6, height: 6, borderRadius: 999, background: t.icon, display: 'inline-block' }} />
        ))}
      </div>
    );
  }
  return (
    <div style={{ padding: `${gap}px 0` }}>
      <div style={{ height: 1, background: t.rule }} />
    </div>
  );
}
