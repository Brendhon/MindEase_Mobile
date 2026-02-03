import { useMemo, useCallback } from 'react';

import { useCognitiveSettingsContext } from '@/contexts/cognitive-settings';
import type { UserPreferences } from '@/models/user-preferences';
import {
  getCombinedAccessibilityClasses,
  getContrastClasses,
  getFocusModeClasses,
  getFontSizeClasses,
  getSpacingClasses,
  getSpacingValue,
  getAnimationsEnabled,
} from '@/utils/accessibility';

/**
 * useAccessibilityClasses Hook - MindEase Mobile
 *
 * Optimized hook for generating accessibility Tailwind classes.
 *
 * This hook is separated from useCognitiveSettings to:
 * - Reduce unnecessary re-renders (only re-renders when relevant settings change)
 * - Improve performance (components only subscribe to classes they need)
 * - Better separation of concerns (classes generation vs state management)
 *
 * Each class type is memoized independently, so components only re-render
 * when the specific setting they use changes.
 *
 * @example
 * ```tsx
 * // Component only re-renders when spacing changes
 * function MyComponent() {
 *   const { spacingClasses } = useAccessibilityClasses();
 *   return <View className={spacingClasses.padding}><Text>Content</Text></View>;
 * }
 *
 * // Component only re-renders when fontSize changes
 * function TextComponent() {
 *   const { fontSizeClasses } = useAccessibilityClasses();
 *   return <Text className={fontSizeClasses.base}>Text</Text>;
 * }
 * ```
 *
 * @throws Error if used outside CognitiveSettingsProvider
 */
export function useAccessibilityClasses() {
  const { settings } = useCognitiveSettingsContext();

  // Memoize each class type independently to minimize re-renders
  // Components only re-render when the specific setting they use changes

  const contrastClasses = useMemo(() => getContrastClasses(settings.contrast), [settings]);

  const spacingClasses = useMemo(() => getSpacingClasses(settings.spacing), [settings]);

  const spacingValue = useMemo(() => getSpacingValue(settings.spacing), [settings]);

  const fontSizeClasses = useMemo(() => getFontSizeClasses(settings.fontSize), [settings]);

  const animationsEnabled = useMemo(() => getAnimationsEnabled(settings.animations), [settings]);

  const focusModeClasses = useMemo(() => getFocusModeClasses(settings.focusMode), [settings]);

  // Memoize dynamic class generators to avoid accessing settings during render
  // These functions are only called when needed, not during render
  const getContrastClassesFn = useCallback(
    (contrast?: UserPreferences['contrast']) => getContrastClasses(contrast ?? settings.contrast),
    [settings]
  );

  const getSpacingClassesFn = useCallback(
    (spacing?: UserPreferences['spacing']) => getSpacingClasses(spacing ?? settings.spacing),
    [settings]
  );

  const getSpacingValueFn = useCallback(
    (spacing?: UserPreferences['spacing']) => getSpacingValue(spacing ?? settings.spacing),
    [settings]
  );

  const getFontSizeClassesFn = useCallback(
    (fontSize?: UserPreferences['fontSize']) => getFontSizeClasses(fontSize ?? settings.fontSize),
    [settings]
  );

  const getAnimationsEnabledFn = useCallback(
    (animations?: boolean) => getAnimationsEnabled(animations ?? settings.animations),
    [settings]
  );

  const getFocusModeClassesFn = useCallback(
    (focusMode?: boolean) => getFocusModeClasses(focusMode ?? settings.focusMode),
    [settings]
  );

  const getCombinedClassesFn = useCallback(
    (context: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' = 'base') =>
      getCombinedAccessibilityClasses(settings, context),
    [settings]
  );

  return {
    // Pre-computed classes (re-render only when relevant setting changes)
    contrastClasses,
    spacingClasses,
    spacingValue,
    fontSizeClasses,
    animationsEnabled,
    focusModeClasses,

    // Dynamic class generators (for custom settings)
    getContrastClasses: getContrastClassesFn,
    getSpacingClasses: getSpacingClassesFn,
    getSpacingValue: getSpacingValueFn,
    getFontSizeClasses: getFontSizeClassesFn,
    getAnimationsEnabled: getAnimationsEnabledFn,
    getFocusModeClasses: getFocusModeClassesFn,
    getCombinedClasses: getCombinedClassesFn,
  };
}
