"use client";

import { useWizard } from "@/store/wizard.context";
import Input from "@/ui/Input";
import countryList from "react-select-country-list";
import { useEffect, useState } from "react";
import { useT } from "@/i18n/useT";

/* ================= SELECT COMPONENT ================= */
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
        {/* CHEVRON */}
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

/* ================= SECTION HEADER ================= */
function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
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
  user: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  id: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
    </svg>
  ),
  calendar: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  gender: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
    </svg>
  ),
  location: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  globe: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
    </svg>
  ),
  phone: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
    </svg>
  ),
  email: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  home: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
};

/* ================= STEP 1 ================= */
export default function Step1() {
  const { data, updateField, errors } = useWizard();
  const t = useT();
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    setCountries(countryList().getData());
  }, []);

  return (
    <div className="space-y-8">

      {/* ── PERSONAL INFO ── */}
      <div>
        <SectionHeader
          icon={icons.user}
          title={t("personalInfo")}
          subtitle={t("fillDetails")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Input
            label={t("fullName")}
            required
            placeholder={t("enterFullName")}
            value={data.name || ""}
            onChange={(e) => updateField("name", e.target.value)}
            error={errors.name}
            icon={icons.user}
          />

          <Input
            label={t("nationalId")}
            required
            placeholder={t("enterNationalId")}
            value={data.emiratesId || ""}
            onChange={(e) => updateField("emiratesId", e.target.value.replace(/\D/g, ""))}
            inputMode="numeric"
            error={errors.emiratesId}
            icon={icons.id}
          />

          <Input
            label={t("dob")}
            type="date"
            value={data.dob || ""}
            onChange={(e) => updateField("dob", e.target.value)}
            error={errors.dob}
            icon={icons.calendar}
          />

          <Select
            label={t("gender")}
            value={data.gender || ""}
            onChange={(e) => updateField("gender", e.target.value)}
            error={errors.gender}
            icon={icons.gender}
          >
            <option value="">{t("selectGender")}</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>

        </div>
      </div>

      {/* ── ADDRESS ── */}
      <div>
        <SectionHeader icon={icons.home} title={t("address")} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Input
            label={t("address")}
            placeholder={t("address")}
            value={data.address || ""}
            onChange={(e) => updateField("address", e.target.value)}
            error={errors.address}
            icon={icons.location}
          />

          <Select
            label={t("country")}
            value={data.country || ""}
            onChange={(e) => updateField("country", e.target.value)}
            error={errors.country}
            icon={icons.globe}
          >
            <option value="">{t("selectCountry")}</option>
            {countries.map((c: any) => (
              <option key={c.value} value={c.label}>{c.label}</option>
            ))}
          </Select>

          <Input
            label={t("city")}
            value={data.city || ""}
            onChange={(e) => updateField("city", e.target.value)}
            error={errors.city}
            icon={icons.location}
          />

          <Input
            label={t("state")}
            value={data.state || ""}
            onChange={(e) => updateField("state", e.target.value)}
            error={errors.state}
            icon={icons.location}
          />

        </div>
      </div>

      {/* ── CONTACT ── */}
      <div>
        <SectionHeader icon={icons.phone} title={t("contact")} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Input
            label={t("phone")}
            placeholder="+971 XX XXX XXXX"
            value={data.phone || ""}
            onChange={(e) => updateField("phone", e.target.value.replace(/[^\d+]/g, ""))}
            inputMode="tel"
            error={errors.phone}
            icon={icons.phone}
          />

          <Input
            label={t("email")}
            placeholder="example@email.com"
            value={data.email || ""}
            onChange={(e) => updateField("email", e.target.value)}
            error={errors.email}
            icon={icons.email}
          />

        </div>
      </div>

    </div>
  );
}