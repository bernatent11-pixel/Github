import * as React from 'react';
import { EmailBg, bgFill } from './theme';
import { bgStyle } from './textures';

export interface SurfaceCtx {
  /** The email's base background, painted once by EmailShell. */
  bg: EmailBg;
  /** Whether the shell is painting the brand paper grain. */
  textured: boolean;
}

export const SurfaceContext = React.createContext<SurfaceCtx | null>(null);

/**
 * The background style a block should paint.
 *
 * A block matching the email's base background paints NOTHING — the shell's
 * fill (flat or textured) shows through, so a textured email is textured end to
 * end rather than in stripes. A block that deliberately switches colour paints
 * its own, picking up the grain when the email is textured and that colour has
 * texture art.
 */
export function useSurface(bg: EmailBg): React.CSSProperties {
  const ctx = React.useContext(SurfaceContext);
  if (ctx && ctx.bg === bg) return {};
  return bgStyle(bg, bgFill[bg], ctx?.textured);
}

/**
 * The fill for a rounded block (panel, benefit card, product card, quote band).
 *
 * On a textured email the block is filled with the PLAIN brand colour, so it
 * reads as a clean shape cut out of the grain. On a flat email it keeps the
 * subtle translucent lift instead.
 */
export function useBlockFill(bg: EmailBg, elevated: string): string {
  const ctx = React.useContext(SurfaceContext);
  return ctx?.textured ? bgFill[bg] : elevated;
}
