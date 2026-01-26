import { useAccessibilityClasses } from '@/hooks/accessibility';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import { getBorderContrastClasses } from '@/utils/accessibility';
import React, { ReactNode, useMemo } from 'react';
import { View } from 'react-native';
import { styles } from './card-styles';

/**
 * Card.Header - Header subcomponent
 * Use this for consistent header styling within cards
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Title</Card.Title>
 *   </Card.Header>
 * </Card>
 * ```
 */
export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
  testID?: string;
}

export function CardHeader({
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

  const headerClasses = useMemo(
    () =>
      `${styles.header} ${spacingClasses.gap} ${borderClasses} ${className}`,
    [spacingClasses.gap, borderClasses, className]
  );

  return (
    <View className={headerClasses} testID={testID}>
      {children}
    </View>
  );
}

CardHeader.displayName = 'Card.Header';
