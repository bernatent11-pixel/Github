import * as React from 'react';
import { VersusBlock } from '@milonga/email-ds';

const LEFT = { label: 'Coffee at 3pm', points: ['Spike, then crash', 'Jitters and anxiety', 'Acidic on an empty stomach'] };
const RIGHT = { label: 'Milonga at 3pm', points: ['Steady, even lift', 'Calm focus, no jitters', 'Smooth vanilla latte'] };

export const OnForest = () => (
  <div style={{ background: '#004D27', padding: 28 }}>
    <VersusBlock bg="forest" left={LEFT} right={RIGHT} />
  </div>
);

export const OnGold = () => (
  <div style={{ background: '#E3BC62', padding: 28 }}>
    <VersusBlock bg="gold" left={LEFT} right={RIGHT} />
  </div>
);

export const OnBeige = () => (
  <div style={{ background: '#F0EFDF', padding: 28 }}>
    <VersusBlock bg="beige" left={LEFT} right={RIGHT} />
  </div>
);
