import * as React from 'react';
import { TwoToneTitle } from '@milonga/email-ds';

const H: React.CSSProperties = {
  fontSize: 30, fontWeight: 900, lineHeight: 1.15, margin: 0,
  textTransform: 'uppercase', letterSpacing: '0.015em',
};

export const OnForest = () => (
  <div style={{ background: '#004D27', padding: 30 }}>
    <h2 style={H}><TwoToneTitle title="Your focus, 20% sharper" bg="forest" /></h2>
  </div>
);

export const OnGold = () => (
  <div style={{ background: '#E3BC62', padding: 30 }}>
    <h2 style={H}><TwoToneTitle title="Meet Milonga Vanilla Latte" bg="gold" /></h2>
  </div>
);

export const OnBeige = () => (
  <div style={{ background: '#F0EFDF', padding: 30 }}>
    <h2 style={H}><TwoToneTitle title="Why yerba mate beats the 3pm crash" bg="beige" /></h2>
  </div>
);

export const ChosenSplit = () => (
  <div style={{ background: '#004D27', padding: 30 }}>
    <h2 style={H}>
      <TwoToneTitle title="Energy that thinks" accentPart="thinks" bg="forest" />
    </h2>
  </div>
);
