import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { styles } from './tasks-content-styles';

/**
 * TasksLoading Component - MindEase Mobile
 * Loading state for tasks page
 */
export interface TasksLoadingProps {
  /** Test ID for testing */
  testID?: string;
}

export function TasksLoading({ testID }: TasksLoadingProps) {
  const { fontSizeClasses } = useAccessibilityClasses();
  const { getText } = useTextDetail();

  const containerClasses = useMemo(
    () => `${styles.loadingContainer} ${fontSizeClasses.base}`,
    [fontSizeClasses.base]
  );

  return (
    <View
      className={containerClasses}
      accessibilityRole="progressbar"
      accessibilityLabel={getText('tasks_loading')}
      testID={testID || 'tasks-loading'}
    >
      <Text className={styles.loadingText}>{getText('tasks_loading')}</Text>
    </View>
  );
}

TasksLoading.displayName = 'TasksLoading';
