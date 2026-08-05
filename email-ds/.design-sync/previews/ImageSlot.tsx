import * as React from 'react';
import { ImageSlot } from '@milonga/email-ds';

export const Product = () => (
  <div style={{ maxWidth: 280 }}>
    <ImageSlot kind="product" ratio="square" tone="cream" caption="Milonga Vanilla Latte — 15 servings" />
  </div>
);

export const Lifestyle = () => (
  <ImageSlot kind="lifestyle" ratio="wide" tone="beige" caption="Clean, focused energy for the 3pm stretch" />
);

export const Studio = () => (
  <ImageSlot kind="studio" ratio="landscape" tone="forest" caption="Yerba mate, Lion's Mane & vanilla — the Milonga blend" />
);
