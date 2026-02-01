import { TasksContent } from '@/components/tasks';
import { TasksLoading } from '@/components/tasks';
import { useAccessibilityClasses } from '@/hooks/accessibility';
import { useAuth } from '@/hooks/auth';
import { useTasks } from '@/hooks/tasks';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';

/**
 * Tasks Screen - MindEase Mobile
 *
 * Task management screen with list and demo actions.
 *
 * Features (demo phase):
 * - Task list in vertical sections (A Fazer, Em Progresso, Concluídas)
 * - Task cards with title, status, description, subtask progress
 * - New Task, Edit, Delete buttons (mock: Alert feedback only)
 */
export default function TasksScreen() {
  const { spacingClasses } = useAccessibilityClasses();
  const { user } = useAuth();
  const { tasks, loading, error, loadTasks } = useTasks();

  useEffect(() => {
    if (user?.uid) {
      loadTasks(user.uid);
    }
  }, [user?.uid, loadTasks]);

  const showLoading = loading && tasks.length === 0;

  return (
    <ScrollView
      className={`${styles.container} ${spacingClasses.padding}`}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {showLoading ? (
        <TasksLoading testID="tasks-page-loading" />
      ) : (
        <TasksContent
          tasks={tasks}
          error={error}
          testID="tasks-page-container"
        />
      )}
    </ScrollView>
  );
}

const styles = {
  container: 'flex-1 bg-bg-secondary',
};
