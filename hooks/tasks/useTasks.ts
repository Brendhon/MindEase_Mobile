import { useCallback, useEffect } from 'react';

import { useTasksContext } from '@/contexts/tasks';
import { useAuth } from '@/hooks/auth';
import { Subtask, Task } from '@/models/task';
import { tasksService } from '@/services/tasks';

/**
 * useTasks Hook - MindEase Mobile
 * Centralized hook for managing tasks with Firestore synchronization
 *
 * This hook encapsulates all business logic:
 * - CRUD operations with Firestore
 * - State synchronization (local + remote)
 * - Loading and error handling
 *
 * The provider only manages basic state, while this hook handles all business logic.
 *
 * Note: Feedback (toast) integration to be added when useFeedback hook is available.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { tasks, createTask, updateTask } = useTasks();
 *
 *   const handleCreate = async () => {
 *     await createTask("user-id", { title: "New Task" });
 *   };
 *
 *   return <View><Text>{tasks.length} tasks</Text></View>;
 * }
 * ```
 */
export function useTasks() {
  const { tasks, loading, error, _setTasks, _setLoading, _setError } =
    useTasksContext();
  const { user } = useAuth();

  /**
   * Initialize tasks from server data
   */
  const initializeTasks = useCallback(
    (newTasks: Task[], newError: string | null) => {
      _setTasks(newTasks);
      _setError(newError);
    },
    [_setTasks, _setError]
  );

  /**
   * Get a task by ID from local state
   */
  const getTask = useCallback(
    (taskId: string): Task | undefined => {
      return tasks.find((t) => t.id === taskId);
    },
    [tasks]
  );

  /**
   * Load tasks from Firestore (one-shot; for manual refresh e.g. pull-to-refresh)
   */
  const loadTasks = useCallback(
    async (userId: string) => {
      if (!userId) return;

      _setLoading(true);
      _setError(null);

      try {
        const loadedTasks = await tasksService.getTasks(userId);
        _setTasks(loadedTasks);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load tasks';
        _setError(errorMessage);
      } finally {
        _setLoading(false);
      }
    },
    [_setTasks, _setLoading, _setError]
  );

  /**
   * Subscribe to tasks collection for real-time sync (web + mobile).
   * Runs when user is available; cleanup on unmount or user change.
   */
  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = tasksService.subscribeTasks(
      user.uid,
      (newTasks) => {
        _setTasks(newTasks);
        _setLoading(false);
        _setError(null);
      },
      (err) => {
        _setError(err.message);
        _setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [user?.uid, _setTasks, _setLoading, _setError]);

  /**
   * Create a new task
   * Automatically syncs with Firestore and updates local state
   */
  const createTask = useCallback(
    async (
      userId: string,
      taskData: {
        title: string;
        description?: string;
        subtasks?: Subtask[];
      }
    ) => {
      if (!userId) return;

      _setLoading(true);
      _setError(null);

      try {
        await tasksService.createTask(userId, {
          title: taskData.title,
          description: taskData.description,
          subtasks: taskData.subtasks,
          status: 0,
        });
        // State is updated by the Firestore subscription when the new doc is emitted; do not append here to avoid duplicate keys.
        // TODO: Add feedback when useFeedback is available
        // success('toast_success_task_created');
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to create task';
        _setError(errorMessage);
        // TODO: Add feedback when useFeedback is available
        // showError('toast_error_task_create_failed');
      } finally {
        _setLoading(false);
      }
    },
    [_setTasks, _setLoading, _setError]
  );

  /**
   * Update an existing task
   * Automatically syncs with Firestore and updates local state
   */
  const updateTask = useCallback(
    async (userId: string, taskId: string, updates: Partial<Task>) => {
      if (!userId) return;

      _setLoading(true);
      _setError(null);

      try {
        const updatedTask = await tasksService.updateTask(
          userId,
          taskId,
          updates
        );
        _setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? updatedTask : t))
        );

        // TODO: Add feedback when useFeedback is available
        // const isComplete = updatedTask.status === 2;
        // if (isComplete) {
        //   success('toast_success_task_completed');
        // }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to update task';
        _setError(errorMessage);
        // TODO: Add feedback when useFeedback is available
        // showError('toast_error_task_update_failed');
      } finally {
        _setLoading(false);
      }
    },
    [_setTasks, _setLoading, _setError]
  );

  /**
   * Delete a task
   * Automatically syncs with Firestore and updates local state
   */
  const deleteTask = useCallback(
    async (userId: string, taskId: string) => {
      if (!userId) return;

      _setLoading(true);
      _setError(null);

      try {
        await tasksService.deleteTask(userId, taskId);
        _setTasks((prev) => prev.filter((t) => t.id !== taskId));
        // TODO: Add feedback when useFeedback is available
        // success('toast_success_task_deleted');
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to delete task';
        _setError(errorMessage);
        // TODO: Add feedback when useFeedback is available
        // showError('toast_error_task_delete_failed');
      } finally {
        _setLoading(false);
      }
    },
    [_setTasks, _setLoading, _setError]
  );

  /**
   * Refresh a task from Firestore
   * Useful when you need to ensure you have the latest data
   */
  const refreshTask = useCallback(
    async (userId: string, taskId: string) => {
      if (!userId) return;

      try {
        const task = await tasksService.getTask(userId, taskId);
        if (task) {
          _setTasks((prev) => prev.map((t) => (t.id === taskId ? task : t)));
        }
      } catch (err) {
        console.error('Error refreshing task:', err);
      }
    },
    [_setTasks]
  );

  /**
   * Update task status
   * Convenience method for status updates
   */
  const updateTaskStatus = useCallback(
    async (userId: string, taskId: string, status: number) => {
      await updateTask(userId, taskId, { status });
    },
    [updateTask]
  );

  /**
   * Check if has tasks in progress except the given task id
   * @param taskId - Task id to exclude
   * @returns true if has tasks in progress, false otherwise
   */
  const hasTasksInProgress = useCallback(
    (taskId: string) => {
      return tasks.some((t) => t.status === 1 && t.id !== taskId);
    },
    [tasks]
  );

  /**
   * Toggle subtask completion
   * Automatically syncs with Firestore and updates local state
   */
  const toggleSubtask = useCallback(
    async (userId: string, taskId: string, subtaskId: string) => {
      const task = tasks.find((t) => t.id === taskId);
      if (!task || !task.subtasks) return;

      const updatedSubtasks = task.subtasks.map((st) =>
        st.id === subtaskId ? { ...st, completed: !st.completed } : st
      );

      await updateTask(userId, taskId, { subtasks: updatedSubtasks });
    },
    [tasks, updateTask]
  );

  return {
    // State
    tasks,
    loading,
    error,

    // Operations
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    toggleSubtask,
    refreshTask,

    // Utilities
    getTask,
    initializeTasks,
    hasTasksInProgress,
  };
}
