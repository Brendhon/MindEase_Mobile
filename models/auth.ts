/**
 * Auth Models - MindEase Mobile
 * Type definitions for authentication
 */

/**
 * User type for authentication
 */
export interface AuthUser {
  uid: string;
  email: string | null;
  name: string | null;
  image: string | null;
}

/**
 * Auth Context Value
 */
export interface AuthContextValue {
  /** Current authenticated user */
  user: AuthUser | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;

  // Internal setters - only used by useAuth hook
  _setUser: (user: AuthUser | null | ((prev: AuthUser | null) => AuthUser | null)) => void;
  _setLoading: (loading: boolean) => void;
  _setError: (error: Error | null) => void;
}
