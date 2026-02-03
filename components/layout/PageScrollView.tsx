import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { forwardRef, useMemo } from 'react';
import { ScrollView } from 'react-native';

/**
 * PageScrollView Component - MindEase Mobile
 * Reusable scrollable page container with consistent layout and accessibility spacing.
 *
 * Uses:
 * - flex-1 bg-bg-secondary for container
 * - contentContainerStyle flexGrow: 1 for proper content stretch
 * - spacingClasses.padding from accessibility (responsive to user preferences)
 *
 * Forwards ref to the underlying ScrollView for imperative scroll control (e.g. scrollTo).
 *
 * @example
 * ```tsx
 * <PageScrollView testID="dashboard-page-scroll">
 *   <DashboardContent tasks={tasks} error={error} />
 * </PageScrollView>
 * ```
 */
export interface PageScrollViewProps {
  /** Page content (single or multiple children) */
  children: React.ReactNode;

  /** Optional additional className for the ScrollView */
  className?: string;

  /** Test ID for testing */
  testID?: string;
}

export const PageScrollView = forwardRef<ScrollView, PageScrollViewProps>(function PageScrollView(
  { children, className = '', testID },
  ref
) {
  const { spacingClasses } = useAccessibilityClasses();

  const scrollClassName = useMemo(
    () => `${styles.container} ${spacingClasses.padding} ${className}`.trim(),
    [spacingClasses, className]
  );

  return (
    <ScrollView
      ref={ref}
      className={scrollClassName}
      contentContainerStyle={styles.contentContainer}
      testID={testID}>
      {children}
    </ScrollView>
  );
});

PageScrollView.displayName = 'PageScrollView';

/**
 * PageScrollView Styles - MindEase Mobile
 * Centralized styles for PageScrollView component
 */
const styles = {
  container: 'flex-1 bg-bg-secondary',
  contentContainer: { flexGrow: 1 } as const,
} as const;
