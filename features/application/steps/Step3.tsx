"use client";

import { useForm } from "react-hook-form";
import { useWizard } from "@/store/wizard.context";
import { useState } from "react";
import { generateHelpText } from "@/services/ai";
import { translations } from "@/lib/translations";

type FormData = {
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
};

export default function Step3() {
  const { nextStep, data, setData, setSubmitted, language } = useWizard();
  const t = translations[language];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: data,
  });

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editableText, setEditableText] = useState("");

  const onSubmit = async (formData: FormData) => {
    setData(formData);
    await new Promise((r) => setTimeout(r, 800));

    setSubmitted(true);
    nextStep();
  };

  const handleAI = async () => {
    setLoading(true);

    try {
      const text = await generateHelpText("financial hardship");
      setEditableText(text);
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* AI */}
      <button
        type="button"
        onClick={handleAI}
        disabled={loading}
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded"
      >
        {loading ? t.generating : t.helpMeWrite}
      </button>

      {/* POPUP */}
      {showPopup && (
        <div className="absolute top-0 left-0 w-full bg-white border p-4 rounded shadow z-10">
          {/* TEXT AREA (preview/edit) */}
          <textarea
            value={editableText}
            onChange={(e) => setEditableText(e.target.value)}
            className="w-full border p-2 h-32 mb-3"
          />

          {/* ACTIONS */}
          <div className="flex gap-2">
            {/* ACCEPT */}
            <button
              type="button"
              onClick={() => {
                setValue("financialSituation", editableText, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
                setShowPopup(false);
              }}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              {t.accept}
            </button>

            {/* EDIT */}
            <button
              type="button"
              onClick={() => {
                const el = document.querySelector(
                  "textarea",
                ) as HTMLTextAreaElement | null;

                el?.focus();
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              {t.edit}
            </button>

            {/* DISCARD */}
            <button
              type="button"
              onClick={() => {
                setEditableText("");
                setShowPopup(false);
              }}
              className="px-3 py-1 bg-gray-400 text-white rounded"
            >
              {t.discard}
            </button>
          </div>
        </div>
      )}
      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-semibold mb-4">
          {language === "ar" ? "وصف الحالة" : "Situation Description"}
        </h3>

        <textarea
          {...register("financialSituation", { required: true })}
          className="border p-2 w-full mb-2"
          placeholder={
            language === "ar" ? "الوضع المالي" : "Financial Situation"
          }
        />

        <textarea
          {...register("employmentCircumstances", { required: true })}
          className="border p-2 w-full mb-2"
        />

        <textarea
          {...register("reasonForApplying", { required: true })}
          className="border p-2 w-full mb-2"
        />

        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded mt-4">
          {t.submit}
        </button>
      </form>
    </div>
  );
}
