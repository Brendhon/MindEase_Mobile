import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { THEME_COLORS } from '@/utils/theme/theme-colors';
import { ButtonSize } from './button-styles';

/**
 * Button.Loading - Loading indicator subcomponent
 * Use this for custom loading states
 *
 * @example
 * ```tsx
 * <Button variant="primary" isLoading>
 *   <Button.Loading />
 *   <Button.Text>Saving...</Button.Text>
 * </Button>
 * ```
 */
export interface ButtonLoadingProps {
  /** Button size - determines spinner size */
  size?: ButtonSize;
  /** Variant - determines spinner color */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'warning';
  /** Accessibility label for the loading indicator */
  'aria-label'?: string;
  /** Additional className */
  className?: string;
}

export function ButtonLoading({
  size = 'md',
  variant = 'primary',
  'aria-label': ariaLabel = 'Carregando',
  className = '',
}: ButtonLoadingProps) {
  // Determine spinner color based on variant
  // Variants with inverse text (primary, danger, warning) use white
  // Variants with normal text (secondary, ghost) use primary text color
  const spinnerColor =
    variant === 'ghost' || variant === 'secondary'
      ? THEME_COLORS.textPrimary
      : THEME_COLORS.textWhite;

  return (
    <View className={`flex-row items-center ${className}`}>
      <ActivityIndicator
        size="small"
        color={spinnerColor}
        accessibilityLabel={ariaLabel}
        accessibilityRole="progressbar"
        accessibilityState={{ busy: true }}
      />
    </View>
  );
}

ButtonLoading.displayName = 'Button.Loading';
