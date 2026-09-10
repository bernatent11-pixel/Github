import * as React from 'react';
import { emailWidth, fontStack } from '../tokens';
import { EmailBg, bgFill, onBg } from '../theme';
import { bgStyle } from '../textures';
import { SurfaceContext } from '../surface';

export interface EmailShellProps {
  /**
   * The email's base background — dark green, gold or beige. Every block
   * inherits it unless a Section is given its own `bg`: an email may switch
   * color once or twice for emphasis (put a `SectionBreak` at the seam).
   * There are never white cards.
   */
  bg?: EmailBg;
  /** Column width in px (email standard is ~600). */
  width?: number;
  /**
   * Paint the brand paper grain across the WHOLE email instead of a flat fill
   * (gold and dark green only — beige has no texture art).
   */
  textured?: boolean;
  /**
   * Override the page colour with an exact CSS colour. Use it when a
   * full-bleed photograph is the hero and the page has to continue in the
   * photo's own background — sample the colour at the image's bottom edge and
   * the join disappears. Blocks still take their type colours from `bg`.
   */
  fill?: string;
  children?: React.ReactNode;
}

/**
 * The outer email frame: paints the base color full-bleed and centers the
 * content column. Sections may override the color for a band of the email.
 */
export function EmailShell({ bg = 'forest', width = emailWidth, textured = false, fill, children }: EmailShellProps) {
  return (
    <SurfaceContext.Provider value={{ bg, textured }}>
    <div
      className="milonga-email"
      style={{
        fontFamily: fontStack,
        ...bgStyle(bg, fill ?? bgFill[bg], textured),
        color: onBg[bg].body,
        width: '100%',
        paddingBottom: 1,
      }}
    >
      <div style={{ maxWidth: width, margin: '0 auto' }}>{children}</div>
    </div>
    </SurfaceContext.Provider>
  );
}
