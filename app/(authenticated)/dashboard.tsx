import { PageScrollView } from '@/components/layout';
import { DashboardContent } from '@/components/dashboard';
import { useTasks } from '@/hooks/tasks';
import React from 'react';

/**
 * Dashboard Screen - MindEase Mobile
 *
 * Main dashboard showing user overview and quick actions.
 *
 * Features:
 * - Task statistics overview
 * - Cognitive alerts
 * - Accessibility settings (visual, interaction, content)
 * - Settings reset functionality
 */
export default function DashboardScreen() {
  const { tasks, error } = useTasks();

  return (
    <PageScrollView testID="dashboard-page-scroll-view">
      <DashboardContent tasks={tasks} error={error} testID="dashboard-page-container" />
    </PageScrollView>
  );
}
