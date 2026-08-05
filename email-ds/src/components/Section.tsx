import * as React from 'react';
import { colors, fontStack } from '../tokens';

export type SurfaceTone = 'white' | 'beige' | 'forest' | 'gold' | 'leaf' | 'cream';

export interface SectionProps {
  /** Background fill for the block. */
  tone?: SurfaceTone;
  /** Vertical rhythm. */
  pad?: 'sm' | 'md' | 'lg';
  /** Horizontal alignment of contents. */
  align?: 'left' | 'center';
  children?: React.ReactNode;
}

export const SURFACE_BG: Record<SurfaceTone, string> = {
  white: colors.white,
  beige: colors.beige,
  forest: colors.forest,
  gold: colors.gold,
  leaf: colors.leaf,
  cream: colors.cream,
};

/** Foreground text color that reads on a given surface. */
export const onSurface: Record<SurfaceTone, string> = {
  white: colors.ink,
  beige: colors.ink,
  cream: colors.ink,
  forest: colors.beige,
  gold: colors.forest,
  leaf: colors.white,
};

const PAD = { sm: '24px 28px', md: '36px 34px', lg: '48px 38px' };

/** A padded content band with a brand surface — the building block of every email. */
export function Section({ tone = 'white', pad = 'md', align = 'left', children }: SectionProps) {
  return (
    <div
      style={{
        background: SURFACE_BG[tone],
        color: onSurface[tone],
        padding: PAD[pad],
        fontFamily: fontStack,
        textAlign: align,
      }}
    >
      {children}
    </div>
  );
}

export interface SectionHeadingProps {
  /** Small gold kicker above the title. */
  eyebrow?: string;
  title: string;
  /** Optional intro paragraph under the title. */
  intro?: string;
  align?: 'left' | 'center';
  /** Set when placed on a dark (forest) surface so text flips to light. */
  onDark?: boolean;
}

/** Eyebrow + title + intro, set in Gotham with the brand rhythm. */
export function SectionHeading({ eyebrow, title, intro, align = 'left', onDark = false }: SectionHeadingProps) {
  return (
    <div style={{ textAlign: align, marginBottom: 4 }}>
      {eyebrow ? (
        <div
          style={{
            fontFamily: fontStack,
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: onDark ? colors.gold : colors.leaf,
            marginBottom: 10,
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <h2
        style={{
          fontFamily: fontStack,
          fontWeight: 900,
          fontSize: 27,
          lineHeight: 1.12,
          letterSpacing: '-0.01em',
          margin: 0,
          color: onDark ? colors.white : colors.forest,
        }}
      >
        {title}
      </h2>
      {intro ? (
        <p
          style={{
            fontFamily: fontStack,
            fontWeight: 400,
            fontSize: 15,
            lineHeight: 1.6,
            margin: '12px 0 0',
            color: onDark ? colors.beige : colors.inkSoft,
          }}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
