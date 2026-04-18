"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { validateStep } from "@/features/application/validation";

/* ================= TYPES ================= */

export type WizardData = Record<string, string>;

export type Errors = Record<string, string>;

type WizardContextType = {
  step: number;
  data: WizardData;
  errors: Errors;
  language: "en" | "ar";

  setData: (data: WizardData) => void;
  updateField: (key: string, value: string) => void;

  nextStep: () => boolean;
  prevStep: () => void;

  setError: (key: string, message: string) => void;
  clearErrors: () => void;

  toggleLanguage: () => void;
  reset: () => void;
};

/* ================= CONTEXT ================= */

const WizardContext = createContext<WizardContextType | null>(null);

/* ================= PROVIDER ================= */

export function WizardProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [data, setDataState] = useState<WizardData>({});
  const [errors, setErrors] = useState<Errors>({});
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  /* ================= LOAD ================= */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("wizard");
      if (saved) {
        const parsed = JSON.parse(saved);
        setDataState(parsed.data || {});
        setStep(parsed.step || 1);
      }
    } catch {
      localStorage.removeItem("wizard");
    }
  }, []);

  /* ================= SAVE ================= */
  useEffect(() => {
    localStorage.setItem("wizard", JSON.stringify({ data, step }));
  }, [data, step]);

  /* ================= UPDATE FIELD ================= */
  const updateField = (key: string, value: string) => {
    const newData = {
      ...data,
      [key]: value,
    };

    setDataState(newData);

    setTouched((prev) => ({
      ...prev,
      [key]: true,
    }));

    const allErrors = validateStep(step, newData);

    setErrors((prev) => {
      const copy: Errors = { ...prev };

      const errorKey = key as keyof typeof allErrors;

      if (!allErrors[errorKey]) {
        delete copy[key];
      } else {
        copy[key] = allErrors[errorKey];
      }

      return copy;
    });
  };

  /* ================= SET DATA ================= */
  const setData = (newData: WizardData) => {
    setDataState((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  /* ================= NEXT STEP ================= */
  const nextStep = () => {
    const result = validateStep(step, data);

    setErrors(result);

    const allTouched = Object.keys(result).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);

    setTouched((prev) => ({
      ...prev,
      ...allTouched,
    }));

    if (Object.keys(result).length > 0) return false;

    setStep((s) => Math.min(s + 1, 3));
    setTouched({});
    setErrors({});

    return true;
  };

  /* ================= PREV STEP ================= */
  const prevStep = () => {
    setErrors({});
    setTouched({});
    setStep((s) => Math.max(s - 1, 1));
  };

  /* ================= ERROR HANDLING ================= */
  const setError = (key: string, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [key]: message,
    }));
  };

  const clearErrors = () => setErrors({});

  /* ================= LANGUAGE ================= */
  const toggleLanguage = () => {
    setLanguage((p) => (p === "en" ? "ar" : "en"));
  };

  /* ================= RESET ================= */
  const reset = () => {
    setStep(1);
    setDataState({});
    setErrors({});
    setTouched({});
    localStorage.removeItem("wizard");
  };

  return (
    <WizardContext.Provider
      value={{
        step,
        data,
        errors,
        language,
        setData,
        updateField,
        nextStep,
        prevStep,
        setError,
        clearErrors,
        toggleLanguage,
        reset,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

/* ================= HOOK ================= */

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used inside provider");
  return ctx;
}