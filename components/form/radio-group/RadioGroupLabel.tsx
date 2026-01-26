import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { useRadioGroupContext } from './radio-group-context';
import { styles } from './radio-group-styles';

/**
 * RadioGroup.Label - Label subcomponent
 *
 * @example
 * ```tsx
 * <RadioGroup value={selected} onChange={setSelected}>
 *   <RadioGroup.Header>
 *     <RadioGroup.Label>Choose option</RadioGroup.Label>
 *   </RadioGroup.Header>
 *   <RadioGroup.Option value="option1" label="Option 1" />
 * </RadioGroup>
 * ```
 */
export interface RadioGroupLabelProps {
  /** Label text */
  children: string;

  /** Test ID for testing */
  testID?: string;
}

export function RadioGroupLabel({
  children,
  testID,
}: RadioGroupLabelProps) {
  const { fontSizeClasses } = useAccessibilityClasses();
  const context = useRadioGroupContext();

  const labelClasses = useMemo(
    () => `${styles.label} ${fontSizeClasses.base}`,
    [fontSizeClasses.base]
  );

  return (
    <Text
      className={labelClasses}
      testID={testID || 'radio-group-label'}
      accessibilityRole="text"
      accessibilityLabel={children}
    >
      {children}
    </Text>
  );
}

RadioGroupLabel.displayName = 'RadioGroup.Label';
