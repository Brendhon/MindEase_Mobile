import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
} from 'lucide-react-native';
import type { ComponentType } from 'react';

import type { ToastType } from '@/hooks/toast';
import { getFeedbackColorClasses } from '@/utils/theme';

/**
 * Get colors for toast type
 * Uses design system feedback tokens for consistency with web
 * Delegates to centralized theme utility function
 */
export function getTypeStyles(type: ToastType): {
  bgColor: string;
  textColor: string;
  iconColor: string;
} {
  return getFeedbackColorClasses(type);
}

/**
 * Icon configuration for toast types
 * Uses Lucide React Native icons for consistency with web
 */
const iconConfig = {
  success: {
    icon: CheckCircle2,
    ariaLabel: 'Success',
  },
  error: {
    icon: AlertCircle,
    ariaLabel: 'Error',
  },
  warning: {
    icon: AlertTriangle,
    ariaLabel: 'Warning',
  },
  info: {
    icon: Info,
    ariaLabel: 'Information',
  },
} as const;

/**
 * Get icon component for toast type
 */
export function getTypeIcon(type: ToastType): ComponentType<{
  size?: number;
  color?: string;
}> {
  return iconConfig[type].icon;
}
