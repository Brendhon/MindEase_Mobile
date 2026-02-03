import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { ReactNode, useMemo } from 'react';
import { Text } from 'react-native';
import { styles } from './checkbox-styles';

/**
 * Checkbox.Description - Description text for checkbox
 *
 * @example
 * ```tsx
 * <Checkbox checked={enabled} onChange={setEnabled}>
 *   <Checkbox.Label>Enable notifications</Checkbox.Label>
 *   <Checkbox.Description>Receive email notifications</Checkbox.Description>
 * </Checkbox>
 * ```
 */
export interface CheckboxDescriptionProps {
  /** Description content */
  children: ReactNode;

  /** Custom className */
  className?: string;

  /** Test ID for testing */
  testID?: string;
}

export function CheckboxDescription({
  children,
  className = '',
  testID,
}: CheckboxDescriptionProps) {
  const { fontSizeClasses } = useAccessibilityClasses();

  const descriptionClasses = useMemo(
    () => `${styles.description} ${fontSizeClasses.sm} ${className}`.trim(),
    [fontSizeClasses.sm, className]
  );

  return (
    <Text
      className={descriptionClasses}
      testID={testID || 'checkbox-description'}
      accessibilityRole="text"
      accessibilityLabel={typeof children === 'string' ? children : undefined}>
      {children}
    </Text>
  );
}

CheckboxDescription.displayName = 'Checkbox.Description';
