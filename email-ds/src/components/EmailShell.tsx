import * as React from 'react';
import { colors, emailWidth, fontStack } from '../tokens';

export interface EmailShellProps {
  /** Page backdrop behind the email column. */
  page?: 'beige' | 'forest' | 'cream' | 'white';
  /** The email column surface. */
  surface?: 'white' | 'beige' | 'forest' | 'cream';
  /** Column width in px (email standard is ~600). */
  width?: number;
  /** Rounded column corners for a modern in-client look. */
  rounded?: boolean;
  children?: React.ReactNode;
}

const PAGE = { beige: colors.beige, forest: colors.forestDeep, cream: colors.cream, white: colors.white };
const SURFACE = { white: colors.white, beige: colors.beige, forest: colors.forest, cream: colors.cream };

/**
 * The outer email frame: a full-bleed page backdrop with a centered content
 * column at email width. Wrap every Milonga email in this, then stack blocks.
 */
export function EmailShell({
  page = 'beige',
  surface = 'white',
  width = emailWidth,
  rounded = true,
  children,
}: EmailShellProps) {
  return (
    <div
      className="milonga-email"
      style={{
        fontFamily: fontStack,
        background: PAGE[page],
        padding: '32px 16px',
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: width,
          margin: '0 auto',
          background: SURFACE[surface],
          borderRadius: rounded ? 20 : 0,
          overflow: 'hidden',
          boxShadow: page === 'forest' ? 'none' : '0 18px 48px rgba(0, 53, 27, 0.10)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
