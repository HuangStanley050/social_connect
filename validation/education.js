const Validator = require("validator");
const isEmpty = require("./is-empty");
//import isEmpty from "./is-empty";

exports.validateEducationInput = data => {
  let errors = {};

  //check if the data is empty if it is convert to empty string
  //console.log(data);
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "School field can't be empty";
  }
  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree field can't be empty";
  }
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Study field can't be empty";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field can't be empty";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
