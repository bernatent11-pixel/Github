import * as React from 'react';
import { emailWidth, fontStack } from '../tokens';
import { EmailBg, bgFill, onBg } from '../theme';

export interface EmailShellProps {
  /**
   * The ONE flat background color for the whole email — dark green, gold or
   * beige. Every block inside inherits it; there are no white cards.
   */
  bg?: EmailBg;
  /** Column width in px (email standard is ~600). */
  width?: number;
  children?: React.ReactNode;
}

/**
 * The outer email frame. Milonga emails are a single flat color end to end:
 * this paints that color full-bleed and centers the content column on it.
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
