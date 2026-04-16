"use client";

import { useWizard } from "@/store/wizard.context";
import { steps } from "@/features/application/steps";

export default function Wizard() {
  const { step, nextStep, prevStep } = useWizard();

  const CurrentStep = steps.find((s) => s.id === step)?.component;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Step Title */}
      <h2 className="text-xl font-bold mb-6">
        {steps.find((s) => s.id === step)?.title}
      </h2>

      {/* Step Content */}
      <div className="border p-6 rounded-lg bg-white shadow">
        {CurrentStep && <CurrentStep />}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Back
        </button>

        <button
          onClick={nextStep}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}