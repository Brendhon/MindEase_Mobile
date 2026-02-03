import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { styles } from './radio-group-styles';

/**
 * RadioGroup.Header - Header wrapper subcomponent
 * Encapsulates the standard header layout for Label and Description
 *
 * @example
 * ```tsx
 * <RadioGroup value={selected} onChange={setSelected}>
 *   <RadioGroup.Header>
 *     <RadioGroup.Label>Choose option</RadioGroup.Label>
 *     <RadioGroup.Description>Select one option</RadioGroup.Description>
 *   </RadioGroup.Header>
 *   <RadioGroup.Option value="option1" label="Option 1" />
 * </RadioGroup>
 * ```
 */
export interface RadioGroupHeaderProps {
  /** Header content (typically Label and Description) */
  children: ReactNode;

  /** Custom className */
  className?: string;

  /** Test ID for testing */
  testID?: string;
}

export function RadioGroupHeader({ children, className = '', testID }: RadioGroupHeaderProps) {
  return (
    <View className={`${styles.header} ${className}`} testID={testID}>
      {children}
    </View>
  );
}

RadioGroupHeader.displayName = 'RadioGroup.Header';
