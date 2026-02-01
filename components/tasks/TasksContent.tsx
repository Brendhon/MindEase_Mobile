import { PageHeader } from '@/components/layout';
import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import { useAuth } from '@/hooks/auth';
import { useTasks } from '@/hooks/tasks';
import { useBreakTimer, useFocusTimer } from '@/hooks/timer';
import { Task } from '@/models/task';
import React, { useCallback, useMemo } from 'react';
import { Alert, View } from 'react-native';
import { TaskList } from './TaskList';
import { TasksError } from './TasksError';
import { TasksToolbar } from './TasksToolbar';
import { styles } from './tasks-styles';

/** Demo message for mock actions (New Task, Edit) */
const DEMO_NEW_TASK_MESSAGE = 'Criação de tarefas será implementada em breve.';
const DEMO_EDIT_MESSAGE = 'Edição de tarefas será implementada em breve.';
const DEMO_ALERT_TITLE = 'Em breve';

/**
 * TasksContent Component - MindEase Mobile
 * Container: PageHeader, TasksError, TasksToolbar, TaskList.
 * Focus: real start/stop/complete with timer and task status (same flow as web).
 * Delete: real deletion with confirmation. New Task / Edit: demo Alert for now.
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
  const { getText } = useTextDetail();
  const { user } = useAuth();
  const { updateTaskStatus, hasTasksInProgress, toggleSubtask } = useTasks();
  const { startTimer, stopTimer, isRunning: focusIsRunning } = useFocusTimer();
  const { stopBreak, isActive: breakIsActive, isRunning: breakIsRunning } =
    useBreakTimer();

  const uid = user?.uid ?? null;

  /** Start focus: start timer and set task status to In Progress (same as web) */
  const handleStartFocus = useCallback(
    (task: Task) => {
      startTimer(task.id);
      if (uid) {
        updateTaskStatus(uid, task.id, 1);
      }
    },
    [startTimer, uid, updateTaskStatus]
  );

  /** Stop focus: stop break + timer and set task status back to To Do (same as web) */
  const handleStop = useCallback(
    (task: Task) => {
      stopBreak();
      stopTimer();
      if (uid) {
        updateTaskStatus(uid, task.id, 0);
      }
    },
    [stopBreak, stopTimer, uid, updateTaskStatus]
  );

  /** Complete task: stop timer and set task status to Done (same as web) */
  const handleComplete = useCallback(
    (task: Task) => {
      stopTimer();
      if (uid) {
        updateTaskStatus(uid, task.id, 2);
      }
    },
    [stopTimer, uid, updateTaskStatus]
  );

  /** Timer state getters for each task (passed to TaskList/TaskColumn/TaskCard) */
  const getIsRunning = useCallback(
    (taskId: string) => focusIsRunning(taskId),
    [focusIsRunning]
  );
  const getHasActiveTask = useCallback(
    (taskId: string) => hasTasksInProgress(taskId),
    [hasTasksInProgress]
  );
  const getIsBreakRunning = useCallback(
    (taskId: string) => breakIsActive(taskId) && breakIsRunning(taskId),
    [breakIsActive, breakIsRunning]
  );

  /** Toggle subtask: if task in focus, update; if break running show break alert; else show focus-required alert (same as web). */
  const handleToggleSubtask = useCallback(
    (task: Task, subtaskId: string) => {
      if (breakIsActive(task.id) && breakIsRunning(task.id)) {
        Alert.alert(
          getText('tasks_subtask_break_required_title'),
          getText('tasks_subtask_break_required_message'),
          [{ text: 'OK' }]
        );
        return;
      }
      if (focusIsRunning(task.id) && uid) {
        toggleSubtask(uid, task.id, subtaskId);
      } else {
        Alert.alert(
          getText('tasks_subtask_focus_required_title'),
          getText('tasks_subtask_focus_required_message'),
          [{ text: 'OK' }]
        );
      }
    },
    [breakIsActive, breakIsRunning, focusIsRunning, uid, toggleSubtask, getText]
  );

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
          onToggleSubtask={handleToggleSubtask}
          getIsRunning={getIsRunning}
          getHasActiveTask={getHasActiveTask}
          getIsBreakRunning={getIsBreakRunning}
          testID={testID ? `${testID}-list` : 'tasks-list'}
        />
      </View>
    </View>
  );
}

TasksContent.displayName = 'TasksContent';
