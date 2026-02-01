
import { View } from 'react-native';
import { THEME_COLORS } from '@/utils/theme/theme-colors';
import { ButtonSize, ButtonVariant, iconSizes } from './button-styles';

/**
 * Button.Icon - Icon subcomponent
 * Use this for consistent icon styling and positioning
 *
 * @example
 * ```tsx
 * <Button variant="primary">
 *   <Button.Icon icon={LogIn} position="left" />
 *   <Button.Text>Sign in</Button.Text>
 * </Button>
 * ```
 */
export interface ButtonIconProps {
  /** Icon component from lucide-react-native */
  icon: React.ComponentType<{ size?: number; color?: string }>;
  /** Icon position relative to text */
  position?: 'left' | 'right';
  /** Button size - determines icon size */
  size?: ButtonSize;
  /** Variant - determines icon color */
  variant?: ButtonVariant;
  /** Additional className */
  className?: string;
}

export function ButtonIcon({
  icon: Icon,
  position = 'left',
  size = 'sm',
  variant = 'primary',
  className = '',
}: ButtonIconProps) {
  const iconSize = iconSizes[size];

  // Determine icon color based on variant
  // Variants with inverse text (primary, danger, warning) use white
  // Variants with normal text (secondary, ghost) use primary text color
  const iconColor =
    variant === 'ghost'
      ? THEME_COLORS.textPrimary
      : THEME_COLORS.textWhite;

  return (
    <View className={`${position === 'right' ? 'ml-3' : 'mr-3'} ${className}`}>
      <Icon size={iconSize} color={iconColor} />
    </View>
  );
}

ButtonIcon.displayName = 'Button.Icon';
