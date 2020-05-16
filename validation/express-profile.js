const { check } = require("express-validator");
const { validationResult } = require("express-validator");

exports.validateProfile = [
  check("status")
    .not()
    .isEmpty()
    .withMessage("Status is required")
    .bail(),
  check("areas_of_expertise")
    .not()
    .isEmpty()
    .withMessage("Areas of expertise is required")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    error = errors.array();
    if (!errors.isEmpty()) {
      console.log("error!");
      let err = new Error(error[0].msg);
      throw err;
    }
    next();
  }
];
