/**
 * Select Styles - MindEase Mobile
 * Centralized styles for select component
 * Adapted for React Native / NativeWind
 */

export const styles = {
  container: 'flex flex-col',
  label: 'font-medium text-text-primary',
  field: {
    base: 'px-4 py-3 rounded-md border border-border-subtle bg-surface-primary text-text-primary',
    disabled: 'opacity-50',
  } as const,
  error: 'text-sm text-feedback-error',
} as const;
