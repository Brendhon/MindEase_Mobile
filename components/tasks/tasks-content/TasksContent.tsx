import { PageHeader } from '@/components/layout';
import { useAccessibilityClasses } from '@/hooks/accessibility';
import { Task } from '@/models/task';
import { TaskDialogOutputData } from '@/schemas/task-dialog.schema';
import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
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

  /** Callback to delete a task (after confirmation in TaskCard); same contract as web handleDeleteTask */
  onDelete?: (taskId: string) => void | Promise<void>;

  /** Callback to create a new task (payload from task dialog) */
  onCreateTask?: (data: TaskDialogOutputData) => void | Promise<void>;

  /** Callback to update an existing task (taskId + payload from task dialog) */
  onUpdateTask?: (
    taskId: string,
    data: TaskDialogOutputData
  ) => void | Promise<void>;

  /** Test ID for testing */
  testID?: string;
}

export function TasksContent({
  tasks,
  error,
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
    <View
      className={containerClasses}
      testID={testID || 'tasks-content-container'}
    >
      <PageHeader
        descriptionKey="tasks_description"
        testID={testID ? `${testID}-header` : 'tasks-header'}
      />

      {hasError && (
        <TasksError
          message={error!}
          testID={testID ? `${testID}-error` : 'tasks-error'}
        />
      )}

      <TasksToolbar
        onNewTask={handleNewTask}
        testID={testID ? `${testID}-toolbar` : 'tasks-toolbar'}
      />

      <View className={contentClasses}>
        <TaskList
          tasks={tasks}
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
