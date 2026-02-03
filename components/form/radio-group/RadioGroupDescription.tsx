import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { styles } from './radio-group-styles';

/**
 * RadioGroup.Description - Description subcomponent
 *
 * @example
 * ```tsx
 * <RadioGroup value={selected} onChange={setSelected}>
 *   <RadioGroup.Header>
 *     <RadioGroup.Label>Choose option</RadioGroup.Label>
 *     <RadioGroup.Description>Select one of the options below</RadioGroup.Description>
 *   </RadioGroup.Header>
 *   <RadioGroup.Option value="option1" label="Option 1" />
 * </RadioGroup>
 * ```
 */
export interface RadioGroupDescriptionProps {
  /** Description text */
  children: string;

  /** Test ID for testing */
  testID?: string;
}

export function RadioGroupDescription({ children, testID }: RadioGroupDescriptionProps) {
  const { fontSizeClasses } = useAccessibilityClasses();

  const descriptionClasses = useMemo(
    () => `${styles.description} ${fontSizeClasses.sm}`,
    [fontSizeClasses]
  );

  return (
    <Text
      className={descriptionClasses}
      testID={testID || 'radio-group-description'}
      accessibilityRole="text"
      accessibilityLabel={children}>
      {children}
    </Text>
  );
}

RadioGroupDescription.displayName = 'RadioGroup.Description';
