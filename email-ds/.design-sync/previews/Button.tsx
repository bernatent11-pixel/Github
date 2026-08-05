import * as React from 'react';
import { Button } from '@milonga/email-ds';

export const Primary = () => <Button label="Shop the launch" href="#" variant="gold" size="lg" />;

export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
    <Button label="Shop now" href="#" variant="gold" />
    <Button label="Claim your 20%" href="#" variant="forest" />
    <Button label="Try Milonga" href="#" variant="leaf" />
    <Button label="Learn more" href="#" variant="outline" />
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
    <Button label="Add to cart" href="#" variant="gold" size="sm" />
    <Button label="Add to cart" href="#" variant="gold" size="md" />
    <Button label="Add to cart" href="#" variant="gold" size="lg" />
  </div>
);

export const OnForest = () => (
  <div style={{ background: '#004D27', padding: 24, display: 'flex', gap: 16 }}>
    <Button label="Shop now" href="#" variant="gold" />
    <Button label="Learn more" href="#" variant="outlineOnDark" />
  </div>
);
