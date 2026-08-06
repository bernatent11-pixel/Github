import { colors } from './tokens';
import type { LogoTone } from './components/Logo';

/**
 * Milonga emails use ONE flat background color for the whole email.
 * Pick it per campaign; every block inherits it.
 */
export type EmailBg = 'forest' | 'gold' | 'beige';

/** The page fill for each background choice. */
export const bgFill: Record<EmailBg, string> = {
  forest: colors.forest,
  gold: colors.gold,
  beige: colors.beige,
};

export interface OnBg {
  /** Logo treatment that reads cleanly on this background. */
  logo: LogoTone;
  /** Headline / title color. */
  title: string;
  /** Body copy color. */
  body: string;
  /** Eyebrow, small caps, icon accents. */
  accent: string;
  /** Hairline rules and card borders. */
  rule: string;
  /** Subtle panel fill for grouping content on this background. */
  panel: string;
  /** Primary button fill + its label color. */
  btnBg: string;
  btnText: string;
  /** Secondary (outline) button stroke + label. */
  outline: string;
}

/**
 * The contrast map: given the email's flat background, which brand colors to
 * use for every kind of element. This is the heart of the design system —
 * components read from here instead of hard-coding colors.
 */
export const onBg: Record<EmailBg, OnBg> = {
  // Dark green email — gold logo, white titles, beige copy, gold buttons.
  forest: {
    logo: 'gold',
    title: colors.white,
    body: colors.beige,
    accent: colors.gold,
    rule: 'rgba(227, 188, 98, 0.28)',
    panel: 'rgba(255, 255, 255, 0.06)',
    btnBg: colors.gold,
    btnText: colors.forest,
    outline: colors.gold,
  },
  // Gold email — cream logo, deep green type, forest buttons.
  gold: {
    logo: 'beige',
    title: colors.forest,
    body: colors.forestDeep,
    accent: colors.forest,
    rule: 'rgba(0, 77, 39, 0.22)',
    panel: 'rgba(255, 255, 255, 0.20)',
    btnBg: colors.forest,
    btnText: colors.beige,
    outline: colors.forest,
  },
  // Beige email — brand green logo, forest titles, forest buttons.
  beige: {
    logo: 'green',
    title: colors.forest,
    body: colors.ink,
    accent: colors.leaf,
    rule: 'rgba(0, 77, 39, 0.16)',
    panel: 'rgba(0, 77, 39, 0.04)',
    btnBg: colors.forest,
    btnText: colors.beige,
    outline: colors.forest,
  },
};
