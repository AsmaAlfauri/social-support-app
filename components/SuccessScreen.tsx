"use client";

import { useWizard } from "@/store/wizard.context";
import { translations } from "@/lib/translations";

export default function SuccessScreen() {
  const { reset, language } = useWizard();
  const t = translations[language];

  return (
    <div
      role="status"
      aria-live="polite"
      className="text-center space-y-4 py-10"
    >
      <div className="text-5xl">🎉</div>

      <h2 className="text-xl font-bold">
        {t.success}
      </h2>

      <p className="text-gray-500 text-sm">
        Your application has been submitted successfully.
      </p>

      <button
        onClick={reset}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Start New Application
      </button>
    </div>
  );
}