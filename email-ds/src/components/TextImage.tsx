import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, bgFill, onBg } from '../theme';
import { ImageSlot, ImageSlotProps } from './ImageSlot';
import { Button } from './Button';

export interface TextImageProps {
  bg?: EmailBg;
  eyebrow?: string;
  title: string;
  /** Short paragraph — keep it to 1–3 sentences. */
  text?: string;
  image?: Omit<ImageSlotProps, 'bg'>;
  /** `stacked` = image full width above the text · `side` = two columns. */
  layout?: 'stacked' | 'side';
  /** In `side` layout, which side the image sits on (alternate down the email). */
  imageSide?: 'left' | 'right';
  cta?: { label: string; href: string };
}

/**
 * A short paragraph paired with an image — the workhorse of Milonga body copy.
 * Stacked gives the image full width; side places them in two columns
 * (alternate `imageSide` down the email for an editorial rhythm).
 */
export function TextImage({
  bg = 'forest',
  eyebrow,
  title,
  text,
  image,
  layout = 'stacked',
  imageSide = 'left',
  cta,
}: TextImageProps) {
  const t = onBg[bg];
  const side = layout === 'side';

  const copy = (
    <div>
      {eyebrow ? (
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: t.accent,
            marginBottom: 8,
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <h3 style={{ fontSize: side ? 20 : 24, fontWeight: 900, lineHeight: 1.15, margin: 0, color: t.title }}>
        {title}
      </h3>
      {text ? (
        <p style={{ fontSize: side ? 13.5 : 15, lineHeight: 1.65, margin: '10px 0 0', color: t.body }}>{text}</p>
      ) : null}
      {cta ? (
        <div style={{ marginTop: 16 }}>
          <Button label={cta.label} href={cta.href} bg={bg} size="sm" />
        </div>
      ) : null}
    </div>
  );

  const art = image ? <ImageSlot bg={bg} ratio={side ? 'square' : 'wide'} {...image} /> : null;

  return (
    <div style={{ background: bgFill[bg], fontFamily: fontStack, padding: '0 30px' }}>
      {side ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'center' }}>
          {imageSide === 'left' ? (
            <>
              {art}
              {copy}
            </>
          ) : (
            <>
              {copy}
              {art}
            </>
          )}
        </div>
      ) : (
        <div>
          {art ? <div style={{ marginBottom: 18 }}>{art}</div> : null}
          {copy}
        </div>
      )}
    </div>
  );
}
