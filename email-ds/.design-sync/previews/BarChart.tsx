import * as React from 'react';
import { BarChart } from '@milonga/email-ds';

const data = [
  { label: 'Milonga', value: 100, suffix: 'mg', highlight: true },
  { label: 'Drip coffee', value: 165, suffix: 'mg' },
  { label: 'Energy drink', value: 200, suffix: 'mg' },
];

export const Caffeine = () => (
  <div style={{ padding: 24 }}>
    <BarChart data={data} max={220} />
  </div>
);

export const OnForest = () => (
  <div style={{ background: '#004D27', padding: 24 }}>
    <BarChart data={data} max={220} onDark />
  </div>
);
