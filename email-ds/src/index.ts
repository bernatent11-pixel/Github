// Milonga email design system — public API.
export * from './tokens';

// Foundations
export { Icon } from './components/Icon';
export type { IconName, IconProps } from './components/Icon';
export { Logo } from './components/Logo';
export type { LogoProps, LogoTone, LogoVariant } from './components/Logo';

// Layout
export { EmailShell } from './components/EmailShell';
export type { EmailShellProps } from './components/EmailShell';
export { Section, SectionHeading, SURFACE_BG, onSurface } from './components/Section';
export type { SectionProps, SectionHeadingProps, SurfaceTone } from './components/Section';
export { Divider } from './components/Divider';
export type { DividerProps } from './components/Divider';

// Content blocks
export { Header } from './components/Header';
export type { HeaderProps } from './components/Header';
export { Hero } from './components/Hero';
export type { HeroProps } from './components/Hero';
export { Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';
export { ImageSlot } from './components/ImageSlot';
export type { ImageSlotProps, ImageKind, ImageRatio } from './components/ImageSlot';
export { ProductCard } from './components/ProductCard';
export type { ProductCardProps } from './components/ProductCard';
export { BenefitsGrid } from './components/BenefitsGrid';
export type { BenefitsGridProps, Benefit } from './components/BenefitsGrid';
export { IngredientList } from './components/IngredientList';
export type { IngredientListProps, Ingredient } from './components/IngredientList';
export { ComparisonTable } from './components/ComparisonTable';
export type { ComparisonTableProps, Cell } from './components/ComparisonTable';
export { BarChart } from './components/BarChart';
export type { BarChartProps, Bar } from './components/BarChart';
export { Stats } from './components/Stats';
export type { StatsProps, Stat } from './components/Stats';
export { Callout } from './components/Callout';
export type { CalloutProps } from './components/Callout';
export { List } from './components/List';
export type { ListProps } from './components/List';
export { Footer } from './components/Footer';
export type { FooterProps } from './components/Footer';

// Full-email blueprints
export { PromoEmail } from './blueprints/PromoEmail';
export type { PromoEmailProps } from './blueprints/PromoEmail';
export { EducationalEmail } from './blueprints/EducationalEmail';
export type { EducationalEmailProps } from './blueprints/EducationalEmail';
export { StorytellingEmail } from './blueprints/StorytellingEmail';
export type { StorytellingEmailProps } from './blueprints/StorytellingEmail';
export { LaunchEmail } from './blueprints/LaunchEmail';
export type { LaunchEmailProps } from './blueprints/LaunchEmail';
