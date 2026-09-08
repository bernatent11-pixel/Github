import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, onBg } from '../theme';

export interface HeadlineProps {
  /** The statement. Set in Gotham Black. */
  line1: string;
  /** The turn. Set in Gotham Bold Italic, one size down in weight, not in size. */
  line2: string;
  bg?: EmailBg;
  /** Size in px for both lines. 64 is the full-bleed hero; 26 is a section. */
  size?: number;
  align?: 'left' | 'center';
  /** Colour both lines the same. Defaults to the background's title colour. */
  color?: string;
  /** Colour the second line differently — use sparingly. */
  line2Color?: string;
  /** Turn the italic off if a line reads badly slanted. */
  italic?: boolean;
}

/**
 * The two-line headline: a statement in Black, then the turn in Bold Italic
 * beneath it.
 *
 * "CLARITY, / on tap." · "WHAT'S IN IT, / and why it works."
 *
 * The break is the whole point — the first line lands, the second re-frames
 * it. Because the contrast is weight and slant rather than colour, it reads on
 * any background and survives a client that drops colour. Keep both lines
 * short: this fails when either one wraps.
 *
 * Use it where a headline should feel spoken. `SectionHeading` remains the
 * workhorse for the ordinary eyebrow + title + subtitle stack.
 */
export function Headline({
  line1,
  line2,
  bg = 'forest',
  size = 44,
  align = 'left',
  color,
  line2Color,
  italic = true,
}: HeadlineProps) {
  const t = onBg[bg];
  const c = color ?? t.title;
  return (
    <div style={{ textAlign: align }}>
      <div
        style={{
          fontFamily: fontStack,
          fontWeight: 900,
          fontSize: size,
          lineHeight: 1.0,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          color: c,
          textShadow: t.textShadow,
        }}
      >
        {line1}
      </div>
      <div
        style={{
          fontFamily: fontStack,
          fontWeight: 700,
          fontStyle: italic ? 'italic' : 'normal',
          fontSize: size,
          lineHeight: 1.05,
          letterSpacing: '0.01em',
          textTransform: 'uppercase',
          color: line2Color ?? c,
          textShadow: t.textShadow,
          marginTop: Math.round(size * 0.06),
        }}
      >
        {line2}
      </div>
    </div>
  );
}
