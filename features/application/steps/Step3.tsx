"use client";

import { useForm } from "react-hook-form";
import { useWizard } from "@/store/wizard.context";
import { useState } from "react";
import { generateHelpText } from "@/services/ai";
import { useT } from "@/i18n/useT";
import { validateStep3 } from "@/features/application/validation/step3.validation";
import { useRouter } from "next/navigation";

type FormData = {
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
};

/* ================= SECTION HEADER ================= */
function SectionHeader({ icon, title, subtitle }: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

/* ================= ICONS ================= */
const icons = {
  money: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  briefcase: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  document: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  sparkle: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
};

/* ================= TEXTAREA FIELD ================= */
function TextareaField({
  label,
  error,
  fieldKey,
  placeholder,
  register,
  loadingField,
  onAI,
  aiError,
  t,
}: {
  label: string;
  error?: string;
  fieldKey: keyof FormData;
  placeholder: string;
  register: any;
  loadingField: keyof FormData | null;
  onAI: (field: keyof FormData) => void;
  aiError: string | null;
  t: (key: string) => string;
}) {
  const isLoading = loadingField === fieldKey;

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
        {label}
      </label>

      <textarea
        {...register(fieldKey)}
        placeholder={placeholder}
        className="w-full border border-gray-200 bg-white px-4 py-3 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition min-h-[120px] resize-y"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* AI BUTTON */}
      <button
        type="button"
        onClick={() => onAI(fieldKey)}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            {t("step3.generating")}
          </>
        ) : (
          <>
            {icons.sparkle}
            {t("step3.aiHelp")}
          </>
        )}
      </button>

      {aiError && (
        <p className="text-xs text-red-500">{aiError}</p>
      )}
    </div>
  );
}

/* ================= STEP 3 ================= */
export default function Step3() {
  const { setData, data } = useWizard();
  const t = useT();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: data });

  const [loadingField, setLoadingField] = useState<keyof FormData | null>(null);
  const [popup, setPopup] = useState(false);
  const [aiText, setAiText] = useState("");
  const [activeField, setActiveField] = useState<keyof FormData | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  /* ================= AI ================= */
  const handleAI = async (field: keyof FormData) => {
    setLoadingField(field);
    setAiError(null);

    const userData = getValues();

    const fieldLabels: Record<keyof FormData, string> = {
      financialSituation: "financial situation",
      employmentCircumstances: "employment circumstances",
      reasonForApplying: "reason for applying for social support",
    };

    const prompt = `
You are a professional case writer helping a citizen apply for government social support.
Help the user write a clear, formal, and empathetic description of their "${fieldLabels[field]}".
User's current input: "${userData[field] || "not provided"}"
Context:
- Financial situation: ${userData.financialSituation || "not provided"}
- Employment circumstances: ${userData.employmentCircumstances || "not provided"}
- Reason for applying: ${userData.reasonForApplying || "not provided"}
Write ONLY the description for "${fieldLabels[field]}" in a government-appropriate tone.
Keep it between 3-5 sentences. Do not include any titles or labels.
    `.trim();

    try {
      const res = await generateHelpText(prompt);
      if (res) {
        setAiText(res);
        setActiveField(field);
        setPopup(true);
      } else {
        setAiError("No response received. Please try again.");
      }
    } catch {
      setAiError("Failed to connect to AI. Please try again.");
    } finally {
      setLoadingField(null);
    }
  };

  const applyToField = () => {
    if (!activeField) return;
    setValue(activeField, aiText);
    setPopup(false);
    setAiText("");
  };

  /* ================= SUBMIT ================= */
  const onSubmit = (formData: FormData) => {
    const validationErrors = validateStep3(formData);

    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([key, value]) => {
        setError(key as keyof FormData, { message: value });
      });
      return;
    }

    const merged = { ...data, ...formData };
    setData(formData);
    localStorage.setItem("wizard", JSON.stringify({ data: merged, step: 3 }));
    router.push("/summary");
  };

  const fields: { key: keyof FormData; icon: React.ReactNode; label: string; placeholder: string }[] = [
    {
      key: "financialSituation",
      icon: icons.money,
      label: t("step3.financialSituation"),
      placeholder: "Describe your current financial situation...",
    },
    {
      key: "employmentCircumstances",
      icon: icons.briefcase,
      label: t("step3.employmentCircumstances"),
      placeholder: "Describe your employment circumstances...",
    },
    {
      key: "reasonForApplying",
      icon: icons.document,
      label: t("step3.reasonForApplying"),
      placeholder: "Explain your reason for applying...",
    },
  ];

  return (
    <div className="space-y-6">

      <form id="step3-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {fields.map(({ key, icon, label, placeholder }) => (
          <div key={key}>
            <SectionHeader icon={icon} title={label} />
            <TextareaField
              label={label}
              error={errors[key]?.message}
              fieldKey={key}
              placeholder={placeholder}
              register={register}
              loadingField={loadingField}
              onAI={handleAI}
              aiError={aiError}
              t={t}
            />
          </div>
        ))}
      </form>

      {/* ================= AI POPUP ================= */}
      {popup && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                {icons.sparkle}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{t("step3.aiTitle")}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{t("step3.aiDescription")}</p>
              </div>
            </div>

            {/* BODY */}
            <div className="px-6 py-4">
              <textarea
                value={aiText}
                onChange={(e) => setAiText(e.target.value)}
                className="w-full border border-gray-200 px-4 py-3 rounded-xl min-h-[160px] text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition resize-y"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={applyToField}
                className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition text-sm font-medium"
              >
                {t("buttons.accept")}
              </button>
              <button
                onClick={() => setPopup(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl hover:bg-gray-200 transition text-sm font-medium"
              >
                {t("buttons.discard")}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
