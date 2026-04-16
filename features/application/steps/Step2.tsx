import { useForm } from "react-hook-form";
import { useWizard } from "@/store/wizard.context";

type FormData = {
  income: string;
  employmentStatus: string;
  housingStatus: string;
};

export default function Step2() {
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
      <h3 className="font-semibold mb-4">Financial Information</h3>

      <input
        {...register("income", { required: "Income is required" })}
        className="border p-2 w-full mb-2"
        placeholder="Monthly Income"
      />
      {errors.income && (
        <p className="text-red-500 text-sm mb-2">{errors.income.message}</p>
      )}

      <input
        {...register("employmentStatus", {
          required: "Employment status is required",
        })}
        className="border p-2 w-full mb-2"
        placeholder="Employment Status"
      />
      {errors.employmentStatus && (
        <p className="text-red-500 text-sm mb-2">
          {errors.employmentStatus.message}
        </p>
      )}

      <input
        {...register("housingStatus", {
          required: "Housing status is required",
        })}
        className="border p-2 w-full mb-2"
        placeholder="Housing Status"
      />
      {errors.housingStatus && (
        <p className="text-red-500 text-sm mb-2">
          {errors.housingStatus.message}
        </p>
      )}

      <div className="pt-4">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </form>
  );
}
