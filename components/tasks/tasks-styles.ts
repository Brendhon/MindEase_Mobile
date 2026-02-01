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
  listContainer: 'flex flex-col w-full',
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
  card: 'm-0',
  cardDone: 'opacity-60',
  headerRow: 'flex flex-row items-center justify-between gap-3',
  title: 'font-semibold text-text-primary flex-1',
  status: 'px-2 py-1 rounded text-xs font-medium',
  statusTodo: 'bg-action-info/10 text-action-info',
  statusInProgress: 'bg-action-primary/10 text-action-primary',
  statusDone: 'bg-action-success/10 text-action-success',
  description: 'text-text-secondary mt-2',
  progressText: 'text-text-secondary text-sm mt-1',
  actions: 'flex flex-row flex-wrap items-center gap-2 mt-3',
} as const;
