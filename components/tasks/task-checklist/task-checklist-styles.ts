/**
 * Task Checklist Styles - MindEase Mobile
 * Styles for task checklist and checklist item components
 */

export const styles = {
  checklistContainer: 'flex flex-col gap-2',
  checklistProgress: 'text-text-secondary mb-2',
  checklistList: 'flex flex-col gap-6',
  checklistItem: 'flex flex-row items-start gap-2',
  checklistItemCompleted: 'opacity-60',
  checklistItemNonInteractive: 'opacity-70',
  checklistCheckboxWrapper: 'flex-1',
  checklistCheckboxNonInteractive: 'opacity-100',
  checklistHint: 'text-text-secondary italic mt-2',
} as const;
