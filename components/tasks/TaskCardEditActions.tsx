import { Button } from '@/components/ui/button';
import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import { useAlert } from '@/hooks/alert/useAlert';
import { Task } from '@/models/task';
import { Pencil, Trash2 } from 'lucide-react-native';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { styles } from './tasks-styles';

/**
 * TaskCardEditActions - MindEase Mobile
 * Edit and Delete buttons. Delete shows confirmation dialog before calling onDelete.
 */
export interface TaskCardEditActionsProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  testID?: string;
}

export function TaskCardEditActions({
  task,
  onEdit,
  onDelete,
  testID,
}: TaskCardEditActionsProps) {
  const { spacingClasses } = useAccessibilityClasses();
  const { getText } = useTextDetail();
  const { showConfirmation } = useAlert();

  const handleRequestDelete = useCallback(() => {
    if (!onDelete) return;
    showConfirmation({
      titleKey: 'tasks_delete_confirm_title',
      messageKey: 'tasks_delete_confirm_message',
      cancelLabelKey: 'button_cancel',
      confirmLabelKey: 'tasks_delete_confirm_button',
      onConfirm: () => {
        onDelete(task.id);
      },
      confirmStyle: 'destructive',
    });
  }, [onDelete, task.id, showConfirmation]);

  if (!onEdit && !onDelete) return null;

  return (
    <View className={`${styles.editActions} ${spacingClasses.gap}`}>
      {onEdit ? (
        <Button
          variant="ghost"
          size="sm"
          className={styles.actionButton}
          onPress={() => onEdit(task)}
          accessibilityLabel={getText('tasks_action_edit_aria')}
          accessibilityRole="button"
          testID={testID ? `${testID}-edit` : `task-card-edit-${task.id}`}
        >
          <Button.Icon icon={Pencil} position="left" variant="ghost" />
          <Button.Text variant="ghost">{getText('tasks_action_edit')}</Button.Text>
        </Button>
      ) : null}
      {onDelete ? (
        <Button
          variant="ghost"
          size="sm"
          className={styles.actionButton}
          onPress={handleRequestDelete}
          accessibilityLabel={getText('tasks_action_delete_aria')}
          accessibilityRole="button"
          testID={testID ? `${testID}-delete` : `task-card-delete-${task.id}`}
        >
          <Button.Icon icon={Trash2} position="left" variant="ghost" />
          <Button.Text variant="ghost">{getText('tasks_action_delete')}</Button.Text>
        </Button>
      ) : null}
    </View>
  );
}

TaskCardEditActions.displayName = 'TaskCardEditActions';
