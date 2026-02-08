/**
 * Task List Styles - MindEase Mobile
 * Styles for task list component (empty state + columns container)
 */

export const styles = {
  listContainer: 'flex flex-col w-full mb-10',
  emptyContainer: 'flex flex-col items-center justify-center py-12',
  emptyText: 'text-text-primary font-semibold mb-2',
  emptyDescription: 'text-text-secondary',
  searchContainer: 'flex flex-row items-center relative mt-2 w-full',
  searchInput: 'w-full',
  clearButton: 'absolute right-3 p-1 flex items-center justify-center',
} as const;
