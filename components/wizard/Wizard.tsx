"use client";

import { useWizard } from "@/store/wizard.context";
import { steps } from "@/features/application/steps";

export default function Wizard() {
  const { step, prevStep } = useWizard();

  const CurrentStep = steps.find((s) => s.id === step)?.component;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      {/* HEADER OUTSIDE CARD */}
      <div className="w-full max-w-2xl mb-4">
        <h2 className="text-xl font-bold text-center">
          {steps.find((s) => s.id === step)?.title}
        </h2>

        <p className="text-center text-xs text-gray-500">
          Step {step} of {steps.length}
        </p>
      </div>

      {/* PROGRESS BAR OUTSIDE CARD */}
      <div className="w-full max-w-2xl mb-6">
        <div className="flex items-center">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold
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
      </div>

      {/* CARD */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-6">
        {/* Step Content */}
        <div className="space-y-4">{CurrentStep && <CurrentStep />}</div>

        {/* Back Button */}
        <div className="pt-4">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
