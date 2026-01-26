/**
 * Theme Colors - MindEase Mobile
 *
 * Centralized color constants extracted from tailwind.config.js.
 * Used for inline styles where NativeWind classes don't apply
 * (e.g., Drawer options, StatusBar, native components).
 *
 * These values mirror the design tokens defined in tailwind.config.js
 * to ensure visual consistency across the app.
 *
 * @example
 * ```tsx
 * import { THEME_COLORS } from '@/utils/theme';
 *
 * <View style={{ backgroundColor: THEME_COLORS.surfacePrimary }}>
 *   <Text style={{ color: THEME_COLORS.textPrimary }}>Hello</Text>
 * </View>
 * ```
 */
export const THEME_COLORS = {
  // Backgrounds
  bgPrimary: '#f9fafb',
  bgSecondary: '#f3f4f6',
  bgTertiary: '#e5e7eb',

  // Surfaces
  surfacePrimary: '#ffffff',
  surfaceSecondary: '#f9fafb',

  // Borders
  borderSubtle: '#e5e7eb',
  borderStrong: '#d1d5db',

  // Text
  textWhite: '#ffffff',
  textPrimary: '#111827',
  textSecondary: '#374151',
  textMuted: '#6b7280',
  textInverse: '#f9fafb',

  // Actions
  actionPrimary: '#2563eb',
  actionPrimaryHover: '#1d4ed8',
  actionSecondary: '#475569',
  actionSecondaryHover: '#334155',
  actionDanger: '#dc2626',
  actionDangerHover: '#b91c1c',
  actionWarning: '#d97706',
  actionWarningHover: '#b45309',

  // Feedback colors
  feedbackSuccess: '#16a34a',
  feedbackError: '#dc2626',
  feedbackWarning: '#d97706',
  feedbackInfo: '#0284c7',
} as const;

/**
 * Type for THEME_COLORS keys
 */
export type ThemeColorKey = keyof typeof THEME_COLORS;

/**
 * Type for THEME_COLORS values
 */
export type ThemeColorValue = (typeof THEME_COLORS)[ThemeColorKey];

/**
 * Toast type for feedback colors
 */
export type FeedbackType = 'success' | 'error' | 'warning' | 'info';

/**
 * Get feedback color classes for toast type
 * Returns Tailwind classes for background, text, and icon colors
 *
 * @param type - Toast/feedback type
 * @returns Object with Tailwind class names
 *
 * @example
 * ```tsx
 * const colors = getFeedbackColorClasses('success');
 * // { bgColor: 'bg-feedback-success', textColor: 'text-white', iconColor: 'text-white' }
 * ```
 */
export function getFeedbackColorClasses(type: FeedbackType): {
  bgColor: string;
  textColor: string;
  iconColor: string;
} {
  switch (type) {
    case 'success':
      return {
        bgColor: 'bg-feedback-success',
        textColor: 'text-white',
        iconColor: 'text-white',
      };
    case 'error':
      return {
        bgColor: 'bg-feedback-error',
        textColor: 'text-white',
        iconColor: 'text-white',
      };
    case 'warning':
      return {
        bgColor: 'bg-feedback-warning',
        textColor: 'text-white',
        iconColor: 'text-white',
      };
    case 'info':
    default:
      return {
        bgColor: 'bg-feedback-info',
        textColor: 'text-white',
        iconColor: 'text-white',
      };
  }
}

/**
 * Get feedback color hex value for toast type
 * Returns hexadecimal color values for inline styles
 *
 * @param type - Toast/feedback type
 * @returns Object with hex color values
 *
 * @example
 * ```tsx
 * const colors = getFeedbackColorValues('success');
 * // { bgColor: '#16a34a', textColor: '#ffffff', iconColor: '#ffffff' }
 * ```
 */
export function getFeedbackColorValues(type: FeedbackType): {
  bgColor: string;
  textColor: string;
  iconColor: string;
} {
  switch (type) {
    case 'success':
      return {
        bgColor: THEME_COLORS.feedbackSuccess,
        textColor: THEME_COLORS.textWhite,
        iconColor: THEME_COLORS.textWhite,
      };
    case 'error':
      return {
        bgColor: THEME_COLORS.feedbackError,
        textColor: THEME_COLORS.textWhite,
        iconColor: THEME_COLORS.textWhite,
      };
    case 'warning':
      return {
        bgColor: THEME_COLORS.feedbackWarning,
        textColor: THEME_COLORS.textWhite,
        iconColor: THEME_COLORS.textWhite,
      };
    case 'info':
    default:
      return {
        bgColor: THEME_COLORS.feedbackInfo,
        textColor: THEME_COLORS.textWhite,
        iconColor: THEME_COLORS.textWhite,
      };
  }
}
