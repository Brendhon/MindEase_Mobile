/**
 * Task Checklist Styles - MindEase Mobile
 * Styles for task checklist and checklist item components
 */

export const styles = {
  checklistContainer: 'flex flex-col gap-2',
  checklistProgress: 'text-text-secondary mb-2',
  checklistList: 'flex flex-col gap-2',
  checklistItem: 'flex flex-row items-center gap-2',
  checklistItemCompleted: 'opacity-60',
  checklistItemNonInteractive: 'opacity-70',
  checklistHint: 'text-text-secondary italic mt-2',
} as const;
