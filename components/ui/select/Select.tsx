import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { ReactNode, useMemo } from 'react';
import { View } from 'react-native';
import { SelectError } from './SelectError';
import { SelectField } from './SelectField';
import { SelectLabel } from './SelectLabel';
import { styles } from './select-styles';

/**
 * Select Component - MindEase Mobile
 * Accessible select with cognitive accessibility features
 *
 * Uses composition pattern exclusively - only accepts Select subcomponents:
 * - Select.Label for labels
 * - Select.Field for select elements
 * - Select.Error for error messages
 *
 * @example
 * ```tsx
 * // Basic select
 * <Select>
 *   <Select.Label>Country</Select.Label>
 *   <Select.Field
 *     selectedValue={country}
 *     onValueChange={setCountry}
 *     items={[
 *       { label: 'Select a country', value: '' },
 *       { label: 'Brazil', value: 'br' },
 *       { label: 'United States', value: 'us' },
 *     ]}
 *   />
 * </Select>
 *
 * // With error
 * <Select>
 *   <Select.Label>Country</Select.Label>
 *   <Select.Field
 *     selectedValue={country}
 *     onValueChange={setCountry}
 *     items={countries}
 *   />
 *   <Select.Error>Please select a country</Select.Error>
 * </Select>
 * ```
 */
export interface SelectProps {
  /** Select content (Select subcomponents) */
  children: ReactNode;

  /** Custom className for container */
  className?: string;

  /** Test ID for testing */
  testID?: string;
}

function SelectRoot({ children, className = '', testID }: SelectProps) {
  // Use cognitive settings hook for automatic accessibility class generation
  // Gap automatically updates when user preferences change
  const { spacingClasses } = useAccessibilityClasses();

  // Generate container classes with spacing preference
  const containerClasses = useMemo(
    () => `${styles.container} ${spacingClasses.gap} ${className}`,
    [spacingClasses.gap, className]
  );

  return (
    <View
      className={containerClasses}
      testID={testID || 'select-container'}
      accessibilityRole="none"
    >
      {children}
    </View>
  );
}

SelectRoot.displayName = 'Select';

// Compose Select with subcomponents
export const Select = Object.assign(SelectRoot, {
  Label: SelectLabel,
  Field: SelectField,
  Error: SelectError,
});
