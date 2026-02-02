import { useAccessibilityClasses } from '@/hooks/accessibility';
import React from 'react';
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

export function PageScrollView({
  children,
  className = '',
  testID,
}: PageScrollViewProps) {
  const { spacingClasses } = useAccessibilityClasses();

  const scrollClassName = `${styles.container} ${spacingClasses.padding} ${className}`.trim();

  return (
    <ScrollView
      className={scrollClassName}
      contentContainerStyle={styles.contentContainer}
      testID={testID}
    >
      {children}
    </ScrollView>
  );
}

PageScrollView.displayName = 'PageScrollView';

/**
 * PageScrollView Styles - MindEase Mobile
 * Centralized styles for PageScrollView component
 */
const styles = {
  container: 'flex-1 bg-bg-secondary',
  contentContainer: { flexGrow: 1 } as const,
} as const;
