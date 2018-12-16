const Validator = require("validator");
const isEmpty = require("./is-empty");
//import isEmpty from "./is-empty";

exports.validateExperienceInput = data => {
  let errors = {};

  //check if the data is empty if it is convert to empty string
  //console.log(data);
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title can't be empty";
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = "Company field can't be empty";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field can't be empty";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
