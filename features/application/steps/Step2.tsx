"use client";

import { useForm } from "react-hook-form";
import { useWizard } from "@/store/wizard.context";
import { translations } from "@/lib/translations";

type FormData = {
  income: string;
  employmentStatus: string;
  housingStatus: string;
};

export default function Step2() {
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
        {language === "ar" ? "المعلومات المالية" : "Financial Information"}
      </h3>

      {/* INCOME */}
      <div>
        <label className="text-sm mb-1 block">
          {language === "ar" ? "الدخل الشهري" : "Monthly Income"}
        </label>

        <input
          {...register("income", { required: true })}
          className={inputClass}
        />

        {errors.income && (
          <p className="text-red-500 text-sm mt-1">
            {language === "ar" ? "مطلوب" : "Required"}
          </p>
        )}
      </div>

      {/* EMPLOYMENT */}
      <div>
        <label className="text-sm mb-1 block">
          {language === "ar" ? "حالة العمل" : "Employment Status"}
        </label>

        <input
          {...register("employmentStatus", { required: true })}
          className={inputClass}
        />

        {errors.employmentStatus && (
          <p className="text-red-500 text-sm mt-1">
            {language === "ar" ? "مطلوب" : "Required"}
          </p>
        )}
      </div>

      {/* HOUSING */}
      <div>
        <label className="text-sm mb-1 block">
          {language === "ar" ? "السكن" : "Housing Status"}
        </label>

        <input
          {...register("housingStatus", { required: true })}
          className={inputClass}
        />

        {errors.housingStatus && (
          <p className="text-red-500 text-sm mt-1">
            {language === "ar" ? "مطلوب" : "Required"}
          </p>
        )}
      </div>

      <button className="w-full py-3 bg-blue-600 text-white rounded-lg active:scale-[0.99] transition">
        {language === "ar" ? "التالي" : "Next"}
      </button>
    </form>
  );
}