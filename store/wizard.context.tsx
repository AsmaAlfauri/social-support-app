"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type WizardContextType = {
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  data: Record<string, any>;
  setData: (data: Record<string, any>) => void;
};

const WizardContext = createContext<WizardContextType | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [data, setDataState] = useState<Record<string, any>>({});

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const setData = (newData: Record<string, any>) => {
    setDataState((prev) => ({ ...prev, ...newData }));
  };

  return (
    <WizardContext.Provider
      value={{ step, setStep, nextStep, prevStep, data, setData }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used inside WizardProvider");
  }
  return context;
}