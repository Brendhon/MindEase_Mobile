import { createContext, useContext } from 'react';

import { AuthContextValue } from '@/models/auth';

/**
 * Auth Context - MindEase Mobile
 *
 * Context for global authentication state.
 *
 * This context provides ONLY basic state:
 * - User state
 * - Loading and error states
 * - Internal setters for useAuth hook
 *
 * All business logic (authentication operations, session management, error handling)
 * is handled by the useAuth hook. Components should use useAuth(), not useAuthContext().
 */

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Hook to access auth context
 *
 * Note: This hook is for internal use by useAuth hook only.
 * Components should use useAuth() instead, which provides all business logic.
 *
 * @throws Error if used outside AuthProvider
 *
 * @internal
 */
export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }

  return context;
}
