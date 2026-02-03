import { Card } from '@/components/ui/card';
import { useAccessibilityClasses } from '@/hooks/accessibility';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import { AuthUser } from '@/models/auth';
import { getBorderContrastClasses } from '@/utils/accessibility';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileInfoRow } from './ProfileInfoRow';
import { styles } from './profile-styles';

/**
 * ProfileInfoCard Component - MindEase Mobile
 * Displays user information in a card format
 */
export interface ProfileInfoCardProps {
  /** User data */
  user: AuthUser | null;

  /** Label CSS classes */
  labelClassName?: string;

  /** Value CSS classes */
  valueClassName?: string;

  /** Additional CSS classes */
  className?: string;

  /** Test ID for testing */
  testID?: string;
}

export function ProfileInfoCard({
  user,
  labelClassName = '',
  valueClassName = '',
  className = '',
  testID,
}: ProfileInfoCardProps) {
  const { spacingClasses, animationsEnabled } = useAccessibilityClasses();
  const { settings } = useCognitiveSettings();

  // Generate accessible classes with memoization
  const borderClasses = useMemo(
    () => getBorderContrastClasses(settings.contrast, 'subtle'),
    [settings.contrast]
  );

  const cardClasses = useMemo(
    () => `${styles.infoCard} ${spacingClasses.gap} ${borderClasses} ${className}`,
    [spacingClasses.gap, borderClasses, className]
  );

  const infoSectionClasses = useMemo(
    () => `${styles.infoSection} ${spacingClasses.gap}`,
    [spacingClasses.gap]
  );

  return (
    <Card className={cardClasses} testID={testID}>
      <View className={styles.avatarSection}>
        <ProfileAvatar
          image={user?.image || null}
          name={user?.name || null}
          testID={testID ? `${testID}-avatar` : 'profile-avatar'}
        />
      </View>

      <View className={infoSectionClasses}>
        {user?.name && (
          <ProfileInfoRow
            labelKey="profile_info_name"
            value={user?.name}
            labelClassName={labelClassName}
            valueClassName={valueClassName}
            testID={testID ? `${testID}-name-row` : 'profile-name-row'}
          />
        )}

        <ProfileInfoRow
          labelKey="profile_info_email"
          value={user?.email || ''}
          labelClassName={labelClassName}
          valueClassName={valueClassName}
          testID={testID ? `${testID}-email-row` : 'profile-email-row'}
        />
      </View>
    </Card>
  );
}

ProfileInfoCard.displayName = 'ProfileInfoCard';
