import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import { useAuth } from '@/hooks/auth/useAuth';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import {
  CheckSquareIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  UserIcon,
} from 'lucide-react-native';
import { Image, Pressable, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

/**
 * Theme colors extracted from tailwind.config.js
 * Used for inline styles where NativeWind classes don't apply (e.g., Drawer options)
 */
const THEME_COLORS = {
  // Backgrounds
  bgPrimary: '#f9fafb',
  bgSecondary: '#f3f4f6',
  bgTertiary: '#e5e7eb',

  // Surfaces
  surfacePrimary: '#ffffff',
  surfaceSecondary: '#f9fafb',

  // Borders
  borderSubtle: '#e5e7eb',
  borderStrong: '#d1d5db',

  // Text
  textPrimary: '#111827',
  textSecondary: '#374151',
  textMuted: '#6b7280',
  textInverse: '#f9fafb',

  // Actions
  actionPrimary: '#2563eb',
  actionPrimaryHover: '#1d4ed8',
  actionDanger: '#dc2626',
  actionDangerHover: '#b91c1c',
} as const;

/**
 * Custom Drawer Content Component
 *
 * Renders a personalized drawer with user info at the top,
 * navigation items in the middle, and logout at the bottom.
 *
 * Integrates with accessibility settings for dynamic font sizes and spacing.
 */
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { user, signOut, isLoading } = useAuth();
  const { fontSizeClasses, spacingClasses, spacingValue } =
    useAccessibilityClasses();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <View className="flex-1 bg-surface-primary">
      {/* User Profile Section */}
      <View
        className={`border-b border-border-subtle px-4 pb-4 pt-20 ${spacingClasses.gap}`}
      >
        <View className="flex-row items-center gap-3">
          {user?.image ? (
            <Image
              source={{ uri: user.image }}
              className="h-12 w-12 rounded-full"
              accessibilityLabel="Foto de perfil do usuário"
            />
          ) : (
            <View className="h-12 w-12 items-center justify-center rounded-full bg-action-primary">
              <UserIcon color={THEME_COLORS.textInverse} size={24} />
            </View>
          )}
          <View className="flex-1">
            <Text
              className={`font-semibold text-text-primary ${fontSizeClasses.base}`}
              accessibilityRole="text"
            >
              {user?.name || 'Usuário'}
            </Text>
            <Text
              className={`text-text-muted ${fontSizeClasses.sm}`}
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
        contentContainerStyle={{ paddingTop: spacingValue * 2 }}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Logout Section */}
      <View className={`border-t border-border-subtle ${spacingClasses.padding}`}>
        <Pressable
          onPress={handleLogout}
          disabled={isLoading}
          className="flex-row items-center gap-3 rounded-lg px-3 py-3 active:bg-bg-tertiary"
          accessibilityRole="button"
          accessibilityLabel="Sair da conta"
          accessibilityHint="Encerra sua sessão e retorna à tela de login"
        >
          <LogOutIcon color={THEME_COLORS.actionDanger} size={22} />
          <Text className={`font-medium text-action-danger ${fontSizeClasses.base}`}>
            {isLoading ? 'Saindo...' : 'Sair'}
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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props: DrawerContentComponentProps) => (
          <CustomDrawerContent {...props} />
        )}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: THEME_COLORS.surfacePrimary,
          },
          headerTintColor: THEME_COLORS.textPrimary,
          headerTitleStyle: {
            color: THEME_COLORS.textPrimary,
          },
          drawerStyle: {
            backgroundColor: THEME_COLORS.surfacePrimary,
            width: 300,
          },
          drawerActiveTintColor: THEME_COLORS.actionPrimaryHover,
          drawerInactiveTintColor: THEME_COLORS.textMuted,
          drawerLabelStyle: {
            fontSize: 14,
          },
          drawerItemStyle: {
            borderRadius: 8,
            marginHorizontal: 2,
            paddingHorizontal: 2,
          },
        }}
      >
        <Drawer.Screen
          name="dashboard"
          options={{
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <LayoutDashboardIcon color={color} size={size} />
            ),
            title: getText('sidebar_dashboard'),
            drawerLabel: getText('sidebar_dashboard'),
            headerTitle: getText('sidebar_dashboard'),
          }}
        />
        <Drawer.Screen
          name="tasks"
          options={{
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <CheckSquareIcon color={color} size={size} />
            ),
            title: getText('sidebar_tasks'),
            drawerLabel: getText('sidebar_tasks'),
            headerTitle: getText('sidebar_tasks'),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <UserIcon color={color} size={size} />
            ),
            title: getText('sidebar_profile'),
            drawerLabel: getText('sidebar_profile'),
            headerTitle: getText('sidebar_profile'),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
