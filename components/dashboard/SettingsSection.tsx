import { Card } from '@/components/ui/card';
import React, { ReactNode } from 'react';

/**
 * SettingsSection Component - MindEase Mobile
 * Reusable section container for settings page
 *
 * @example
 * ```tsx
 * <SettingsSection title="Visual Settings" description="Adjust visual preferences">
 *   <Switch ... />
 * </SettingsSection>
 * ```
 */
export interface SettingsSectionProps {
  /** Section title */
  title: string;

  /** Optional section description */
  description?: string;

  /** Section content */
  children: ReactNode;

  /** Custom className */
  className?: string;

  /** Test ID for testing */
  testID?: string;
}

export function SettingsSection({
  title,
  description,
  children,
  className,
  testID,
}: SettingsSectionProps) {
  return (
    <Card className={className} testID={testID || 'settings-section'}>
      <Card.Header>
        <Card.Title
          testID={testID ? `${testID}-title` : 'settings-section-title'}
        >
          {title}
        </Card.Title>
        {description && (
          <Card.Description
            testID={
              testID
                ? `${testID}-description`
                : 'settings-section-description'
            }
          >
            {description}
          </Card.Description>
        )}
      </Card.Header>
      <Card.Content
        testID={testID ? `${testID}-content` : 'settings-section-content'}
      >
        {children}
      </Card.Content>
    </Card>
  );
}

SettingsSection.displayName = 'SettingsSection';
