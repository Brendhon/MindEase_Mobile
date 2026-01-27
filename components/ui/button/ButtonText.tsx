
import { Text } from 'react-native';
import { ButtonVariant, variantStyles } from './button-styles';

/**
 * Button.Text - Text subcomponent
 * Use this for consistent text styling within buttons
 *
 * @example
 * ```tsx
 * <Button variant="primary">
 *   <Button.Text>Click me</Button.Text>
 * </Button>
 * ```
 */
export interface ButtonTextProps {
  /** Text content */
  children: React.ReactNode;
  /** Variant - determines text color */
  variant?: ButtonVariant;
  /** Additional className */
  className?: string;
}

export function ButtonText({
  children,
  variant = 'primary',
  className = '',
}: ButtonTextProps) {
  const variantStyle = variantStyles[variant];

  return (
    <Text
      className={`font-semibold ${variantStyle.textColor} text-center ${className}`}
    >
      {children}
    </Text>
  );
}

ButtonText.displayName = 'Button.Text';
