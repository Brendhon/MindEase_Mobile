import type { AccessibilityTextKey } from '@/utils/accessibility';

/**
 * Feedback types for semantic meaning
 */
export type FeedbackType = 'success' | 'error' | 'warning' | 'info';

/**
 * Feedback message configuration
 * Uses messageKey to reference text content from accessibility-texts.json
 */
export interface FeedbackMessage {
  id: string;
  type: FeedbackType;
  messageKey: AccessibilityTextKey;
  duration?: number;
}

/**
 * Feedback Context Value
 */
export interface FeedbackContextValue {
  feedbacks: FeedbackMessage[];
  addFeedback: (feedback: FeedbackMessage) => void;
  removeFeedback: (id: string) => void;
}
