import { PageHeader } from '@/components/layout';
import { useAccessibilityClasses } from '@/hooks/accessibility';
import { Task } from '@/models/task';
import React, { useCallback, useMemo } from 'react';
import { Alert, View } from 'react-native';
import { TaskList } from '../task-list';
import { TasksError } from './TasksError';
import { TasksToolbar } from './TasksToolbar';
import { styles } from './tasks-content-styles';

/** Demo message for mock actions (New Task, Edit) */
const DEMO_NEW_TASK_MESSAGE = 'Criação de tarefas será implementada em breve.';
const DEMO_EDIT_MESSAGE = 'Edição de tarefas será implementada em breve.';
const DEMO_ALERT_TITLE = 'Em breve';

/**
 * TasksContent Component - MindEase Mobile
 * Container: PageHeader, TasksError, TasksToolbar, TaskList.
 * Task card logic (focus, stop, complete, toggle subtask) is handled by useTaskCard inside each TaskCard.
 * Delete: real deletion with confirmation (in TaskCard). New Task / Edit: demo Alert for now.
 */
export interface TasksContentProps {
  /** Tasks data */
  tasks: Task[];

  /** Error message if any */
  error?: string | null;

  /** Callback to delete a task (after confirmation in TaskCard); same contract as web handleDeleteTask */
  onDelete?: (taskId: string) => void | Promise<void>;

  /** Test ID for testing */
  testID?: string;
}

export function TasksContent({
  tasks,
  error,
  onDelete,
  testID,
}: TasksContentProps) {
  const { spacingClasses } = useAccessibilityClasses();

  const handleNewTask = useCallback(() => {
    Alert.alert(DEMO_ALERT_TITLE, DEMO_NEW_TASK_MESSAGE, [{ text: 'OK' }]);
  }, []);

  const handleEdit = useCallback((_task: Task) => {
    Alert.alert(DEMO_ALERT_TITLE, DEMO_EDIT_MESSAGE, [{ text: 'OK' }]);
  }, []);

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
    </View>
  );
}

TasksContent.displayName = 'TasksContent';
