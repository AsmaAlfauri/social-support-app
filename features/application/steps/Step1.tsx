import { useForm } from "react-hook-form";
import { useWizard } from "@/store/wizard.context";

type FormData = {
  name: string;
  nationalId: string;
  email: string;
};

export default function Step1() {
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
      <h3 className="font-semibold mb-4">Personal Information</h3>

      <input
        {...register("name", { required: "Name is required" })}
        className="border p-2 w-full mb-2"
        placeholder="Name"
      />
      {errors.name && (
        <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>
      )}

      <input
        {...register("nationalId", {
          required: "National ID is required",
        })}
        className="border p-2 w-full mb-2"
        placeholder="National ID"
      />
      {errors.nationalId && (
        <p className="text-red-500 text-sm mb-2">{errors.nationalId.message}</p>
      )}

      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email format",
          },
        })}
        className="border p-2 w-full mb-2"
        placeholder="Email"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
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
