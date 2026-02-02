import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { styles } from './input-styles';

/**
 * Input.Label - Label subcomponent
 * Use this for consistent label styling within inputs
 *
 * @example
 * ```tsx
 * <Input>
 *   <Input.Label>Email</Input.Label>
 *   <Input.Field type="email" value={email} onChangeText={setEmail} />
 * </Input>
 * ```
 */
export interface InputLabelProps {
  /** Label text */
  children: string;

  /** Native ID for association with field (a11y and testing) */
  nativeID?: string;

  /** Test ID for testing */
  testID?: string;
}

export function InputLabel({
  children,
  nativeID,
  testID,
}: InputLabelProps) {
  // Use cognitive settings hook for automatic accessibility class generation
  // Font size automatically updates when user preferences change
  const { fontSizeClasses } = useAccessibilityClasses();

  // Get fontSize class (use sm for labels)
  const fontSizeClass = useMemo(() => fontSizeClasses.sm, [fontSizeClasses.sm]);

  return (
    <Text
      nativeID={nativeID}
      className={`${styles.label} ${fontSizeClass}`}
      testID={testID || 'input-label'}
      accessibilityRole="text"
      accessibilityLabel={children}
    >
      {children}
    </Text>
  );
}

InputLabel.displayName = 'Input.Label';
