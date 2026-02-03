/**
 * useTaskCard Hook Props and Return - MindEase Mobile
 * Type definitions for the useTaskCard hook (aligned with web)
 */

import type { Task } from './task';

/**
 * useTaskCard hook input props
 */
export interface UseTaskCardProps {
  /** Task data */
  task: Task;

  /** Callback when task is edited */
  onEdit?: (task: Task) => void;

  /** Callback when task is deleted */
  onDelete?: (taskId: string) => void;

  /** Callback when task moves to another column (e.g. for scroll-into-view; newStatus 0/1/2) */
  onTaskMovedToColumn?: (newStatus: number) => void;

  /** Test ID for testing (used internally by hook) */
  testId?: string;
}

/**
 * useTaskCard hook return type
 */
export interface UseTaskCardReturn {
  /** CSS classes for the card based on status and focus state */
  cardClasses: string;

  /** Whether focus timer is active for this task */
  isActive: boolean;

  /** Whether focus timer is running for this task */
  isRunning: boolean;

  /** Whether there is already an active task */
  hasActiveTask: boolean;

  /** Whether break timer is running for this task */
  isBreakRunning: boolean;

  /** Whether the card is focused (focus or break active) */
  isFocused: boolean;

  /** Whether task has pending subtasks */
  hasPendingSubtasks: boolean;

  /** Whether checklist should be interactive */
  isChecklistInteractive: boolean;

  /** Handler to start focus session */
  handleStartFocus: () => void;

  /** Handler to stop timer */
  handleStop: () => void;

  /** Handler to complete task */
  handleComplete: () => void;

  /** Handler to edit task */
  handleEdit: () => void;

  /** Handler to delete task */
  handleDelete: () => void;

  /** Handler to toggle subtask */
  handleToggleSubtask: (subtaskId: string) => void;
}
