import { useAccessibilityClasses } from '@/hooks/accessibility';
import { Subtask } from '@/models/task';
import React, { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './task-checklist-styles';

/**
 * TaskChecklistItem Component - MindEase Mobile
 * Single checklist item with checkbox-like toggle.
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

  const handlePress = () => {
    onToggle?.(subtask.id);
  };

  const accessibilityLabel = useMemo(
    () =>
      `${subtask.title} - ${isCompleted ? 'Concluída' : 'Pendente'}${!interactive ? ' - Entre em foco para marcar' : ''}`,
    [subtask.title, isCompleted, interactive]
  );

  return (
    <Pressable
      onPress={handlePress}
      className={itemClasses}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isCompleted }}
      accessibilityLabel={accessibilityLabel}
      testID={testID || `task-checklist-item-${subtask.id}`}
    >
      <View className="w-5 h-5 rounded border border-border-subtle items-center justify-center bg-background">
        {isCompleted ? (
          <Text className="text-action-success text-sm">✓</Text>
        ) : (
          <View className="w-3 h-3" />
        )}
      </View>
      <Text
        className={`flex-1 ${fontSizeClasses.sm} ${isCompleted ? 'line-through text-text-secondary' : 'text-text-primary'}`}
        numberOfLines={2}
      >
        {subtask.title}
      </Text>
    </Pressable>
  );
}

TaskChecklistItem.displayName = 'TaskChecklistItem';
