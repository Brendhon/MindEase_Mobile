import { useCallback, useEffect } from 'react';

import { useCognitiveSettingsContext } from '@/contexts/cognitive-settings';
import { useAuthContext } from '@/contexts/auth';
import { UserPreferences, DEFAULT_ACCESSIBILITY_SETTINGS } from '@/models/user-preferences';
import { userPreferencesService } from '@/services/user-preferences';

/**
 * useCognitiveSettings Hook - MindEase Mobile
 *
 * Centralized hook for managing cognitive accessibility settings.
 *
 * This hook handles:
 * - CRUD operations for settings
 * - State management with Firestore synchronization
 * - Loading and error handling
 * - Real-time sync when user authenticates (web and mobile stay in sync)
 *
 * For Tailwind classes generation, use `useAccessibilityClasses` hook instead.
 * For text detail helpers, use `useTextDetail` hook instead.
 * This separation reduces unnecessary re-renders and improves performance.
 *
 * @example
 * ```tsx
 * // Basic usage - update setting
 * function MyComponent() {
 *   const { settings, updateSetting } = useCognitiveSettings();
 *   return (
 *     <Pressable onPress={() => updateSetting("contrast", "high")}>
 *       <Text>High Contrast</Text>
 *     </Pressable>
 *   );
 * }
 *
 * // For classes, use useAccessibilityClasses instead
 * function StyledComponent() {
 *   const { spacingClasses } = useAccessibilityClasses();
 *   return <View className={spacingClasses.padding}><Text>Content</Text></View>;
 * }
 *
 * // For text detail, use useTextDetail instead
 * function TextComponent() {
 *   const { getText } = useTextDetail();
 *   return <Text>{getText("welcome")}</Text>;
 * }
 * ```
 *
 * @throws Error if used outside CognitiveSettingsProvider
 */
export function useCognitiveSettings() {
  const { settings, isLoading, error, _setSettings, _setLoading, _setError } =
    useCognitiveSettingsContext();
  const { user } = useAuthContext();

  /**
   * Revert local state from Firestore (used on write error only).
   * Not exposed; real-time subscription keeps state in sync otherwise.
   */
  const revertFromServer = useCallback(
    async (userId: string) => {
      _setLoading(true);
      _setError(null);
      try {
        const preferences = await userPreferencesService.getUserPreferences(userId);
        _setSettings(preferences);
      } catch (err) {
        console.error('Error loading user preferences:', err);
        _setError(err instanceof Error ? err : new Error('Failed to load preferences'));
        _setSettings(DEFAULT_ACCESSIBILITY_SETTINGS);
      } finally {
        _setLoading(false);
      }
    },
    [_setSettings, _setLoading, _setError]
  );

  /**
   * Subscribe to user preferences for real-time sync (web + mobile).
   * Cleanup on unmount or user change.
   */
  useEffect(() => {
    if (!user?.uid) {
      _setSettings(DEFAULT_ACCESSIBILITY_SETTINGS);
      return;
    }

    _setLoading(true);
    _setError(null);

    const unsubscribe = userPreferencesService.subscribeUserPreferences(
      user.uid,
      (preferences) => {
        _setSettings(preferences);
        _setLoading(false);
        _setError(null);
      },
      (err) => {
        _setError(err);
        _setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid, _setSettings, _setLoading, _setError]);

  /**
   * Update a single setting
   * Automatically syncs with Firestore
   */
  const updateSetting = useCallback(
    async <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
      // Optimistic update for immediate UI feedback
      _setSettings((prev) => ({ ...prev, [key]: value }));

      // Sync with Firestore if user is authenticated
      if (user?.uid) {
        try {
          await userPreferencesService.updateUserPreferences(user.uid, {
            [key]: value,
          });
        } catch (err) {
          console.error('Error syncing setting to Firestore:', err);
          await revertFromServer(user.uid);
        }
      }
    },
    [user?.uid, _setSettings, revertFromServer]
  );

  /**
   * Update multiple settings at once
   * Automatically syncs with Firestore
   */
  const updateSettings = useCallback(
    async (newSettings: Partial<UserPreferences>) => {
      // Optimistic update for immediate UI feedback
      _setSettings((prev) => ({ ...prev, ...newSettings }));

      // Sync with Firestore if user is authenticated
      if (user?.uid) {
        try {
          await userPreferencesService.updateUserPreferences(user.uid, newSettings);
        } catch (err) {
          console.error('Error syncing settings to Firestore:', err);
          await revertFromServer(user.uid);
        }
      }
    },
    [user?.uid, _setSettings, revertFromServer]
  );

  /**
   * Reset settings to defaults
   * Automatically syncs with Firestore
   */
  const resetSettings = useCallback(async () => {
    // Optimistic update for immediate UI feedback
    _setSettings(DEFAULT_ACCESSIBILITY_SETTINGS);

    // Sync with Firestore if user is authenticated
    if (user?.uid) {
      try {
        await userPreferencesService.resetUserPreferences(user.uid);
      } catch (err) {
        console.error('Error resetting settings in Firestore:', err);
        await revertFromServer(user.uid);
      }
    }
  }, [user?.uid, _setSettings, revertFromServer]);

  return {
    // State
    settings,
    isLoading,
    error,

    // Operations
    updateSetting,
    updateSettings,
    resetSettings,
  };
}
