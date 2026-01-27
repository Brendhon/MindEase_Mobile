import { PageHeader } from '@/components/layout/PageHeader';
import { useAccessibilityClasses } from '@/hooks/accessibility';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import { useTextDetail } from '@/hooks/accessibility';
import { Task } from '@/models/task';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { DashboardCognitiveAlerts } from './DashboardCognitiveAlerts';
import { DashboardError } from './DashboardError';
import { DashboardStatsCards } from './DashboardStatsCards';
import { ContentSettings } from './ContentSettings';
import { InteractionSettings } from './InteractionSettings';
import { VisualSettings } from './VisualSettings';
import { DashboardResetButton } from './DashboardResetButton';
import { styles } from './dashboard-styles';

/**
 * DashboardContent Component - MindEase Mobile
 * Client-side interactive content for dashboard
 *
 * This component handles all client-side interactivity including:
 * - Cognitive settings management
 * - Real-time accessibility adjustments
 * - Task statistics display
 */
export interface DashboardContentProps {
  /** Tasks data */
  tasks: Task[];

  /** Error message if any */
  error?: string | null;

  /** Test ID for testing */
  testID?: string;
}

export function DashboardContent({
  tasks,
  error,
  testID,
}: DashboardContentProps) {
  const { error: settingsError } = useCognitiveSettings();

  // Use accessibility classes hook for optimized class generation
  // Only re-renders when spacing changes
  const { spacingClasses } = useAccessibilityClasses();

  // Use text detail hook for optimized text helpers
  // Only re-renders when textDetail setting changes
  const { getText } = useTextDetail();

  const hasError = error || settingsError;

  // Generate container classes with memoization
  const containerClasses = useMemo(
    () => `${styles.container} ${spacingClasses.gap}`,
    [spacingClasses.gap]
  );

  const contentClasses = useMemo(
    () => `${styles.content} ${spacingClasses.gap}`,
    [spacingClasses.gap]
  );

  return (
    <View
      className={containerClasses}
      testID={testID || 'dashboard-content-container'}
    >
      <PageHeader
        descriptionKey="dashboard_description"
        testID={testID ? `${testID}-header` : 'dashboard-header'}
      />

      {hasError && (
        <DashboardError
          message={getText('dashboard_error')}
          testID={testID ? `${testID}-error` : 'dashboard-error'}
        />
      )}

      {/* Cognitive Alerts */}
      <DashboardCognitiveAlerts
        testID={testID ? `${testID}-cognitive-alerts` : 'dashboard-cognitive-alerts'}
      />

      {/* Task Statistics Cards */}
      <DashboardStatsCards
        tasks={tasks}
        testID={testID ? `${testID}-stats-cards` : 'dashboard-stats-cards'}
      />

      {/* Cognitive Settings */}
      <View className={contentClasses}>
        <VisualSettings
          testID={testID ? `${testID}-visual-settings` : 'dashboard-visual-settings'}
        />
        <InteractionSettings
          testID={
            testID
              ? `${testID}-interaction-settings`
              : 'dashboard-interaction-settings'
          }
        />
        <ContentSettings
          testID={
            testID ? `${testID}-content-settings` : 'dashboard-content-settings'
          }
        />
      </View>

      <DashboardResetButton
        testID={testID ? `${testID}-reset-button` : 'dashboard-reset-button'}
      />
    </View>
  );
}

DashboardContent.displayName = 'DashboardContent';
