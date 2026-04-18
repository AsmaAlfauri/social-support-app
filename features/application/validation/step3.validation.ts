export type Step3Data = {
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
};

export function validateStep3(data: Step3Data) {
  const errors: Partial<Record<keyof Step3Data, string>> = {};

  if (!data.financialSituation || data.financialSituation.trim().length < 20) {
    errors.financialSituation =
      "Please describe your financial situation (min 20 characters)";
  }

  if (
    !data.employmentCircumstances ||
    data.employmentCircumstances.trim().length < 20
  ) {
    errors.employmentCircumstances =
      "Please describe your employment circumstances (min 20 characters)";
  }

  if (!data.reasonForApplying || data.reasonForApplying.trim().length < 20) {
    errors.reasonForApplying =
      "Please explain your reason for applying (min 20 characters)";
  }

  return errors;
}