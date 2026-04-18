export function validateStep2(data: any) {
  const errors: Record<string, string> = {};

  /* ================= MARITAL STATUS ================= */
  const validMarital = ["single", "married", "divorced", "widowed"];

  if (!data.maritalStatus || data.maritalStatus.trim() === "") {
    errors.maritalStatus = "Marital status is required";
  } else if (!validMarital.includes(data.maritalStatus)) {
    errors.maritalStatus = "Please select a valid marital status";
  }

  /* ================= DEPENDENTS ================= */
  if (data.dependents === undefined || data.dependents === "") {
    errors.dependents = "Number of dependents is required";
  } else {
    const dep = Number(data.dependents);
    if (isNaN(dep)) {
      errors.dependents = "Dependents must be a number";
    } else if (!Number.isInteger(dep)) {
      errors.dependents = "Dependents must be a whole number";
    } else if (dep < 0) {
      errors.dependents = "Dependents cannot be negative";
    } else if (dep > 20) {
      errors.dependents = "Please enter a valid number of dependents (max 20)";
    }
  }

  /* ================= EMPLOYMENT STATUS ================= */
  const validEmployment = ["employed", "unemployed", "student", "retired"];

  if (!data.employmentStatus || data.employmentStatus.trim() === "") {
    errors.employmentStatus = "Employment status is required";
  } else if (!validEmployment.includes(data.employmentStatus)) {
    errors.employmentStatus = "Please select a valid employment status";
  }

  /* ================= INCOME ================= */
  if (data.income === undefined || data.income === "") {
    errors.income = "Monthly income is required";
  } else {
    const income = Number(data.income);
    if (isNaN(income)) {
      errors.income = "Income must be a number";
    } else if (income < 0) {
      errors.income = "Income cannot be negative";
    } else if (income > 1_000_000) {
      errors.income = "Please enter a valid income amount";
    }
  }

  /* ================= HOUSING STATUS ================= */
  const validHousing = ["owned", "rented", "family", "other"];

  if (!data.housingStatus || data.housingStatus.trim() === "") {
    errors.housingStatus = "Housing status is required";
  } else if (!validHousing.includes(data.housingStatus)) {
    errors.housingStatus = "Please select a valid housing status";
  }

  return errors;
}