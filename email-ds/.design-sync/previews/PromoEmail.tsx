import * as React from 'react';
import { PromoEmail } from '@milonga/email-ds';

export const Default = () => <PromoEmail />;

export const CustomOffer = () => (
  <PromoEmail
    title="15% off your afternoon focus"
    offer="Take 15% off your first tin of Milonga Vanilla Latte."
    code="THINK15"
  />
);
