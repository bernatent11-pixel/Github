import * as React from 'react';
import { EmailBg, bgFill } from '../theme';
import canopy from '../../public/brand/scene/canopy-band.png';

export interface ForestSceneProps {
  /** The background the canopy sits ON — normally beige or gold. */
  from?: EmailBg;
  /** The background the canopy resolves INTO — the section below. */
  to?: EmailBg;
}

/**
 * The illustrated tree canopy: decoration that sits on a light background
 * (beige or gold) and resolves into the dark green section below, so the colour
 * change reads as a scene rather than a hard edge. The art is colour-matched to
 * the forest green, so it joins the next section seamlessly.
 */
export function ForestScene({ from = 'beige', to = 'forest' }: ForestSceneProps) {
  return (
    <div style={{ background: bgFill[from], lineHeight: 0, fontSize: 0 }}>
      <img src={canopy} alt="" style={{ display: 'block', width: '100%', height: 'auto' }} />
      {/* guards against a sub-pixel seam between the art and the next section */}
      <div style={{ background: bgFill[to], height: 2 }} />
    </div>
  );
}
