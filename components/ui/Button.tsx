import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  View,
} from 'react-native';

/**
 * Button component variants and sizes
 * Designed for cognitive accessibility with clear visual hierarchy
 */

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  /** Button visual variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Loading state - shows spinner and disables button */
  isLoading?: boolean;
  /** Button content */
  children: React.ReactNode;
  /** Additional className for the button container */
  className?: string;
}

interface ButtonTextProps {
  children: React.ReactNode;
  className?: string;
}

interface ButtonIconProps {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  position?: 'left' | 'right';
  size?: ButtonSize;
}

/**
 * Variant styles mapping
 * Uses low-stimulation colors for cognitive accessibility
 */
const variantStyles: Record<ButtonVariant, { base: string; pressed: string }> =
  {
    primary: {
      base: 'bg-action-primary',
      pressed: 'bg-action-primary-hover',
    },
    secondary: {
      base: 'bg-action-secondary',
      pressed: 'bg-action-secondary-hover',
    },
    danger: {
      base: 'bg-action-danger',
      pressed: 'bg-action-danger-hover',
    },
    ghost: {
      base: 'bg-transparent',
      pressed: 'bg-bg-tertiary',
    },
  };

/**
 * Size styles mapping
 * Provides adequate touch targets for accessibility
 */
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 rounded-sm',
  md: 'px-4 py-3 rounded-md',
  lg: 'px-6 py-4 rounded-lg',
};

/**
 * Icon size mapping
 */
const iconSizes: Record<ButtonSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

/**
 * Primary Button Component
 *
 * Accessible button with multiple variants and sizes.
 * Supports loading state, icons, and compound components pattern.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onPress={handlePress}>
 *   <Button.Icon icon={LogIn} position="left" />
 *   <Button.Text>Sign In</Button.Text>
 * </Button>
 * ```
 */
export function Button({
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
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  const baseClassName = `flex-row items-center justify-center ${sizeStyle} ${
    isPressed ? variantStyle.pressed : variantStyle.base
  } ${isDisabled ? 'opacity-50' : ''} ${className}`;

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
        <ActivityIndicator
          size="small"
          color={variant === 'ghost' ? '#374151' : '#ffffff'}
          accessibilityLabel="Carregando"
        />
      ) : (
        <View className="flex-row items-center gap-2">{children}</View>
      )}
    </Pressable>
  );
}

/**
 * Button.Text - Text content for the button
 */
function ButtonText({ children, className = '' }: ButtonTextProps) {
  return (
    <Text
      className={`font-semibold text-text-inverse text-center ${className}`}
    >
      {children}
    </Text>
  );
}

/**
 * Button.Icon - Icon component for the button
 */
function ButtonIcon({ icon: Icon, position = 'left', size = 'md' }: ButtonIconProps) {
  const iconSize = iconSizes[size];

  return (
    <View className={position === 'right' ? 'ml-1' : 'mr-1'}>
      <Icon size={iconSize} color="#ffffff" />
    </View>
  );
}

// Compound components pattern
Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export default Button;
