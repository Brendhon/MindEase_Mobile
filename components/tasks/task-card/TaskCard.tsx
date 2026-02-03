import { Card } from '@/components/ui/card';
import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import { useTaskCard } from '@/hooks/tasks/useTaskCard';
import { Task } from '@/models/task';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { TaskChecklist } from '../task-checklist';
import { TaskCardActions } from './TaskCardActions';
import { TaskCardTimer } from './TaskCardTimer';
import { styles } from './task-card-styles';

/**
 * TaskCard Component - MindEase Mobile
 * Individual task card with title, status, description, subtask checklist (like web),
 * focus/break timer when in focus or on break, and action buttons.
 * All business logic is provided by useTaskCard hook.
 */
export interface TaskCardProps {
  /** Task data */
  task: Task;

  /** Callback when Edit is pressed */
  onEdit?: (task: Task) => void;

  /** Callback when Delete is pressed */
  onDelete?: (taskId: string) => void;

  /** Callback when task moves to another column (for scroll-into-view) */
  onTaskMovedToColumn?: (newStatus: number) => void;

  /** Test ID for testing */
  testID?: string;
}

export function TaskCard({ task, onEdit, onDelete, onTaskMovedToColumn, testID }: TaskCardProps) {
  const {
    cardClasses,
    isRunning,
    hasActiveTask,
    isBreakRunning,
    isFocused,
    isChecklistInteractive,
    handleStartFocus,
    handleStop,
    handleComplete,
    handleEdit,
    handleDelete,
    handleToggleSubtask,
  } = useTaskCard({
    task,
    onEdit,
    onDelete,
    onTaskMovedToColumn,
    testId: testID,
  });

  const { getText } = useTextDetail();
  const { fontSizeClasses } = useAccessibilityClasses();

  const statusLabel = useMemo(() => {
    switch (task.status) {
      case 0:
        return getText('tasks_status_todo');
      case 1:
        return getText('tasks_status_in_progress');
      default:
        return getText('tasks_status_done');
    }
  }, [task.status, getText]);

  const statusBadgeClasses = useMemo(() => {
    const base = `${styles.status} ${fontSizeClasses.sm}`;
    if (task.status === 0) return `${base} ${styles.statusTodo}`;
    if (task.status === 1) return `${base} ${styles.statusInProgress}`;
    return `${base} ${styles.statusDone}`;
  }, [task.status, fontSizeClasses.sm]);

  const completedSubtasks = task.subtasks?.filter((s) => s.completed).length ?? 0;
  const totalSubtasks = task.subtasks?.length ?? 0;
  const hasSubtasks = totalSubtasks > 0;

  const accessibilityLabel = useMemo(
    () =>
      `${task.title}, ${statusLabel}${hasSubtasks ? `, ${completedSubtasks} ${getText('tasks_progress')} ${totalSubtasks} ${getText('tasks_progress_steps')}` : ''}`,
    [task.title, statusLabel, hasSubtasks, completedSubtasks, totalSubtasks, getText]
  );

  const showActions = task.status !== 2;
  const hasAnyAction = Boolean(
    handleStartFocus || handleStop || handleComplete || handleEdit || handleDelete
  );
  const showContent =
    true &&
    (isRunning ||
      isBreakRunning ||
      (task.subtasks && task.subtasks.length > 0) ||
      (showActions && hasAnyAction));

  return (
    <View
      className="w-full"
      accessibilityRole="summary"
      accessibilityLabel={accessibilityLabel}
      importantForAccessibility="yes">
      <Card className={cardClasses} focused={isFocused} testID={testID || `task-card-${task.id}`}>
        <Card.Header>
          <View className={styles.headerRow}>
            <Text className={`${styles.title} ${fontSizeClasses.base}`} numberOfLines={2}>
              {task.title}
            </Text>
            <Text
              className={statusBadgeClasses}
              testID={testID ? `${testID}-status` : `task-card-status-${task.id}`}>
              {statusLabel}
            </Text>
          </View>
          {task.description ? (
            <Text className={`${styles.description} ${fontSizeClasses.sm}`} numberOfLines={2}>
              {task.description}
            </Text>
          ) : null}
        </Card.Header>
        {showContent ? (
          <Card.Content>
            <TaskCardTimer task={task} testID={testID} />
            {task.subtasks && task.subtasks.length > 0 && (
              <TaskChecklist
                subtasks={task.subtasks}
                onToggleSubtask={showActions ? handleToggleSubtask : undefined}
                interactive={isChecklistInteractive}
                isInFocus={isChecklistInteractive}
                testID={testID ? `${testID}-checklist` : `task-card-checklist-${task.id}`}
              />
            )}
            {showActions && hasAnyAction ? (
              <TaskCardActions
                task={task}
                isRunning={isRunning}
                hasActiveTask={hasActiveTask}
                isBreakRunning={isBreakRunning}
                onStartFocus={handleStartFocus}
                onStop={handleStop}
                onComplete={handleComplete}
                onEdit={handleEdit}
                onDelete={handleDelete}
                testID={testID}
              />
            ) : null}
          </Card.Content>
        ) : null}
      </Card>
    </View>
  );
}

TaskCard.displayName = 'TaskCard';
