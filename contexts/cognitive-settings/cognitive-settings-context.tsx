import React, { createContext, useContext, useState, ReactNode } from 'react';

import { UserPreferences, DEFAULT_ACCESSIBILITY_SETTINGS } from '@/models/user-preferences';

/**
 * Cognitive Settings Context - MindEase Mobile
 *
 * Context for global cognitive accessibility settings state.
 *
 * This context provides:
 * - Settings state
 * - Loading and error states
 * - Internal setters for useCognitiveSettings hook
 *
 * All business logic (CRUD operations, storage sync, loading, error handling)
 * is handled by the useCognitiveSettings hook.
 * Components should use useCognitiveSettings(), not useCognitiveSettingsContext().
 */
interface CognitiveSettingsContextValue {
  settings: UserPreferences;
  isLoading: boolean;
  error: Error | null;

  // Internal setters - only used by useCognitiveSettings hook
  _setSettings: (settings: UserPreferences | ((prev: UserPreferences) => UserPreferences)) => void;
  _setLoading: (loading: boolean) => void;
  _setError: (error: Error | null) => void;
}

const CognitiveSettingsContext = createContext<CognitiveSettingsContextValue | undefined>(
  undefined
);

interface CognitiveSettingsProviderProps {
  children: ReactNode;
  /** Initial settings (optional) - defaults to DEFAULT_ACCESSIBILITY_SETTINGS */
  initialSettings?: UserPreferences;
}

/**
 * Provider component for cognitive settings
 *
 * Wraps the app to provide cognitive accessibility settings to all components.
 *
 * @example
 * ```tsx
 * <CognitiveSettingsProvider>
 *   <App />
 * </CognitiveSettingsProvider>
 * ```
 */
export function CognitiveSettingsProvider({
  children,
  initialSettings = DEFAULT_ACCESSIBILITY_SETTINGS,
}: CognitiveSettingsProviderProps) {
  const [settings, setSettings] = useState<UserPreferences>(initialSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const value: CognitiveSettingsContextValue = {
    settings,
    isLoading,
    error,
    _setSettings: setSettings,
    _setLoading: setIsLoading,
    _setError: setError,
  };

  return (
    <CognitiveSettingsContext.Provider value={value}>{children}</CognitiveSettingsContext.Provider>
  );
}

/**
 * Hook to access cognitive settings context
 *
 * Note: This hook is for internal use by useCognitiveSettings hook only.
 * Components should use useCognitiveSettings() instead, which provides all business logic.
 *
 * @throws Error if used outside CognitiveSettingsProvider
 *
 * @internal
 */
export function useCognitiveSettingsContext(): CognitiveSettingsContextValue {
  const context = useContext(CognitiveSettingsContext);

  if (!context) {
    throw new Error('useCognitiveSettingsContext must be used within CognitiveSettingsProvider');
  }

  return context;
}
