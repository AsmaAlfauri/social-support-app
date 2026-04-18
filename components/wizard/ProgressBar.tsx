"use client";

import { useWizard } from "@/store/wizard.context";
import { steps } from "@/features/application/steps";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProgressBar() {
  const { step, reset } = useWizard();
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);

  const handleReset = () => {
    if (!confirm) {
      setConfirm(true);
      setTimeout(() => setConfirm(false), 3000);
      return;
    }
    reset();
    router.push("/");
  };

  return (
    <div className="space-y-2">

      {/* STEP INDICATORS + RESET */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {steps.map((s) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                step > s.id
                  ? "bg-blue-600 text-white"
                  : step === s.id
                  ? "bg-blue-600 text-white ring-4 ring-blue-100"
                  : "bg-gray-200 text-gray-400"
              }`}>
                {step > s.id ? (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s.id
                )}
              </div>
              {s.id < steps.length && (
                <div className={`w-8 h-px ${step > s.id ? "bg-blue-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* RESET BUTTON */}
        <button
          onClick={handleReset}
          className={`text-xs px-3 py-1.5 rounded-lg transition ${
            confirm
              ? "bg-red-50 text-red-600 hover:bg-red-100"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          }`}
        >
          {confirm ? "Tap again to reset" : "Reset"}
        </button>
      </div>

      {/* PROGRESS BAR */}
      <div className="flex gap-1.5">
        {steps.map((s) => (
          <div key={s.id} className="flex-1 h-1 rounded-full bg-gray-200 overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-500 ${
              step >= s.id ? "bg-blue-600" : "bg-transparent"
            }`} />
          </div>
        ))}
      </div>

    </div>
  );
}