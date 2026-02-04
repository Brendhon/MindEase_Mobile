/**
 * Task Column Styles - MindEase Mobile
 * Styles for task column component (section header + card list)
 */

export const styles = {
  column: 'flex flex-col w-full',
  columnHeader: 'flex flex-col gap-0.5 mb-3 pb-2 border-b border-border-subtle',
  columnTitle: 'font-semibold text-text-primary',
  columnCount: 'text-text-secondary font-normal',
  columnContent: 'flex flex-col gap-3',
  columnEmpty: 'flex items-center justify-center py-6',
  columnEmptyText: 'text-text-secondary',
} as const;
