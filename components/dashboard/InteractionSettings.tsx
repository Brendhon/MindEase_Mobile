import { Select } from '@/components/form/select';
import { Switch } from '@/components/form/switch';
import { useAccessibilityClasses, useTextDetail } from '@/hooks/accessibility';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { SettingsSection } from './SettingsSection';

/**
 * InteractionSettings Component - MindEase Mobile
 * Interaction accessibility settings section (animations, focusMode, timer settings)
 */
export interface InteractionSettingsProps {
  /** Test ID for testing */
  testID?: string;
}

export function InteractionSettings({ testID }: InteractionSettingsProps) {
  const { settings, updateSetting } = useCognitiveSettings();

  // Use accessibility classes hook for optimized class generation
  // Only re-renders when spacing changes
  const { spacingClasses } = useAccessibilityClasses();

  // Use text detail hook for optimized text helpers
  // Only re-renders when textDetail setting changes
  const { getText } = useTextDetail();

  const timerSettingsClasses = useMemo(
    () => `flex flex-col ${spacingClasses.gap}`,
    [spacingClasses.gap]
  );

  // Prepare focus duration items
  const focusDurationItems = useMemo(
    () => [
      {
        label: getText('profile_setting_focus_duration_1'),
        value: 1,
      },
      {
        label: getText('profile_setting_focus_duration_15'),
        value: 15,
      },
      {
        label: getText('profile_setting_focus_duration_25'),
        value: 25,
      },
      {
        label: getText('profile_setting_focus_duration_30'),
        value: 30,
      },
      {
        label: getText('profile_setting_focus_duration_40'),
        value: 40,
      },
    ],
    [getText]
  );

  // Prepare break duration items
  const breakDurationItems = useMemo(
    () => [
      {
        label: getText('profile_setting_break_duration_1'),
        value: 1,
      },
      {
        label: getText('profile_setting_break_duration_5'),
        value: 5,
      },
      {
        label: getText('profile_setting_break_duration_10'),
        value: 10,
      },
    ],
    [getText]
  );

  return (
    <SettingsSection
      title={getText('profile_section_interaction')}
      testID={testID || 'profile-section-interaction'}
    >
      {/* Animations Setting */}
      <Switch testID="profile-animations">
        <Switch.Toggle
          checked={settings.animations}
          onChange={(checked) => updateSetting('animations', checked)}
        />
        <View className="flex flex-col">
          <Switch.Label
            onPress={() => updateSetting('animations', !settings.animations)}
            testID="profile-animations-label"
          >
            {getText('profile_setting_animations')}
          </Switch.Label>
          <Switch.Description testID="profile-animations-description">
            {getText('profile_setting_animations_desc')}
          </Switch.Description>
        </View>
      </Switch>

      {/* Focus Mode Setting */}
      <Switch testID="profile-focus-mode">
        <Switch.Toggle
          checked={settings.focusMode}
          onChange={(checked) => updateSetting('focusMode', checked)}
        />
        <View className="flex flex-col">
          <Switch.Label
            onPress={() => updateSetting('focusMode', !settings.focusMode)}
            testID="profile-focus-mode-label"
          >
            {getText('profile_setting_focus_mode')}
          </Switch.Label>
          <Switch.Description testID="profile-focus-mode-description">
            {getText('profile_setting_focus_mode_desc')}
          </Switch.Description>
        </View>
      </Switch>

      {/* Timer Settings (Pomodoro Adapted) */}
      <View className={timerSettingsClasses}>
        {/* Focus Duration */}
        <Select testID="profile-focus-duration-select">
          <Select.Label testID="profile-focus-duration-label">
            {getText('profile_setting_focus_duration')}
          </Select.Label>
          <Select.Field
            selectedValue={settings.focusDuration || 25}
            onValueChange={(value) => updateSetting('focusDuration', Number(value))}
            items={focusDurationItems}
            testID="profile-focus-duration"
          />
          <Text className="text-sm text-text-secondary mt-1">
            {getText('profile_setting_focus_duration_desc')}
          </Text>
        </Select>

        {/* Break Duration */}
        <Select testID="profile-break-duration-select">
          <Select.Label testID="profile-break-duration-label">
            {getText('profile_setting_break_duration')}
          </Select.Label>
          <Select.Field
            selectedValue={settings.shortBreakDuration || 5}
            onValueChange={(value) =>
              updateSetting('shortBreakDuration', Number(value))
            }
            items={breakDurationItems}
            testID="profile-break-duration"
          />
          <Text className="text-sm text-text-secondary mt-1">
            {getText('profile_setting_break_duration_desc')}
          </Text>
        </Select>
      </View>
    </SettingsSection>
  );
}

InteractionSettings.displayName = 'InteractionSettings';
