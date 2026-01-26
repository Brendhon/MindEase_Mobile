import { X } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import type { ToastMessage } from '@/hooks/toast';
import {
  getToastDismissIconSize,
  getToastIconSize,
  THEME_COLORS,
} from '@/utils/theme';
import { styles } from './toast-styles';
import { getTypeIcon, getTypeStyles } from './toast-utils';

/**
 * ToastItemContent Component - MindEase Mobile
 * Reusable content component for toast notifications
 * Contains icon, message, and dismiss button
 */
export interface ToastItemContentProps {
  /** Toast message data */
  toast: ToastMessage;

  /** Handler for dismiss button press */
  onDismiss: () => void;

  /** Container className */
  containerClassName: string;

  /** Test ID for testing */
  testID?: string;
}

/**
 * Content component shared between animated and static toast items
 * Handles rendering of icon, message, and dismiss button
 */
export function ToastItemContent({
  toast,
  onDismiss,
  containerClassName,
  testID,
}: ToastItemContentProps) {
  const { getText } = useTextDetail();
  const { fontSizeClasses } = useAccessibilityClasses();
  const { settings } = useCognitiveSettings();

  const typeStyles = useMemo(() => getTypeStyles(toast.type), [toast.type]);
  const IconComponent = useMemo(() => getTypeIcon(toast.type), [toast.type]);

  // Icon sizes from centralized theme utilities
  const iconSize = useMemo(
    () => getToastIconSize(settings.fontSize),
    [settings.fontSize]
  );
  const dismissIconSize = useMemo(
    () => getToastDismissIconSize(settings.fontSize),
    [settings.fontSize]
  );

  const messageClasses = useMemo(
    () => `${styles.message} ${fontSizeClasses.sm} ${typeStyles.textColor}`,
    [fontSizeClasses.sm, typeStyles.textColor]
  );

  // Icon color from centralized theme (white for all types)
  const iconColor = useMemo(() => THEME_COLORS.textWhite, []);

  return (
    <>
      {/* Icon */}
      <View className={styles.icon}>
        <IconComponent size={iconSize} color={iconColor} />
      </View>

      {/* Message */}
      <Text className={messageClasses}>{getText(toast.messageKey)}</Text>

      {/* Dismiss button */}
      <Pressable
        onPress={onDismiss}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel="Dismiss"
        testID={testID ? `${testID}-dismiss-button` : 'toast-dismiss-button'}
      >
        <X size={dismissIconSize} color={iconColor} />
      </Pressable>
    </>
  );
}

ToastItemContent.displayName = 'ToastItemContent';
