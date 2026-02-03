import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import { useActiveTaskIndicator } from '@/hooks/tasks';
import { PROTECTED_ROUTES } from '@/utils/routes';
import { THEME_COLORS } from '@/utils/theme/theme-colors';
import type { DrawerHeaderProps } from '@react-navigation/drawer';
import { getHeaderTitle, Header } from '@react-navigation/elements';
import { useRouter } from 'expo-router';
import { Clock, Coffee } from 'lucide-react-native';
import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { formatTime } from '@/utils/timer/timer-helpers';
import { styles } from './active-task-banner-styles';

/**
 * ActiveTaskIndicatorBanner - MindEase Mobile
 *
 * Banner displayed below the header when a focus or break timer is active.
 * Shows task title (truncated), timer type icon, and remaining time.
 * Tap navigates to the Tasks screen.
 *
 * Accessibility: role button, full label (task + type + time), hint to open Tasks.
 */
export function ActiveTaskIndicatorBanner() {
  const { activeTimer, activeTask, timerType, remainingTime } = useActiveTaskIndicator();
  const { getText } = useTextDetail();
  const { fontSizeClasses, spacingValue } = useAccessibilityClasses();
  const router = useRouter();

  const formattedTime = useMemo(() => formatTime(remainingTime), [remainingTime]);

  const statusText = useMemo(() => {
    if (timerType === 'focus') return getText('tasks_focus_session_active');
    return getText('tasks_break_session_active');
  }, [timerType, getText]);

  const accessibilityLabel = useMemo(() => {
    const taskTitle = activeTask?.title || getText('tasks_count_aria');
    const typeLabel =
      timerType === 'focus'
        ? getText('tasks_focus_session_active')
        : getText('tasks_break_session_active');
    return `${typeLabel}, ${taskTitle}, ${getText('tasks_focus_time_remaining')} ${formattedTime}`;
  }, [activeTask?.title, timerType, formattedTime, getText]);

  const handlePress = () => router.push(PROTECTED_ROUTES.TASKS);

  if (!activeTimer || !timerType) {
    return null;
  }

  const iconColor = timerType === 'focus' ? THEME_COLORS.actionPrimary : THEME_COLORS.actionWarning;
  const Icon = timerType === 'focus' ? Clock : Coffee;

  return (
    <Pressable
      onPress={handlePress}
      className={styles.banner}
      style={{ minHeight: Math.max(44, spacingValue * 2 + 20) }}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={getText('active_task_indicator_hint')}
      accessibilityLiveRegion="polite"
      testID="active-task-indicator-banner">
      <View className={styles.bannerIconWrapper} accessibilityElementsHidden>
        <Icon color={iconColor} size={22} />
      </View>
      <View className={styles.bannerContent}>
        <Text
          className={`${styles.bannerTitle} ${fontSizeClasses.sm}`}
          numberOfLines={1}
          accessibilityElementsHidden>
          {activeTask?.title || statusText}
        </Text>
        <Text
          className={`${styles.bannerStatus} ${fontSizeClasses.xs}`}
          numberOfLines={1}
          accessibilityElementsHidden>
          {statusText}
        </Text>
      </View>
      <Text className={`${styles.bannerTime} ${fontSizeClasses.base}`} accessibilityElementsHidden>
        {formattedTime}
      </Text>
    </Pressable>
  );
}

/**
 * Renders the default Drawer header plus ActiveTaskIndicatorBanner below it.
 * Use as screenOptions.header in the authenticated Drawer layout.
 */
export function HeaderWithActiveTaskBanner(props: DrawerHeaderProps) {
  const { layout, options, route } = props;

  return (
    <View>
      <Header
        {...options}
        layout={layout}
        title={getHeaderTitle(options, route.name)}
        headerLeft={(headerProps) => <DrawerToggleButton {...headerProps} />}
      />
      <ActiveTaskIndicatorBanner />
    </View>
  );
}
