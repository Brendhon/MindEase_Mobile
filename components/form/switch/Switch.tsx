import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { ReactNode, useMemo } from 'react';
import { View } from 'react-native';
import { SwitchDescription } from './SwitchDescription';
import { SwitchLabel } from './SwitchLabel';
import { SwitchToggle } from './SwitchToggle';
import { styles } from './switch-styles';

/**
 * Switch Component - MindEase Mobile
 * Accessible toggle switch with cognitive accessibility features
 *
 * Uses composition pattern exclusively - only accepts Switch subcomponents:
 * - Switch.Toggle for the toggle switch
 * - Switch.Label for the label
 * - Switch.Description for optional description
 *
 * @example
 * ```tsx
 * // Composition API
 * <Switch>
 *   <Switch.Toggle checked={enabled} onChange={setEnabled} />
 *   <Switch.Label>Enable notifications</Switch.Label>
 *   <Switch.Description>Receive email notifications</Switch.Description>
 * </Switch>
 * ```
 */
export interface SwitchProps {
  /** Switch content (Switch subcomponents) */
  children: ReactNode;

  /** Custom className for container */
  className?: string;

  /** Test ID for testing */
  testID?: string;
}

function SwitchRoot({ className = '', children, testID }: SwitchProps) {
  // Use cognitive settings hook for automatic accessibility class generation
  const { spacingClasses } = useAccessibilityClasses();

  // Generate container classes with spacing preference
  const containerClasses = useMemo(
    () => `${styles.container} ${spacingClasses.gap} ${className}`,
    [spacingClasses.gap, className]
  );

  const [toggle, ...content] = React.Children.toArray(children);

  return (
    <View
      className={containerClasses}
      testID={testID || 'switch-container'}
      accessibilityRole="none">
      {toggle}
      {content.length > 0 && <View className={styles.content}>{content}</View>}
    </View>
  );
}

SwitchRoot.displayName = 'Switch';

// Compose Switch with subcomponents
export const Switch = Object.assign(SwitchRoot, {
  Toggle: SwitchToggle,
  Label: SwitchLabel,
  Description: SwitchDescription,
});
