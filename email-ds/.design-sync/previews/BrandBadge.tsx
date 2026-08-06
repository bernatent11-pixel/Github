import * as React from 'react';
import { BadgeRow, INGREDIENTS, FREE_FROM, SERVE } from '@milonga/email-ds';

export const IngredientsOnForest = () => (
  <div style={{ background: '#004D27', padding: 28 }}>
    <BadgeRow bg="forest" marks={INGREDIENTS} size={36} />
  </div>
);

export const IngredientsOnGold = () => (
  <div style={{ background: '#E3BC62', padding: 28 }}>
    <BadgeRow bg="gold" marks={INGREDIENTS} size={36} />
  </div>
);

export const FreeFromOnBeige = () => (
  <div style={{ background: '#F0EFDF', padding: 28 }}>
    <BadgeRow bg="beige" marks={FREE_FROM} size={36} />
  </div>
);

export const ServeOnForest = () => (
  <div style={{ background: '#004D27', padding: 28 }}>
    <BadgeRow bg="forest" marks={SERVE} size={36} />
  </div>
);
