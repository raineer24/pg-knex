const { check, validationResult } = require("express-validator");
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

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  userExperienceProfileValidationRules,
  userProfileValidationRules,
  validate
};
