import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Container } from '@/components/Container';
import { CognitiveSettingsProvider } from '@/contexts/cognitive-settings';
import '../global.css';

/**
 * Root layout component for the Expo Router app
 *
 * This component wraps all routes and provides global configuration
 * such as status bar styling and cognitive accessibility settings.
 */
export default function RootLayout() {
  return (
    <CognitiveSettingsProvider>
      <StatusBar style="auto" />
      <Container>
        <Slot />
      </Container>
    </CognitiveSettingsProvider>
  );
}
