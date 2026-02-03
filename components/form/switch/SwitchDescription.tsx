import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { styles } from './switch-styles';

/**
 * Switch.Description - Description subcomponent
 *
 * @example
 * ```tsx
 * <Switch checked={enabled} onChange={setEnabled}>
 *   <Switch.Toggle checked={enabled} onChange={setEnabled} />
 *   <Switch.Label>Enable notifications</Switch.Label>
 *   <Switch.Description>Receive email notifications</Switch.Description>
 * </Switch>
 * ```
 */
export interface SwitchDescriptionProps {
  /** Description text */
  children: string;

  /** Test ID for testing */
  testID?: string;
}

export function SwitchDescription({ children, testID }: SwitchDescriptionProps) {
  const { fontSizeClasses } = useAccessibilityClasses();

  const descriptionClasses = useMemo(
    () => `${styles.description} ${fontSizeClasses.sm}`,
    [fontSizeClasses.sm]
  );

  return (
    <Text
      className={descriptionClasses}
      testID={testID || 'switch-description'}
      accessibilityRole="text"
      accessibilityLabel={children}>
      {children}
    </Text>
  );
}

SwitchDescription.displayName = 'Switch.Description';
