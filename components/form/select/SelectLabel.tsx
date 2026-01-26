import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { styles } from './select-styles';

/**
 * Select.Label - Label subcomponent
 * Use this for consistent label styling within selects
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
 * </Select>
 * ```
 */
export interface SelectLabelProps {
  /** Label text */
  children: string;

  /** Test ID for testing */
  testID?: string;
}

export function SelectLabel({ children, testID }: SelectLabelProps) {
  // Use cognitive settings hook for automatic accessibility class generation
  // Font size automatically updates when user preferences change
  const { fontSizeClasses } = useAccessibilityClasses();

  // Get fontSize class (use sm for labels)
  const fontSizeClass = useMemo(() => fontSizeClasses.sm, [fontSizeClasses.sm]);

  return (
    <Text
      className={`${styles.label} ${fontSizeClass}`}
      testID={testID || 'select-label'}
      accessibilityRole="text"
      accessibilityLabel={children}
    >
      {children}
    </Text>
  );
}

SelectLabel.displayName = 'Select.Label';
