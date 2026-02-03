/**
 * Task Column Styles - MindEase Mobile
 * Styles for task column component (section header + card list)
 */

export const styles = {
  column: 'flex flex-col w-full',
  columnHeader:
    'flex flex-row items-center justify-between mb-3 pb-2 border-b border-border-subtle',
  columnTitle: 'font-semibold text-text-primary',
  columnCount:
    'px-2 py-1 rounded-full bg-action-info/10 text-action-info font-medium min-w-[2rem] text-center',
  columnContent: 'flex flex-col gap-3',
  columnEmpty: 'flex items-center justify-center py-6',
  columnEmptyText: 'text-text-secondary',
} as const;
