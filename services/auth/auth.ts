import {
  signInWithCredential,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  GoogleSignin,
  isSuccessResponse,
  isErrorWithCode,
  statusCodes,
  type SignInResponse,
  SignInSilentlyResponse,
} from '@react-native-google-signin/google-signin';

import { auth } from '@/config/firebase';
import { tasksService } from '../tasks';
import { userPreferencesService } from '../user-preferences';
import { router } from 'expo-router';

/**
 * Auth Service - MindEase Mobile
 * Authentication service using Firebase Auth with @react-native-google-signin/google-signin
 */
export interface AuthService {
  /**
   * Configure Google Sign-In
   * Must be called once before any sign-in operations (typically at app startup)
   */
  configure: () => void;

  /**
   * Sign in with Google
   * Returns the user data on success
   */
  signIn: () => Promise<void>;

  /**
   * Sign out from both Google and Firebase
   */
  signOut: () => Promise<void>;

  /**
   * Check if user has previously signed in
   * Attempts silent sign-in for seamless user experience
   */
  signInSilently: () => Promise<void>;

  /**
   * Delete user account and all associated data
   * 1. Delete all user tasks
   * 2. Delete user preferences
   * 3. Sign out the user
   */
  deleteAccount: (userId: string) => Promise<void>;
}

/**
 * Error types for authentication operations
 */
export type AuthErrorCode =
  | 'SIGN_IN_CANCELLED'
  | 'IN_PROGRESS'
  | 'PLAY_SERVICES_NOT_AVAILABLE'
  | 'NO_ID_TOKEN'
  | 'UNKNOWN_ERROR';

export class AuthError extends Error {
  code: AuthErrorCode;

  constructor(code: AuthErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = 'AuthError';
  }
}

/**
 * Handle Google Sign-In error codes
 */
function handleGoogleSignInError(error: unknown): AuthError {
  if (isErrorWithCode(error)) {
    switch (error.code) {
      case statusCodes.SIGN_IN_CANCELLED:
        return new AuthError('SIGN_IN_CANCELLED', 'Sign-in was cancelled');
      case statusCodes.IN_PROGRESS:
        return new AuthError('IN_PROGRESS', 'Sign-in is already in progress');
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        return new AuthError(
          'PLAY_SERVICES_NOT_AVAILABLE',
          'Google Play Services is not available'
        );
      default:
        return new AuthError(
          'UNKNOWN_ERROR',
          (error as Error).message || 'An unknown error occurred'
        );
    }
  }

  return new AuthError(
    'UNKNOWN_ERROR',
    error instanceof Error ? error.message : 'An unknown error occurred'
  );
}

/**
 * Process Google Sign-In response and authenticate with Firebase
 */
async function processSignInResponse(response: SignInResponse | SignInSilentlyResponse): Promise<void> {
  if (!isSuccessResponse(response as SignInResponse)) {
    // User cancelled the sign-in
    throw new AuthError('SIGN_IN_CANCELLED', 'Sign-in was cancelled');
  }

  const idToken = (response as SignInResponse).data?.idToken;

  if (!idToken) {
    throw new AuthError('NO_ID_TOKEN', 'No ID token received from Google');
  }

  // Create Firebase credential and sign in
  const credential = GoogleAuthProvider.credential(idToken);
  await signInWithCredential(auth, credential);
}

export const authService: AuthService = {
  /**
   * Configure Google Sign-In
   * Uses explicit webClientId for Firebase authentication
   */
  configure: () => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      offlineAccess: false,
    });
  },

  /**
   * Sign in with Google and authenticate with Firebase
   */
  signIn: async () => {
    try {
      // Check Play Services availability (Android)
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Perform sign-in
      const response = await GoogleSignin.signIn();
      await processSignInResponse(response);
    } catch (error) {
      throw handleGoogleSignInError(error);
    }
  },

  /**
   * Attempt silent sign-in for returning users
   */
  signInSilently: async () => {
    try {
      const response = await GoogleSignin.signInSilently();
      await processSignInResponse(response);
    } catch (error) {
      // Silent sign-in can fail for various reasons (no previous session, token expired, etc.)
      // We don't throw here as this is an optional enhancement
      console.log('Silent sign-in not available:', error);
    }
  },

  /**
   * Sign out from both Google and Firebase
   */
  signOut: async () => {
    try {
      // Sign out from Google
      await GoogleSignin.signOut();
    } catch (error) {
      console.error('Error signing out from Google:', error);
    }

    // Always sign out from Firebase
    await firebaseSignOut(auth);
  },

  /**
   * Delete user account and all associated data
   * 1. Delete all user tasks
   * 2. Delete user preferences
   * 3. Sign out the user
   */
  deleteAccount: async (userId: string): Promise<void> => {
    try {
      // Delete all tasks
      await tasksService.deleteAllTasks(userId);

      // Delete user preferences
      await userPreferencesService.deleteUserPreferences(userId);

      // Sign out the user
      await authService.signOut();
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  },
};
