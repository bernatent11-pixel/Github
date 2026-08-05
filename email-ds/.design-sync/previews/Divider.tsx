import * as React from 'react';
import { Divider } from '@milonga/email-ds';

export const Line = () => (
  <div style={{ padding: '0 24px' }}>
    <Divider variant="line" />
  </div>
);

export const Mark = () => <Divider variant="mark" />;

export const Dots = () => <Divider variant="dots" />;

export const OnForest = () => (
  <div style={{ background: '#004D27', padding: 24 }}>
    <Divider variant="line" onDark />
    <Divider variant="mark" onDark />
    <Divider variant="dots" onDark />
  </div>
);
