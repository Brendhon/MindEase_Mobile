import { useAuth } from '@/hooks/auth';
import { Redirect } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';

/**
 * Home page - Entry point of the application
 *
 * Redirects to login screen if user is not authenticated.
 * Redirects to dashboard if user is authenticated.
 * Shows a loading state while checking authentication.
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
  
  // Redirect to dashboard when authenticated
  return isAuthenticated ? <Redirect href="/dashboard" /> : <Redirect href="/login" />;
}
