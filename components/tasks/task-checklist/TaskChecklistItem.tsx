import { Checkbox } from '@/components/form/checkbox';
import { useAccessibilityClasses } from '@/hooks/accessibility';
import { Subtask } from '@/models/task';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { styles } from './task-checklist-styles';

/**
 * TaskChecklistItem Component - MindEase Mobile
 * Single checklist item with checkbox.
 * Mirrors web TaskChecklistItem: interactive when task is in focus.
 */
export interface TaskChecklistItemProps {
  /** Subtask data */
  subtask: Subtask;
  /** Whether checklist is interactive (task in focus) */
  interactive?: boolean;
  /** Callback when subtask is toggled (subtaskId) */
  onToggle?: (subtaskId: string) => void;
  /** Test ID for testing */
  testID?: string;
}

export function TaskChecklistItem({
  subtask,
  interactive = false,
  onToggle,
  testID,
}: TaskChecklistItemProps) {
  const { fontSizeClasses } = useAccessibilityClasses();
  const isCompleted = subtask.completed;

  const itemClasses = useMemo(() => {
    const base = styles.checklistItem;
    const completed = isCompleted ? ` ${styles.checklistItemCompleted}` : '';
    const nonInteractive = !interactive ? ` ${styles.checklistItemNonInteractive}` : '';
    return `${base}${completed}${nonInteractive}`;
  }, [isCompleted, interactive]);

  const handleToggle = () => {
    onToggle?.(subtask.id);
  };

  const accessibilityLabel = useMemo(
    () =>
      `${subtask.title} - ${isCompleted ? 'Concluída' : 'Pendente'}${!interactive ? ' - Entre em foco para marcar' : ''}`,
    [subtask.title, isCompleted, interactive]
  );

  const checkboxClassName = useMemo(() => {
    const base = styles.checklistCheckboxWrapper;
    const nonInteractive = !interactive ? ` ${styles.checklistCheckboxNonInteractive}` : '';
    return `${base}${nonInteractive}`;
  }, [interactive]);

  return (
    <View className={itemClasses} testID={testID || `task-checklist-item-${subtask.id}`}>
      <Checkbox
        checked={isCompleted}
        onChange={() => handleToggle()}
        disabled={false}
        accessibilityLabel={accessibilityLabel}
        testID={testID ? `${testID}-checkbox` : `task-checklist-checkbox-${subtask.id}`}
        className={checkboxClassName}>
        <Checkbox.Label
          checked={isCompleted}
          onPress={handleToggle}
          className={fontSizeClasses.sm}
          testID={testID ? `${testID}-label` : `task-checklist-checkbox-${subtask.id}-label`}>
          {subtask.title}
        </Checkbox.Label>
      </Checkbox>
    </View>
  );
}

TaskChecklistItem.displayName = 'TaskChecklistItem';
