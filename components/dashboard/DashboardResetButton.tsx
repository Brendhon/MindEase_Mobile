import { Button } from '@/components/ui/button';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import { RotateCcw } from 'lucide-react-native';
import { useTextDetail } from '@/hooks/accessibility';

import { View } from 'react-native';
import { styles } from './dashboard-styles';

/**
 * DashboardResetButton Component - MindEase Mobile
 * Reset button for restoring default accessibility settings
 */
export interface DashboardResetButtonProps {
  /** Test ID for testing */
  testID?: string;
}

export function DashboardResetButton({ testID }: DashboardResetButtonProps) {
  const { resetSettings } = useCognitiveSettings();
  const { getText } = useTextDetail();

  return (
    <View
      className={styles.resetButtonContainer}
      testID={testID || 'dashboard-reset-button-container'}>
      <Button
        variant="secondary"
        size="md"
        onPress={resetSettings}
        accessibilityLabel={getText('profile_reset_aria')}
        testID={testID || 'dashboard-reset-button'}>
        <Button.Icon icon={RotateCcw} position="left" size="md" variant="secondary" />
        <Button.Text variant="secondary">{getText('profile_reset')}</Button.Text>
      </Button>
    </View>
  );
}

DashboardResetButton.displayName = 'DashboardResetButton';
