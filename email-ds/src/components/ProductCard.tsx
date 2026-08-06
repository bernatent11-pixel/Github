import * as React from 'react';
import { colors, fontStack, radius } from '../tokens';
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
  /** Product image. Renders an on-brand placeholder until a `src` is provided. */
  imageSrc?: string;
  imageAlt?: string;
}

/** A single product feature card: image, name, specs, price, CTA. */
export function ProductCard({
  name,
  variant,
  description,
  specs = [],
  price,
  cta,
  imageSrc,
  imageAlt,
}: ProductCardProps) {
  return (
    <div
      style={{
        fontFamily: fontStack,
        background: colors.white,
        border: `1px solid ${colors.line}`,
        borderRadius: radius.lg,
        overflow: 'hidden',
      }}
    >
      <div style={{ background: colors.beige, padding: 18 }}>
        <ImageSlot src={imageSrc} alt={imageAlt} kind="product" ratio="square" bg="beige" />
      </div>
      <div style={{ padding: '20px 22px 24px' }}>
        {variant ? (
          <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: colors.leaf, marginBottom: 6 }}>
            {variant}
          </div>
        ) : null}
        <div style={{ fontWeight: 900, fontSize: 20, color: colors.forest, lineHeight: 1.15 }}>{name}</div>
        {description ? (
          <p style={{ fontWeight: 400, fontSize: 14, lineHeight: 1.55, color: colors.inkSoft, margin: '10px 0 0' }}>
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
                  color: colors.forest,
                  background: colors.beige,
                  borderRadius: radius.pill,
                  padding: '6px 12px',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        ) : null}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 20 }}>
          {price ? <span style={{ fontWeight: 900, fontSize: 20, color: colors.forest }}>{price}</span> : <span />}
          {cta ? <Button label={cta.label} href={cta.href} bg="beige" size="sm" /> : null}
        </div>
      </div>
    </div>
  );
}
