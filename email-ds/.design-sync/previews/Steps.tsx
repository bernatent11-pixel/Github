import * as React from 'react';
import { Steps } from '@milonga/email-ds';

const ITEMS = [
  { title: 'One scoop', text: 'Add a scoop of Milonga to your cup.' },
  { title: 'Add hot water or milk', text: 'Stir for 10 seconds until smooth.' },
  { title: 'Sip and focus', text: 'Clean energy for the next four hours.' },
];

export const Numerals = () => (
  <div style={{ background: '#004D27', padding: 28 }}>
    <Steps bg="forest" items={ITEMS} />
  </div>
);

export const Discs = () => (
  <div style={{ background: '#004D27', padding: 28 }}>
    <Steps bg="forest" variant="discs" items={ITEMS} />
  </div>
);

export const DiscsOnGold = () => (
  <div style={{ background: '#E3BC62', padding: 28 }}>
    <Steps bg="gold" variant="discs" items={ITEMS} />
  </div>
);

export const NumeralsOnBeige = () => (
  <div style={{ background: '#F0EFDF', padding: 28 }}>
    <Steps bg="beige" items={ITEMS} />
  </div>
);
