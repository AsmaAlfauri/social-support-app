"use client";

import { useForm } from "react-hook-form";
import { useWizard } from "@/store/wizard.context";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useMemo, useState } from "react";

type FormData = {
  name: string;
  emiratesId: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
};

export default function Step1() {
  const { setData, nextStep, language } = useWizard();
  const isArabic = language === "ar";

  const countries = useMemo(() => countryList().getData(), []);
  const [country, setCountry] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  /* =========================
     UAE EMIRATES ID FORMAT
  ========================= */
  const formatEmiratesId = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 15);

    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 7);
    const part3 = digits.slice(7, 14);
    const part4 = digits.slice(14, 15);

    let result = part1;
    if (part2) result += "-" + part2;
    if (part3) result += "-" + part3;
    if (part4) result += "-" + part4;

    return result;
  };

  const handleEmiratesChange = (e: any) => {
    setValue("emiratesId", formatEmiratesId(e.target.value));
  };

  /* =========================
     PHONE (NUMBERS ONLY - FIXED)
  ========================= */
  const handlePhoneChange = (e: any) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 9);
    setValue("phone", digits);
  };

  const onSubmit = (data: FormData) => {
    setData({ ...data, country: country?.label || "" });
    nextStep();
  };

  /* =========================
     UI INPUT STYLE (UNIFIED)
  ========================= */
  const inputClass =
    "w-full h-[48px] px-4 border border-gray-200 rounded-xl text-sm outline-none " +
    "focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white";

  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      {/* HEADER */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-gray-900">
          {isArabic ? "المعلومات الشخصية" : "Personal Information"}
        </h2>
        <p className="text-sm text-gray-500">
          {isArabic
            ? "أدخل بياناتك بدقة لإكمال الطلب"
            : "Enter your details to continue"}
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* NAME */}
        <div>
          <input
            {...register("name", { required: true, minLength: 3 })}
            placeholder={isArabic ? "الاسم الكامل" : "Full Name"}
            className={inputClass}
          />
          {errors.name && <p className={errorClass}>Minimum 3 characters</p>}
        </div>

        {/* EMIRATES ID */}
        <div>
          <input
            {...register("emiratesId", {
              required: true,
              pattern: /^784-\d{4}-\d{7}-\d$/,
            })}
            onChange={handleEmiratesChange}
            placeholder="784-XXXX-XXXXXXX-X"
            className={inputClass}
          />
          {errors.emiratesId && (
            <p className={errorClass}>Invalid Emirates ID</p>
          )}
        </div>

        {/* DOB */}
        <input
          type="date"
          {...register("dob", { required: true })}
          className={inputClass}
        />

        {/* GENDER */}
        <select
          {...register("gender", { required: true })}
          className={inputClass}
        >
          <option value="">
            {isArabic ? "اختر الجنس" : "Select Gender"}
          </option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      {/* ADDRESS */}
      <div className="space-y-4">

        <input
          {...register("address", { required: true, minLength: 10 })}
          placeholder={isArabic ? "العنوان الكامل" : "Full Address"}
          className={inputClass}
        />
        {errors.address && (
          <p className={errorClass}>Address too short</p>
        )}

        {/* COUNTRY */}
        <div>
          <Select
            options={countries}
            value={country}
            onChange={setCountry}
            placeholder={isArabic ? "اختر الدولة" : "Select Country"}
            className="text-sm"
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: "#e5e7eb",
                borderRadius: "12px",
                minHeight: "48px",
                boxShadow: state.isFocused
                  ? "0 0 0 2px rgba(59,130,246,0.2)"
                  : "none",
              }),
            }}
          />
        </div>

        {/* CITY / STATE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            {...register("city", { required: true })}
            placeholder={isArabic ? "المدينة" : "City"}
            className={inputClass}
          />

          <input
            {...register("state", { required: true })}
            placeholder={isArabic ? "المنطقة" : "State"}
            className={inputClass}
          />
        </div>
      </div>

      {/* CONTACT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          {...register("phone", {
            required: true,
            minLength: 7,
            maxLength: 9,
          })}
          onChange={handlePhoneChange}
          placeholder="Phone (digits only)"
          inputMode="numeric"
          className={inputClass}
        />

        <input
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+\.\S+$/,
          })}
          placeholder="Email"
          className={inputClass}
        />
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl
                   hover:bg-blue-700 transition"
      >
        {isArabic ? "التالي" : "Continue"}
      </button>
    </form>
  );
}