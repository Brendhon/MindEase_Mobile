import { useCallback } from 'react';

import { useFeedbackContext } from '@/contexts/feedback';
import type { FeedbackType } from '@/models/feedback';
import type { AccessibilityTextKey } from '@/utils/accessibility';
import { generateRandomUUID } from '@/utils/uuid';

/**
 * Hook to show feedback messages (toasts) with accessibility support
 *
 * Features:
 * - Semantic types (success, error, warning, info)
 * - Automatic cleanup
 * - Uses accessibility text keys for detailed/summary modes
 * - Simple API
 *
 * @example
 * ```tsx
 * const { showFeedback, success, error } = useFeedback();
 *
 * // Using specific helper
 * success("toast_success_task_created");
 *
 * // Using generic showFeedback
 * showFeedback({
 *   type: "success",
 *   messageKey: "toast_success_task_created"
 * });
 * ```
 */
export function useFeedback() {
  const context = useFeedbackContext();

  const showFeedback = useCallback(
    (options: {
      type: FeedbackType;
      messageKey: AccessibilityTextKey;
      duration?: number;
    }) => {
      context.addFeedback({
        id: generateRandomUUID(),
        type: options.type,
        messageKey: options.messageKey,
        duration: options.duration ?? 5000,
      });
    },
    [context]
  );

  return {
    showFeedback,
    success: useCallback(
      (messageKey: AccessibilityTextKey, duration?: number) => {
        showFeedback({ type: 'success', messageKey, duration });
      },
      [showFeedback]
    ),
    error: useCallback(
      (messageKey: AccessibilityTextKey, duration?: number) => {
        showFeedback({ type: 'error', messageKey, duration });
      },
      [showFeedback]
    ),
    warning: useCallback(
      (messageKey: AccessibilityTextKey, duration?: number) => {
        showFeedback({ type: 'warning', messageKey, duration });
      },
      [showFeedback]
    ),
    info: useCallback(
      (messageKey: AccessibilityTextKey, duration?: number) => {
        showFeedback({ type: 'info', messageKey, duration });
      },
      [showFeedback]
    ),
  };
}
