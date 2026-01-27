
import { CognitiveAlertBanner } from './CognitiveAlertBanner';

/**
 * Cognitive Alert Prolonged Navigation Component - MindEase Mobile
 * Alert shown when user has been navigating the app for a long time without taking action
 *
 * Shows when: user has been navigating >X minutes without completing subtasks, starting focus, or other actions
 */
export interface CognitiveAlertProlongedNavigationProps {
  /** Whether alert is visible */
  isVisible: boolean;

  /** Callback when alert is dismissed */
  onDismiss: () => void;

  /** Test ID for testing */
  testID?: string;
}

export function CognitiveAlertProlongedNavigation({
  isVisible,
  onDismiss,
  testID,
}: CognitiveAlertProlongedNavigationProps) {
  return (
    <CognitiveAlertBanner
      isVisible={isVisible}
      titleKey="cognitive_alerts_prolonged_navigation_title"
      messageKey="cognitive_alerts_prolonged_navigation_message"
      onDismiss={onDismiss}
      testID={testID || 'cognitive-alert-prolonged-navigation'}
    />
  );
}

CognitiveAlertProlongedNavigation.displayName =
  'CognitiveAlertProlongedNavigation';
