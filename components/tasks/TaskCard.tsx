import { Card } from '@/components/ui/card';
import { useAccessibilityClasses } from '@/hooks/accessibility';
import { useTextDetail } from '@/hooks/accessibility';
import { Task } from '@/models/task';
import { Pencil, Trash2 } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { styles } from './tasks-styles';

/**
 * TaskCard Component - MindEase Mobile
 * Individual task card with title, status, description, optional subtask progress,
 * and demo action buttons (Edit, Delete - mock only).
 */
export interface TaskCardProps {
  /** Task data */
  task: Task;

  /** Callback when Edit is pressed (demo: mock) */
  onEdit?: (task: Task) => void;

  /** Callback when Delete is pressed (demo: mock) */
  onDelete?: (taskId: string) => void;

  /** Test ID for testing */
  testID?: string;
}

export function TaskCard({
  task,
  onEdit,
  onDelete,
  testID,
}: TaskCardProps) {
  const { getText } = useTextDetail();
  const { fontSizeClasses, spacingClasses } = useAccessibilityClasses();

  const statusLabel = useMemo(() => {
    switch (task.status) {
      case 0:
        return getText('tasks_status_todo');
      case 1:
        return getText('tasks_status_in_progress');
      default:
        return getText('tasks_status_done');
    }
  }, [task.status, getText]);

  const statusBadgeClasses = useMemo(() => {
    const base = `${styles.status} ${fontSizeClasses.sm}`;
    if (task.status === 0) return `${base} ${styles.statusTodo}`;
    if (task.status === 1) return `${base} ${styles.statusInProgress}`;
    return `${base} ${styles.statusDone}`;
  }, [task.status, fontSizeClasses.sm]);

  const completedSubtasks = task.subtasks?.filter((s) => s.completed).length ?? 0;
  const totalSubtasks = task.subtasks?.length ?? 0;
  const hasSubtasks = totalSubtasks > 0;

  const cardClasses = useMemo(
    () => (task.status === 2 ? `${styles.card} ${styles.cardDone}` : styles.card),
    [task.status]
  );

  const accessibilityLabel = useMemo(
    () => `${task.title}, ${statusLabel}${hasSubtasks ? `, ${completedSubtasks} ${getText('tasks_progress')} ${totalSubtasks} ${getText('tasks_progress_steps')}` : ''}`,
    [task.title, statusLabel, hasSubtasks, completedSubtasks, totalSubtasks, getText]
  );

  const showActions = task.status !== 2;

  return (
    <View
      className="w-full"
      accessibilityRole="summary"
      accessibilityLabel={accessibilityLabel}
      importantForAccessibility="yes"
    >
      <Card
        className={cardClasses}
        focused={false}
        testID={testID || `task-card-${task.id}`}
      >
      <Card.Header>
        <View className={styles.headerRow}>
          <Text
            className={`${styles.title} ${fontSizeClasses.base}`}
            numberOfLines={2}
          >
            {task.title}
          </Text>
          <Text
            className={statusBadgeClasses}
            testID={testID ? `${testID}-status` : `task-card-status-${task.id}`}
          >
            {statusLabel}
          </Text>
        </View>
        {task.description ? (
          <Text
            className={`${styles.description} ${fontSizeClasses.sm}`}
            numberOfLines={2}
          >
            {task.description}
          </Text>
        ) : null}
        {hasSubtasks ? (
          <Text className={`${styles.progressText} ${fontSizeClasses.sm}`}>
            {completedSubtasks} {getText('tasks_progress')} {totalSubtasks}{' '}
            {getText('tasks_progress_steps')}
          </Text>
        ) : null}
      </Card.Header>
      {showActions && (onEdit || onDelete) ? (
        <Card.Content>
          <View className={`${styles.actions} ${spacingClasses.gap}`}>
            {onEdit ? (
              <Button
                variant="secondary"
                size="sm"
                className={styles.actionButton}
                onPress={() => onEdit(task)}
                accessibilityLabel={getText('tasks_action_edit_aria')}
                accessibilityRole="button"
                testID={testID ? `${testID}-edit` : `task-card-edit-${task.id}`}
              >
                <Button.Icon icon={Pencil} position="left" variant="secondary" />
                <Button.Text>{getText('tasks_action_edit')}</Button.Text>
              </Button>
            ) : null}
            {onDelete ? (
              <Button
                variant="danger"
                size="sm"
                className={styles.actionButton}
                onPress={() => onDelete(task.id)}
                accessibilityLabel={getText('tasks_action_delete_aria')}
                accessibilityRole="button"
                testID={testID ? `${testID}-delete` : `task-card-delete-${task.id}`}
              >
                <Button.Icon icon={Trash2} position="left" variant="danger" />
                <Button.Text>{getText('tasks_action_delete')}</Button.Text>
              </Button>
            ) : null}
          </View>
        </Card.Content>
      ) : null}
    </Card>
    </View>
  );
}

TaskCard.displayName = 'TaskCard';
