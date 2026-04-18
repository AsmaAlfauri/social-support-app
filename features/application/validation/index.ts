import { validateStep1 } from "./step1.validation";
import { validateStep2 } from "./step2.validation";
import { validateStep3 } from "./step3.validation";

export const validateStep = (step: number, data: any) => {
  switch (step) {
    case 1:
      return validateStep1(data);
    case 2:
      return validateStep2(data);
    case 3:
      return validateStep3(data);
    default:
      return {};
  }
};