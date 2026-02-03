import { useAccessibilityClasses } from '@/hooks/accessibility';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import { getTextContrastClasses } from '@/utils/accessibility';
import React, { ReactNode, useMemo } from 'react';
import { Text } from 'react-native';
import { styles } from './card-styles';

/**
 * Card.Description - Description subcomponent
 * Use this for consistent description styling with fontSize preference
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Title</Card.Title>
 *     <Card.Description>Description text</Card.Description>
 *   </Card.Header>
 * </Card>
 * ```
 */
export interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
  testID?: string;
}

export function CardDescription({ children, className = '', testID }: CardDescriptionProps) {
  const { fontSizeClasses } = useAccessibilityClasses();
  const { settings } = useCognitiveSettings();

  const textContrastClasses = useMemo(
    () => getTextContrastClasses(settings.contrast, 'secondary'),
    [settings.contrast]
  );

  const descriptionClasses = useMemo(
    () => `${styles.description} ${fontSizeClasses.sm} ${textContrastClasses} ${className}`,
    [fontSizeClasses.sm, textContrastClasses, className]
  );

  return (
    <Text className={descriptionClasses} testID={testID}>
      {children}
    </Text>
  );
}

CardDescription.displayName = 'Card.Description';
