import * as React from 'react';
import { fontStack } from '../tokens';
import { EmailBg, bgFill, onBg } from '../theme';
import { useSurface, useBlockFill } from '../surface';
import { TwoToneTitle } from './TwoToneTitle';

export interface SectionProps {
  /** The email's flat background color. */
  bg?: EmailBg;
  /** Vertical rhythm. */
  pad?: 'sm' | 'md' | 'lg';
  /** Horizontal alignment of contents. */
  align?: 'left' | 'center';
  /** Draw a hairline rule above the section — the default way to separate blocks. */
  rule?: boolean;
  children?: React.ReactNode;
}

const PAD = { sm: 18, md: 28, lg: 40 };

/**
 * A content band on the flat email color. Sections are separated by space and
 * an optional hairline — never by a differently-colored card.
 */
export function Section({ bg = 'forest', pad = 'md', align = 'left', rule = false, children }: SectionProps) {
  const t = onBg[bg];
  const surface = useSurface(bg);
  return (
    <div style={{ ...surface, fontFamily: fontStack, padding: `0 30px` }}>
      {rule ? <div style={{ height: 1, background: t.rule }} /> : null}
      <div style={{ padding: `${PAD[pad]}px 0`, textAlign: align, color: t.body }}>{children}</div>
    </div>
  );
}

export interface PanelProps {
  bg?: EmailBg;
  /**
   * `raised` lifts the block off the background with a soft fill, a top sheen
   * and a drop shadow (the default — gives content volume).
   * `outlined` is a flat hairline border. `open` is bare.
   */
  variant?: 'raised' | 'outlined' | 'open';
  pad?: number;
  children?: React.ReactNode;
}

/**
 * Groups related content (benefits, ingredients, a comparison). `raised` gives
 * the group real depth against the flat email color so the layout never reads
 * dead flat; `outlined` is the quieter hairline treatment.
 */
export function Panel({ bg = 'forest', variant = 'raised', pad = 18, children }: PanelProps) {
  const t = onBg[bg];
  const fill = useBlockFill(bg, t.elevated);
  if (variant === 'open') return <div>{children}</div>;
  if (variant === 'outlined') {
    return <div style={{ border: `1px solid ${t.rule}`, borderRadius: 14, padding: pad }}>{children}</div>;
  }
  return (
    <div
      style={{
        background: fill,
        border: `1px solid ${t.rule}`,
        borderTopColor: t.sheen,
        borderRadius: 14,
        boxShadow: t.shadow,
        padding: pad,
      }}
    >
      {children}
    </div>
  );
}

export interface SectionHeadingProps {
  bg?: EmailBg;
  /** Small caps kicker above the title. */
  eyebrow?: string;
  title: string;
  /** Short subtitle under the title — set in caps and the accent colour. */
  subtitle?: string;
  /** Optional intro paragraph under the title (regular case, body colour). */
  intro?: string;
  align?: 'left' | 'center';
  /** Title size in px. */
  size?: number;
  /** Trailing words to render in the accent color. Defaults to half the title. */
  titleAccentPart?: string;
  /** Render the title in one flat color instead of two-tone. */
  flatTitle?: boolean;
}

/** Eyebrow + title + intro, set in Gotham, colored for the email background. */
export function SectionHeading({
  bg = 'forest',
  eyebrow,
  title,
  subtitle,
  intro,
  align = 'left',
  size = 28,
  titleAccentPart,
  flatTitle = false,
}: SectionHeadingProps) {
  const t = onBg[bg];
  return (
    <div style={{ textAlign: align }}>
      {eyebrow ? (
        <div
          style={{
            fontFamily: fontStack,
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: t.accent,
            marginBottom: 9,
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <h2
        style={{
          fontFamily: fontStack,
          fontWeight: 900,
          fontSize: size,
          lineHeight: 1.2,
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          margin: 0,
          color: t.title,
          textShadow: t.textShadow,
        }}
      >
        <TwoToneTitle title={title} accentPart={titleAccentPart} bg={bg} flat={flatTitle} />
      </h2>
      {subtitle ? (
        <div
          style={{
            fontFamily: fontStack,
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: t.accent,
            margin: '12px 0 0',
          }}
        >
          {subtitle}
        </div>
      ) : null}
      {intro ? (
        <p style={{ fontFamily: fontStack, fontWeight: 400, fontSize: 13.5, lineHeight: 1.7, margin: '12px 0 0', color: t.body }}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
