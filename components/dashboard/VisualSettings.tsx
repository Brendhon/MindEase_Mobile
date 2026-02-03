import { SettingsSection } from './SettingsSection';
import { RadioGroup } from '@/components/form/radio-group';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import { useTextDetail } from '@/hooks/accessibility';

/**
 * VisualSettings Component - MindEase Mobile
 * Visual accessibility settings section (contrast, spacing, fontSize)
 */
export interface VisualSettingsProps {
  /** Test ID for testing */
  testID?: string;
}

export function VisualSettings({ testID }: VisualSettingsProps) {
  const { settings, updateSetting } = useCognitiveSettings();
  const { getText } = useTextDetail();

  return (
    <SettingsSection
      title={getText('profile_section_visual')}
      testID={testID || 'profile-section-visual'}>
      {/* Contrast Setting */}
      <RadioGroup
        value={settings.contrast}
        onChange={(value) => updateSetting('contrast', value)}
        testID="profile-contrast">
        <RadioGroup.Header>
          <RadioGroup.Label testID="profile-contrast-label">
            {getText('profile_setting_contrast')}
          </RadioGroup.Label>
          <RadioGroup.Description testID="profile-contrast-description">
            {getText('profile_setting_contrast_desc')}
          </RadioGroup.Description>
        </RadioGroup.Header>
        <RadioGroup.Option
          value="normal"
          label={getText('profile_setting_contrast_normal')}
          description={getText('profile_setting_contrast_normal_desc')}
          testID="profile-contrast-normal"
        />
        <RadioGroup.Option
          value="high"
          label={getText('profile_setting_contrast_high')}
          description={getText('profile_setting_contrast_high_desc')}
          testID="profile-contrast-high"
        />
        <RadioGroup.Option
          value="low"
          label={getText('profile_setting_contrast_low')}
          description={getText('profile_setting_contrast_low_desc')}
          testID="profile-contrast-low"
        />
      </RadioGroup>

      {/* Spacing Setting */}
      <RadioGroup
        value={settings.spacing}
        onChange={(value) => updateSetting('spacing', value)}
        testID="profile-spacing">
        <RadioGroup.Header>
          <RadioGroup.Label testID="profile-spacing-label">
            {getText('profile_setting_spacing')}
          </RadioGroup.Label>
          <RadioGroup.Description testID="profile-spacing-description">
            {getText('profile_setting_spacing_desc')}
          </RadioGroup.Description>
        </RadioGroup.Header>
        <RadioGroup.Option
          value="compact"
          label={getText('profile_setting_spacing_compact')}
          description={getText('profile_setting_spacing_compact_desc')}
          testID="profile-spacing-compact"
        />
        <RadioGroup.Option
          value="normal"
          label={getText('profile_setting_spacing_normal')}
          description={getText('profile_setting_spacing_normal_desc')}
          testID="profile-spacing-normal"
        />
        <RadioGroup.Option
          value="relaxed"
          label={getText('profile_setting_spacing_relaxed')}
          description={getText('profile_setting_spacing_relaxed_desc')}
          testID="profile-spacing-relaxed"
        />
      </RadioGroup>

      {/* Font Size Setting */}
      <RadioGroup
        value={settings.fontSize}
        onChange={(value) => updateSetting('fontSize', value)}
        testID="profile-fontsize">
        <RadioGroup.Header>
          <RadioGroup.Label testID="profile-fontsize-label">
            {getText('profile_setting_font_size')}
          </RadioGroup.Label>
          <RadioGroup.Description testID="profile-fontsize-description">
            {getText('profile_setting_font_size_desc')}
          </RadioGroup.Description>
        </RadioGroup.Header>
        <RadioGroup.Option
          value="small"
          label={getText('profile_setting_font_size_small')}
          description={getText('profile_setting_font_size_small_desc')}
          testID="profile-fontsize-small"
        />
        <RadioGroup.Option
          value="normal"
          label={getText('profile_setting_font_size_normal')}
          description={getText('profile_setting_font_size_normal_desc')}
          testID="profile-fontsize-normal"
        />
        <RadioGroup.Option
          value="large"
          label={getText('profile_setting_font_size_large')}
          description={getText('profile_setting_font_size_large_desc')}
          testID="profile-fontsize-large"
        />
      </RadioGroup>
    </SettingsSection>
  );
}

VisualSettings.displayName = 'VisualSettings';
