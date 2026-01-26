import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Pressable } from 'react-native';

import { useTextDetail } from '@/hooks/accessibility';
import {
  registerToastManager,
  unregisterToastManager,
  type ToastMessage,
  type ToastType,
} from '@/hooks/toast';

/**
 * Get colors for toast type
 */
function getTypeStyles(type: ToastType): {
  bgColor: string;
  textColor: string;
  iconColor: string;
} {
  switch (type) {
    case 'success':
      return {
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        iconColor: 'text-green-500',
      };
    case 'error':
      return {
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        iconColor: 'text-red-500',
      };
    case 'warning':
      return {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        iconColor: 'text-yellow-500',
      };
    case 'info':
    default:
      return {
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
        iconColor: 'text-blue-500',
      };
  }
}

/**
 * Get icon character for toast type
 */
function getTypeIcon(type: ToastType): string {
  switch (type) {
    case 'success':
      return '✓';
    case 'error':
      return '✕';
    case 'warning':
      return '⚠';
    case 'info':
    default:
      return 'ℹ';
  }
}

/**
 * Individual Toast Item
 */
function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}) {
  const { getText } = useTextDetail();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  const styles = getTypeStyles(toast.type);
  const icon = getTypeIcon(toast.type);

  useEffect(() => {
    // Animate in
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

    // Auto dismiss
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
      style={{ opacity, transform: [{ translateY }] }}
      className={`flex-row items-center px-4 py-3 rounded-lg mb-2 shadow-md ${styles.bgColor}`}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      {/* Icon */}
      <Text className={`text-lg mr-3 ${styles.iconColor}`}>{icon}</Text>

      {/* Message */}
      <Text className={`flex-1 text-sm font-medium ${styles.textColor}`}>
        {getText(toast.messageKey)}
      </Text>

      {/* Dismiss button */}
      <Pressable
        onPress={handleDismiss}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel="Dismiss"
      >
        <Text className={`text-lg ${styles.iconColor}`}>×</Text>
      </Pressable>
    </Animated.View>
  );
}

/**
 * ToastManager Component - MindEase Mobile
 *
 * Renders toast notifications using singleton pattern.
 * Should be placed in the root layout of the app.
 *
 * Features:
 * - Animated toast appearance/dismissal
 * - Auto-dismiss with configurable duration
 * - Manual dismiss on tap
 * - Accessibility support (announcements)
 * - Multiple concurrent toasts
 * - No Context/Provider needed (uses singleton)
 *
 * @example
 * ```tsx
 * // In _layout.tsx
 * export default function RootLayout() {
 *   return (
 *     <>
 *       <Stack />
 *       <ToastManager />
 *     </>
 *   );
 * }
 * ```
 */
export function ToastManager() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    // Register this manager with the singleton
    registerToastManager({
      showToast: (toast: ToastMessage) => {
        setToasts((prev) => [...prev, toast]);
      },
    });

    // Unregister on unmount
    return () => {
      unregisterToastManager();
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <View
      className="absolute bottom-12 left-4 right-4 z-50"
      pointerEvents="box-none"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </View>
  );
}
