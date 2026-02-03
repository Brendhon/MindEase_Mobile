/**
 * Tailwind Classes Utilities - MindEase Mobile
 * Dynamic Tailwind class generation for accessibility settings
 *
 * Note: Adapted for React Native/NativeWind.
 * Some web-only classes have been removed or modified.
 */
import { UserPreferences } from '@/models/user-preferences';

/**
 * Get Tailwind classes for contrast settings
 * Note: React Native doesn't support CSS filters like contrast-more/less
 * This is kept for future implementation with custom styling
 *
 * @param contrast - Contrast mode (normal, high, low)
 * @returns Contrast mode string for conditional styling
 */
export function getContrastClasses(contrast: UserPreferences['contrast']): string {
  // React Native doesn't support CSS contrast filters
  // Return empty string - contrast is handled via theme switching
  return '';
}

/**
 * Get text color classes based on contrast mode
 * Ensures adequate contrast for readability
 *
 * @param contrast - Contrast mode (normal, high, low)
 * @param variant - Text variant (primary, secondary, muted)
 * @returns Tailwind classes string for text color
 */
export function getTextContrastClasses(
  contrast: UserPreferences['contrast'],
  variant: 'primary' | 'secondary' | 'muted' = 'primary'
): string {
  switch (contrast) {
    case 'high':
      switch (variant) {
        case 'primary':
          return 'text-text-primary';
        case 'secondary':
          return 'text-text-primary';
        case 'muted':
          return 'text-text-secondary';
        default:
          return 'text-text-primary';
      }
    case 'low':
      switch (variant) {
        case 'primary':
          return 'text-text-secondary';
        case 'secondary':
          return 'text-text-muted';
        case 'muted':
          return 'text-text-muted opacity-75';
        default:
          return 'text-text-secondary';
      }
    case 'normal':
    default:
      switch (variant) {
        case 'primary':
          return 'text-text-primary';
        case 'secondary':
          return 'text-text-secondary';
        case 'muted':
          return 'text-text-muted';
        default:
          return 'text-text-primary';
      }
  }
}

/**
 * Get border color classes based on contrast mode
 *
 * @param contrast - Contrast mode (normal, high, low)
 * @param variant - Border variant (subtle, strong)
 * @returns Tailwind classes string for border color
 */
export function getBorderContrastClasses(
  contrast: UserPreferences['contrast'],
  variant: 'subtle' | 'strong' = 'subtle'
): string {
  switch (contrast) {
    case 'high':
      return 'border-border-strong';
    case 'low':
      return 'border-border-subtle opacity-60';
    case 'normal':
    default:
      return variant === 'strong' ? 'border-border-strong' : 'border-border-subtle';
  }
}

/**
 * Get Tailwind classes for spacing settings
 * Returns padding and gap classes that can be applied to containers
 *
 * @param spacing - Spacing mode (normal, compact, relaxed)
 * @returns Object with different spacing class types
 */
export function getSpacingClasses(spacing: UserPreferences['spacing']): {
  padding: string;
  gap: string;
  margin: string;
  marginBottom: string;
} {
  switch (spacing) {
    case 'compact':
      return {
        padding: 'p-2',
        gap: 'gap-2',
        margin: 'm-2',
        marginBottom: 'mb-2',
      };
    case 'relaxed':
      return {
        padding: 'p-6',
        gap: 'gap-6',
        margin: 'm-6',
        marginBottom: 'mb-6',
      };
    case 'normal':
    default:
      return {
        padding: 'p-4',
        gap: 'gap-4',
        margin: 'm-4',
        marginBottom: 'mb-4',
      };
  }
}

/**
 * Get individual spacing value for specific use cases
 *
 * @param spacing - Spacing mode
 * @returns Spacing value (2, 4, or 6)
 */
export function getSpacingValue(spacing: UserPreferences['spacing']): number {
  switch (spacing) {
    case 'compact':
      return 2;
    case 'relaxed':
      return 6;
    case 'normal':
    default:
      return 4;
  }
}

/**
 * Get Tailwind classes for font size settings
 *
 * @param fontSize - Font size mode (normal, small, large)
 * @returns Object with text size classes for different contexts
 */
export function getFontSizeClasses(fontSize: UserPreferences['fontSize']): {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
} {
  switch (fontSize) {
    case 'small':
      return {
        xs: 'text-[10px]',
        sm: 'text-xs',
        base: 'text-sm',
        lg: 'text-md',
        xl: 'text-lg',
        '2xl': 'text-xl',
        '3xl': 'text-2xl',
      };
    case 'large':
      return {
        xs: 'text-sm',
        sm: 'text-md',
        base: 'text-lg',
        lg: 'text-xl',
        xl: 'text-2xl',
        '2xl': 'text-3xl',
        '3xl': 'text-4xl',
      };
    case 'normal':
    default:
      return {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-md',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
      };
  }
}

/**
 * Get animation setting for components
 * Note: In React Native, animations are controlled via react-native-reanimated
 * This returns a boolean indicating if animations should be enabled
 *
 * @param animations - Whether animations are enabled
 * @returns Animation enabled state
 */
export function getAnimationsEnabled(animations: boolean): boolean {
  return animations;
}

/**
 * Get Tailwind classes for focus mode
 * In mobile, focus mode adds visual emphasis to focused elements
 *
 * @param focusMode - Whether focus mode is enabled
 * @returns Focus mode classes (for container emphasis)
 */
export function getFocusModeClasses(focusMode: boolean): string {
  if (focusMode) {
    return 'border-2 border-action-primary';
  }
  return '';
}

/**
 * Combine all accessibility classes for a component
 * Convenience function that applies all accessibility settings at once
 *
 * @param settings - User preferences
 * @param context - Font size context
 * @returns Combined classes string
 */
export function getCombinedAccessibilityClasses(
  settings: UserPreferences,
  context: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' = 'base'
): string {
  const fontSize = getFontSizeClasses(settings.fontSize)[context];
  const focusMode = getFocusModeClasses(settings.focusMode);

  return [fontSize, focusMode].filter(Boolean).join(' ');
}
