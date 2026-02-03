import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import type { AccessibilityTextKey } from '@/utils/accessibility';
import { THEME_COLORS } from '@/utils/theme/theme-colors';
import { BellRing, X } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './dashboard-styles';

/**
 * Cognitive Alert Banner Component - MindEase Mobile
 * Base banner component for cognitive alerts
 *
 * Displays a discrete, non-blocking informational banner with:
 * - Accessible attributes
 * - Dismiss button
 * - Support for contrast modes
 * - Responsive layout
 */
export interface CognitiveAlertBannerProps {
  /** Whether banner is visible */
  isVisible: boolean;

  /** Translation key for title */
  titleKey: AccessibilityTextKey;

  /** Translation key for message */
  messageKey: AccessibilityTextKey;

  /** Callback when banner is dismissed */
  onDismiss: () => void;

  /** Test ID for testing */
  testID?: string;
}

export function CognitiveAlertBanner({
  isVisible,
  titleKey,
  messageKey,
  onDismiss,
  testID,
}: CognitiveAlertBannerProps) {
  const { getText } = useTextDetail();
  const { fontSizeClasses, spacingClasses } = useAccessibilityClasses();

  // Generate accessible classes with memoization
  const bannerClasses = useMemo(
    () => `${styles.cognitiveAlertBanner.banner} ${spacingClasses.padding}`,
    [spacingClasses.padding]
  );

  const titleClasses = useMemo(
    () => `${styles.cognitiveAlertBanner.title} ${fontSizeClasses.base}`,
    [fontSizeClasses.base]
  );

  const messageClasses = useMemo(
    () => `${styles.cognitiveAlertBanner.message} ${fontSizeClasses.sm}`,
    [fontSizeClasses.sm]
  );

  const dismissAriaLabel = getText('cognitive_alerts_dismiss_aria') || 'Dismiss alert';

  if (!isVisible) {
    return null;
  }

  return (
    <View
      className={bannerClasses}
      accessibilityRole="alert"
      testID={testID || 'cognitive-alert-banner'}>
      <View className={styles.cognitiveAlertBanner.bannerContainer}>
        <View className={styles.cognitiveAlertBanner.icon}>
          <BellRing
            size={24}
            color={THEME_COLORS.actionWarning}
            accessibilityElementsHidden={true}
          />
        </View>
        <View className={styles.cognitiveAlertBanner.bannerContent}>
          <Text className={titleClasses}>{getText(titleKey)}</Text>
          <Text className={messageClasses}>{getText(messageKey)}</Text>
        </View>
        <Pressable
          onPress={onDismiss}
          accessibilityLabel={dismissAriaLabel}
          accessibilityRole="button"
          className={styles.cognitiveAlertBanner.dismissButton}
          testID={testID ? `${testID}-dismiss` : 'cognitive-alert-dismiss'}>
          <X size={16} color={THEME_COLORS.actionPrimary} />
        </Pressable>
      </View>
    </View>
  );
}

CognitiveAlertBanner.displayName = 'CognitiveAlertBanner';
