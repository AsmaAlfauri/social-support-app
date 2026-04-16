"use client";

import { useWizard } from "@/store/wizard.context";
import { steps } from "@/features/application/steps";

export default function Wizard() {
  const { step, prevStep, reset, submitted } = useWizard();

  const CurrentStep = steps.find((s) => s.id === step)?.component;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {steps.find((s) => s.id === step)?.title}
          </h2>

          <button
            onClick={reset}
            className="text-sm px-3 py-1 bg-red-500 text-white rounded"
          >
            Reset
          </button>
        </div>

        {/* Step indicator */}
        <p className="text-center text-xs text-gray-500 mb-4">
          Step {step} of {steps.length}
        </p>

        {/* Progress */}
        <div className="flex items-center mb-6">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center flex-1">
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

        {/* STEP */}
        <div className="space-y-4">
          {CurrentStep && <CurrentStep />}
        </div>

        {/* BACK BUTTON */}
        {!submitted && step > 1 && (
          <div className="pt-4">
            <button
              onClick={prevStep}
              className="w-full px-4 py-2 bg-gray-200 rounded"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}