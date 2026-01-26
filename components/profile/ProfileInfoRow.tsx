import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import type { AccessibilityTextKey } from '@/utils/accessibility';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { styles } from './profile-styles';

/**
 * ProfileInfoRow Component - MindEase Mobile
 * Displays a label-value pair for user information
 */
export interface ProfileInfoRowProps {
  /** Label key from accessibility-texts.json */
  labelKey: AccessibilityTextKey;

  /** Value text */
  value: string;

  /** Label CSS classes */
  labelClassName?: string;

  /** Value CSS classes */
  valueClassName?: string;

  /** Additional CSS classes */
  className?: string;

  /** Test ID for testing */
  testID?: string;
}

export function ProfileInfoRow({
  labelKey,
  value,
  labelClassName = '',
  valueClassName = '',
  className = '',
  testID,
}: ProfileInfoRowProps) {
  const { getText } = useTextDetail();
  const { fontSizeClasses, spacingClasses, animationsEnabled } =
    useAccessibilityClasses();

  // Generate accessible classes with memoization
  const rowClasses = useMemo(
    () => `${styles.infoRow} ${spacingClasses.gap} ${className}`,
    [spacingClasses.gap, className]
  );

  const labelClasses = useMemo(
    () => `${styles.label} ${fontSizeClasses.sm} ${labelClassName}`,
    [fontSizeClasses.sm, labelClassName]
  );

  const valueClasses = useMemo(
    () => `${styles.value} ${fontSizeClasses.base} ${valueClassName}`,
    [fontSizeClasses.base, valueClassName]
  );

  return (
    <View className={rowClasses} testID={testID}>
      <Text className={labelClasses}>{getText(labelKey)}</Text>
      <Text className={valueClasses}>{value}</Text>
    </View>
  );
}

ProfileInfoRow.displayName = 'ProfileInfoRow';
