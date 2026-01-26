import { useAccessibilityClasses } from '@/hooks/accessibility';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import {
  getBorderContrastClasses,
  getTextContrastClasses,
} from '@/utils/accessibility';
import React, { ReactNode, useMemo } from 'react';
import { Text, View } from 'react-native';

/**
 * Card Component - MindEase Mobile
 * Base card component with automatic accessibility settings application
 *
 * Uses composition pattern - accepts Card subcomponents:
 * - Card.Header for header section
 * - Card.Title for title
 * - Card.Description for description
 * - Card.Content for main content
 *
 * This component automatically applies:
 * - Spacing preferences (padding, gap)
 * - Contrast settings
 * - Animation preferences
 * - Focus mode styles (only when focused prop is true)
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Title</Card.Title>
 *     <Card.Description>Description</Card.Description>
 *   </Card.Header>
 *   <Card.Content>
 *     Content here
 *   </Card.Content>
 * </Card>
 * ```
 */
export interface CardProps {
  /** Card content */
  children: ReactNode;

  /** Custom className to extend base styles */
  className?: string;

  /** Whether this card is currently focused (applies focus mode styles) */
  focused?: boolean;

  /** Test ID for testing */
  testID?: string;
}

const CardRoot = function Card({
  children,
  className = '',
  focused = false,
  testID,
}: CardProps) {
  const { settings } = useCognitiveSettings();
  const { spacingClasses, contrastClasses, animationsEnabled } =
    useAccessibilityClasses();

  const borderClasses = useMemo(
    () => getBorderContrastClasses(settings.contrast, 'subtle'),
    [settings.contrast]
  );

  // Focus mode classes when this specific card is focused
  const focusModeClasses = focused
    ? 'border-2 border-action-primary shadow-md'
    : '';

  const cardClasses = `flex flex-col bg-surface-primary border rounded-lg ${spacingClasses.padding} ${spacingClasses.gap} ${borderClasses} ${focusModeClasses} ${className}`;

  return (
    <View className={cardClasses} testID={testID}>
      {children}
    </View>
  );
};

CardRoot.displayName = 'Card';

/**
 * Card.Header - Header subcomponent
 */
export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
  testID?: string;
}

function CardHeader({
  children,
  className = '',
  testID,
}: CardHeaderProps) {
  const { settings } = useCognitiveSettings();
  const { spacingClasses } = useAccessibilityClasses();

  const borderClasses = useMemo(
    () => getBorderContrastClasses(settings.contrast, 'subtle'),
    [settings.contrast]
  );

  const headerClasses = `flex flex-col border-b ${spacingClasses.gap} ${borderClasses} ${className}`;

  return (
    <View className={headerClasses} testID={testID}>
      {children}
    </View>
  );
}

CardHeader.displayName = 'Card.Header';

/**
 * Card.Title - Title subcomponent
 */
export interface CardTitleProps {
  children: ReactNode;
  className?: string;
  testID?: string;
}

function CardTitle({ children, className = '', testID }: CardTitleProps) {
  const { settings } = useCognitiveSettings();
  const { fontSizeClasses } = useAccessibilityClasses();

  const textContrastClasses = useMemo(
    () => getTextContrastClasses(settings.contrast, 'primary'),
    [settings.contrast]
  );

  const titleClasses = `font-semibold ${fontSizeClasses.lg} ${textContrastClasses} ${className}`;

  return (
    <Text className={titleClasses} testID={testID}>
      {children}
    </Text>
  );
}

CardTitle.displayName = 'Card.Title';

/**
 * Card.Description - Description subcomponent
 */
export interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
  testID?: string;
}

function CardDescription({
  children,
  className = '',
  testID,
}: CardDescriptionProps) {
  const { fontSizeClasses } = useAccessibilityClasses();
  const { settings } = useCognitiveSettings();

  const textContrastClasses = useMemo(
    () => getTextContrastClasses(settings.contrast, 'secondary'),
    [settings.contrast]
  );

  const descriptionClasses = `mt-1 ${fontSizeClasses.sm} ${textContrastClasses} ${className}`;

  return (
    <Text className={descriptionClasses} testID={testID}>
      {children}
    </Text>
  );
}

CardDescription.displayName = 'Card.Description';

/**
 * Card.Content - Content subcomponent
 */
export interface CardContentProps {
  children: ReactNode;
  className?: string;
  testID?: string;
}

function CardContent({
  children,
  className = '',
  testID,
}: CardContentProps) {
  const { spacingClasses } = useAccessibilityClasses();

  const contentClasses = `flex flex-col ${spacingClasses.gap} ${className}`;

  return (
    <View className={contentClasses} testID={testID}>
      {children}
    </View>
  );
}

CardContent.displayName = 'Card.Content';

// Compose Card with subcomponents
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
});

export default Card;
