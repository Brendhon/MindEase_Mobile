import { SettingsSection } from './SettingsSection';
import { RadioGroup } from '@/components/form/radio-group';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import { useTextDetail } from '@/hooks/accessibility';

/**
 * ContentSettings Component - MindEase Mobile
 * Content accessibility settings section (textDetail)
 */
export interface ContentSettingsProps {
  /** Test ID for testing */
  testID?: string;
}

export function ContentSettings({ testID }: ContentSettingsProps) {
  const { settings, updateSetting } = useCognitiveSettings();
  const { getText } = useTextDetail();

  return (
    <SettingsSection
      title={getText('profile_section_content')}
      testID={testID || 'profile-section-content'}>
      {/* Text Detail Setting */}
      <RadioGroup
        value={settings.textDetail}
        onChange={(value) => updateSetting('textDetail', value)}
        testID="profile-textdetail">
        <RadioGroup.Header>
          <RadioGroup.Label testID="profile-textdetail-label">
            {getText('profile_setting_text_detail')}
          </RadioGroup.Label>
          <RadioGroup.Description testID="profile-textdetail-description">
            {getText('profile_setting_text_detail_desc')}
          </RadioGroup.Description>
        </RadioGroup.Header>
        <RadioGroup.Option
          value="detailed"
          label={getText('profile_setting_text_detail_detailed')}
          description={getText('profile_setting_text_detail_detailed_desc')}
          testID="profile-textdetail-detailed"
        />
        <RadioGroup.Option
          value="summary"
          label={getText('profile_setting_text_detail_summary')}
          description={getText('profile_setting_text_detail_summary_desc')}
          testID="profile-textdetail-summary"
        />
      </RadioGroup>
    </SettingsSection>
  );
}

ContentSettings.displayName = 'ContentSettings';
