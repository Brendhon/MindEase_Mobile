/**
 * Login Screen - MindEase Mobile
 *
 * Authentication screen with Google sign-in button.
 * Uses @react-native-google-signin/google-signin for native authentication.
 *
 * Features:
 * - Simple, low cognitive load interface
 * - Accessible design with proper labels
 * - Clear visual hierarchy
 * - Consistent with web version design
 * - Uses cognitive accessibility hooks for dynamic text/styling
 */
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import { useAuth } from '@/hooks/auth';

/**
 * Login icon component for the button
 */
function LoginIcon({ size, color }: { size?: number; color?: string }) {
  return <MaterialIcons name="login" size={size} color={color} />;
}

/**
 * LoginScreen Component
 *
 * Displays the authentication interface with Google sign-in option.
 * Designed for cognitive accessibility with minimal visual clutter.
 * Uses cognitive settings for dynamic text and styling.
 */
export default function LoginScreen() {
  const router = useRouter();
  const { signIn, isLoading, isAuthenticated, error } = useAuth();

  // Use cognitive settings hooks for accessibility
  const { spacingClasses, fontSizeClasses } = useAccessibilityClasses();
  const { getText } = useTextDetail();

  // Redirect to home when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Generate dynamic classes based on user preferences
  const cardClasses = useMemo(
    () =>
      `w-full bg-surface-primary border border-border-subtle rounded-lg shadow-soft ${spacingClasses.padding}`,
    [spacingClasses.padding]
  );

  const titleClasses = useMemo(
    () =>
      `font-semibold text-text-primary text-center mb-4 ${fontSizeClasses['3xl']}`,
    [fontSizeClasses]
  );

  const descriptionClasses = useMemo(
    () =>
      `text-text-secondary text-center leading-relaxed mb-8 ${fontSizeClasses.base}`,
    [fontSizeClasses]
  );

  const disclaimerClasses = useMemo(
    () =>
      `text-text-muted text-center mt-6 leading-relaxed ${fontSizeClasses.sm}`,
    [fontSizeClasses]
  );

  const buttonTextClasses = useMemo(
    () => fontSizeClasses.lg,
    [fontSizeClasses]
  );

  const errorClasses = useMemo(
    () => `text-red-500 text-center mt-4 ${fontSizeClasses.sm}`,
    [fontSizeClasses]
  );

  /**
   * Handles sign-in button press
   */
  const handleSignIn = async () => {
    await signIn();
  };

  return (
    <View
      className={styles.container}
      accessibilityLabel={getText('login_title')}
    >
      <View className={cardClasses}>
        {/* Title */}
        <Text
          className={titleClasses}
          accessibilityRole="header"
          accessibilityLabel={getText('login_title')}
        >
          {getText('login_title')}
        </Text>

        {/* Description */}
        <Text className={descriptionClasses}>
          {getText('login_description')}
        </Text>

        {/* Sign-in Button */}
        <View className={styles.buttonContainer}>
          <Button
            variant="primary"
            size="lg"
            onPress={handleSignIn}
            disabled={isLoading}
            isLoading={isLoading}
            className={styles.button}
            accessibilityLabel={getText('login_button_aria')}
            accessibilityHint="Pressione para fazer login com sua conta Google"
          >
            <Button.Icon icon={LoginIcon} position="left" size="lg" />
            <Button.Text className={buttonTextClasses}>
              {getText('login_button')}
            </Button.Text>
          </Button>
        </View>

        {/* Error Message */}
        {error && (
          <Text className={errorClasses} accessibilityRole="alert">
            {error.message}
          </Text>
        )}

        {/* Disclaimer */}
        <Text className={disclaimerClasses}>
          {getText('login_disclaimer')}
        </Text>
      </View>
    </View>
  );
}

/**
 * Login Screen Styles
 * Base styles - dynamic styling is applied via useAccessibilityClasses
 */
const styles = {
  container: 'flex-1 items-center justify-center bg-bg-secondary px-4',
  buttonContainer: 'w-full',
  button: 'w-full',
} as const;
