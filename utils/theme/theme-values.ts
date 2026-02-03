import { UserPreferences } from '@/models/user-preferences';

/**
 * Theme Values - MindEase Mobile
 *
 * Numeric values for inline styles where NativeWind classes don't apply.
 * Used for native components like Drawer, StatusBar, etc.
 *
 * These values complement the Tailwind classes and ensure
 * accessibility settings are respected in native components.
 */

/**
 * Spacing multiplier (1 Tailwind unit = 4px)
 */
const SPACING_UNIT = 4;

/**
 * Get spacing pixel value based on user preference
 *
 * @param spacing - User spacing preference
 * @returns Spacing value in pixels
 *
 * @example
 * ```tsx
 * const spacing = getSpacingPixelValue(settings.spacing);
 * // compact: 8px, normal: 16px, relaxed: 24px
 * ```
 */
export function getSpacingPixelValue(spacing: UserPreferences['spacing']): number {
  switch (spacing) {
    case 'compact':
      return 1 * SPACING_UNIT; // 4px
    case 'relaxed':
      return 4 * SPACING_UNIT; // 16px
    case 'normal':
    default:
      return 3 * SPACING_UNIT; // 12px
  }
}

/**
 * Get font size pixel value based on user preference and context
 *
 * @param fontSize - User font size preference
 * @param context - Size context (sm, base, lg, etc.)
 * @returns Font size in pixels
 *
 * @example
 * ```tsx
 * const size = getFontSizePixelValue(settings.fontSize, 'base');
 * // small: 14px, normal: 16px, large: 18px
 * ```
 */
export function getFontSizePixelValue(
  fontSize: UserPreferences['fontSize'],
  context: 'xs' | 'sm' | 'base' | 'lg' | 'xl' = 'base'
): number {
  // Base font sizes for each context (in pixels)
  const baseSizes = {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
  };

  // Multipliers for each preference
  const multipliers = {
    small: 0.875,
    normal: 1,
    large: 1.125,
  };

  return Math.round(baseSizes[context] * multipliers[fontSize]);
}

/**
 * Get drawer width based on spacing preference
 *
 * @param spacing - User spacing preference
 * @returns Drawer width in pixels
 */
export function getDrawerWidth(spacing: UserPreferences['spacing']): number {
  switch (spacing) {
    case 'compact':
      return 280;
    case 'relaxed':
      return 360;
    case 'normal':
    default:
      return 320;
  }
}

/**
 * Get icon size based on font size preference
 *
 * @param fontSize - User font size preference
 * @returns Icon size in pixels
 */
export function getIconSize(fontSize: UserPreferences['fontSize']): number {
  switch (fontSize) {
    case 'small':
      return 20;
    case 'large':
      return 26;
    case 'normal':
    default:
      return 22;
  }
}

/**
 * Get border radius based on spacing preference
 *
 * @param spacing - User spacing preference
 * @returns Border radius in pixels
 */
export function getBorderRadius(spacing: UserPreferences['spacing']): number {
  switch (spacing) {
    case 'compact':
      return 6;
    case 'relaxed':
      return 12;
    case 'normal':
    default:
      return 8;
  }
}

/**
 * Get toast icon size
 * Main icon size for toast notifications (matches web w-5 h-5 = 20px)
 * Can optionally adjust based on font size preference
 *
 * @param fontSize - Optional font size preference for dynamic sizing
 * @returns Icon size in pixels
 *
 * @example
 * ```tsx
 * const size = getToastIconSize(); // 20px (default)
 * const size = getToastIconSize('large'); // 22px (adjusted)
 * ```
 */
export function getToastIconSize(fontSize?: UserPreferences['fontSize']): number {
  const baseSize = 20; // w-5 h-5 equivalent

  if (!fontSize) {
    return baseSize;
  }

  // Slight adjustment based on font size preference
  switch (fontSize) {
    case 'small':
      return 18;
    case 'large':
      return 22;
    case 'normal':
    default:
      return baseSize;
  }
}

/**
 * Get toast dismiss icon size
 * Dismiss button icon size (matches web w-4 h-4 = 16px)
 * Can optionally adjust based on font size preference
 *
 * @param fontSize - Optional font size preference for dynamic sizing
 * @returns Icon size in pixels
 *
 * @example
 * ```tsx
 * const size = getToastDismissIconSize(); // 16px (default)
 * const size = getToastDismissIconSize('large'); // 18px (adjusted)
 * ```
 */
export function getToastDismissIconSize(fontSize?: UserPreferences['fontSize']): number {
  const baseSize = 16; // w-4 h-4 equivalent

  if (!fontSize) {
    return baseSize;
  }

  // Slight adjustment based on font size preference
  switch (fontSize) {
    case 'small':
      return 14;
    case 'large':
      return 18;
    case 'normal':
    default:
      return baseSize;
  }
}
