import { useAccessibilityClasses } from '@/hooks/accessibility';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import React, { forwardRef, useMemo } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { getBorderContrastClasses } from '@/utils/accessibility';
import { styles } from './input-styles';
import { THEME_COLORS } from '@/utils/theme';

/**
 * Input.Field - Input field subcomponent
 * Use this for the actual input or textarea element
 * Built on top of React Native TextInput
 *
 * @example
 * ```tsx
 * <Input>
 *   <Input.Label>Email</Input.Label>
 *   <Input.Field type="email" value={email} onChangeText={setEmail} />
 * </Input>
 *
 * // Textarea
 * <Input>
 *   <Input.Label>Description</Input.Label>
 *   <Input.Field
 *     multiline
 *     numberOfLines={4}
 *     value={description}
 *     onChangeText={setDescription}
 *   />
 * </Input>
 * ```
 */
export interface InputFieldProps extends TextInputProps {
  /** Input type (text, email, password, number) */
  type?: 'text' | 'email' | 'password' | 'number';

  /** Whether this is a textarea (uses multiline) */
  as?: 'input' | 'textarea';

  /** Disable the input field */
  disabled?: boolean;

  /** Custom className */
  className?: string;

  /** Test ID for testing */
  testID?: string;
}

const InputFieldRoot = forwardRef<TextInput, InputFieldProps>(
  (
    {
      className = '',
      type = 'text',
      as,
      multiline,
      disabled = false,
      testID,
      ...props
    },
    ref
  ) => {
    const isTextarea = as === 'textarea' || multiline === true;
    const isDisabled = disabled;

    // Use accessibility classes hook for optimized class generation
    // Only re-renders when relevant settings change
    const {
      fontSizeClasses, // Recalculates only when settings.fontSize changes
      spacingClasses, // Recalculates only when settings.spacing changes
    } = useAccessibilityClasses();

    // Get contrast setting directly (only re-renders when contrast changes)
    const { settings } = useCognitiveSettings();

    // Generate contrast classes with input-specific logic
    const borderClasses = useMemo(
      () => getBorderContrastClasses(settings.contrast, 'subtle'),
      [settings.contrast]
    );

    // Get fontSize class (use base for inputs)
    const fontSizeClass = fontSizeClasses.base;

    // Get horizontal padding from spacing preference
    const paddingClass = useMemo(() => {
      // Extract padding value from spacingClasses.padding (e.g., "p-4" -> "px-4")
      const paddingValue = spacingClasses.padding.replace('p-', '');
      return `px-${paddingValue}`;
    }, [spacingClasses.padding]);

    // Map type to keyboardType and autoCompleteType
    const keyboardType = useMemo(() => {
      switch (type) {
        case 'email':
          return 'email-address';
        case 'number':
          return 'numeric';
        case 'password':
          return 'default'; // password is handled by secureTextEntry
        default:
          return 'default';
      }
    }, [type]);

    const textContentType = useMemo(() => {
      switch (type) {
        case 'email':
          return 'emailAddress';
        case 'password':
          return 'password';
        default:
          return undefined;
      }
    }, [type]);

    // Build field classes
    const fieldClasses = useMemo(() => {
      return [
        styles.field.base,
        isTextarea ? styles.field.textarea : styles.field.input,
        fontSizeClass,
        paddingClass,
        borderClasses,
        isDisabled && styles.field.disabled,
        className,
      ]
        .filter(Boolean)
        .join(' ');
    }, [
      isTextarea,
      fontSizeClass,
      paddingClass,
      borderClasses,
      isDisabled,
      className,
    ]);

    return (
      <TextInput
        ref={ref}
        multiline={isTextarea}
        editable={!isDisabled}
        keyboardType={keyboardType}
        textContentType={textContentType}
        secureTextEntry={type === 'password'}
        autoCapitalize={type === 'email' ? 'none' : 'sentences'}
        autoCorrect={type !== 'email' && type !== 'password'}
        accessibilityRole="text"
        accessibilityState={{ disabled: isDisabled }}
        className={fieldClasses}
        testID={testID || 'input-field'}
        placeholderTextColor={THEME_COLORS.textMuted}
        {...props}
      />
    );
  }
);

InputFieldRoot.displayName = 'Input.Field';

export const InputField = InputFieldRoot;
