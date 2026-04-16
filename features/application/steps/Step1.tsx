import { useForm } from "react-hook-form";
import { useWizard } from "@/store/wizard.context";

type FormData = {
  name: string;
  nationalId: string;
  email: string;
};

export default function Step1() {
  const { data, setData } = useWizard();

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: data,
  });

  const onSubmit = (formData: FormData) => {
    setData(formData);
  };

  return (
    <form onBlur={handleSubmit(onSubmit)}>
      <h3 className="font-semibold mb-4">Personal Information</h3>

      <input
        {...register("name")}
        className="border p-2 w-full mb-2"
        placeholder="Name"
      />

      <input
        {...register("nationalId")}
        className="border p-2 w-full mb-2"
        placeholder="National ID"
      />

      <input
        {...register("email")}
        className="border p-2 w-full mb-2"
        placeholder="Email"
      />
    </form>
  );
}