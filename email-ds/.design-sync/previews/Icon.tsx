import * as React from 'react';
import { Icon } from '@milonga/email-ds';

export const Forest = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    <Icon name="leaf" size={28} color="#004D27" />
    <Icon name="bolt" size={28} color="#004D27" />
    <Icon name="brain" size={28} color="#004D27" />
    <Icon name="clock" size={28} color="#004D27" />
    <Icon name="heart" size={28} color="#004D27" />
  </div>
);

export const Gold = () => (
  <div style={{ background: '#004D27', padding: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
    <Icon name="seed" size={28} color="#E3BC62" />
    <Icon name="check" size={28} color="#E3BC62" />
    <Icon name="cross" size={28} color="#E3BC62" />
    <Icon name="star" size={28} color="#E3BC62" />
    <Icon name="leaf" size={28} color="#E3BC62" />
  </div>
);
