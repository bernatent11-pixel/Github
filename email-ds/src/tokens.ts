/**
 * Milonga email design tokens — the single source of truth for the brand.
 *
 * Colors come straight from the brand spec:
 *  - forest  #004D27  primary: backgrounds, buttons, icons
 *  - gold    #E3BC62  primary: titles/text on dark, buttons, accents
 *  - leaf    #057441  secondary: buttons, botanical accents
 *  - beige   #F0EFDF  secondary: light backgrounds, text on dark
 *  - white   #FFFFFF  text/titles
 */
export const colors = {
  forest: '#004D27',
  forestDeep: '#00351B',
  leaf: '#057441',
  gold: '#E3BC62',
  goldSoft: '#EFD9A0',
  beige: '#F0EFDF',
  cream: '#FBF8EF',
  white: '#FFFFFF',
  black: '#000000',
  ink: '#12331F',
  inkSoft: '#3B5344',
  line: 'rgba(0, 77, 39, 0.14)',
  lineOnDark: 'rgba(227, 188, 98, 0.28)',
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
