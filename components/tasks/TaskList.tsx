import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import { Task } from '@/models/task';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { TaskColumn } from './TaskColumn';
import { styles } from './tasks-styles';

/**
 * TaskList Component - MindEase Mobile
 * Vertical layout: empty state or 3 column sections (A Fazer, Em Progresso, Concluídas).
 */
export interface TaskListProps {
  /** Tasks to display */
  tasks: Task[];

  /** Callback when Start focus is pressed (demo: mock) */
  onStartFocus?: (task: Task) => void;

  /** Callback when Stop focus is pressed (demo: mock) */
  onStop?: (task: Task) => void;

  /** Callback when Complete task is pressed (demo: mock) */
  onComplete?: (task: Task) => void;

  /** Callback when task Edit is pressed (demo: mock) */
  onEdit?: (task: Task) => void;

  /** Callback when task Delete is pressed (demo: mock) */
  onDelete?: (taskId: string) => void;

  /** Test ID for testing */
  testID?: string;
}

export function TaskList({
  tasks,
  onStartFocus,
  onStop,
  onComplete,
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
      <View
        className={emptyContainerClasses}
        testID={`${listTestID}-empty`}
      >
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
        onStartFocus={onStartFocus}
        onStop={onStop}
        onComplete={onComplete}
        onEdit={onEdit}
        onDelete={onDelete}
        testID={`${listTestID}-todo`}
      />
      <TaskColumn
        titleKey="tasks_column_in_progress"
        tasks={tasks}
        status={1}
        onStartFocus={onStartFocus}
        onStop={onStop}
        onComplete={onComplete}
        onEdit={onEdit}
        onDelete={onDelete}
        testID={`${listTestID}-in-progress`}
      />
      <TaskColumn
        titleKey="tasks_column_done"
        tasks={tasks}
        status={2}
        onStartFocus={onStartFocus}
        onStop={onStop}
        onComplete={onComplete}
        onEdit={onEdit}
        onDelete={onDelete}
        testID={`${listTestID}-done`}
      />
    </View>
  );
}

TaskList.displayName = 'TaskList';
