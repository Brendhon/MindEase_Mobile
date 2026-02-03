import { useAccessibilityClasses } from '@/hooks/accessibility';
import React, { useId, useMemo } from 'react';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import { Text } from 'react-native';
import { Input } from '../input';
import { styles } from './form-input-styles';

/**
 * FormInput - Integrated Input with react-hook-form (React Native)
 *
 * Automatically connects to form context via Controller, displays validation errors,
 * and handles accessibility. Uses value/onChangeText/onBlur for RN TextInput.
 *
 * @example
 * ```tsx
 * // Inside a FormProvider
 * <FormInput
 *   name="email"
 *   label="Email"
 *   type="email"
 *   placeholder="your@email.com"
 * />
 *
 * // Textarea
 * <FormInput
 *   name="description"
 *   label="Description"
 *   as="textarea"
 *   placeholder="Tell us more..."
 *   rows={3}
 * />
 * ```
 */
export interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  /** Field name (must match schema key) */
  name: TName;

  /** Label text */
  label: string;

  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea';

  /** Component type */
  as?: 'input' | 'textarea';

  /** Placeholder text */
  placeholder?: string;

  /** Disable the input */
  disabled?: boolean;

  /** Additional validation rules (optional) */
  rules?: ControllerProps<TFieldValues, TName>['rules'];

  /** Custom className for container */
  className?: string;

  /** Custom className for input field */
  inputClassName?: string;

  /** Whether the field is required (adds * to label) */
  required?: boolean;

  /** Helper text to display below the input */
  helperText?: string;

  /** Number of rows for textarea (maps to numberOfLines on RN) */
  rows?: number;

  /** Test ID for container */
  testID?: string;
}

export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  type = 'text',
  as,
  placeholder,
  disabled,
  rules,
  className = '',
  inputClassName = '',
  required,
  helperText,
  rows,
  testID,
}: FormInputProps<TFieldValues, TName>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const generatedId = useId();
  const inputId = `${String(name)}-${generatedId}`;
  const errorId = `${String(name)}-error-${generatedId}`;
  const helperId = helperText ? `${String(name)}-helper-${generatedId}` : undefined;

  const fieldError = errors[name];
  const errorMessage = fieldError?.message as string | undefined;

  const { fontSizeClasses } = useAccessibilityClasses();
  const helperTextFontSize = useMemo(() => fontSizeClasses.sm, [fontSizeClasses.sm]);

  const labelText = required ? `${label} *` : label;

  const fieldClassName = useMemo(() => {
    const parts = [errorMessage && styles.fieldError, inputClassName].filter(Boolean);
    return parts.join(' ');
  }, [errorMessage, inputClassName]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Input className={className} testID={testID || `form-input-${String(name)}`}>
          <Input.Label nativeID={inputId} testID={`form-input-label-${String(name)}`}>
            {labelText}
          </Input.Label>

          <Input.Field
            value={field.value ?? ''}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            nativeID={inputId}
            type={type === 'textarea' ? 'text' : type}
            as={as}
            placeholder={placeholder}
            disabled={disabled}
            numberOfLines={as === 'textarea' ? (rows ?? 3) : undefined}
            multiline={as === 'textarea'}
            className={fieldClassName}
            testID={`form-input-field-${String(name)}`}
            accessibilityLabel={label}
          />

          {helperText && !errorMessage && (
            <Text
              nativeID={helperId}
              className={`${styles.helperText} ${helperTextFontSize}`}
              testID={`form-input-helper-${String(name)}`}>
              {helperText}
            </Text>
          )}

          {errorMessage && (
            <Input.Error testID={`form-input-error-${String(name)}`}>{errorMessage}</Input.Error>
          )}
        </Input>
      )}
    />
  );
}

FormInput.displayName = 'FormInput';
