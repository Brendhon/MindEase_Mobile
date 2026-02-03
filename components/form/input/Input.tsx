import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { ReactNode, useMemo } from 'react';
import { View } from 'react-native';
import { InputError } from './InputError';
import { InputField } from './InputField';
import { InputLabel } from './InputLabel';
import { styles } from './input-styles';

/**
 * Input Component - MindEase Mobile
 * Accessible input with cognitive accessibility features
 *
 * Uses composition pattern exclusively - only accepts Input subcomponents:
 * - Input.Label for labels
 * - Input.Field for input/textarea elements
 * - Input.Error for error messages
 *
 * @example
 * ```tsx
 * // Basic input
 * <Input>
 *   <Input.Label>Email</Input.Label>
 *   <Input.Field type="email" value={email} onChangeText={setEmail} />
 * </Input>
 *
 * // With error
 * <Input>
 *   <Input.Label>Email</Input.Label>
 *   <Input.Field type="email" value={email} onChangeText={setEmail} />
 *   <Input.Error>Please enter a valid email</Input.Error>
 * </Input>
 *
 * // Textarea
 * <Input>
 *   <Input.Label>Description</Input.Label>
 *   <Input.Field
 *     as="textarea"
 *     multiline
 *     numberOfLines={4}
 *     value={description}
 *     onChangeText={setDescription}
 *   />
 * </Input>
 * ```
 */
export interface InputProps {
  /** Input content (Input subcomponents) */
  children: ReactNode;

  /** Custom className for container */
  className?: string;

  /** Test ID for testing */
  testID?: string;
}

function InputRoot({ children, className = '', testID }: InputProps) {
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
      testID={testID || 'input-container'}
      accessibilityRole="none">
      {children}
    </View>
  );
}

InputRoot.displayName = 'Input';

// Compose Input with subcomponents
export const Input = Object.assign(InputRoot, {
  Label: InputLabel,
  Field: InputField,
  Error: InputError,
});
