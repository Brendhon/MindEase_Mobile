/**
 * Dashboard Styles - MindEase Mobile
 * Centralized styles for dashboard components
 */

export const styles = {
  // Container styles
  container: 'flex flex-col w-full',
  content: 'flex flex-col w-full',

  // Stats cards container
  statsContainer: 'flex flex-row flex-wrap gap-4',
  statsCard: 'flex-1 min-w-[140px]',

  // Error message styles
  error: 'bg-action-danger/10 text-action-danger border border-action-danger rounded-lg p-4',

  // Settings section styles
  settingsContainer: 'flex flex-col gap-4',

  // Reset button container
  resetButtonContainer: 'flex justify-end mt-6',
} as const;
