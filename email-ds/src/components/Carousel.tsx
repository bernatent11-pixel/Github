import * as React from 'react';
import { fontStack, colors } from '../tokens';
import { EmailBg, onBg, bgFill } from '../theme';
import { bgStyle } from '../textures';
import { Logo } from './Logo';

/* ────────────────────────────────────────────────────────────────────────────
   CAROUSEL SLIDES · the same design system, reflowed for the feed.

   An email section and a feed slide are not the same object, and scaling one
   into the other is the mistake to avoid. A section is as tall as its content
   — 900px here, 2800px there — and the reader scrolls through it. A slide is a
   FIXED 4:5 window, and the reader swipes past it in about a second.

   Three consequences, and they drive everything in this file:

   1. HEIGHT IS A BUDGET, NOT AN OUTCOME. Content that overflows a slide is not
      clipped gracefully, it is simply gone. So a section carrying three
      paragraphs becomes two or three slides, one idea each.

   2. THE AUTHORING SCALE STAYS AT 600. Every template in this system is sized
      in 600px-wide units, and re-tuning all of them for 1080 would fork the
      design. Instead a slide is a 600 x 750 box — 4:5 exactly — and the
      screenshot is taken at 1.8x, which lands on 1080 x 1350 natively. One set
      of numbers, two destinations.

   3. TYPE GOES UP, NOT DOWN. A slide is read at a glance on a phone, usually
      without sound and often without stopping. Body copy that works in an
      email at 16px is a wall at feed size; a slide wants a headline and one
      supporting line, and anything more belongs on the next slide.
   ──────────────────────────────────────────────────────────────────────────── */

/** Design-unit width of a slide. The export scales this by 1.8 to 1080. */
export const SLIDE_W = 600;
/** Design-unit height. 600 x 750 is 4:5, the feed's tallest allowed frame. */
export const SLIDE_H = 750;

export interface SlideProps {
  bg?: EmailBg;
  textured?: boolean;
  /** Vertical placement of the content within the slide. */
  align?: 'top' | 'center' | 'bottom';
  padX?: number;
  padY?: number;
  /** A full-bleed photograph behind the content. */
  src?: string;
  focus?: string;
  /** 0 to 1. Darkens the photograph; leave at 0 for art that is already dark. */
  scrim?: number;
  /** Weight the scrim where the type is. */
  scrimAt?: 'top' | 'middle' | 'bottom' | 'even';
  /** Small wordmark, pinned to the top of the slide. */
  logo?: boolean;
  logoTone?: 'gold' | 'green' | 'beige' | 'white';
  logoHeight?: number;
  /** Slide number, shown bottom-right, for a reader mid-swipe. */
  index?: string;
  children?: React.ReactNode;
}

/**
 * One 4:5 frame. Everything inside is laid out in the same 600px units the
 * email templates use, so a headline set at 44 is the same headline in both
 * places — it just lands on a fixed canvas here instead of an open one.
 */
export function Slide({
  bg = 'beige',
  textured = false,
  align = 'center',
  padX = 56,
  padY = 62,
  src,
  focus = 'center',
  scrim = 0,
  scrimAt = 'even',
  logo = false,
  logoTone,
  logoHeight = 52,
  index,
  children,
}: SlideProps) {
  const t = onBg[bg];
  const dark = bg === 'forest' || !!src;
  const k = (v: number) => (v * scrim).toFixed(2);
  const scrimCss =
    scrim <= 0
      ? undefined
      : scrimAt === 'top'
        ? `linear-gradient(to bottom, rgba(0,26,13,${k(0.78)}) 0%, rgba(0,26,13,${k(0.5)}) 42%, rgba(0,26,13,${k(0.06)}) 78%)`
        : scrimAt === 'bottom'
          ? `linear-gradient(to top, rgba(0,26,13,${k(0.8)}) 0%, rgba(0,26,13,${k(0.5)}) 40%, rgba(0,26,13,${k(0.05)}) 76%)`
          : scrimAt === 'middle'
            ? `linear-gradient(to bottom, rgba(0,26,13,${k(0.2)}) 0%, rgba(0,26,13,${k(0.62)}) 38%, rgba(0,26,13,${k(0.62)}) 66%, rgba(0,26,13,${k(0.2)}) 100%)`
            : `linear-gradient(to bottom, rgba(0,26,13,${k(0.5)}) 0%, rgba(0,26,13,${k(0.5)}) 100%)`;

  return (
    <div
      style={{
        position: 'relative',
        width: SLIDE_W,
        height: SLIDE_H,
        // A slide is a window, not a page: anything that does not fit is a
        // layout bug to fix, not something to let run off the edge.
        overflow: 'hidden',
        ...bgStyle(bg, bgFill[bg], textured),
        fontFamily: fontStack,
      }}
    >
      {src ? (
        <img
          src={src}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: focus,
            display: 'block',
            border: 0,
          }}
        />
      ) : null}
      {scrimCss ? <div style={{ position: 'absolute', inset: 0, background: scrimCss }} /> : null}

      {logo ? (
        <div style={{ position: 'absolute', top: 34, left: 0, right: 0, textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              // The wordmark is artwork, so the type's shadow never reaches it.
              // On a photograph it needs its own or it dissolves.
              filter: src ? 'drop-shadow(0 1px 3px rgba(0,26,13,0.55)) drop-shadow(0 4px 16px rgba(0,26,13,0.45))' : 'none',
            }}
          >
            <Logo tone={logoTone ?? (dark ? 'white' : 'green')} variant="primary" height={logoHeight} />
          </span>
        </div>
      ) : null}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: `${padY}px ${padX}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: align === 'top' ? 'flex-start' : align === 'bottom' ? 'flex-end' : 'center',
          // The wordmark owns the top of the slide, so content clears it.
          paddingTop: logo ? logoHeight + 66 : padY,
        }}
      >
        {children}
      </div>

      {index ? (
        <div
          style={{
            position: 'absolute',
            right: 26,
            bottom: 20,
            fontFamily: fontStack,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: dark ? 'rgba(255,255,255,0.62)' : 'rgba(0,77,39,0.38)',
          }}
        >
          {index}
        </div>
      ) : null}
    </div>
  );
}

/* shared slide atoms ────────────────────────────────────────────────────── */

const caps = (size: number, tracking: string, color: string): React.CSSProperties => ({
  fontFamily: fontStack,
  fontWeight: 900,
  fontSize: size,
  letterSpacing: tracking,
  textTransform: 'uppercase',
  color,
  lineHeight: 1.0,
});

export interface SlideTitleProps {
  line1: string;
  line2?: string;
  size?: number;
  lead?: number;
  color?: string;
  color2?: string;
  align?: 'left' | 'center';
  /** A quiet shadow, for a title sitting on a photograph. */
  onPhoto?: boolean;
}

export function SlideTitle({
  line1,
  line2,
  size = 52,
  lead = 0.95,
  color,
  color2,
  align = 'left',
  onPhoto = false,
}: SlideTitleProps) {
  const shadow = onPhoto ? '0 1px 4px rgba(0,26,13,0.42)' : 'none';
  return (
    <div style={{ textAlign: align }}>
      <div style={{ ...caps(size, '0.01em', color ?? colors.white), lineHeight: lead, textShadow: shadow, whiteSpace: 'pre-line' }}>{line1}</div>
      {line2 ? (
        <div style={{ ...caps(size, '0.01em', color2 ?? colors.gold), lineHeight: lead, textShadow: shadow, whiteSpace: 'pre-line' }}>{line2}</div>
      ) : null}
    </div>
  );
}

export function SlideBody({
  text,
  size = 21,
  color,
  align = 'left',
  measure,
  onPhoto = false,
  top = 22,
}: {
  text: string;
  size?: number;
  color?: string;
  align?: 'left' | 'center';
  measure?: number;
  onPhoto?: boolean;
  top?: number;
}) {
  return (
    <div
      style={{
        fontFamily: fontStack,
        // 500, not 400 — the file mapped to Gotham's 400 renders heavier than
        // its 500, so 500 is this family's true regular.
        fontWeight: 500,
        fontSize: size,
        lineHeight: 1.44,
        color: color ?? colors.beige,
        maxWidth: measure,
        margin: `${top}px ${align === 'center' ? 'auto' : '0'} 0`,
        textAlign: align,
        // Honour explicit line breaks: on a slide a spec line reads as two
        // short rows, and letting it wrap on its own splits it mid-fact.
        whiteSpace: 'pre-line',
        textShadow: onPhoto ? '0 1px 4px rgba(0,26,13,0.45)' : 'none',
      }}
    >
      {text}
    </div>
  );
}

export function SlideEyebrow({
  text,
  color,
  align = 'left',
}: {
  text: string;
  color?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div style={{ ...caps(14, '0.2em', color ?? colors.gold), marginBottom: 18, textAlign: align, lineHeight: 1.2 }}>
      {text}
    </div>
  );
}

/** The closing ask. On a slide this is a shape and a word, not a link. */
export function SlideCta({
  label,
  bg = 'beige',
  align = 'left',
  onPhoto = false,
}: {
  label: string;
  bg?: EmailBg;
  align?: 'left' | 'center';
  onPhoto?: boolean;
}) {
  const t = onBg[bg];
  const fill = onPhoto ? colors.gold : t.btnBg;
  const ink = onPhoto ? colors.forest : t.btnText;
  return (
    <div style={{ marginTop: 34, textAlign: align }}>
      <span
        style={{
          display: 'inline-block',
          borderRadius: 999,
          padding: '17px 34px',
          ...caps(15, '0.13em', ink),
          lineHeight: 1,
          background: fill,
        }}
      >
        {label}
      </span>
    </div>
  );
}
