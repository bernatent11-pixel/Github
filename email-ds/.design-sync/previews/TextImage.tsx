import * as React from 'react';
import { TextImage } from '@milonga/email-ds';

export const Stacked = () => (
  <div style={{ background: '#004D27', padding: '28px 0' }}>
    <TextImage
      bg="forest"
      eyebrow="Our roots"
      title="A ritual, reimagined"
      text="For generations, yerba mate has been the drink of focus and friendship. We keep the whole-leaf tradition."
      image={{ kind: 'lifestyle' }}
    />
  </div>
);

export const SideByeSide = () => (
  <div style={{ background: '#F0EFDF', padding: '28px 0' }}>
    <TextImage
      bg="beige"
      layout="side"
      imageSide="left"
      eyebrow="The blend"
      title="Small-batch, always"
      text="Hand-selected leaf, blended in small batches."
      image={{ kind: 'studio' }}
    />
  </div>
);

export const WithCta = () => (
  <div style={{ background: '#E3BC62', padding: '28px 0' }}>
    <TextImage
      bg="gold"
      eyebrow="New"
      title="Meet the vanilla latte"
      text="Clean, focused energy in a smooth vanilla latte."
      image={{ kind: 'product', cutout: true }}
      cta={{ label: 'Shop now', href: '#' }}
    />
  </div>
);
