import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import { Task } from '@/models/task';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { TaskColumn } from '../task-column';
import { styles } from './task-list-styles';

/**
 * TaskList Component - MindEase Mobile
 * Vertical layout: empty state or 3 column sections (A Fazer, Em Progresso, Concluídas).
 * Each TaskCard uses useTaskCard for focus/stop/complete/toggle logic.
 */
export interface TaskListProps {
  /** Tasks to display */
  tasks: Task[];

  /** Callback when a column has layout (index 0|1|2, layout); used for scroll-into-view */
  onColumnLayout?: (index: 0 | 1 | 2, layout: { y: number; height: number }) => void;

  /** Callback to scroll to a column when a task moves */
  onScrollToColumn?: (status: number) => void;

  /** Callback when task Edit is pressed (e.g. demo) */
  onEdit?: (task: Task) => void;

  /** Callback when task Delete is confirmed */
  onDelete?: (taskId: string) => void;

  /** Test ID for testing */
  testID?: string;
}

export function TaskList({
  tasks,
  onColumnLayout,
  onScrollToColumn,
  onEdit,
  onDelete,
  testID,
}: TaskListProps) {
  const { getText } = useTextDetail();
  const { fontSizeClasses, spacingClasses } = useAccessibilityClasses();

  const containerClasses = useMemo(
    () => `${styles.listContainer} ${spacingClasses.gap}`,
    [spacingClasses.gap]
  );

  const emptyContainerClasses = useMemo(
    () => `${styles.emptyContainer} ${spacingClasses.gap}`,
    [spacingClasses.gap]
  );

  const emptyTextClasses = useMemo(
    () => `${styles.emptyText} ${fontSizeClasses.base}`,
    [fontSizeClasses.base]
  );

  const emptyDescClasses = useMemo(
    () => `${styles.emptyDescription} ${fontSizeClasses.sm}`,
    [fontSizeClasses.sm]
  );

  const hasTasks = tasks.length > 0;
  const listTestID = testID || 'task-list';

  if (!hasTasks) {
    return (
      <View className={emptyContainerClasses} testID={`${listTestID}-empty`}>
        <Text className={emptyTextClasses}>{getText('tasks_empty')}</Text>
        <Text className={emptyDescClasses}>{getText('tasks_empty_desc')}</Text>
      </View>
    );
  }

  return (
    <View className={containerClasses} testID={listTestID}>
      <TaskColumn
        titleKey="tasks_column_todo"
        tasks={tasks}
        status={0}
        onColumnLayout={onColumnLayout}
        onEdit={onEdit}
        onDelete={onDelete}
        onScrollToColumn={onScrollToColumn}
        testID={`${listTestID}-todo`}
      />
      <TaskColumn
        titleKey="tasks_column_in_progress"
        tasks={tasks}
        status={1}
        onColumnLayout={onColumnLayout}
        onEdit={onEdit}
        onDelete={onDelete}
        onScrollToColumn={onScrollToColumn}
        testID={`${listTestID}-in-progress`}
      />
      <TaskColumn
        titleKey="tasks_column_done"
        tasks={tasks}
        status={2}
        onColumnLayout={onColumnLayout}
        onEdit={onEdit}
        onDelete={onDelete}
        onScrollToColumn={onScrollToColumn}
        testID={`${listTestID}-done`}
      />
    </View>
  );
}

TaskList.displayName = 'TaskList';
