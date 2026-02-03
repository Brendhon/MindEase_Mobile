import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';

import { useAccessibilityClasses } from '@/hooks/accessibility';
import type { ToastMessage } from '@/hooks/toast';
import { styles } from './toast-styles';
import { getTypeStyles } from './toast-utils';
import { ToastItemContent } from './ToastItemContent';

/**
 * ToastItemStatic Component - MindEase Mobile
 * Static toast notification item without animations for reduced motion support
 */
export interface ToastItemStaticProps {
  /** Toast message data */
  toast: ToastMessage;

  /** Handler to remove toast */
  onRemove: (id: string) => void;

  /** Test ID for testing */
  testID?: string;
}

/**
 * Static toast item component without animations
 * Used when animations are disabled to avoid Reanimated warnings
 */
export function ToastItemStatic({ toast, onRemove, testID }: ToastItemStaticProps) {
  const { spacingClasses } = useAccessibilityClasses();

  const typeStyles = useMemo(() => getTypeStyles(toast.type), [toast.type]);

  // Generate accessible classes with memoization
  const containerClasses = useMemo(
    () =>
      `${styles.itemContainer} ${spacingClasses.padding} ${spacingClasses.marginBottom} ${typeStyles.bgColor}`,
    [spacingClasses.padding, spacingClasses.marginBottom, typeStyles.bgColor]
  );

  // Auto dismiss without animation
  useEffect(() => {
    const duration = toast.duration || 5000;
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast, onRemove]);

  const handleDismiss = () => {
    onRemove(toast.id);
  };

  return (
    <View
      className={containerClasses}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      testID={testID}>
      <ToastItemContent
        toast={toast}
        onDismiss={handleDismiss}
        containerClassName={containerClasses}
        testID={testID}
      />
    </View>
  );
}

ToastItemStatic.displayName = 'ToastItemStatic';
