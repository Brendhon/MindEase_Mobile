import { THEME_COLORS } from '@/utils/theme/theme-colors';
import React from 'react';
import { Switch as RNSwitch, View } from 'react-native';

/**
 * Switch.Toggle - Toggle switch visual component
 * Uses native React Native Switch component
 *
 * @example
 * ```tsx
 * <Switch checked={enabled} onChange={setEnabled}>
 *   <Switch.Toggle checked={enabled} onChange={setEnabled} />
 *   <Switch.Label>Enable notifications</Switch.Label>
 * </Switch>
 * ```
 */
export interface SwitchToggleProps {
  /** Current checked state */
  checked: boolean;

  /** Change handler */
  onChange: (checked: boolean) => void;

  /** Disable the switch */
  disabled?: boolean;

  /** Test ID for testing */
  testID?: string;
}

export function SwitchToggle({
  checked,
  onChange,
  disabled = false,
  testID,
}: SwitchToggleProps) {
  return (
    <View testID={testID || 'switch-toggle'}>
      <RNSwitch
        value={checked}
        onValueChange={onChange}
        disabled={disabled}
        trackColor={{
          false: THEME_COLORS.bgTertiary,
          true: THEME_COLORS.actionPrimary,
        }}
        thumbColor={THEME_COLORS.textWhite}
        ios_backgroundColor={THEME_COLORS.bgTertiary}
        accessibilityRole="switch"
        accessibilityState={{ checked, disabled }}
      />
    </View>
  );
}

SwitchToggle.displayName = 'Switch.Toggle';
