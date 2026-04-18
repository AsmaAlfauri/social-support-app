"use client";

import { useWizard } from "@/store/wizard.context";
import { steps } from "@/features/application/steps";
import { useT } from "@/i18n/useT";

export default function ProgressBar() {
  const { step } = useWizard();
  const t = useT();

  return (
    <div className="space-y-3 w-full">

      {/* STEP CIRCLES */}
      <div className="flex items-start justify-between w-full">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-start flex-1">

            {/* CIRCLE + LABEL */}
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300
                ${step > s.id
                  ? "bg-blue-600 text-white"
                  : step === s.id
                  ? "bg-blue-600 text-white ring-4 ring-blue-100"
                  : "bg-gray-100 text-gray-400 border border-gray-200"
                }
              `}>
                {step > s.id ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : s.id}
              </div>

              <span className={`text-xs font-medium whitespace-nowrap transition-colors duration-300 ${
                step === s.id ? "text-blue-600" : step > s.id ? "text-gray-400" : "text-gray-300"
              }`}>
                {t(`wizard.titles.${s.id}`)}
              </span>
            </div>

            {/* CONNECTOR */}
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px mt-4 mx-3 transition-all duration-500 ${
                step > s.id ? "bg-blue-600" : "bg-gray-200"
              }`} />
            )}

          </div>
        ))}
      </div>

    </div>
  );
}