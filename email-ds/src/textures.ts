import * as React from 'react';
import { EmailBg } from './theme';
import tileGold from '../public/brand/textures/tile-gold.jpg';
import tileForest from '../public/brand/textures/tile-forest.jpg';

/**
 * Optional paper-grain textures for the gold and dark green backgrounds — an
 * alternative to a flat fill when an email should feel more tactile. Beige has
 * no texture art, so it stays flat.
 */
export const textureTile: Partial<Record<EmailBg, string>> = {
  gold: tileGold,
  forest: tileForest,
};

/**
 * The CSS `background` value for a background, with the grain tiled over the
 * brand color when `textured` is on (the color stays underneath, so the hue is
 * identical to the flat version).
 */
export function bgStyle(bg: EmailBg, fill: string, textured?: boolean): React.CSSProperties {
  const tile = textured ? textureTile[bg] : undefined;
  if (!tile) return { background: fill };
  // The tile is already colour-corrected to the brand hex, so it tiles directly.
  // backgroundColor stays as the fallback for clients that block images.
  return {
    backgroundColor: fill,
    backgroundImage: `url(${tile})`,
    backgroundSize: '320px 320px',
    backgroundRepeat: 'repeat',
  };
}
