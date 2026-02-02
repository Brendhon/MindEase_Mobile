import { PageScrollView } from '@/components/layout';
import { TasksContent, TasksLoading } from '@/components/tasks';
import { useAuth } from '@/hooks/auth';
import { useTasks } from '@/hooks/tasks';
import { useFocusTimer } from '@/hooks/timer';
import React, { useCallback } from 'react';

/**
 * Tasks Screen - MindEase Mobile
 *
 * Task management screen with list and actions.
 *
 * Features:
 * - Task list in vertical sections (A Fazer, Em Progresso, Concluídas)
 * - Task cards with title, status, description, subtask progress
 * - New Task, Edit, Delete (delete with confirmation, syncs with Firestore)
 */
export default function TasksScreen() {
  const { user } = useAuth();
  const { tasks, loading, error, deleteTask } = useTasks();
  const { timerState, stopTimer } = useFocusTimer();

  /** Delete task (after confirmation in TaskCard); stop timer if deleted task was active */
  const handleDeleteTask = useCallback(
    async (taskId: string) => {
      if (!user?.uid) return;
      try {
        await deleteTask(user.uid, taskId);
        if (timerState.activeTaskId === taskId) {
          stopTimer();
        }
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    },
    [user?.uid, deleteTask, timerState.activeTaskId, stopTimer]
  );

  const showLoading = loading && tasks.length === 0;

  return (
    <PageScrollView testID="tasks-page-scroll">
      {showLoading ? (
        <TasksLoading testID="tasks-page-loading" />
      ) : (
        <TasksContent
          tasks={tasks}
          error={error}
          onDelete={handleDeleteTask}
          testID="tasks-page-container"
        />
      )}
    </PageScrollView>
  );
}
