import { useCallback, useEffect, useRef } from 'react';

import { useCognitiveSettingsContext } from '@/contexts/cognitive-settings';
import { useAuthContext } from '@/contexts/auth';
import {
  UserPreferences,
  DEFAULT_ACCESSIBILITY_SETTINGS,
} from '@/models/user-preferences';
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
 * - Automatic loading when user authenticates
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

  // Track if settings have been loaded for current user
  const loadedForUserRef = useRef<string | null>(null);

  /**
   * Load settings from Firestore
   * Called automatically when user authenticates
   */
  const loadSettings = useCallback(
    async (userId?: string) => {
      const targetUserId = userId || user?.uid;

      if (!targetUserId) {
        // No user, use defaults
        _setSettings(DEFAULT_ACCESSIBILITY_SETTINGS);
        return;
      }

      _setLoading(true);
      _setError(null);

      try {
        const preferences =
          await userPreferencesService.getUserPreferences(targetUserId);

        _setSettings(preferences);
        loadedForUserRef.current = targetUserId;
      } catch (err) {
        console.error('Error loading user preferences:', err);
        _setError(
          err instanceof Error ? err : new Error('Failed to load preferences')
        );
        // Fallback to defaults on error
        _setSettings(DEFAULT_ACCESSIBILITY_SETTINGS);
      } finally {
        _setLoading(false);
      }
    },
    [user?.uid, _setSettings, _setLoading, _setError]
  );

  /**
   * Auto-load settings when user changes
   * This ensures the UI is updated with user preferences when they log in
   */
  useEffect(() => {
    // Skip if already loaded for this user
    if (user?.uid && loadedForUserRef.current === user.uid) {
      return;
    }

    // Reset loaded ref when user changes
    if (!user?.uid) {
      loadedForUserRef.current = null;
      _setSettings(DEFAULT_ACCESSIBILITY_SETTINGS);
      return;
    }

    // Load settings for new user
    loadSettings(user.uid);
  }, [user?.uid, loadSettings, _setSettings]);

  /**
   * Update a single setting
   * Automatically syncs with Firestore
   */
  const updateSetting = useCallback(
    async <K extends keyof UserPreferences>(
      key: K,
      value: UserPreferences[K]
    ) => {
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
          // Revert on error by reloading from Firestore
          await loadSettings(user.uid);
        }
      }
    },
    [user?.uid, _setSettings, loadSettings]
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
          await userPreferencesService.updateUserPreferences(
            user.uid,
            newSettings
          );
        } catch (err) {
          console.error('Error syncing settings to Firestore:', err);
          // Revert on error by reloading from Firestore
          await loadSettings(user.uid);
        }
      }
    },
    [user?.uid, _setSettings, loadSettings]
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
        // Revert on error by reloading from Firestore
        await loadSettings(user.uid);
      }
    }
  }, [user?.uid, _setSettings, loadSettings]);

  return {
    // State
    settings,
    isLoading,
    error,

    // Operations
    loadSettings,
    updateSetting,
    updateSettings,
    resetSettings,
  };
}
