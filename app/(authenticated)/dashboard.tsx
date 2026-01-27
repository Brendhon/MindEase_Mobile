import { DashboardContent } from '@/components/dashboard';
import { useAccessibilityClasses } from '@/hooks/accessibility';
import { useAuth } from '@/hooks/auth';
import { useTasks } from '@/hooks/tasks';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';

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
  const { spacingClasses } = useAccessibilityClasses();
  const { user } = useAuth();
  const { tasks, loading, error, loadTasks } = useTasks();

  // Load tasks when component mounts or user changes
  useEffect(() => {
    if (user?.uid) {
      loadTasks(user.uid);
    }
  }, [user?.uid, loadTasks]);

  return (
    <ScrollView
      className={`${styles.container} ${spacingClasses.padding}`}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <DashboardContent
        tasks={tasks}
        error={error}
        testID="dashboard-page-container"
      />
    </ScrollView>
  );
}

const styles = {
  container: 'flex-1 bg-bg-secondary',
};
