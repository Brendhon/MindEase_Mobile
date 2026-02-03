import { useAccessibilityClasses } from '@/hooks/accessibility';
import { THEME_COLORS } from '@/utils/theme/theme-colors';
import React, { ReactNode, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { CheckboxDescription } from './CheckboxDescription';
import { CheckboxLabel } from './CheckboxLabel';
import { styles } from './checkbox-styles';

/**
 * Checkbox Component - MindEase Mobile
 * Accessible checkbox with cognitive accessibility features
 *
 * Supports composition API with Checkbox.Label and Checkbox.Description
 *
 * @example
 * ```tsx
 * <Checkbox checked={completed} onChange={setCompleted}>
 *   <Checkbox.Label checked={completed} onPress={handleToggle}>
 *     Complete task
 *   </Checkbox.Label>
 *   <Checkbox.Description>Mark this task as completed</Checkbox.Description>
 * </Checkbox>
 * ```
 */
export interface CheckboxProps {
  /** Current checked state */
  checked: boolean;

  /** Change handler */
  onChange: (checked: boolean) => void;

  /** Disable the checkbox */
  disabled?: boolean;

  /** Checkbox content (Checkbox subcomponents when using composition API) */
  children?: ReactNode;

  /** Custom className for container */
  className?: string;

  /** Test ID for testing */
  testID?: string;

  /** Accessibility label */
  accessibilityLabel?: string;
}

function CheckboxRoot({
  checked,
  onChange,
  disabled = false,
  children,
  className = '',
  testID,
  accessibilityLabel,
}: CheckboxProps) {
  const { spacingClasses } = useAccessibilityClasses();

  const containerClasses = useMemo(
    () => `${styles.container} ${spacingClasses.gap} ${className}`,
    [spacingClasses.gap, className]
  );

  const checkboxClasses = useMemo(() => {
    const base = styles.checkbox;
    const state = checked ? styles.checkboxChecked : styles.checkboxUnchecked;
    const disabledClass = disabled ? ` ${styles.checkboxDisabled}` : '';
    return `${base} ${state}${disabledClass}`;
  }, [checked, disabled]);

  const handlePress = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <View
      className={containerClasses}
      testID={testID || 'checkbox-container'}
      accessibilityRole="none">
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        className={checkboxClasses}
        testID={testID ? `${testID}-checkbox` : 'checkbox'}
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled }}
        accessibilityLabel={accessibilityLabel}>
        {checked && (
          <Check
            size={16}
            color={THEME_COLORS.textWhite}
            className={styles.checkboxIcon}
            strokeWidth={4}
          />
        )}
      </Pressable>
      {children ? <View className={styles.content}>{children}</View> : null}
    </View>
  );
}

CheckboxRoot.displayName = 'Checkbox';

export const Checkbox = Object.assign(CheckboxRoot, {
  Label: CheckboxLabel,
  Description: CheckboxDescription,
});
