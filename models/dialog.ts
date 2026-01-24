import type { AccessibilityTextKey } from '@/utils/accessibility';

/**
 * Dialog configuration
 */
export interface DialogConfig {
  id: string;
  titleKey: AccessibilityTextKey;
  descriptionKey: AccessibilityTextKey;
  info?: string;
  onCancel?: () => void;
  onConfirm?: () => void | Promise<void>;
  cancelLabelKey?: AccessibilityTextKey;
  confirmLabelKey?: AccessibilityTextKey;
  confirmVariant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'warning';
  preventClose?: boolean;
  isLoading?: boolean;
  testId?: string;
}

/**
 * Dialog Context Value
 */
export interface DialogContextValue {
  /** Current dialog configuration */
  dialog: DialogConfig | null;

  // Internal setters - only used by useDialog hook and DialogManager
  _setDialog: (
    dialog:
      | DialogConfig
      | null
      | ((prev: DialogConfig | null) => DialogConfig | null)
  ) => void;
}
