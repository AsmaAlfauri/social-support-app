"use client";

import { useForm } from "react-hook-form";
import { useWizard } from "@/store/wizard.context";
import { useT } from "@/i18n/useT";
import { validateStep2 } from "@/features/application/validation/step2.validation";

type FormData = {
  maritalStatus: string;
  dependents: string;
  employmentStatus: string;
  income: string;
  housingStatus: string;
};

/* ================= SELECT ================= */
function Select({
  label,
  error,
  icon,
  children,
  ...props
}: {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        <select
          {...props}
          className={`
            w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
            text-sm text-gray-900
            focus:border-blue-500 focus:ring-2 focus:ring-blue-100
            outline-none transition appearance-none cursor-pointer
            ${icon ? "pl-10" : ""}
          `}
        >
          {children}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

/* ================= INPUT ================= */
function Field({
  label,
  error,
  icon,
  ...props
}: {
  label: string;
  error?: string;
  icon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`
            w-full px-4 py-3 rounded-xl border border-gray-200 bg-white
            text-sm text-gray-900 placeholder:text-gray-400
            focus:border-blue-500 focus:ring-2 focus:ring-blue-100
            outline-none transition
            ${icon ? "pl-10" : ""}
          `}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

/* ================= SECTION HEADER ================= */
function SectionHeader({ icon, title, subtitle }: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
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
  family: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  heart: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  users: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  briefcase: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  money: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  home: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  finance: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

/* ================= STEP 2 ================= */
export default function Step2() {
  const { nextStep, data,updateField, setData } = useWizard();
  const t = useT();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: data,
  });

  const onSubmit = (formData: FormData) => {
    const validationErrors = validateStep2(formData);

    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([key, value]) => {
        setError(key as any, { message: value });
      });
      return;
    }

    setData(formData);
    nextStep();
  };

  return (
    <form id="step2-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      {/* ── FAMILY INFO ── */}
      <div>
        <SectionHeader
          icon={icons.family}
          title={t("form.maritalStatus")}
          subtitle={t("wizard.descriptions.2")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Select
            label={t("form.maritalStatus")}
            error={errors.maritalStatus?.message}
            icon={icons.heart}
            {...register("maritalStatus")}
          >
            <option value="">{t("form.select")}</option>
            <option value="single">{t("form.maritalOptions.single")}</option>
            <option value="married">{t("form.maritalOptions.married")}</option>
            <option value="divorced">{t("form.maritalOptions.divorced")}</option>
            <option value="widowed">{t("form.maritalOptions.widowed")}</option>
          </Select>

          <Field
            label={t("form.dependents")}
            type="number"
            min={0}
            error={errors.dependents?.message}
            icon={icons.users}
            {...register("dependents")}
            onChange={(e) => updateField("number", e.target.value.replace(/[^\d+]/g, ""))}
          />

        </div>
      </div>

      {/* ── EMPLOYMENT & INCOME ── */}
      <div>
        <SectionHeader icon={icons.briefcase} title={t("form.employmentStatus")} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Select
            label={t("form.employmentStatus")}
            error={errors.employmentStatus?.message}
            icon={icons.briefcase}
            {...register("employmentStatus")}
          >
            <option value="">{t("form.select")}</option>
            <option value="employed">{t("form.employmentOptions.employed")}</option>
            <option value="unemployed">{t("form.employmentOptions.unemployed")}</option>
            <option value="student">{t("form.employmentOptions.student")}</option>
            <option value="retired">{t("form.employmentOptions.retired")}</option>
          </Select>

          <Field
            label={t("form.income")}
            type="number"
            min={0}
            placeholder="0"
            error={errors.income?.message}
            icon={icons.money}
            {...register("income")}
            onChange={(e) => updateField("number", e.target.value)}

          />

        </div>
      </div>

      {/* ── HOUSING ── */}
      <div>
        <SectionHeader icon={icons.home} title={t("form.housingStatus")} />
        <div className="grid grid-cols-1 gap-5">

          <Select
            label={t("form.housingStatus")}
            error={errors.housingStatus?.message}
            icon={icons.home}
            {...register("housingStatus")}
          >
            <option value="">{t("form.select")}</option>
            <option value="owned">{t("form.housingOptions.owned")}</option>
            <option value="rented">{t("form.housingOptions.rented")}</option>
            <option value="family">{t("form.housingOptions.family")}</option>
            <option value="other">{t("form.housingOptions.other")}</option>
          </Select>

        </div>
      </div>

    </form>
  );
}