import * as React from 'react';
import { fontStack, colors } from '../tokens';
import { EmailBg, onBg } from '../theme';
import { Headline } from './Headline';

export type OverlayAnchor = 'top' | 'bottom' | 'left' | 'right';

export interface TextOverImageProps {
  src: string;
  alt: string;
  line1: string;
  line2: string;
  /** Small caps above the headline. */
  eyebrow?: string;
  bg?: EmailBg;
  /** Which third of the photograph the type sits in. Never dead centre. */
  anchor?: OverlayAnchor;
  /**
   * Darken the type's third so the headline survives a busy photo. Leave it
   * off when the picture already has a quiet region — an unnecessary scrim is
   * the difference between editorial and stock.
   */
  scrim?: boolean;
  size?: number;
  /** Ink for the type. Defaults to cream, which is right over a scrim. */
  color?: string;
  children?: React.ReactNode;
}

const PLACE: Record<OverlayAnchor, React.CSSProperties> = {
  top: { top: 0, left: 0, right: 0, padding: '34px 34px 0', textAlign: 'center' },
  bottom: { bottom: 0, left: 0, right: 0, padding: '0 34px 34px', textAlign: 'center' },
  left: { top: 0, bottom: 0, left: 0, width: '54%', padding: '0 20px 0 34px', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  right: { top: 0, bottom: 0, right: 0, width: '54%', padding: '0 34px 0 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
};

const SCRIM: Record<OverlayAnchor, string> = {
  top: 'linear-gradient(to bottom, rgba(0,26,13,0.62) 0%, rgba(0,26,13,0.30) 46%, rgba(0,26,13,0) 72%)',
  bottom: 'linear-gradient(to top, rgba(0,26,13,0.62) 0%, rgba(0,26,13,0.30) 46%, rgba(0,26,13,0) 72%)',
  left: 'linear-gradient(to right, rgba(0,26,13,0.62) 0%, rgba(0,26,13,0.28) 50%, rgba(0,26,13,0) 78%)',
  right: 'linear-gradient(to left, rgba(0,26,13,0.62) 0%, rgba(0,26,13,0.28) 50%, rgba(0,26,13,0) 78%)',
};

/**
 * The editorial opening: a photograph with the headline sitting directly on it.
 *
 * Two things make this work rather than look like a stock template. The type is
 * anchored to ONE THIRD of the frame — never floated dead centre over a busy
 * picture — and the scrim, when needed, darkens only that third. A full-frame
 * darkening reads as a mistake; a directional one reads as light.
 *
 * In Outlook desktop the overlay drops below the image, so the photograph must
 * still make sense without the words on it, and the words must still make sense
 * under the picture. If either fails, bake the type into the PNG instead.
 */
export function TextOverImage({
  src,
  alt,
  line1,
  line2,
  eyebrow,
  bg = 'forest',
  anchor = 'bottom',
  scrim = true,
  size = 38,
  color = colors.beige,
  children,
}: TextOverImageProps) {
  const t = onBg[bg];
  return (
    <div style={{ position: 'relative', lineHeight: 0 }}>
      <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto', border: 0 }} />
      {scrim ? (
        <div style={{ position: 'absolute', inset: 0, background: SCRIM[anchor], pointerEvents: 'none' }} />
      ) : null}
      <div style={{ position: 'absolute', ...PLACE[anchor] }}>
        {eyebrow ? (
          <div
            style={{
              fontFamily: fontStack,
              fontWeight: 900,
              fontSize: 11.5,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: colors.gold,
              lineHeight: 1.4,
              marginBottom: 12,
            }}
          >
            {eyebrow}
          </div>
        ) : null}
        <Headline
          bg={bg}
          line1={line1}
          line2={line2}
          size={size}
          align={anchor === 'left' || anchor === 'right' ? 'left' : 'center'}
          color={color}
        />
        {children ? <div style={{ marginTop: 20, lineHeight: 1.4 }}>{children}</div> : null}
      </div>
    </div>
  );
}
