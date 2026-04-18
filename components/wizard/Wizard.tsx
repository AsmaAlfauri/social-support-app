"use client";

import { useWizard } from "@/store/wizard.context";
import { steps } from "@/features/application/steps";
import ProgressBar from "./ProgressBar";
import StepActions from "./StepActions";
import { useT } from "@/i18n/useT";

export default function Wizard() {
  const { step } = useWizard();
  const t = useT();

  const ActiveStep = steps.find((s) => s.id === step)?.component;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

      {/* STEP LABEL */}
      <div className="text-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
          {t("wizard.step")} {step} / 3
        </p>
        <h1 className="text-2xl font-bold text-gray-900">
          {t(`wizard.titles.${step}`)}
        </h1>
      </div>

      {/* PROGRESS */}
      <ProgressBar />

      {/* CARD */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        {ActiveStep && <ActiveStep />}
        <StepActions />
      </div>

    </div>
  );
}