import React from 'react';
import { CognitiveAlertBanner } from './CognitiveAlertBanner';

/**
 * Cognitive Alert Missing Break Component - MindEase Mobile
 * Alert shown when user has completed multiple focus sessions without taking a break
 *
 * Shows when: 3+ focus sessions completed without break
 */
export interface CognitiveAlertMissingBreakProps {
  /** Whether alert is visible */
  isVisible: boolean;

  /** Callback when alert is dismissed */
  onDismiss: () => void;

  /** Test ID for testing */
  testID?: string;
}

export function CognitiveAlertMissingBreak({
  isVisible,
  onDismiss,
  testID,
}: CognitiveAlertMissingBreakProps) {
  return (
    <CognitiveAlertBanner
      isVisible={isVisible}
      titleKey="cognitive_alerts_missing_break_title"
      messageKey="cognitive_alerts_missing_break_message"
      onDismiss={onDismiss}
      testID={testID || 'cognitive-alert-missing-break'}
    />
  );
}

CognitiveAlertMissingBreak.displayName = 'CognitiveAlertMissingBreak';
