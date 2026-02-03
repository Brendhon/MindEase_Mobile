/**
 * Profile Styles - MindEase Mobile
 * Centralized styles for profile components
 */

export const styles = {
  // Container styles
  container: 'flex flex-col w-full max-w-4xl mx-auto',

  // Error message styles
  error: 'text-action-danger text-center',

  // Card styles
  infoCard: 'flex flex-col items-center gap-6',
  avatarSection: 'flex-shrink-0',
  infoSection: 'flex flex-col gap-4 flex-1',

  // Info row styles
  infoRow: 'flex flex-col gap-1.5',
  label: 'text-text-secondary font-medium text-sm',
  value: 'text-text-primary font-normal break-words',

  // Avatar styles
  avatarContainer: 'flex justify-center',
  avatar: 'rounded-full w-24 h-24 border-2 shadow-md',
  initialsContainer: 'rounded-full w-24 h-24 flex items-center justify-center border-2 shadow-md',
  initialsText: 'text-text-inverse font-semibold text-2xl leading-none',

  // Actions styles
  actions: 'flex justify-end gap-3',
} as const;
