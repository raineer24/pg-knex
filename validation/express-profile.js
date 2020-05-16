const { check } = require("express-validator");
const { validationResult } = require("express-validator");

exports.validateProfile = [
  check("status")
    .not()
    .isEmpty()
    .withMessage("Status is required"),
  check("areas_of_expertise")
    .not()
    .isEmpty()
    .withMessage("areas_of_expertise is required")
];
