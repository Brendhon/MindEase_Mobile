import React, { useState, useMemo } from 'react';
import { Pressable, PressableProps, View } from 'react-native';
import { useAccessibilityClasses } from '@/hooks/accessibility';
import { useCognitiveSettings } from '@/hooks/cognitive-settings';
import {
  ButtonVariant,
  ButtonSize,
  variantStyles,
  baseStyles,
  getSizeClasses,
  getContrastClasses,
} from './button-styles';
import { ButtonIcon } from './ButtonIcon';
import { ButtonLoading } from './ButtonLoading';
import { ButtonText } from './ButtonText';

/**
 * Button Component - MindEase Mobile
 * Accessible, extensible button with cognitive accessibility features
 *
 * Uses composition pattern exclusively - only accepts Button subcomponents:
 * - Button.Icon for icons
 * - Button.Text for text content
 * - Button.Loading for loading states
 *
 * @example
 * ```tsx
 * // With text only
 * <Button variant="primary" size="md">
 *   <Button.Text>Click me</Button.Text>
 * </Button>
 *
 * // With icon and text
 * <Button variant="primary">
 *   <Button.Icon icon={LogIn} position="left" />
 *   <Button.Text>Sign in</Button.Text>
 * </Button>
 *
 * // With loading state
 * <Button variant="primary" isLoading>
 *   <Button.Loading />
 *   <Button.Text>Saving...</Button.Text>
 * </Button>
 * ```
 */
export interface ButtonProps extends Omit<PressableProps, 'children'> {
  /** Button visual variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Loading state - shows spinner and disables button */
  isLoading?: boolean;
  /** Button content - only accepts Button subcomponents */
  children: React.ReactNode;
  /** Additional className for the button container */
  className?: string;
}

export function ButtonRoot({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const isDisabled = disabled || isLoading;

  // Use accessibility classes hook for optimized class generation
  // Only re-renders when relevant settings change
  const {
    fontSizeClasses, // Recalculates only when settings.fontSize changes
    spacingClasses, // Recalculates only when settings.spacing changes
  } = useAccessibilityClasses();

  // Get contrast setting directly from cognitive settings
  // Only re-renders when contrast changes
  const { settings } = useCognitiveSettings();

  // Generate size classes (padding, border radius)
  const sizeClasses = useMemo(() => getSizeClasses(size), [size]);

  // Generate contrast classes with button-specific logic (variant-based borders)
  const contrastClasses = useMemo(
    () => getContrastClasses(settings.contrast, variant),
    [settings.contrast, variant]
  );

  // Get fontSize class based on size prop and user preference
  // Map button size to fontSize context: sm -> sm, md -> base, lg -> lg
  const fontSizeClass = useMemo(() => {
    const sizeToFontContext: Record<ButtonSize, 'sm' | 'base' | 'lg'> = {
      sm: 'sm',
      md: 'base',
      lg: 'lg',
    };
    return fontSizeClasses[sizeToFontContext[size]];
  }, [fontSizeClasses, size]);

  // Get variant styles
  const variantStyle = variantStyles[variant];

  // Build className with all styles
  const baseClassName = useMemo(() => {
    return [
      baseStyles.container,
      sizeClasses,
      isPressed ? variantStyle.pressed : variantStyle.base,
      fontSizeClass, // Dynamically updates based on settings.fontSize
      spacingClasses.gap, // Dynamically updates based on settings.spacing (internal spacing between icon/text)
      contrastClasses,
      isDisabled && baseStyles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }, [
    sizeClasses,
    isPressed,
    variantStyle,
    fontSizeClass,
    spacingClasses.gap,
    contrastClasses,
    isDisabled,
    className,
  ]);

  return (
    <Pressable
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className={baseClassName}
      {...props}
    >
      {isLoading ? (
        <ButtonLoading size={size} variant={variant} />
      ) : (
        <View className="flex-row items-center">{children}</View>
      )}
    </Pressable>
  );
}


export const Button = Object.assign(ButtonRoot, {
  Icon: ButtonIcon,
  Text: ButtonText,
  Loading: ButtonLoading,
});
