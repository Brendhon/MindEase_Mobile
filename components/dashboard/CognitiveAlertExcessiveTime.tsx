
import { CognitiveAlertBanner } from './CognitiveAlertBanner';

/**
 * Cognitive Alert Excessive Time Component - MindEase Mobile
 * Alert shown when user has been focusing on the same task for too long
 *
 * Shows when: same task in focus for >60-90 min (2-3 standard sessions)
 */
export interface CognitiveAlertExcessiveTimeProps {
  /** Whether alert is visible */
  isVisible: boolean;

  /** Callback when alert is dismissed */
  onDismiss: () => void;

  /** Test ID for testing */
  testID?: string;
}

export function CognitiveAlertExcessiveTime({
  isVisible,
  onDismiss,
  testID,
}: CognitiveAlertExcessiveTimeProps) {
  return (
    <CognitiveAlertBanner
      isVisible={isVisible}
      titleKey="cognitive_alerts_excessive_time_title"
      messageKey="cognitive_alerts_excessive_time_message"
      onDismiss={onDismiss}
      testID={testID || 'cognitive-alert-excessive-time'}
    />
  );
}

CognitiveAlertExcessiveTime.displayName = 'CognitiveAlertExcessiveTime';
