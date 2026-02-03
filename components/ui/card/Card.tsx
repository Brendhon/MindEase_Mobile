import { useAccessibilityClasses } from '@/hooks/accessibility';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import {
  getBorderContrastClasses,
  getFocusModeClasses,
} from '@/utils/accessibility';
import React, { ReactNode, useMemo } from 'react';
import { View } from 'react-native';
import { CardContent } from './CardContent';
import { CardDescription } from './CardDescription';
import { CardHeader } from './CardHeader';
import { styles } from './card-styles';
import { CardTitle } from './CardTitle';

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
 *
 * @example
 * ```tsx
 * <Card focused={isActive}>
 *   <Card.Content>Focused card content</Card.Content>
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
  const { spacingClasses, contrastClasses } =
    useAccessibilityClasses();

  const borderClasses = useMemo(
    () =>
      focused
        ? ''
        : getBorderContrastClasses(settings.contrast, 'subtle'),
    [settings.contrast, focused]
  );

  // Only apply focus mode classes when this specific card is focused
  const focusModeClasses = useMemo(
    () => getFocusModeClasses(focused),
    [focused]
  );

  const cardClasses = useMemo(
    () =>
      [
        styles.base,
        spacingClasses.padding,
        spacingClasses.gap,
        contrastClasses,
        borderClasses,
        focusModeClasses,
        className,
      ]
        .filter(Boolean)
        .join(' '),
    [
      spacingClasses.padding,
      spacingClasses.gap,
      contrastClasses,
      borderClasses,
      focusModeClasses,
      className,
    ]
  );

  return (
    <View className={cardClasses} testID={testID}>
      {children}
    </View>
  );
};

CardRoot.displayName = 'Card';

// Compose Card with subcomponents
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
});

export default Card;
