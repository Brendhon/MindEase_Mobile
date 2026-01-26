import { UserPreferences } from '@/models/user-preferences';

/**
 * Button Styles - MindEase Mobile
 * Centralized styles and utility functions for button components
 * Adapted for React Native / NativeWind
 */

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'warning';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Variant styles mapping
 * Uses low-stimulation colors for cognitive accessibility
 */
export const variantStyles: Record<
  ButtonVariant,
  { base: string; pressed: string; textColor: string }
> = {
  primary: {
    base: 'bg-action-primary',
    pressed: 'bg-action-primary-hover',
    textColor: 'text-text-inverse',
  },
  secondary: {
    base: 'bg-action-secondary',
    pressed: 'bg-action-secondary-hover',
    textColor: 'text-text-inverse',
  },
  danger: {
    base: 'bg-action-danger',
    pressed: 'bg-action-danger-hover',
    textColor: 'text-text-inverse',
  },
  ghost: {
    base: 'bg-transparent',
    pressed: 'bg-bg-tertiary',
    textColor: 'text-text-primary',
  },
  warning: {
    base: 'bg-action-warning',
    pressed: 'bg-action-warning-hover',
    textColor: 'text-text-inverse',
  },
} as const;

/**
 * Size styles mapping
 * Provides adequate touch targets for accessibility
 */
export const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 rounded-sm',
  md: 'px-4 py-3 rounded-md',
  lg: 'px-6 py-4 rounded-lg',
} as const;

/**
 * Icon size mapping
 */
export const iconSizes: Record<ButtonSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

/**
 * Base button styles
 */
export const baseStyles = {
  container: 'flex-row items-center justify-center',
  disabled: 'opacity-50',
} as const;

/**
 * Get size classes for button
 * Combines padding and border radius based on size prop
 *
 * @param size - Button size (sm, md, lg)
 * @returns Tailwind classes string
 */
export function getSizeClasses(size: ButtonSize): string {
  return sizeStyles[size];
}

/**
 * Get contrast-aware classes for button
 *
 * Note: This is button-specific logic that extends the base contrast classes
 * with variant-specific borders for high contrast mode.
 *
 * @param contrast - Contrast mode from user preferences
 * @param variant - Button variant
 * @returns Tailwind classes string for contrast styling
 */
export function getContrastClasses(
  contrast: UserPreferences['contrast'],
  variant: ButtonVariant
): string {
  if (contrast === 'high') {
    // High contrast: add thicker borders for better visibility
    const borderClasses: Record<ButtonVariant, string> = {
      primary: 'border-2 border-action-primary',
      secondary: 'border-2 border-border-strong',
      ghost: 'border-2 border-text-primary',
      danger: 'border-2 border-action-danger',
      warning: 'border-2 border-action-warning',
    };
    return `${borderClasses[variant]} transition-colors duration-150`;
  }

  // Normal contrast: standard transitions
  return 'transition-colors duration-150';
}
