"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type WizardContextType = {
  step: number;
  data: Record<string, any>;
  submitted: boolean;
  language: "en" | "ar";

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  setData: (data: Record<string, any>) => void;
  setSubmitted: (value: boolean) => void;

  toggleLanguage: () => void;
  reset: () => void;

  canAccessStep: (step: number) => boolean;
  setStepSafe: (step: number) => void;
};

const WizardContext = createContext<WizardContextType | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [data, setDataState] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");

  useEffect(() => {
    const saved = localStorage.getItem("wizard-state");

    if (saved) {
      const parsed = JSON.parse(saved);
      setStep(parsed.step || 1);
      setDataState(parsed.data || {});
      setSubmitted(parsed.submitted || false);
      setLanguage(parsed.language || "en");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "wizard-state",
      JSON.stringify({ step, data, submitted, language })
    );
  }, [step, data, submitted, language]);

  const canAccessStep = (target: number) => {
    if (submitted) return false;

    if (target === 1) return true;
    if (target === 2) return !!data.name && !!data.email;
    if (target === 3) return !!data.income;

    return false;
  };

  const setStepSafe = (target: number) => {
    if (canAccessStep(target)) setStep(target);
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const setData = (newData: Record<string, any>) => {
    setDataState((prev) => ({ ...prev, ...newData }));
  };

  const reset = () => {
    setStep(1);
    setDataState({});
    setSubmitted(false);
    localStorage.removeItem("wizard-state");
  };

  const toggleLanguage = () =>
    setLanguage((p) => (p === "en" ? "ar" : "en"));

  return (
    <WizardContext.Provider
      value={{
        step,
        data,
        submitted,
        language,
        setStep,
        setStepSafe,
        nextStep,
        prevStep,
        setData,
        setSubmitted,
        reset,
        toggleLanguage,
        canAccessStep,
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