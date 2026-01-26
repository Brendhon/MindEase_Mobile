import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { styles } from './select-styles';

/**
 * Select.Error - Error message subcomponent
 * Use this for displaying error messages
 *
 * @example
 * ```tsx
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
export interface SelectErrorProps {
  /** Error message text */
  children: string;

  /** Test ID for testing */
  testID?: string;
}

export function SelectError({ children, testID }: SelectErrorProps) {
  // Use cognitive settings hook for automatic accessibility class generation
  // Font size automatically updates when user preferences change
  const { fontSizeClasses } = useAccessibilityClasses();

  // Get fontSize class (use sm for error messages)
  const fontSizeClass = useMemo(() => fontSizeClasses.sm, [fontSizeClasses.sm]);

  return (
    <Text
      className={`${styles.error} ${fontSizeClass}`}
      testID={testID || 'select-error'}
      accessibilityRole="alert"
      accessibilityLabel={children}
    >
      {children}
    </Text>
  );
}

SelectError.displayName = 'Select.Error';
