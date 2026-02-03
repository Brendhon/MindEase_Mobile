/**
 * Type declaration for Firebase Auth React Native persistence
 *
 * This file extends the firebase/auth module to include the
 * getReactNativePersistence function which is not properly exported
 * in the TypeScript type definitions for React Native environments.
 *
 * @see https://github.com/firebase/firebase-js-sdk/issues/7584
 */
import { Persistence, ReactNativeAsyncStorage } from 'firebase/auth';

declare module 'firebase/auth' {
  export function getReactNativePersistence(storage: ReactNativeAsyncStorage): Persistence;
}
