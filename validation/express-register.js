const { check } = require("express-validator");
const { validationResult } = require("express-validator");

exports.validateUser = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email Address")
    .bail(),
  check("username")
    .not()
    .isEmpty()
    .withMessage("Username is required")
    .isLength({ min: 4, max: 20 })
    .withMessage("Username must be at least 6 characters")
    .bail(),
  check("first_name")
    .not()
    .isEmpty()
    .withMessage("Firstname is required")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must be alphabetic.")
    .withMessage("Firstname can only contain letters")
    .isLength({ min: 4, max: 20 })
    .withMessage("Firstname must be at least 6 characters")
    .bail(),
  check("password", "Your password must be at least 6 characters")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 20 }),
  check("password2", "Password do not match")
    .not()
    .isEmpty()
    .isLength({ min: 6, max: 20 })
    .custom((value, { req }) => value === req.body.password)
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
