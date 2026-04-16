"use client";

import { useForm } from "react-hook-form";
import { useWizard } from "@/store/wizard.context";
import { useState } from "react";
import { generateHelpText } from "@/services/ai";

type FormData = {
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
};

export default function Step3() {
  const { nextStep, data, setData } = useWizard();

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
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [editableText, setEditableText] = useState("");

  const onSubmit = async (formData: FormData) => {
    setSubmitting(true);

    try {
      setData(formData);

      await new Promise((res) => setTimeout(res, 1500));

      setSubmitted(true);
      nextStep(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // AI HANDLER
  const handleAI = async () => {
    setLoading(true);

    try {
      const text = await generateHelpText(
        "I need help describing financial hardship for a social support application",
      );

      setEditableText(text); // initial value for editing
      setShowPopup(true);
    } catch (err) {
      console.error("AI Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* AI Button */}
      <button
        type="button"
        onClick={handleAI}
        disabled={loading}
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded"
      >
        {loading ? "Generating..." : "Help Me Write"}
      </button>

      {/* POPUP */}
      {showPopup && (
        <div className="absolute top-0 left-0 w-full bg-white border shadow-lg p-4 rounded z-10">
          <h4 className="font-semibold mb-2">AI Suggestion (Edit Allowed)</h4>

          {/* EDITABLE FIELD */}
          <textarea
            value={editableText}
            onChange={(e) => setEditableText(e.target.value)}
            className="w-full border p-2 mb-3 h-32"
          />

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
              Accept
            </button>

            {/* EDIT (optional button — UX explicit) */}
            <button
              type="button"
              onClick={() => {
                // nothing needed — user already edits textarea
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Edit
            </button>

            {/* DISCARD */}
            <button
              type="button"
              onClick={() => {
                setShowPopup(false);
                setEditableText("");
              }}
              className="px-3 py-1 bg-gray-400 text-white rounded"
            >
              Discard
            </button>
          </div>
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-semibold mb-4">Situation Description</h3>

        <textarea
          {...register("financialSituation", {
            required: "Financial situation is required",
          })}
          className="border p-2 w-full mb-2"
          placeholder="Current Financial Situation"
        />
        {errors.financialSituation && (
          <p className="text-red-500 text-sm mb-2">
            {errors.financialSituation.message}
          </p>
        )}

        <textarea
          {...register("employmentCircumstances", {
            required: "Employment circumstances is required",
          })}
          className="border p-2 w-full mb-2"
          placeholder="Employment Circumstances"
        />
        {errors.employmentCircumstances && (
          <p className="text-red-500 text-sm mb-2">
            {errors.employmentCircumstances.message}
          </p>
        )}

        <textarea
          {...register("reasonForApplying", {
            required: "Reason for applying is required",
          })}
          className="border p-2 w-full mb-2"
          placeholder="Reason for Applying"
        />
        {errors.reasonForApplying && (
          <p className="text-red-500 text-sm mb-2">
            {errors.reasonForApplying.message}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded mt-4"
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
      {submitted && (
  <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded text-center">
    <h2 className="text-xl font-bold text-green-700 mb-2">
      Application Submitted Successfully
    </h2>

    <p className="text-sm text-gray-600 mb-4">
      Your application has been received and is under review.
    </p>

    <button
      onClick={() => {
        localStorage.removeItem("wizard-state");
        window.location.reload();
      }}
      className="px-4 py-2 bg-green-600 text-white rounded"
    >
      Start New Application
    </button>
  </div>
)}
    </div>
  );
}
