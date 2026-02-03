import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { useCallback, useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRadioGroupContext } from './radio-group-context';
import { styles } from './radio-group-styles';

/**
 * RadioGroup.Option - Individual radio option
 *
 * @example
 * ```tsx
 * <RadioGroup value={selected} onChange={setSelected}>
 *   <RadioGroup.Header>
 *     <RadioGroup.Label>Choose option</RadioGroup.Label>
 *   </RadioGroup.Header>
 *   <RadioGroup.Option value="option1" label="Option 1" />
 *   <RadioGroup.Option value="option2" label="Option 2" description="Description" />
 * </RadioGroup>
 * ```
 */
export interface RadioGroupOptionProps {
  /** Option value */
  value: string;

  /** Option label */
  label: string;

  /** Optional description */
  description?: string;

  /** Test ID for testing */
  testID?: string;
}

export function RadioGroupOption({ value, label, description, testID }: RadioGroupOptionProps) {
  const { fontSizeClasses, spacingClasses } = useAccessibilityClasses();
  const { value: selectedValue, onChange, disabled } = useRadioGroupContext();

  const checked = selectedValue === value;
  const isDisabled = disabled || false;

  const labelClasses = useMemo(
    () => `${styles.optionLabel} ${fontSizeClasses.base}`,
    [fontSizeClasses]
  );

  const descriptionClasses = useMemo(
    () => `${styles.optionDescription} ${fontSizeClasses.sm}`,
    [fontSizeClasses]
  );

  const optionClasses = useMemo(
    () => `${styles.option} ${spacingClasses.padding}`,
    [spacingClasses]
  );

  const containerClasses = useMemo(() => {
    return [
      optionClasses,
      checked ? styles.optionChecked : styles.optionUnchecked,
      isDisabled && styles.optionDisabled,
    ]
      .filter(Boolean)
      .join(' ');
  }, [optionClasses, checked, isDisabled]);

  const handlePress = useCallback(() => {
    if (!isDisabled) {
      onChange(value);
    }
  }, [isDisabled, onChange, value]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityRole="radio"
      accessibilityState={{ selected: checked, disabled: isDisabled }}
      accessibilityLabel={label}
      accessibilityHint={description}
      className={containerClasses}
      testID={testID || `radio-option-${value}`}>
      <View className={styles.optionContent}>
        <View className={`${styles.radio} ${checked ? styles.radioChecked : ''}`}>
          {checked && <View className={styles.radioDot} />}
        </View>
        <View className={styles.optionText}>
          <Text className={labelClasses}>{label}</Text>
          {description && <Text className={descriptionClasses}>{description}</Text>}
        </View>
      </View>
    </Pressable>
  );
}

RadioGroupOption.displayName = 'RadioGroup.Option';
