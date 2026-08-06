import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, bgFill, onBg } from '../theme';
import { Button } from './Button';
import { ImageSlot, ImageSlotProps } from './ImageSlot';

export interface HeroProps {
  /** The email's flat background color. */
  bg?: EmailBg;
  /** Small caps kicker above the headline. */
  eyebrow?: string;
  title: string;
  /** Supporting sentence under the headline. */
  body?: string;
  /**
   * Hero image, rendered BETWEEN the body copy and the CTA. Omit it for a
   * purely typographic hero. Pass `cutout` for a transparent product PNG —
   * it runs full width with square corners instead of being inset.
   */
  image?: Omit<ImageSlotProps, 'bg'>;
  cta?: { label: string; href: string };
  /** Headline size in px (34 is the brand standard). */
  titleSize?: number;
}

/**
 * The opening statement of every Milonga email: eyebrow, big Gotham headline,
 * one line of copy, the image, then the CTA — all on the flat email color.
 */
export function Hero({ bg = 'forest', eyebrow, title, body, image, cta, titleSize = 34 }: HeroProps) {
  const t = onBg[bg];
  // A cutout runs edge to edge, so it escapes the block's horizontal padding.
  const PAD_X = 30;
  const isCutout = !!image?.cutout;

  return (
    <div style={{ background: bgFill[bg], fontFamily: fontStack, textAlign: 'center', padding: `12px 0 36px` }}>
      <div style={{ padding: `0 ${PAD_X}px` }}>
        {eyebrow ? (
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: t.accent,
              marginBottom: 14,
            }}
          >
            {eyebrow}
          </div>
        ) : null}
        <h1
          style={{
            fontSize: titleSize,
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-0.015em',
            margin: 0,
            color: t.title,
          }}
        >
          {title}
        </h1>
        {body ? (
          <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: '14px auto 0', maxWidth: 400, color: t.body }}>
            {body}
          </p>
        ) : null}
      </div>

      {image ? (
        <div style={{ margin: '28px 0 0', padding: isCutout ? 0 : `0 ${PAD_X}px` }}>
          <ImageSlot bg={bg} ratio={isCutout ? 'landscape' : 'wide'} {...image} />
        </div>
      ) : null}

      {cta ? (
        <div style={{ marginTop: image ? 28 : 26, padding: `0 ${PAD_X}px` }}>
          <Button label={cta.label} href={cta.href} bg={bg} size="lg" />
        </div>
      ) : null}
    </div>
  );
}
