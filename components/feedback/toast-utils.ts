import type { ToastType } from '@/hooks/toast';

/**
 * Get colors for toast type
 */
export function getTypeStyles(type: ToastType): {
  bgColor: string;
  textColor: string;
  iconColor: string;
} {
  switch (type) {
    case 'success':
      return {
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        iconColor: 'text-green-500',
      };
    case 'error':
      return {
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        iconColor: 'text-red-500',
      };
    case 'warning':
      return {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        iconColor: 'text-yellow-500',
      };
    case 'info':
    default:
      return {
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
        iconColor: 'text-blue-500',
      };
  }
}

/**
 * Get icon character for toast type
 */
export function getTypeIcon(type: ToastType): string {
  switch (type) {
    case 'success':
      return '✓';
    case 'error':
      return '✕';
    case 'warning':
      return '⚠';
    case 'info':
    default:
      return 'ℹ';
  }
}
