import * as React from 'react';
import { Callout } from '@milonga/email-ds';

export const HighlightForest = () => (
  <div style={{ padding: 24 }}>
    <Callout tone="forest" text="Launch stock is limited — first batch ships this week." attribution="Free shipping over $35" />
  </div>
);

export const HighlightGold = () => (
  <div style={{ padding: 24 }}>
    <Callout tone="gold" text="FOCUS20 — 20% off" attribution="Auto-applies at checkout" />
  </div>
);

export const Quote = () => (
  <div style={{ padding: 24 }}>
    <Callout
      variant="quote"
      tone="forest"
      text="It's the first energy drink that actually makes me feel calm and clear at the same time."
      attribution="Sofia R. — Milonga drinker"
    />
  </div>
);

export const QuoteBeige = () => (
  <div style={{ padding: 24, background: '#F0EFDF' }}>
    <Callout
      variant="quote"
      tone="beige"
      text="No jitters, no 3pm crash — just steady focus all afternoon."
      attribution="Mateo L. — Milonga drinker"
    />
  </div>
);
