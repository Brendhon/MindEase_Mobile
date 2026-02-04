import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import { Task } from '@/models/task';
import type { AccessibilityTextKey } from '@/utils/accessibility';
import React, { forwardRef, useMemo } from 'react';
import { Text, View } from 'react-native';
import { TaskCard } from '../task-card';
import { styles } from './task-column-styles';

/**
 * TaskColumn Component - MindEase Mobile
 * Single column section: header (title + count) and vertical list of TaskCards.
 * Each TaskCard uses useTaskCard for all focus/stop/complete/toggle logic.
 */
export interface TaskColumnProps {
  /** Column title key */
  titleKey: AccessibilityTextKey;

  /** Tasks to display in this column */
  tasks: Task[];

  /** Column status filter (0 = To Do, 1 = In Progress, 2 = Done) */
  status: number;

  /** Callback when task Edit is pressed */
  onEdit?: (task: Task) => void;

  /** Callback when task Delete is confirmed */
  onDelete?: (taskId: string) => void;

  /** Callback when this column has layout (index 0|1|2, layout); used for scroll-into-view */
  onColumnLayout?: (index: 0 | 1 | 2, layout: { y: number; height: number }) => void;

  /** Callback when a task moves to another column (for scroll-into-view) */
  onScrollToColumn?: (status: number) => void;

  /** Test ID for testing */
  testID?: string;
}

export const TaskColumn = forwardRef<View, TaskColumnProps>(function TaskColumn(
  { titleKey, tasks, status, onEdit, onDelete, onColumnLayout, onScrollToColumn, testID },
  ref
) {
  const { getText } = useTextDetail();
  const { fontSizeClasses, spacingClasses } = useAccessibilityClasses();

  const sortedTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => task.status === status)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [tasks, status]);

  const columnHeaderClasses = useMemo(
    () => `${styles.columnHeader} ${spacingClasses.padding}`,
    [spacingClasses.padding]
  );

  const columnTitleClasses = useMemo(
    () => `${styles.columnTitle} ${fontSizeClasses.base}`,
    [fontSizeClasses.base]
  );

  const columnCountClasses = useMemo(
    () => `${styles.columnCount} ${fontSizeClasses.sm}`,
    [fontSizeClasses.sm]
  );

  const columnContentClasses = useMemo(
    () => `${styles.columnContent} ${spacingClasses.gap}`,
    [spacingClasses.gap]
  );

  const columnLabel = useMemo(
    () => `${getText(titleKey)}, ${sortedTasks.length} ${getText('tasks_count_caption')}`,
    [getText, titleKey, sortedTasks.length]
  );

  const columnTestID = testID || `task-column-${status}`;

  const handleLayout = useMemo(
    () =>
      onColumnLayout && status >= 0 && status <= 2
        ? (e: { nativeEvent: { layout: { y: number; height: number } } }) =>
            onColumnLayout(status as 0 | 1 | 2, e.nativeEvent.layout)
        : undefined,
    [onColumnLayout, status]
  );

  return (
    <View
      ref={ref}
      className={styles.column}
      testID={columnTestID}
      accessibilityRole="summary"
      accessibilityLabel={columnLabel}
      onLayout={handleLayout}>
      <View className={columnHeaderClasses}>
        <Text className={columnTitleClasses}>{getText(titleKey)}</Text>
        <Text
          className={columnCountClasses}
          accessibilityLabel={`${sortedTasks.length} ${getText('tasks_count_caption')}`}>
          {sortedTasks.length} {getText('tasks_count_caption')}
        </Text>
      </View>
      <View className={columnContentClasses}>
        {sortedTasks.length === 0 ? (
          <View className={styles.columnEmpty} testID={`${columnTestID}-empty`}>
            <Text className={`${styles.columnEmptyText} ${fontSizeClasses.sm}`}>
              {getText('tasks_empty')}
            </Text>
          </View>
        ) : (
          sortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onTaskMovedToColumn={onScrollToColumn}
              testID={`${columnTestID}-item-${task.id}`}
            />
          ))
        )}
      </View>
    </View>
  );
});

TaskColumn.displayName = 'TaskColumn';
