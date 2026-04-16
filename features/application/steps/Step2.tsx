import { useForm } from "react-hook-form";
import { useWizard } from "@/store/wizard.context";

type FormData = {
  income: string;
  employmentStatus: string;
  housingStatus: string;
};

export default function Step2() {
  const { data, setData } = useWizard();

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: data,
  });

  const onSubmit = (formData: FormData) => {
    setData(formData);
  };

  return (
    <form onBlur={handleSubmit(onSubmit)}>
      <h3 className="font-semibold mb-4">Financial Information</h3>

      <input
        {...register("income")}
        className="border p-2 w-full mb-2"
        placeholder="Monthly Income"
      />

      <input
        {...register("employmentStatus")}
        className="border p-2 w-full mb-2"
        placeholder="Employment Status"
      />

      <input
        {...register("housingStatus")}
        className="border p-2 w-full mb-2"
        placeholder="Housing Status"
      />
    </form>
  );
}