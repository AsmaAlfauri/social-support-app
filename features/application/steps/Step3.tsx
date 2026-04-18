"use client";

import { useWizard } from "@/store/wizard.context";
import { useState } from "react";
import { generateHelpText } from "@/services/ai";
import { useT } from "@/i18n/useT";
import { useRouter } from "next/navigation";
import { validateStep3 } from "@/features/application/validation/step3.validation";

type FieldKey = "financialSituation" | "employmentCircumstances" | "reasonForApplying";

/* ================= SECTION HEADER ================= */
function SectionHeader({ icon, title, subtitle }: {
  icon: React.ReactNode; title: string; subtitle?: string;
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
  label, error, fieldKey, placeholder, value, onChange,
  loadingField, onAI, aiError, t,
}: {
  label: string; error?: string; fieldKey: FieldKey; placeholder: string;
  value: string; onChange: (val: string) => void;
  loadingField: FieldKey | null; onAI: (field: FieldKey) => void;
  aiError: string | null; t: (key: string) => string;
}) {
  const isLoading = loadingField === fieldKey;

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 bg-white px-4 py-3 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition min-h-[120px] resize-y"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}

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
          <>{icons.sparkle}{t("step3.aiHelp")}</>
        )}
      </button>

      {aiError && <p className="text-xs text-red-500">{aiError}</p>}
    </div>
  );
}

/* ================= STEP 3 ================= */
export default function Step3() {
  const { data, updateField, errors, setData, setError } = useWizard();
  const t = useT();
  const router = useRouter();

  const [loadingField, setLoadingField] = useState<FieldKey | null>(null);
  const [popup, setPopup] = useState(false);
  const [aiText, setAiText] = useState("");
  const [activeField, setActiveField] = useState<FieldKey | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  /* ================= AI ================= */
const handleAI = async (field: FieldKey) => {
  setLoadingField(field);
  setAiError(null);

  const fieldLabels: Record<FieldKey, string> = {
    financialSituation: "current financial situation",
    employmentCircumstances: "employment circumstances",
    reasonForApplying: "reason for applying for social support",
  };

  const variations = [
    "Focus on the emotional and personal impact of the situation.",
    "Focus on the factual and economic aspects of the situation.",
    "Focus on the family responsibilities and dependents affected.",
    "Focus on the urgency and immediate need for assistance.",
    "Focus on the long-term consequences if support is not provided.",
  ];

  const randomVariation = variations[Math.floor(Math.random() * variations.length)];

  const prompt = `
You are a senior government social welfare case writer with 10+ years of experience preparing official support applications.

Your task is to write a professional, formal, and compelling description of the applicant's "${fieldLabels[field]}" for a government social support application.

--- APPLICANT'S INPUT ---
Field to write: ${fieldLabels[field]}
Current input: "${data[field] || "not provided"}"

--- CONTEXT ---
Financial situation: ${data.financialSituation || "not provided"}
Employment circumstances: ${data.employmentCircumstances || "not provided"}
Reason for applying: ${data.reasonForApplying || "not provided"}

--- WRITING INSTRUCTIONS ---
- Write ONLY the description for "${fieldLabels[field]}"
- ${randomVariation}
- Use formal, government-appropriate language
- Be empathetic but professional
- Write 3-5 sentences
- Do NOT include titles, labels, bullet points, or headers
- Do NOT start with "I" — write in third person or passive voice
- Make it sound authentic and specific, not generic
- If the input is "not provided", create a realistic description based on context
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
    updateField(activeField, aiText); 
    setPopup(false);
    setAiText("");
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      financialSituation: data.financialSituation || "",
      employmentCircumstances: data.employmentCircumstances || "",
      reasonForApplying: data.reasonForApplying || "",
    };

    const validationErrors = validateStep3(formData);

    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([key, msg]) => {
        setError(key, msg);
      });
      return;
    }

    const merged = { ...data, ...formData };
    setData(formData);
    localStorage.setItem("wizard", JSON.stringify({ data: merged, step: 3 }));
    router.push("/summary");
  };

  const fields: { key: FieldKey; icon: React.ReactNode; label: string; placeholder: string }[] = [
    {
      key: "financialSituation",
      icon: icons.money,
      label: t("step3.financialSituation"),
      placeholder: t("step3.financialSituation") + "...",
    },
    {
      key: "employmentCircumstances",
      icon: icons.briefcase,
      label: t("step3.employmentCircumstances"),
      placeholder: t("step3.employmentCircumstances") + "...",
    },
    {
      key: "reasonForApplying",
      icon: icons.document,
      label: t("step3.reasonForApplying"),
      placeholder: t("step3.reasonForApplying") + "...",
    },
  ];

  return (
    <div className="space-y-6">

      <form id="step3-form" onSubmit={handleSubmit} className="space-y-8">
        {fields.map(({ key, icon, label, placeholder }) => (
          <div key={key}>
            <SectionHeader icon={icon} title={label} />
            <TextareaField
              label={label}
              error={errors[key]}      
              fieldKey={key}
              placeholder={placeholder}
              value={data[key] || ""} 
              onChange={(val) => updateField(key, val)}
              loadingField={loadingField}
              onAI={handleAI}
              aiError={activeField === key ? aiError : null}
              t={t}
            />
          </div>
        ))}
      </form>

      {/* AI POPUP */}
      {popup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">

            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                {icons.sparkle}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{t("step3.aiTitle")}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{t("step3.aiDescription")}</p>
              </div>
            </div>

            <div className="px-6 py-4">
              <textarea
                value={aiText}
                onChange={(e) => setAiText(e.target.value)}
                className="w-full border border-gray-200 px-4 py-3 rounded-xl min-h-[160px] text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition resize-y"
              />
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button onClick={applyToField} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition text-sm font-medium">
                {t("buttons.accept")}
              </button>
              <button onClick={() => setPopup(false)} className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl hover:bg-gray-200 transition text-sm font-medium">
                {t("buttons.discard")}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}