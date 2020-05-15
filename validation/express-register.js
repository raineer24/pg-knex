//const expressValidator = require("express-validator");
const { check } = require("express-validator");
const { validationResult } = require("express-validator");
// module.exports = data = (req, res, next) => {
//   console.log("data.username: ", data);
// };

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
    .isAlpha()
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

// module.exports = function(data) {
//   console.log("data.username: ", data);
//   req.checkbody("email", "Email is required").notEmpty();
//   const email = data.email;
//   //console.log("email"), email;

//   return async (req, res, next) => {
//     //console.log("req.body.email", await req.body.email);
//     // req.checkbody("email", "Email is required").notEmpty();
//     // req.getValidationResult();
//   };
// };

// module.exports = async function(req, res, next) {
//   return new Promise((resolve, reject) => {
//     const foo = req.body.username;
//     resolve(foo);
//   });
// };

// module.exports = data =>
//   async function(req, res, next) {
//     console.log("data.username: ", req.body);
//   };
