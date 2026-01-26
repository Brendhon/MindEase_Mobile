import { PageHeader } from '@/components/layout/PageHeader';
import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import { useAlert } from '@/hooks/alert';
import { useAuth } from '@/hooks/auth';
import { useFeedback } from '@/hooks/feedback';
import { AuthUser } from '@/models/auth';
import { authService } from '@/services/auth';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { ProfileActions } from './ProfileActions';
import { ProfileInfoCard } from './ProfileInfoCard';

/**
 * ProfileInfo Component - MindEase Mobile
 * Display user information, logout and delete account buttons
 */
export interface ProfileInfoProps {
  /** User data from server (optional, falls back to useAuth if not provided) */
  user?: AuthUser | null;

  /** Test ID for testing */
  testID?: string;
}

export function ProfileInfo({
  user: userProp,
  testID,
}: ProfileInfoProps) {
  // Use provided user prop or fall back to useAuth for backward compatibility
  const auth = useAuth();
  const user = userProp || auth.user;

  const router = useRouter();
  const { signOut } = auth;
  const { fontSizeClasses, spacingClasses, animationsEnabled } = useAccessibilityClasses();
  const { getText } = useTextDetail();
  const { error: showError, success } = useFeedback();
  const { showConfirmation } = useAlert();

  // Generate accessible classes with memoization
  const labelClasses = useMemo(
    () => `text-text-secondary font-medium text-sm ${fontSizeClasses.sm}`,
    [fontSizeClasses.sm]
  );

  const valueClasses = useMemo(
    () => `text-text-primary font-normal break-words ${fontSizeClasses.base}`,
    [fontSizeClasses.base]
  );

  const containerClasses = useMemo(
    () => `flex flex-col w-full max-w-4xl mx-auto ${spacingClasses.gap} ${animationsEnabled ? '' : ''}`,
    [spacingClasses.gap, animationsEnabled]
  );

  const errorClasses = useMemo(
    () => `text-action-danger text-center ${fontSizeClasses.base}`,
    [fontSizeClasses.base]
  );

  // Handle logout
  const handleLogout = useCallback(async () => {
    await signOut();
    router.replace('/login');
  }, [signOut, router]);

  // Delete account confirmation
  const deleteAccountDialog = useCallback(() => {
    if (!user?.uid) return;

    showConfirmation({
      titleKey: 'profile_delete_dialog_title',
      messageKey: 'profile_delete_dialog_message',
      cancelLabelKey: 'profile_delete_dialog_cancel',
      confirmLabelKey: 'profile_delete_dialog_confirm',
      confirmStyle: 'destructive',
      onConfirm: async () => {
        try {
          await authService.deleteAccount(user.uid);
          success('toast_success_account_deleted');
        } catch (err) {
          console.error('Error deleting account:', err);
          showError('toast_error_account_deletion_failed');
        }
      },
    });
  }, [user?.uid, showConfirmation, showError, success]);

  const handleDeleteAccount = useCallback(() => {
    if (!user?.uid) {
      showError('toast_error_account_deletion_failed');
      return;
    }

    deleteAccountDialog();
  }, [user?.uid, deleteAccountDialog, showError]);

  if (!user) {
    return (
      <View
        className={containerClasses}
        testID={testID || 'profile-info-container'}
      >
        <Text className={errorClasses}>{getText('error')}</Text>
      </View>
    );
  }

  return (
    <View
      className={containerClasses}
      testID={testID || 'profile-info-container'}
    >
      <PageHeader
        descriptionKey="profile_description"
        testID={testID ? `${testID}-header` : 'profile-info-header'}
      />

      <ProfileInfoCard
        user={user}
        labelClassName={labelClasses}
        valueClassName={valueClasses}
        testID={testID ? `${testID}-card` : 'profile-info-card'}
      />

      <ProfileActions
        onLogout={handleLogout}
        onDeleteAccount={handleDeleteAccount}
        className={spacingClasses.gap}
        testID={testID ? `${testID}-actions` : 'profile-actions'}
      />
    </View>
  );
}

ProfileInfo.displayName = 'ProfileInfo';
