import { Button } from '@/components/ui/button';
import { useTextDetail } from '@/hooks/accessibility';
import { Plus } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { styles } from './tasks-content-styles';

/**
 * TasksToolbar Component - MindEase Mobile
 * Toolbar with "New Task" button (demo: mock action)
 */
export interface TasksToolbarProps {
  /** Callback when "New Task" button is clicked */
  onNewTask: () => void;

  /** Test ID for testing */
  testID?: string;
}

export function TasksToolbar({ onNewTask, testID }: TasksToolbarProps) {
  const { getText } = useTextDetail();

  return (
    <View className={styles.toolbarContainer} testID={testID || 'tasks-toolbar'}>
      <Button
        variant="primary"
        size="md"
        onPress={onNewTask}
        accessibilityLabel={getText('tasks_new_aria')}
        accessibilityHint={getText('tasks_new_aria')}
        testID={testID ? `${testID}-new-button` : 'tasks-toolbar-new-button'}>
        <Button.Icon icon={Plus} position="left" />
        <Button.Text>{getText('tasks_new')}</Button.Text>
      </Button>
    </View>
  );
}

TasksToolbar.displayName = 'TasksToolbar';
