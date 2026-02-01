import { Button } from '@/components/ui/button';
import { useTextDetail } from '@/hooks/accessibility';
import { Task } from '@/models/task';
import { Check, Play, Square } from 'lucide-react-native';
import React from 'react';
import { styles } from './tasks-styles';

/**
 * TaskCardFocusActions - MindEase Mobile
 * Focus-related buttons: Start focus, Stop, Complete.
 * Same layout as web: break → Stop only; running → Stop + Complete; else → Start (disabled if hasActiveTask).
 */
export interface TaskCardFocusActionsProps {
  task: Task;
  isRunning?: boolean;
  hasActiveTask?: boolean;
  isBreakRunning?: boolean;
  onStartFocus?: (task: Task) => void;
  onStop?: (task: Task) => void;
  onComplete?: (task: Task) => void;
  testID?: string;
}

export function TaskCardFocusActions({
  task,
  isRunning = false,
  hasActiveTask = false,
  isBreakRunning = false,
  onStartFocus,
  onStop,
  onComplete,
  testID,
}: TaskCardFocusActionsProps) {
  const { getText } = useTextDetail();

  const hasFocusActions = Boolean(onStartFocus ?? onStop ?? onComplete);
  if (!hasFocusActions) return null;

  if (isBreakRunning && onStop) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={styles.actionButton}
        onPress={() => onStop(task)}
        accessibilityLabel={getText('tasks_action_stop_aria')}
        accessibilityRole="button"
        testID={testID ? `${testID}-stop-break` : `task-card-stop-break-${task.id}`}
      >
        <Button.Icon icon={Square} position="left" variant="ghost" />
        <Button.Text variant="ghost">{getText('tasks_action_stop')}</Button.Text>
      </Button>
    );
  }

  if (isRunning) {
    return (
      <>
        {onStop ? (
          <Button
            variant="ghost"
            size="sm"
            className={styles.actionButton}
            onPress={() => onStop(task)}
            accessibilityLabel={getText('tasks_action_stop_aria')}
            accessibilityRole="button"
            testID={testID ? `${testID}-stop` : `task-card-stop-${task.id}`}
          >
            <Button.Icon icon={Square} position="left" variant="ghost" />
            <Button.Text variant="ghost">{getText('tasks_action_stop')}</Button.Text>
          </Button>
        ) : null}
        {onComplete ? (
          <Button
            variant="primary"
            size="sm"
            className={styles.actionButton}
            onPress={() => onComplete(task)}
            accessibilityLabel={getText('tasks_action_finish_aria')}
            accessibilityRole="button"
            testID={testID ? `${testID}-complete` : `task-card-complete-${task.id}`}
          >
            <Button.Icon icon={Check} position="left" variant="primary" />
            <Button.Text>{getText('tasks_action_finish')}</Button.Text>
          </Button>
        ) : null}
      </>
    );
  }

  if (onStartFocus) {
    return (
      <Button
        variant="primary"
        size="sm"
        className={styles.actionButton}
        onPress={() => onStartFocus(task)}
        disabled={hasActiveTask}
        accessibilityLabel={getText('tasks_action_start_focus_aria')}
        accessibilityRole="button"
        testID={testID ? `${testID}-start-focus` : `task-card-start-focus-${task.id}`}
      >
        <Button.Icon icon={Play} position="left" variant="primary" />
        <Button.Text>{getText('tasks_action_start_focus')}</Button.Text>
      </Button>
    );
  }

  return null;
}

TaskCardFocusActions.displayName = 'TaskCardFocusActions';
