import { useTextDetail } from '@/hooks/accessibility';
import { useAuth } from '@/hooks/auth';
import { PAGE_ROUTES, PROTECTED_ROUTES } from '@/utils/routes';
import { THEME_COLORS } from '@/utils/theme';
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
  const { getText } = useTextDetail();
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading indicator while checking auth state
  if (isLoading) {
    return (
      <View className={styles.loadingContainer}>
        <ActivityIndicator size="large" color={THEME_COLORS.actionPrimary} />
        <Text className={styles.loadingText}>{getText('loading')}</Text>
      </View>
    );
  }
  
  // Redirect to dashboard when authenticated
  return isAuthenticated ? <Redirect href={PROTECTED_ROUTES.DASHBOARD} /> : <Redirect href={PAGE_ROUTES.LOGIN} />;
}

const styles = {
  container: "flex-1 bg-surface-primary",
  loadingContainer: "flex-1 items-center justify-center bg-bg-secondary",
  loadingText: "mt-4 text-text-secondary text-center",
};
