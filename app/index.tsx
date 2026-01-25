import { Redirect } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';

import { useAuth } from '@/hooks/auth';

/**
 * Home page - Entry point of the application
 *
 * Redirects to login screen if user is not authenticated.
 * Shows a loading state while checking authentication.
 * Renders the main content if authenticated.
 */
export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading indicator while checking auth state
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-bg-secondary">
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="mt-4 text-text-secondary">Carregando...</Text>
      </View>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  // TODO: Replace with actual home/dashboard content
  return (
    <View className="flex-1 items-center justify-center bg-bg-secondary">
      <Text className="text-text-primary text-xl">Bem-vindo ao MindEase!</Text>
      <Text className="mt-2 text-text-secondary">Você está autenticado.</Text>
    </View>
  );
}
