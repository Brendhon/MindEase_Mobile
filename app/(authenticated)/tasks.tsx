import { PageScrollView } from '@/components/layout';
import { TasksContent, TasksLoading } from '@/components/tasks/tasks-content';
import { useAuth } from '@/hooks/auth';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import { useTasks } from '@/hooks/tasks';
import { useFocusTimer } from '@/hooks/timer';
import { TaskDialogOutputData } from '@/schemas/task-dialog.schema';
import React, { useCallback, useRef } from 'react';
import { ScrollView } from 'react-native';

const SCROLL_TO_COLUMN_PADDING = 0;
const SCROLL_DELAY_MS = 10;

type ColumnLayout = { y: number; height: number };

/**
 * Tasks Screen - MindEase Mobile
 *
 * Task management screen with list and actions.
 *
 * Features:
 * - Task list in vertical sections (A Fazer, Em Progresso, Concluídas)
 * - Task cards with title, status, description, subtask progress
 * - New Task, Edit (TaskDialog with Modal), Delete (delete with confirmation, syncs with Firestore)
 * - Auto-scroll to column when a task moves (focus, stop, complete)
 */
export default function TasksScreen() {
  const { user } = useAuth();
  const { settings } = useCognitiveSettings();
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks();
  const { timerState, stopTimer } = useFocusTimer();
  const scrollViewRef = useRef<ScrollView>(null);
  const taskListAreaYRef = useRef(0);
  const columnLayoutsRef = useRef<[ColumnLayout, ColumnLayout, ColumnLayout]>([
    { y: 0, height: 0 },
    { y: 0, height: 0 },
    { y: 0, height: 0 },
  ]);

  const onTaskListAreaLayout = useCallback((layout: { y: number }) => {
    taskListAreaYRef.current = layout.y;
  }, []);

  const onColumnLayout = useCallback((index: 0 | 1 | 2, layout: ColumnLayout) => {
    columnLayoutsRef.current[index] = layout;
  }, []);

  /** Scroll to the given column (0 = To Do, 1 = In Progress, 2 = Done) using stored layout */
  const scrollToColumn = useCallback(
    (status: 0 | 1 | 2) => {
      const scrollRef = scrollViewRef.current;
      if (!scrollRef) return;
      setTimeout(() => {
        const areaY = taskListAreaYRef.current;
        const col = columnLayoutsRef.current[status];
        const y = Math.max(0, areaY + col.y - SCROLL_TO_COLUMN_PADDING);
        scrollRef.scrollTo({ y, animated: settings.animations });
      }, SCROLL_DELAY_MS);
    },
    [settings]
  );

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

  /** Create task from TaskDialog output */
  const handleCreateTask = useCallback(
    async (data: TaskDialogOutputData) => {
      if (!user?.uid) return;
      try {
        await createTask(user.uid, {
          title: data.title,
          description: data.description,
          subtasks: data.subtasks,
        });
      } catch (err) {
        console.error('Error creating task:', err);
      }
    },
    [user?.uid, createTask]
  );

  /** Update task from TaskDialog output */
  const handleUpdateTask = useCallback(
    async (taskId: string, data: TaskDialogOutputData) => {
      if (!user?.uid) return;
      try {
        await updateTask(user.uid, taskId, {
          title: data.title,
          description: data.description,
          subtasks: data.subtasks,
        });
      } catch (err) {
        console.error('Error updating task:', err);
      }
    },
    [user?.uid, updateTask]
  );

  const showLoading = loading && tasks.length === 0;

  const handleScrollToColumn = useCallback(
    (status: number) => {
      if (status === 0 || status === 1 || status === 2) scrollToColumn(status);
    },
    [scrollToColumn]
  );

  return (
    <PageScrollView ref={scrollViewRef} testID="tasks-page-scroll">
      {showLoading ? (
        <TasksLoading testID="tasks-page-loading" />
      ) : (
        <TasksContent
          tasks={tasks}
          error={error}
          onTaskListAreaLayout={onTaskListAreaLayout}
          onColumnLayout={onColumnLayout}
          onScrollToColumn={handleScrollToColumn}
          onDelete={handleDeleteTask}
          onCreateTask={handleCreateTask}
          onUpdateTask={handleUpdateTask}
          testID="tasks-page-container"
        />
      )}
    </PageScrollView>
  );
}
