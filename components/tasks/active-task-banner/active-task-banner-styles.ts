/**
 * Active Task Banner Styles - MindEase Mobile
 * Styles for active task indicator banner (below header when focus/break is active)
 */

export const styles = {
  banner: 'flex-row items-center gap-3 border-b border-border-subtle bg-surface-secondary px-4 py-3 active:bg-bg-tertiary',
  bannerIconWrapper: 'flex-shrink-0',
  bannerContent: 'min-w-0 flex-1 flex-col',
  bannerTitle: 'font-medium text-text-primary',
  bannerStatus: 'text-text-muted',
  bannerTime: 'flex-shrink-0 font-semibold text-text-secondary',
} as const;
