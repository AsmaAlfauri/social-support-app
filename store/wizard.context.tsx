"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type WizardContextType = {
  step: number;
  data: Record<string, any>;
  submitted: boolean;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  setData: (data: Record<string, any>) => void;

  setSubmitted: (value: boolean) => void;

  reset: () => void;
};

const WizardContext = createContext<WizardContextType | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [data, setDataState] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  // LOAD
  useEffect(() => {
    const saved = localStorage.getItem("wizard-state");
    if (saved) {
      const parsed = JSON.parse(saved);
      setStep(parsed.step || 1);
      setDataState(parsed.data || {});
      setSubmitted(parsed.submitted || false);
    }
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem(
      "wizard-state",
      JSON.stringify({ step, data, submitted }),
    );
  }, [step, data, submitted]);

  const nextStep = () => {
    setStep((s) => Math.min(s + 1, 3));
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  const setData = (newData: Record<string, any>) => {
    setDataState((prev) => ({ ...prev, ...newData }));
  };

  const reset = () => {
    setStep(1);
    setDataState({});
    setSubmitted(false);
    localStorage.removeItem("wizard-state");
  };

  return (
    <WizardContext.Provider
      value={{
        step,
        data,
        submitted,
        setStep,
        nextStep,
        prevStep,
        setData,
        setSubmitted,
        reset,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used inside provider");
  return ctx;
}