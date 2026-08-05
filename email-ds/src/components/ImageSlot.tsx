import * as React from 'react';
import { colors, fontStack, radius } from '../tokens';
import markGreen from '../../public/logo/mark-green.png';
import markGold from '../../public/logo/mark-gold.png';

export type ImageKind = 'product' | 'lifestyle' | 'studio';
export type ImageRatio = 'square' | 'landscape' | 'portrait' | 'wide';

export interface ImageSlotProps {
  /** Real image URL. Omit to render an on-brand placeholder to fill in later. */
  src?: string;
  alt?: string;
  /** Placeholder label / intent when there's no src yet. */
  kind?: ImageKind;
  ratio?: ImageRatio;
  /** Placeholder backdrop. */
  tone?: 'beige' | 'forest' | 'cream';
  /** Rounded corners. */
  rounded?: boolean;
  /** Caption shown beneath the image. */
  caption?: string;
}

const RATIO: Record<ImageRatio, number> = { square: 1, landscape: 4 / 3, wide: 16 / 9, portrait: 3 / 4 };
const KIND_LABEL: Record<ImageKind, string> = {
  product: 'Product shot',
  lifestyle: 'Lifestyle image',
  studio: 'Studio image',
};

/**
 * An image block with a first-class on-brand placeholder. Drop a `src` in later
 * (product / lifestyle / studio) and the placeholder is replaced 1:1.
 */
export function ImageSlot({
  src,
  alt = '',
  kind = 'product',
  ratio = 'landscape',
  tone = 'beige',
  rounded = true,
  caption,
}: ImageSlotProps) {
  const br = rounded ? radius.md : 0;
  const bg = tone === 'forest' ? colors.forest : tone === 'cream' ? colors.cream : colors.beige;
  const isDark = tone === 'forest';

  const frame: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    aspectRatio: String(RATIO[ratio]),
    borderRadius: br,
    overflow: 'hidden',
    background: bg,
  };

  return (
    <figure style={{ margin: 0 }}>
      <div style={frame}>
        {src ? (
          <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              border: `1.5px dashed ${isDark ? colors.lineOnDark : colors.line}`,
              borderRadius: br,
            }}
          >
            <img
              src={isDark ? markGold : markGreen}
              alt=""
              height={44}
              style={{ height: 44, width: 'auto', opacity: 0.55 }}
            />
            <span
              style={{
                fontFamily: fontStack,
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: isDark ? colors.gold : colors.leaf,
              }}
            >
              {KIND_LABEL[kind]}
            </span>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption
          style={{
            fontFamily: fontStack,
            fontWeight: 500,
            fontSize: 12.5,
            color: colors.inkSoft,
            margin: '10px 2px 0',
            textAlign: 'center',
          }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
