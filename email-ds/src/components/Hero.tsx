import * as React from 'react';
import { colors, fontStack } from '../tokens';
import { Button } from './Button';
import { ImageSlot, ImageSlotProps } from './ImageSlot';

export interface HeroProps {
  /** Small gold kicker above the headline. */
  eyebrow?: string;
  title: string;
  /** Supporting sentence under the headline. */
  body?: string;
  cta?: { label: string; href: string };
  /** Hero image (product / lifestyle / studio). Renders a placeholder until set. */
  image?: ImageSlotProps;
  /** forest = dark hero with gold headline · gold = gold hero · beige = light hero. */
  tone?: 'forest' | 'gold' | 'beige';
}

const TONE = {
  forest: { bg: colors.forest, title: colors.white, body: colors.beige, eyebrow: colors.gold, btn: 'gold' as const },
  gold: { bg: colors.gold, title: colors.forest, body: colors.forestDeep, eyebrow: colors.forest, btn: 'forest' as const },
  beige: { bg: colors.beige, title: colors.forest, body: colors.inkSoft, eyebrow: colors.leaf, btn: 'gold' as const },
};

/** The opening statement: eyebrow, big Gotham headline, one line of copy, a CTA, and a hero image. */
export function Hero({ eyebrow, title, body, cta, image, tone = 'forest' }: HeroProps) {
  const t = TONE[tone];
  return (
    <div style={{ background: t.bg, padding: '44px 34px', fontFamily: fontStack, textAlign: 'center' }}>
      {eyebrow ? (
        <div
          style={{
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: t.eyebrow,
            marginBottom: 14,
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <h1 style={{ fontWeight: 900, fontSize: 34, lineHeight: 1.08, letterSpacing: '-0.015em', margin: 0, color: t.title }}>
        {title}
      </h1>
      {body ? (
        <p style={{ fontWeight: 400, fontSize: 16, lineHeight: 1.6, margin: '16px auto 0', maxWidth: 440, color: t.body }}>
          {body}
        </p>
      ) : null}
      {cta ? (
        <div style={{ marginTop: 26 }}>
          <Button label={cta.label} href={cta.href} variant={t.btn} size="lg" />
        </div>
      ) : null}
      {image ? (
        <div style={{ marginTop: 32 }}>
          <ImageSlot ratio="wide" tone={tone === 'forest' ? 'forest' : 'beige'} {...image} />
        </div>
      ) : null}
    </div>
  );
}
