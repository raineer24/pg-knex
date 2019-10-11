const Validator = require("validator");
const ifEmpty = require("./checkForEmpty");

module.exports = function checkRegistrationFields(data) {
  // An errors object is created
  let errors = {};

  // If data.email is not empty, data.email = data.email
  // else if empty, data.email = ""

  data.email = !ifEmpty(data.email) ? data.email : "";
  data.password1 = !ifEmpty(data.password1) ? data.password1 : "";
  data.password2 = !ifEmpty(data.password2) ? data.password1 : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (Validator.isEmpty(data.password1)) {
    errors.password1 = "Password is required";
  }

  if (!Validator.isLength(data.password1, { min: 8, max: 120 })) {
    errors.password1 = "Password must be greater than 8 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirmation password is required";
  }

  if (!Validator.equals(data.password1, data.password2)) {
    errors.password1 = "Both password fields must match";
  }
};
