import React, { useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';

import { useAccessibilityClasses } from '@/hooks/accessibility';
import type { ToastMessage } from '@/hooks/toast';
import { styles } from './toast-styles';
import { getTypeStyles } from './toast-utils';
import { ToastItemContent } from './ToastItemContent';

/**
 * ToastItemAnimated Component - MindEase Mobile
 * Animated toast notification item with entrance/exit animations
 */
export interface ToastItemAnimatedProps {
  /** Toast message data */
  toast: ToastMessage;

  /** Handler to remove toast */
  onRemove: (id: string) => void;

  /** Test ID for testing */
  testID?: string;
}

/**
 * Animated toast item component with smooth entrance/exit animations
 * Uses React Native Animated API (not Reanimated) to avoid conflicts
 */
export function ToastItemAnimated({
  toast,
  onRemove,
  testID,
}: ToastItemAnimatedProps) {
  const { spacingClasses } = useAccessibilityClasses();

  // Create Animated values with useRef to avoid re-creation on re-renders
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  // Memoize animated style to avoid creating new object on every render
  const animatedStyle = useMemo(
    () => ({
      opacity,
      transform: [{ translateY }],
    }),
    [opacity, translateY]
  );

  const typeStyles = useMemo(() => getTypeStyles(toast.type), [toast.type]);

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

  // Animate in on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  // Auto dismiss with animation
  useEffect(() => {
    const duration = toast.duration || 5000;
    const timer = setTimeout(() => {
      // Animate out
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 20,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onRemove(toast.id);
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [toast, opacity, translateY, onRemove]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 20,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onRemove(toast.id);
    });
  };

  return (
    <Animated.View
      style={animatedStyle}
      className={containerClasses}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      testID={testID}
    >
      <ToastItemContent
        toast={toast}
        onDismiss={handleDismiss}
        containerClassName={containerClasses}
        testID={testID}
      />
    </Animated.View>
  );
}

ToastItemAnimated.displayName = 'ToastItemAnimated';
