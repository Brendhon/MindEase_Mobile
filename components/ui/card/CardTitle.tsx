import { useAccessibilityClasses } from '@/hooks/accessibility';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import { getTextContrastClasses } from '@/utils/accessibility';
import React, { ReactNode, useMemo } from 'react';
import { Text } from 'react-native';
import { styles } from './card-styles';

/**
 * Card.Title - Title subcomponent
 * Use this for consistent title styling with fontSize preference
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <Card.Title>My Title</Card.Title>
 *   </Card.Header>
 * </Card>
 * ```
 */
export interface CardTitleProps {
  children: ReactNode;
  className?: string;
  testID?: string;
}

export function CardTitle({
  children,
  className = '',
  testID,
}: CardTitleProps) {
  const { settings } = useCognitiveSettings();
  const { fontSizeClasses } = useAccessibilityClasses();

  const textContrastClasses = useMemo(
    () => getTextContrastClasses(settings.contrast, 'primary'),
    [settings.contrast]
  );

  const titleClasses = useMemo(
    () =>
      `${styles.title} ${fontSizeClasses.lg} ${textContrastClasses} ${className}`,
    [fontSizeClasses.lg, textContrastClasses, className]
  );

  return (
    <Text className={titleClasses} testID={testID}>
      {children}
    </Text>
  );
}

CardTitle.displayName = 'Card.Title';
