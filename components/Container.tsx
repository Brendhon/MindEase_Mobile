import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ContainerProps {
  children: React.ReactNode;
  /** Additional className for custom styling */
  className?: string;
}

/**
 * Container Component
 *
 * Provides safe area boundaries for the app content.
 * Uses minimal styling to allow child components full control over their appearance.
 */
export const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <SafeAreaView className={`flex-1 bg-bg-secondary ${className}`}>
      {children}
    </SafeAreaView>
  );
};
