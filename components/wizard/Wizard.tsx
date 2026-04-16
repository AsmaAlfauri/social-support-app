"use client";

import { useEffect, useState } from "react";
import { useWizard } from "@/store/wizard.context";
import { steps } from "@/features/application/steps";
import { translations } from "@/lib/translations";

export default function Wizard() {
  const {
    step,
    setStepSafe,
    prevStep,
    reset,
    submitted,
    language,
    toggleLanguage,
  } = useWizard();

  const StepComponent = steps.find((s) => s.id === step)?.component;

  const t = translations[language];

  const [saved, setSaved] = useState(false);

  // fake "saved locally" indicator (replaceable later with real debounce save)
  useEffect(() => {
    setSaved(true);

    const timer = setTimeout(() => {
      setSaved(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [step]);

  // SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow p-6 text-center space-y-3">
          <h2 className="text-xl font-bold">
            {language === "ar" ? "تم الإرسال بنجاح" : "Submitted Successfully"}
          </h2>

          <p className="text-gray-600">
            {language === "ar"
              ? "تم استلام طلبك وسيتم مراجعته قريباً"
              : "Your application has been received and is under review"}
          </p>

          <button
            onClick={reset}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {t.reset}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen flex items-center justify-center bg-gray-50 p-4"
    >
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-5 space-y-4">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">{t.title}</h2>

          <div className="flex gap-2">
            <button
              onClick={toggleLanguage}
              className="bg-gray-800 text-white px-3 py-1 rounded"
            >
              {language === "en" ? "AR" : "EN"}
            </button>

            <button
              onClick={reset}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              {t.reset}
            </button>
          </div>
        </div>

        {/* SAVED INDICATOR */}
        {saved && (
          <p className="text-xs text-green-600" aria-live="polite">
            Saved locally
          </p>
        )}

        {/* PROGRESS (CLICKABLE STEPS) */}
        <div className="flex gap-2">
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={() => setStepSafe(s.id)}
              className={`w-8 h-8 rounded-full text-sm transition
                ${
                  step === s.id
                    ? "bg-blue-600 text-white"
                    : step > s.id
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              aria-label={`Go to step ${s.id}`}
            >
              {s.id}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="min-h-[300px]">
          {StepComponent ? <StepComponent /> : null}
        </div>

        {/* BACK */}
        {step > 1 && !submitted && (
          <button
            onClick={prevStep}
            className="w-full bg-gray-200 py-2 rounded"
          >
            {t.back}
          </button>
        )}
      </div>
    </div>
  );
}