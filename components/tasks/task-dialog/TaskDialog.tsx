import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/form/form-input';
import { Input } from '@/components/form/input';
import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import { Task } from '@/models/task';
import {
  TaskDialogFormData,
  TaskDialogOutputData,
  taskDialogOutputSchema,
  taskDialogSchema,
} from '@/schemas/task-dialog.schema';
import { generateRandomUUID } from '@/utils/uuid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X } from 'lucide-react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Controller, FormProvider, Resolver, useFieldArray, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './task-dialog-styles';

export interface TaskDialogProps {
  /** Whether modal is visible */
  visible: boolean;

  /** Callback when modal is closed */
  onClose: () => void;

  /** Task to edit (undefined for new task) */
  task?: Task;

  /** Callback when task is saved (receives transformed output data) */
  onSave: (data: TaskDialogOutputData) => void;

  /** Test ID for testing */
  testID?: string;
}

export function TaskDialog({
  visible,
  onClose,
  task,
  onSave,
  testID = 'task-dialog',
}: TaskDialogProps) {
  const { spacingClasses } = useAccessibilityClasses();
  const { getText } = useTextDetail();
  const insets = useSafeAreaInsets();

  const isEditing = !!task;

  const methods = useForm<TaskDialogFormData>({
    resolver: zodResolver(taskDialogSchema) as Resolver<TaskDialogFormData>,
    defaultValues: {
      title: '',
      description: '',
      subtasks: [],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'subtasks',
  });

  const resetForm = useCallback(
    (taskToReset?: Task) => {
      methods.reset({
        title: taskToReset?.title || '',
        description: taskToReset?.description || '',
        subtasks: taskToReset?.subtasks || [],
      });
    },
    [methods]
  );

  useEffect(() => {
    if (visible) {
      resetForm(task);
    }
  }, [visible, task, resetForm]);

  const handleAddSubtask = useCallback(() => {
    append({
      id: generateRandomUUID(),
      title: '',
      completed: false,
      order: fields.length,
    });
  }, [append, fields.length]);

  const handleRemoveSubtask = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const handleSave = useCallback(
    (data: TaskDialogFormData) => {
      const result = taskDialogOutputSchema.safeParse(data);

      if (!result.success) {
        console.error('Validation error:', result.error);
        return;
      }

      onSave({
        title: result.data.title,
        description: result.data.description || '',
        subtasks: result.data.subtasks,
      });

      resetForm();
      onClose();
    },
    [onSave, onClose, resetForm]
  );

  const handleCancel = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  const formClasses = useMemo(() => `${styles.form} ${spacingClasses.gap}`, [spacingClasses.gap]);

  const checklistClasses = useMemo(
    () => `${styles.checklist} ${spacingClasses.gap}`,
    [spacingClasses.gap]
  );

  const headerPadding = useMemo(
    () => ({
      paddingTop: insets.top,
      paddingBottom: 12,
      paddingHorizontal: 16,
    }),
    [insets.top]
  );

  const scrollPadding = useMemo(
    () => ({
      paddingBottom: insets.bottom + 24,
      paddingHorizontal: 16,
    }),
    [insets.bottom]
  );

  return (
    <Modal
      visible={visible}
      onRequestClose={handleCancel}
      animationType="slide"
      transparent={false}
      testID={testID}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className={styles.modalContent}
        style={{ flex: 1 }}>
        <View style={headerPadding} className={styles.header}>
          <Text
            className={styles.headerTitle}
            testID={`${testID}-title`}
            accessibilityRole="header">
            {getText(isEditing ? 'tasks_dialog_edit_title' : 'tasks_dialog_create_title')}
          </Text>
        </View>

        <ScrollView
          className={styles.scrollContent}
          contentContainerStyle={scrollPadding}
          keyboardShouldPersistTaps="handled"
          testID={`${testID}-content`}>
          <FormProvider {...methods}>
            <Pressable onPress={(e) => e.stopPropagation()} className={formClasses}>
              <FormInput
                name="title"
                label={getText('tasks_dialog_field_title')}
                type="text"
                placeholder={getText('tasks_dialog_field_title_placeholder')}
                required
                testID={`${testID}-field-title`}
              />

              <FormInput
                name="description"
                label={getText('tasks_dialog_field_description')}
                as="textarea"
                placeholder={getText('tasks_dialog_field_description_placeholder')}
                rows={3}
                testID={`${testID}-field-description`}
              />

              <View className={styles.checklistSection}>
                <View className={styles.checklistHeader}>
                  <Input.Label testID={`${testID}-label-checklist`}>
                    {getText('tasks_dialog_field_checklist')}
                  </Input.Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onPress={handleAddSubtask}
                    testID={`${testID}-add-subtask`}
                    accessibilityLabel={getText('tasks_checklist_add')}>
                    <Button.Icon icon={Plus} position="left" variant="ghost" />
                    <Button.Text variant="ghost">{getText('tasks_checklist_add')}</Button.Text>
                  </Button>
                </View>

                {fields.length > 0 && (
                  <View className={checklistClasses}>
                    {fields.map((field, index) => (
                      <View
                        key={field.id}
                        className={styles.checklistItem}
                        testID={`${testID}-subtask-${field.id}`}>
                        <Controller
                          name={`subtasks.${index}.title`}
                          control={methods.control}
                          render={({ field: inputField }) => (
                            <Input.Field
                              value={inputField.value ?? ''}
                              onChangeText={inputField.onChange}
                              onBlur={inputField.onBlur}
                              type="text"
                              placeholder={`${getText('tasks_checklist_placeholder')} ${index + 1}`}
                              testID={`${testID}-subtask-field-${field.id}`}
                              className="flex-1"
                            />
                          )}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onPress={() => handleRemoveSubtask(index)}
                          accessibilityLabel={getText('tasks_checklist_remove_aria')}
                          testID={`${testID}-remove-subtask-${field.id}`}>
                          <Button.Icon icon={X} variant="ghost" />
                        </Button>
                      </View>
                    ))}
                  </View>
                )}
              </View>

              <View className={styles.actions}>
                <Button variant="ghost" onPress={handleCancel} testID={`${testID}-cancel`}>
                  <Button.Text variant="ghost">{getText('button_cancel')}</Button.Text>
                </Button>
                <Button
                  variant="primary"
                  onPress={methods.handleSubmit(handleSave as (data: TaskDialogFormData) => void)}
                  testID={`${testID}-save`}>
                  <Button.Text>
                    {isEditing ? getText('button_save') : getText('button_create')}
                  </Button.Text>
                </Button>
              </View>
            </Pressable>
          </FormProvider>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

TaskDialog.displayName = 'TaskDialog';
