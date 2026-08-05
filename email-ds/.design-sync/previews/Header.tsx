import * as React from 'react';
import { Header } from '@milonga/email-ds';

export const Dark = () => <Header tone="dark" tagline="Energy That Thinks" />;

export const Light = () => <Header tone="light" tagline="Energy That Thinks" />;

export const WithLink = () => (
  <Header tone="dark" tagline="Now available" link={{ label: 'Shop', href: '#' }} />
);

export const MarkOnly = () => <Header tone="dark" logo="mark" tagline="Energy That Thinks" />;
