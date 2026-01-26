import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import type { AccessibilityTextKey } from '@/utils/accessibility';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

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
    () => `flex flex-col gap-1.5 ${spacingClasses.gap} ${className}`,
    [spacingClasses.gap, className]
  );

  const labelClasses = useMemo(
    () => `text-text-secondary font-medium text-sm ${fontSizeClasses.sm} ${labelClassName}`,
    [fontSizeClasses.sm, labelClassName]
  );

  const valueClasses = useMemo(
    () => `text-text-primary font-normal break-words ${fontSizeClasses.base} ${valueClassName}`,
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
