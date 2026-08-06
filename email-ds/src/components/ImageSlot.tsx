import * as React from 'react';
import { colors, fontStack, radius } from '../tokens';
import { EmailBg, onBg } from '../theme';
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
  /** The email's flat background — the placeholder styles itself to match. */
  bg?: EmailBg;
  /**
   * A transparent product cutout (no background of its own). Cutouts run the
   * full email width with square corners and are scaled to fit their box
   * exactly, so they sit directly on the flat email color. Regular photos
   * (cutout=false) are inset with rounded corners.
   */
  cutout?: boolean;
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
 * An image block with a first-class on-brand placeholder.
 *
 * Two treatments: a regular photo is inset with rounded corners; a `cutout`
 * (transparent PNG) spans the full email width with square corners and is
 * fitted, never cropped — so it reads as part of the flat background.
 */
export function ImageSlot({
  src,
  alt = '',
  kind = 'product',
  ratio = 'landscape',
  bg = 'forest',
  cutout = false,
  caption,
}: ImageSlotProps) {
  const t = onBg[bg];
  const onDark = bg === 'forest';
  const br = cutout ? 0 : radius.md;

  const frame: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    aspectRatio: String(RATIO[ratio]),
    borderRadius: br,
    overflow: 'hidden',
    // A cutout sits directly on the email color; a photo gets a bed that is a
    // subtle tint OF the background, never a contrasting block.
    background: cutout ? 'transparent' : t.panel,
  };

  return (
    <figure style={{ margin: 0 }}>
      <div style={frame}>
        {src ? (
          <img
            src={src}
            alt={alt}
            style={{
              width: '100%',
              height: '100%',
              // Cutouts fit entirely inside their box; photos fill it.
              objectFit: cutout ? 'contain' : 'cover',
              display: 'block',
            }}
          />
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
              border: `1.5px dashed ${t.rule}`,
              borderRadius: br,
            }}
          >
            <img
              src={onDark ? markGold : markGreen}
              alt=""
              height={44}
              style={{ height: 44, width: 'auto', opacity: 0.5 }}
            />
            <span
              style={{
                fontFamily: fontStack,
                fontWeight: 700,
                fontSize: 11.5,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: t.accent,
              }}
            >
              {cutout ? `${KIND_LABEL[kind]} · cutout` : KIND_LABEL[kind]}
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
            color: t.body,
            opacity: 0.85,
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
