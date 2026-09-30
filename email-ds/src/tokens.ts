/**
 * Milonga email design tokens — the single source of truth for the brand.
 *
 * The full Mate Latte palette, in three tiers:
 *
 *  Core — the brand spec. Backgrounds, type, buttons, icons.
 *  - forest  #004D27  primary: backgrounds, buttons, icons
 *  - gold    #E3BC62  primary: titles/text on dark, buttons, accents
 *  - leaf    #057441  secondary: buttons, botanical accents
 *  - beige   #F0EFDF  secondary: light backgrounds, text on dark
 *  - white   #FFFFFF  text/titles
 *
 *  Support — tints and shades of the core, for depth, paper and body ink.
 *
 *  Canopy — the forest-scene greens, lightest to darkest. Illustration only:
 *  none of them is type, and none is a page background.
 *
 * The brand's delivered artwork (icons, textures, the canopy source) is inked
 * in a duller rendering of the same four colours — see `artworkInks`.
 */
export const colors = {
  // Core
  forest: '#004D27',
  gold: '#E3BC62',
  leaf: '#057441',
  beige: '#F0EFDF',
  white: '#FFFFFF',
  black: '#000000',

  // Support
  forestDeep: '#00351B',
  forestNight: '#002D17',
  goldSoft: '#EFD9A0',
  goldDeep: '#C9A24E',
  cream: '#FBF8EF',
  ink: '#12331F',
  inkSoft: '#3B5344',

  // Canopy — the illustrated forest, back layer to front
  canopyLight: '#88CF7F',
  canopySage: '#62BD6F',
  canopyFern: '#4CAB55',
  canopyMid: '#297F49',
  canopyShadow: '#0D5D32',
  canopyTrunk: '#002D17',

  line: 'rgba(0, 77, 39, 0.14)',
  lineOnDark: 'rgba(227, 188, 98, 0.28)',
} as const;

/**
 * The inks the brand's artwork files are exported in — the icon PNGs, the
 * textures and the original canopy. Measured from the files, not from a spec.
 * They are the core colours rendered duller (a CMYK-document export), so a
 * gold icon reads darker than a gold button beside it.
 *
 * Not tokens: never pick one for type or a fill. Use them only to match
 * something to a piece of delivered art, or as the source value when
 * recolouring that art to the core palette.
 */
export const artworkInks = {
  forest: '#284E2D',
  gold: '#C2A15C',
  leaf: '#407246',
  cream: '#F0EFDF',
} as const;

/** Gotham with an email-safe fallback stack (most clients drop the web font). */
export const fontStack =
  '"Gotham", "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif';

export const fontWeights = {
  regular: 400,
  medium: 500,
  bold: 700,
  black: 900,
} as const;

export const space = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 36,
  xxl: 52,
} as const;

/**
 * The 8px grid. `space` above is the older, tighter set that existing
 * components use; `grid` is the documented scale for anything new, so
 * vertical rhythm across an email is a multiple of one number rather than
 * whatever looked right at the time.
 */
export const grid = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64,
} as const;

/**
 * The type scale. Sizes were being chosen per component, which is how two
 * headings end up 1px apart for no reason. Pick the nearest step instead.
 */
export const type = {
  hero: 64,      // the full-bleed opening statement, Black
  h1: 44,        // a loud section headline
  h2: 28,        // the standard section title
  h3: 20,        // a row title inside a block
  bodyLg: 16,    // the paragraph that has to be read
  body: 14,      // primary body copy
  bodySm: 13,    // supporting copy inside blocks
  caption: 11,   // captions, unit lines
  eyebrow: 12,   // small caps labels above a title
  button: 13,    // button labels, always caps
} as const;

/** Tracking. Caps need air; body does not. */
export const tracking = {
  caps: '0.06em',
  capsWide: '0.18em',
  normal: '0',
} as const;

/** The readable column inside the 600px frame, once side padding is removed. */
export const emailInner = 540;

export const radius = {
  sm: 8,
  md: 14,
  lg: 22,
  pill: 999,
} as const;

/** Outer email frame width — the classic ~600px email column. */
export const emailWidth = 600;

export type ColorToken = keyof typeof colors;

/** Resolve a color token name to its hex; pass through raw CSS colors. */
export function color(c: ColorToken | string): string {
  return (colors as Record<string, string>)[c] ?? c;
}
