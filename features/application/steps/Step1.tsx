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
  } = useForm<FormData>({
    mode: "onSubmit",
    criteriaMode: "all",
    shouldFocusError: true,
  });

  /* =========================
     INPUT STYLE
  ========================= */
  const inputClass =
    "w-full h-[48px] px-4 border border-gray-200 rounded-xl text-sm outline-none " +
    "focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white";

  const errorClass = "text-red-500 text-xs mt-1";

  /* =========================
     EMIRATES ID FORMAT
  ========================= */
  const handleEmiratesChange = (e: any) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 15);

    let formatted = digits;
    if (digits.length > 3)
      formatted = digits.slice(0, 3) + "-" + digits.slice(3);
    if (digits.length > 7)
      formatted =
        digits.slice(0, 3) + "-" + digits.slice(3, 7) + "-" + digits.slice(7);

    setValue("emiratesId", formatted, { shouldValidate: true });
  };

  /* =========================
     PHONE FIX (NO BUG)
  ========================= */
  const handlePhoneChange = (e: any) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 9);
    setValue("phone", digits, { shouldValidate: true });
  };

  const onSubmit = (data: FormData) => {
    setData({ ...data, country: country?.label || "" });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold">
          {isArabic ? "المعلومات الشخصية" : "Personal Information"}
        </h2>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* NAME */}
        <div>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
            })}
            placeholder="Full Name"
            className={inputClass}
          />
          {errors.name && (
            <p className={errorClass}>{errors.name.message}</p>
          )}
        </div>

        {/* EMIRATES ID */}
        <div>
          <input
            {...register("emiratesId", {
              required: "Emirates ID required",
              pattern: {
                value: /^784-\d{4}-\d{7}-\d$/,
                message: "Invalid Emirates ID",
              },
            })}
            onChange={handleEmiratesChange}
            placeholder="784-XXXX-XXXXXXX-X"
            className={inputClass}
          />
          {errors.emiratesId && (
            <p className={errorClass}>{errors.emiratesId.message}</p>
          )}
        </div>

        {/* DOB */}
        <input
          type="date"
          {...register("dob", { required: "Date of birth required" })}
          className={inputClass}
        />

        {/* GENDER */}
        <select
          {...register("gender", { required: "Gender required" })}
          className={inputClass}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      {/* ADDRESS */}
      <div className="space-y-4">

        <input
          {...register("address", {
            required: "Address required",
            minLength: {
              value: 10,
              message: "Minimum 10 characters",
            },
          })}
          placeholder="Full Address"
          className={inputClass}
        />
        {errors.address && (
          <p className={errorClass}>{errors.address.message}</p>
        )}

        {/* COUNTRY */}
        <Select
          options={countries}
          value={country}
          onChange={setCountry}
          placeholder="Select Country"
        />

        {/* CITY / STATE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            {...register("city", { required: "City required" })}
            placeholder="City"
            className={inputClass}
          />

          <input
            {...register("state", { required: "State required" })}
            placeholder="State"
            className={inputClass}
          />
        </div>
      </div>

      {/* CONTACT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          {...register("phone", {
            required: "Phone required",
            minLength: { value: 7, message: "Too short" },
          })}
          onChange={handlePhoneChange}
          placeholder="Phone"
          className={inputClass}
        />
        {errors.phone && (
          <p className={errorClass}>{errors.phone.message}</p>
        )}

        <input
          {...register("email", {
            required: "Email required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email",
            },
          })}
          placeholder="Email"
          className={inputClass}
        />
        {errors.email && (
          <p className={errorClass}>{errors.email.message}</p>
        )}
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl"
      >
        Continue
      </button>
    </form>
  );
}