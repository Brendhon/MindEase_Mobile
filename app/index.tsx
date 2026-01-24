import { Redirect } from 'expo-router';

/**
 * Home page - Entry point of the application
 *
 * Redirects to login screen if user is not authenticated.
 * TODO: Add authentication check and redirect to dashboard if authenticated.
 */
export default function HomePage() {
  // TODO: Check authentication state
  // For now, always redirect to login
  return <Redirect href="/login" />;
}
