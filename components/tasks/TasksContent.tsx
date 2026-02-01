import { PageHeader } from '@/components/layout';
import { useAccessibilityClasses } from '@/hooks/accessibility';
import { Task } from '@/models/task';
import React, { useCallback, useMemo } from 'react';
import { Alert, View } from 'react-native';
import { TaskList } from './TaskList';
import { TasksError } from './TasksError';
import { TasksToolbar } from './TasksToolbar';
import { styles } from './tasks-styles';

/** Demo message for mock actions (New Task, Edit, Focus) */
const DEMO_NEW_TASK_MESSAGE = 'Criação de tarefas será implementada em breve.';
const DEMO_EDIT_MESSAGE = 'Edição de tarefas será implementada em breve.';
const DEMO_START_FOCUS_MESSAGE = 'Iniciar foco será implementado em breve.';
const DEMO_STOP_MESSAGE = 'Encerrar foco será implementado em breve.';
const DEMO_COMPLETE_MESSAGE = 'Finalizar tarefa será implementado em breve.';
const DEMO_ALERT_TITLE = 'Em breve';

/**
 * TasksContent Component - MindEase Mobile
 * Container: PageHeader, TasksError, TasksToolbar, TaskList.
 * Delete: real deletion with confirmation (same flow as web). New Task / Edit: demo Alert for now.
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

/** Demo handlers for focus actions (mock only, for visual sync with web) */
function useDemoFocusHandlers() {
  const handleStartFocus = useCallback((_task: Task) => {
    Alert.alert(DEMO_ALERT_TITLE, DEMO_START_FOCUS_MESSAGE, [{ text: 'OK' }]);
  }, []);
  const handleStop = useCallback((_task: Task) => {
    Alert.alert(DEMO_ALERT_TITLE, DEMO_STOP_MESSAGE, [{ text: 'OK' }]);
  }, []);
  const handleComplete = useCallback((_task: Task) => {
    Alert.alert(DEMO_ALERT_TITLE, DEMO_COMPLETE_MESSAGE, [{ text: 'OK' }]);
  }, []);
  return { handleStartFocus, handleStop, handleComplete };
}

export function TasksContent({
  tasks,
  error,
  onDelete,
  testID,
}: TasksContentProps) {
  const { spacingClasses } = useAccessibilityClasses();
  const { handleStartFocus, handleStop, handleComplete } = useDemoFocusHandlers();

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
          onStartFocus={handleStartFocus}
          onStop={handleStop}
          onComplete={handleComplete}
          onEdit={handleEdit}
          onDelete={onDelete}
          testID={testID ? `${testID}-list` : 'tasks-list'}
        />
      </View>
    </View>
  );
}

TasksContent.displayName = 'TasksContent';
