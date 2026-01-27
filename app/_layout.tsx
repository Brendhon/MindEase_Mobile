import { ToastManager } from '@/components/feedback/ToastManager';
import { Container } from '@/components/layout';
import { CognitiveSettingsProvider } from '@/contexts/cognitive-settings';
import { AuthProvider } from '@/providers/auth';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import '../global.css';

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: true, // Reanimated runs in strict mode by default
});

/**
 * Root layout component for the Expo Router app
 *
 * This component wraps all routes and provides global configuration
 * such as status bar styling and cognitive accessibility settings.
 *
 * Note: The 'top' edge is excluded from safe area because nested navigators
 * (Drawer, Stack) handle the status bar area with their own headers.
 *
 * Provider order is important:
 * 1. AuthProvider - provides user authentication state
 * 2. CognitiveSettingsProvider - loads user preferences (requires auth context)
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <CognitiveSettingsProvider>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <Container edges={['bottom', 'left', 'right']}>
          <Slot />
        </Container>
        <ToastManager />
      </CognitiveSettingsProvider>
    </AuthProvider>
  );
}
