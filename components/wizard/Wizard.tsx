"use client";

import { useWizard } from "@/store/wizard.context";
import { steps } from "@/features/application/steps";
import { translations } from "@/lib/translations";

export default function Wizard() {
  const { step, prevStep, reset, submitted, language, toggleLanguage } =
    useWizard();

  const CurrentStep = steps.find((s) => s.id === step)?.component || null;
  const t = translations[language];

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen flex justify-center items-center p-4 bg-gray-50"
    >
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t.title}</h2>

          <div className="flex gap-2">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 bg-gray-800 text-white rounded"
            >
              {language === "en" ? "AR" : "EN"}
            </button>

            <button
              onClick={reset}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              {t.reset}
            </button>
          </div>
        </div>

        {/* STEP INFO */}
        <p className="text-center text-xs mb-2">
          {t.step} {step} {t.of} {steps.length}
        </p>

        {/* PROGRESS BAR */}
        <div className="flex items-center mb-6">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center flex-1">
              {/* circle */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
        ${
          step === s.id
            ? "bg-blue-600 text-white"
            : step > s.id
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-600"
        }`}
              >
                {s.id}
              </div>

              {/* line */}
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    step > s.id ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div>{CurrentStep && <CurrentStep />}</div>

        {/* BACK */}
        {!submitted && step > 1 && (
          <button
            onClick={prevStep}
            className="w-full mt-4 bg-gray-200 py-2 rounded"
          >
            {t.back}
          </button>
        )}
      </div>
    </div>
  );
}
