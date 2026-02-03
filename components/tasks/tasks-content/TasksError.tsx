import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { styles } from './tasks-content-styles';

/**
 * TasksError Component - MindEase Mobile
 * Error message display for tasks page
 */
export interface TasksErrorProps {
  /** Error message to display */
  message: string;

  /** Test ID for testing */
  testID?: string;
}

export function TasksError({ message, testID }: TasksErrorProps) {
  const { fontSizeClasses } = useAccessibilityClasses();

  const errorClasses = useMemo(() => `${styles.error} ${fontSizeClasses.sm}`, [fontSizeClasses.sm]);

  return (
    <View className={errorClasses} accessibilityRole="alert" testID={testID || 'tasks-error'}>
      <Text className={styles.errorText}>{message}</Text>
    </View>
  );
}

TasksError.displayName = 'TasksError';
