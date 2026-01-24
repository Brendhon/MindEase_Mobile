/**
 * Login Screen - MindEase Mobile
 *
 * Authentication screen with Google sign-in button.
 * Currently displays UI only - authentication logic to be implemented.
 *
 * Features:
 * - Simple, low cognitive load interface
 * - Accessible design with proper labels
 * - Clear visual hierarchy
 * - Consistent with web version design
 * - Uses cognitive accessibility hooks for dynamic text/styling
 */
import { MaterialIcons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';

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
  const [isLoading, setIsLoading] = useState(false);

  // Use cognitive settings hooks for accessibility
  const { spacingClasses, fontSizeClasses } = useAccessibilityClasses();
  const { getText } = useTextDetail();

  // Generate dynamic classes based on user preferences
  const cardClasses = useMemo(
    () => {
      console.log(spacingClasses.padding);
      return `w-full bg-surface-primary border border-border-subtle rounded-lg shadow-soft ${spacingClasses.padding}`;
    },
    [spacingClasses.padding]
  );

  const titleClasses = useMemo(
    () =>{ 
      console.log(fontSizeClasses['3xl']);
      return `font-semibold text-text-primary text-center mb-4 ${fontSizeClasses['3xl']}`},
    [fontSizeClasses]
  );

  const descriptionClasses = useMemo(
    () => `text-text-secondary text-center leading-relaxed mb-8 ${fontSizeClasses.base}`,
    [fontSizeClasses]
  );

  const disclaimerClasses = useMemo(
    () => `text-text-muted text-center mt-6 leading-relaxed ${fontSizeClasses.sm}`,
    [fontSizeClasses]
  );

  const buttonTextClasses = useMemo(
    () => fontSizeClasses.lg,
    [fontSizeClasses]
  );

  /**
   * Handles sign-in button press
   * TODO: Implement Google authentication logic
   */
  const handleSignIn = async () => {
    setIsLoading(true);

    // Simulate loading for demonstration
    // Replace with actual Google auth implementation
    setTimeout(() => {
      setIsLoading(false);
      console.log('Sign in pressed - Authentication not yet implemented');
    }, 1500);
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
