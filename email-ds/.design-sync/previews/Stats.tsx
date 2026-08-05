import * as React from 'react';
import { Stats } from '@milonga/email-ds';

const items = [
  { value: '100mg', label: 'Natural caffeine' },
  { value: '300mg', label: "Lion's Mane" },
  { value: '15', label: 'Servings' },
];

export const Light = () => (
  <div style={{ padding: 24 }}>
    <Stats items={items} />
  </div>
);

export const OnForest = () => (
  <div style={{ background: '#004D27', padding: 24 }}>
    <Stats items={items} onDark />
  </div>
);
