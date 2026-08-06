import * as React from 'react';
import { IconRow, INGREDIENTS, FREE_FROM, SERVE } from '@milonga/email-ds';

export const IngredientsOnForest = () => (
  <div style={{ background: '#004D27', padding: 28 }}>
    <IconRow bg="forest" marks={INGREDIENTS} size={54} />
  </div>
);

export const IngredientsOnGold = () => (
  <div style={{ background: '#E3BC62', padding: 28 }}>
    <IconRow bg="gold" marks={INGREDIENTS} size={54} />
  </div>
);

export const IngredientsOnBeige = () => (
  <div style={{ background: '#F0EFDF', padding: 28 }}>
    <IconRow bg="beige" marks={INGREDIENTS} size={54} />
  </div>
);

export const FreeFromAndServe = () => (
  <div style={{ background: '#004D27', padding: 28 }}>
    <IconRow bg="forest" marks={FREE_FROM} size={44} />
    <div style={{ height: 22 }} />
    <IconRow bg="forest" marks={SERVE} size={44} />
  </div>
);
