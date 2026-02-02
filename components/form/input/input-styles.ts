/**
 * Input Styles - MindEase Mobile
 * Centralized styles for input component
 * Adapted for React Native / NativeWind
 */

export const styles = {
  container: 'flex flex-col',
  label: 'font-medium text-text-primary',
  field: {
    base: 'px-4 rounded-md border border-border-subtle bg-surface-primary text-text-primary',
    input: 'h-12',
    textarea: 'min-h-24 py-2',
    disabled: 'opacity-50',
  } as const,
  error: 'text-sm text-feedback-error',
} as const;
