//const expressValidator = require("express-validator");
const { check, validationResult } = require("express-validator/check");

// module.exports = data = (req, res, next) => {
//   console.log("data.username: ", data);
// };

exports.validateUser = [
  check("email")
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Invalid email address!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
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
