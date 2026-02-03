import { Button } from '@/components/ui/button';
import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import { LogOut, Trash2 } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { styles } from './profile-styles';

/**
 * ProfileActions Component - MindEase Mobile
 * Displays action buttons for profile (logout and delete account)
 */
export interface ProfileActionsProps {
  /** Handler for logout action */
  onLogout: () => void;

  /** Handler for delete account action */
  onDeleteAccount: () => void;

  /** Additional CSS classes */
  className?: string;

  /** Test ID for testing */
  testID?: string;
}

export function ProfileActions({
  onLogout,
  onDeleteAccount,
  className = '',
  testID,
}: ProfileActionsProps) {
  const { getText } = useTextDetail();
  const { spacingClasses } = useAccessibilityClasses();

  // Generate accessible classes with memoization
  const actionsClasses = useMemo(
    () => `${styles.actions} ${spacingClasses.gap} ${className}`,
    [spacingClasses, className]
  );

  return (
    <View className={actionsClasses} testID={testID}>
      <Button
        variant="secondary"
        size="md"
        onPress={onLogout}
        accessibilityLabel={getText('logout')}
        testID={testID ? `${testID}-logout-button` : 'profile-logout-button'}>
        <Button.Icon icon={LogOut} position="left" size="md" variant="secondary" />
        <Button.Text variant="secondary">{getText('logout')}</Button.Text>
      </Button>
      <Button
        variant="danger"
        size="md"
        onPress={onDeleteAccount}
        accessibilityLabel={getText('profile_delete_account_aria')}
        testID={testID ? `${testID}-delete-account-button` : 'profile-delete-account-button'}>
        <Button.Icon icon={Trash2} position="left" size="md" variant="danger" />
        <Button.Text variant="danger">{getText('profile_delete_account')}</Button.Text>
      </Button>
    </View>
  );
}

ProfileActions.displayName = 'ProfileActions';
