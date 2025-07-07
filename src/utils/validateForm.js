export default function validateForm(formData) {
  const formValues = Object.fromEntries(formData);
  const invalidFields = [];

  ["firstName", "lastName"].forEach(field => {
    const value = formValues[field];
    if (!value || value.trim() === "" || /\d/.test(value)) {
      invalidFields.push(field);
    }
  });

  const phone = formValues.phone;
  if (!phone || phone.trim() === "" || phone.length < 18) {
    invalidFields.push("phone");
  }

  const email = formValues.email;
  if (!email || email.trim() === "") {
    invalidFields.push("email");
  }

  const urlCv = formValues.urlCv;
  if (!urlCv || urlCv.trim() === "" || /\s/.test(urlCv)) {
    invalidFields.push("urlCv");
  }

  return invalidFields;
}