import React, { ReactNode, useCallback, useState } from 'react';

import { FeedbackContext } from '@/contexts/feedback';
import { FeedbackMessage } from '@/models/feedback';

interface FeedbackProviderProps {
  children: ReactNode;
}

/**
 * Provider for global feedback/toast management
 * Manages state and lifecycle of feedback messages
 *
 * Note: Unlike the web version, this provider does NOT include a ToastManager component.
 * The ToastManager should be added separately in the app layout.
 */
export function FeedbackProvider({ children }: FeedbackProviderProps) {
  const [feedbacks, setFeedbacks] = useState<FeedbackMessage[]>([]);

  const addFeedback = useCallback((feedback: FeedbackMessage) => {
    setFeedbacks((prev) => [...prev, feedback]);
  }, []);

  const removeFeedback = useCallback((id: string) => {
    setFeedbacks((prev) => prev.filter((f) => f.id !== id));
  }, []);

  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        addFeedback,
        removeFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
