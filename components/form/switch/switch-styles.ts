/**
 * Switch Styles - MindEase Mobile
 * Centralized styles for switch component
 * Adapted for React Native / NativeWind
 */

export const styles = {
  container: 'flex flex-row items-start gap-3',
  /** Wraps label + description so they share remaining space and text can wrap */
  content: 'flex flex-col flex-1 min-w-0',
  label: 'font-medium text-text-primary flex-shrink',
  description: 'text-text-secondary mt-0.5 flex-shrink',
} as const;
