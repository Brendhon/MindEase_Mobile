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
  textPrimary: '#111827',
  textSecondary: '#374151',
  textMuted: '#6b7280',
  textInverse: '#f9fafb',

  // Actions
  actionPrimary: '#2563eb',
  actionPrimaryHover: '#1d4ed8',
  actionDanger: '#dc2626',
  actionDangerHover: '#b91c1c',
} as const;

/**
 * Type for THEME_COLORS keys
 */
export type ThemeColorKey = keyof typeof THEME_COLORS;

/**
 * Type for THEME_COLORS values
 */
export type ThemeColorValue = (typeof THEME_COLORS)[ThemeColorKey];
