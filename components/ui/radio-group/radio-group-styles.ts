/**
 * RadioGroup Styles - MindEase Mobile
 * Centralized styles for radio group component
 * Adapted for React Native / NativeWind
 */

export const styles = {
  container: 'flex flex-col',
  header: 'flex flex-col mb-2',
  label: 'font-medium text-text-primary',
  description: 'text-text-secondary mt-1',
  options: 'flex flex-col',
  option:
    'relative flex rounded-lg border-2 transition-colors duration-150',
  optionChecked: 'border-action-primary bg-action-primary/5',
  optionUnchecked:
    'border-border-subtle bg-surface-primary',
  optionDisabled: 'opacity-50',
  optionContent: 'flex flex-row items-start gap-3 w-full',
  radio:
    'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-border-subtle transition-colors duration-150',
  radioChecked: 'border-action-primary',
  radioDot: 'h-2.5 w-2.5 rounded-full bg-action-primary',
  optionText: 'flex flex-col flex-1',
  optionLabel: 'font-medium text-text-primary',
  optionDescription: 'text-text-secondary mt-0.5',
} as const;
