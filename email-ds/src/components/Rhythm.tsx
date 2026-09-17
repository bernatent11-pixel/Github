import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg, bgFill } from '../theme';
import { bgStyle } from '../textures';

export interface ColorBandProps {
  /** The band's own background — the inverse of the email's. */
  bg: EmailBg;
  /** Pad the band so its edges are clear of the content inside it. */
  pad?: number;
  textured?: boolean;
  children?: React.ReactNode;
}

/**
 * An inverted band wrapping one complete act — dark green inside a cream email,
 * or cream inside a dark green one.
 *
 * Two constraints make this read as a chapter break rather than a stripe. Both
 * edges must land where the page colour is already flat, and the band must map
 * onto a WHOLE act — never half of one, and never a single block inside an act.
 * A band around one paragraph looks like a highlight someone forgot to remove.
 *
 * Blocks inside it should be passed this band's `bg`, so they read the contrast
 * map for the band rather than for the page.
 *
 * It is also the natural cut line for an image export: each exported slice then
 * carries one flat colour at its boundary and the seam cannot show.
 */
export function ColorBand({ bg, pad = 8, textured = false, children }: ColorBandProps) {
  return <div style={{ ...bgStyle(bg, bgFill[bg], textured), padding: `${pad}px 0` }}>{children}</div>;
}

export interface MarqueeProps {
  /** One short phrase. It repeats. */
  text: string;
  bg?: EmailBg;
  /** How many times to repeat. Enough to overflow 600px. */
  repeat?: number;
  /** Hairline above and below. */
  rules?: boolean;
  size?: number;
}

/**
 * A single line of small caps at wide tracking, repeated across the full width.
 *
 * It carries no information — the phrase is brand, not message. Its job is to
 * reset the reader's eye between two heavy sections for the cost of 40px. An
 * email of stacked content blocks with nothing between them reads as a
 * document; one marquee is often the whole difference.
 *
 * Use at most one per email. Two and it becomes the design.
 */
export function Marquee({ text, bg = 'forest', repeat = 6, rules = true, size = 11 }: MarqueeProps) {
  const t = onBg[bg];
  const line = Array.from({ length: repeat }).map(() => text).join('  ·  ');
  return (
    <div
      style={{
        borderTop: rules ? `1px solid ${t.rule}` : undefined,
        borderBottom: rules ? `1px solid ${t.rule}` : undefined,
        padding: '12px 0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          fontFamily: fontStack,
          fontWeight: 900,
          fontSize: size,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: t.accent,
          whiteSpace: 'nowrap',
          lineHeight: 1.2,
          // Overflow is intentional: the strip should look like it continues
          // past both edges rather than being a centred sentence.
          marginLeft: -40,
        }}
      >
        {line}
      </div>
    </div>
  );
}

export interface BreathProps {
  /** 48 or 64. Anything smaller is spacing, not a breath. */
  size?: 48 | 64;
}

/**
 * Deliberate empty ground.
 *
 * The cheapest premium signal available and the first thing cut when an email
 * runs long. It is a section, not a margin — that is why it has a name.
 */
export function Breath({ size = 48 }: BreathProps) {
  return <div style={{ height: size, lineHeight: 0, fontSize: 0 }}>&nbsp;</div>;
}

export interface PullQuoteProps {
  quote: string;
  attribution?: string;
  bg?: EmailBg;
  size?: number;
  stars?: number;
}

/**
 * One quotation given the weight of a headline — no card, no frame.
 *
 * Use it when a single line says what the whole email is arguing. Against a
 * grid of review cards this reads as editorial rather than as proof, which is
 * why the two should not sit next to each other.
 */
export function PullQuote({ quote, attribution, bg = 'forest', size = 26, stars }: PullQuoteProps) {
  const t = onBg[bg];
  return (
    <div style={{ textAlign: 'center' }}>
      {stars ? (
        <div style={{ fontSize: 15, letterSpacing: '4px', color: t.accent, marginBottom: 14 }}>
          {'★'.repeat(stars)}
        </div>
      ) : null}
      <div
        style={{
          fontFamily: fontStack,
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: size,
          lineHeight: 1.35,
          color: t.title,
          textShadow: t.textShadow,
        }}
      >
        {quote}
      </div>
      {attribution ? (
        <div
          style={{
            fontFamily: fontStack,
            fontWeight: 900,
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: t.accent,
            marginTop: 16,
          }}
        >
          {attribution}
        </div>
      ) : null}
    </div>
  );
}
