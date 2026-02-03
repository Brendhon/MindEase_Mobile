/**
 * useTaskCard Hook - MindEase Mobile
 * Encapsulates all business logic for TaskCard component (aligned with web)
 *
 * This hook handles:
 * - Timer state management (focus and break)
 * - Task status management (via useTasks + useAuth)
 * - Alert management (useAlert instead of dialog)
 * - Subtask validation and toggling
 * - Event handlers
 * - Derived state calculations
 *
 * The component only needs to call this hook and render the UI.
 */

import { useAuth } from '@/hooks/auth';
import { useAlert } from '@/hooks/alert/useAlert';
import { useMissingBreakAlert } from '@/hooks/cognitive-alerts/useMissingBreakAlert';
import { useProlongedNavigationAlert } from '@/hooks/cognitive-alerts/useProlongedNavigationAlert';
import { useBreakTimer } from '@/hooks/timer/useBreakTimer';
import { useFocusTimer } from '@/hooks/timer/useFocusTimer';
import { useTextDetail } from '@/hooks/accessibility';
import type { UseTaskCardProps, UseTaskCardReturn } from '@/models/use-task-card-props';
import type { Subtask } from '@/models/task';
import type { AccessibilityTextKey } from '@/utils/accessibility';
import { canCompleteTask, getPendingSubtasks } from '@/utils/tasks';
import { styles } from '@/components/tasks/task-card/task-card-styles';
import { useCallback, useMemo } from 'react';
import { useTasks } from './useTasks';
import { useCognitiveSettings } from '../cognitive-settings/useCognitiveSettings';

/**
 * Build message string for "complete pending subtasks" alert (native Alert does not support React content)
 */
function getCompletePendingSubtasksMessage(
  pendingSubtasks: Subtask[],
  getText: (key: AccessibilityTextKey) => string
): string {
  const list = pendingSubtasks.map((s) => `• ${s.title}`).join('\n');
  return `${getText('tasks_complete_pending_message')}\n\n${getText('tasks_complete_pending_list_label')}\n${list}\n\n${getText('tasks_complete_pending_hint')}`;
}

/**
 * Get card classes based on task status and focus state
 */
function getTaskCardClasses(
  task: { id: string; status: number },
  isFocusActive: (taskId: string) => boolean
): string {
  if (task.status === 2) return `${styles.card} ${styles.cardDone}`;
  if (isFocusActive(task.id)) return `${styles.card} ${styles.cardActive}`;
  return styles.card;
}

/**
 * Hook for managing TaskCard business logic
 * @param props - TaskCard configuration
 * @returns TaskCard state and handlers
 */
export function useTaskCard({
  task,
  onEdit,
  onDelete,
  onTaskMovedToColumn,
  testId,
}: UseTaskCardProps): UseTaskCardReturn {
  const { user } = useAuth();
  const { settings } = useCognitiveSettings();
  const uid = user?.uid ?? null;
  const { updateTaskStatus, toggleSubtask, hasTasksInProgress } = useTasks();
  const {
    startTimer,
    stopTimer,
    isActive: isFocusActive,
    isRunning: isFocusRunning,
  } = useFocusTimer();
  const { stopBreak, isActive: isBreakActive, isRunning: isBreakRunning } = useBreakTimer();
  const { recordTaskFinished } = useMissingBreakAlert();
  const { recordUserAction } = useProlongedNavigationAlert();
  const { getText } = useTextDetail();
  const { showInfo, showConfirmation, showAlert } = useAlert();

  const hasActiveTask = hasTasksInProgress(task.id);
  const isActive = isFocusActive(task.id);
  const isRunning = isFocusRunning(task.id);
  const isBreakRunningForTask = isBreakActive(task.id) && isBreakRunning(task.id);
  const isFocused = (isActive || isBreakActive(task.id)) && settings.focusMode;

  const hasPendingSubtasks = useMemo(() => !canCompleteTask(task), [task]);
  const pendingSubtasks = useMemo(() => getPendingSubtasks(task), [task]);

  const cardClasses = useMemo(() => getTaskCardClasses(task, isFocusActive), [task, isFocusActive]);

  const isChecklistInteractive = isActive && isRunning;

  const handleStartFocus = useCallback(() => {
    const startTimerAndRecord = () => {
      startTimer(task.id);
      recordUserAction();
      onTaskMovedToColumn?.(1);
    };
    if (uid) {
      updateTaskStatus(uid, task.id, 1).then(startTimerAndRecord);
    } else {
      startTimerAndRecord();
    }
  }, [startTimer, task.id, uid, updateTaskStatus, recordUserAction, onTaskMovedToColumn]);

  const handleStop = useCallback(() => {
    stopBreak();
    stopTimer();
    if (uid) {
      updateTaskStatus(uid, task.id, 0);
    }
    recordTaskFinished();
    onTaskMovedToColumn?.(0);
  }, [
    stopBreak,
    stopTimer,
    task.id,
    uid,
    updateTaskStatus,
    recordTaskFinished,
    onTaskMovedToColumn,
  ]);

  const handleComplete = useCallback(() => {
    if (hasPendingSubtasks) {
      const message = getCompletePendingSubtasksMessage(pendingSubtasks, getText);
      showAlert(getText('tasks_complete_pending_title'), message, [{ text: getText('button_ok') }]);
    } else {
      stopTimer();
      if (uid) {
        updateTaskStatus(uid, task.id, 2);
      }
      recordTaskFinished();
      onTaskMovedToColumn?.(2);
    }
  }, [
    hasPendingSubtasks,
    pendingSubtasks,
    getText,
    showAlert,
    stopTimer,
    task.id,
    uid,
    updateTaskStatus,
    recordTaskFinished,
    onTaskMovedToColumn,
  ]);

  const handleEdit = useCallback(() => {
    onEdit?.(task);
  }, [onEdit, task]);

  const handleDelete = useCallback(() => {
    onDelete?.(task.id);
  }, [onDelete, task.id]);

  const showSubtaskFocusRequiredAlert = useCallback(() => {
    if (hasActiveTask) {
      showInfo({
        titleKey: 'tasks_subtask_focus_required_title',
        messageKey: 'tasks_subtask_focus_required_message',
      });
    } else {
      showConfirmation({
        titleKey: 'tasks_subtask_focus_required_title',
        messageKey: 'tasks_subtask_focus_required_message',
        cancelLabelKey: 'tasks_subtask_focus_required_cancel',
        confirmLabelKey: 'tasks_subtask_focus_required_button',
        onConfirm: () => {
          handleStartFocus();
        },
      });
    }
  }, [hasActiveTask, showInfo, showConfirmation, handleStartFocus]);

  const showSubtaskBreakRequiredAlert = useCallback(() => {
    showInfo({
      titleKey: 'tasks_subtask_break_required_title',
      messageKey: 'tasks_subtask_break_required_message',
    });
  }, [showInfo]);

  const handleToggleSubtask = useCallback(
    (subtaskId: string) => {
      if (isBreakActive(task.id) && isBreakRunning(task.id)) {
        showSubtaskBreakRequiredAlert();
        return;
      }
      if (!isFocusActive(task.id) || !isFocusRunning(task.id)) {
        showSubtaskFocusRequiredAlert();
        return;
      }

      const subtask = task.subtasks?.find((st) => st.id === subtaskId);
      const wasCompleted = subtask?.completed ?? false;

      if (uid) {
        toggleSubtask(uid, task.id, subtaskId);
      }

      // TODO: When useFeedback is available on mobile, show success toast for
      // 'tasks_checklist_step_completed' / 'tasks_checklist_step_pending'
      if (!wasCompleted) {
        recordUserAction();
      }
    },
    [
      isBreakActive,
      isBreakRunning,
      task.id,
      task.subtasks,
      isFocusActive,
      isFocusRunning,
      showSubtaskBreakRequiredAlert,
      showSubtaskFocusRequiredAlert,
      uid,
      toggleSubtask,
      recordUserAction,
    ]
  );

  return {
    cardClasses,
    isActive,
    isRunning,
    hasActiveTask,
    isBreakRunning: isBreakRunningForTask,
    isFocused,
    hasPendingSubtasks,
    isChecklistInteractive,
    handleStartFocus,
    handleStop,
    handleComplete,
    handleEdit,
    handleDelete,
    handleToggleSubtask,
  };
}
