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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="font-semibold mb-4">
        {language === "ar" ? "المعلومات المالية" : "Financial Information"}
      </h3>

      <input
        {...register("income", { required: "Required" })}
        placeholder={language === "ar" ? "الدخل الشهري" : "Monthly Income"}
        className="border p-2 w-full mb-2"
      />
      {errors.income && <p className="text-red-500 text-sm">Required</p>}

      <input
        {...register("employmentStatus", { required: "Required" })}
        placeholder={language === "ar" ? "حالة العمل" : "Employment Status"}
        className="border p-2 w-full mb-2"
      />

      <input
        {...register("housingStatus", { required: "Required" })}
        placeholder={language === "ar" ? "السكن" : "Housing Status"}
        className="border p-2 w-full mb-2"
      />

      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded">
        Next
      </button>
    </form>
  );
}