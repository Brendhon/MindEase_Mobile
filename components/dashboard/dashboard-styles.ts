/**
 * Dashboard Styles - MindEase Mobile
 * Centralized styles for dashboard components
 */

export const styles = {
  // Container styles
  container: 'flex flex-col w-full',
  content: 'flex flex-col w-full',

  // Error message styles
  error: 'bg-action-danger/10 text-action-danger border border-action-danger rounded-lg p-4',

  // Settings section styles
  settingsContainer: 'flex flex-col gap-4',

  // Reset button container
  resetButtonContainer: 'flex justify-end mt-6',

  // Cognitive alert banner styles
  cognitiveAlertBanner: {
    banner: 'flex flex-col items-start justify-between gap-3 rounded-lg bg-surface-primary border-2 border-action-warning/50 shadow-md',
    bannerContainer: 'flex flex-row items-start gap-3 flex-1',
    bannerContent: 'flex flex-col flex-1 min-w-0',
    title: 'font-semibold',
    message: 'text-text-secondary mt-1',
    icon: 'flex items-center justify-center',
    dismissButton: 'flex items-center justify-center w-8 h-8 rounded-md active:bg-action-info/20',
  } as const,

  // Dashboard error styles
  dashboardErrorText: 'text-action-danger',

  // Dashboard stats cards styles
  dashboardStatsCards: {
    container: 'flex flex-row flex-wrap gap-4',
    card: 'flex-1 min-w-[140px]',
    cardHeader: 'flex flex-row items-center gap-2',
    title: 'text-sm',
    titleBase: 'text-text-secondary font-medium',
    valueContainer: 'flex items-center mt-2',
    value: 'text-2xl',
    valueBase: 'font-semibold text-text-primary',
  } as const,

  // Interaction settings styles
  interactionSettings: {
    switchContainer: 'flex flex-col',
    timerSettingsContainer: 'flex flex-col',
    selectDescription: 'text-sm text-text-secondary mt-1',
  } as const,
} as const;
