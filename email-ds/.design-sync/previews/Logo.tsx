import * as React from 'react';
import { Logo } from '@milonga/email-ds';

export const Primary = () => <Logo variant="primary" tone="green" height={72} />;

export const Full = () => <Logo variant="full" tone="green" height={80} />;

export const Mark = () => <Logo variant="mark" tone="green" height={56} />;

export const OnForest = () => (
  <div style={{ background: '#004D27', padding: 24, display: 'flex', gap: 28, alignItems: 'center' }}>
    <Logo variant="primary" tone="gold" height={64} />
    <Logo variant="mark" tone="white" height={48} />
  </div>
);
