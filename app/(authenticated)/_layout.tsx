import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import { useAuth } from '@/hooks/auth/useAuth';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import {
  ExcessiveTimeAlertProvider,
  MissingBreakAlertProvider,
  ProlongedNavigationAlertProvider,
} from '@/providers/cognitive-alerts';
import { TasksProvider } from '@/providers/tasks';
import { BreakTimerProvider, FocusTimerProvider } from '@/providers/timer';
import { PAGE_ROUTES } from '@/utils/routes';
import {
  getBorderRadius,
  getDrawerWidth,
  getFontSizePixelValue,
  getIconSize,
  getSpacingPixelValue,
  THEME_COLORS,
} from '@/utils/theme';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import {
  CheckSquareIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  UserIcon,
} from 'lucide-react-native';
import { useMemo } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: true, // Reanimated runs in strict mode by default
});

/**
 * Custom Drawer Content Component
 *
 * Renders a personalized drawer with user info at the top,
 * navigation items in the middle, and logout at the bottom.
 *
 * Integrates with accessibility settings for dynamic font sizes and spacing.
 */
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();
  const { user, signOut, isLoading } = useAuth();
  const { getText } = useTextDetail();
  const { fontSizeClasses, spacingClasses, spacingValue } =
    useAccessibilityClasses();

  // Memoize contentContainerStyle to avoid Reanimated warnings
  // This prevents accessing spacingValue during render
  const contentContainerStyle = useMemo(
    () => ({ paddingTop: spacingValue * 2 }),
    [spacingValue]
  );

  const handleLogout = async () => {
    await signOut();
    router.replace(PAGE_ROUTES.LOGIN);
  };

  return (
    <View className={styles.container}>
      {/* User Profile Section */}
      <View
        className={`${styles.userProfile} ${spacingClasses.gap}`}
      >
        <View className={styles.userProfileHeader}>
          {user?.image ? (
            <Image
              source={{ uri: user.image }}
              className={styles.userProfileImage}
              accessibilityLabel={getText('profile_image_aria')}
            />
          ) : (
            <View className={styles.userProfileImage}>
              <UserIcon color={THEME_COLORS.textInverse} size={24} />
            </View>
          )}
          <View className={styles.userProfileName}>
            <Text
              className={`${styles.userProfileName} ${fontSizeClasses.base}`}
              accessibilityRole="text"
            >
              {user?.name || getText('user')}
            </Text>
            <Text
              className={`${styles.userProfileEmail} ${fontSizeClasses.sm}`}
              accessibilityRole="text"
              numberOfLines={1}
            >
              {user?.email || ''}
            </Text>
          </View>
        </View>
      </View>

      {/* Navigation Items */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={contentContainerStyle}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Logout Section */}
      <View className={`${styles.logoutSection} ${spacingClasses.padding}`}>
        <Pressable
          onPress={handleLogout}
          disabled={isLoading}
          className={`${styles.logoutSectionButton} ${spacingClasses.padding}`}
          accessibilityRole="button"
          accessibilityLabel={getText('header_logout_aria')}
          accessibilityHint={getText('header_logout_hint')}
        >
          <LogOutIcon color={THEME_COLORS.actionDanger} size={22} />
          <Text className={`${styles.logoutSectionButtonText} ${fontSizeClasses.base}`}>
            {isLoading ? getText('header_logout_loading') : getText('logout')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

/**
 * Authenticated Layout - MindEase Mobile
 *
 * Drawer-based navigation layout for authenticated routes.
 *
 * Provides:
 * - Side drawer navigation with dashboard, tasks, and profile screens
 * - User profile display in drawer header
 * - Logout functionality in drawer footer
 * - Consistent navigation structure matching the web app
 * - Authentication protection (handled by parent redirect)
 *
 * Cognitive Accessibility Features:
 * - Clear visual hierarchy with distinct sections
 * - Accessible labels for all navigation items
 * - Visual feedback on press states
 * - Dynamic font sizes and spacing based on user preferences
 * - High contrast support for better readability
 * - Dynamic text labels based on text detail preference (detailed/summary)
 */
export default function AuthenticatedLayout() {
  const { getText } = useTextDetail();
  const { settings } = useCognitiveSettings();

  // Memoize dynamic values based on accessibility preferences
  // This prevents Reanimated warnings about accessing values during render
  const drawerWidth = useMemo(
    () => getDrawerWidth(settings.spacing),
    [settings.spacing]
  );
  const fontSize = useMemo(
    () => getFontSizePixelValue(settings.fontSize, 'base'),
    [settings.fontSize]
  );
  const headerFontSize = useMemo(
    () => getFontSizePixelValue(settings.fontSize, 'lg'),
    [settings.fontSize]
  );
  const spacingValue = useMemo(
    () => getSpacingPixelValue(settings.spacing),
    [settings.spacing]
  );
  const borderRadius = useMemo(
    () => getBorderRadius(settings.spacing),
    [settings.spacing]
  );
  const iconSize = useMemo(
    () => getIconSize(settings.fontSize),
    [settings.fontSize]
  );

  // Memoize screen options to prevent Reanimated warnings
  const screenOptions = useMemo(
    () => ({
      headerShown: true,
      headerStyle: {
        backgroundColor: THEME_COLORS.surfacePrimary,
      },
      headerTintColor: THEME_COLORS.textPrimary,
      headerTitleStyle: {
        color: THEME_COLORS.textPrimary,
        fontSize: headerFontSize,
      },
      drawerStyle: {
        backgroundColor: THEME_COLORS.surfacePrimary,
        width: drawerWidth,
      },
      drawerActiveTintColor: THEME_COLORS.actionPrimaryHover,
      drawerInactiveTintColor: THEME_COLORS.textMuted,
      drawerLabelStyle: {
        fontSize: fontSize,
      },
      drawerItemStyle: {
        borderRadius: borderRadius,
        marginHorizontal: spacingValue / 4,
        padding: spacingValue / 4,
      },
    }),
    [
      headerFontSize,
      drawerWidth,
      fontSize,
      borderRadius,
      spacingValue,
    ]
  );

  return (
    <TasksProvider>
      <FocusTimerProvider>
        <BreakTimerProvider>
          <ExcessiveTimeAlertProvider>
            <MissingBreakAlertProvider>
              <ProlongedNavigationAlertProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <Drawer
                    drawerContent={(props: DrawerContentComponentProps) => (
                      <CustomDrawerContent {...props} />
                    )}
                    screenOptions={screenOptions}
                  >
                    <Drawer.Screen
                      name="dashboard"
                      options={{
                        drawerIcon: ({ color }: { color: string; size: number }) => (
                          <LayoutDashboardIcon color={color} size={iconSize} />
                        ),
                        title: getText('sidebar_dashboard'),
                        drawerLabel: getText('sidebar_dashboard'),
                        headerTitle: getText('sidebar_dashboard'),
                      }}
                    />
                    <Drawer.Screen
                      name="tasks"
                      options={{
                        drawerIcon: ({ color }: { color: string; size: number }) => (
                          <CheckSquareIcon color={color} size={iconSize} />
                        ),
                        title: getText('sidebar_tasks'),
                        drawerLabel: getText('sidebar_tasks'),
                        headerTitle: getText('sidebar_tasks'),
                      }}
                    />
                    <Drawer.Screen
                      name="profile"
                      options={{
                        drawerIcon: ({ color }: { color: string; size: number }) => (
                          <UserIcon color={color} size={iconSize} />
                        ),
                        title: getText('sidebar_profile'),
                        drawerLabel: getText('sidebar_profile'),
                        headerTitle: getText('sidebar_profile'),
                      }}
                    />
                  </Drawer>
                </GestureHandlerRootView>
              </ProlongedNavigationAlertProvider>
            </MissingBreakAlertProvider>
          </ExcessiveTimeAlertProvider>
        </BreakTimerProvider>
      </FocusTimerProvider>
    </TasksProvider>
  );
}

const styles = {
  container: "flex-1 bg-surface-primary",
  userProfile: "border-b border-border-subtle px-4 pb-4 pt-20",
  userProfileHeader: "flex-row items-center gap-3",
  userProfileImage: "h-12 w-12 rounded-full",
  userProfileName: "font-semibold text-text-primary",
  userProfileEmail: "text-text-muted",
  logoutSection: "border-t border-border-subtle",
  logoutSectionButton: "flex-row items-center gap-3 rounded-lg px-3 py-3 active:bg-bg-tertiary",
  logoutSectionButtonText: "font-medium text-action-danger",
} as const;