import * as React from 'react';
import { List } from '@milonga/email-ds';

export const Leaf = () => (
  <div style={{ padding: 24 }}>
    <List
      marker="leaf"
      items={[
        'Whole-leaf yerba mate, never powder concentrate',
        'Functional mushrooms for real, felt focus',
        'A vanilla latte you can make in 30 seconds',
      ]}
    />
  </div>
);

export const Check = () => (
  <div style={{ padding: 24 }}>
    <List
      marker="check"
      items={[
        '100mg natural caffeine — no coffee spike',
        "300mg Lion's Mane for focus and clarity",
        '300mg L-Theanine for calm, no jitters',
      ]}
    />
  </div>
);

export const OnForest = () => (
  <div style={{ background: '#004D27', padding: 24 }}>
    <List
      marker="dot"
      onDark
      items={[
        'Clean, focused energy — Energy That Thinks',
        '15 servings per tin',
        'Vanilla Latte, ready in 30 seconds',
      ]}
    />
  </div>
);
