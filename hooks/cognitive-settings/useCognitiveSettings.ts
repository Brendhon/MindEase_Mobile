import { useCallback } from 'react';

import { useCognitiveSettingsContext } from '@/contexts/cognitive-settings';
import {
  UserPreferences,
  DEFAULT_ACCESSIBILITY_SETTINGS,
} from '@/models/user-preferences';

/**
 * useCognitiveSettings Hook - MindEase Mobile
 *
 * Centralized hook for managing cognitive accessibility settings.
 *
 * This hook handles:
 * - CRUD operations for settings
 * - State management
 * - Loading and error handling
 *
 * For Tailwind classes generation, use `useAccessibilityClasses` hook instead.
 * For text detail helpers, use `useTextDetail` hook instead.
 * This separation reduces unnecessary re-renders and improves performance.
 *
 * Note: Firebase/Firestore sync to be implemented when auth is ready.
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

  /**
   * Load settings from storage
   * TODO: Implement AsyncStorage/Firestore sync when auth is ready
   */
  const loadSettings = useCallback(async () => {
    _setLoading(true);
    _setError(null);

    try {
      // TODO: Load from AsyncStorage or Firestore when implemented
      // For now, just use default settings
      _setSettings(DEFAULT_ACCESSIBILITY_SETTINGS);
    } catch (err) {
      console.error('Error loading user preferences:', err);
      _setError(
        err instanceof Error ? err : new Error('Failed to load preferences')
      );
    } finally {
      _setLoading(false);
    }
  }, [_setSettings, _setLoading, _setError]);

  /**
   * Update a single setting
   * Automatically syncs with local state (Firestore sync to be added)
   */
  const updateSetting = useCallback(
    async <K extends keyof UserPreferences>(
      key: K,
      value: UserPreferences[K]
    ) => {
      // Optimistic update
      _setSettings((prev) => ({ ...prev, [key]: value }));

      // TODO: Sync with AsyncStorage/Firestore when auth is implemented
    },
    [_setSettings]
  );

  /**
   * Update multiple settings at once
   */
  const updateSettings = useCallback(
    async (newSettings: Partial<UserPreferences>) => {
      // Optimistic update
      _setSettings((prev) => ({ ...prev, ...newSettings }));

      // TODO: Sync with AsyncStorage/Firestore when auth is implemented
    },
    [_setSettings]
  );

  /**
   * Reset settings to defaults
   */
  const resetSettings = useCallback(async () => {
    // Optimistic update
    _setSettings(DEFAULT_ACCESSIBILITY_SETTINGS);

    // TODO: Sync with AsyncStorage/Firestore when auth is implemented
  }, [_setSettings]);

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
