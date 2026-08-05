import * as React from 'react';
import { IngredientList } from '@milonga/email-ds';

const items = [
  { name: "Lion's Mane", amount: '300mg', note: 'Focus & clarity' },
  { name: 'Natural caffeine', amount: '100mg', note: 'From yerba mate' },
  { name: 'L-Theanine', amount: '300mg', note: 'Calm, no jitters' },
];

export const Light = () => (
  <div style={{ padding: 24 }}>
    <IngredientList items={items} />
  </div>
);

export const OnForest = () => (
  <div style={{ background: '#004D27', padding: 24 }}>
    <IngredientList items={items} onDark />
  </div>
);
