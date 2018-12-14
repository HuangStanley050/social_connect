const Validator = require("validator");
const isEmpty = require("./is-empty");
//import isEmpty from "./is-empty";

exports.validateLoginInput = data => {
  let errors = {};

  //check if the data is empty if it is convert to empty string

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Not a valid email";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email can't be empty";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password can't be empty";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
