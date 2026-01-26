import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { useId, useMemo, ReactNode } from 'react';
import { View } from 'react-native';
import { RadioGroupContext } from './radio-group-context';
import { RadioGroupDescription } from './RadioGroupDescription';
import { RadioGroupHeader } from './RadioGroupHeader';
import { RadioGroupLabel } from './RadioGroupLabel';
import { RadioGroupOption } from './RadioGroupOption';
import { styles } from './radio-group-styles';

/**
 * RadioGroup Component - MindEase Mobile
 * Accessible radio group with cognitive accessibility features
 *
 * Uses composition pattern exclusively - only accepts RadioGroup subcomponents:
 * - RadioGroup.Header for label and description wrapper
 * - RadioGroup.Label for the group label
 * - RadioGroup.Description for optional description
 * - RadioGroup.Option for individual radio options
 *
 * @example
 * ```tsx
 * <RadioGroup value={selected} onChange={setSelected}>
 *   <RadioGroup.Header>
 *     <RadioGroup.Label>Choose option</RadioGroup.Label>
 *     <RadioGroup.Description>Select one option</RadioGroup.Description>
 *   </RadioGroup.Header>
 *   <RadioGroup.Option value="option1" label="Option 1" />
 *   <RadioGroup.Option value="option2" label="Option 2" />
 * </RadioGroup>
 * ```
 */
export interface RadioGroupProps<T extends string = string> {
  /** Current selected value */
  value: T;

  /** Change handler */
  onChange: (value: T) => void;

  /** Radio group content (RadioGroup subcomponents) */
  children: ReactNode;

  /** Disable the radio group */
  disabled?: boolean;

  /** Custom className for container */
  className?: string;

  /** Test ID for testing */
  testID?: string;
}

function RadioGroupRoot<T extends string = string>({
  value,
  onChange,
  children,
  disabled = false,
  className = '',
  testID,
}: RadioGroupProps<T>) {
  const id = useId();
  const labelId = `radio-group-label-${id}`;
  const descriptionId = `radio-group-description-${id}`;

  // Use cognitive settings hook for automatic accessibility class generation
  const { spacingClasses } = useAccessibilityClasses();

  // Generate container classes with spacing preference
  const containerClasses = useMemo(
    () => `${styles.container} ${spacingClasses.gap} ${className}`,
    [spacingClasses.gap, className]
  );

  // Generate options container classes with spacing preference
  const optionsClasses = useMemo(
    () => `${styles.options} ${spacingClasses.gap}`,
    [spacingClasses.gap]
  );

  // Provide context to subcomponents
  const contextValue = useMemo(
    () => ({
      labelId,
      descriptionId,
      value: value as string,
      onChange: onChange as (value: string) => void,
      disabled,
    }),
    [labelId, descriptionId, value, onChange, disabled]
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <View
        className={containerClasses}
        testID={testID || 'radio-group-container'}
        accessibilityRole="radiogroup"
        accessibilityLabel="Radio group"
      >
        <View className={optionsClasses}>{children}</View>
      </View>
    </RadioGroupContext.Provider>
  );
}

RadioGroupRoot.displayName = 'RadioGroup';

// Compose RadioGroup with subcomponents
export const RadioGroup = Object.assign(RadioGroupRoot, {
  Option: RadioGroupOption,
  Header: RadioGroupHeader,
  Label: RadioGroupLabel,
  Description: RadioGroupDescription,
});
