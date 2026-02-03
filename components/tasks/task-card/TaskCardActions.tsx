import { useAccessibilityClasses } from '@/hooks/accessibility';
import { Task } from '@/models/task';
import React from 'react';
import { View } from 'react-native';
import { TaskCardEditActions } from './TaskCardEditActions';
import { TaskCardFocusActions } from './TaskCardFocusActions';
import { styles } from './task-card-styles';

/**
 * TaskCardActions - MindEase Mobile
 * Container for all task action buttons: focus actions + edit actions.
 * Edit actions are hidden during focus or break (same logic as web).
 * Callbacks are parameterless (task is in closure from useTaskCard).
 */
export interface TaskCardActionsProps {
  task: Task;
  isRunning?: boolean;
  hasActiveTask?: boolean;
  isBreakRunning?: boolean;
  onStartFocus?: () => void;
  onStop?: () => void;
  onComplete?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  testID?: string;
}

export function TaskCardActions({
  task,
  isRunning = false,
  hasActiveTask = false,
  isBreakRunning = false,
  onStartFocus,
  onStop,
  onComplete,
  onEdit,
  onDelete,
  testID,
}: TaskCardActionsProps) {
  const { spacingClasses } = useAccessibilityClasses();

  if (task.status === 2) {
    return null;
  }

  const hasFocusActions = Boolean(onStartFocus ?? onStop ?? onComplete);
  const showEditActions = (onEdit || onDelete) && !isRunning && !isBreakRunning;

  if (!hasFocusActions && !showEditActions) {
    return null;
  }

  return (
    <View className={`${styles.actions} ${spacingClasses.gap}`}>
      <TaskCardFocusActions
        task={task}
        isRunning={isRunning}
        hasActiveTask={hasActiveTask}
        isBreakRunning={isBreakRunning}
        onStartFocus={onStartFocus}
        onStop={onStop}
        onComplete={onComplete}
        testID={testID}
      />
      {showEditActions ? (
        <TaskCardEditActions task={task} onEdit={onEdit} onDelete={onDelete} testID={testID} />
      ) : null}
    </View>
  );
}

TaskCardActions.displayName = 'TaskCardActions';
