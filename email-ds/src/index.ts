// Milonga email design system — public API.
export * from './tokens';
export { bgFill, onBg } from './theme';
export type { EmailBg, OnBg } from './theme';

// Foundations
export { Icon } from './components/Icon';
export type { IconName, IconProps } from './components/Icon';
export { IconBadge } from './components/IconBadge';
export type { IconBadgeProps } from './components/IconBadge';
export { BenefitList } from './components/BenefitList';
export type { BenefitListProps, BenefitLine } from './components/BenefitList';
export { Paper } from './components/Paper';
export type { PaperProps } from './components/Paper';
export { Prose, splitEmphasis } from './components/Prose';
export type { ProseProps } from './components/Prose';
export { Badge } from './components/Badge';
export type { BadgeProps } from './components/Badge';
export { BleedImage } from './components/BleedImage';
export type { BleedImageProps } from './components/BleedImage';
export { BundleOffer } from './components/BundleOffer';
export type { BundleOfferProps, BundleTier, SubscribeOffer } from './components/BundleOffer';
export { PriceBlock } from './components/PriceBlock';
export type { PriceBlockProps, PriceOption, BundleTab } from './components/PriceBlock';
export { AnyIcon, isBrandMark } from './components/AnyIcon';
export type { AnyIconProps, AnyIconName } from './components/AnyIcon';
export { BrandIcon, IconRow, INGREDIENTS, FREE_FROM, SERVE, MARK_LABEL, inkFor } from './components/BrandIcon';
export type { BrandIconProps, IconRowProps, BrandMark, BrandInk } from './components/BrandIcon';
export { ForestScene } from './components/ForestScene';
export type { ForestSceneProps } from './components/ForestScene';
export { textureTile, bgStyle } from './textures';
export { Logo } from './components/Logo';
export type { LogoProps, LogoTone, LogoVariant } from './components/Logo';

// Layout
export { EmailShell } from './components/EmailShell';
export type { EmailShellProps } from './components/EmailShell';
export { Section, SectionHeading, Panel } from './components/Section';
export type { SectionProps, SectionHeadingProps, PanelProps } from './components/Section';
export { SectionBreak } from './components/SectionBreak';
export type { SectionBreakProps } from './components/SectionBreak';
export { TwoToneTitle, splitTitle } from './components/TwoToneTitle';
export type { TwoToneTitleProps } from './components/TwoToneTitle';
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
export { TextImage } from './components/TextImage';
export type { TextImageProps } from './components/TextImage';
export { ProductCard } from './components/ProductCard';
export type { ProductCardProps } from './components/ProductCard';
export { BenefitsGrid } from './components/BenefitsGrid';
export type { BenefitsGridProps, Benefit } from './components/BenefitsGrid';
export { IngredientList } from './components/IngredientList';
export type { IngredientListProps, Ingredient } from './components/IngredientList';
export { ComparisonTable } from './components/ComparisonTable';
export type { ComparisonTableProps, Cell, CellValue, Row } from './components/ComparisonTable';
export { BarChart } from './components/BarChart';
export type { BarChartProps, Bar } from './components/BarChart';
export { VersusBlock } from './components/VersusBlock';
export type { VersusBlockProps, VersusSide } from './components/VersusBlock';
export { Steps } from './components/Steps';
export type { StepsProps, Step } from './components/Steps';
export { EnergyCurve } from './components/EnergyCurve';
export type { EnergyCurveProps, CurveSeries } from './components/EnergyCurve';
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
