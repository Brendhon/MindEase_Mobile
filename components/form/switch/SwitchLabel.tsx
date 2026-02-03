import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { useMemo } from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from './switch-styles';

/**
 * Switch.Label - Label subcomponent
 *
 * @example
 * ```tsx
 * <Switch checked={enabled} onChange={setEnabled}>
 *   <Switch.Toggle checked={enabled} onChange={setEnabled} />
 *   <Switch.Label>Enable notifications</Switch.Label>
 * </Switch>
 * ```
 */
export interface SwitchLabelProps {
  /** Label text */
  children: string;

  /** Click handler (optional, for toggling switch when label is pressed) */
  onPress?: () => void;

  /** Test ID for testing */
  testID?: string;
}

export function SwitchLabel({ children, onPress, testID }: SwitchLabelProps) {
  const { fontSizeClasses } = useAccessibilityClasses();

  const labelClasses = useMemo(
    () => `${styles.label} ${fontSizeClasses.base}`,
    [fontSizeClasses.base]
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button" testID={testID || 'switch-label'}>
        <Text className={labelClasses}>{children}</Text>
      </Pressable>
    );
  }

  return (
    <Text className={labelClasses} testID={testID || 'switch-label'} accessibilityRole="text">
      {children}
    </Text>
  );
}

SwitchLabel.displayName = 'Switch.Label';
