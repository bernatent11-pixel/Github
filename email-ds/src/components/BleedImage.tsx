import * as React from 'react';
import { EmailBg } from '../theme';
import { useSurface } from '../surface';
import { ImageSlot } from './ImageSlot';

export interface BleedImageProps {
  /** Real image URL. Omit to render an on-brand placeholder to fill in later. */
  src?: string;
  alt?: string;
  /** Which edge the cutout enters from. */
  side?: 'left' | 'right';
  /** How much of the column width the art occupies, 0–1. */
  width?: number;
  /** How far the art runs past the edge, in px. */
  overhang?: number;
  /** Something laid over the art — a Badge stamped onto the photo. */
  overlay?: React.ReactNode;
  /** Where the overlay sits, as percentages of the art. */
  overlayAt?: { top?: string; left?: string; right?: string };
  bg?: EmailBg;
}

/**
 * A transparent product cutout that enters from one edge of the email — it
 * runs off the side rather than sitting centred in a box, so the art reads as
 * part of the page instead of a pasted-in photo. Place it directly in the
 * shell (not inside a Section), so nothing pads it away from the edge.
 */
export function BleedImage({
  src,
  alt = '',
  side = 'left',
  width = 0.72,
  overhang = 18,
  overlay,
  overlayAt,
  bg = 'forest',
}: BleedImageProps) {
  const surface = useSurface(bg);
  const pct = `${Math.round(width * 100)}%`;
  return (
    <div style={{ ...surface, lineHeight: 0, fontSize: 0, overflow: 'hidden' }}>
      <div
        style={{
          position: 'relative',
          width: pct,
          marginLeft: side === 'left' ? -overhang : 'auto',
          marginRight: side === 'right' ? -overhang : 'auto',
        }}
      >
        {src ? (
          <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto', border: 0 }} />
        ) : (
          <ImageSlot bg={bg} kind="product" ratio="wide" alt={alt} />
        )}
        {overlay ? (
          <div
            style={{
              position: 'absolute',
              top: overlayAt?.top ?? '12%',
              left: overlayAt?.left,
              right: overlayAt?.right,
              lineHeight: 'normal',
              fontSize: 'medium',
            }}
          >
            {overlay}
          </div>
        ) : null}
      </div>
    </div>
  );
}
