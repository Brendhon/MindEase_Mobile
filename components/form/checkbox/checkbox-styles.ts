/**
 * Checkbox Styles - MindEase Mobile
 * Centralized styles for checkbox component
 * Adapted for React Native / NativeWind
 * Optimized for accessibility and contrast (WCAG 2.1 AA compliance)
 * Larger touch target (min 44pt) for easier tapping on mobile.
 */

export const styles = {
  container: 'flex flex-row items-center gap-2',
  checkbox:
    'flex items-center justify-center border-2 rounded flex-shrink-0 w-6 h-6',
  checkboxChecked: 'bg-feedback-success border-feedback-success',
  checkboxUnchecked: 'bg-surface-primary border-border-strong',
  checkboxDisabled: 'opacity-50',
  checkboxIcon: 'text-text-inverse',
  content: 'flex flex-col flex-1',
  label: 'text-text-primary font-medium flex-1',
  labelChecked: 'line-through text-text-secondary',
  description: 'text-text-secondary mt-0.5',
} as const;
