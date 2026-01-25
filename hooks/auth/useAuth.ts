/**
 * useAuth Hook - MindEase Mobile
 *
 * Centralized hook for managing authentication with Firebase.
 *
 * This hook handles:
 * - State management (user, loading, error)
 * - Authentication operations (sign in, sign out)
 * - Firebase Auth state synchronization (automatic via AuthProvider)
 *
 * The provider manages basic state and listens to Firebase Auth state changes.
 * This hook provides the business logic and operations.
 *
 * @example
 * ```tsx
 * // Basic usage - check authentication status
 * function MyComponent() {
 *   const { user, isAuthenticated, isLoading } = useAuth();
 *
 *   if (isLoading) return <Text>Loading...</Text>;
 *   if (!isAuthenticated) return <Text>Please sign in</Text>;
 *   return <Text>Welcome, {user?.name}</Text>;
 * }
 *
 * // Sign in/out operations
 * function AuthButtons() {
 *   const { signIn, signOut, isAuthenticated, isLoading } = useAuth();
 *
 *   return (
 *     <View>
 *       {!isAuthenticated ? (
 *         <Pressable onPress={signIn} disabled={isLoading}>
 *           <Text>Sign In with Google</Text>
 *         </Pressable>
 *       ) : (
 *         <Pressable onPress={signOut} disabled={isLoading}>
 *           <Text>Sign Out</Text>
 *         </Pressable>
 *       )}
 *     </View>
 *   );
 * }
 * ```
 *
 * @throws Error if used outside AuthProvider
 */

import { useCallback, useEffect, useRef } from 'react';

import { useAuthContext } from '@/contexts/auth';
import { authService } from '@/services/auth';

export function useAuth() {
  const { user, isLoading, error, _setLoading, _setError } = useAuthContext();
  const isConfigured = useRef(false);

  /**
   * Configure Google Sign-In on mount
   * This should only run once when the hook is first used
   */
  useEffect(() => {
    if (!isConfigured.current) {
      authService.configure();
      isConfigured.current = true;
    }
  }, []);

  /**
   * Sign in with Google
   * Handles the Google authentication and signs into Firebase
   */
  const signIn = useCallback(async () => {
    _setLoading(true);
    _setError(null);

    try {
      await authService.signIn();
      // User state will be updated automatically by AuthProvider's onAuthStateChanged
    } catch (err) {
      console.error('Error signing in:', err);

      // Don't set error for user cancellation
      const authErr = err as { code?: string };
      if (authErr?.code === 'SIGN_IN_CANCELLED') {
        return;
      }

      _setError(err instanceof Error ? err : new Error('Failed to sign in'));
    } finally {
      _setLoading(false);
    }
  }, [_setLoading, _setError]);

  /**
   * Sign out current user
   */
  const signOut = useCallback(async () => {
    _setLoading(true);
    _setError(null);

    try {
      await authService.signOut();
      // User state will be updated automatically by AuthProvider's onAuthStateChanged
    } catch (err) {
      console.error('Error signing out:', err);
      _setError(err instanceof Error ? err : new Error('Failed to sign out'));
    } finally {
      _setLoading(false);
    }
  }, [_setLoading, _setError]);

  /**
   * Attempt silent sign-in for returning users
   * This provides a seamless experience for users who have previously signed in
   */
  const signInSilently = useCallback(async () => {
    _setLoading(true);

    try {
      await authService.signInSilently();
    } catch {
      // Silent sign-in failure is not an error condition
      // User simply needs to sign in manually
    } finally {
      _setLoading(false);
    }
  }, [_setLoading]);

  return {
    // State
    user,
    isAuthenticated: !!user,
    isLoading,
    error,

    // Operations
    signIn,
    signOut,
    signInSilently,
  };
}
