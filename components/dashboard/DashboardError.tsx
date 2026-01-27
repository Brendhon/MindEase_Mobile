import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { styles } from './dashboard-styles';

/**
 * DashboardError Component - MindEase Mobile
 * Error message display for dashboard page
 */
export interface DashboardErrorProps {
  /** Error message to display */
  message: string;

  /** Test ID for testing */
  testID?: string;
}

export function DashboardError({
  message,
  testID,
}: DashboardErrorProps) {
  const { fontSizeClasses } = useAccessibilityClasses();

  // Generate error classes with fontSize preference
  const errorClasses = useMemo(
    () => `${styles.error} ${fontSizeClasses.sm}`,
    [fontSizeClasses.sm]
  );

  return (
    <View
      className={errorClasses}
      accessibilityRole="alert"
      testID={testID || 'dashboard-error'}
    >
      <Text className={styles.dashboardErrorText}>{message}</Text>
    </View>
  );
}

DashboardError.displayName = 'DashboardError';
