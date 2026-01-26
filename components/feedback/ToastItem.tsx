import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Pressable, Text } from 'react-native';

import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import type { ToastMessage } from '@/hooks/toast';
import { getTypeIcon, getTypeStyles } from './toast-utils';
import { styles } from './toast-styles';

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

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  const typeStyles = useMemo(() => getTypeStyles(toast.type), [toast.type]);
  const icon = useMemo(() => getTypeIcon(toast.type), [toast.type]);

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

  const iconClasses = useMemo(
    () => `${styles.icon} ${fontSizeClasses.lg} ${typeStyles.iconColor}`,
    [fontSizeClasses.lg, typeStyles.iconColor]
  );

  const messageClasses = useMemo(
    () => `${styles.message} ${fontSizeClasses.sm} ${typeStyles.textColor}`,
    [fontSizeClasses.sm, typeStyles.textColor]
  );

  const dismissIconClasses = useMemo(
    () => `${fontSizeClasses.lg} ${typeStyles.iconColor}`,
    [fontSizeClasses.lg, typeStyles.iconColor]
  );

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
      <Text className={iconClasses}>{icon}</Text>

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
        <Text className={dismissIconClasses}>×</Text>
      </Pressable>
    </Animated.View>
  );
}

ToastItem.displayName = 'ToastItem';
