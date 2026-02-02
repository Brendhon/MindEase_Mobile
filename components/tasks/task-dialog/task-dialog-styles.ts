/**
 * TaskDialog Styles - MindEase Mobile
 * Layout for task creation/edit modal form (NativeWind)
 */

export const styles = {
  form: 'flex flex-col',
  checklistSection: 'flex flex-col',
  checklistHeader: 'flex flex-row items-center justify-between mb-2',
  checklist: 'flex flex-col',
  checklistItem: 'flex flex-row items-center gap-2',
  actions: 'flex flex-row justify-end gap-2 mt-4',
  modalContent: 'flex-1 bg-surface-primary',
  header: 'flex flex-row items-center justify-between border-b border-border-subtle',
  headerTitle: 'font-semibold text-lg text-text-primary',
  scrollContent: 'flex-grow',
} as const;
