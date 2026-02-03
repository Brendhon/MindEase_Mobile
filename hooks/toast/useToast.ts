import { useCallback } from 'react';

import { useTextDetail } from '@/hooks/accessibility';
import type { AccessibilityTextKey } from '@/utils/accessibility';
import { generateRandomUUID } from '@/utils/uuid';

/**
 * Toast types for semantic meaning
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Toast message configuration
 * Uses messageKey to reference text content from accessibility-texts.json
 */
export interface ToastMessage {
  id: string;
  type: ToastType;
  messageKey: AccessibilityTextKey;
  duration?: number;
}

/**
 * Toast manager interface for singleton
 */
interface ToastManager {
  showToast: (toast: ToastMessage) => void;
}

/**
 * Singleton reference to toast manager
 * The ToastManager component registers itself here
 */
let toastManagerRef: ToastManager | null = null;

/**
 * Register toast manager (called by ToastManager component)
 */
export function registerToastManager(manager: ToastManager) {
  toastManagerRef = manager;
}

/**
 * Unregister toast manager (called when ToastManager unmounts)
 */
export function unregisterToastManager() {
  toastManagerRef = null;
}

/**
 * useToast Hook - MindEase Mobile
 * Centralized hook for showing toast notifications
 *
 * This hook provides a simple API for showing:
 * - Success toasts
 * - Error toasts
 * - Warning toasts
 * - Info toasts
 *
 * Features:
 * - Automatic translation support via useTextDetail
 * - Simple API for common use cases
 * - Auto-dismiss with configurable duration
 * - No Context/Provider needed (uses singleton)
 *
 * @example
 * ```tsx
 * // Basic usage
 * function MyComponent() {
 *   const { success, error } = useToast();
 *
 *   const handleSuccess = () => {
 *     success('toast_success_task_created');
 *   };
 *
 *   const handleError = () => {
 *     error('toast_error_task_create_failed');
 *   };
 *
 *   return (
 *     <View>
 *       <Pressable onPress={handleSuccess}><Text>Success</Text></Pressable>
 *       <Pressable onPress={handleError}><Text>Error</Text></Pressable>
 *     </View>
 *   );
 * }
 * ```
 */
export function useToast() {
  const { getText } = useTextDetail();

  /**
   * Show a toast notification
   */
  const showToast = useCallback(
    (options: { type: ToastType; messageKey: AccessibilityTextKey; duration?: number }) => {
      if (!toastManagerRef) {
        console.warn('ToastManager not registered. Toast will not be shown.');
        return;
      }

      const toast: ToastMessage = {
        id: generateRandomUUID(),
        type: options.type,
        messageKey: options.messageKey,
        duration: options.duration ?? 5000,
      };

      toastManagerRef.showToast(toast);
    },
    []
  );

  /**
   * Show success toast
   */
  const success = useCallback(
    (messageKey: AccessibilityTextKey, duration?: number) => {
      showToast({ type: 'success', messageKey, duration });
    },
    [showToast]
  );

  /**
   * Show error toast
   */
  const error = useCallback(
    (messageKey: AccessibilityTextKey, duration?: number) => {
      showToast({ type: 'error', messageKey, duration });
    },
    [showToast]
  );

  /**
   * Show warning toast
   */
  const warning = useCallback(
    (messageKey: AccessibilityTextKey, duration?: number) => {
      showToast({ type: 'warning', messageKey, duration });
    },
    [showToast]
  );

  /**
   * Show info toast
   */
  const info = useCallback(
    (messageKey: AccessibilityTextKey, duration?: number) => {
      showToast({ type: 'info', messageKey, duration });
    },
    [showToast]
  );

  return {
    showToast,
    success,
    error,
    warning,
    info,
  };
}
