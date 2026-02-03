import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { ReactNode, useMemo } from 'react';
import { View } from 'react-native';
import { styles } from './card-styles';

/**
 * Card.Content - Content subcomponent
 * Use this for consistent content area styling with spacing preference
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Content>
 *     Content here
 *   </Card.Content>
 * </Card>
 * ```
 */
export interface CardContentProps {
  children: ReactNode;
  className?: string;
  testID?: string;
}

export function CardContent({ children, className = '', testID }: CardContentProps) {
  const { spacingClasses } = useAccessibilityClasses();

  const contentClasses = useMemo(
    () => `${styles.content} ${spacingClasses.gap} ${className}`,
    [spacingClasses.gap, className]
  );

  return (
    <View className={contentClasses} testID={testID}>
      {children}
    </View>
  );
}

CardContent.displayName = 'Card.Content';
