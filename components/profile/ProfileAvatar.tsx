import { useAccessibilityClasses } from '@/hooks/accessibility';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import { getBorderContrastClasses } from '@/utils/accessibility';
import React, { useMemo } from 'react';
import { Image, Text, View } from 'react-native';

/**
 * ProfileAvatar Component - MindEase Mobile
 * Displays user avatar image or initials (like Teams)
 */
export interface ProfileAvatarProps {
  /** Image URL (optional) */
  image?: string | null;

  /** User name for alt text and initials fallback */
  name?: string | null;

  /** Additional CSS classes */
  className?: string;

  /** Test ID for testing */
  testID?: string;
}

/**
 * Extract initials from name (first letter of first and last name)
 * Similar to Microsoft Teams avatar behavior
 */
function getInitials(name: string | null | undefined): string {
  if (!name) return '?';

  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();

  // First letter of first name + first letter of last name
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Fixed accessible color for avatar initials background
 * Uses primary action color for consistency and accessibility
 * Ensures good contrast with white text (text-text-inverse)
 */
const AVATAR_BG_COLOR = 'bg-action-primary';

export function ProfileAvatar({
  image,
  name,
  className = '',
  testID,
}: ProfileAvatarProps) {
  const initials = useMemo(() => getInitials(name), [name]);
  const { animationsEnabled } = useAccessibilityClasses();
  const { settings } = useCognitiveSettings();

  // Generate accessible classes with memoization
  const containerClasses = `flex justify-center ${className}`;

  const borderClasses = useMemo(
    () => getBorderContrastClasses(settings.contrast, 'subtle'),
    [settings.contrast]
  );

  const avatarClasses = `rounded-full w-24 h-24 border-2 ${borderClasses} shadow-md`;

  const initialsContainerClasses = `rounded-full w-24 h-24 flex items-center justify-center ${AVATAR_BG_COLOR} border-2 ${borderClasses} shadow-md`;

  return (
    <View className={containerClasses} testID={testID}>
      {image ? (
        <Image
          source={{ uri: image }}
          className={avatarClasses}
          accessibilityLabel={name ? `${name} avatar` : 'User avatar'}
          testID={testID ? `${testID}-image` : 'profile-avatar-image'}
        />
      ) : (
        <View
          className={initialsContainerClasses}
          accessibilityLabel={name ? `${name} avatar` : 'User avatar'}
          testID={testID ? `${testID}-initials` : 'profile-avatar-initials'}
        >
          <Text className="text-text-inverse font-semibold text-2xl leading-none">
            {initials}
          </Text>
        </View>
      )}
    </View>
  );
}

ProfileAvatar.displayName = 'ProfileAvatar';
