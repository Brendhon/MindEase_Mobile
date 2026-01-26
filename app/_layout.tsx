import { Container } from '@/components/Container';
import { DialogManager } from '@/components/feedback/DialogManager';
import { ToastManager } from '@/components/feedback/ToastManager';
import { CognitiveSettingsProvider } from '@/contexts/cognitive-settings';
import { AuthProvider } from '@/providers/auth';
import { DialogProvider } from '@/providers/dialog';
import { FeedbackProvider } from '@/providers/feedback';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

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
 * 3. FeedbackProvider - provides global feedback/toast management
 * 4. DialogProvider - provides global dialog management
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <CognitiveSettingsProvider>
        <FeedbackProvider>
          <DialogProvider>
            <StatusBar style="dark" translucent backgroundColor="transparent" />
            <Container edges={['bottom', 'left', 'right']}>
              <Slot />
            </Container>
            <ToastManager />
            <DialogManager />
          </DialogProvider>
        </FeedbackProvider>
      </CognitiveSettingsProvider>
    </AuthProvider>
  );
}
