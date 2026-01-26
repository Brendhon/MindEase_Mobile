import { X } from 'lucide-react-native';
import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

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
 * ToastItem Component - MindEase Mobile
 * Individual toast notification item with animations and accessibility support
 */
export interface ToastItemProps {
  /** Toast message data */
  toast: ToastMessage;

  /** Handler to remove toast */
  onRemove: (id: string) => void;

  /** Test ID for testing */
  testID?: string;
}

export function ToastItem({ toast, onRemove, testID }: ToastItemProps) {
  const { getText } = useTextDetail();
  const { fontSizeClasses, spacingClasses, animationsEnabled } =
    useAccessibilityClasses();
  const { settings } = useCognitiveSettings();

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

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

  // Generate accessible classes with memoization
  const containerClasses = useMemo(
    () =>
      `${styles.itemContainer} ${spacingClasses.padding} ${spacingClasses.marginBottom} ${typeStyles.bgColor}`,
    [
      spacingClasses.padding,
      spacingClasses.marginBottom,
      typeStyles.bgColor,
    ]
  );

  const messageClasses = useMemo(
    () => `${styles.message} ${fontSizeClasses.sm} ${typeStyles.textColor}`,
    [fontSizeClasses.sm, typeStyles.textColor]
  );

  // Icon color from centralized theme (white for all types)
  const iconColor = useMemo(() => THEME_COLORS.textWhite, []);

  useEffect(() => {
    const animationDuration = animationsEnabled ? 200 : 0;

    // Animate in
    if (animationsEnabled) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Set values directly when animations are disabled
      opacity.setValue(1);
      translateY.setValue(0);
    }

    // Auto dismiss
    const duration = toast.duration || 5000;
    const timer = setTimeout(() => {
      // Animate out
      if (animationsEnabled) {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: animationDuration,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 20,
            duration: animationDuration,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onRemove(toast.id);
        });
      } else {
        // Remove immediately when animations are disabled
        onRemove(toast.id);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [toast, opacity, translateY, onRemove, animationsEnabled]);

  const handleDismiss = () => {
    const animationDuration = animationsEnabled ? 150 : 0;

    if (animationsEnabled) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 20,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onRemove(toast.id);
      });
    } else {
      // Remove immediately when animations are disabled
      onRemove(toast.id);
    }
  };

  return (
    <Animated.View
      style={{ opacity, transform: [{ translateY }] }}
      className={containerClasses}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      testID={testID}
    >
      {/* Icon */}
      <View className={styles.icon}>
        <IconComponent size={iconSize} color={iconColor} />
      </View>

      {/* Message */}
      <Text className={messageClasses}>{getText(toast.messageKey)}</Text>

      {/* Dismiss button */}
      <Pressable
        onPress={handleDismiss}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel="Dismiss"
        testID={testID ? `${testID}-dismiss-button` : 'toast-dismiss-button'}
      >
        <X size={dismissIconSize} color={iconColor} />
      </Pressable>
    </Animated.View>
  );
}

ToastItem.displayName = 'ToastItem';
