/**
 * Tasks Content Styles - MindEase Mobile
 * Styles for tasks page content: container, error, loading, toolbar
 */

export const styles = {
  container: 'flex flex-col w-full',
  content: 'flex flex-col w-full',
  error: 'bg-action-danger/10 border border-action-danger rounded-lg p-4',
  errorText: 'text-action-danger',
  loadingContainer: 'flex items-center justify-center py-12',
  loadingText: 'text-text-secondary',
  toolbarContainer: 'flex justify-end',
} as const;
