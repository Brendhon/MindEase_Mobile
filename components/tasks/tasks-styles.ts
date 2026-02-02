/**
 * Tasks Styles - MindEase Mobile
 * Centralized styles for tasks components
 */

export const styles = {
  // Container styles
  container: 'flex flex-col w-full',
  content: 'flex flex-col w-full',

  // Error message styles
  error: 'bg-action-danger/10 border border-action-danger rounded-lg p-4',
  errorText: 'text-action-danger',

  // Loading styles
  loadingContainer: 'flex items-center justify-center py-12',
  loadingText: 'text-text-secondary',

  // Toolbar styles
  toolbarContainer: 'flex justify-end',

  // Task list styles
  listContainer: 'flex flex-col w-full mb-10',
  emptyContainer: 'flex flex-col items-center justify-center py-12',
  emptyText: 'text-text-primary font-semibold mb-2',
  emptyDescription: 'text-text-secondary',

  // Task column styles
  column: 'flex flex-col w-full',
  columnHeader: 'flex flex-row items-center justify-between mb-3 pb-2 border-b border-border-subtle',
  columnTitle: 'font-semibold text-text-primary',
  columnCount: 'px-2 py-1 rounded-full bg-action-info/10 text-action-info font-medium min-w-[2rem] text-center',
  columnContent: 'flex flex-col gap-3',
  columnEmpty: 'flex items-center justify-center py-6',
  columnEmptyText: 'text-text-secondary',

  // Task card styles
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

  // Checklist styles
  checklistContainer: 'flex flex-col gap-2',
  checklistProgress: 'text-text-secondary mb-2',
  checklistList: 'flex flex-col gap-2',
  checklistItem: 'flex flex-row items-center gap-2',
  checklistItemCompleted: 'opacity-60',
  checklistItemNonInteractive: 'opacity-70',
  checklistHint: 'text-text-secondary italic mt-2',
} as const;
