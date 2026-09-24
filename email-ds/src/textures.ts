import * as React from 'react';
import { EmailBg } from './theme';
import tileGold from '../public/brand/textures/tile-gold.jpg';
import tileForest from '../public/brand/textures/tile-forest.jpg';
import tilePaper from '../public/brand/textures/tile-paper.jpg';

/**
 * Optional paper-grain textures, an alternative to a flat fill when an email
 * should feel more tactile.
 *
 * Beige uses tile-paper, which had been sitting in the brand folder unwired.
 * It matters most there: forest and gold are saturated enough to hold a flat
 * field, but a large beige area with type on it reads as blank paper, and the
 * grain is the difference between a background and an absence of one. It is
 * within a point or two of the flat beige in every channel, so it adds tooth
 * without shifting the colour.
 */
export const textureTile: Partial<Record<EmailBg, string>> = {
  gold: tileGold,
  forest: tileForest,
  beige: tilePaper,
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
