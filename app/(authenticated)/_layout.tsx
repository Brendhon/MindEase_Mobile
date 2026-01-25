import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { UserIcon, LayoutDashboardIcon, ListIcon } from 'lucide-react-native';

/**
 * Authenticated Layout - MindEase Mobile
 *
 * Tab-based navigation layout for authenticated routes.
 *
 * Provides:
 * - Bottom tab navigation with dashboard, tasks, and profile screens
 * - Consistent navigation structure matching the web app
 * - Authentication protection (handled by parent redirect)
 *
 * TODO: Implement providers (TasksProvider, TimerProviders, etc.)
 * TODO: Add proper tab bar icons
 * TODO: Add cognitive accessibility features
 */
export default function AuthenticatedLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1a1a2e',
          borderTopColor: '#2a2a4e',
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#9ca3af',
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ color, size }) => (
            <LayoutDashboardIcon color={color} size={size} />
          ),
          title: 'Dashboard',
          tabBarLabel: 'Início',
          tabBarAccessibilityLabel: 'Ir para o painel principal',
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          tabBarIcon: ({ color, size }) => (
            <ListIcon color={color} size={size} />
          ),
          title: 'Tarefas',
          tabBarLabel: 'Tarefas',
          tabBarAccessibilityLabel: 'Ir para a lista de tarefas',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <UserIcon color={color} size={size} />
          ),
          title: 'Perfil',
          tabBarLabel: 'Perfil',
          tabBarAccessibilityLabel: 'Ir para as configurações de perfil',
        }}
      />
    </Tabs>
  );
}
