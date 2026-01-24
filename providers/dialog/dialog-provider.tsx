import React, { ReactNode, useState, useCallback } from 'react';

import { DialogContext } from '@/contexts/dialog';
import { DialogConfig } from '@/models/dialog';

/**
 * Dialog Provider Props
 */
export interface DialogProviderProps {
  children: ReactNode;
}

/**
 * Dialog Provider Component - MindEase Mobile
 * Provides dialog context to children components
 *
 * This provider manages ONLY basic state (dialog).
 * All business logic is handled by the useDialog hook.
 *
 * Note: Unlike the web version, this provider does NOT include a DialogManager component.
 * The DialogManager should be added separately in the app layout.
 */
export function DialogProvider({ children }: DialogProviderProps) {
  const [dialog, setDialog] = useState<DialogConfig | null>(null);

  // Internal setter for useDialog hook to use
  const setDialogState = useCallback(
    (
      newDialog:
        | DialogConfig
        | null
        | ((prev: DialogConfig | null) => DialogConfig | null)
    ) => setDialog(newDialog),
    []
  );

  return (
    <DialogContext.Provider
      value={{
        dialog,
        _setDialog: setDialogState,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
