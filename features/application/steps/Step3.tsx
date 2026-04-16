"use client";

import { useForm } from "react-hook-form";
import { useWizard } from "@/store/wizard.context";
import { useState, useRef, useEffect } from "react";
import { generateHelpText } from "@/services/ai";
import { translations } from "@/lib/translations";

type FormData = {
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
};

export default function Step3() {
  const { setData, setSubmitted, language } = useWizard();
  const t = translations[language];

  const { register, handleSubmit, setValue, getValues } =
    useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPopup(false);
    };

    if (popup) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [popup]);

  const handleAI = async () => {
    setLoading(true);
    setError(null);

    try {
      const userData = getValues();

      const prompt = `
You are a professional social support case worker.

Write ONE professional financial hardship paragraph.

Rules:
- 80–130 words
- Human and realistic
- No placeholders
- No bullet points
- No letter format

User:
Financial: ${userData.financialSituation || "not provided"}
Employment: ${userData.employmentCircumstances || "not provided"}
Reason: ${userData.reasonForApplying || "not provided"}

Return ONLY paragraph.
      `;

      const res = await generateHelpText(prompt);

      if (!res) throw new Error("Empty response");

      setText(res);
      setPopup(true);
    } catch {
      setError(language === "ar"
        ? "فشل توليد النص"
        : "AI generation failed");
    } finally {
      setLoading(false);
    }
  };

  const applyToField = (field: keyof FormData) => {
    setValue(field, text, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: FormData) => {
    setData(data);
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">

      {/* AI BUTTON */}
      <button
        type="button"
        onClick={handleAI}
        disabled={loading}
        aria-busy={loading}
        className="w-full sm:w-auto bg-purple-600 text-white py-3 px-4 rounded-lg disabled:opacity-50"
      >
        {loading ? t.generating : t.helpMeWrite}
      </button>

      {/* ERROR */}
      {error && (
        <p role="alert" className="text-red-500 text-sm">
          {error}
        </p>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <textarea
          {...register("financialSituation", { required: true })}
          className="w-full border p-3 rounded min-h-[110px]"
          placeholder="Financial Situation"
        />

        <textarea
          {...register("employmentCircumstances", { required: true })}
          className="w-full border p-3 rounded min-h-[110px]"
          placeholder="Employment Circumstances"
        />

        <textarea
          {...register("reasonForApplying", { required: true })}
          className="w-full border p-3 rounded min-h-[110px]"
          placeholder="Reason for Applying"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          {t.submit}
        </button>
      </form>

      {/* POPUP */}
      {popup && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            ref={dialogRef}
            className="w-full max-w-lg bg-white rounded-xl p-4 space-y-3"
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border p-3 min-h-[160px] rounded"
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => applyToField("financialSituation")}
                className="flex-1 bg-gray-100 py-2 rounded"
              >
                Financial
              </button>

              <button
                type="button"
                onClick={() => applyToField("employmentCircumstances")}
                className="flex-1 bg-gray-100 py-2 rounded"
              >
                Employment
              </button>

              <button
                type="button"
                onClick={() => applyToField("reasonForApplying")}
                className="flex-1 bg-gray-100 py-2 rounded"
              >
                Reason
              </button>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPopup(false)}
                className="flex-1 bg-green-600 text-white py-2 rounded"
              >
                Accept
              </button>

              <button
                type="button"
                onClick={() => {
                  setPopup(false);
                  setText("");
                }}
                className="flex-1 bg-gray-400 text-white py-2 rounded"
              >
                Discard
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}