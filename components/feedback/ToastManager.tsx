import {
  registerToastManager,
  unregisterToastManager,
  type ToastMessage,
} from '@/hooks/toast';
import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ToastItemAnimated } from './ToastItemAnimated';
import { ToastItemStatic } from './ToastItemStatic';
import { styles } from './toast-styles';

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
  const { animationsEnabled } = useAccessibilityClasses();

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
    <View className={styles.managerContainer} pointerEvents="box-none">
      {toasts.map((toast) =>
        animationsEnabled ? (
          <ToastItemAnimated
            key={toast.id}
            toast={toast}
            onRemove={removeToast}
            testID={`toast-item-${toast.id}`}
          />
        ) : (
          <ToastItemStatic
            key={toast.id}
            toast={toast}
            onRemove={removeToast}
            testID={`toast-item-${toast.id}`}
          />
        )
      )}
    </View>
  );
}
