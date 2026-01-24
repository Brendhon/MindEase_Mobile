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
 *   // Note: signIn requires the Google auth response from useGoogleAuth hook
 *   return (
 *     <View>
 *       {!isAuthenticated ? (
 *         <Pressable onPress={() => signIn(response)} disabled={isLoading}>
 *           <Text>Sign In</Text>
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

import { useCallback } from 'react';
import * as Google from 'expo-auth-session/providers/google';

import { useAuthContext } from '@/contexts/auth';
import { authService } from '@/services/auth';

export function useAuth() {
  const { user, isLoading, error, _setLoading, _setError } = useAuthContext();

  /**
   * Sign in with Google
   * Handles the Google authentication response and signs into Firebase
   *
   * @param response - The response from Google.useAuthRequest promptAsync
   */
  const signIn = useCallback(
    async (response: Google.GoogleAuthSessionResult | null) => {
      _setLoading(true);
      _setError(null);

      try {
        await authService.handleGoogleSignIn(response);
        // User state will be updated automatically by AuthProvider's onAuthStateChanged
      } catch (err) {
        console.error('Error signing in:', err);
        _setError(err instanceof Error ? err : new Error('Failed to sign in'));
      } finally {
        _setLoading(false);
      }
    },
    [_setLoading, _setError]
  );

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
   * Get Google auth request hook
   * Must be destructured at component top level
   *
   * @example
   * ```tsx
   * function LoginScreen() {
   *   const { useGoogleAuth, signIn } = useAuth();
   *   const [request, response, promptAsync] = useGoogleAuth();
   *
   *   useEffect(() => {
   *     if (response) {
   *       signIn(response);
   *     }
   *   }, [response]);
   *
   *   return (
   *     <Pressable onPress={() => promptAsync()} disabled={!request}>
   *       <Text>Sign in with Google</Text>
   *     </Pressable>
   *   );
   * }
   * ```
   */
  const useGoogleAuth = authService.useGoogleAuth;

  return {
    // State
    user,
    isAuthenticated: !!user,
    isLoading,
    error,

    // Operations
    signIn,
    signOut,

    // Google Auth Hook
    useGoogleAuth,
  };
}
