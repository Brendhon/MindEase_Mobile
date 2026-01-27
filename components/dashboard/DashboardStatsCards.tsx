import { useAccessibilityClasses } from '@/hooks/accessibility';
import { useTextDetail } from '@/hooks/accessibility';
import { Task } from '@/models/task';
import { BarChart3, CheckCircle2, Clock, ListTodo } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { StatCard } from './StatCard';
import { styles } from './dashboard-styles';

/**
 * DashboardStatsCards Component - MindEase Mobile
 * Display task statistics cards (total, pending, in progress, completed)
 */
export interface DashboardStatsCardsProps {
  /** Array of tasks to calculate statistics from */
  tasks: Task[];

  /** Test ID for testing */
  testID?: string;
}

export function DashboardStatsCards({
  tasks,
  testID,
}: DashboardStatsCardsProps) {
  const { getText } = useTextDetail();
  const { fontSizeClasses, spacingClasses } = useAccessibilityClasses();

  // Calculate statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const pending = tasks.filter((task) => task.status === 0).length;
    const inProgress = tasks.filter((task) => task.status === 1).length;
    const completed = tasks.filter((task) => task.status === 2).length;

    return { total, pending, inProgress, completed };
  }, [tasks]);

  const containerClasses = useMemo(
    () => `${styles.statsContainer} ${spacingClasses.gap}`,
    [spacingClasses.gap]
  );

  const titleClasses = useMemo(
    () => `text-sm ${fontSizeClasses.sm}`,
    [fontSizeClasses.sm]
  );

  const valueClasses = useMemo(
    () => `text-2xl ${fontSizeClasses['2xl']}`,
    [fontSizeClasses['2xl']]
  );

  return (
    <View
      className={containerClasses}
      testID={testID || 'dashboard-stats-cards'}
    >
      <StatCard
        icon={BarChart3}
        title={getText('dashboard_stats_total')}
        value={stats.total}
        titleClasses={titleClasses}
        valueClasses={valueClasses}
        testID={testID ? `${testID}-total` : 'dashboard-stat-total'}
      />
      <StatCard
        icon={ListTodo}
        title={getText('dashboard_stats_pending')}
        value={stats.pending}
        titleClasses={titleClasses}
        valueClasses={valueClasses}
        testID={testID ? `${testID}-pending` : 'dashboard-stat-pending'}
      />
      <StatCard
        icon={Clock}
        title={getText('dashboard_stats_in_progress')}
        value={stats.inProgress}
        titleClasses={titleClasses}
        valueClasses={valueClasses}
        testID={
          testID ? `${testID}-in-progress` : 'dashboard-stat-in-progress'
        }
      />
      <StatCard
        icon={CheckCircle2}
        title={getText('dashboard_stats_completed')}
        value={stats.completed}
        titleClasses={titleClasses}
        valueClasses={valueClasses}
        testID={testID ? `${testID}-completed` : 'dashboard-stat-completed'}
      />
    </View>
  );
}

DashboardStatsCards.displayName = 'DashboardStatsCards';
