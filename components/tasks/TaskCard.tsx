import { Card } from '@/components/ui/card';
import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import { Task } from '@/models/task';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { TaskCardActions } from './TaskCardActions';
import { TaskCardTimer } from './TaskCardTimer';
import { TaskChecklist } from './TaskChecklist';
import { styles } from './tasks-styles';

/**
 * TaskCard Component - MindEase Mobile
 * Individual task card with title, status, description, subtask checklist (like web),
 * focus/break timer when in focus or on break, and action buttons.
 */
export interface TaskCardProps {
  /** Task data */
  task: Task;

  /** Callback when Start focus is pressed */
  onStartFocus?: (task: Task) => void;

  /** Callback when Stop focus is pressed */
  onStop?: (task: Task) => void;

  /** Callback when Complete task is pressed */
  onComplete?: (task: Task) => void;

  /** Callback when Edit is pressed */
  onEdit?: (task: Task) => void;

  /** Callback when Delete is pressed */
  onDelete?: (taskId: string) => void;

  /** Callback when subtask is toggled (subtaskId); when not in focus, parent may show focus-required alert */
  onToggleSubtask?: (subtaskId: string) => void;

  /** Whether this task's focus timer is running (hides edit, shows Stop + Complete; enables checklist) */
  isRunning?: boolean;

  /** Whether another task is active (disables Start focus) */
  hasActiveTask?: boolean;

  /** Whether break is running for this task (shows only Stop) */
  isBreakRunning?: boolean;

  /** Test ID for testing */
  testID?: string;
}

export function TaskCard({
  task,
  onStartFocus,
  onStop,
  onComplete,
  onEdit,
  onDelete,
  onToggleSubtask,
  isRunning = false,
  hasActiveTask = false,
  isBreakRunning = false,
  testID,
}: TaskCardProps) {
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

  const cardClasses = useMemo(
    () => (task.status === 2 ? `${styles.card} ${styles.cardDone}` : styles.card),
    [task.status]
  );

  const accessibilityLabel = useMemo(
    () => `${task.title}, ${statusLabel}${hasSubtasks ? `, ${completedSubtasks} ${getText('tasks_progress')} ${totalSubtasks} ${getText('tasks_progress_steps')}` : ''}`,
    [task.title, statusLabel, hasSubtasks, completedSubtasks, totalSubtasks, getText]
  );

  const showActions = task.status !== 2;
  const hasAnyAction = Boolean(onStartFocus ?? onStop ?? onComplete ?? onEdit ?? onDelete);
  const isChecklistInteractive = isRunning;
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
      importantForAccessibility="yes"
    >
      <Card
        className={cardClasses}
        focused={false}
        testID={testID || `task-card-${task.id}`}
      >
        <Card.Header>
          <View className={styles.headerRow}>
            <Text
              className={`${styles.title} ${fontSizeClasses.base}`}
              numberOfLines={2}
            >
              {task.title}
            </Text>
            <Text
              className={statusBadgeClasses}
              testID={testID ? `${testID}-status` : `task-card-status-${task.id}`}
            >
              {statusLabel}
            </Text>
          </View>
          {task.description ? (
            <Text
              className={`${styles.description} ${fontSizeClasses.sm}`}
              numberOfLines={2}
            >
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
                onToggleSubtask={showActions ? onToggleSubtask : undefined}
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
                onStartFocus={onStartFocus}
                onStop={onStop}
                onComplete={onComplete}
                onEdit={onEdit}
                onDelete={onDelete}
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
