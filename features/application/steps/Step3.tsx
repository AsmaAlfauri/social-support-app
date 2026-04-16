import { useForm } from "react-hook-form";
import { useWizard } from "@/store/wizard.context";

type FormData = {
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
};

export default function Step3() {
  const { nextStep, data, setData } = useWizard();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: data,
  });

  const onSubmit = (formData: FormData) => {
    setData(formData);
    nextStep(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="font-semibold mb-4">Situation Description</h3>

      <textarea
        {...register("financialSituation", {
          required: "Financial situation is required",
        })}
        className="border p-2 w-full mb-2"
        placeholder="Current Financial Situation"
      />
      {errors.financialSituation && (
        <p className="text-red-500 text-sm mb-2">
          {errors.financialSituation.message}
        </p>
      )}

      <textarea
        {...register("employmentCircumstances", {
          required: "Employment circumstances is required",
        })}
        className="border p-2 w-full mb-2"
        placeholder="Employment Circumstances"
      />
      {errors.employmentCircumstances && (
        <p className="text-red-500 text-sm mb-2">
          {errors.employmentCircumstances.message}
        </p>
      )}

      <textarea
        {...register("reasonForApplying", {
          required: "Reason for applying is required",
        })}
        className="border p-2 w-full mb-2"
        placeholder="Reason for Applying"
      />
      {errors.reasonForApplying && (
        <p className="text-red-500 text-sm mb-2">
          {errors.reasonForApplying.message}
        </p>
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded mt-4"
      >
        Submit
      </button>
    </form>
  );
}