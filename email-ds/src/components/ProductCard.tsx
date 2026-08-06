import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { useBlockFill } from '../surface';
import { Button } from './Button';
import { ImageSlot } from './ImageSlot';

export interface ProductCardProps {
  name: string;
  /** Flavor / variant line, e.g. "Vanilla · Latte". */
  variant?: string;
  description?: string;
  /** Short spec chips, e.g. ["100mg caffeine", "15 servings"]. */
  specs?: string[];
  price?: string;
  cta?: { label: string; href: string };
  /** Product image — pass `cutout` art for a transparent PNG. */
  imageSrc?: string;
  imageAlt?: string;
  cutout?: boolean;
  /** The email's flat background color. */
  bg?: EmailBg;
}

/**
 * A product feature block: image, name, spec chips, price and CTA — outlined,
 * so the flat email color carries through.
 */
export function ProductCard({
  name,
  variant,
  description,
  specs = [],
  price,
  cta,
  imageSrc,
  imageAlt,
  cutout = true,
  bg = 'forest',
}: ProductCardProps) {
  const t = onBg[bg];
  const fill = useBlockFill(bg, 'transparent');
  return (
    <div style={{ fontFamily: fontStack, background: fill, border: `1px solid ${t.rule}`, borderRadius: 14, overflow: 'hidden' }}>
      <ImageSlot src={imageSrc} alt={imageAlt} kind="product" ratio="landscape" bg={bg} cutout={cutout} />
      <div style={{ padding: '18px 20px 22px' }}>
        {variant ? (
          <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: t.accent, marginBottom: 6 }}>
            {variant}
          </div>
        ) : null}
        <div style={{ fontWeight: 900, fontSize: 17, color: t.title, lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{name}</div>
        {description ? (
          <p style={{ fontWeight: 400, fontSize: 13, lineHeight: 1.65, color: t.body, margin: '10px 0 0' }}>
            {description}
          </p>
        ) : null}
        {specs.length ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '16px 0 0' }}>
            {specs.map((s, i) => (
              <span
                key={i}
                style={{
                  fontWeight: 700,
                  fontSize: 11.5,
                  color: t.accent,
                  border: `1px solid ${t.rule}`,
                  borderRadius: 999,
                  padding: '6px 12px',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        ) : null}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 20 }}>
          {price ? <span style={{ fontWeight: 900, fontSize: 20, color: t.title }}>{price}</span> : <span />}
          {cta ? <Button label={cta.label} href={cta.href} bg={bg} size="sm" /> : null}
        </div>
      </div>
    </div>
  );
}
