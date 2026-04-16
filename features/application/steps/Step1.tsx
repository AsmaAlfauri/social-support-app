"use client";

import { useForm } from "react-hook-form";
import { useWizard } from "@/store/wizard.context";
import { translations } from "@/lib/translations";

type FormData = {
  name: string;
  nationalId: string;
  email: string;
};

export default function Step1() {
  const { nextStep, data, setData, language } = useWizard();
  const t = translations[language];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: data,
  });

  const onSubmit = (formData: FormData) => {
    setData(formData);
    nextStep();
  };

  const inputClass =
    "w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h3 className="font-semibold text-lg">
        {language === "ar" ? "المعلومات الشخصية" : "Personal Information"}
      </h3>

      {/* NAME */}
      <div>
        <label htmlFor="name" className="text-sm mb-1 block">
          {language === "ar" ? "الاسم الكامل" : "Full Name"}
        </label>

        <input
          id="name"
          {...register("name", { required: true })}
          className={inputClass}
        />

        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {language === "ar" ? "هذا الحقل مطلوب" : "This field is required"}
          </p>
        )}
      </div>

      {/* NATIONAL ID */}
      <div>
        <label htmlFor="nationalId" className="text-sm mb-1 block">
          {language === "ar" ? "الرقم الوطني" : "National ID"}
        </label>

        <input
          id="nationalId"
          {...register("nationalId", { required: true })}
          className={inputClass}
        />

        {errors.nationalId && (
          <p className="text-red-500 text-sm mt-1">
            {language === "ar" ? "هذا الحقل مطلوب" : "Required field"}
          </p>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <label htmlFor="email" className="text-sm mb-1 block">
          {language === "ar" ? "الايميل الشخصي" : "Email"}
        </label>

        <input
          id="email"
          {...register("email", {
            required: true,
            pattern: /\S+@\S+\.\S+/,
          })}
          className={inputClass}
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {language === "ar" ? "بريد غير صحيح" : "Invalid email"}
          </p>
        )}
      </div>

      <button className="w-full py-3 bg-blue-600 text-white rounded-lg active:scale-[0.99] transition">
        {language === "ar" ? "التالي" : "Next"}
      </button>
    </form>
  );
}
