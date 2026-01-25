import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Container } from '@/components/Container';
import { CognitiveSettingsProvider } from '@/contexts/cognitive-settings';
import '../global.css';
import { AuthProvider } from '@/providers/auth';

/**
 * Root layout component for the Expo Router app
 *
 * This component wraps all routes and provides global configuration
 * such as status bar styling and cognitive accessibility settings.
 *
 * Note: The 'top' edge is excluded from safe area because nested navigators
 * (Drawer, Stack) handle the status bar area with their own headers.
 */
export default function RootLayout() {
  return (
    <CognitiveSettingsProvider>
      <AuthProvider>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <Container edges={['bottom', 'left', 'right']}>
          <Slot />
        </Container>
      </AuthProvider>
    </CognitiveSettingsProvider>
  );
}
