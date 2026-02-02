import { useAccessibilityClasses } from '@/hooks/accessibility';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Picker, PickerProps } from '@react-native-picker/picker';
import { getBorderContrastClasses } from '@/utils/accessibility';
import { THEME_COLORS } from '@/utils/theme/theme-colors';
import { styles } from './select-styles';

/**
 * Select Field Item
 * Represents a single option in the picker
 */
export interface SelectFieldItem {
  label: string;
  value: string | number;
}

/**
 * Select.Field - Select field subcomponent
 * Use this for the actual select element
 * Built on top of React Native Picker for native platform support
 *
 * @example
 * ```tsx
 * <Select>
 *   <Select.Label>Country</Select.Label>
 *   <Select.Field
 *     selectedValue={country}
 *     onValueChange={setCountry}
 *     items={[
 *       { label: 'Select a country', value: '' },
 *       { label: 'Brazil', value: 'br' },
 *       { label: 'United States', value: 'us' },
 *     ]}
 *   />
 * </Select>
 * ```
 */
export interface SelectFieldProps
  extends Omit<PickerProps, 'children' | 'onValueChange'> {
  /** Selected value */
  selectedValue?: string | number;

  /** Change handler */
  onValueChange?: (value: string | number, index: number) => void;

  /** Array of items to display */
  items: SelectFieldItem[];

  /** Disable the select field */
  disabled?: boolean;

  /** Placeholder text (shown when no value is selected) */
  placeholder?: string;

  /** Custom className */
  className?: string;

  /** Test ID for testing */
  testID?: string;
}

export function SelectField({
  selectedValue,
  onValueChange,
  items,
  placeholder,
  disabled = false,
  className = '',
  testID,
  ...pickerProps
}: SelectFieldProps) {
  const isDisabled = disabled;

  // Use accessibility classes hook for optimized class generation
  // Only re-renders when relevant settings change
  const {
    fontSizeClasses, // Recalculates only when settings.fontSize changes
    spacingClasses, // Recalculates only when settings.spacing changes
  } = useAccessibilityClasses();

  // Get contrast setting directly (only re-renders when contrast changes)
  const { settings } = useCognitiveSettings();

  // Picker native component does not inherit View text color; set explicit
  // color from theme so text is always visible (no dark mode in project).
  const pickerTextColor = THEME_COLORS.textPrimary;

  // Generate contrast classes with select-specific logic
  const borderClasses = useMemo(
    () => getBorderContrastClasses(settings.contrast, 'subtle'),
    [settings.contrast]
  );

  // Get fontSize class (use base for selects)
  const fontSizeClass = fontSizeClasses.base;

  // Get horizontal padding from spacing preference
  const paddingClass = useMemo(() => {
    // Extract padding value from spacingClasses.padding (e.g., "p-4" -> "px-4")
    const paddingValue = spacingClasses.padding.replace('p-', '');
    return `px-${paddingValue}`;
  }, [spacingClasses.padding]);

  // Build field classes
  const fieldClasses = useMemo(() => {
    return [
      styles.field.base,
      fontSizeClass,
      paddingClass,
      borderClasses,
      isDisabled && styles.field.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }, [fontSizeClass, paddingClass, borderClasses, isDisabled, className]);

  // Combine items with placeholder if provided
  const pickerItems = useMemo(() => {
    if (placeholder && !items.find((item) => item.value === '')) {
      return [{ label: placeholder, value: '' }, ...items];
    }
    return items;
  }, [items, placeholder]);

  return (
    <View className={fieldClasses} testID={testID || 'select-field'}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        enabled={!isDisabled}
        itemStyle={{ color: pickerTextColor }}
        accessibilityRole="combobox"
        accessibilityState={{
          disabled: isDisabled,
          expanded: false, // Picker is always collapsed until opened
        }}
        accessibilityLabel={pickerProps.accessibilityLabel}
        {...pickerProps}
      >
        {pickerItems.map((item, index) => (
          <Picker.Item
            key={item.value !== undefined ? String(item.value) : index}
            label={item.label}
            value={item.value}
            color={pickerTextColor}
          />
        ))}
      </Picker>
    </View>
  );
}

SelectField.displayName = 'Select.Field';
