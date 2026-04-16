import { useForm } from "react-hook-form";
import { useWizard } from "@/store/wizard.context";

type FormData = {
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
};

export default function Step3() {
  const { data, setData } = useWizard();

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: data,
  });

  const onSubmit = (formData: FormData) => {
    setData(formData);
  };

  return (
    <form onBlur={handleSubmit(onSubmit)}>
      <h3 className="font-semibold mb-4">Situation Description</h3>

      <textarea
        {...register("financialSituation")}
        className="border p-2 w-full mb-2"
        placeholder="Current Financial Situation"
      />

      <textarea
        {...register("employmentCircumstances")}
        className="border p-2 w-full mb-2"
        placeholder="Employment Circumstances"
      />

      <textarea
        {...register("reasonForApplying")}
        className="border p-2 w-full mb-2"
        placeholder="Reason for Applying"
      />
    </form>
  );
}