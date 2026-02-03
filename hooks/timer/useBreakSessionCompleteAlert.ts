/**
 * useBreakSessionCompleteAlert Hook - MindEase Mobile
 *
 * Monitors break timer state and shows a native Alert when the break session
 * completes (break timer reaches zero). Mirrors the logic of the web
 * BreakSessionCompleteDialogWrapper but uses useAlert instead of a dialog.
 *
 * The user can choose: Start Focus or End Focus.
 */

import { useMissingBreakAlert, useProlongedNavigationAlert } from '@/hooks/cognitive-alerts';
import { useAlert } from '@/hooks/alert';
import { useTextDetail } from '@/hooks/accessibility';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import { useTasks } from '@/hooks/tasks';
import { useAuth } from '@/hooks/auth';
import { useBreakTimer } from './useBreakTimer';
import { useFocusTimer } from './useFocusTimer';
import { useEffect, useRef } from 'react';

export function useBreakSessionCompleteAlert() {
  const { user } = useAuth();
  const uid = user?.uid ?? null;
  const { breakTimerState, stopBreak } = useBreakTimer();
  const { startTimer, stopTimer } = useFocusTimer();
  const { settings } = useCognitiveSettings();
  const { recordBreakComplete, recordTaskFinished } = useMissingBreakAlert();
  const { recordUserAction } = useProlongedNavigationAlert();
  const { updateTaskStatus } = useTasks();
  const { showAlert } = useAlert();
  const { getText, getTextWithReplace } = useTextDetail();

  const prevBreakTimerStateRef = useRef(breakTimerState);
  const hasShownForCurrentCompletionRef = useRef(false);

  const breakDuration = settings.shortBreakDuration ?? 5;
  const focusDuration = settings.focusDuration ?? 25;

  useEffect(() => {
    const prev = prevBreakTimerStateRef.current;
    const current = breakTimerState;

    // Reset "shown" ref when break timer is fully stopped (idle)
    if (current.breakTimerState === 'idle') {
      hasShownForCurrentCompletionRef.current = false;
      prevBreakTimerStateRef.current = current;
      return;
    }

    // Detect break session completion: was running, now breakEnded
    const completed =
      prev.breakTimerState === 'running' && current.breakTimerState === 'breakEnded';

    if (completed && !hasShownForCurrentCompletionRef.current) {
      hasShownForCurrentCompletionRef.current = true;

      const activeTaskId = current.activeTaskId;

      const title = getText('tasks_break_session_complete_title');
      const message = getTextWithReplace('tasks_break_session_complete_message', {
        minutes: String(breakDuration),
      });
      const question = getText('tasks_break_session_complete');
      const fullMessage = `${message}\n\n${question}`;

      const startFocusLabel = getTextWithReplace('tasks_break_session_start_focus', {
        minutes: String(focusDuration),
      });
      const endFocusLabel = getText('tasks_break_session_end_focus');

      const buttons = [
        {
          text: startFocusLabel,
          style: 'default' as const,
          onPress: () => {
            stopBreak();
            if (activeTaskId) {
              startTimer(activeTaskId);
              recordUserAction();
            }
            recordBreakComplete();
          },
        },
        {
          text: endFocusLabel,
          style: 'default' as const,
          onPress: () => {
            if (activeTaskId && uid) {
              void (async () => {
                try {
                  await updateTaskStatus(uid, activeTaskId, 0);
                } catch (error) {
                  console.error('Error updating task status:', error);
                }
              })();
            }
            stopBreak();
            stopTimer();
            recordTaskFinished();
          },
        },
      ];

      showAlert(title, fullMessage, buttons);
    }

    prevBreakTimerStateRef.current = current;
  }, [
    breakTimerState,
    uid,
    breakDuration,
    focusDuration,
    getText,
    getTextWithReplace,
    showAlert,
    stopBreak,
    startTimer,
    stopTimer,
    recordBreakComplete,
    recordUserAction,
    recordTaskFinished,
    updateTaskStatus,
  ]);
}
