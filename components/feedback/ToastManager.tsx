import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Pressable } from 'react-native';

import { useFeedbackContext } from '@/contexts/feedback';
import { useTextDetail } from '@/hooks/accessibility';
import { FeedbackMessage, FeedbackType } from '@/models/feedback';

/**
 * Get colors for feedback type
 */
function getTypeStyles(type: FeedbackType): {
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
 * Get icon character for feedback type
 */
function getTypeIcon(type: FeedbackType): string {
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
  feedback,
  onRemove,
}: {
  feedback: FeedbackMessage;
  onRemove: (id: string) => void;
}) {
  const { getText } = useTextDetail();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  const styles = getTypeStyles(feedback.type);
  const icon = getTypeIcon(feedback.type);

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
    const duration = feedback.duration || 5000;
    const timer = setTimeout(() => {
      // Animate out
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -20,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onRemove(feedback.id);
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [feedback, opacity, translateY, onRemove]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -20,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onRemove(feedback.id);
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
        {getText(feedback.messageKey)}
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
 * Renders toast notifications from feedback context.
 * Should be placed in the root layout of the app.
 *
 * Features:
 * - Animated toast appearance/dismissal
 * - Auto-dismiss with configurable duration
 * - Manual dismiss on tap
 * - Accessibility support (announcements)
 * - Multiple concurrent toasts
 *
 * @example
 * ```tsx
 * // In _layout.tsx
 * export default function RootLayout() {
 *   return (
 *     <FeedbackProvider>
 *       <Stack />
 *       <ToastManager />
 *     </FeedbackProvider>
 *   );
 * }
 * ```
 */
export function ToastManager() {
  const { feedbacks, removeFeedback } = useFeedbackContext();

  if (feedbacks.length === 0) return null;

  return (
    <View
      className="absolute top-12 left-4 right-4 z-50"
      pointerEvents="box-none"
    >
      {feedbacks.map((feedback) => (
        <ToastItem
          key={feedback.id}
          feedback={feedback}
          onRemove={removeFeedback}
        />
      ))}
    </View>
  );
}
