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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="font-semibold mb-4">
        {language === "ar" ? "المعلومات الشخصية" : "Personal Information"}
      </h3>

      <input
        {...register("name", { required: "Required" })}
        placeholder={language === "ar" ? "الاسم" : "Name"}
        className="border p-2 w-full mb-2"
      />
      {errors.name && <p className="text-red-500 text-sm">Required</p>}

      <input
        {...register("nationalId", { required: "Required" })}
        placeholder={language === "ar" ? "الرقم الوطني" : "National ID"}
        className="border p-2 w-full mb-2"
      />
      {errors.nationalId && (
        <p className="text-red-500 text-sm">Required</p>
      )}

      <input
        {...register("email", {
          required: "Required",
          pattern: { value: /\S+@\S+\.\S+/, message: "Invalid" },
        })}
        placeholder="Email"
        className="border p-2 w-full mb-2"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded">
        Next
      </button>
    </form>
  );
}