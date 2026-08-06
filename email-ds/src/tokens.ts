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
