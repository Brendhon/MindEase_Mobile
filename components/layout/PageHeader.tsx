import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import type { AccessibilityTextKey } from '@/utils/accessibility';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

/**
 * PageHeader Component - MindEase Mobile
 * Reusable page header with title and description
 * Automatically applies accessibility settings (fontSize)
 *
 * Uses standardized sizes:
 * - Title: 2xl (responsive to user fontSize preference)
 * - Description: base (responsive to user fontSize preference)
 *
 * @example
 * ```tsx
 * <PageHeader
 *   titleKey="dashboard_title"
 *   descriptionKey="dashboard_description"
 * />
 * ```
 */
export interface PageHeaderProps {
  /** Description text key for accessibility text system */
  descriptionKey: AccessibilityTextKey;

  /** Custom className */
  className?: string;

  /** Test ID for testing */
  testID?: string;
}

export function PageHeader({
  descriptionKey,
  className = '',
  testID,
}: PageHeaderProps) {
  const { getText } = useTextDetail();
  const { fontSizeClasses } = useAccessibilityClasses();

  // Generate description classes with standardized base size
  const descriptionClasses = useMemo(
    () => `${styles.description} ${fontSizeClasses.base}`,
    [fontSizeClasses]
  );

  // Generate header classes
  const headerClasses = `${styles.header} ${className}`;

  // Generate test IDs
  const pTestID = testID
    ? `${testID}-description`
    : 'page-header-description';

  return (
    <View className={headerClasses} testID={testID || 'page-header'}>
      <Text className={descriptionClasses} testID={pTestID}>
        {getText(descriptionKey)}
      </Text>
    </View>
  );
}

PageHeader.displayName = 'PageHeader';

/**
 * PageHeader Styles - MindEase Mobile
 * Centralized styles for PageHeader component
 */
const styles = {
  header: 'flex flex-col',
  description: 'text-text-secondary leading-relaxed mt-2',
} as const;