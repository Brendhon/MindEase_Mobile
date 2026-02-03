import { Card } from '@/components/ui/card';
import { useAccessibilityClasses } from '@/hooks/accessibility';
import { THEME_COLORS } from '@/utils/theme/theme-colors';
import { LucideIcon } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { styles } from './dashboard-styles';

/**
 * StatCard Component - MindEase Mobile
 * Individual stat card for dashboard statistics
 */
export interface StatCardProps {
  /** Icon component from lucide-react-native */
  icon: LucideIcon;

  /** Title text */
  title: string;

  /** Value to display */
  value: number;

  /** Title CSS classes */
  titleClasses?: string;

  /** Value CSS classes */
  valueClasses?: string;

  /** Test ID for testing */
  testID?: string;
}

export function StatCard({
  icon: Icon,
  title,
  value,
  titleClasses = '',
  valueClasses = '',
  testID,
}: StatCardProps) {
  const { spacingClasses } = useAccessibilityClasses();

  // Generate card classes with memoization
  const cardClasses = useMemo(
    () => `${styles.dashboardStatsCards.card} ${spacingClasses.gap}`,
    [spacingClasses]
  );

  return (
    <Card className={cardClasses} testID={testID}>
      <Card.Content>
        <View className={styles.dashboardStatsCards.cardHeader}>
          <Icon size={20} color={THEME_COLORS.textSecondary} />
          <Text className={`${styles.dashboardStatsCards.titleBase} ${titleClasses}`}>{title}</Text>
        </View>
        <View className={styles.dashboardStatsCards.valueContainer}>
          <Text className={`${styles.dashboardStatsCards.valueBase} ${valueClasses}`}>{value}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

StatCard.displayName = 'StatCard';
