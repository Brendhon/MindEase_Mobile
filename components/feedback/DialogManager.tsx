import React, { useState } from 'react';
import { Modal, View, Text, Pressable, ActivityIndicator } from 'react-native';

import { useDialogContext } from '@/contexts/dialog';
import { useTextDetail } from '@/hooks/accessibility';

/**
 * DialogManager Component - MindEase Mobile
 *
 * Renders the global dialog based on dialog context state.
 * Should be placed in the root layout of the app.
 *
 * Features:
 * - Renders dialogs from context state
 * - Supports confirm/cancel actions
 * - Accessibility-aware text via useTextDetail
 * - Loading state support
 *
 * @example
 * ```tsx
 * // In _layout.tsx
 * export default function RootLayout() {
 *   return (
 *     <DialogProvider>
 *       <Stack />
 *       <DialogManager />
 *     </DialogProvider>
 *   );
 * }
 * ```
 */
export function DialogManager() {
  const { dialog, _setDialog } = useDialogContext();
  const { getText } = useTextDetail();
  const [isConfirming, setIsConfirming] = useState(false);

  if (!dialog) return null;

  const handleCancel = () => {
    if (dialog.preventClose) return;
    dialog.onCancel?.();
    _setDialog(null);
  };

  const handleConfirm = async () => {
    if (dialog.isLoading || isConfirming) return;

    setIsConfirming(true);
    try {
      await dialog.onConfirm?.();
    } finally {
      setIsConfirming(false);
    }
  };

  // Get button variant styles
  const getConfirmButtonStyle = () => {
    switch (dialog.confirmVariant) {
      case 'danger':
        return 'bg-red-600';
      case 'warning':
        return 'bg-yellow-600';
      case 'secondary':
        return 'bg-gray-600';
      case 'ghost':
        return 'bg-transparent border border-gray-300';
      default:
        return 'bg-blue-600';
    }
  };

  const getConfirmTextStyle = () => {
    return dialog.confirmVariant === 'ghost'
      ? 'text-gray-700'
      : 'text-white';
  };

  const isLoading = dialog.isLoading || isConfirming;

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      onRequestClose={handleCancel}
      accessibilityViewIsModal={true}
    >
      <Pressable
        className={styles.container}
        onPress={handleCancel}
        accessibilityRole="button"
        accessibilityLabel="Close dialog"
      >
        <Pressable
          className={styles.content}
          onPress={(e) => e.stopPropagation()}
          accessibilityRole="alert"
        >
          {/* Title */}
          <Text
            className={styles.title}
            accessibilityRole="header"
          >
            {getText(dialog.titleKey)}
          </Text>

          {/* Description */}
          <Text className={styles.description}>
            {getText(dialog.descriptionKey)}
          </Text>

          {/* Info (optional) */}
          {dialog.info && (
            <Text className={styles.info}>
              {dialog.info}
            </Text>
          )}

          {/* Actions */}
          <View className={styles.actions}>
            {/* Cancel Button */}
            {dialog.onCancel !== undefined && (
              <Pressable
                className={styles.cancelButton}
                onPress={handleCancel}
                disabled={isLoading}
                accessibilityRole="button"
                accessibilityLabel={
                  dialog.cancelLabelKey
                    ? getText(dialog.cancelLabelKey)
                    : 'Cancel'
                }
              >
                <Text className={styles.cancelButtonText}>
                  {dialog.cancelLabelKey
                    ? getText(dialog.cancelLabelKey)
                    : 'Cancel'}
                </Text>
              </Pressable>
            )}

            {/* Confirm Button */}
            {dialog.onConfirm && (
              <Pressable
                className={`${styles.confirmButton} ${getConfirmButtonStyle()}`}
                onPress={handleConfirm}
                disabled={isLoading}
                accessibilityRole="button"
                accessibilityLabel={
                  dialog.confirmLabelKey
                    ? getText(dialog.confirmLabelKey)
                    : 'Confirm'
                }
              >
                {isLoading && (
                  <ActivityIndicator
                    size="small"
                    color="white"
                    className={styles.confirmButtonLoading}
                  />
                )}
                <Text className={`${styles.confirmButtonText} ${getConfirmTextStyle()}`}>
                  {dialog.confirmLabelKey
                    ? getText(dialog.confirmLabelKey)
                    : 'Confirm'}
                </Text>
              </Pressable>
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = {
  container: 'flex-1 justify-center items-center bg-black/50',
  content: 'bg-white rounded-xl p-6 mx-4 max-w-sm w-full shadow-lg',
  title: 'text-lg font-semibold text-gray-900 mb-2',
  description: 'text-base text-gray-600 mb-4',
  info: 'text-sm text-gray-500 mb-4 italic',
  actions: 'flex-row justify-end gap-3 mt-2',
  cancelButton: 'px-4 py-2 rounded-lg bg-gray-100',
  cancelButtonText: 'text-gray-700 font-medium',
  confirmButton: 'px-4 py-2 rounded-lg flex-row items-center',
  confirmButtonLoading: 'mr-2',
  confirmButtonText: 'font-medium',
  confirmButtonTextGhost: 'text-gray-700',
  confirmButtonTextWhite: 'text-white',
}