import * as React from 'react';
import { BenefitsGrid } from '@milonga/email-ds';

const items = [
  { icon: 'bolt' as const, title: 'Clean caffeine', text: '100mg from yerba mate — energy without the coffee spike.' },
  { icon: 'brain' as const, title: "Lion's Mane", text: '300mg to support focus, memory and mental clarity.' },
  { icon: 'clock' as const, title: 'No crash', text: 'L-Theanine smooths the curve for hours of steady calm.' },
  { icon: 'leaf' as const, title: 'Whole-leaf', text: 'Real yerba mate, naturally rich in antioxidants.' },
];

export const TwoColumn = () => (
  <div style={{ padding: 24 }}>
    <BenefitsGrid columns={2} items={items} />
  </div>
);

export const OneColumn = () => (
  <div style={{ padding: 24, maxWidth: 360 }}>
    <BenefitsGrid columns={1} items={items.slice(0, 3)} />
  </div>
);

export const OnForest = () => (
  <div style={{ background: '#004D27', padding: 24 }}>
    <BenefitsGrid columns={2} onDark items={items} />
  </div>
);
