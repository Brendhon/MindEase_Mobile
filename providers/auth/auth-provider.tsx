import React, { ReactNode, useState, useCallback, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';

import { AuthContext } from '@/contexts/auth';
import { auth } from '@/config/firebase';
import { AuthUser } from '@/models/auth';

interface AuthProviderProps {
  children: ReactNode;
  initialUser?: AuthUser | null;
}

/**
 * Convert Firebase User to AuthUser
 */
function firebaseUserToAuthUser(user: User): AuthUser {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    image: user.photoURL,
  };
}

/**
 * Auth Provider - MindEase Mobile
 *
 * Provides authentication context to children components.
 *
 * This provider:
 * - Manages basic auth state (user, loading, error)
 * - Listens to Firebase Auth state changes via onAuthStateChanged
 * - Automatically syncs user state with Firebase
 *
 * All business logic is handled by the useAuth hook.
 *
 * @example
 * ```tsx
 * // Normal usage
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 *
 * // With initial user (for testing)
 * <AuthProvider initialUser={{ uid: "123", email: "test@example.com", name: "Test", image: null }}>
 *   <Component />
 * </AuthProvider>
 * ```
 */
export function AuthProvider({
  children,
  initialUser = null,
}: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(initialUser);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUserToAuthUser(firebaseUser));
        } else {
          setUser(null);
        }
        setIsLoading(false);
        setError(null);
      },
      (authError) => {
        console.error('Auth state change error:', authError);
        setError(authError);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Internal setters for useAuth hook to use
  const setUserState = useCallback(
    (newUser: AuthUser | null | ((prev: AuthUser | null) => AuthUser | null)) =>
      setUser(newUser),
    []
  );

  const setLoadingState = useCallback(
    (loading: boolean) => setIsLoading(loading),
    []
  );

  const setErrorState = useCallback((err: Error | null) => setError(err), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        _setUser: setUserState,
        _setLoading: setLoadingState,
        _setError: setErrorState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
