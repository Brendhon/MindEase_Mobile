import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { styles } from './input-styles';

/**
 * Input.Error - Error message subcomponent
 * Use this for displaying error messages
 *
 * @example
 * ```tsx
 * <Input>
 *   <Input.Label>Email</Input.Label>
 *   <Input.Field type="email" value={email} onChangeText={setEmail} />
 *   <Input.Error>Please enter a valid email</Input.Error>
 * </Input>
 * ```
 */
export interface InputErrorProps {
  /** Error message text */
  children: string;

  /** Test ID for testing */
  testID?: string;
}

export function InputError({ children, testID }: InputErrorProps) {
  // Use cognitive settings hook for automatic accessibility class generation
  // Font size automatically updates when user preferences change
  const { fontSizeClasses } = useAccessibilityClasses();

  // Get fontSize class (use sm for error messages)
  const fontSizeClass = useMemo(() => fontSizeClasses.sm, [fontSizeClasses.sm]);

  return (
    <Text
      className={`${styles.error} ${fontSizeClass}`}
      testID={testID || 'input-error'}
      accessibilityRole="alert"
      accessibilityLabel={children}
    >
      {children}
    </Text>
  );
}

InputError.displayName = 'Input.Error';
