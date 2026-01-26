import { useCallback } from 'react';
import { Alert } from 'react-native';

import { useTextDetail } from '@/hooks/accessibility';
import type { AccessibilityTextKey } from '@/utils/accessibility';

/**
 * useAlert Hook - MindEase Mobile
 * Centralized hook for showing native Alert dialogs
 *
 * This hook provides a simple API for showing:
 * - Confirmation dialogs (with cancel and confirm buttons)
 * - Information dialogs (with OK button only)
 *
 * Features:
 * - Automatic translation support via useTextDetail
 * - Simple API for common use cases
 * - Support for async confirm actions
 * - Destructive button style for dangerous actions
 *
 * @example
 * ```tsx
 * // Confirmation dialog
 * function MyComponent() {
 *   const { showConfirmation } = useAlert();
 *
 *   const handleDelete = () => {
 *     showConfirmation({
 *       titleKey: 'profile_delete_dialog_title',
 *       messageKey: 'profile_delete_dialog_message',
 *       cancelLabelKey: 'profile_delete_dialog_cancel',
 *       confirmLabelKey: 'profile_delete_dialog_confirm',
 *       onConfirm: async () => {
 *         await deleteItem();
 *       },
 *       confirmStyle: 'destructive',
 *     });
 *   };
 *
 *   return <Pressable onPress={handleDelete}><Text>Delete</Text></Pressable>;
 * }
 *
 * // Information dialog
 * function InfoComponent() {
 *   const { showInfo } = useAlert();
 *
 *   const handleInfo = () => {
 *     showInfo({
 *       titleKey: 'info_title',
 *       messageKey: 'info_message',
 *     });
 *   };
 *
 *   return <Pressable onPress={handleInfo}><Text>Show Info</Text></Pressable>;
 * }
 * ```
 */
export function useAlert() {
  const { getText } = useTextDetail();

  /**
   * Show a confirmation dialog with cancel and confirm buttons
   */
  const showConfirmation = useCallback(
    (options: {
      titleKey: AccessibilityTextKey;
      messageKey: AccessibilityTextKey;
      cancelLabelKey?: AccessibilityTextKey;
      confirmLabelKey: AccessibilityTextKey;
      onCancel?: () => void;
      onConfirm: () => void | Promise<void>;
      confirmStyle?: 'default' | 'destructive' | 'cancel';
    }) => {
      Alert.alert(
        getText(options.titleKey),
        getText(options.messageKey),
        [
          {
            text: options.cancelLabelKey
              ? getText(options.cancelLabelKey)
              : 'Cancel',
            style: 'cancel',
            onPress: options.onCancel,
          },
          {
            text: getText(options.confirmLabelKey),
            style: options.confirmStyle || 'default',
            onPress: options.onConfirm,
          },
        ]
      );
    },
    [getText]
  );

  /**
   * Show an information dialog with OK button only
   */
  const showInfo = useCallback(
    (options: {
      titleKey: AccessibilityTextKey;
      messageKey: AccessibilityTextKey;
      okLabelKey?: AccessibilityTextKey;
      onOk?: () => void;
    }) => {
      Alert.alert(
        getText(options.titleKey),
        getText(options.messageKey),
        [
          {
            text: options.okLabelKey ? getText(options.okLabelKey) : 'OK',
            onPress: options.onOk,
          },
        ]
      );
    },
    [getText]
  );

  /**
   * Generic showAlert function for custom configurations
   */
  const showAlert = useCallback(
    (
      title: string,
      message: string,
      buttons?: Array<{
        text: string;
        style?: 'default' | 'destructive' | 'cancel';
        onPress?: () => void | Promise<void>;
      }>
    ) => {
      Alert.alert(title, message, buttons);
    },
    []
  );

  return {
    showConfirmation,
    showInfo,
    showAlert,
  };
}
