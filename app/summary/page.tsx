"use client";

import { useWizard } from "@/store/wizard.context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useT } from "@/i18n/useT";

export default function SummaryPage() {
  const { data, reset } = useWizard();
  const router = useRouter();
  const t = useT();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "failed">("idle");
  const [refNumber] = useState(() => Math.floor(100000 + Math.random() * 900000));
  const [confirmReset, setConfirmReset] = useState(false);

  /* ================= PROTECTION ================= */
  useEffect(() => {
    if (!data || Object.keys(data).length < 3) {
      router.replace("/");
    }
  }, [data]);

  /* ================= SECTIONS ================= */
  const sections = [
    {
      title: t("summary.sections.personal"),
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      fields: {
        name: t("summary.fields.name"),
        emiratesId: t("summary.fields.emiratesId"),
        dob: t("summary.fields.dob"),
        gender: t("summary.fields.gender"),
        address: t("summary.fields.address"),
        city: t("summary.fields.city"),
        state: t("summary.fields.state"),
        country: t("summary.fields.country"),
        phone: t("summary.fields.phone"),
        email: t("summary.fields.email"),
      },
    },
    {
      title: t("summary.sections.family"),
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      fields: {
        maritalStatus: t("summary.fields.maritalStatus"),
        dependents: t("summary.fields.dependents"),
        employmentStatus: t("summary.fields.employmentStatus"),
        income: t("summary.fields.income"),
        housingStatus: t("summary.fields.housingStatus"),
      },
    },
    {
      title: t("summary.sections.situation"),
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      fields: {
        financialSituation: t("summary.fields.financialSituation"),
        employmentCircumstances: t("summary.fields.employmentCircumstances"),
        reasonForApplying: t("summary.fields.reasonForApplying"),
      },
    },
  ];

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1500));
      setStatus("success");
    } catch {
      setStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  const handleNewApplication = () => {
    reset();
    router.push("/");
  };

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000);
      return;
    }
    reset();
    router.push("/");
  };

  if (!data || Object.keys(data).length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

      {/* TITLE */}
      <div className="text-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
          {t("summary.finalStep")}
        </p>
        <h1 className="text-2xl font-bold text-gray-900">{t("summary.title")}</h1>
        <p className="text-sm text-gray-500 mt-1">{t("summary.subtitle")}</p>
      </div>

      {/* SECTIONS */}
      {sections.map((section) => {
        const hasData = Object.keys(section.fields).some(
          (key) => data[key] !== undefined && data[key] !== ""
        );
        if (!hasData) return null;

        return (
          <div key={section.title} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                {section.icon}
              </div>
              <h2 className="text-sm font-semibold text-gray-700">{section.title}</h2>
            </div>

            <div className="divide-y divide-gray-50">
              {Object.entries(section.fields).map(([key, label]) => {
                const value = data[key];
                if (value === undefined || value === "") return null;
                const isLong = String(value).length > 80;

                return (
                  <div key={key} className={`px-6 py-4 ${isLong ? "flex flex-col gap-2" : "flex justify-between items-start gap-4"}`}>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide whitespace-nowrap">
                      {label}
                    </span>
                    <span className={`text-sm text-gray-900 ${isLong ? "leading-relaxed" : "text-end"}`}>
                      {String(value)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2.5 px-6 rounded-xl text-sm font-semibold hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {t("summary.submitting")}
          </>
        ) : (
          <>
            {t("buttons.submit")}
            <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </>
        )}
      </button>

      {/* RESET */}
      <div className="flex justify-center pt-2">
        <button
          onClick={handleReset}
          className={`text-xs px-4 py-2 rounded-lg transition ${
            confirmReset
              ? "bg-red-50 text-red-500 hover:bg-red-100"
              : "text-gray-300 hover:text-gray-500 hover:bg-gray-100"
          }`}
        >
          {confirmReset ? t("summary.resetConfirm") : t("summary.resetLabel")}
        </button>
      </div>

      {/* SUCCESS POPUP */}
      {status === "success" && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{t("summary.success.title")}</h2>
              <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{t("summary.success.desc")}</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-400 mb-0.5">{t("summary.refNumber")}</p>
              <p className="text-base font-bold text-gray-900 tracking-widest">#{refNumber}</p>
            </div>
            <button onClick={handleNewApplication} className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
              {t("summary.success.newApp")}
            </button>
          </div>
        </div>
      )}

      {/* FAILED POPUP */}
      {status === "failed" && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{t("summary.failed.title")}</h2>
              <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{t("summary.failed.desc")}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStatus("idle")} className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
                {t("summary.failed.tryAgain")}
              </button>
              <button onClick={handleNewApplication} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl text-sm font-semibold hover:bg-gray-200 transition">
                {t("summary.failed.newApp")}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}