/**
 * Task Card Styles - MindEase Mobile
 * Styles for task card and related components (actions, timer)
 */

export const styles = {
  // Keep ring-2 on card from first render to avoid css-interop "upgrade" when adding ring
  // after focus start (which triggers stringify(originalProps) and NavigationStateContext error)
  card: 'm-0 ring-2 ring-transparent',
  cardActive: 'ring-action-primary',
  cardDone: 'opacity-60',
  headerRow: 'flex flex-row items-center justify-between gap-3',
  title: 'font-semibold text-text-primary flex-1',
  status: 'px-2 py-1 rounded text-xs font-medium',
  statusTodo: 'bg-action-info/10 text-action-info',
  statusInProgress: 'bg-action-primary/10 text-action-primary',
  statusDone: 'bg-action-success/10 text-action-success',
  description: 'text-text-secondary mt-2',
  progressText: 'text-text-secondary text-sm my-2',
  actions: 'flex flex-col gap-2 mt-3',
  editActions: 'flex flex-row gap-2',
  actionButton: 'flex-1',

  // Timer styles (focus/break on card)
  timerIndicator: 'flex flex-col gap-1 mb-4 p-3 rounded-lg border',
  focusTimer: 'bg-action-primary/5 border-action-primary/20',
  breakTimer: 'bg-action-warning/5 border-action-warning/30',
  timerLabel: 'text-text-secondary',
  timerValue: 'font-semibold',
  focusTimerValue: 'text-action-primary',
  breakTimerValue: 'text-action-secondary',
  timerStatus: 'text-text-secondary italic',
} as const;
