import {
  useExcessiveTimeAlert,
  useMissingBreakAlert,
  useProlongedNavigationAlert,
} from '@/hooks/cognitive-alerts';

import { View } from 'react-native';
import { CognitiveAlertExcessiveTime } from './CognitiveAlertExcessiveTime';
import { CognitiveAlertMissingBreak } from './CognitiveAlertMissingBreak';
import { CognitiveAlertProlongedNavigation } from './CognitiveAlertProlongedNavigation';

/**
 * DashboardCognitiveAlerts Component - MindEase Mobile
 * Display cognitive alerts based on task focus time, break patterns, and navigation behavior
 *
 * Alerts:
 * - Excessive time: Same task in focus for >60-90 min
 * - Missing break: Multiple focus sessions without break
 * - Prolonged navigation: Navigating without actions for extended time
 *
 * Priority: excessive_time > missing_break > prolonged_navigation
 */
export interface DashboardCognitiveAlertsProps {
  /** Test ID for testing */
  testID?: string;
}

export function DashboardCognitiveAlerts({ testID }: DashboardCognitiveAlertsProps) {
  const { isMissingBreakAlertVisible, dismissMissingBreakAlert } = useMissingBreakAlert();
  const { isProlongedNavigationAlertVisible, dismissProlongedNavigationAlert } =
    useProlongedNavigationAlert();
  const { isExcessiveTimeAlertVisible, dismissExcessiveTimeAlert } = useExcessiveTimeAlert();

  return (
    <View accessibilityRole="none" testID={testID || 'dashboard-cognitive-alerts'}>
      <CognitiveAlertExcessiveTime
        isVisible={isExcessiveTimeAlertVisible}
        onDismiss={dismissExcessiveTimeAlert}
        testID={testID ? `${testID}-excessive-time` : undefined}
      />
      <CognitiveAlertMissingBreak
        isVisible={isMissingBreakAlertVisible}
        onDismiss={dismissMissingBreakAlert}
        testID={testID ? `${testID}-missing-break` : undefined}
      />
      <CognitiveAlertProlongedNavigation
        isVisible={isProlongedNavigationAlertVisible}
        onDismiss={dismissProlongedNavigationAlert}
        testID={testID ? `${testID}-prolonged-navigation` : undefined}
      />
    </View>
  );
}

DashboardCognitiveAlerts.displayName = 'DashboardCognitiveAlerts';
