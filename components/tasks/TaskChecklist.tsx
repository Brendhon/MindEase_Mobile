import { useAccessibilityClasses } from '@/hooks/accessibility';
import { useTextDetail } from '@/hooks/accessibility';
import { Subtask } from '@/models/task';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { TaskChecklistItem } from './TaskChecklistItem';
import { styles } from './tasks-styles';

/**
 * TaskChecklist Component - MindEase Mobile
 * Displays checklist of subtasks with progress and items.
 * Mirrors web TaskChecklist: progress text + list of items; interactive when task is in focus.
 */
export interface TaskChecklistProps {
  /** Array of subtasks */
  subtasks: Subtask[];
  /** Callback when subtask is toggled */
  onToggleSubtask?: (subtaskId: string) => void;
  /** Whether checklist is interactive (task in focus) */
  interactive?: boolean;
  /** Whether task is in focus (to show/hide hint text) */
  isInFocus?: boolean;
  /** Test ID for testing */
  testID?: string;
}

export function TaskChecklist({
  subtasks,
  onToggleSubtask,
  interactive = false,
  isInFocus = false,
  testID,
}: TaskChecklistProps) {
  const { spacingClasses, fontSizeClasses } = useAccessibilityClasses();
  const { getText } = useTextDetail();

  const sortedSubtasks = useMemo(
    () => [...subtasks].sort((a, b) => a.order - b.order),
    [subtasks]
  );

  const completedCount = useMemo(
    () => subtasks.filter((s) => s.completed).length,
    [subtasks]
  );
  const totalCount = subtasks.length;

  if (subtasks.length === 0) {
    return null;
  }

  const containerClasses = `${styles.checklistContainer} ${spacingClasses.gap}`;

  return (
    <View className={containerClasses} testID={testID || 'task-checklist'}>
      <Text
        className={`${styles.checklistProgress} ${fontSizeClasses.sm}`}
        testID={testID ? `${testID}-progress` : 'task-checklist-progress'}
      >
        {completedCount} {getText('tasks_progress')} {totalCount}{' '}
        {getText('tasks_progress_steps')}
      </Text>
      <View className={styles.checklistList}>
        {sortedSubtasks.map((subtask) => (
          <TaskChecklistItem
            key={subtask.id}
            subtask={subtask}
            interactive={interactive}
            onToggle={onToggleSubtask}
            testID={testID ? `${testID}-item-${subtask.id}` : `task-checklist-item-${subtask.id}`}
          />
        ))}
      </View>
      {!isInFocus && (
        <Text
          className={`${styles.checklistHint} ${fontSizeClasses.sm}`}
          testID={testID ? `${testID}-hint` : 'task-checklist-hint'}
        >
          {getText('tasks_subtask_focus_required_hint_text')}
        </Text>
      )}
    </View>
  );
}

TaskChecklist.displayName = 'TaskChecklist';
