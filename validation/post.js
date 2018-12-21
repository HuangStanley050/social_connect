const Validator = require("validator");
const isEmpty = require("./is-empty");
//import isEmpty from "./is-empty";

exports.validatePostInput = data => {
  let errors = {};

  //check if the data is empty if it is convert to empty string

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
