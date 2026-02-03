/**
 * useFocusSessionCompleteAlert Hook - MindEase Mobile
 *
 * Monitors focus timer state and shows a native Alert when the focus session
 * completes (timer reaches zero). Mirrors the logic of the web
 * FocusSessionCompleteDialogWrapper but uses useAlert instead of a dialog.
 *
 * The user can choose: Start Break, Continue Focus, or Finish Task (if no pending subtasks).
 */

import { useMissingBreakAlert } from '@/hooks/cognitive-alerts/useMissingBreakAlert';
import { useProlongedNavigationAlert } from '@/hooks/cognitive-alerts/useProlongedNavigationAlert';
import { useAlert } from '@/hooks/alert';
import { useTextDetail } from '@/hooks/accessibility';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import { useTasks } from '@/hooks/tasks/useTasks';
import { useAuth } from '@/hooks/auth';
import { useBreakTimer } from './useBreakTimer';
import { useFocusTimer } from './useFocusTimer';
import { canCompleteTask } from '@/utils/tasks';
import { useCallback, useEffect, useRef } from 'react';

export function useFocusSessionCompleteAlert() {
  const { user } = useAuth();
  const uid = user?.uid ?? null;
  const { timerState, stopTimer, startTimer } = useFocusTimer();
  const { startBreak } = useBreakTimer();
  const { settings } = useCognitiveSettings();
  const { recordFocusSessionComplete, recordTaskFinished } =
    useMissingBreakAlert();
  const { recordUserAction } = useProlongedNavigationAlert();
  const { updateTaskStatus, getTask, refreshTask } = useTasks();
  const { showAlert } = useAlert();
  const { getText, getTextWithReplace } = useTextDetail();

  const prevTimerStateRef = useRef(timerState);
  const hasShownForCurrentCompletionRef = useRef(false);

  const focusDuration = settings.focusDuration ?? 25;
  const breakDuration = settings.shortBreakDuration ?? 5;

  const fetchActiveTask = useCallback(
    async (taskId: string) => {
      if (!uid) return null;
      try {
        let task = getTask(taskId);
        if (!task) {
          await refreshTask(uid, taskId);
          task = getTask(taskId);
        }
        return task ?? null;
      } catch (error) {
        console.error('Error fetching active task:', error);
        return null;
      }
    },
    [uid, getTask, refreshTask]
  );

  useEffect(() => {
    const prev = prevTimerStateRef.current;
    const current = timerState;

    // Reset "shown" ref when timer is fully stopped (no active task)
    if (current.timerState === 'idle' && current.activeTaskId === null) {
      hasShownForCurrentCompletionRef.current = false;
      prevTimerStateRef.current = current;
      return;
    }

    // Detect focus session completion: was running, now idle, activeTaskId still set
    const completed =
      prev.timerState === 'running' &&
      current.timerState === 'idle' &&
      current.activeTaskId !== null &&
      prev.activeTaskId === current.activeTaskId;

    // Reset "shown" ref when user started a new focus session (idle -> running)
    // so the next completion will show the alert again
    const startedNewSession =
      prev.timerState === 'idle' &&
      current.timerState === 'running' &&
      current.activeTaskId !== null;
    if (startedNewSession) {
      hasShownForCurrentCompletionRef.current = false;
    }

    if (completed && !hasShownForCurrentCompletionRef.current) {
      const taskId = current.activeTaskId;
      if (!taskId || !uid) {
        prevTimerStateRef.current = current;
        return;
      }

      hasShownForCurrentCompletionRef.current = true;

      void fetchActiveTask(taskId).then((activeTask) => {
        const canFinish = activeTask ? canCompleteTask(activeTask) : false;

        const title = getText('tasks_focus_session_complete_title');
        const message = getTextWithReplace(
          'tasks_focus_session_complete_message',
          { minutes: String(focusDuration) }
        );
        const question = getText('tasks_focus_session_complete');
        const fullMessage = `${message}\n\n${question}`;

        const startBreakLabel = getTextWithReplace(
          'tasks_focus_session_start_break',
          { minutes: String(breakDuration) }
        );
        const continueFocusLabel = getTextWithReplace(
          'tasks_focus_session_continue_focus',
          { minutes: String(focusDuration) }
        );
        const finishLabel = getText('tasks_focus_session_finish');

        const buttons: Array<{
          text: string;
          style?: 'default' | 'destructive' | 'cancel';
          onPress?: () => void | Promise<void>;
        }> = [
          {
            text: startBreakLabel,
            style: 'default',
            onPress: () => {
              stopTimer();
              startBreak(taskId!);
            },
          },
          {
            text: continueFocusLabel,
            style: 'default',
            onPress: () => {
              startTimer(taskId!);
              recordFocusSessionComplete();
              recordUserAction();
            },
          },
        ];

        if (canFinish) {
          buttons.push({
            text: finishLabel,
            style: 'default',
            onPress: () => {
              void (async () => {
                try {
                  await updateTaskStatus(uid!, taskId!, 2);
                  stopTimer();
                  recordTaskFinished();
                } catch (error) {
                  console.error('Error finishing task:', error);
                }
              })();
            },
          });
        }

        showAlert(title, fullMessage, buttons);
      });
    }

    prevTimerStateRef.current = current;
  }, [
    timerState,
    uid,
    fetchActiveTask,
    focusDuration,
    breakDuration,
    getText,
    getTextWithReplace,
    showAlert,
    stopTimer,
    startTimer,
    startBreak,
    recordFocusSessionComplete,
    recordUserAction,
    recordTaskFinished,
    updateTaskStatus,
  ]);
}
