"use client";

import { useWizard } from "@/store/wizard.context";
import { useRouter } from "next/navigation";
import { useT } from "@/i18n/useT";

const ChevronLeft = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const SendIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

export default function StepActions() {
  const { step, nextStep, prevStep, reset } = useWizard();
  const router = useRouter();
  const t = useT();

  const handleNext = () => {
    if (step === 2) {
      document
        .getElementById("step2-form")
        ?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
      return;
    }
    if (step === 3) {
      document
        .getElementById("step3-form")
        ?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
      return;
    }
    nextStep();
  };

  const handleBack = () => {
    if (step === 1) {
      reset();
      router.push("/");
      return;
    }
    prevStep();
  };

  const isLast = step === 3;
  const isFirst = step === 1;

  return (
    <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">

      {/* BACK */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 active:scale-[0.98] transition"
      >
        {isFirst ? (
          <>
            <HomeIcon />
            {t("buttons.backHome")}
          </>
        ) : (
          <>
            <ChevronLeft />
            {t("buttons.back")}
          </>
        )}
      </button>

      {/* NEXT / SUBMIT */}
      <button
        onClick={handleNext}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition active:scale-[0.98] ${
          isLast
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isLast ? (
          <>
            {t("buttons.submit")}
            <SendIcon />
          </>
        ) : (
          <>
            {t("buttons.next")}
            <ChevronRight />
          </>
        )}
      </button>

    </div>
  );
}