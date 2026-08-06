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
  /** Headline / title color — the FIRST half of a two-tone title. */
  title: string;
  /** The SECOND half of a two-tone title, so headlines are never one flat color. */
  titleAccent: string;
  /** Body copy color. */
  body: string;
  /** Eyebrow, small caps, emphasis figures. */
  accent: string;
  /** Icon glyph color — set per background, independent of `accent`. */
  icon: string;
  /** Hairline rules and card borders. */
  rule: string;
  /** Subtle panel fill for grouping content on this background. */
  panel: string;
  /** Primary button fill + its label color. */
  btnBg: string;
  btnText: string;
  /** Secondary (outline) button stroke + label. */
  outline: string;
  /**
   * Depth tokens — blocks, charts and graphs sit slightly ABOVE the flat
   * background instead of lying dead flat on it.
   */
  /** Raised surface fill for a block that should read as lifted. */
  elevated: string;
  /** Soft drop shadow beneath a raised block. */
  shadow: string;
  /** Stronger shadow for the most prominent block on screen. */
  shadowLg: string;
  /** Top highlight edge — the light catching the upper rim of a raised block. */
  sheen: string;
  /** Gradient for accent fills (bars, discs) so they read as volume, not paint. */
  accentGradient: string;
  /** Translucent accent for area fills under charts. */
  accentWash: string;
  /** Soft shadow under headlines and big numerals so type has weight. */
  textShadow: string;
  /** Gradient for oversized numerals and stat figures. */
  numberGradient: string;
  /** Raised-button fill (gradient) and the shadow under it. */
  btnGradient: string;
  btnShadow: string;
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
    title: colors.beige,
    titleAccent: colors.gold,
    body: colors.white,
    accent: colors.gold,
    icon: colors.gold,
    rule: 'rgba(227, 188, 98, 0.28)',
    panel: 'rgba(255, 255, 255, 0.06)',
    btnBg: colors.gold,
    btnText: colors.forest,
    outline: colors.gold,
    elevated: 'rgba(255, 255, 255, 0.07)',
    shadow: '0 6px 18px rgba(0, 26, 13, 0.38)',
    shadowLg: '0 14px 34px rgba(0, 26, 13, 0.48)',
    sheen: 'rgba(255, 255, 255, 0.14)',
    accentGradient: `linear-gradient(180deg, ${colors.goldSoft} 0%, ${colors.gold} 55%, #C9A24E 100%)`,
    accentWash: 'rgba(227, 188, 98, 0.20)',
    textShadow: '0 2px 10px rgba(0, 26, 13, 0.45)',
    numberGradient: `linear-gradient(180deg, ${colors.goldSoft} 0%, ${colors.gold} 60%, #BE9743 100%)`,
    btnGradient: `linear-gradient(180deg, ${colors.goldSoft} 0%, ${colors.gold} 52%, #CDA54E 100%)`,
    btnShadow: '0 8px 20px rgba(0, 26, 13, 0.42)',
  },
  // Gold email — cream logo, deep green type, forest buttons.
  gold: {
    logo: 'beige',
    title: colors.beige,
    titleAccent: colors.white,
    body: colors.white,
    accent: colors.leaf,
    icon: colors.beige,
    rule: 'rgba(0, 77, 39, 0.22)',
    panel: 'rgba(255, 255, 255, 0.20)',
    btnBg: colors.forest,
    btnText: colors.beige,
    outline: colors.forest,
    elevated: 'rgba(255, 250, 235, 0.26)',
    shadow: '0 6px 18px rgba(120, 86, 20, 0.22)',
    shadowLg: '0 14px 34px rgba(120, 86, 20, 0.30)',
    sheen: 'rgba(255, 255, 255, 0.42)',
    accentGradient: `linear-gradient(180deg, ${colors.leaf} 0%, ${colors.forest} 70%, ${colors.forestDeep} 100%)`,
    accentWash: 'rgba(0, 77, 39, 0.16)',
    textShadow: '0 2px 12px rgba(90, 62, 10, 0.45)',
    numberGradient: `linear-gradient(180deg, ${colors.leaf} 0%, ${colors.forest} 65%, ${colors.forestDeep} 100%)`,
    btnGradient: `linear-gradient(180deg, ${colors.leaf} 0%, ${colors.forest} 60%, ${colors.forestDeep} 100%)`,
    btnShadow: '0 8px 20px rgba(120, 86, 20, 0.30)',
  },
  // Beige email — brand green logo, forest titles, forest buttons.
  beige: {
    logo: 'green',
    title: colors.forest,
    // Leaf green, so a beige-background title still reads as two greens rather
    // than one flat block — the titles stay dark green either way.
    titleAccent: colors.leaf,
    body: colors.black,
    accent: colors.leaf,
    icon: colors.forest,
    rule: 'rgba(0, 77, 39, 0.16)',
    panel: 'rgba(0, 77, 39, 0.04)',
    btnBg: colors.forest,
    btnText: colors.beige,
    outline: colors.forest,
    elevated: 'rgba(255, 253, 246, 0.45)',
    shadow: '0 5px 14px rgba(0, 77, 39, 0.09)',
    shadowLg: '0 14px 34px rgba(0, 77, 39, 0.18)',
    sheen: 'rgba(255, 255, 255, 0.55)',
    accentGradient: `linear-gradient(180deg, ${colors.leaf} 0%, ${colors.forest} 70%, ${colors.forestDeep} 100%)`,
    accentWash: 'rgba(0, 77, 39, 0.12)',
    textShadow: '0 2px 10px rgba(0, 77, 39, 0.10)',
    numberGradient: `linear-gradient(180deg, ${colors.leaf} 0%, ${colors.forest} 65%, ${colors.forestDeep} 100%)`,
    btnGradient: `linear-gradient(180deg, ${colors.leaf} 0%, ${colors.forest} 60%, ${colors.forestDeep} 100%)`,
    btnShadow: '0 8px 20px rgba(0, 77, 39, 0.18)',
  },
};
