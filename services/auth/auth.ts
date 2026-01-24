import {
  signInWithCredential,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import { auth } from '@/config/firebase';

// Complete auth session for web browser
WebBrowser.maybeCompleteAuthSession();

/**
 * Auth Service - MindEase Mobile
 * Authentication service using Firebase Auth with Expo
 */
export interface AuthService {
  /**
   * Sign in with Google using expo-auth-session
   * Returns the Google auth request hook result for use in components
   */
  useGoogleAuth: () => ReturnType<typeof Google.useAuthRequest>;

  /**
   * Handle Google sign in with the authentication response
   */
  handleGoogleSignIn: (
    response: Google.GoogleAuthSessionResult | null
  ) => Promise<void>;

  /**
   * Sign out from Firebase
   */
  signOut: () => Promise<void>;
}

/**
 * Get Google OAuth client IDs from environment variables
 * These should be set in your .env file:
 * - EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
 * - EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID
 * - EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID
 */
const getGoogleConfig = () => ({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
});

export const authService: AuthService = {
  /**
   * Hook to get Google auth request
   * Must be called at the top level of a component
   */
  useGoogleAuth: () => {
    const config = getGoogleConfig();
    return Google.useAuthRequest({
      webClientId: config.webClientId,
      androidClientId: config.androidClientId,
      iosClientId: config.iosClientId,
    });
  },

  /**
   * Handle Google sign in response
   */
  handleGoogleSignIn: async (
    response: Google.GoogleAuthSessionResult | null
  ) => {
    if (response?.type !== 'success') {
      if (response?.type === 'error') {
        throw new Error(response.error?.message || 'Google sign in failed');
      }
      // User cancelled or dismissed
      return;
    }

    const { id_token } = response.params;

    if (!id_token) {
      throw new Error('No ID token received from Google');
    }

    // Create Firebase credential and sign in
    const credential = GoogleAuthProvider.credential(id_token);
    await signInWithCredential(auth, credential);
  },

  /**
   * Sign out from Firebase
   */
  signOut: async () => {
    await firebaseSignOut(auth);
  },
};
