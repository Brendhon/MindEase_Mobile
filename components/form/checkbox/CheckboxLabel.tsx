import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { ReactNode, useMemo } from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from './checkbox-styles';

/**
 * Checkbox.Label - Label text for checkbox
 *
 * @example
 * ```tsx
 * <Checkbox checked={enabled} onChange={setEnabled}>
 *   <Checkbox.Label checked={enabled} onPress={handleToggle}>
 *     Enable notifications
 *   </Checkbox.Label>
 * </Checkbox>
 * ```
 */
export interface CheckboxLabelProps {
  /** Label content */
  children: ReactNode;

  /** Whether checkbox is checked (for strikethrough styling) */
  checked?: boolean;

  /** Custom className */
  className?: string;

  /** Press handler (for making label clickable to toggle) */
  onPress?: () => void;

  /** Test ID for testing */
  testID?: string;
}

export function CheckboxLabel({
  children,
  checked = false,
  className = '',
  onPress,
  testID,
}: CheckboxLabelProps) {
  const { fontSizeClasses } = useAccessibilityClasses();

  const labelClasses = useMemo(() => {
    const base = `${styles.label} ${fontSizeClasses.sm}`;
    const checkedClass = checked ? ` ${styles.labelChecked}` : '';
    return `${base}${checkedClass} ${className}`.trim();
  }, [fontSizeClasses.sm, checked, className]);

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        testID={testID || 'checkbox-label'}
      >
        <Text className={labelClasses} numberOfLines={2}>
          {children}
        </Text>
      </Pressable>
    );
  }

  return (
    <Text
      className={labelClasses}
      testID={testID || 'checkbox-label'}
      accessibilityRole="text"
      numberOfLines={2}
    >
      {children}
    </Text>
  );
}

CheckboxLabel.displayName = 'Checkbox.Label';
