export function validateStep1(data: any, touchedFields?: Record<string, boolean>) {
  const errors: Record<string, string> = {};

  const shouldValidate = (field: string) =>
    !touchedFields || touchedFields[field];

  /* ================= NAME ================= */
  if (shouldValidate("name")) {
    if (!data.name || data.name.trim() === "") {
      errors.name = "Full name is required";
    } else if (data.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters";
    } else if (data.name.trim().length > 60) {
      errors.name = "Name must not exceed 60 characters";
    } else if (!/^[\p{L}\s'-]+$/u.test(data.name.trim())) {
      errors.name = "Name must contain letters only";
    }
  }

  /* ================= NATIONAL ID ================= */
  if (shouldValidate("emiratesId")) {
    const id = (data.emiratesId || "").replace(/\s/g, "");
    if (!id) {
      errors.emiratesId = "National ID is required";
    } else if (!/^\d+$/.test(id)) {
      errors.emiratesId = "National ID must contain digits only";
    } else if (id.length < 6) {
      errors.emiratesId = "National ID is too short (min 6 digits)";
    } else if (id.length > 15) {
      errors.emiratesId = "National ID is too long (max 15 digits)";
    }
  }

  /* ================= DATE OF BIRTH ================= */
  if (shouldValidate("dob")) {
    if (!data.dob) {
      errors.dob = "Date of birth is required";
    } else {
      const birth = new Date(data.dob);
      const today = new Date();

      if (isNaN(birth.getTime())) {
        errors.dob = "Invalid date";
      } else if (birth > today) {
        errors.dob = "Date of birth cannot be in the future";
      } else {
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;

        if (age < 18) {
          errors.dob = "You must be at least 18 years old";
        } else if (age > 100) {
          errors.dob = "Please enter a valid date of birth";
        }
      }
    }
  }

  /* ================= GENDER ================= */
  if (shouldValidate("gender")) {
    if (!data.gender) {
      errors.gender = "Please select a gender";
    } else if (!["male", "female"].includes(data.gender)) {
      errors.gender = "Invalid gender selection";
    }
  }

  /* ================= ADDRESS ================= */
  if (shouldValidate("address")) {
    if (!data.address || data.address.trim() === "") {
      errors.address = "Address is required";
    } else if (data.address.trim().length < 10) {
      errors.address = `Address too short (${data.address.trim().length}/10 characters)`;
    } else if (data.address.trim().length > 120) {
      errors.address = "Address must not exceed 120 characters";
    }
  }

  /* ================= CITY ================= */
  if (shouldValidate("city")) {
    if (!data.city || data.city.trim() === "") {
      errors.city = "City is required";
    } else if (data.city.trim().length < 2) {
      errors.city = "Please enter a valid city name";
    } else if (data.city.trim().length > 50) {
      errors.city = "City name is too long";
    } else if (!/^[\p{L}\s'-]+$/u.test(data.city.trim())) {
      errors.city = "City must contain letters only";
    }
  }

  /* ================= STATE ================= */
  if (shouldValidate("state")) {
    if (!data.state || data.state.trim() === "") {
      errors.state = "State / Province is required";
    } else if (data.state.trim().length < 2) {
      errors.state = "Please enter a valid state name";
    } else if (data.state.trim().length > 50) {
      errors.state = "State name is too long";
    } else if (!/^[\p{L}\s'-]+$/u.test(data.state.trim())) {
      errors.state = "State must contain letters only";
    }
  }

  /* ================= COUNTRY ================= */
  if (shouldValidate("country")) {
    if (!data.country || data.country.trim() === "") {
      errors.country = "Please select a country";
    }
  }

  /* ================= PHONE ================= */
  if (shouldValidate("phone")) {
    const phone = (data.phone || "").replace(/\s/g, "");
    if (!phone) {
      errors.phone = "Phone number is required";
    } else if (phone.length < 7) {
      errors.phone = "Phone number is too short";
    } else if (phone.length > 16) {
      errors.phone = "Phone number is too long";
    } else if (!/^\+?\d{7,15}$/.test(phone)) {
      errors.phone = "Invalid phone format (e.g. +971501234567)";
    }
  }

  /* ================= EMAIL ================= */
  if (shouldValidate("email")) {
    const email = (data.email || "").trim();
    if (!email) {
      errors.email = "Email address is required";
    } else if (!email.includes("@")) {
      errors.email = "Email must contain @";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      errors.email = "Invalid email format (e.g. name@example.com)";
    } else if (email.length > 100) {
      errors.email = "Email is too long";
    }
  }

  return errors;
}