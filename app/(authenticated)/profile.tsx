import { PageScrollView } from '@/components/layout';
import { ProfileInfo } from '@/components/profile/ProfileInfo';

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
  return (
    <PageScrollView testID="profile-page-scroll">
      <ProfileInfo testID="profile-page-container" />
    </PageScrollView>
  );
}