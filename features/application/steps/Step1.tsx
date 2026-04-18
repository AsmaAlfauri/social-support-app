"use client";

import { useWizard } from "@/store/wizard.context";
import Input from "@/ui/Input";
import countryList from "react-select-country-list";
import { useEffect, useState } from "react";
import { useT } from "@/i18n/useT";

/* ================= STEP 1 ================= */

export default function Step1() {
  const { data, updateField, errors } = useWizard();
  const t = useT();

  const [countries, setCountries] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    setCountries(countryList().getData());
  }, []);

  return (
    <div className="space-y-8">

      {/* ── PERSONAL INFO ── */}
      <div>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="text-blue-600">👤</div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              {t("personalInfo")}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {t("fillDetails")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Input
            label={t("fullName")}
            value={data.name || ""}
            onChange={(e) => updateField("name", e.target.value)}
            error={errors["name"]}
          />

          <Input
            label={t("nationalId")}
            value={data.emiratesId || ""}
            onChange={(e) =>
              updateField(
                "emiratesId",
                e.target.value.replace(/\D/g, "")
              )
            }
            error={errors["emiratesId"]}
          />

          <Input
            label={t("dob")}
            type="date"
            value={data.dob || ""}
            onChange={(e) => updateField("dob", e.target.value)}
            error={errors["dob"]}
          />

          <select
            value={data.gender || ""}
            onChange={(e) => updateField("gender", e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">{t("selectGender")}</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

        </div>
      </div>

      {/* ── ADDRESS ── */}
      <div>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="text-blue-600">🏠</div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              {t("address")}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Input
            label={t("address")}
            value={data.address || ""}
            onChange={(e) => updateField("address", e.target.value)}
            error={errors["address"]}
          />

          <select
            value={data.country || ""}
            onChange={(e) => updateField("country", e.target.value)}
          >
            <option value="">{t("selectCountry")}</option>
            {countries.map((c) => (
              <option key={c.value} value={c.label}>
                {c.label}
              </option>
            ))}
          </select>

          <Input
            label={t("city")}
            value={data.city || ""}
            onChange={(e) => updateField("city", e.target.value)}
            error={errors["city"]}
          />

          <Input
            label={t("state")}
            value={data.state || ""}
            onChange={(e) => updateField("state", e.target.value)}
            error={errors["state"]}
          />

        </div>
      </div>

      {/* ── CONTACT ── */}
      <div>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="text-blue-600">📞</div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              {t("contact")}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Input
            label={t("phone")}
            value={data.phone || ""}
            onChange={(e) =>
              updateField(
                "phone",
                e.target.value.replace(/[^\d+]/g, "")
              )
            }
            error={errors["phone"]}
          />

          <Input
            label={t("email")}
            value={data.email || ""}
            onChange={(e) => updateField("email", e.target.value)}
            error={errors["email"]}
          />

        </div>
      </div>

    </div>
  );
}