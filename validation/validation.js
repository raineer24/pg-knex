const {
  check,
  validationResult
} = require("express-validator");

const userLoginValidationRules = () => {
  return [
    check("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .bail(),
    check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .bail()
  ];
};

const userPostValidationRules = () => {
  return [
    check("title")
    .not()
    .isEmpty()
    .withMessage("Title is required")
    .bail(),
    check("body")
    .not()
    .isEmpty()
    .withMessage("Content is required")
    .bail()
  ];
};

const userExperienceProfileValidationRules = () => {
  return [
    check("job_title")
    .not()
    .isEmpty()
    .withMessage("Job title is required")
    .bail(),
    check("company_name")
    .not()
    .isEmpty()
    .withMessage("Company is required")
    .bail(),
    check("start_date")
    .not()
    .isEmpty()
    .withMessage("Start date is required")
    .bail()
  ];
};

const userProfileValidationRules = () => {
  return [
    check("status")
    .not()
    .isEmpty()
    .withMessage("Status is required")
    .bail(),
    check("areas_of_expertise")
    .not()
    .isEmpty()
    .withMessage("Areas of expertise is required")
    .bail()
  ];
};

const userEducationProfileValidationRules = () => {
  return [
    check("school_name")
    .not()
    .isEmpty()
    .withMessage("School name is required")
    .bail(),
    check("degree_name")
    .not()
    .isEmpty()
    .withMessage("Degree name is required")
    .bail(),
    check("major_fieldofstudy")
    .not()
    .isEmpty()
    .withMessage("Major field of study is required")
    .bail(),
    check("start_date")
    .not()
    .isEmpty()
    .withMessage("Start date is required")
    .bail()
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  // const extractedErrors = [];
  // errors.array().map(err => extractedErrors.push({
  //   [err.param]: err.msg
  // }));
  console.log('error', errors);

  return res.status(422).json({
    errors
    //errors: extractedErrors
  });
};

module.exports = {
  userExperienceProfileValidationRules,
  userProfileValidationRules,
  userEducationProfileValidationRules,
  userPostValidationRules,
  userLoginValidationRules,
  validate
};