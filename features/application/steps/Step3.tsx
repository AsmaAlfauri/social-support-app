import { useForm } from "react-hook-form";
import { useWizard } from "@/store/wizard.context";
import { useState } from "react";
import { generateHelpText } from "@/services/ai";

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

  const handleAI = async () => {
  setLoading(true);

  try {
    const text = await generateHelpText(
      "Help me describe financial hardship for social assistance application"
    );

    setSuggestion(text);
    setShowPopup(true);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [showPopup, setShowPopup] = useState(false);
const { setValue } = useForm();
  return (
    <>
<button
  type="button"
  onClick={handleAI}
  className="mb-4 px-4 py-2 bg-purple-600 text-white rounded"
>
  {loading ? "Generating..." : "Help Me Write"}
</button>    
    {showPopup && (
  <div className="border p-4 mt-4 rounded bg-gray-50">
    <p className="mb-3">{suggestion}</p>

    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => {
          setValue("financialSituation", suggestion);
          setShowPopup(false);
        }}
        className="px-3 py-1 bg-green-600 text-white rounded"
      >
        Accept
      </button>

      <button
        type="button"
        onClick={() => setShowPopup(false)}
        className="px-3 py-1 bg-gray-400 text-white rounded"
      >
        Discard
      </button>
    </div>
  </div>
)}

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

      <div className="pt-4">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded"
        >
          Submit
        </button>
      </div>
    </form>

    </>
  );
}
