import * as React from 'react';
import { emailWidth, fontStack } from '../tokens';
import { EmailBg, bgFill, onBg } from '../theme';

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
  children?: React.ReactNode;
}

/**
 * The outer email frame: paints the base color full-bleed and centers the
 * content column. Sections may override the color for a band of the email.
 */
export function EmailShell({ bg = 'forest', width = emailWidth, children }: EmailShellProps) {
  return (
    <div
      className="milonga-email"
      style={{
        fontFamily: fontStack,
        background: bgFill[bg],
        color: onBg[bg].body,
        width: '100%',
        paddingBottom: 1,
      }}
    >
      <div style={{ maxWidth: width, margin: '0 auto' }}>{children}</div>
    </div>
  );
}
