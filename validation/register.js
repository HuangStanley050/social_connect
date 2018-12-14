const Validator = require("validator");
const isEmpty = require("./is-empty");
//import isEmpty from "./is-empty";

exports.validateRegisterInput = data => {
  let errors = {};

  //check if the data is empty if it is convert to empty string
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name can't be empty";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email can't be empty";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Not a valid email";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password can't be empty";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must match";
  }
  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
