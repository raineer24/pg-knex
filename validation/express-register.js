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
    .isEmail()
    .withMessage("Invalid Email Address"),
  check("username")
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username is required"),
  check("first_name")
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 20 })
    .withMessage("Firstname is required"),
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
