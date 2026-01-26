import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { useAccessibilityClasses } from '@/hooks/accessibility';
import React from 'react';
import { ScrollView } from 'react-native';

/**
 * Profile Screen - MindEase Mobile
 *
 * User profile page with identity and session information
 *
 * Features:
 * - Display user information (email, name, image)
 * - Logout functionality
 * - Delete account functionality
 * - Simple, focused interface
 * - Accessible design (WCAG compliant)
 */
export default function ProfileScreen() {
  const { spacingClasses } = useAccessibilityClasses();

  return (
    <ScrollView
      className={`flex-1 bg-bg-secondary ${spacingClasses.padding}`}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <ProfileInfo testID="profile-page-container" />
    </ScrollView>
  );
}
