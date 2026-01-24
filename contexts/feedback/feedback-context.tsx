import { createContext, useContext } from 'react';

import { FeedbackContextValue } from '@/models/feedback';

/**
 * Feedback Context - MindEase Mobile
 *
 * Context for global feedback/toast management.
 *
 * This context provides:
 * - List of active feedbacks
 * - Methods to add/remove feedbacks
 *
 * Components should use useFeedback() hook for displaying feedback messages.
 */

export const FeedbackContext = createContext<FeedbackContextValue | undefined>(
  undefined
);

/**
 * Hook to access feedback context
 * @throws Error if used outside FeedbackProvider
 */
export function useFeedbackContext(): FeedbackContextValue {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedbackContext must be used within FeedbackProvider');
  }
  return context;
}
