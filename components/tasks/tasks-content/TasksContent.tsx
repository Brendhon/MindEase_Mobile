import { PageHeader } from '@/components/layout';
import { useAccessibilityClasses } from '@/hooks/accessibility';
import { Task } from '@/models/task';
import { TaskDialogOutputData } from '@/schemas/task-dialog.schema';
import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import { TaskDialog } from '../task-dialog';
import { TaskList } from '../task-list';
import { TasksError } from './TasksError';
import { TasksToolbar } from './TasksToolbar';
import { styles } from './tasks-content-styles';

/**
 * TasksContent Component - MindEase Mobile
 * Container: PageHeader, TasksError, TasksToolbar, TaskList, TaskDialog.
 * Task card logic (focus, stop, complete, toggle subtask) is handled by useTaskCard inside each TaskCard.
 * Delete: real deletion with confirmation (in TaskCard). New Task / Edit: TaskDialog with Modal.
 */
export interface TasksContentProps {
  /** Tasks data */
  tasks: Task[];

  /** Error message if any */
  error?: string | null;

  /** Callback when the task list area (wrapper of TaskList) has layout; used for scroll-into-view */
  onTaskListAreaLayout?: (layout: { y: number }) => void;

  /** Callback when a column has layout (index 0|1|2, layout); used for scroll-into-view */
  onColumnLayout?: (index: 0 | 1 | 2, layout: { y: number; height: number }) => void;

  /** Callback to scroll to a column when a task moves (0 = To Do, 1 = In Progress, 2 = Done) */
  onScrollToColumn?: (status: number) => void;

  /** Callback to delete a task (after confirmation in TaskCard); same contract as web handleDeleteTask */
  onDelete?: (taskId: string) => void | Promise<void>;

  /** Callback to create a new task (payload from task dialog) */
  onCreateTask?: (data: TaskDialogOutputData) => void | Promise<void>;

  /** Callback to update an existing task (taskId + payload from task dialog) */
  onUpdateTask?: (taskId: string, data: TaskDialogOutputData) => void | Promise<void>;

  /** Test ID for testing */
  testID?: string;
}

export function TasksContent({
  tasks,
  error,
  onTaskListAreaLayout,
  onColumnLayout,
  onScrollToColumn,
  onDelete,
  onCreateTask,
  onUpdateTask,
  testID,
}: TasksContentProps) {
  const { spacingClasses } = useAccessibilityClasses();
  const [taskDialogVisible, setTaskDialogVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  const handleNewTask = useCallback(() => {
    setTaskToEdit(undefined);
    setTaskDialogVisible(true);
  }, []);

  const handleEdit = useCallback((task: Task) => {
    setTaskToEdit(task);
    setTaskDialogVisible(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setTaskDialogVisible(false);
    setTaskToEdit(undefined);
  }, []);

  const handleSaveTask = useCallback(
    async (data: TaskDialogOutputData) => {
      if (taskToEdit) {
        await onUpdateTask?.(taskToEdit.id, data);
      } else {
        await onCreateTask?.(data);
      }
      setTaskDialogVisible(false);
      setTaskToEdit(undefined);
    },
    [taskToEdit, onCreateTask, onUpdateTask]
  );

  const containerClasses = useMemo(
    () => `${styles.container} ${spacingClasses.gap}`,
    [spacingClasses.gap]
  );

  const contentClasses = useMemo(
    () => `${styles.content} ${spacingClasses.gap}`,
    [spacingClasses.gap]
  );

  const hasError = Boolean(error);

  return (
    <View className={containerClasses} testID={testID || 'tasks-content-container'}>
      <PageHeader
        descriptionKey="tasks_description"
        testID={testID ? `${testID}-header` : 'tasks-header'}
      />

      {hasError && (
        <TasksError message={error!} testID={testID ? `${testID}-error` : 'tasks-error'} />
      )}

      <TasksToolbar
        onNewTask={handleNewTask}
        testID={testID ? `${testID}-toolbar` : 'tasks-toolbar'}
      />

      <View
        className={contentClasses}
        onLayout={
          onTaskListAreaLayout
            ? (e: LayoutChangeEvent) => onTaskListAreaLayout(e.nativeEvent.layout)
            : undefined
        }>
        <TaskList
          tasks={tasks}
          onColumnLayout={onColumnLayout}
          onScrollToColumn={onScrollToColumn}
          onEdit={handleEdit}
          onDelete={onDelete}
          testID={testID ? `${testID}-list` : 'tasks-list'}
        />
      </View>

      <TaskDialog
        visible={taskDialogVisible}
        onClose={handleCloseDialog}
        task={taskToEdit}
        onSave={handleSaveTask}
        testID={testID ? `${testID}-dialog` : 'tasks-dialog'}
      />
    </View>
  );
}

TasksContent.displayName = 'TasksContent';
