import { useAccessibilityClasses } from '@/hooks/accessibility';
import { useTextDetail } from '@/hooks/accessibility';
import { useBreakTimer, useFocusTimer } from '@/hooks/timer';
import { Task } from '@/models/task';
import { formatTime } from '@/utils/timer/timer-helpers';
import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './task-card-styles';

/**
 * TaskCardTimer Component - MindEase Mobile
 * Displays timer indicator when focus session is active or break timer is running.
 * Mirrors web task-card-timer logic: show focus timer when task is in focus,
 * show break timer when break is running for this task.
 */
export interface TaskCardTimerProps {
  /** Task to show timer for */
  task: Task;
  /** Test ID for testing */
  testID?: string;
}

export function TaskCardTimer({ task, testID }: TaskCardTimerProps) {
  const { id } = task;
  const { fontSizeClasses } = useAccessibilityClasses();
  const { getText } = useTextDetail();
  const { remainingTime: focusRemainingTime, isRunning: isFocusRunning } =
    useFocusTimer();
  const { remainingTime: breakRemainingTime, isRunning: isBreakRunning } =
    useBreakTimer();

  if (isFocusRunning(id)) {
    return (
      <View
        className={`${styles.timerIndicator} ${styles.focusTimer}`}
        testID={testID || `task-card-timer-${id}`}
      >
        <Text className={`${styles.timerLabel} ${fontSizeClasses.sm}`}>
          {getText('tasks_focus_time_remaining')}:
        </Text>
        <Text
          className={`${styles.timerValue} ${styles.focusTimerValue} ${fontSizeClasses.base}`}
        >
          {formatTime(focusRemainingTime)}
        </Text>
        <Text className={`${styles.timerStatus} ${fontSizeClasses.sm}`}>
          {getText('tasks_focus_session_active')}
        </Text>
      </View>
    );
  }

  if (isBreakRunning(id)) {
    return (
      <View
        className={`${styles.timerIndicator} ${styles.breakTimer}`}
        testID={testID ? `${testID}-break-timer` : `task-card-break-timer-${id}`}
      >
        <Text className={`${styles.timerLabel} ${fontSizeClasses.sm}`}>
          {getText('tasks_break_time_remaining')}:
        </Text>
        <Text
          className={`${styles.timerValue} ${styles.breakTimerValue} ${fontSizeClasses.base}`}
        >
          {formatTime(breakRemainingTime)}
        </Text>
        <Text className={`${styles.timerStatus} ${fontSizeClasses.sm}`}>
          {getText('tasks_break_session_active')}
        </Text>
      </View>
    );
  }

  return null;
}

TaskCardTimer.displayName = 'TaskCardTimer';
