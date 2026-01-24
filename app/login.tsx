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
 */
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';

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
 */
export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);

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
      accessibilityLabel="Tela de login"
    >
      <View className={styles.card}>
        {/* Title */}
        <Text
          className={styles.title}
          accessibilityRole="header"
          accessibilityLabel="Bem-vindo ao MindEase"
        >
          Bem-vindo ao MindEase
        </Text>

        {/* Description */}
        <Text className={styles.description}>
          Entre com sua conta Google para acessar seu espaço de bem-estar
          mental.
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
            accessibilityLabel="Entrar com Google"
            accessibilityHint="Pressione para fazer login com sua conta Google"
          >
            <Button.Icon icon={LoginIcon} position="left" size="lg" />
            <Button.Text className="text-lg">Entrar com Google</Button.Text>
          </Button>
        </View>

        {/* Disclaimer */}
        <Text className={styles.disclaimer}>
          Ao entrar, você concorda com nossos termos de uso e política de
          privacidade.
        </Text>
      </View>
    </View>
  );
}

/**
 * Login Screen Styles
 * Centralized styles following MindEase design tokens
 */
const styles = {
  container: 'flex-1 items-center justify-center bg-bg-secondary px-6',
  card: 'w-full bg-surface-primary border border-border-subtle rounded-lg p-6 shadow-soft',
  title: 'text-3xl font-semibold text-text-primary text-center mb-4',
  description: 'text-md text-text-secondary text-center leading-relaxed mb-8',
  buttonContainer: 'w-full',
  button: 'w-full',
  disclaimer: 'text-sm text-text-muted text-center mt-6 leading-relaxed',
} as const;
