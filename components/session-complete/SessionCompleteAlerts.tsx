/**
 * SessionCompleteAlerts Component - MindEase Mobile
 *
 * Orchestrator component that runs the focus and break session complete alert hooks.
 * Renders nothing; each hook monitors timer state and shows a native Alert when
 * the corresponding session completes (focus or break timer reaches zero).
 *
 * Must be rendered inside: TasksProvider, FocusTimerProvider, BreakTimerProvider,
 * ExcessiveTimeAlertProvider, MissingBreakAlertProvider, ProlongedNavigationAlertProvider,
 * and within a tree that provides useAlert and useTextDetail (CognitiveSettingsProvider, etc.).
 */

import {
  useFocusSessionCompleteAlert,
  useBreakSessionCompleteAlert,
} from '@/hooks/timer';

export function SessionCompleteAlerts() {
  useFocusSessionCompleteAlert();
  useBreakSessionCompleteAlert();
  return null;
}
