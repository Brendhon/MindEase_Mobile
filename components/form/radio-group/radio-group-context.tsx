import { createContext, useContext } from 'react';

/**
 * RadioGroup Context
 * Provides IDs for Label and Description to subcomponents
 * Also provides value and onChange for controlled state
 */
interface RadioGroupContextValue {
  labelId: string;
  descriptionId: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(
  null
);

/**
 * Hook to access RadioGroup context
 * @throws Error if used outside RadioGroup
 */
export function useRadioGroupContext(): RadioGroupContextValue {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroup subcomponents must be used inside RadioGroup');
  }
  return context;
}
