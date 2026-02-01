import { useAccessibilityClasses } from '@/hooks/accessibility';
import { useTextDetail } from '@/hooks/accessibility';
import { Task } from '@/models/task';
import type { AccessibilityTextKey } from '@/utils/accessibility';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { TaskCard } from './TaskCard';
import { styles } from './tasks-styles';

/**
 * TaskColumn Component - MindEase Mobile
 * Single column section: header (title + count) and vertical list of TaskCards.
 */
export interface TaskColumnProps {
  /** Column title key */
  titleKey: AccessibilityTextKey;

  /** Tasks to display in this column */
  tasks: Task[];

  /** Column status filter (0 = To Do, 1 = In Progress, 2 = Done) */
  status: number;

  /** Callback when task Edit is pressed (demo: mock) */
  onEdit?: (task: Task) => void;

  /** Callback when task Delete is pressed (demo: mock) */
  onDelete?: (taskId: string) => void;

  /** Test ID for testing */
  testID?: string;
}

export function TaskColumn({
  titleKey,
  tasks,
  status,
  onEdit,
  onDelete,
  testID,
}: TaskColumnProps) {
  const { getText } = useTextDetail();
  const { fontSizeClasses, spacingClasses } = useAccessibilityClasses();

  const sortedTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => task.status === status)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
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
    () => `${getText(titleKey)}, ${sortedTasks.length} ${getText('tasks_count_aria')}`,
    [getText, titleKey, sortedTasks.length]
  );

  const columnTestID = testID || `task-column-${status}`;

  return (
    <View
      className={styles.column}
      testID={columnTestID}
      accessibilityRole="summary"
      accessibilityLabel={columnLabel}
    >
      <View className={columnHeaderClasses}>
        <Text className={columnTitleClasses}>{getText(titleKey)}</Text>
        <Text
          className={columnCountClasses}
          accessibilityLabel={`${sortedTasks.length} ${getText('tasks_count_aria')}`}
        >
          {sortedTasks.length}
        </Text>
      </View>
      <View className={columnContentClasses}>
        {sortedTasks.length === 0 ? (
          <View
            className={styles.columnEmpty}
            testID={`${columnTestID}-empty`}
          >
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
              testID={`${columnTestID}-item-${task.id}`}
            />
          ))
        )}
      </View>
    </View>
  );
}

TaskColumn.displayName = 'TaskColumn';
