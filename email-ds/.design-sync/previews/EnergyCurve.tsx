import * as React from 'react';
import { EnergyCurve } from '@milonga/email-ds';

const SERIES = [
  { label: 'Coffee', points: [20, 95, 40, 18, 10] },
  { label: 'Milonga', points: [22, 70, 72, 60, 32], highlight: true },
];
const HOURS = ['8am', '11am', '2pm', '5pm', '8pm'];

export const OnForest = () => (
  <div style={{ background: '#004D27', padding: 28 }}>
    <EnergyCurve bg="forest" series={SERIES} xLabels={HOURS} />
  </div>
);

export const OnGold = () => (
  <div style={{ background: '#E3BC62', padding: 28 }}>
    <EnergyCurve bg="gold" series={SERIES} xLabels={HOURS} />
  </div>
);

export const OnBeige = () => (
  <div style={{ background: '#F0EFDF', padding: 28 }}>
    <EnergyCurve bg="beige" series={SERIES} xLabels={HOURS} />
  </div>
);
